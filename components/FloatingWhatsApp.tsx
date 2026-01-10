"use client";

import { MessageCircle } from "lucide-react";
import { buildWhatsAppLink } from "../utils/whatsapp";

export default function FloatingWhatsApp() {
  const message = "Olá! Quero falar com a MAVIK sobre ofertas e orçamento.";
  return (
    <a
      href={buildWhatsAppLink(message)}
      target="_blank"
      rel="noreferrer"
      aria-label="Abrir WhatsApp da MAVIK"
      className="fixed bottom-6 right-6 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-mavik-primary text-white shadow-glow transition hover:scale-105 hover:bg-mavik-secondary"
    >
      <MessageCircle className="h-6 w-6" aria-hidden />
    </a>
  );
}
