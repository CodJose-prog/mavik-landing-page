import Image from "next/image"
import Link from "next/link"
import { Instagram, Mail, MessageCircle } from "lucide-react"
import { companyInfo, homeContent, navigationItems } from "../../lib/content/home"
import { contactLinks, primaryCtas } from "../../lib/site-links"
import SectionContainer from "../shared/SectionContainer"

const footerContactItems = [
  {
    label: "WhatsApp",
    value: companyInfo.phoneDisplay,
    href: contactLinks.whatsappGeneral,
    icon: MessageCircle,
    external: true,
  },
  {
    label: primaryCtas.instagram.label,
    value: companyInfo.instagramHandle,
    href: primaryCtas.instagram.href,
    icon: Instagram,
    external: true,
  },
  {
    label: "E-mail",
    value: companyInfo.email,
    href: `mailto:${companyInfo.email}`,
    icon: Mail,
    external: false,
  },
] as const

export default function Footer() {
  return (
    <footer className="border-t border-[rgba(243,237,228,0.06)] bg-[#04070b]">
      <SectionContainer className="py-16 sm:py-20">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1.1fr)_280px_320px]">
          <div className="space-y-6">
            <Link href="/" className="inline-flex rounded-[18px] border border-white/10 bg-[#f6f7ff] px-3.5 py-2.5 shadow-[0_10px_30px_rgba(0,0,0,0.18)]">
              <Image src="/brand/logo.svg" alt="Logo da MAVIK" width={128} height={48} className="h-7 w-auto" />
            </Link>

            <div className="space-y-4">
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-mavik-copper">
                Software house
              </p>
              <p className="max-w-2xl text-base leading-8 text-mavik-muted">{homeContent.footer.description}</p>
              <p className="max-w-2xl text-sm leading-7 text-mavik-muted">{homeContent.footer.region}</p>
              <p className="max-w-2xl text-sm leading-7 text-mavik-muted">{homeContent.footer.contact}</p>
            </div>
          </div>

          <div className="panel-strong rounded-[30px] p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-mavik-copper">Navegação</p>
            <nav className="mt-5 flex flex-col gap-2" aria-label="Links institucionais">
              {navigationItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="rounded-[14px] px-3 py-2.5 text-sm font-semibold text-mavik-muted transition hover:bg-white/[0.04] hover:text-mavik-text"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>

          <div className="panel-strong rounded-[30px] p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-mavik-copper">Contato</p>
            <address className="mt-5 space-y-3 text-sm not-italic text-mavik-muted">
              {footerContactItems.map((item) => {
                const Icon = item.icon

                return (
                  <a
                    key={item.label}
                    href={item.href}
                    target={item.external ? "_blank" : undefined}
                    rel={item.external ? "noopener noreferrer" : undefined}
                    className="block rounded-[18px] border border-transparent px-3 py-3 transition hover:border-mavik-line hover:bg-white/[0.04] hover:text-mavik-copper"
                  >
                    <span className="flex items-start gap-3">
                      <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-[14px] border border-[rgba(123,103,255,0.18)] bg-[rgba(123,103,255,0.08)] text-mavik-copper">
                        <Icon className="h-4.5 w-4.5" aria-hidden />
                      </span>
                      <span className="min-w-0">
                        <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-mavik-muted-strong">
                          {item.label}
                        </span>
                        <span className="mt-1 block break-words text-base font-semibold text-mavik-text">
                          {item.value}
                        </span>
                      </span>
                    </span>
                  </a>
                )
              })}
              <div className="rounded-[18px] border border-mavik-line bg-white/[0.03] px-4 py-4">
                <p>{companyInfo.primaryLocation}</p>
                <p className="mt-2">{companyInfo.serviceArea}</p>
              </div>
            </address>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-[rgba(243,237,228,0.08)] pt-6 text-xs uppercase tracking-[0.18em] text-mavik-muted sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 MAVIK. Tecnologia aplicada ao negócio com clareza, estrutura e continuidade.</p>
          <p>Santarém · Pará · Brasil</p>
        </div>
      </SectionContainer>
    </footer>
  )
}
