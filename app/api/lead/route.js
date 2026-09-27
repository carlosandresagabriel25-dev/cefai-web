import { createClient } from '@supabase/supabase-js';

// Força o Next.js a avaliar as variáveis de ambiente a cada requisição (Runtime)
export const dynamic = 'force-dynamic';

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, email, phone, company } = body;

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL;
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseAnonKey || supabaseUrl.includes('placeholder')) {
      return new Response(
        JSON.stringify({ error: 'Credenciais do Supabase ausentes no servidor Render.' }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const supabase = createClient(supabaseUrl, supabaseAnonKey);

    const { data, error } = await supabase
      .from('whatsapp_leads')
      .insert([
        {
          client_name: name || 'Lead Sem Nome',
          client_phone: phone || '',
          client_email: email || '',
          company_name: company || '',
          status: 'lead'
        }
      ])
      .select();

    if (error) {
      console.error('Erro de inserção Supabase:', error.message);
      return new Response(
        JSON.stringify({ error: error.message }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    return new Response(
      JSON.stringify({ success: true, lead: data }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (err) {
    console.error('Exceção crítica na API:', err.message);
    return new Response(
      JSON.stringify({ error: err.message }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
