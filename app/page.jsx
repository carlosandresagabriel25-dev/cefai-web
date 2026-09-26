'use client';

import { useState } from 'react';

export default function HomePage() {
  // ⚠️ COLOQUE O SEU NÚMERO DE WHATSAPP AQUI (Com 55 + DDD + Número)
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

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);

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

      {/* Metrics Banner */}
      <section style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '20px',
        maxWidth: '1100px',
        margin: '40px auto 80px',
        padding: '0 20px',
        position: 'relative',
        zIndex: 1
      }}>
        {[
          { metric: '+350%', label: 'Aumento na Conversão' },
          { metric: '< 3s', label: 'Tempo Médio de Resposta' },
          { metric: '24/7', label: 'Operação Ininterrupta' },
          { metric: '99.9%', label: 'Precisão nos Atendimentos' }
        ].map((item, index) => (
          <div key={index} style={{
            background: 'rgba(255, 255, 255, 0.02)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            padding: '24px',
            borderRadius: '16px',
            textAlign: 'center',
            backdropFilter: 'blur(10px)'
          }}>
            <div style={{ fontSize: '32px', fontWeight: '800', color: '#38bdf8', marginBottom: '4px' }}>
              {item.metric}
            </div>
            <div style={{ fontSize: '13px', color: '#64748b', fontWeight: '500' }}>
              {item.label}
            </div>
          </div>
        ))}
      </section>

      {/* Feature Cards */}
      <section style={{ maxWidth: '1100px', margin: '0 auto 100px', padding: '0 20px', position: 'relative', zIndex: 1 }}>
        <h2 style={{ textAlign: 'center', fontSize: '32px', fontWeight: '800', marginBottom: '50px' }}>
          Arquitetura Criada para Alta Escala
        </h2>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '24px'
        }}>
          {[
            {
              icon: '🤖',
              title: 'Agentes Autônomos de IA',
              desc: 'Atendimento humanizado via WhatsApp com modelos treinados no catálogo da sua empresa.'
            },
            {
              icon: '📊',
              title: 'Painel Multi-Tenant',
              desc: 'Acompanhe métricas vitais como ARR, LTV e Churn em tempo real com análises preditivas.'
            },
            {
              icon: '⚡',
              title: 'Integração Nativa',
              desc: 'Conexão instantânea com CRMs, ERPs e meios de pagamento sem interrupções.'
            }
          ].map((card, idx) => (
            <div key={idx} style={{
              background: 'linear-gradient(180deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.01) 100%)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '20px',
              padding: '32px'
            }}>
              <div style={{ fontSize: '40px', marginBottom: '16px' }}>{card.icon}</div>
              <h3 style={{ fontSize: '20px', fontWeight: '700', marginBottom: '12px', color: '#f1f5f9' }}>
                {card.title}
              </h3>
              <p style={{ color: '#94a3b8', fontSize: '14px', lineHeight: '1.6' }}>
                {card.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* PASSO 3: TABELA CORPORATIVA DE PLANOS & PREÇOS (PRICING) */}
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
          {/* Plano Starter */}
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
            <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 28px 0', display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '14px', color: '#cbd5e1' }}>
              <li>✓ Até 1.000 atendimentos/mês</li>
              <li>✓ 1 Agente de IA Dedicado</li>
              <li>✓ Treinamento com Base de Conhecimento</li>
              <li>✓ Suporte por E-mail e WhatsApp</li>
            </ul>
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

          {/* Plano Pro (Destaque VIP) */}
          <div style={{
            background: 'linear-gradient(180deg, rgba(99, 102, 241, 0.15) 0%, rgba(168, 85, 247, 0.05) 100%)',
            border: '2px solid #a855f7',
            borderRadius: '24px',
            padding: '44px 28px',
            position: 'relative',
            boxShadow: '0 0 40px rgba(168, 85, 247, 0.25)'
          }}>
            <div style={{
              position: 'absolute',
              top: '-14px',
              left: '50%',
              transform: 'translateX(-50%)',
              background: 'linear-gradient(135deg, #6366f1, #a855f7)',
              padding: '4px 16px',
              borderRadius: '20px',
              fontSize: '11px',
              fontWeight: '800',
              letterSpacing: '1px',
              color: '#fff'
            }}>
              MAIS POPULAR
            </div>
            <h3 style={{ fontSize: '22px', fontWeight: '800', color: '#fff' }}>Pro Enterprise</h3>
            <div style={{ fontSize: '42px', fontWeight: '900', margin: '16px 0 8px', color: '#fff' }}>
              R$ 1.297 <span style={{ fontSize: '14px', color: '#94a3b8', fontWeight: '400' }}>/ mês</span>
            </div>
            <p style={{ color: '#cbd5e1', fontSize: '13px', marginBottom: '24px' }}>Para empresas em escala que necessitam de alta capacidade e métricas.</p>
            <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 28px 0', display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '14px', color: '#f1f5f9' }}>
              <li>⚡ Atendimentos Ilimitados</li>
              <li>⚡ Agentes de IA Ilimitados</li>
              <li>⚡ Painel Multi-Tenant com Métricas (ARR/Churn/LTV)</li>
              <li>⚡ Integração Nativa com CRM e Webhooks</li>
              <li>⚡ Suporte Prioritário VIP 24/7</li>
            </ul>
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

          {/* Plano Custom */}
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
            <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 28px 0', display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '14px', color: '#cbd5e1' }}>
              <li>✓ Servidores Dedicados On-Premise</li>
              <li>✓ SLA de Atendimento Garantido</li>
              <li>✓ Modelos de IA Treinados Sob Medida</li>
              <li>✓ Gerente de Conta Dedicado</li>
            </ul>
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

      {/* MODAL POPUP DE CAPTURA DE LEADS */}
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
            position: 'relative',
            boxShadow: '0 20px 50px rgba(0,0,0,0.8), 0 0 30px rgba(99, 102, 241, 0.2)'
          }}>
            <button 
              onClick={closeModal}
              style={{
                position: 'absolute',
                top: '20px',
                right: '20px',
                background: 'transparent',
                border: 'none',
                color: '#64748b',
                fontSize: '20px',
                cursor: 'pointer'
              }}>
              ✕
            </button>

            {!isSubmitted ? (
              <>
                <div style={{ fontSize: '28px', marginBottom: '8px' }}>🚀</div>
                <h3 style={{ fontSize: '24px', fontWeight: '800', marginBottom: '4px', color: '#fff' }}>
                  Solicitar Demonstração VIP
                </h3>
                {selectedPlan && (
                  <div style={{ color: '#a855f7', fontSize: '13px', fontWeight: '700', marginBottom: '12px' }}>
                    Interesse: {selectedPlan}
                  </div>
                )}
                <p style={{ color: '#94a3b8', fontSize: '14px', marginBottom: '20px' }}>
                  Preencha os dados para ser direcionado ao atendimento VIP no WhatsApp.
                </p>

                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '12px', color: '#cbd5e1', marginBottom: '6px', fontWeight: '600' }}>
                      NOME COMPLETO
                    </label>
                    <input 
                      type="text" 
                      required 
                      placeholder="Ex: Carlos Ferreira"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      style={{
                        width: '100%',
                        padding: '12px 16px',
                        borderRadius: '10px',
                        background: '#1e293b',
                        border: '1px solid rgba(255,255,255,0.1)',
                        color: '#fff',
                        fontSize: '14px',
                        outline: 'none'
                      }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '12px', color: '#cbd5e1', marginBottom: '6px', fontWeight: '600' }}>
                      E-MAIL CORPORATIVO
                    </label>
                    <input 
                      type="email" 
                      required 
                      placeholder="carlos@suaempresa.com"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      style={{
                        width: '100%',
                        padding: '12px 16px',
                        borderRadius: '10px',
                        background: '#1e293b',
                        border: '1px solid rgba(255,255,255,0.1)',
                        color: '#fff',
                        fontSize: '14px',
                        outline: 'none'
                      }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '12px', color: '#cbd5e1', marginBottom: '6px', fontWeight: '600' }}>
                      NOME DA EMPRESA
                    </label>
                    <input 
                      type="text" 
                      required 
                      placeholder="Ex: CEF Tecnologia"
                      value={formData.company}
                      onChange={(e) => setFormData({...formData, company: e.target.value})}
                      style={{
                        width: '100%',
                        padding: '12px 16px',
                        borderRadius: '10px',
                        background: '#1e293b',
                        border: '1px solid rgba(255,255,255,0.1)',
                        color: '#fff',
                        fontSize: '14px',
                        outline: 'none'
                      }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '12px', color: '#cbd5e1', marginBottom: '6px', fontWeight: '600' }}>
                      WHATSAPP COM DDD
                    </label>
                    <input 
                      type="tel" 
                      required 
                      placeholder="(16) 99999-9999"
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      style={{
                        width: '100%',
                        padding: '12px 16px',
                        borderRadius: '10px',
                        background: '#1e293b',
                        border: '1px solid rgba(255,255,255,0.1)',
                        color: '#fff',
                        fontSize: '14px',
                        outline: 'none'
                      }}
                    />
                  </div>

                  <button 
                    type="submit"
                    style={{
                      marginTop: '8px',
                      padding: '14px',
                      borderRadius: '12px',
                      background: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)',
                      color: '#fff',
                      border: 'none',
                      fontWeight: '700',
                      fontSize: '15px',
                      cursor: 'pointer',
                      boxShadow: '0 4px 20px rgba(34, 197, 94, 0.4)'
                    }}>
                    Abrir no WhatsApp 💬
                  </button>
                </form>
              </>
            ) : (
              <div style={{ textAlign: 'center', padding: '20px 0' }}>
                <div style={{ fontSize: '48px', marginBottom: '16px' }}>💬</div>
                <h3 style={{ fontSize: '22px', fontWeight: '800', marginBottom: '12px', color: '#fff' }}>
                  A Redirecionar...
                </h3>
                <p style={{ color: '#94a3b8', fontSize: '14px', lineHeight: '1.6', marginBottom: '24px' }}>
                  A sua conversa no WhatsApp com a equipa da CEF.AI foi gerada com sucesso!
                </p>
                <button 
                  onClick={closeModal}
                  style={{
                    padding: '12px 28px',
                    borderRadius: '10px',
                    background: 'rgba(255, 255, 255, 0.1)',
                    color: '#fff',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    fontWeight: '600',
                    cursor: 'pointer'
                  }}>
                  Fechar
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Footer */}
      <footer style={{
        borderTop: '1px solid rgba(255, 255, 255, 0.08)',
        padding: '40px 20px',
        textAlign: 'center',
        color: '#64748b',
        fontSize: '13px'
      }}>
        <p>© 2026 CEF.AI — All Systems Operational • Built for High-Performance Enterprises</p>
      </footer>
    </div>
  );
}
