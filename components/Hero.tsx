"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Headset, ShieldCheck, Zap } from "lucide-react";
import { buildWhatsAppLink } from "../utils/whatsapp";

const bullets = [
  { icon: Zap, text: "Mais agilidade" },
  { icon: ShieldCheck, text: "Menos retrabalho" },
  { icon: Headset, text: "Suporte de verdade" },
];

export default function Hero() {
  const whatsappMessage =
    "Olá! Quero entender as opções da MAVIK e falar sobre contrato e orçamento. Meu objetivo é: ";

  return (
    <section id="top" className="relative overflow-hidden pb-20 pt-28">
      <div className="absolute inset-0 bg-hero-gradient" aria-hidden />
      <div className="pointer-events-none absolute left-1/4 top-10 h-56 w-56 rounded-full bg-mavik-primary/20 blur-3xl" />
      <div className="pointer-events-none absolute right-10 top-20 h-64 w-64 rounded-full bg-mavik-dark/25 blur-3xl" />

      <div className="section-shell relative grid gap-12 lg:grid-cols-2 lg:items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-8"
        >

          <div className="space-y-4">
            <h1 className="text-3xl font-bold leading-tight text-mavik-dark sm:text-4xl lg:text-5xl">
              Soluções prontas e sob medida para vender, organizar e crescer.
            </h1>
            <p className="max-w-xl text-lg text-mavik-dark/70">
              Sistemas online prontos para usar, projetos sob medida e manutenção contínua com contrato mínimo de 12
              meses. Tudo resolvido pelo WhatsApp com clareza e agilidade.
            </p>
          </div>

          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <Link
              href="#sistemas-online"
              className="inline-flex items-center justify-center rounded-full bg-mavik-primary px-6 py-3 text-sm font-semibold text-white shadow-glow transition hover:-translate-y-0.5 hover:bg-mavik-secondary"
            >
              Ver sistemas online
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>

            <a
              href={buildWhatsAppLink(whatsappMessage)}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center rounded-full border border-mavik-primary/60 px-6 py-3 text-sm font-semibold text-mavik-primary transition hover:-translate-y-0.5 hover:border-mavik-primary hover:text-mavik-secondary"
            >
              Falar no WhatsApp
            </a>
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            {bullets.map(({ icon: Icon, text }) => (
              <div key={text} className="glass flex items-center gap-3 rounded-2xl px-4 py-3 shadow-soft">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-mavik-light text-mavik-primary">
                  <Icon className="h-5 w-5" aria-hidden />
                </span>
                <p className="text-sm font-semibold text-mavik-dark">{text}</p>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="relative rounded-3xl border border-white/60 bg-white/70 p-8 shadow-soft backdrop-blur-lg"
        >
          <div className="absolute -left-8 -top-8 h-24 w-24 rounded-full bg-mavik-primary/10 blur-2xl" />
          <div className="absolute -right-6 bottom-6 h-32 w-32 rounded-full bg-mavik-dark/10 blur-2xl" />
          <div className="relative space-y-4">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-mavik-primary">
              Atendimento guiado
            </p>
            <h3 className="text-2xl font-bold text-mavik-dark">Seu pedido pronto para fechar no WhatsApp.</h3>
            <p className="text-mavik-dark/70">
              Informe o que precisa, confirme a vigência mínima de 12 meses e envie a mensagem pronta para a equipe
              MAVIK.
            </p>
            <ul className="space-y-2 text-sm text-mavik-dark/70">
              <li className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-mavik-primary" />
                Vigência mínima de 12 meses
              </li>
              <li className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-mavik-primary" />
                Time local, atendimento humano e ágil
              </li>
              <li className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-mavik-primary" />
                Ofertas que escalam com a sua operação
              </li>
            </ul>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
