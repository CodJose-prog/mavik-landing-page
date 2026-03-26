export const secretaryTriageClosing =
  "Com base no que você me passou, já organizei um resumo inicial do seu projeto. Se quiser continuar com a MAVIK, você pode enviar esse contexto agora pelo WhatsApp para seguir com o atendimento."

function normalizeForComparison(value: string) {
  return value.replace(/\s+/g, " ").trim().toLowerCase()
}

export function ensureTriageClosing(content: string, isTriageComplete: boolean) {
  const trimmedContent = content.trim()

  if (!trimmedContent || !isTriageComplete) {
    return trimmedContent
  }

  if (normalizeForComparison(trimmedContent).includes(normalizeForComparison(secretaryTriageClosing))) {
    return trimmedContent
  }

  return `${trimmedContent}\n\n${secretaryTriageClosing}`
}
