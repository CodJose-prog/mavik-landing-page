import heroAsset from "../../public/assets/hero/creatvise-GNMd5gkTOVY-unsplash.jpg"
import { Bot, MapPin } from "lucide-react"
import { homeContent } from "../../lib/content/home"
import { primaryCtas } from "../../lib/site-links"
import OpenSecretaryButton from "../assistant/OpenSecretaryButton"
import BadgeTag from "../shared/BadgeTag"
import CTAButton from "../shared/CTAButton"
import EditorialAsset from "../shared/EditorialAsset"
import SectionContainer from "../shared/SectionContainer"

export default function HeroSection() {
  const { hero } = homeContent
  const [regionalPresence, businessFit, continuity] = hero.proofCards
  const floatingCardClassName =
    "rounded-[24px] border border-white/14 bg-[linear-gradient(180deg,rgba(255,255,255,0.18),rgba(255,255,255,0.06))] p-4 shadow-[0_24px_60px_rgba(0,0,0,0.26)] backdrop-blur-xl"

  return (
    <section className="relative overflow-hidden pb-16 pt-6 sm:pb-20 sm:pt-8 lg:pb-20 lg:pt-4" id="top">
      <div className="pointer-events-none absolute inset-0 bg-hero-mesh opacity-80" aria-hidden />
      <div
        className="pointer-events-none absolute left-0 top-8 h-56 w-56 rounded-full bg-mavik-copper-soft blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute right-0 top-0 h-64 w-64 rounded-full bg-[rgba(216,215,255,0.1)] blur-3xl"
        aria-hidden
      />
      <div className="hairline pointer-events-none absolute inset-x-0 top-0 h-px" aria-hidden />

      <SectionContainer className="relative z-10">
        <div className="grid gap-10 lg:min-h-[calc(100svh-168px)] lg:grid-cols-[minmax(0,0.9fr)_minmax(520px,1.1fr)] lg:items-start xl:min-h-[calc(100svh-156px)] xl:grid-cols-[minmax(0,0.84fr)_minmax(600px,1.16fr)] xl:gap-14">
          <div className="space-y-7">
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
          </div>

          <aside className="lg:pl-2 lg:pt-10 xl:pt-12">
            <EditorialAsset
              asset={heroAsset}
              alt="Ambiente visual futurista com iluminação violeta para representar sofisticação tecnológica"
              sizes="(min-width: 1440px) 640px, (min-width: 1280px) 46vw, (min-width: 1024px) 52vw, 100vw"
              priority
              quality={92}
              className="aspect-[1/1] min-h-[400px] sm:aspect-[6/5] sm:min-h-0 lg:aspect-[15/11] xl:aspect-[16/11]"
              imageClassName="object-contain object-center px-4 py-6 sm:px-8 sm:py-8 lg:px-8 lg:py-10"
              baseOverlayClassName="bg-[linear-gradient(180deg,rgba(4,5,12,0.06)_0%,rgba(4,5,12,0.14)_52%,rgba(4,5,12,0.32)_100%)]"
              overlayClassName="bg-[radial-gradient(circle_at_16%_18%,rgba(255,255,255,0.14),transparent_22%),radial-gradient(circle_at_85%_20%,rgba(123,103,255,0.22),transparent_28%),radial-gradient(circle_at_78%_82%,rgba(216,215,255,0.1),transparent_24%)]"
            >
              <div className="relative h-full p-4 sm:p-6 lg:p-7">
                <BadgeTag className="absolute left-4 top-4 border-white/16 bg-white/10 text-mavik-muted-strong backdrop-blur-xl sm:left-6 sm:top-6">
                  Entrega estruturada
                </BadgeTag>

                <article
                  className={`${floatingCardClassName} absolute left-4 top-16 max-w-[12rem] sm:left-6 sm:top-20 sm:max-w-[13rem]`}
                >
                  <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-mavik-copper">
                    {regionalPresence.eyebrow}
                  </p>
                  <h2 className="font-display mt-2 text-base font-semibold tracking-[-0.045em] text-mavik-text sm:text-[1.05rem]">
                    {regionalPresence.title}
                  </h2>
                </article>

                <article
                  className={`${floatingCardClassName} absolute right-4 top-[24%] hidden max-w-[11.5rem] sm:block sm:right-6 sm:max-w-[12.5rem]`}
                >
                  <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-mavik-copper">
                    {businessFit.eyebrow}
                  </p>
                  <h2 className="font-display mt-2 text-base font-semibold tracking-[-0.045em] text-mavik-text sm:text-[1.05rem]">
                    {businessFit.title}
                  </h2>
                </article>

                <article
                  className={`${floatingCardClassName} absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-auto sm:max-w-[19rem]`}
                >
                  <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-mavik-copper">
                    {continuity.eyebrow}
                  </p>
                  <h2 className="font-display mt-2 text-[1.05rem] font-semibold tracking-[-0.045em] text-mavik-text sm:text-[1.15rem]">
                    {continuity.title}
                  </h2>
                  <p className="mt-2 text-sm leading-6 text-mavik-muted-strong">{continuity.description}</p>
                </article>
              </div>
            </EditorialAsset>
          </aside>
        </div>
      </SectionContainer>
    </section>
  )
}
