"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

const faqs = [
  {
    question: "O domínio está incluso?",
    answer:
      "Sim. O domínio personalizado está incluso e registramos em seu nome, cuidando de toda a configuração.",
  },
  {
    question: "Preciso ter site ou sistema pronto?",
    answer:
      "Não. Atendemos desde projetos do zero até evolução de soluções já existentes.",
  },
  {
    question: "Como funciona a vigência mínima de 12 meses?",
    answer:
      "Sistemas online e manutenção têm contrato mínimo de 12 meses para garantir continuidade, suporte e evolução.",
  },
  {
    question: "Posso contratar apenas o sistema online?",
    answer:
      "Sim. Você escolhe o sistema online, confirma a opção desejada e finaliza o pedido pelo WhatsApp.",
  },
  {
    question: "Como funciona o suporte por WhatsApp?",
    answer:
      "Atendimento direto com a equipe MAVIK, com tempo de resposta combinado e acompanhamento contínuo.",
  },
  {
    question: "Vocês fazem sistemas sob medida?",
    answer:
      "Sim. Montamos escopo, cronograma e orçamento alinhados à sua operação.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="section-shell py-16">
      <div className="flex flex-col gap-3">
        <p className="text-sm font-semibold text-mavik-primary">FAQ</p>
        <h2 className="text-3xl font-bold text-mavik-dark sm:text-4xl">Perguntas frequentes</h2>
        <p className="max-w-2xl text-mavik-dark/70">
          Transparência antes de contratar. Se ainda restar dúvida, chamamos no WhatsApp e respondemos rápido.
        </p>
      </div>

      <div className="mt-8 space-y-3">
        {faqs.map((faq, index) => {
          const isOpen = openIndex === index;
          return (
            <div key={faq.question} className="rounded-2xl border border-white/70 bg-white/80 p-4 shadow-soft backdrop-blur">
              <button
                onClick={() => setOpenIndex(isOpen ? null : index)}
                className="flex w-full items-center justify-between gap-4 text-left"
                aria-expanded={isOpen}
                aria-controls={`faq-${index}`}
              >
                <span className="text-base font-semibold text-mavik-dark">{faq.question}</span>
                <ChevronDown
                  className={`h-5 w-5 text-mavik-primary transition-transform ${isOpen ? "rotate-180" : ""}`}
                  aria-hidden
                />
              </button>
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.p
                    id={`faq-${index}`}
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.2 }}
                    className="pt-3 text-sm text-mavik-dark/70"
                  >
                    {faq.answer}
                  </motion.p>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </section>
  );
}

