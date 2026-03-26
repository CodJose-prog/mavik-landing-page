import { SECRETARY_OPEN_EVENT } from "./config"

type OpenSecretaryWidgetDetail = {
  focusInput?: boolean
  source?: string
}

export function focusSecretaryInput() {
  if (typeof window === "undefined") {
    return
  }

  window.requestAnimationFrame(() => {
    const input = document.getElementById("mavik-secretary-input") as HTMLTextAreaElement | null
    input?.focus()
  })
}

export function openSecretaryWidget(detail: OpenSecretaryWidgetDetail = {}) {
  if (typeof window === "undefined") {
    return
  }

  window.dispatchEvent(
    new CustomEvent(SECRETARY_OPEN_EVENT, {
      detail: {
        focusInput: true,
        ...detail,
      },
    })
  )
}
