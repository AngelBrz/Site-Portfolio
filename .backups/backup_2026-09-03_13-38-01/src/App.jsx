import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowRight,
  Smartphone,
  Video,
  TrendingUp,
  Bot,
  Globe,
  Briefcase,
  MessageCircle,
  Check,
  ChevronDown,
  ExternalLink,
  Zap,
  ChevronRight,
  ChevronLeft
} from 'lucide-react';
import './css/index.css';
import './css/App.css';

/* ─── Motion Helper Wrapper ─── */
const Reveal = ({ children, delay = 0, style }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: false, amount: 0.1, margin: '0px 0px 0px 0px' }}
    transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
    style={style}
  >
    {children}
  </motion.div>
);

/* ─── Infinite Custom Slider Component ─── */
const InfiniteSlider = ({ items, renderItem }) => {
  const [currentIndex, setCurrentIndex] = useState(items.length); // Start at the middle set
  const [isTransitioning, setIsTransitioning] = useState(true);

  // Triple the array to create the infinite loop illusion
  const extendedItems = [...items, ...items, ...items];

  const handleNext = () => {
    setIsTransitioning(true);
    setCurrentIndex(prev => prev + 1);
  };

  const handlePrev = () => {
    setIsTransitioning(true);
    setCurrentIndex(prev => prev - 1);
  };

  const handleTransitionEnd = () => {
    // If we scroll past the end of the middle set, silently jump back
    if (currentIndex >= items.length * 2) {
      setIsTransitioning(false);
      setCurrentIndex(currentIndex - items.length);
    } 
    // If we scroll past the beginning of the middle set, silently jump forward
    else if (currentIndex <= items.length - 1) {
      setIsTransitioning(false);
      setCurrentIndex(currentIndex + items.length);
    }
  };

  return (
    <div className="carousel-viewport" style={{ '--shift-index': currentIndex }}>
      {/* Esmaecimento nas bordas para dar a "prévia" suave */}
      <div className="carousel-fade-left" />
      <div className="carousel-fade-right" />
      
      {/* Setas flutuantes nas laterais */}
      <button className="carousel-nav-btn prev" onClick={handlePrev} aria-label="Anterior">
        <ChevronLeft size={28} />
      </button>
      <button className="carousel-nav-btn next" onClick={handleNext} aria-label="Próximo">
        <ChevronRight size={28} />
      </button>
      
      <div className="carousel-overflow-wrapper">
        <div 
          className="carousel-track"
          style={{ transition: isTransitioning ? 'transform 0.8s cubic-bezier(0.25, 0.1, 0.25, 1)' : 'none' }}
          onTransitionEnd={handleTransitionEnd}
        >
          {extendedItems.map((item, idx) => (
            <div key={idx} className="carousel-item-wrap">
              {renderItem(item, idx)}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

/* ─── Services Data ─── */
const SERVICES_DATA = [
  {
    id: 'instagram',
    title: 'Gestão de Instagram Completa',
    tag: '🏆 Carro-Chefe',
    isFlagship: true,
    price: { min: 950, max: 2100 },
    icon: <Smartphone size={24} />,
    desc: 'Seu perfil transformado em um canal ativo de autoridade e atração diária de clientes.',
    items: [
      'Posicionamento e linha editorial mensal',
      'Cronograma tático de publicações',
      'Engajamento ativo de comunidade',
      'Crescimento qualificado de seguidores',
    ],
  },
  {
    id: 'audiovisual',
    title: 'Captação & Produção Audiovisual',
    tag: 'Eventos & Marcas',
    price: { min: 500, max: 2000 },
    icon: <Video size={24} />,
    desc: 'Cobertura in loco de grandes eventos e gravação de criativos em vídeo de alta retenção.',
    items: [
      'Captação e direção de cena presencial',
      'Edição dinâmica com retenção acelerada',
      'Padrão visual de grandes eventos',
      'Criativos validados para Anúncios',
    ],
  },
  {
    id: 'trafego',
    title: 'Tráfego Pago (Meta & Google)',
    tag: 'Performance & ROI',
    price: { min: 800, max: 2200 },
    icon: <TrendingUp size={24} />,
    desc: 'Gestão orientada a dados para reduzir o CPA e encher o seu WhatsApp de oportunidades.',
    items: [
      'Instagram & Facebook Ads',
      'Google Search (Fundo de funil)',
      'Otimização contínua orientada a ROI',
      'Rastreamento analítico de conversões',
    ],
  },
  {
    id: 'automacao',
    title: 'Bots WhatsApp & IA',
    tag: 'Atendimento 24/7',
    price: { min: 800, max: 1900 },
    icon: <Bot size={24} />,
    desc: 'Estruturação de triagem automática e chatbots inteligentes para responder seus leads.',
    items: [
      'Fluxos automatizados via ManyChat',
      'Qualificação instantânea do lead',
      'Agentes de IA para respostas',
      'Integração direta com planilhas',
    ],
  },
  {
    id: 'web',
    title: 'Sites & Landing Pages',
    tag: 'Conversão Máxima',
    price: { min: 1000, max: 2300 },
    icon: <Globe size={24} />,
    desc: 'Páginas institucionais e páginas de vendas ultrarrápidas, com estética impecável.',
    items: [
      'Design responsivo impecável',
      'Copywriting estruturado',
      'Carregamento instantâneo',
      'Integração direta com Pixel',
    ],
  },
  {
    id: 'consultoria',
    title: 'Diagnóstico & Consultoria',
    tag: 'In Loco',
    price: { min: 500, max: 1600 },
    icon: <Briefcase size={24} />,
    desc: 'Visita técnica in loco para auditar o fluxo comercial, identificar gargalos e desenhar processos.',
    items: [
      'Auditoria dos processos de atendimento',
      'Mapeamento de gargalos de venda',
      'Treinamento de scripts para time',
      'Plano de ação operacional',
    ],
  },
];

/* ─── Real Cases Data ─── */
const CASES_DATA = [
  {
    name: 'Showco',
    tag: 'Eventos & Produção Audiovisual',
    src: '/assets/images/case_showco_1788367423847.jpg',
    desc: 'Produção massiva de mídias, captação presencial de alta energia e cobertura audiovisual em grandes eventos.',
    metric: 'Conteúdo Viral',
    result: 'Alta retenção e atração massiva.',
    link: 'https://instagram.com/showco',
  },
  {
    name: 'Casa Majô',
    tag: 'Estética & Eventos',
    src: '/assets/images/case_majo_1788367435646.jpg',
    desc: 'Funil tático de anúncios no Instagram e triagem automatizada com chatbot para reservas.',
    metric: 'ROAS 10.5x',
    result: 'Fluxo constante de agendamentos.',
    link: 'https://instagram.com/casamajo26',
  },
  {
    name: 'Progetto Marmo',
    tag: 'Alto Padrão & Web Design',
    src: '/assets/images/case_marmo_1788367446711.jpg',
    desc: 'Posicionamento estético de luxo, captação via Google Search e criação do site completo de alta performance (Marmo Express).',
    metric: 'Conversão Otimizada',
    result: 'Contratos de alto ticket constantes.',
    link: 'https://instagram.com/progetto.marmo',
    siteLink: 'https://progettomarmoexpress.com.br/'
  },
  {
    name: 'YouFighter',
    tag: 'Fitness & Comunidade',
    src: '/assets/images/case_youfighter_1788367458854.jpg',
    desc: 'Geração ágil de novos alunos e construção de comunidade apaixonada com criativos em vídeo de alta retenção.',
    metric: 'Redução de CPA',
    result: 'Crescimento constante de matrículas.',
    link: 'https://instagram.com/youfighter_br',
  },
];

const FAQ_DATA = [
  {
    q: 'Quanto tempo leva para começar a ver resultados reais?',
    a: 'Em ações de tráfego pago e automação de atendimento no WhatsApp, os primeiros leads qualificados começam a chegar nas primeiras 48 a 72 horas após as campanhas irem ao ar. Em gestão de Instagram e branding, o ganho consistente de autoridade é perceptível no primeiro mês.',
  },
  {
    q: 'Preciso ter uma verba alta para investir em anúncios?',
    a: 'Não. Começamos com uma verba compatível com a sua realidade (a partir de R$ 20 a R$ 50/dia em anúncios locais) e vamos escalando o investimento à medida que as vendas acontecem.',
  },
  {
    q: 'Como funciona a Consultoria & Diagnóstico Presencial?',
    a: 'Vou pessoalmente até a sede da sua empresa para entender como o seu time atende os clientes, onde os contatos estão sendo perdidos e como podemos automatizar o processo.',
  },
];

export default function App() {
  const [selectedServices, setSelectedServices] = useState(['instagram', 'trafego']);
  const [openFaq, setOpenFaq] = useState(null);

  const toggleService = (id) => {
    setSelectedServices((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const calculateTotal = () => {
    if (selectedServices.length === 0) return { min: 400, max: 1500 };
    let minSum = 0;
    let maxSum = 0;
    selectedServices.forEach(id => {
      const s = SERVICES_DATA.find(item => item.id === id);
      if (s) {
        minSum += s.price.min;
        maxSum += s.price.max;
      }
    });
    return { min: minSum, max: maxSum };
  };

  const { min, max } = calculateTotal();
  const selectedTitles = selectedServices
    .map((id) => SERVICES_DATA.find((s) => s.id === id)?.title)
    .filter(Boolean);

  /* Funções de roteamento WhatsApp */
  const getGeneralWhatsAppHref = () => {
    const text = `Olá Angel! Acessei seu site e gostaria de bater um papo sobre estratégias para escalar a minha empresa.`;
    return `https://wa.me/5511989121506?text=${encodeURIComponent(text)}`;
  };

  const getConfigWhatsAppHref = () => {
    if (selectedServices.length === 0) {
      const text = `Olá Angel! Acessei seu site e me interessei pelos serviços, podemos montar um plano juntos?`;
      return `https://wa.me/5511989121506?text=${encodeURIComponent(text)}`;
    }
    const servicesList = selectedTitles.join(', ');
    const text = `Olá Angel! Acessei o seu site e montei o escopo ideal para a minha empresa com: ${servicesList}. Gostaria de entender como podemos começar!`;
    return `https://wa.me/5511989121506?text=${encodeURIComponent(text)}`;
  };

  const getDiagWhatsAppHref = () => {
    const text = `Olá Angel! Vi sua postura e liderança no site. Gostaria de agendar meu diagnóstico gratuito e alinhar o crescimento da minha empresa.`;
    return `https://wa.me/5511989121506?text=${encodeURIComponent(text)}`;
  };

  return (
    <main className="app-container">
      <div className="editorial-bg" aria-hidden="true">
        <img src="/assets/images/hero_bg_1788367412084.jpg" alt="" className="hero-bg-img" />
      </div>

      <header className="site-header">
        <div className="nav-container">
          <a href="#" className="brand-logo">
            ANGEL GABRIEL
          </a>

          <nav className="nav-links" aria-label="Navegação principal">
            <a href="#servicos" className="nav-link">Serviços</a>
            <a href="#cases" className="nav-link">Portfólio</a>
            <a href="#simulador" className="nav-link">Configurar Operação</a>
            <a href="#sobre" className="nav-link">Sobre</a>
          </nav>

          <a href={getGeneralWhatsAppHref()} target="_blank" rel="noopener noreferrer" className="nav-cta-btn">
            <MessageCircle size={15} />
            <span>Falar no WhatsApp</span>
          </a>
        </div>
      </header>

      <section className="hero-section">
        <div className="container">
          <Reveal>
            <h1 className="hero-title">
              A estrutura comercial completa para seu negócio rodar com <span className="text-gradient">escala e autonomia.</span>
            </h1>
          </Reveal>

          <Reveal delay={0.15}>
            <p className="hero-subtitle">
              Ajudo empresas e eventos a transformarem presença digital em canais previsíveis de captação, autoridade e vendas diárias — menos esforço operacional, mais lucro real.
            </p>
          </Reveal>

          <Reveal delay={0.25}>
            <div className="hero-cta-row">
              <a href="#simulador" className="btn-primary">
                <span>Personalizar Minha Operação</span>
                <ArrowRight size={18} />
              </a>
              <a href="#cases" className="btn-secondary">
                <span>Explorar Cases Reais</span>
              </a>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.35}>
          <div className="tools-strip-container">
            <div className="tools-strip-label">Tecnologias &amp; Plataformas Homologadas</div>
            <div className="tools-pills-row">
              <span className="tool-pill">Meta Business Partner</span>
              <span className="tool-pill">Google Ads</span>
              <span className="tool-pill">ManyChat Pro</span>
              <span className="tool-pill">Automações IA</span>
              <span className="tool-pill">Captação Audiovisual</span>
              <span className="tool-pill">WhatsApp API</span>
            </div>
          </div>
        </Reveal>
      </section>

      <section className="phone-section">
        <div className="container">
          <div className="phone-section-inner">
            <Reveal>
              <div className="phone-text">
                <span className="section-tag">Engenharia de Vendas</span>
                <h2 className="section-title colored" style={{ fontSize: 'clamp(2rem, 3.2vw, 2.8rem)', marginBottom: '24px' }}>
                  Seu Instagram transformado em uma máquina de novos clientes.
                </h2>
                <p>
                  Enquanto você foca na gestão do seu negócio, cuido de toda a presença digital e do fluxo diário de interessados quentes chegando no WhatsApp.
                </p>

                <div className="stats-grid-clean">
                  <div className="stat-box">
                    <span className="stat-val">3+ Anos</span>
                    <span className="stat-lbl">De Estratégia</span>
                  </div>
                  <div className="stat-box">
                    <span className="stat-val">12+</span>
                    <span className="stat-lbl">Operações</span>
                  </div>
                  <div className="stat-box">
                    <span className="stat-val">98%</span>
                    <span className="stat-lbl">Satisfação</span>
                  </div>
                  <div className="stat-box">
                    <span className="stat-val">-47%</span>
                    <span className="stat-lbl">Redução de CPA</span>
                  </div>
                </div>

                <a href="#simulador" className="btn-secondary">
                  <span>Quero essa estrutura no meu negócio</span>
                  <ArrowRight size={16} />
                </a>
              </div>
            </Reveal>

            <Reveal delay={0.2}>
              <div className="phone-mockup-wrapper">
                <div className="phone-frame">
                  <div className="phone-notch" />
                  <div className="phone-screen">
                    <div className="phone-header">
                      <div className="phone-avatar" />
                      <div className="phone-handle">
                        @angelgabriel.mrk
                        <small>Gestor de Marketing</small>
                      </div>
                    </div>
                    {/* Fixed 6-block Grid for Mobile Aspect Ratio */}
                    <div className="phone-grid">
                      <div className="phone-post" style={{backgroundImage: 'url(/assets/images/case_showco_1788367423847.jpg)'}} />
                      <div className="phone-post" style={{backgroundImage: 'url(/assets/images/case_majo_1788367435646.jpg)'}} />
                      <div className="phone-post" style={{backgroundImage: 'url(/assets/images/case_marmo_1788367446711.jpg)'}} />
                      <div className="phone-post" style={{backgroundImage: 'url(/assets/images/case_youfighter_1788367458854.jpg)'}} />
                      <div className="phone-post" style={{backgroundImage: 'url(/assets/images/hero_bg_1788367412084.jpg)'}} />
                      <div className="phone-post" style={{backgroundImage: 'url(/assets/images/case_showco_1788367423847.jpg)'}} />
                    </div>
                    <div className="phone-stats-strip">
                      <div className="phone-stat-mini">
                        <strong>+548</strong>
                        <span>Seguidores</span>
                      </div>
                      <div className="phone-stat-mini">
                        <strong>25</strong>
                        <span>Posts</span>
                      </div>
                      <div className="phone-stat-mini">
                        <strong>↑34%</strong>
                        <span>Alcance</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Serviços: Divisória mais grossa */}
      <section id="servicos" className="section-spacing" style={{ borderTop: '2px solid rgba(255, 255, 255, 0.08)' }}>
        <div className="container">
          <div className="section-header" style={{ marginBottom: '24px' }}>
            <div className="section-header-text">
              <span className="section-tag">Ecossistema de Atuação</span>
              <h2 className="section-title">Soluções Estruturadas para Escalar</h2>
              <p className="section-subtitle">
                Escolha as soluções individuais que o seu negócio precisa hoje ou contrate a operação completa integrada para máximo resultado.
              </p>
            </div>
          </div>

          <Reveal>
            <InfiniteSlider 
              items={SERVICES_DATA} 
              renderItem={(s) => (
                <div className={`bento-card${s.isFlagship ? ' is-flagship' : ''}`}>
                  <div>
                    {s.tag && <div className="bento-card-badge">{s.tag}</div>}
                    <div className="bento-card-icon">{s.icon}</div>
                    <h3>{s.title}</h3>
                    <p className="bento-card-desc">{s.desc}</p>
                  </div>
                  <ul className="bento-card-items">
                    {s.items.map((item, idx) => (
                      <li key={idx}>{item}</li>
                    ))}
                  </ul>
                </div>
              )}
            />
          </Reveal>
        </div>
      </section>

      {/* Cases: Divisória mais grossa */}
      <section id="cases" className="section-spacing" style={{ borderTop: '2px solid rgba(255, 255, 255, 0.08)' }}>
        <div className="container">
          <div className="section-header" style={{ marginBottom: '24px' }}>
            <div className="section-header-text">
              <span className="section-tag">Portfólio Comprovado</span>
              <h2 className="section-title">Resultados Reais no Campo de Batalha</h2>
              <p className="section-subtitle">
                Empresas e marcas que já passaram pela nossa estratégia e colheram autoridade, engajamento e vendas.
              </p>
            </div>
          </div>

          <Reveal>
            <InfiniteSlider 
              items={CASES_DATA} 
              renderItem={(c) => (
                <div className="case-card-editorial">
                  <div className="case-thumb-wrap">
                    <img src={c.src} alt={c.name} loading="lazy" />
                    <span className="case-tag-floating">{c.tag}</span>
                  </div>
                  <div className="case-body">
                    <div>
                      <h3>{c.name}</h3>
                      <p>{c.desc}</p>
                      <div className="case-metric-strip">
                        <strong>{c.metric}</strong>
                        <span>{c.result}</span>
                      </div>
                    </div>
                    
                    <div className="case-link-row" style={{ flexDirection: 'column', alignItems: 'stretch', gap: '12px' }}>
                      {/* O Site desenvolvido fica na parte de cima, se existir */}
                      {c.siteLink && (
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '12px', borderBottom: '1px solid rgba(255, 255, 255, 0.04)' }}>
                          <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Site Desenvolvido</span>
                          <a href={c.siteLink} target="_blank" rel="noopener noreferrer" className="case-link-btn" style={{ background: 'var(--accent-main)' }}>
                            Acessar Projeto
                            <ExternalLink size={14} />
                          </a>
                        </div>
                      )}
                      {/* Perfil Oficial fica na parte de baixo */}
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Perfil Oficial</span>
                        <a href={c.link} target="_blank" rel="noopener noreferrer" className="case-link-btn">
                          Acessar Instagram
                          <ExternalLink size={14} />
                        </a>
                      </div>
                    </div>

                  </div>
                </div>
              )}
            />
          </Reveal>
        </div>
      </section>

      <section id="simulador" className="section-spacing" style={{ borderTop: '2px solid rgba(255, 255, 255, 0.08)' }}>
        <div className="container">
          <div className="section-header" style={{flexDirection: 'column', alignItems: 'center', textAlign: 'center'}}>
            <span className="section-tag">Engenharia Personalizada</span>
            <h2 className="section-title colored">Configurar a Sua Operação</h2>
            <p className="section-subtitle">
              Selecione exatamente os serviços que você precisa no momento. O sistema calcula a estimativa de investimento e monta um briefing instantâneo.
            </p>
          </div>

          <Reveal>
            <div className="configurator-wrapper">
              <div className="config-step-title">Selecione os módulos desejados:</div>

              <div className="services-selector-grid">
                {SERVICES_DATA.map((service) => {
                  const isChecked = selectedServices.includes(service.id);
                  return (
                    <div
                      key={service.id}
                      className={`service-toggle-card${isChecked ? ' is-active' : ''}`}
                      onClick={() => toggleService(service.id)}
                      role="checkbox"
                      aria-checked={isChecked}
                      tabIndex={0}
                    >
                      <div className="toggle-checkbox">
                        {isChecked && <Check size={14} strokeWidth={3} />}
                      </div>
                      <div className="toggle-info">
                        <h4>{service.title}</h4>
                        <p>{service.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {selectedServices.includes('consultoria') && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="consultoria-discount-block"
                  style={{ display: 'flex', gap: '16px', background: 'rgba(139, 92, 246, 0.1)', border: '2px solid rgba(139, 92, 246, 0.4)', padding: '20px', borderRadius: '0', marginBottom: '24px' }}
                >
                  <div style={{ color: 'var(--accent-main)', background: 'rgba(139, 92, 246, 0.2)', width: '40px', height: '40px', borderRadius: '0', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Zap size={20} />
                  </div>
                  <div>
                    <h4 style={{ color: 'var(--accent-main)', fontSize: '1.1rem', marginBottom: '4px' }}>Bônus Desbloqueado: Desconto de Primeira Vez</h4>
                    <p style={{ color: '#ffffff', fontSize: '0.95rem' }}>Por selecionar a Consultoria, você ganhou 1h a 2h de Consultoria Presencial gratuita para fazermos uma análise profunda da sua empresa.</p>
                  </div>
                </motion.div>
              )}

              <div className="config-summary-card">
                <div className="summary-header-row">
                  <div>
                    <div className="summary-est-label">Investimento Mensal Estimado</div>
                    <div className="summary-est-value">
                      R$ {min.toLocaleString('pt-BR')} ~ R$ {max.toLocaleString('pt-BR')}
                    </div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div className="summary-est-label">Serviços Selecionados</div>
                    <div style={{ fontSize: '1.2rem', fontWeight: 700, color: '#ffffff' }}>
                      {selectedServices.length} de {SERVICES_DATA.length}
                    </div>
                  </div>
                </div>

                <div className="selected-tags-strip">
                  {selectedTitles.map((title, idx) => (
                    <span key={idx} className="selected-tag">{title}</span>
                  ))}
                  {selectedServices.length === 0 && (
                    <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                      Nenhum módulo selecionado.
                    </span>
                  )}
                </div>

                <a href={getConfigWhatsAppHref()} target="_blank" rel="noopener noreferrer" className="btn-whatsapp-glow" style={{ width: '100%' }}>
                  <MessageCircle size={20} />
                  <span>Enviar este Escopo para Angel</span>
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section id="sobre" className="section-spacing" style={{ borderTop: '2px solid rgba(255, 255, 255, 0.08)' }}>
        <div className="container">
          <Reveal>
            <div className="about-grid-editorial">
              <div className="about-card-visual">
                <div className="about-avatar-large">AG</div>
                <h3>Angel Gabriel</h3>
                <span>Estrategista Digital &amp; Gestor</span>
                <div className="about-badges-col">
                  <div className="about-mini-badge">📍 Base em Osasco / SP</div>
                  <div className="about-mini-badge">💼 Foco em Negócios Físicos</div>
                  <div className="about-mini-badge">⚡ Especialista em Alta Conversão</div>
                </div>
              </div>

              <div className="about-text-content">
                <span className="section-tag">Liderança &amp; Postura</span>
                <h2>"Não vendo métricas de vaidade. Vendo processos que colocam dinheiro no caixa."</h2>
                <p>
                  Com experiência prática na estruturação de campanhas de tráfego, criação de criativos de alta retenção e automação, meu foco é tirar o empresário do afogamento operacional diário.
                </p>
                <p>
                  Cada projeto é tratado de forma tática. Não acredito em templates genéricos. Acredito em dados e captação de público com poder de compra.
                </p>
                <div style={{ marginTop: '28px' }}>
                  <a href={getDiagWhatsAppHref()} target="_blank" rel="noopener noreferrer" className="btn-primary">
                    <span>Agendar Diagnóstico Gratuito</span>
                    <ArrowRight size={18} />
                  </a>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section id="faq" className="section-spacing" style={{ borderTop: '2px solid rgba(255, 255, 255, 0.08)' }}>
        <div className="container">
          <div className="section-header" style={{flexDirection: 'column', alignItems: 'center', textAlign: 'center'}}>
            <span className="section-tag">Transparência Total</span>
            <h2 className="section-title">Perguntas Frequentes</h2>
          </div>

          <div className="faq-grid">
            {FAQ_DATA.map((item, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div key={idx} className="faq-item">
                  <button className="faq-question" onClick={() => setOpenFaq(isOpen ? null : idx)}>
                    <span>{item.q}</span>
                    <ChevronDown size={20} style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.3s ease' }} />
                  </button>
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.3 }}>
                        <div className="faq-answer">{item.a}</div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="cta-section-clean">
        <div className="container">
          <Reveal>
            <span className="section-tag">Próximos Passos</span>
            <h2 className="section-title" style={{ maxWidth: '780px', margin: '0 auto 16px' }}>
              Pronto para colocar a sua operação de marketing nos trilhos?
            </h2>
            <p className="section-subtitle" style={{ marginBottom: '36px' }}>
              Vamos analisar juntos a sua empresa e desenhar o plano exato que você precisa.
            </p>

            <a href={getGeneralWhatsAppHref()} target="_blank" rel="noopener noreferrer" className="btn-whatsapp-glow">
              <MessageCircle size={22} />
              <span>Falar Diretamente Comigo</span>
            </a>

            <div>
              <div className="cta-scarcity-strip">
                <span className="scarcity-dot" />
                Vagas limitadas para este trimestre: máximo de 3 novas operações
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <footer className="site-footer">
        <div className="container">
          <div className="footer-inner">
            <div className="footer-col" style={{ flex: '1 1 300px' }}>
              <h4>Angel Gabriel</h4>
              <p>Estrategista Digital e Arquiteto de Vendas.</p>
              <p>Trabalhamos através de CNPJ com emissão de nota e total garantia de segurança em contratos.</p>
            </div>
            
            <div className="footer-col" style={{ flex: '1 1 200px' }}>
              <h4>Links Úteis</h4>
              <p><a href="#servicos">Serviços</a></p>
              <p><a href="#cases">Portfólio Real</a></p>
              <p><a href="#simulador">Configurar Operação</a></p>
            </div>

            <div className="footer-col" style={{ flex: '1 1 200px' }}>
              <h4>Parceiros &amp; Contato</h4>
              <p><a href="https://ez-tech.io/#top" target="_blank" rel="noopener noreferrer">Ezitech (Agência Parceira)</a></p>
              <p><a href="https://instagram.com/angelgabriel.mrk" target="_blank" rel="noopener noreferrer">Instagram Oficial</a></p>
              <p><a href={getGeneralWhatsAppHref()} target="_blank" rel="noopener noreferrer">WhatsApp Direto</a></p>
            </div>
          </div>
          
          <div className="footer-bottom">
            <p>© {new Date().getFullYear()} Angel Gabriel — Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </main>
  );
}