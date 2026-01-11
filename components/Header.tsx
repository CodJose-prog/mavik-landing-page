"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { buildWhatsAppLink } from "../utils/whatsapp";

const navItems = [
  { label: "Sistemas online", href: "#sistemas-online" },
  { label: "Sob medida", href: "#sob-medida" },
  { label: "Manutenção", href: "#manutencao" },
  { label: "Biblioteca", href: "#sistemas" },
  { label: "Contato", href: "#contato" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const goToSection = (id: string) => {
    if (pathname === "/") {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
        return;
      }
    }
    router.push(`/#${id}`);
  };

  const whatsappMessage =
    "Olá! Quero falar com a equipe MAVIK sobre sistemas online, projetos sob medida e manutenção.";

  return (
    <header
      className={`fixed top-0 z-30 w-full transition-all ${
        scrolled ? "bg-mavik-light/80 backdrop-blur-md shadow-lg" : "bg-transparent"
      }`}
    >
      <div className="section-shell flex items-center gap-6 py-4">
        <Link href="/" className="inline-flex shrink-0 items-center" aria-label="Ir para o inicio">
          <Image
            src="/brand/logo.svg"
            alt="MAVIK"
            width={395}
            height={245}
            sizes="(min-width: 1024px) 68px, (min-width: 640px) 60px, 54px"
            priority
            className="h-10 w-auto shrink-0 object-contain sm:h-10 md:h-12 drop-shadow-sm"
          />
        </Link>

        <nav className="hidden flex-1 items-center justify-center gap-8 text-sm font-medium text-mavik-dark/70 lg:flex">
          {navItems.map((item) => (
            <button
              key={item.href}
              type="button"
              onClick={() => goToSection(item.href.replace("#", ""))}
              className="transition hover:text-mavik-primary"
            >
              {item.label}
            </button>
          ))}
        </nav>

        <a
          href={buildWhatsAppLink(whatsappMessage)}
          target="_blank"
          rel="noreferrer"
          className="hidden shrink-0 rounded-full bg-mavik-primary px-5 py-2 text-sm font-semibold text-white shadow-glow transition hover:-translate-y-0.5 hover:bg-mavik-secondary lg:inline-flex"
        >
          Falar no WhatsApp
        </a>
      </div>
    </header>
  );
}
