export async function fetchAsaas(endpoint, options = {}) {
  const apiKey = process.env.ASAAS_API_KEY;
  
  if (!apiKey) {
    throw new Error('ASAAS_API_KEY não encontrada no servidor.');
  }

  // Endereço oficial da API de Sandbox do Asaas
  const ASAAS_API_URL = process.env.ASAAS_API_URL || 'https://api-sandbox.asaas.com/v3';

  const response = await fetch(`${ASAAS_API_URL}${endpoint}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      'User-Agent': 'CEFAI-Web',
      'access_token': apiKey.trim(),
      ...(options.headers || {})
    }
  });

  const data = await response.json();
  if (!response.ok) {
    console.error('Erro na chamada da API Asaas:', data);
    throw new Error(data?.errors?.[0]?.description || 'Erro na integração com o Asaas.');
  }

  return data;
}

// 1. Criar ou Obter Cliente no Asaas
export async function createOrGetCustomer({ name, email, phone, company }) {
  const existing = await fetchAsaas(`/customers?email=${encodeURIComponent(email)}`);
  if (existing.data && existing.data.length > 0) {
    return existing.data[0];
  }

  return await fetchAsaas('/customers', {
    method: 'POST',
    body: JSON.stringify({
      name: name,
      email: email,
      phone: phone,
      company: company,
      notificationDisabled: false
    })
  });
}

// 2. Criar Assinatura Recorrente (Starter R$ 497 ou Pro R$ 1.297)
export async function createSubscription({ customerId, planValue, planName }) {
  return await fetchAsaas('/subscriptions', {
    method: 'POST',
    body: JSON.stringify({
      customer: customerId,
      billingType: 'UNDEFINED',
      value: planValue,
      nextDueDate: new Date(Date.now() + 86400000).toISOString().split('T')[0],
      cycle: 'MONTHLY',
      description: `Assinatura CEF.AI - ${planName}`
    })
  });
}
