import { buildWhatsAppLink } from "../utils/whatsapp"

export const officialLinks = {
  instagram: "https://www.instagram.com/mavik_tech/",
} as const

export const whatsappMessages = {
  general: "Olá, MAVIK. Vi o site e quero conversar sobre uma solução para minha empresa.",
  project:
    "Olá, MAVIK. Quero conversar sobre um projeto de software, plataforma, aplicativo, automação ou site institucional.",
  portfolio:
    "Olá, MAVIK. Quero conhecer cases e entender se a MAVIK já desenvolveu uma solução semelhante ao meu contexto.",
} as const

export const contactLinks = {
  whatsappGeneral: buildWhatsAppLink(whatsappMessages.general),
  whatsappProject: buildWhatsAppLink(whatsappMessages.project),
  whatsappPortfolio: buildWhatsAppLink(whatsappMessages.portfolio),
  instagram: officialLinks.instagram,
} as const

export const homeSectionLinks = {
  solutions: "/#solucoes",
  cases: "/#cases",
  process: "/#processo",
  faq: "/#faq",
  contact: "/contato",
} as const

export const primaryCtas = {
  talkToMavik: {
    label: "Conversar com a MAVIK",
    href: contactLinks.whatsappGeneral,
    external: true,
    target: "_blank",
    rel: "noopener noreferrer",
  },
  talkToSecretary: {
    label: "Falar com a Secretária IA",
    action: "openSecretary",
    source: "primary_cta",
  },
  viewProjects: {
    label: "Ver projetos",
    href: homeSectionLinks.cases,
    scrollTo: "cases",
  },
  instagram: {
    label: "Instagram",
    href: contactLinks.instagram,
    external: true,
    target: "_blank",
    rel: "noopener noreferrer",
  },
  contact: {
    label: "Contato",
    href: homeSectionLinks.contact,
  },
} as const

export const primaryNavigationItems = [
  { label: "Soluções", href: homeSectionLinks.solutions },
  { label: "Cases", href: homeSectionLinks.cases },
  { label: "Processo", href: homeSectionLinks.process },
  { label: "FAQ", href: homeSectionLinks.faq },
  { label: primaryCtas.contact.label, href: primaryCtas.contact.href },
] as const
