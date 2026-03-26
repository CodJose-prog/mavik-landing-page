import { buildWhatsAppLink } from "../../utils/whatsapp"
import { companyInfo } from "../content/home"
import { projectTypeLabels, urgencyLabels } from "./config"
import { buildLeadSummary } from "./lead"
import type { SecretaryLeadState } from "./types"

function buildProjectLabel(projectType?: string | null) {
  if (!projectType) {
    return null
  }

  return projectTypeLabels[projectType] ?? projectType
}

function buildUrgencyLabel(urgency?: string | null) {
  if (!urgency) {
    return null
  }

  return urgencyLabels[urgency] ?? urgency
}

function compactLines(lines: Array<string | null | undefined>) {
  return lines.filter((line): line is string => Boolean(line && line.trim()))
}

export function buildSecretaryWhatsAppMessage(leadState: SecretaryLeadState) {
  const lead = leadState.lead
  const summary = leadState.qualification?.summary ?? buildLeadSummary(lead ?? {})
  const details = compactLines([
    lead?.name ? `Nome: ${lead.name}` : null,
    lead?.company ? `Empresa: ${lead.company}` : null,
    buildProjectLabel(lead?.projectType) ? `Tipo de projeto: ${buildProjectLabel(lead?.projectType)}` : null,
    lead?.context ? `Contexto: ${lead.context}` : summary ? `Contexto: ${summary}` : null,
    buildUrgencyLabel(lead?.urgency) ? `Urgência: ${buildUrgencyLabel(lead?.urgency)}` : null,
    lead?.objective ? `Objetivo: ${lead.objective}` : null,
    lead?.additionalInfo ? `Informações adicionais: ${lead.additionalInfo}` : null,
  ])

  return [
    `Olá, ${companyInfo.name}. Conversei com a Secretária IA e quero dar continuidade.`,
    details.join("\n"),
    "Quero falar com a equipe para avançar.",
  ]
    .filter((section) => section.trim().length > 0)
    .join("\n\n")
}

export function buildSecretaryWhatsAppHref(leadState: SecretaryLeadState) {
  return buildWhatsAppLink(buildSecretaryWhatsAppMessage(leadState))
}
