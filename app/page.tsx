"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";

type PlanKey = "essencial" | "intermediario" | "premium";

const whatsappNumber = "558896245526";
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const services = [
  {
    number: "01",
    title: "Artes para feed e stories",
    text: "Design profissional e coerente com a identidade do Treino Sem Molezinha.",
    icon: "▣",
  },
  {
    number: "02",
    title: "Vídeos para Reels",
    text: "Conteúdo dinâmico para gerar alcance, autoridade e conexão com novos alunos.",
    icon: "▶",
  },
  {
    number: "03",
    title: "Planejamento de conteúdo",
    text: "Pautas estratégicas alinhadas ao posicionamento, calendário e objetivos do personal.",
    icon: "◎",
  },
  {
    number: "04",
    title: "Copywriting",
    text: "Textos claros e persuasivos para transformar atenção em interesse e ação.",
    icon: "✎",
  },
  {
    number: "05",
    title: "Agendamento e publicação",
    text: "Conteúdo publicado com frequência, organização e consistência.",
    icon: "↗",
  },
  {
    number: "06",
    title: "Monitoramento",
    text: "Acompanhamento do desempenho para identificar o que merece ser ampliado.",
    icon: "⌁",
  },
  {
    number: "07",
    title: "Consultoria de impulsionamento",
    text: "Orientação estratégica para campanhas e distribuição paga de conteúdo.",
    icon: "⌖",
  },
];

const pillars = [
  {
    step: "A",
    title: "Autoridade",
    text: "Conteúdos que demonstram conhecimento, método e segurança profissional.",
  },
  {
    step: "R",
    title: "Relacionamento",
    text: "Uma comunicação próxima para criar identificação e confiança.",
  },
  {
    step: "C",
    title: "Conversão",
    text: "Chamadas e caminhos claros para transformar seguidores em contatos.",
  },
  {
    step: "P",
    title: "Performance",
    text: "Decisões orientadas por consistência, resposta do público e evolução.",
  },
];

const plans: Record<
  PlanKey,
  {
    name: string;
    monthly: number;
    short: string;
    recommended?: boolean;
    features: string[];
  }
> = {
  essencial: {
    name: "Essencial",
    monthly: 450,
    short: "Presença profissional com frequência e consistência.",
    features: [
      "8 artes por mês",
      "1 vídeo por semana",
      "Planejamento de conteúdo",
      "Copywriting estratégico",
      "Agendamento e publicação",
      "Monitoramento mensal",
      "Suporte via WhatsApp",
    ],
  },
  intermediario: {
    name: "Intermediário",
    monthly: 750,
    short: "Mais frequência para acelerar autoridade e relacionamento.",
    recommended: true,
    features: [
      "12 artes por mês",
      "2 vídeos por semana",
      "Planejamento estratégico",
      "Copywriting estratégico",
      "Agendamento e publicação",
      "Monitoramento contínuo",
      "Consultoria de impulsionamento",
      "Relatório mensal",
      "Suporte via WhatsApp",
    ],
  },
  premium: {
    name: "Premium",
    monthly: 1050,
    short: "Presença intensa para fortalecer a marca e ampliar oportunidades.",
    features: [
      "16 artes por mês",
      "3 vídeos por semana",
      "Planejamento estratégico completo",
      "Copywriting estratégico",
      "Agendamento e publicação",
      "Monitoramento contínuo",
      "Consultoria de impulsionamento",
      "Relatório mensal completo",
      "Prioridade no suporte",
    ],
  },
};

const salesPageItems = [
  {
    number: "01",
    title: "Apresentação profissional",
    text: "Posicionamento, método de trabalho e proposta de valor de Adailton Melo.",
  },
  {
    number: "02",
    title: "Planos e serviços",
    text: "Exposição clara das opções de acompanhamento e seus diferenciais.",
  },
  {
    number: "03",
    title: "Resultados e depoimentos",
    text: "Prova social com autorização dos alunos e foco em credibilidade.",
  },
  {
    number: "04",
    title: "Conversão pelo WhatsApp",
    text: "Botões estratégicos e mensagens preparadas para facilitar o contato.",
  },
];

const money = (value: number) =>
  new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    maximumFractionDigits: 0,
  }).format(value);

export default function Home() {
  const [activePlan, setActivePlan] = useState<PlanKey>("intermediario");
  const [openItem, setOpenItem] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const selectedPlan = useMemo(() => plans[activePlan], [activePlan]);
  const firstMonth = selectedPlan.monthly + 250;

  useEffect(() => {
    const elements = Array.from(
      document.querySelectorAll<HTMLElement>("[data-reveal]"),
    );
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.14 },
    );
    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const documentHeight =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;
      const value = documentHeight
        ? (document.documentElement.scrollTop / documentHeight) * 100
        : 0;
      document.documentElement.style.setProperty("--scroll", `${value}%`);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = modalOpen || menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [modalOpen, menuOpen]);

  const choosePlan = (key: PlanKey) => {
    setActivePlan(key);
    document
      .querySelector("#resumo-investimento")
      ?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  const buildMessage = (name = "") =>
    `Olá! ${name ? `Meu nome é ${name} e ` : ""}tenho interesse no Plano ${
      selectedPlan.name
    } da proposta de gestão de redes sociais para Adailton Melo. Mensalidade: ${money(
      selectedPlan.monthly,
    )}. Primeiro mês com página de vendas: ${money(
      firstMonth,
    )}. Gostaria de conversar sobre os próximos passos.`;

  const copySummary = async () => {
    await navigator.clipboard.writeText(buildMessage());
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2200);
  };

  const sendWhatsApp = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = String(data.get("name") || "");
    window.open(
      `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(buildMessage(name))}`,
      "_blank",
      "noopener,noreferrer",
    );
  };

  return (
    <main>
      <div className="scroll-progress" aria-hidden="true" />

      <header className="site-header">
        <a className="brand" href="#inicio" aria-label="Voltar ao início">
          <span className="brand-logo-crop" aria-hidden="true">
            <img src={`${basePath}/adailton-melo-logo.jpg`} alt="" />
          </span>
          <span>
            <strong>TREINO SEM MOLEZINHA</strong>
            <small>ADAILTON MELO</small>
          </span>
        </a>

        <nav className="desktop-nav" aria-label="Navegação principal">
          <a href="#servicos">Serviços</a>
          <a href="#estrategia">Estratégia</a>
          <a href="#planos">Planos</a>
          <a href="#pagina-vendas">Página de vendas</a>
        </nav>

        <button
          className="header-cta"
          type="button"
          onClick={() => setModalOpen(true)}
        >
          Quero começar <span>↗</span>
        </button>

        <button
          className="menu-toggle"
          type="button"
          aria-label="Abrir menu"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((value) => !value)}
        >
          <span />
          <span />
        </button>
      </header>

      <div className={`mobile-menu ${menuOpen ? "is-open" : ""}`}>
        <button
          type="button"
          className="menu-close"
          onClick={() => setMenuOpen(false)}
          aria-label="Fechar menu"
        >
          ×
        </button>
        {[
          ["#servicos", "Serviços"],
          ["#estrategia", "Estratégia"],
          ["#planos", "Planos"],
          ["#pagina-vendas", "Página de vendas"],
        ].map(([href, label], index) => (
          <a
            key={href}
            href={href}
            style={{ transitionDelay: `${index * 70}ms` }}
            onClick={() => setMenuOpen(false)}
          >
            <span>0{index + 1}</span>
            {label}
          </a>
        ))}
      </div>

      <section className="hero" id="inicio">
        <div className="hero-grid" aria-hidden="true" />
        <div className="hero-glow" aria-hidden="true" />
        <div className="hero-copy">
          <p className="eyebrow hero-eyebrow">
            <span>01</span> PROPOSTA COMERCIAL
          </p>
          <h1>
            Gestão de
            <br />
            <em>redes sociais</em>
            <br />
            para personal trainer.
          </h1>
          <p className="hero-description">
            Uma estratégia de conteúdo criada para aumentar a visibilidade,
            fortalecer a autoridade de Adailton Melo e abrir novas oportunidades
            de alunos.
          </p>
          <div className="hero-actions">
            <a className="primary-button" href="#planos">
              Conhecer os planos <span>↓</span>
            </a>
            <button
              className="text-button"
              type="button"
              onClick={() => setModalOpen(true)}
            >
              Falar sobre a proposta <span>↗</span>
            </button>
          </div>
        </div>

        <div className="hero-visual" aria-label="Pilares da estratégia digital">
          <div className="orbit orbit-one" />
          <div className="orbit orbit-two" />
          <div className="visual-center">
            <small>ESTRATÉGIA</small>
            <strong>CONTEÚDO</strong>
            <span>QUE CONVERTE</span>
          </div>
          <div className="float-card card-authority">
            <span>01</span>
            <strong>Autoridade</strong>
          </div>
          <div className="float-card card-content">
            <span>02</span>
            <strong>Conteúdo</strong>
          </div>
          <div className="float-card card-result">
            <span>03</span>
            <strong>Resultados</strong>
          </div>
        </div>

        <div className="hero-footer">
          <span>ESTRATÉGIA</span>
          <i />
          <span>CONTEÚDO</span>
          <i />
          <span>RESULTADOS</span>
        </div>
      </section>

      <section className="marquee" aria-label="Destaques da proposta">
        <div className="marquee-track">
          {[...Array(2)].flatMap((_, group) =>
            [
              "POSICIONAMENTO",
              "AUTORIDADE",
              "CONTEÚDO",
              "CONVERSÃO",
              "PERFORMANCE",
            ].map((item) => (
              <span key={`${group}-${item}`}>
                {item} <b>✦</b>
              </span>
            )),
          )}
        </div>
      </section>

      <section className="section services-section" id="servicos">
        <div className="section-heading" data-reveal>
          <div>
            <p className="eyebrow">
              <span>02</span> O QUE SERÁ ENTREGUE
            </p>
            <h2>
              Uma presença digital
              <br />
              <em>completa e profissional.</em>
            </h2>
          </div>
          <p>
            Conteúdo, design e estratégia trabalhando juntos para transformar o
            perfil em uma ferramenta de relacionamento e captação.
          </p>
        </div>

        <div className="services-grid">
          {services.map((service, index) => (
            <article
              className="service-card"
              key={service.title}
              data-reveal
              style={{ transitionDelay: `${(index % 4) * 80}ms` }}
            >
              <div className="service-top">
                <span className="service-icon">{service.icon}</span>
                <small>{service.number}</small>
              </div>
              <h3>{service.title}</h3>
              <p>{service.text}</p>
              <span className="card-arrow">↗</span>
            </article>
          ))}
        </div>
      </section>

      <section className="strategy-section" id="estrategia">
        <div className="strategy-sticky">
          <p className="eyebrow">
            <span>03</span> DIREÇÃO ESTRATÉGICA
          </p>
          <h2>
            Crescer não é só postar.
            <br />
            É construir <em>percepção.</em>
          </h2>
          <p>
            Cada conteúdo deve cumprir um papel dentro da jornada do público:
            atrair, gerar confiança, demonstrar valor e facilitar o contato.
          </p>
          <a href="#planos" className="outline-button">
            Ver investimento <span>→</span>
          </a>
        </div>

        <div className="pillars-list">
          {pillars.map((pillar, index) => (
            <article key={pillar.title} data-reveal>
              <div className="pillar-index">
                <span>0{index + 1}</span>
                <strong>{pillar.step}</strong>
              </div>
              <div>
                <h3>{pillar.title}</h3>
                <p>{pillar.text}</p>
              </div>
              <span className="pillar-arrow">↘</span>
            </article>
          ))}
        </div>
      </section>

      <section className="section results-section">
        <div className="results-copy" data-reveal>
          <p className="eyebrow">
            <span>04</span> FOCO DO TRABALHO
          </p>
          <h2>
            Transformar atenção
            <br />
            em <em>oportunidade.</em>
          </h2>
          <p>
            O objetivo não é alimentar o perfil por obrigação. É criar uma
            presença capaz de posicionar Adailton Melo como referência e tornar
            o caminho até o contato muito mais simples.
          </p>
        </div>

        <div className="result-board" data-reveal>
          {[
            ["01", "Mais visibilidade", "Ser lembrado por quem busca evolução."],
            ["02", "Mais autoridade", "Demonstrar método, conhecimento e resultado."],
            ["03", "Mais conexão", "Criar identificação com a rotina dos alunos."],
            ["04", "Mais contatos", "Conduzir o público para uma conversa comercial."],
          ].map(([number, title, text]) => (
            <article key={number}>
              <span>{number}</span>
              <div>
                <h3>{title}</h3>
                <p>{text}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="plans-section" id="planos">
        <div className="section-heading plans-heading" data-reveal>
          <div>
            <p className="eyebrow">
              <span>05</span> PLANOS MENSAIS
            </p>
            <h2>
              Escolha o ritmo
              <br />
              ideal para <em>crescer.</em>
            </h2>
          </div>
          <p>
            Três níveis de presença digital. Todos incluem estratégia,
            identidade visual e acompanhamento.
          </p>
        </div>

        <div className="plans-grid">
          {(Object.keys(plans) as PlanKey[]).map((key, index) => {
            const plan = plans[key];
            const isActive = activePlan === key;
            return (
              <article
                key={key}
                className={`plan-card ${plan.recommended ? "featured" : ""} ${
                  isActive ? "is-selected" : ""
                }`}
                data-reveal
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                {plan.recommended && (
                  <div className="recommended">MAIS ESTRATÉGICO</div>
                )}
                <div className="plan-head">
                  <span>0{index + 1}</span>
                  <small>PLANO</small>
                </div>
                <h3>{plan.name}</h3>
                <p>{plan.short}</p>
                <div className="plan-price">
                  <strong>{money(plan.monthly)}</strong>
                  <span>/mês</span>
                </div>
                <ul>
                  {plan.features.map((feature) => (
                    <li key={feature}>
                      <span>✓</span>
                      {feature}
                    </li>
                  ))}
                </ul>
                <button type="button" onClick={() => choosePlan(key)}>
                  {isActive ? "Plano selecionado" : "Escolher este plano"}
                  <span>↗</span>
                </button>
              </article>
            );
          })}
        </div>

        <div className="investment-summary" id="resumo-investimento" data-reveal>
          <div className="summary-title">
            <small>SEU PLANO SELECIONADO</small>
            <h3>{selectedPlan.name}</h3>
          </div>
          <div>
            <small>MENSALIDADE</small>
            <strong>{money(selectedPlan.monthly)}</strong>
          </div>
          <div>
            <small>PRIMEIRO MÊS</small>
            <strong>{money(firstMonth)}</strong>
            <span>mensalidade + página de vendas</span>
          </div>
          <div className="summary-actions">
            <button type="button" className="copy-button" onClick={copySummary}>
              {copied ? "Resumo copiado ✓" : "Copiar resumo"}
            </button>
            <button
              type="button"
              className="primary-button"
              onClick={() => setModalOpen(true)}
            >
              Tenho interesse <span>↗</span>
            </button>
          </div>
        </div>
      </section>

      <section className="sales-page-section" id="pagina-vendas">
        <div className="sales-page-intro" data-reveal>
          <div className="sales-number">06</div>
          <p className="eyebrow">PÁGINA DE VENDAS NO PRIMEIRO MÊS</p>
          <h2>
            Uma estrutura criada
            <br />
            para <em>converter visitas.</em>
          </h2>
          <p>
            No primeiro mês, será criada uma página profissional para apresentar
            o trabalho de Adailton Melo e conduzir potenciais alunos diretamente
            para o WhatsApp.
          </p>
          <div className="sales-investment">
            <small>CRIAÇÃO INICIAL</small>
            <strong>+ R$ 250</strong>
            <span>
              Cobrança única no primeiro mês. Manutenção e alterações básicas
              ficam incluídas no plano mensal.
            </span>
          </div>
        </div>

        <div className="accordion" data-reveal>
          {salesPageItems.map((item, index) => {
            const isOpen = openItem === index;
            return (
              <article className={isOpen ? "is-open" : ""} key={item.number}>
                <button
                  type="button"
                  aria-expanded={isOpen}
                  onClick={() => setOpenItem(index)}
                >
                  <span>{item.number}</span>
                  <strong>{item.title}</strong>
                  <i>{isOpen ? "−" : "+"}</i>
                </button>
                <div className="accordion-content">
                  <p>{item.text}</p>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <section className="section process-section">
        <div className="section-heading" data-reveal>
          <div>
            <p className="eyebrow">
              <span>07</span> PRÓXIMOS PASSOS
            </p>
            <h2>
              Da aprovação à
              <br />
              primeira <em>publicação.</em>
            </h2>
          </div>
          <p>
            Um processo simples, colaborativo e organizado para transformar a
            estratégia em presença digital.
          </p>
        </div>
        <div className="process-line">
          {[
            ["01", "Escolha do plano", "Definição do volume ideal de conteúdo."],
            ["02", "Alinhamento", "Coleta de informações, acessos e objetivos."],
            ["03", "Planejamento", "Criação do calendário e linha editorial."],
            ["04", "Produção", "Design, vídeos, textos e página de vendas."],
            ["05", "Publicação", "Conteúdo no ar e acompanhamento contínuo."],
          ].map(([number, title, text], index) => (
            <article
              key={number}
              data-reveal
              style={{ transitionDelay: `${index * 90}ms` }}
            >
              <span>{number}</span>
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="final-cta">
        <div className="cta-glow" aria-hidden="true" />
        <p className="eyebrow" data-reveal>
          <span>08</span> VAMOS COMEÇAR?
        </p>
        <h2 data-reveal>
          Uma marca forte começa
          <br />
          com uma presença que
          <br />
          <em>não passa despercebida.</em>
        </h2>
        <p data-reveal>
          Escolha o plano, confirme o interesse e vamos transformar a presença
          digital de Adailton Melo.
        </p>
        <button
          className="primary-button large"
          type="button"
          onClick={() => setModalOpen(true)}
          data-reveal
        >
          Iniciar projeto <span>↗</span>
        </button>
        <div className="cta-signature">
          <span>TREINO SEM MOLEZINHA</span>
          <i />
          <span>ADAILTON MELO</span>
        </div>
      </section>

      <footer>
        <div className="brand footer-brand">
          <span className="brand-mark">
            <i />
            <i />
            <i />
          </span>
          <span>
            <strong>TREINO SEM MOLEZINHA</strong>
            <small>PROPOSTA COMERCIAL</small>
          </span>
        </div>
        <p>Estratégia · Conteúdo · Resultados</p>
        <a href="#inicio">Voltar ao topo ↑</a>
      </footer>

      {modalOpen && (
        <div
          className="modal-backdrop"
          role="presentation"
          onMouseDown={(event) => {
            if (event.currentTarget === event.target) setModalOpen(false);
          }}
        >
          <div
            className="contact-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="contact-title"
          >
            <button
              type="button"
              className="modal-close"
              onClick={() => setModalOpen(false)}
              aria-label="Fechar"
            >
              ×
            </button>
            <p className="eyebrow">PRÓXIMO PASSO</p>
            <h2 id="contact-title">Vamos tirar a estratégia do papel.</h2>
            <p>
              O WhatsApp será aberto com um resumo pronto do plano selecionado.
            </p>
            <div className="modal-plan">
              <div>
                <small>PLANO</small>
                <strong>{selectedPlan.name}</strong>
              </div>
              <div>
                <small>MENSALIDADE</small>
                <strong>{money(selectedPlan.monthly)}</strong>
              </div>
              <div>
                <small>PRIMEIRO MÊS</small>
                <strong>{money(firstMonth)}</strong>
              </div>
            </div>
            <form onSubmit={sendWhatsApp}>
              <label htmlFor="name">Seu nome</label>
              <input
                id="name"
                name="name"
                type="text"
                placeholder="Como podemos chamar você?"
                required
                autoFocus
              />
              <button className="primary-button" type="submit">
                Continuar no WhatsApp <span>↗</span>
              </button>
            </form>
            <small className="privacy-note">
              Nenhum dado é armazenado. A mensagem é gerada no seu navegador.
            </small>
          </div>
        </div>
      )}

      {copied && (
        <div className="toast" role="status">
          Resumo do plano copiado com sucesso.
        </div>
      )}
    </main>
  );
}
