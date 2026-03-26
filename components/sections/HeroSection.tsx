import { ArrowUpRight, Bot, MapPin } from "lucide-react"
import { homeContent } from "../../lib/content/home"
import { primaryCtas } from "../../lib/site-links"
import OpenSecretaryButton from "../assistant/OpenSecretaryButton"
import BadgeTag from "../shared/BadgeTag"
import CTAButton from "../shared/CTAButton"
import SectionContainer from "../shared/SectionContainer"

export default function HeroSection() {
  const { hero } = homeContent

  return (
    <section className="relative overflow-hidden pb-20 pt-10 sm:pb-24 sm:pt-14 lg:pb-24 lg:pt-10" id="top">
      <div className="pointer-events-none absolute inset-0 bg-hero-mesh opacity-80" aria-hidden />
      <div className="pointer-events-none absolute left-0 top-10 h-64 w-64 rounded-full bg-mavik-copper-soft blur-3xl" aria-hidden />
      <div
        className="pointer-events-none absolute right-0 top-4 h-72 w-72 rounded-full bg-[rgba(216,215,255,0.1)] blur-3xl"
        aria-hidden
      />
      <div className="hairline pointer-events-none absolute inset-x-0 top-0 h-px" aria-hidden />

      <SectionContainer className="relative z-10">
        <div className="grid gap-10 lg:min-h-[calc(100svh-132px)] lg:grid-cols-[minmax(0,1fr)_400px] lg:items-start xl:gap-12">
          <div className="space-y-8 pt-2">
            <div className="max-w-[700px] space-y-5">
              <div className="flex flex-wrap items-center gap-3">
                <BadgeTag className="border-[rgba(123,103,255,0.18)] bg-[rgba(123,103,255,0.12)] text-mavik-text">
                  Parceira de tecnologia
                </BadgeTag>
                <span className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-mavik-muted">
                  <MapPin className="h-3.5 w-3.5 text-mavik-copper" aria-hidden />
                  Santarém, Pará · atuação no Brasil
                </span>
              </div>

              <p className="max-w-3xl text-[11px] font-semibold uppercase tracking-[0.22em] text-mavik-muted-strong sm:text-xs">
                {hero.eyebrow}
              </p>

              <h1 className="font-display max-w-[780px] text-4xl font-semibold tracking-[-0.065em] text-balance text-mavik-text sm:text-[3.4rem] sm:leading-[1.02] lg:text-[4.45rem]">
                {hero.title}
              </h1>

              <p className="max-w-[720px] text-lg leading-8 text-mavik-muted sm:text-[1.16rem] sm:leading-9">
                {hero.description}
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <CTAButton href={hero.primaryCta.href} external={hero.primaryCta.external}>
                {hero.primaryCta.label}
              </CTAButton>
              <OpenSecretaryButton>{primaryCtas.talkToSecretary.label}</OpenSecretaryButton>
              <CTAButton
                href={hero.secondaryCta.href}
                scrollTo={hero.secondaryCta.scrollTo}
                variant="ghost"
                className="justify-start px-1 sm:px-3"
              >
                {hero.secondaryCta.label}
              </CTAButton>
            </div>

            <div className="rounded-[30px] border border-mavik-line bg-white/[0.03] p-5 sm:p-6">
              <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_280px] lg:items-start">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-mavik-copper">
                    Confiança comercial
                  </p>
                  <p className="mt-3 text-sm leading-7 text-mavik-muted-strong sm:text-[0.97rem]">{hero.trustLine}</p>
                </div>

                <div className="rounded-[24px] border border-[rgba(123,103,255,0.14)] bg-[linear-gradient(180deg,rgba(123,103,255,0.08),rgba(123,103,255,0.03))] p-4">
                  <div className="flex items-center gap-3">
                    <span className="inline-flex h-10 w-10 items-center justify-center rounded-[16px] border border-[rgba(123,103,255,0.18)] bg-[rgba(123,103,255,0.08)] text-mavik-copper">
                      <Bot className="h-4.5 w-4.5" aria-hidden />
                    </span>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-mavik-copper">
                        Triagem assistida
                      </p>
                      <p className="text-sm text-mavik-muted">Secretária IA integrada ao fluxo</p>
                    </div>
                  </div>
                  <p className="mt-4 text-sm leading-7 text-mavik-muted">
                    Atendimento inicial em tempo real para qualificar cenário e urgência antes do contato comercial.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <aside className="panel-strong relative overflow-hidden rounded-[34px] p-6 sm:p-7">
            <div className="hairline absolute inset-x-8 top-0 h-px" aria-hidden />

            <div className="relative space-y-6">
              <div className="space-y-3">
                <BadgeTag className="border-[rgba(216,215,255,0.16)] bg-white/[0.05] text-mavik-muted-strong">
                  Como a MAVIK conduz um projeto
                </BadgeTag>
                <h2 className="font-display text-[1.65rem] font-semibold tracking-[-0.05em] text-mavik-text">
                  Estrutura de entrega com leitura de negócio e continuidade técnica
                </h2>
                <p className="text-sm leading-7 text-mavik-muted">
                  O projeto precisa responder ao contexto real da operação, não apenas gerar presença visual.
                </p>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                {hero.proofCards.map((item, index) => (
                  <article
                    key={item.title}
                    className={`rounded-[24px] border border-mavik-line bg-white/[0.03] p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.03)] ${index === 2 ? "sm:col-span-2" : ""}`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="inline-flex h-8 w-8 items-center justify-center rounded-[12px] border border-[rgba(123,103,255,0.18)] bg-[rgba(123,103,255,0.08)] text-xs font-semibold text-mavik-copper">
                        0{index + 1}
                      </span>
                      <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-mavik-copper">
                        {item.eyebrow}
                      </p>
                    </div>
                    <h3 className="font-display mt-3 text-[1.02rem] font-semibold tracking-[-0.04em] text-mavik-text">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-sm leading-6 text-mavik-muted">{item.description}</p>
                  </article>
                ))}
              </div>

              <div className="rounded-[26px] border border-[rgba(123,103,255,0.16)] bg-[rgba(123,103,255,0.08)] p-5">
                <div className="flex items-start justify-between gap-4">
                  <div className="space-y-2">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-mavik-copper">
                      Atendimento inicial inteligente
                    </p>
                    <p className="text-sm leading-7 text-mavik-muted-strong">
                      A Secretária IA qualifica a conversa e reduz atrito no primeiro contato.
                    </p>
                  </div>
                  <ArrowUpRight className="mt-1 h-4.5 w-4.5 shrink-0 text-mavik-copper" aria-hidden />
                </div>

                <div className="mt-4 border-t border-white/10 pt-4">
                  <OpenSecretaryButton size="sm" className="w-full justify-between">
                    {primaryCtas.talkToSecretary.label}
                  </OpenSecretaryButton>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </SectionContainer>
    </section>
  )
}
