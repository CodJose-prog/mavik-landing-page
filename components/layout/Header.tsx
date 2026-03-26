import Image from "next/image"
import Link from "next/link"
import { navigationItems } from "../../lib/content/home"
import { primaryCtas } from "../../lib/site-links"
import CTAButton from "../shared/CTAButton"
import SectionContainer from "../shared/SectionContainer"

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-[rgba(246,247,255,0.06)] bg-[rgba(4,5,12,0.8)] shadow-[0_12px_36px_rgba(0,0,0,0.14)] backdrop-blur-xl">
      <SectionContainer>
        <div className="flex items-center justify-between gap-4 py-2.5">
          <div className="flex min-w-0 items-center gap-4">
            <Link href="/" className="inline-flex shrink-0 items-center gap-3" aria-label="Ir para a página inicial da MAVIK">
              <span className="inline-flex rounded-[18px] border border-white/10 bg-[#f6f7ff] px-3.5 py-2.5 shadow-[0_10px_30px_rgba(0,0,0,0.18)]">
                <Image
                  src="/brand/logo.svg"
                  alt="Logo da MAVIK"
                  width={128}
                  height={48}
                  className="h-7 w-auto"
                  priority
                />
              </span>
            </Link>

            <div className="hidden min-w-0 border-l border-white/10 pl-4 lg:block">
              <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-mavik-copper">
                Software house
              </p>
              <p className="truncate text-sm text-mavik-muted">Santarém, Pará · atuação regional e nacional</p>
            </div>
          </div>

          <nav className="hidden items-center gap-1 md:flex" aria-label="Navegação principal">
            {navigationItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="group relative rounded-[14px] px-4 py-2.5 text-sm font-semibold text-mavik-muted transition hover:bg-white/[0.03] hover:text-mavik-text"
              >
                <span>{item.label}</span>
                <span className="absolute inset-x-4 bottom-1 h-px origin-left scale-x-0 bg-[rgba(123,103,255,0.7)] transition duration-200 group-hover:scale-x-100" />
              </Link>
            ))}
          </nav>

          <div className="hidden items-center gap-3 md:flex">
            <p className="hidden text-xs font-semibold uppercase tracking-[0.18em] text-mavik-muted xl:block">
              Diagnóstico · projeto · evolução
            </p>
            <CTAButton href={primaryCtas.talkToMavik.href} external={primaryCtas.talkToMavik.external} size="sm">
              {primaryCtas.talkToMavik.label}
            </CTAButton>
          </div>

          <details className="relative md:hidden">
            <summary className="inline-flex min-h-[44px] cursor-pointer list-none items-center rounded-[16px] border border-mavik-line bg-white/[0.04] px-4 py-2 text-sm font-semibold text-mavik-text transition hover:bg-white/[0.06]">
              Menu
            </summary>
            <div className="panel absolute right-0 top-full mt-3 w-72 rounded-[28px] p-4">
              <div className="border-b border-mavik-line pb-3">
                <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-mavik-copper">MAVIK</p>
                <p className="mt-2 text-sm leading-6 text-mavik-muted">
                  Software sob medida, plataformas web, apps e presença institucional premium.
                </p>
              </div>

              <nav className="mt-3 flex flex-col gap-2" aria-label="Navegação móvel">
                {navigationItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="rounded-[16px] px-3 py-3 text-sm font-semibold text-mavik-muted transition hover:bg-white/[0.05] hover:text-mavik-text"
                  >
                    {item.label}
                  </Link>
                ))}
                <div className="pt-2">
                  <CTAButton
                    href={primaryCtas.talkToMavik.href}
                    external={primaryCtas.talkToMavik.external}
                    size="sm"
                    className="w-full"
                  >
                    {primaryCtas.talkToMavik.label}
                  </CTAButton>
                </div>
              </nav>
            </div>
          </details>
        </div>
      </SectionContainer>
    </header>
  )
}
