'use client';

import { useState } from 'react';

export default function HomePage() {
  const SEU_NUMERO_WHATSAPP = '5516991022319'; 

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: ''
  });

  const handleOpenModal = (planName = '') => {
    setSelectedPlan(planName);
    setIsModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitted(true);

    // 1. Envia a Lead para o nosso backend no Next.js
    try {
      await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
    } catch (err) {
      console.error('Erro de envio:', err);
    }

    // 2. Prepara e abre o WhatsApp
    const planoTexto = selectedPlan ? `%0A• *Plano de Interesse:* ${encodeURIComponent(selectedPlan)}` : '';
    const mensagem = `Olá! Gostaria de agendar uma demonstração VIP da CEF.AI.${planoTexto}%0A%0A*Dados da Empresa:*%0A• *Nome:* ${encodeURIComponent(formData.name)}%0A• *Empresa:* ${encodeURIComponent(formData.company)}%0A• *E-mail:* ${encodeURIComponent(formData.email)}%0A• *WhatsApp:* ${encodeURIComponent(formData.phone)}`;

    const urlWhatsApp = `https://wa.me/${SEU_NUMERO_WHATSAPP}?text=${mensagem}`;
    window.open(urlWhatsApp, '_blank');
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setIsSubmitted(false);
  };

  return (
    <div style={{
      backgroundColor: '#030712',
      color: '#f9fafb',
      fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      minHeight: '100vh',
      margin: 0,
      padding: 0,
      overflowX: 'hidden',
      position: 'relative'
    }}>
      {/* Background Glow */}
      <div style={{
        position: 'absolute',
        top: '-100px',
        left: '50%',
        transform: 'translateX(-50%)',
        width: '600px',
        height: '600px',
        background: 'radial-gradient(circle, rgba(99,102,241,0.25) 0%, rgba(168,85,247,0.15) 40%, rgba(0,0,0,0) 70%)',
        filter: 'blur(80px)',
        pointerEvents: 'none',
        zIndex: 0
      }} />

      {/* Navbar */}
      <nav style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '24px 8%',
        borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
        backdropFilter: 'blur(12px)',
        position: 'relative',
        zIndex: 10
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{
            width: '32px',
            height: '32px',
            borderRadius: '8px',
            background: 'linear-gradient(135deg, #6366f1, #a855f7)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: 'bold',
            fontSize: '18px',
            boxShadow: '0 0 20px rgba(99, 102, 241, 0.6)'
          }}>
            ⚡
          </div>
          <span style={{ fontSize: '22px', fontWeight: '800', letterSpacing: '-0.5px' }}>
            CEF<span style={{ color: '#a855f7' }}>.AI</span>
          </span>
        </div>

        <button 
          onClick={() => handleOpenModal('Acesso Corporativo')}
          style={{
            padding: '10px 20px',
            borderRadius: '10px',
            background: 'linear-gradient(135deg, #6366f1 0%, #a855f7 100%)',
            color: '#fff',
            border: 'none',
            fontWeight: '600',
            fontSize: '14px',
            boxShadow: '0 4px 20px rgba(168, 85, 247, 0.4)',
            cursor: 'pointer'
          }}>
          Acesso Corporativo ➔
        </button>
      </nav>

      {/* Hero Section */}
      <section style={{
        textAlign: 'center',
        padding: '90px 20px 50px',
        maxWidth: '1000px',
        margin: '0 auto',
        position: 'relative',
        zIndex: 1
      }}>
        <div style={{
          display: 'inline-block',
          padding: '6px 16px',
          borderRadius: '30px',
          background: 'rgba(99, 102, 241, 0.1)',
          border: '1px solid rgba(99, 102, 241, 0.3)',
          color: '#818cf8',
          fontSize: '13px',
          fontWeight: '600',
          marginBottom: '24px',
          letterSpacing: '1px'
        }}>
          🚀 NEXT-GEN CONVERSATIONAL AI ENGINE
        </div>

        <h1 style={{
          fontSize: 'clamp(36px, 6vw, 68px)',
          fontWeight: '900',
          lineHeight: '1.1',
          letterSpacing: '-1px',
          marginBottom: '24px',
          background: 'linear-gradient(180deg, #ffffff 0%, #94a3b8 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        }}>
          Transforme o seu WhatsApp no Comercial de Vendas do Futuro.
        </h1>

        <p style={{
          fontSize: '18px',
          color: '#94a3b8',
          maxWidth: '680px',
          margin: '0 auto 40px',
          lineHeight: '1.6'
        }}>
          Agentes autônomos de Inteligência Artificial desenhados para qualificar leads, fechar vendas complexas e escalar a operação da sua empresa 24 horas por dia, 7 dias por semana.
        </p>

        <button 
          onClick={() => handleOpenModal('Demonstração VIP')}
          style={{
            padding: '16px 36px',
            borderRadius: '12px',
            background: 'linear-gradient(135deg, #6366f1 0%, #a855f7 100%)',
            color: '#fff',
            border: 'none',
            fontWeight: '700',
            fontSize: '16px',
            cursor: 'pointer',
            boxShadow: '0 0 30px rgba(99, 102, 241, 0.5)'
          }}>
          Solicitar Demonstração VIP
        </button>
      </section>

      {/* Pricing Section */}
      <section style={{ maxWidth: '1100px', margin: '0 auto 100px', padding: '0 20px', position: 'relative', zIndex: 1 }}>
        <div style={{ textAlign: 'center', marginBottom: '50px' }}>
          <span style={{ color: '#a855f7', fontWeight: '700', fontSize: '14px', letterSpacing: '1px' }}>
            INVESTIMENTO CORPORATIVO
          </span>
          <h2 style={{ fontSize: '36px', fontWeight: '800', marginTop: '8px' }}>
            Planos Dimensionados para o seu Negócio
          </h2>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '24px',
          alignItems: 'center'
        }}>
          {/* Starter */}
          <div style={{
            background: 'rgba(15, 23, 42, 0.6)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '24px',
            padding: '36px 28px',
            backdropFilter: 'blur(10px)'
          }}>
            <h3 style={{ fontSize: '20px', fontWeight: '700', color: '#cbd5e1' }}>Startup / Starter</h3>
            <div style={{ fontSize: '38px', fontWeight: '900', margin: '16px 0 8px', color: '#fff' }}>
              R$ 497 <span style={{ fontSize: '14px', color: '#64748b', fontWeight: '400' }}>/ mês</span>
            </div>
            <p style={{ color: '#94a3b8', fontSize: '13px', marginBottom: '24px' }}>Ideal para empresas que querem automatizar o WhatsApp inicial.</p>
            <button 
              onClick={() => handleOpenModal('Plano Starter (R$ 497/mês)')}
              style={{
                width: '100%',
                padding: '12px',
                borderRadius: '10px',
                background: 'rgba(255, 255, 255, 0.08)',
                color: '#fff',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                fontWeight: '600',
                cursor: 'pointer'
              }}>
              Selecionar Starter
            </button>
          </div>

          {/* Pro Enterprise */}
          <div style={{
            background: 'linear-gradient(180deg, rgba(99, 102, 241, 0.15) 0%, rgba(168, 85, 247, 0.05) 100%)',
            border: '2px solid #a855f7',
            borderRadius: '24px',
            padding: '44px 28px',
            position: 'relative',
            boxShadow: '0 0 40px rgba(168, 85, 247, 0.25)'
          }}>
            <h3 style={{ fontSize: '22px', fontWeight: '800', color: '#fff' }}>Pro Enterprise</h3>
            <div style={{ fontSize: '42px', fontWeight: '900', margin: '16px 0 8px', color: '#fff' }}>
              R$ 1.297 <span style={{ fontSize: '14px', color: '#94a3b8', fontWeight: '400' }}>/ mês</span>
            </div>
            <p style={{ color: '#cbd5e1', fontSize: '13px', marginBottom: '24px' }}>Para empresas em escala que necessitam de alta capacidade e métricas.</p>
            <button 
              onClick={() => handleOpenModal('Plano Pro Enterprise (R$ 1.297/mês)')}
              style={{
                width: '100%',
                padding: '14px',
                borderRadius: '12px',
                background: 'linear-gradient(135deg, #6366f1 0%, #a855f7 100%)',
                color: '#fff',
                border: 'none',
                fontWeight: '700',
                cursor: 'pointer',
                boxShadow: '0 4px 20px rgba(168, 85, 247, 0.4)'
              }}>
              Contratar Pro Enterprise 🚀
            </button>
          </div>

          {/* Custom */}
          <div style={{
            background: 'rgba(15, 23, 42, 0.6)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '24px',
            padding: '36px 28px',
            backdropFilter: 'blur(10px)'
          }}>
            <h3 style={{ fontSize: '20px', fontWeight: '700', color: '#cbd5e1' }}>Corporate Custom</h3>
            <div style={{ fontSize: '32px', fontWeight: '900', margin: '16px 0 8px', color: '#fff' }}>
              Sob Consulta
            </div>
            <p style={{ color: '#94a3b8', fontSize: '13px', marginBottom: '24px' }}>Soluções sob medida para grandes corporações e redes.</p>
            <button 
              onClick={() => handleOpenModal('Plano Corporate Custom')}
              style={{
                width: '100%',
                padding: '12px',
                borderRadius: '10px',
                background: 'rgba(255, 255, 255, 0.08)',
                color: '#fff',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                fontWeight: '600',
                cursor: 'pointer'
              }}>
              Falar com Consultor
            </button>
          </div>
        </div>
      </section>

      {/* MODAL POPUP */}
      {isModalOpen && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          backgroundColor: 'rgba(3, 7, 18, 0.85)',
          backdropFilter: 'blur(10px)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 1000,
          padding: '20px'
        }}>
          <div style={{
            background: '#0f172a',
            border: '1px solid rgba(168, 85, 247, 0.3)',
            borderRadius: '24px',
            padding: '36px',
            maxWidth: '480px',
            width: '100%',
            position: 'relative'
          }}>
            <button onClick={closeModal} style={{ position: 'absolute', top: '20px', right: '20px', background: 'transparent', border: 'none', color: '#64748b', fontSize: '20px', cursor: 'pointer' }}>✕</button>

            {!isSubmitted ? (
              <>
                <h3 style={{ fontSize: '24px', fontWeight: '800', marginBottom: '8px', color: '#fff' }}>Solicitar Demonstração VIP</h3>
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <input type="text" required placeholder="Nome Completo" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} style={{ padding: '12px', borderRadius: '10px', background: '#1e293b', border: '1px solid rgba(255,255,255,0.1)', color: '#fff' }} />
                  <input type="email" required placeholder="E-mail Corporativo" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} style={{ padding: '12px', borderRadius: '10px', background: '#1e293b', border: '1px solid rgba(255,255,255,0.1)', color: '#fff' }} />
                  <input type="text" required placeholder="Nome da Empresa" value={formData.company} onChange={(e) => setFormData({...formData, company: e.target.value})} style={{ padding: '12px', borderRadius: '10px', background: '#1e293b', border: '1px solid rgba(255,255,255,0.1)', color: '#fff' }} />
                  <input type="tel" required placeholder="WhatsApp com DDD" value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} style={{ padding: '12px', borderRadius: '10px', background: '#1e293b', border: '1px solid rgba(255,255,255,0.1)', color: '#fff' }} />
                  <button type="submit" style={{ padding: '14px', borderRadius: '12px', background: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)', color: '#fff', border: 'none', fontWeight: '700', cursor: 'pointer' }}>Abrir no WhatsApp 💬</button>
                </form>
              </>
            ) : (
              <div style={{ textAlign: 'center', padding: '20px 0' }}>
                <h3 style={{ fontSize: '22px', fontWeight: '800', color: '#fff' }}>Redirecionando...</h3>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Footer */}
      <footer style={{ borderTop: '1px solid rgba(255, 255, 255, 0.08)', padding: '40px 20px', textAlign: 'center', color: '#64748b', fontSize: '13px' }}>
        <p>© 2026 CEF.AI — All Systems Operational</p>
      </footer>
    </div>
  );
}
