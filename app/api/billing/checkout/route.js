export const dynamic = 'force-dynamic';

import { NextResponse } from 'next/server';
import { createOrGetCustomer, createSubscription } from '@/lib/billing/asaas';
import { supabase } from '@/lib/supabase';

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, email, phone, company, cpfCnpj, planId } = body;

    if (!email || !name) {
      return NextResponse.json({ error: 'Nome e e-mail são obrigatórios.' }, { status: 400 });
    }

    if (!cpfCnpj) {
      return NextResponse.json({ error: 'O CPF ou CNPJ do cliente é obrigatório para emissão de fatura.' }, { status: 400 });
    }

    const planValue = planId === 'pro' ? 1297.00 : 497.00;
    const planName = planId === 'pro' ? 'Pro Enterprise' : 'Starter';

    // 1. Criar ou Obter Cliente no Asaas
    const customer = await createOrGetCustomer({ name, email, phone, company, cpfCnpj });

    // 2. Criar Assinatura no Asaas
    const subscription = await createSubscription({
      customerId: customer.id,
      planValue: planValue,
      planName: planName
    });

    // 3. Registar no Supabase (opcional/resiliente)
    if (supabase) {
      try {
        await supabase.from('billing_subscriptions').insert([{
          client_email: email,
          client_phone: phone,
          asaas_customer_id: customer.id,
          asaas_subscription_id: subscription.id,
          plan_id: planId || 'starter',
          status: 'pending'
        }]);

        await supabase.from('audit_logs').insert([{
          actor: 'system',
          action: 'CHECKOUT_CREATED',
          resource: 'subscription',
          resource_id: subscription.id,
          metadata: { customerId: customer.id, planName, planValue }
        }]);
      } catch (dbErr) {
        console.warn('Aviso ao guardar no Supabase durante o checkout:', dbErr);
      }
    }

    return NextResponse.json({
      success: true,
      subscriptionId: subscription.id,
      invoiceUrl: subscription.invoiceUrl || `https://sandbox.asaas.com/i/${subscription.id}`
    });

  } catch (error) {
    console.error('Erro na Rota de Checkout:', error);
    return NextResponse.json({ 
      error: error.message || 'Erro interno ao comunicar com o gateway de pagamentos.' 
    }, { status: 500 });
  }
}
