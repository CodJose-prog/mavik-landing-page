import { homeContent } from "../../lib/content/home"
import SectionContainer from "../shared/SectionContainer"
import SectionHeading from "../shared/SectionHeading"

export default function DifferentialsSection() {
  const { differentiatorsSection } = homeContent

  return (
    <section className="py-24 sm:py-28 lg:py-32" id="diferenciais">
      <SectionContainer>
        <div className="space-y-10">
          <SectionHeading
            eyebrow={differentiatorsSection.eyebrow}
            title={differentiatorsSection.title}
            description={differentiatorsSection.description}
            className="max-w-3xl"
          />

          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {differentiatorsSection.items.map((item, index) => (
              <article
                key={item.title}
                className="panel relative overflow-hidden rounded-[28px] px-5 py-6 sm:px-6 sm:py-7"
              >
                <div className="hairline absolute inset-x-8 top-0 h-px" aria-hidden />

                <div className="relative space-y-4">
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-[16px] border border-[rgba(123,103,255,0.24)] bg-[rgba(123,103,255,0.08)] text-sm font-semibold text-mavik-copper">
                    0{index + 1}
                  </span>

                  <div>
                    <h3 className="font-display text-[1.2rem] font-semibold tracking-[-0.04em] text-mavik-text">
                      {item.title}
                    </h3>
                    <p className="mt-3 text-sm leading-6 text-mavik-muted">{item.description}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </SectionContainer>
    </section>
  )
}
