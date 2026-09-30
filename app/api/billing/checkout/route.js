export const dynamic = 'force-dynamic';

import { NextResponse } from 'next/server';
import { createOrGetCustomer, createSubscription, getSubscriptionPayments } from '@/lib/billing/asaas';
import { supabase } from '@/lib/supabase';

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, email, phone, company, cpfCnpj, planId } = body;

    if (!email || !name) {
      return NextResponse.json({ error: 'Nome e e-mail são obrigatórios.' }, { status: 400 });
    }

    if (!cpfCnpj) {
      return NextResponse.json({ error: 'O CPF ou CNPJ é obrigatório para emissão de fatura.' }, { status: 400 });
    }

    const planValue = planId === 'pro' ? 1297.00 : 497.00;
    const planName = planId === 'pro' ? 'Pro Enterprise' : 'Starter';

    // 1. Criar ou Obter Cliente no Asaas
    const customer = await createOrGetCustomer({ name, email, phone, company, cpfCnpj });

    // 2. Criar Assinatura Recorrente no Asaas
    const subscription = await createSubscription({
      customerId: customer.id,
      planValue: planValue,
      planName: planName
    });

    // 3. Obter a Fatura/Cobrança real gerada para a assinatura (pay_...)
    let invoiceUrl = subscription.invoiceUrl;

    if (!invoiceUrl) {
      try {
        const paymentsData = await getSubscriptionPayments(subscription.id);
        if (paymentsData && paymentsData.data && paymentsData.data.length > 0) {
          invoiceUrl = paymentsData.data[0].invoiceUrl || paymentsData.data[0].bankSlipUrl;
        }
      } catch (pErr) {
        console.warn('Aviso: Não foi possível obter cobrança associada:', pErr);
      }
    }

    if (!invoiceUrl) {
      return NextResponse.json({ error: 'Não foi possível obter o link da fatura no Asaas.' }, { status: 500 });
    }

    // 4. Registar Assinatura no Supabase
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
      invoiceUrl: invoiceUrl
    });

  } catch (error) {
    console.error('Erro na Rota de Checkout:', error);
    return NextResponse.json({ 
      error: error.message || 'Erro interno ao comunicar com o gateway de pagamentos.' 
    }, { status: 500 });
  }
}
