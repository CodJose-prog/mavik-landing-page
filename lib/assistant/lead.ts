import type {
  SecretaryLeadData,
  SecretaryLeadField,
  SecretaryLeadState,
  SecretaryRecommendedCta,
} from "./types"

const leadFieldOrder: SecretaryLeadField[] = [
  "context",
  "projectType",
  "objective",
  "urgency",
  "name",
  "company",
]

function isRecord(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value)
}

function normalizeText(value: unknown, maxLength = 320) {
  if (typeof value !== "string") {
    return null
  }

  const normalized = value.replace(/\s+/g, " ").trim()

  if (!normalized) {
    return null
  }

  return normalized.slice(0, maxLength)
}

function normalizeBoolean(value: unknown) {
  return typeof value === "boolean" ? value : null
}

function normalizeRecommendedCta(value: unknown): SecretaryRecommendedCta | null {
  return value === "none" || value === "whatsapp" || value === "portfolio" ? value : null
}

function normalizeMissingFields(value: unknown) {
  if (!Array.isArray(value)) {
    return [] as SecretaryLeadField[]
  }

  return value.filter(
    (field): field is SecretaryLeadField =>
      field === "name" ||
      field === "company" ||
      field === "projectType" ||
      field === "context" ||
      field === "urgency" ||
      field === "objective" ||
      field === "additionalInfo"
  )
}

function uniqueLeadFields(fields: SecretaryLeadField[]) {
  return Array.from(new Set(fields))
}

function buildProjectLabel(projectType?: string | null) {
  switch (projectType) {
    case "software_sob_medida":
      return "Software sob medida"
    case "sistema_interno":
      return "Sistema interno"
    case "aplicativo_mobile":
      return "Aplicativo mobile"
    case "plataforma_web":
      return "Plataforma web ou SaaS"
    case "automacao":
      return "Automação de processos"
    case "site_institucional":
      return "Site institucional premium"
    case "portfolio":
      return "Portfólio ou cases"
    case "nao_definido":
      return "Projeto em definição"
    default:
      return normalizeText(projectType, 80)
  }
}

function buildUrgencyLabel(urgency?: string | null) {
  switch (urgency) {
    case "imediata":
      return "imediata"
    case "curto_prazo":
      return "curto prazo"
    case "medio_prazo":
      return "médio prazo"
    case "exploratoria":
      return "exploratória"
    default:
      return normalizeText(urgency, 60)
  }
}

function trimSummary(value: string) {
  return value.length <= 260 ? value : `${value.slice(0, 257).trimEnd()}...`
}

function hasDefinedProjectType(projectType?: string | null) {
  return Boolean(projectType && projectType !== "nao_definido" && projectType !== "portfolio")
}

function buildLeadData(record: Record<string, unknown>): SecretaryLeadData {
  return {
    name: normalizeText(record.name, 100),
    company: normalizeText(record.company, 120),
    projectType: normalizeText(record.projectType, 80),
    urgency: normalizeText(record.urgency, 60),
    context: normalizeText(record.context, 420),
    objective: normalizeText(record.objective, 220),
    additionalInfo: normalizeText(record.additionalInfo, 220),
  }
}

function deriveMissingFields(lead: SecretaryLeadData) {
  const missing: SecretaryLeadField[] = []

  if (!lead.context) {
    missing.push("context")
  }

  if (!hasDefinedProjectType(lead.projectType)) {
    missing.push("projectType")
  }

  if (!lead.objective) {
    missing.push("objective")
  }

  if (!lead.urgency) {
    missing.push("urgency")
  }

  if (!lead.name && !lead.company) {
    missing.push("name")
  }

  return uniqueLeadFields(missing)
}

export function buildLeadSummary(lead: SecretaryLeadData) {
  const parts = [
    buildProjectLabel(lead.projectType),
    lead.context,
    lead.objective ? `Objetivo principal: ${lead.objective}` : null,
    buildUrgencyLabel(lead.urgency) ? `Urgência ${buildUrgencyLabel(lead.urgency)}` : null,
  ].filter(Boolean)

  if (!parts.length) {
    return null
  }

  return trimSummary(parts.join(". "))
}

export function isLeadReadyForWhatsApp(lead: SecretaryLeadData) {
  const hasPrimaryContext = Boolean(lead.context)
  const hasProjectDirection = hasDefinedProjectType(lead.projectType) || Boolean(lead.objective)
  const hasCommercialQualifier = Boolean(lead.urgency || lead.name || lead.company || lead.additionalInfo)

  return hasPrimaryContext && hasProjectDirection && hasCommercialQualifier
}

export const emptyLeadState: SecretaryLeadState = {
  language: "pt-BR",
  lead: {
    name: null,
    company: null,
    projectType: null,
    urgency: null,
    context: null,
    objective: null,
    additionalInfo: null,
  },
  qualification: {
    isComplete: false,
    missingFields: leadFieldOrder,
    summary: null,
  },
  recommendedCta: "none",
  shouldOfferCases: false,
}

export function normalizeLeadState(next?: Partial<SecretaryLeadState> | null): SecretaryLeadState {
  const record: Record<string, unknown> = isRecord(next) ? next : {}
  const leadRecord: Record<string, unknown> = isRecord(record.lead) ? record.lead : record
  const qualificationRecord: Record<string, unknown> = isRecord(record.qualification) ? record.qualification : record
  const lead = buildLeadData(leadRecord)
  const derivedIsComplete = isLeadReadyForWhatsApp(lead)
  const providedSummary = normalizeText(qualificationRecord.summary, 260)
  const recommendedCta = normalizeRecommendedCta(record.recommendedCta)

  return {
    language: normalizeText(record.language, 20) ?? emptyLeadState.language,
    lead,
    qualification: {
      isComplete: derivedIsComplete,
      missingFields: derivedIsComplete
        ? []
        : uniqueLeadFields([...normalizeMissingFields(qualificationRecord.missingFields), ...deriveMissingFields(lead)]),
      summary: providedSummary ?? buildLeadSummary(lead),
    },
    recommendedCta: derivedIsComplete ? (recommendedCta === "portfolio" ? "portfolio" : "whatsapp") : recommendedCta === "portfolio" ? "portfolio" : "none",
    shouldOfferCases: normalizeBoolean(record.shouldOfferCases) ?? emptyLeadState.shouldOfferCases,
  }
}

export function mergeLeadState(current: SecretaryLeadState, next?: Partial<SecretaryLeadState> | null) {
  if (!next) {
    return normalizeLeadState(current)
  }

  const currentState = normalizeLeadState(current)
  const nextState = normalizeLeadState(next)

  return normalizeLeadState({
    language: nextState.language ?? currentState.language,
    lead: {
      name: nextState.lead?.name ?? currentState.lead?.name,
      company: nextState.lead?.company ?? currentState.lead?.company,
      projectType: nextState.lead?.projectType ?? currentState.lead?.projectType,
      urgency: nextState.lead?.urgency ?? currentState.lead?.urgency,
      context: nextState.lead?.context ?? currentState.lead?.context,
      objective: nextState.lead?.objective ?? currentState.lead?.objective,
      additionalInfo: nextState.lead?.additionalInfo ?? currentState.lead?.additionalInfo,
    },
    qualification: {
      isComplete: nextState.qualification?.isComplete ?? currentState.qualification?.isComplete,
      missingFields:
        nextState.qualification?.missingFields?.length
          ? nextState.qualification.missingFields
          : currentState.qualification?.missingFields,
      summary: nextState.qualification?.summary ?? currentState.qualification?.summary,
    },
    recommendedCta: nextState.recommendedCta ?? currentState.recommendedCta,
    shouldOfferCases: nextState.shouldOfferCases ?? currentState.shouldOfferCases,
  })
}
