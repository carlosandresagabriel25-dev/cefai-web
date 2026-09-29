import { NextResponse } from 'next/server';
import { supabase } from '../../../../../lib/supabase';

export async function POST(request) {
  try {
    // 1. Validar Token de Autenticação do Webhook
    const authToken = request.headers.get('asaas-access-token');
    const expectedToken = process.env.ASAAS_WEBHOOK_TOKEN;

    if (expectedToken && authToken !== expectedToken) {
      console.warn('Acesso não autorizado ao Webhook Asaas.');
      return NextResponse.json({ error: 'Token inválido' }, { status: 401 });
    }

    const payload = await request.json();
    const { event, payment } = payload;

    if (!event || !payment) {
      return NextResponse.json({ message: 'Payload sem evento relevante.' }, { status: 200 });
    }

    const eventId = payload.id || `${event}_${payment.id}_${Date.now()}`;

    // 2. Garantir Idempotência: Verificar se o evento já foi processado
    const { data: existingEvent } = await supabase
      .from('asaas_webhook_events')
      .select('id')
      .eq('event_id', eventId)
      .single();

    if (existingEvent) {
      console.log(`Evento ${eventId} já processado anteriormente. Ignorando.`);
      return NextResponse.json({ message: 'Evento já processado (Idempotente).' }, { status: 200 });
    }

    // Registar o evento recebido no Supabase
    await supabase.from('asaas_webhook_events').insert([{
      event_id: eventId,
      event_type: event,
      payment_id: payment.id,
      subscription_id: payment.subscription,
      payload: payload,
      status: 'processed',
      processed_at: new Date().toISOString()
    }]);

    // 3. Máquina de Estados baseada no evento
    let newStatus = 'pending';

    switch (event) {
      case 'PAYMENT_RECEIVED':
      case 'PAYMENT_CONFIRMED':
        newStatus = 'active';
        break;
      case 'PAYMENT_OVERDUE':
        newStatus = 'overdue';
        break;
      case 'PAYMENT_REFUNDED':
      case 'PAYMENT_DELETED':
        newStatus = 'canceled';
        break;
      default:
        console.log(`Evento secundário recebido: ${event}`);
    }

    // 4. Atualizar Máquina de Estados da Assinatura no Supabase
    if (payment.subscription) {
      await supabase
        .from('billing_subscriptions')
        .update({
          status: newStatus,
          updated_at: new Date().toISOString()
        })
        .eq('asaas_subscription_id', payment.subscription);
    }

    // 5. Registar Pagamento no Histórico Financeiro
    await supabase.from('billing_payments').upsert([{
      asaas_payment_id: payment.id,
      asaas_subscription_id: payment.subscription,
      amount: payment.value,
      status: payment.status,
      billing_type: payment.billingType,
      due_date: payment.dueDate,
      payment_date: payment.paymentDate ? new Date(payment.paymentDate).toISOString() : null
    }], { onConflict: 'asaas_payment_id' });

    // 6. Registar no Log de Auditoria
    await supabase.from('audit_logs').insert([{
      actor: 'asaas_webhook',
      action: `EVENT_${event}`,
      resource: 'payment',
      resource_id: payment.id,
      metadata: { newStatus, amount: payment.value }
    }]);

    return NextResponse.json({ success: true, eventId });

  } catch (error) {
    console.error('Erro no processamento do Webhook Asaas:', error);
    return NextResponse.json({ error: 'Erro interno no webhook' }, { status: 500 });
  }
}
