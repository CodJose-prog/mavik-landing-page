import Image from "next/image";
import Link from "next/link";
import { WHATSAPP_NUMBER } from "../utils/whatsapp";

export default function Footer() {
  const whatsappHref = `https://wa.me/${WHATSAPP_NUMBER}`;

  return (
    <footer className="border-t border-mavik-secondary/20 bg-[#fdfdfd] text-[#171123]">
      <div className="section-shell py-12">
        <div className="grid gap-10 md:grid-cols-3">
          <div className="space-y-4">
            <Link href="/" className="inline-flex items-center" aria-label="Ir para o inicio">
              <Image
                src="/brand/logo.svg"
                alt="MAVIK"
                width={375}
                height={225}
                sizes="(min-width: 1024px) 60px, (min-width: 640px) 54px, 48px"
                className="h-7 w-auto object-contain sm:h-8"
              />
            </Link>
            <p className="text-sm text-[#171123]/70">
              Criadores de soluções digitais inteligentes para empresas que querem crescer com tecnologia.
            </p>
            <div className="border-t border-mavik-secondary/20">
              <div className="py-4 text-xs text-[#171123]/60">
                © 2026 MAVIK. Todos os direitos reservados.
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <p className="text-sm font-semibold text-[#171123]">Soluções</p>
            <nav className="flex flex-col gap-2 text-sm text-[#171123]/70" aria-label="Solucoes">
              <a className="transition hover:text-[#6f2dbd]" href="#sistemas-online">
                Sistemas Online
              </a>
              <a className="transition hover:text-[#6f2dbd]" href="#sob-medida">
                Desenvolvimento Sob Medida
              </a>
              <a className="transition hover:text-[#6f2dbd]" href="#manutencao">
                Planos de Manutenção
              </a>
              <a className="transition hover:text-[#6f2dbd]" href="#sistemas">
                Biblioteca de Sistemas
              </a>
            </nav>
          </div>

          <div className="space-y-3">
            <p className="text-sm font-semibold text-[#171123]">Contato</p>
            <div className="space-y-2 text-sm text-[#171123]/70">
              <a className="transition hover:text-[#6f2dbd]" href={whatsappHref} target="_blank" rel="noreferrer">
                (93) 99227-3046
              </a><br></br>
              <span>Santarém - PA</span><br></br>
              <a className="transition hover:text-[#6f2dbd]" href="mailto:mavikstm@gamil.com">
                mavikstm@gamil.com
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
