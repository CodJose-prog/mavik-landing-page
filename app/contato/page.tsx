import Contact from "../../components/Contact";
import FloatingWhatsApp from "../../components/FloatingWhatsApp";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import { buildWhatsAppLink } from "../../utils/whatsapp";

export default function ContactPage() {
  const whatsappMessage =
    "Olá! Quero fechar contrato e orçamento com a MAVIK pelo WhatsApp. Meu objetivo é: ";

  return (
    <main className="relative min-h-screen overflow-hidden">
      <Header />
      <section className="section-shell pb-12 pt-28">
        <div className="max-w-3xl space-y-4">
          <p className="text-sm font-semibold text-mavik-primary">Contato</p>
          <h1 className="text-3xl font-bold text-mavik-dark sm:text-4xl">Contato e orçamento</h1>
          <p className="text-mavik-dark/70">
            Vamos montar seu contrato e orçamento por lá. Atendimento rápido pelo WhatsApp para alinhar detalhes e
            prazos.
          </p>
          <a
            href={buildWhatsAppLink(whatsappMessage)}
            target="_blank"
            rel="noreferrer"
            className="inline-flex w-fit items-center justify-center rounded-full bg-mavik-primary px-6 py-3 text-sm font-semibold text-white shadow-glow transition hover:-translate-y-0.5 hover:bg-mavik-secondary"
          >
            Fechar pelo WhatsApp
          </a>
        </div>
      </section>
      <Contact />
      <Footer />
      <FloatingWhatsApp />
    </main>
  );
}
