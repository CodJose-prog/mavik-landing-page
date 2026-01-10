"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const steps = [
  {
    title: "Escolha a solução",
    description: "Selecione sistema online, manutenção, sistema pronto ou projeto sob medida.",
  },
  {
    title: "Conte sua operação",
    description: "Informe detalhes da operação, usuários e unidades (quando aplicável).",
  },
  {
    title: "Confirme a vigência",
    description: "Sistemas online e manutenção exigem contrato mínimo de 12 meses.",
  },
  {
    title: "Envie no WhatsApp",
    description: "A mensagem é montada automaticamente e aberta para envio.",
  },
];

export default function HowItWorks() {
  return (
    <section id="como-funciona" className="section-shell py-16">
      <div className="flex flex-col gap-3">
        <p className="text-sm font-semibold text-mavik-primary">Como funciona</p>
        <h2 className="text-3xl font-bold text-mavik-dark sm:text-4xl">Fluxo simples e direto</h2>
        <p className="max-w-2xl text-mavik-dark/70">
          Um caminho rápido para montar o pedido e fechar pelo WhatsApp com total clareza de escopo.
        </p>
      </div>

      <div className="mt-10 grid gap-4 md:grid-cols-2">
        {steps.map((step, index) => (
          <motion.div
            key={step.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ delay: index * 0.05 }}
            className="glass rounded-2xl p-6 shadow-soft"
          >
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-mavik-primary/10 text-sm font-bold text-mavik-primary">
                {index + 1}
              </span>
              <div>
                <h3 className="text-lg font-semibold text-mavik-dark">{step.title}</h3>
                <p className="text-sm text-mavik-dark/70">{step.description}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-6 inline-flex items-center gap-2 rounded-full bg-mavik-light px-4 py-2 text-sm font-semibold text-mavik-primary">
        Contrato mínimo de 12 meses
        <ArrowRight className="h-4 w-4" aria-hidden />
      </div>
    </section>
  );
}

