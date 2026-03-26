import { emptyLeadState } from "./lead"
import type { SecretaryMessage } from "./types"

export const SECRETARY_STORAGE_KEY = "mavik-secretary-session-v2"
export const SECRETARY_OPEN_EVENT = "mavik:secretary-open"

export const secretaryWelcomeMessage: SecretaryMessage = {
  id: "secretary-welcome",
  role: "assistant",
  createdAt: new Date(0).toISOString(),
  status: "ready",
  content:
    "Olá. Sou a Secretária IA da MAVIK. Posso entender o contexto do seu projeto, organizar a triagem comercial inicial e preparar um resumo claro para envio no WhatsApp da MAVIK.\n\nSe preferir, você também pode escrever em English.",
}

export { emptyLeadState }

export const projectTypeLabels: Record<string, string> = {
  software_sob_medida: "Software sob medida",
  sistema_interno: "Sistema interno",
  aplicativo_mobile: "Aplicativo mobile",
  plataforma_web: "Plataforma web ou SaaS",
  automacao: "Automação de processos",
  site_institucional: "Site institucional premium",
  portfolio: "Portfólio ou cases",
  nao_definido: "Projeto em definição",
}

export const urgencyLabels: Record<string, string> = {
  imediata: "Urgência imediata",
  curto_prazo: "Curto prazo",
  medio_prazo: "Médio prazo",
  exploratoria: "Exploratório",
}
