export type SecretaryIntent =
  | "general"
  | "software"
  | "app"
  | "website"
  | "automation"
  | "cases"
  | "commercial"

export type SecretaryIntentMeta = {
  helper: string
  intent: SecretaryIntent
  prompts: string[]
  suggestWhatsApp: boolean
  title: string
}

const intentMap: Record<SecretaryIntent, Omit<SecretaryIntentMeta, "intent">> = {
  general: {
    title: "Apresente o contexto",
    helper: "Descreva o cenário da empresa, o problema principal ou o tipo de solução que você está avaliando.",
    prompts: [
      "Quero estruturar um projeto do zero",
      "Preciso entender a solução mais adequada",
      "Quero apresentar o contexto da minha operação",
    ],
    suggestWhatsApp: false,
  },
  software: {
    title: "Projeto de sistema ou plataforma",
    helper: "Posso te ajudar a organizar escopo, rotina operacional, integrações e prioridade inicial.",
    prompts: [
      "Preciso de um sistema sob medida",
      "Quero estruturar um CRM ou painel interno",
      "Preciso integrar operação e gestão",
    ],
    suggestWhatsApp: false,
  },
  app: {
    title: "Projeto de aplicativo",
    helper: "Posso qualificar se o app atende cliente, equipe interna ou operação em campo e como ele se conecta ao restante da solução.",
    prompts: [
      "Quero um aplicativo para a operação",
      "Preciso integrar app e painel web",
      "O app é para cliente ou equipe interna",
    ],
    suggestWhatsApp: false,
  },
  website: {
    title: "Presença institucional",
    helper: "Posso orientar a conversa para posicionamento, clareza institucional e uma presença digital mais madura.",
    prompts: [
      "Preciso de um site institucional premium",
      "Quero reposicionar a presença da empresa",
      "Quero melhorar autoridade e conversão",
    ],
    suggestWhatsApp: false,
  },
  automation: {
    title: "Automação e eficiência operacional",
    helper: "Posso ajudar a identificar gargalos, tarefas repetitivas e pontos onde a automação gera mais clareza.",
    prompts: [
      "Quero reduzir tarefas manuais",
      "Preciso automatizar etapas do processo",
      "Quero mapear gargalos operacionais",
    ],
    suggestWhatsApp: false,
  },
  cases: {
    title: "Portfólio e repertório",
    helper: "Posso te direcionar para cases e projetos mais aderentes ao contexto da sua empresa.",
    prompts: [
      "Quero ver cases parecidos com o meu cenário",
      "Quero conhecer o repertório da MAVIK",
      "Existe algo semelhante ao que preciso",
    ],
    suggestWhatsApp: false,
  },
  commercial: {
    title: "Triagem para avançar",
    helper: "Quando o contexto estiver claro, a Secretária IA organiza o resumo e libera o envio para o WhatsApp da MAVIK.",
    prompts: [
      "Quero organizar o contexto para avançar",
      "Preciso estruturar escopo, objetivo e urgência",
      "Quero seguir com a conversa comercial",
    ],
    suggestWhatsApp: false,
  },
}

function includesAny(input: string, terms: string[]) {
  return terms.some((term) => input.includes(term))
}

export function detectSecretaryIntent(rawValue: string): SecretaryIntentMeta {
  const value = rawValue.trim().toLowerCase()

  if (!value) {
    return {
      intent: "general",
      ...intentMap.general,
    }
  }

  if (includesAny(value, ["orçamento", "orcamento", "preço", "preco", "prazo", "urgente", "whatsapp", "proposta"])) {
    return {
      intent: "commercial",
      ...intentMap.commercial,
    }
  }

  if (includesAny(value, ["case", "cases", "portfólio", "portfolio", "projeto semelhante", "repertório"])) {
    return {
      intent: "cases",
      ...intentMap.cases,
    }
  }

  if (includesAny(value, ["automação", "automacao", "automatizar", "processo", "integração", "integracao"])) {
    return {
      intent: "automation",
      ...intentMap.automation,
    }
  }

  if (includesAny(value, ["site", "landing", "institucional", "marca", "posicionamento"])) {
    return {
      intent: "website",
      ...intentMap.website,
    }
  }

  if (includesAny(value, ["app", "aplicativo", "mobile", "ios", "android"])) {
    return {
      intent: "app",
      ...intentMap.app,
    }
  }

  if (includesAny(value, ["sistema", "software", "crm", "painel", "plataforma", "saas"])) {
    return {
      intent: "software",
      ...intentMap.software,
    }
  }

  return {
    intent: "general",
    ...intentMap.general,
  }
}
