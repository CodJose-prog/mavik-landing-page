# MAVIK — Landing Page

Landing page criada com Next.js 16 (app router + TypeScript) que apresenta a consultoria digital MAVIK, guiando o visitante pelos serviços principais e abrindo o WhatsApp já com a mensagem de pedido pronta. O foco é demonstrar soluções SaaS, sistemas prontos, projetos sob medida e planos de manutenção, tudo com navegação suave, animações leves (Framer Motion) e uma camada de interação baseada em formulários e mensagens pré-formatadas.

## Seções e experiência
- **Top/hero** com gradiente personalizado, CTA para sistemas online e botão para abrir o WhatsApp com mensagem padrão.
- **SaaS prontos** (ArenaCalendar) renderizados a partir dos dados em `src/lib/offerings.ts` e com CTA para o checkout multi-etapa.
- **Projetos sob medida** com cards que descrevem sites estratégicos, automações e sistemas customizados, cada um abrindo o Whatsapp com texto focado.
- **Planos de manutenção** e **biblioteca de sistemas** (dados em `lib/systems.ts`), incluindo modais com detalhes, botão para contratar online e opção para licenciar/adaptar.
- **Fluxo “Como funciona”**, **FAQ**, **depoimentos** e **contato** com formulário guiado que formata número e abre o WhatsApp com resumo dos dados.
- **Floating WhatsApp** e **Header fixo** garantem acesso rápido ao atendimento em qualquer ponto do site.
- Página secundária `/contato` replica o formulário principal para quem entra direto por esse link.

## Integração com WhatsApp e checkout
- `CheckoutWhatsApp` (em `src/components/checkout`) escuta o evento `mavik-open-checkout`, mostra um overlay multi-step (SaaS, manutenção ou sistema) e valida etapas antes de montar a mensagem com `buildSaasMessage`, `buildMaintenanceMessage`, `buildSystemSaasMessage` e `buildSystemLicenseMessage` (todos em `utils/whatsappQuotes.ts`).
- Os botões das seções chamam `openCheckout` (em `utils/checkout.ts`) com o modo/submodelo correto, disparando o evento que abre o formulário.
- `utils/whatsapp.ts` padroniza o número `5593992273046` e cria links com `encodeURIComponent`.
- Formulários do contato e do checkout usam máscaras (via `formatBRPhone`) e validações simples para garantir nome, e-mail e WhatsApp válidos antes de enviar.

## Arquitetura e estilo
- **Next.js 16 + app router** (`app/layout.tsx` define metadata, ícones e importa a fonte `Space Grotesk` via `next/font/google`).
- **Tailwind CSS** com paleta personalizada (`tailwind.config.ts`: `mavik-primary`, `mavik-secondary`, `mavik-dark`, `mavik-light`, sombras/glow e background gradient).
- **Estilo global** em `app/globals.css`, incluindo background radial gradients, utilitários (`.glass`, `.section-shell`, `.gradient-border`) e focus states.
- **Dados declarativos** em `src/lib/offerings.ts` (planos SaaS + manutenção) e `lib/systems.ts` (fichas de sistemas prontos), facilitando manutenção e expansão de cards.
- **Componentes “client”** usam `framer-motion`, `lucide-react` e hooks (`useState`, `useEffect`, `useMemo`) para animações, modais e validações.
- **Assets**: logos/favicons em `public/brand` (logo, isologo, favicon). O `Header` importa esse logo e monta o nav.

## Rodando o projeto localmente
1. `npm install`
2. Copie `.env` (já presente) ou defina `NEXT_PUBLIC_SITE_URL=https://mavik.cloud` se precisar apontar outra URL para o metadata do layout.
3. `npm run dev` para ambiente de desenvolvimento (porta 3000 por padrão).
4. `npm run build` seguido de `npm run start` para produção.
5. `npm run lint` garante que o ESLint (configurado em `eslint.config.mjs` / `.eslintrc.json`) passe sem avisos.

> ✅ O `checkout` foi pensado para abrir o WhatsApp com contratos mínimos de 12 meses e informações completas do cliente. Ajustes de serviços, preços ou planos ficam centralizados em `src/lib/offerings.ts`, `lib/systems.ts` e `components/Plans.tsx` / `Saas.tsx`.

## Próximos passos que ajudam recrutadores
1. **Documentar métricas de usabilidade**: já há etapas guiadas e CTA distribuídos, vale destacar no README o porquê de cada seção.
2. **Adicionar testes visuais ou screenshots**: facilita a avaliação da estética antes de abrir o deploy.
3. **Conectar analytics** (Vercel, Google Analytics, etc.) para mostrar quantos leads chegam via o checkout baseado em WhatsApp.
4. **Atualizar `NEXT_PUBLIC_SITE_URL`** quando for subir para o domínio final e documentar o processo (ex.: Vercel Environment Variables).

Caso precise de ajuda para subir no GitHub/GitHub Pages ou adicionar badges/status, posso orientar também.
