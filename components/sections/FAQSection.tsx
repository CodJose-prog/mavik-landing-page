import { homeContent } from "../../lib/content/home";
import SectionContainer from "../shared/SectionContainer";
import SectionHeading from "../shared/SectionHeading";
import FAQItem from "../ui/FAQItem";

export default function FAQSection() {
  return (
    <section className="py-24 sm:py-28 lg:py-32" id="faq">
      <SectionContainer>
        <div className="space-y-12">
          <SectionHeading
            eyebrow="FAQ"
            title="Perguntas frequentes"
            description="Respostas objetivas sobre software sob medida, aplicativos, desenvolvimento web, automações e atendimento da MAVIK no Pará e em outras regiões do Brasil."
          />

          <div className="grid gap-4">
            {homeContent.faqItems.map((item) => (
              <FAQItem key={item.question} question={item.question} answer={item.answer} />
            ))}
          </div>
        </div>
      </SectionContainer>
    </section>
  );
}

