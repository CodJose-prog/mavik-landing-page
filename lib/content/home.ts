import { contactLinks, homeSectionLinks, primaryCtas, primaryNavigationItems } from "../site-links"

export const companyInfo = {
  name: "MAVIK",
  email: "mavikstm@gmail.com",
  phoneDisplay: "(93) 99227-3046",
  phoneE164: "+5593992273046",
  instagramHandle: "@mavik_tech",
  instagramUrl: contactLinks.instagram,
  primaryLocation: "Santarém - Pará",
  secondaryLocation: "Óbidos - Pará",
  serviceArea: "Pará e outras regiões do Brasil",
  addressLocality: "Santarém",
  addressRegion: "PA",
  addressCountry: "BR",
  serviceAreas: ["Santarém", "Óbidos", "Pará", "Brasil"],
} as const

export const navigationItems = primaryNavigationItems

export const homeContent = {
  hero: {
    eyebrow: "Software sob medida, apps, plataformas web e sites institucionais para empresas",
    title: "Tecnologia sob medida para empresas que precisam crescer",
    description:
      "A MAVIK desenvolve sistemas personalizados, aplicativos, plataformas web, automações e sites institucionais para empresas que precisam de mais estrutura.",
    primaryCta: {
      label: primaryCtas.talkToMavik.label,
      href: primaryCtas.talkToMavik.href,
      external: primaryCtas.talkToMavik.external,
    },
    secondaryCta: {
      label: primaryCtas.viewProjects.label,
      href: primaryCtas.viewProjects.href,
      scrollTo: primaryCtas.viewProjects.scrollTo,
    },
    trustLine:
      "Base em Santarém, atuação em Óbidos e projetos para outras regiões do Brasil, com clareza de escopo e suporte responsável.",
    proofCards: [
      {
        eyebrow: "Atuação",
        title: "Software house no Pará com atuação nacional",
        description: "Atendemos empresas do Pará e de outras regiões do Brasil.",
      },
      {
        eyebrow: "Foco",
        title: "Estrutura, eficiência e presença digital",
        description: "Cada entrega parte de um problema real.",
      },
      {
        eyebrow: "Compromisso",
        title: "Clareza técnica e visão de continuidade",
        description: "A solução precisa funcionar na rotina e evoluir com responsabilidade.",
      },
    ],
  },
  valueSection: {
    eyebrow: "Proposta de valor",
    title: "Soluções digitais que fazem sentido para a realidade do negócio",
    description:
      "Nem toda empresa precisa da mesma solução. O ponto central é entender problema, contexto e prioridade.",
    complementary:
      "Com base em Santarém, a MAVIK desenvolve software sob medida, produtos web, aplicativos e automações para empresas que precisam de mais estrutura.",
    pillars: [
      {
        title: "Para empresas que precisam de estrutura",
        description: "Para negócios que já perceberam que planilhas e ferramentas desconectadas limitam crescimento.",
      },
      {
        title: "Para decisões com mais clareza",
        description: "Cada solução nasce de diagnóstico, contexto e prioridade real.",
      },
      {
        title: "Para crescer com consistência",
        description: "Tecnologia deixa de ser peça isolada e passa a sustentar operação e gestão.",
      },
    ],
  },
  problemSection: {
    eyebrow: "Problemas que resolvemos",
    title: "Quando a operação cresce, os problemas também ficam mais evidentes",
    description: "Muitas empresas não sofrem por falta de demanda, e sim por falta de estrutura digital.",
    items: [
      {
        title: "Processos dependentes de improviso",
        description: "Quando a rotina depende de mensagens soltas e controles paralelos, a operação perde consistência.",
      },
      {
        title: "Falta de visibilidade operacional",
        description: "Sem sistema, painel ou histórico confiável, fica mais difícil acompanhar atendimento e operação.",
      },
      {
        title: "Ferramentas genéricas que não acompanham o negócio",
        description: "Soluções prontas ajudam no início, mas nem sempre acompanham regras e fluxos em evolução.",
      },
      {
        title: "Presença digital abaixo do nível da empresa",
        description: "Um site genérico compromete marca, confiança comercial e posicionamento.",
      },
      {
        title: "Ausência de parceiro técnico confiável",
        description: "É preciso contar com uma equipe que entenda contexto e entregue com responsabilidade.",
      },
    ],
  },
  solutionsSection: {
    eyebrow: "Soluções",
    title: "Soluções para organizar operação, fortalecer presença e destravar crescimento",
    description: "Produtos digitais com lógica de negócio, critério técnico e leitura clara de contexto.",
    items: [
      {
        title: "Sistemas sob medida",
        description:
          "Criamos sistemas personalizados com base no fluxo real da operação, incluindo regras e integrações relevantes.",
        note: "Quando a operação deixa de caber em ferramentas genéricas, software sob medida vira decisão de estrutura.",
      },
      {
        title: "Aplicativos mobile",
        description: "Aplicativos para equipes, clientes ou operações que exigem mobilidade e clareza de uso.",
        note: "A mobilidade entra como recurso operacional, não apenas como extensão visual.",
      },
      {
        title: "Plataformas web e SaaS",
        description:
          "Projetamos plataformas e produtos SaaS para operações que precisam escalar com organização e leitura de dados.",
        note: "O trabalho está em construir uma base confiável para crescimento.",
      },
      {
        title: "Landing pages e sites institucionais premium",
        description: "Sites e páginas para empresas que precisam comunicar valor com maturidade e clareza.",
        note: "O site precisa representar a empresa com precisão antes do primeiro contato.",
      },
      {
        title: "Automações",
        description: "Estruturamos automações para reduzir tarefas repetitivas e melhorar o fluxo de informação.",
        note: "Automação bem aplicada libera tempo e melhora previsibilidade.",
      },
    ],
  },
  casesSection: {
    eyebrow: "Cases",
    title: "Soluções desenvolvidas",
    description: "Projetos apresentados por contexto, tipo de solução e aderência ao negócio.",
    overview: {
      title: "Recorte institucional",
      description: "Cases apresentados por contexto e tipo de solução, sem excesso de detalhe.",
      items: ["Contexto claro", "Tipo de solução", "Tom institucional"],
    },
    items: [
      {
        label: "Plataforma SaaS",
        title: "ArenaCalendar",
        summary:
          "Plataforma SaaS para gestão de arenas esportivas, com reservas, operação organizada e base preparada para evolução.",
        solutionType: "Produto próprio",
      },
      {
        label: "Sistema de gestão",
        title: "CRM SaaS",
        summary: "Sistema de gestão empresarial com foco em organização de processos, controle de dados e escalabilidade.",
        solutionType: "SaaS sob medida",
      },
      {
        label: "Aplicativo mobile",
        title: "App logístico",
        summary: "Aplicação mobile para controle de rotas, rastreamento e gestão operacional em campo.",
        solutionType: "Aplicativo sob medida",
      },
      {
        label: "Sistema interno",
        title: "Sistema web de rotina interna",
        summary: "Sistema para centralizar atendimento, agenda e informações operacionais em um único ambiente.",
        solutionType: "Sistema web sob medida",
      },
    ],
    ctaPanel: {
      title: "Se fizer sentido, a conversa pode seguir com portfólio complementar",
      description: "Apresentamos projetos próximos do seu cenário e o tipo de solução mais coerente.",
      primaryCta: {
        label: "Solicitar portfólio completo",
        href: contactLinks.whatsappPortfolio,
        external: true,
      },
      secondaryCta: {
        label: "Ver canais de contato",
        href: homeSectionLinks.contact,
      },
    },
  },
  differentiatorsSection: {
    eyebrow: "Diferenciais",
    title: "Por que nos diferenciamos das demais software houses",
    description: "Não atuamos como executores. Atuamos como parceiros técnicos na evolução do seu negócio.",
    items: [
      {
        title: "Atualização constante",
        description:
          "Trabalhamos com tecnologias atuais e práticas modernas, evitando bases que limitam o crescimento no médio prazo.",
      },
      {
        title: "Squad maduro e versátil",
        description: "Nossa equipe atua de sistemas internos a plataformas escaláveis, com leitura técnica e operacional.",
      },
      {
        title: "Proximidade no suporte",
        description: "Atendemos empresas da região com proximidade real, incluindo suporte presencial quando necessário.",
      },
      {
        title: "Foco em continuidade",
        description: "Cada projeto é pensado para evoluir com segurança, não apenas para ser entregue.",
      },
      {
        title: "Soluções sob medida",
        description: "Desenvolvemos com base no contexto da empresa, sem adaptações genéricas.",
      },
    ],
  },
  processSection: {
    eyebrow: "Processo",
    title: "Da leitura do cenário à evolução da solução",
    description: "Projetos bem conduzidos começam no entendimento correto do problema e da prioridade.",
    items: [
      {
        title: "Diagnóstico",
        description: "Entendemos a operação, os gargalos e as prioridades para separar demanda aparente de necessidade real.",
      },
      {
        title: "Estratégia",
        description: "Transformamos contexto em direção, definindo escopo, prioridades de entrega e o caminho mais coerente.",
      },
      {
        title: "Desenvolvimento",
        description:
          "Projetamos e desenvolvemos a solução com foco em clareza de uso, consistência técnica e aderência ao objetivo.",
      },
      {
        title: "Evolução contínua",
        description: "Quando faz sentido, a solução continua evoluindo após a entrega, com novas etapas tratadas com continuidade.",
      },
    ],
  },
  faqItems: [
    {
      question: "A MAVIK é uma empresa de software no Pará?",
      answer: "Sim. A MAVIK tem base em Santarém, presença em Óbidos e atendimento a empresas de outras regiões do Brasil.",
    },
    {
      question: "A software house da MAVIK atende Santarém, Óbidos e outras cidades do Pará?",
      answer: "Sim. Atendemos empresas em Santarém, Óbidos e outras cidades do Pará, sem limitar a atuação a um único município.",
    },
    {
      question: "Vocês fazem desenvolvimento de software sob medida para empresas?",
      answer: "Sim. Desenvolvemos software sob medida para empresas que precisam organizar operação, integrar processos e ganhar previsibilidade.",
    },
    {
      question: "A MAVIK desenvolve aplicativos e plataformas web no mesmo projeto?",
      answer: "Sim. Quando o contexto exige, estruturamos soluções integradas entre aplicativo mobile, plataforma web e painel administrativo.",
    },
    {
      question: "Vocês fazem automação de processos empresariais?",
      answer: "Sim. Criamos automações para reduzir tarefas repetitivas e melhorar o fluxo de informação entre áreas da empresa.",
    },
    {
      question: "A MAVIK também cria sites institucionais premium?",
      answer: "Sim. Desenvolvemos sites institucionais premium para empresas que precisam comunicar valor com clareza e confiança.",
    },
    {
      question: "Vocês assumem sistemas, aplicativos ou plataformas já existentes?",
      answer: "Sim, desde que exista base mínima para análise técnica. Em muitos casos, evoluir uma solução existente é mais inteligente do que recomeçar.",
    },
    {
      question: "Como funciona o início de um projeto de software sob medida?",
      answer: "O trabalho começa com diagnóstico do cenário, entendimento dos gargalos e definição da solução mais adequada.",
    },
    {
      question: "A MAVIK presta suporte e evolução depois da entrega?",
      answer: "Sim. Dependendo do projeto, a continuidade pode envolver acompanhamento, melhorias e novas etapas de evolução.",
    },
    {
      question: "A MAVIK atende apenas empresas do Pará?",
      answer: "Não. Temos atuação forte no Pará, mas também atendemos empresas de outras regiões do Brasil.",
    },
  ],
  finalCta: {
    eyebrow: "Contato",
    title: "Se a sua empresa precisa de mais estrutura digital, a MAVIK pode ajudar",
    description: "Começamos entendendo o cenário e propondo a solução mais coerente para o momento do negócio.",
    primaryCta: {
      label: primaryCtas.talkToMavik.label,
      href: primaryCtas.talkToMavik.href,
      external: primaryCtas.talkToMavik.external,
    },
    secondaryCta: {
      label: primaryCtas.viewProjects.label,
      href: primaryCtas.viewProjects.href,
      scrollTo: primaryCtas.viewProjects.scrollTo,
    },
    note: "Atendemos empresas do Pará e de outras regiões do Brasil em projetos de software, apps, plataformas web, automações e presença institucional.",
  },
  footer: {
    description: "A MAVIK desenvolve soluções digitais sob medida para empresas que precisam de mais estrutura.",
    region: "Atuamos no Pará, incluindo Santarém e Óbidos, e em outras regiões do Brasil.",
    contact: "Para conversar sobre um projeto, entre em contato com a MAVIK.",
  },
} as const
