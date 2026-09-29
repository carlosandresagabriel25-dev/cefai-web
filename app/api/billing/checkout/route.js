import { NextResponse } from 'next/server';
import { createOrGetCustomer, createSubscription } from '../../../../lib/billing/asaas';
import { supabase } from '../../../../lib/supabase';

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, email, phone, company, planId } = body;

    if (!email || !name) {
      return NextResponse.json({ error: 'Nome e e-mail são obrigatórios.' }, { status: 400 });
    }

    // Determina valor do plano (Starter = 497, Pro Enterprise = 1297)
    const planValue = planId === 'pro' ? 1297.00 : 497.00;
    const planName = planId === 'pro' ? 'Pro Enterprise' : 'Starter';

    // 1. Criar/Obter Cliente no Asaas
    const customer = await createOrGetCustomer({ name, email, phone, company });

    // 2. Criar Assinatura Recorrente no Asaas
    const subscription = await createSubscription({
      customerId: customer.id,
      planValue: planValue,
      planName: planName
    });

    // 3. Registar Assinatura na tabela `billing_subscriptions` (Supabase)
    await supabase.from('billing_subscriptions').insert([{
      client_email: email,
      client_phone: phone,
      asaas_customer_id: customer.id,
      asaas_subscription_id: subscription.id,
      plan_id: planId || 'starter',
      status: 'pending'
    }]);

    // 4. Registar na tabela `audit_logs`
    await supabase.from('audit_logs').insert([{
      actor: 'system',
      action: 'CHECKOUT_CREATED',
      resource: 'subscription',
      resource_id: subscription.id,
      metadata: { customerId: customer.id, planName, planValue }
    }]);

    return NextResponse.json({
      success: true,
      subscriptionId: subscription.id,
      invoiceUrl: subscription.invoiceUrl || `https://sandbox.asaas.com/i/${subscription.id}`
    });

  } catch (error) {
    console.error('Erro na Rota de Checkout:', error);
    return NextResponse.json({ error: error.message || 'Erro ao processar checkout.' }, { status: 500 });
  }
}
