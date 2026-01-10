import { WHATSAPP_NUMBER } from "../utils/whatsapp";

export default function Footer() {
  const whatsappHref = `https://wa.me/${WHATSAPP_NUMBER}`;

  return (
    <footer className="border-t border-mavik-secondary/20 bg-[#fdfdfd] text-[#171123]">
      <div className="section-shell py-12">
        <div className="grid gap-10 md:grid-cols-3">
          <div className="space-y-3">
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
