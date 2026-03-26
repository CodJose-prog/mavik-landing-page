import type { Metadata } from "next"
import { Instagram, Mail, MapPin, MessageCircle } from "lucide-react"
import Footer from "../../components/layout/Footer"
import Header from "../../components/layout/Header"
import OpenSecretaryButton from "../../components/assistant/OpenSecretaryButton"
import CTAButton from "../../components/shared/CTAButton"
import SectionContainer from "../../components/shared/SectionContainer"
import SectionHeading from "../../components/shared/SectionHeading"
import { companyInfo } from "../../lib/content/home"
import { siteConfig } from "../../lib/seo/site"
import { contactLinks, primaryCtas } from "../../lib/site-links"

export const metadata: Metadata = {
  title: "Contato",
  description:
    "Fale com a MAVIK sobre software sob medida, aplicativos, plataformas web, automação e sites institucionais premium no Pará e no Brasil.",
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "/contato",
  },
  openGraph: {
    title: "Contato | MAVIK",
    description:
      "Converse com a MAVIK sobre sistemas personalizados para empresas, aplicativos, plataformas web e soluções digitais com atuação no Pará e em outras regiões do Brasil.",
    url: `${siteConfig.url}/contato`,
    siteName: siteConfig.name,
    locale: siteConfig.locale,
    type: "website",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Contato com a MAVIK para projetos de software sob medida e soluções digitais.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Contato | MAVIK",
    description:
      "Atendimento para projetos de software sob medida, aplicativos, plataformas web, automações e sites institucionais premium.",
    images: ["/twitter-image"],
  },
}

const contactChannels = [
  {
    title: "WhatsApp",
    description: "Canal mais direto para iniciar uma conversa comercial com contexto.",
    value: companyInfo.phoneDisplay,
    href: contactLinks.whatsappProject,
    external: true,
    icon: MessageCircle,
  },
  {
    title: primaryCtas.instagram.label,
    description: "Canal institucional oficial da MAVIK para acompanhar presença e atualizações.",
    value: companyInfo.instagramHandle,
    href: primaryCtas.instagram.href,
    external: primaryCtas.instagram.external,
    icon: Instagram,
  },
  {
    title: "E-mail",
    description: "Melhor opção quando você precisa enviar contexto escrito ou material complementar.",
    value: companyInfo.email,
    href: `mailto:${companyInfo.email}`,
    external: false,
    icon: Mail,
  },
] as const

export default function ContactPage() {
  return (
    <>
      <Header />
      <main id="conteudo">
        <section className="relative overflow-hidden pb-16 pt-28 sm:pb-20">
          <div className="pointer-events-none absolute inset-0 bg-hero-mesh opacity-70" aria-hidden />

          <SectionContainer className="relative z-10">
            <div className="grid gap-8 lg:grid-cols-[minmax(0,1.08fr)_360px] lg:items-start">
              <div className="space-y-8">
                <SectionHeading
                  eyebrow="Contato"
                  title="Vamos entender o cenário da sua empresa e direcionar a conversa pelo canal mais útil"
                  description="Se o seu negócio precisa de mais estrutura digital, clareza operacional ou uma presença institucional mais forte, a conversa começa por contexto, prioridade e objetivo."
                />

                <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                  <CTAButton href={primaryCtas.talkToMavik.href} external={primaryCtas.talkToMavik.external}>
                    {primaryCtas.talkToMavik.label}
                  </CTAButton>
                  <OpenSecretaryButton source="contact_page_primary">{primaryCtas.talkToSecretary.label}</OpenSecretaryButton>
                  <CTAButton href={primaryCtas.instagram.href} external={primaryCtas.instagram.external} variant="secondary">
                    {primaryCtas.instagram.label}
                  </CTAButton>
                </div>

                <p className="max-w-3xl text-sm leading-7 text-mavik-muted">
                  Você pode começar pelo WhatsApp, organizar o contexto antes do envio com a Secretária IA ou usar o
                  Instagram oficial da MAVIK como canal institucional complementar.
                </p>
              </div>

              <aside className="panel rounded-[28px] p-5 sm:p-8">
                <div className="space-y-4">
                  {contactChannels.map((channel) => {
                    const Icon = channel.icon

                    return (
                      <a
                        key={channel.title}
                        href={channel.href}
                        target={channel.external ? "_blank" : undefined}
                        rel={channel.external ? "noopener noreferrer" : undefined}
                        className="block rounded-2xl border border-mavik-line bg-white/5 p-4 transition hover:border-[rgba(123,103,255,0.28)] hover:bg-white/[0.07]"
                      >
                        <div className="flex items-start gap-3">
                          <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-[16px] border border-[rgba(123,103,255,0.18)] bg-[rgba(123,103,255,0.08)] text-mavik-copper">
                            <Icon className="h-4.5 w-4.5" aria-hidden />
                          </span>

                          <div className="min-w-0">
                            <p className="text-sm font-semibold text-mavik-text">{channel.title}</p>
                            <p className="mt-1 text-sm leading-6 text-mavik-muted">{channel.description}</p>
                            <p className="mt-3 break-words text-sm font-semibold text-mavik-text">{channel.value}</p>
                          </div>
                        </div>
                      </a>
                    )
                  })}

                  <div className="rounded-2xl border border-mavik-line bg-white/5 p-4">
                    <div className="flex items-start gap-3">
                      <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-[16px] border border-[rgba(123,103,255,0.18)] bg-[rgba(123,103,255,0.08)] text-mavik-copper">
                        <MapPin className="h-4.5 w-4.5" aria-hidden />
                      </span>

                      <div>
                        <p className="text-sm font-semibold text-mavik-text">Atuação</p>
                        <p className="mt-1 text-sm leading-6 text-mavik-muted">
                          {companyInfo.primaryLocation}, {companyInfo.secondaryLocation} e projetos em outras regiões do
                          Brasil.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </aside>
            </div>
          </SectionContainer>
        </section>
      </main>
      <Footer />
    </>
  )
}
