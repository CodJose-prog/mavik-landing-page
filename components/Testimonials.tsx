"use client";

import { motion } from "framer-motion";
import { Quote } from "lucide-react";

const testimonials = [
  {
    name: "Vitor Avelino",
    role: "VA Imports",
    text: "Com a MAVIK mantivemos o site atualizado e mais rápido. As correções entram em horas.",
  },
  {
    name: "Dr. Paulo Menezes",
    role: "Clínica",
    text: "Eles monitoram tudo e avisam antes de virar problema. O suporte por WhatsApp realmente responde.",
  },
  {
    name: "Marcos Vidal",
    role: "Distribuidora",
    text: "Precisávamos de pequenas automações e ajustes constantes. O plano PRO trouxe previsibilidade e entregas mensais.",
  },
];

export default function Testimonials() {
  return (
    <section id="depoimentos" className="section-shell py-16">
      <div className="flex flex-col gap-3">
        <p className="text-sm font-semibold text-mavik-primary">Depoimentos</p>
        <h2 className="text-3xl font-bold text-mavik-dark sm:text-4xl">Clientes que mantêm o digital no ar</h2>
        <p className="max-w-2xl text-mavik-dark/70">
          Relatos reais de quem escolheu suporte contínuo e melhorias frequentes.
        </p>
      </div>

      <div className="mt-10 grid gap-6 md:grid-cols-3">
        {testimonials.map((testimonial, index) => (
          <motion.div
            key={testimonial.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ delay: index * 0.08 }}
            className="glass rounded-2xl p-6 shadow-soft"
          >
            <Quote className="h-6 w-6 text-mavik-primary" aria-hidden />
            <p className="mt-4 text-sm text-mavik-dark/80">
              &ldquo;{testimonial.text}&rdquo;
            </p>
            <div className="mt-4 text-sm font-semibold text-mavik-dark">{testimonial.name}</div>
            <div className="text-xs text-mavik-dark/60">{testimonial.role}</div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

