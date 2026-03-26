# Plano Técnico e Estratégico de Refatoração da Landing Page MAVIK

## Objetivo

Reposicionar a landing page da MAVIK como uma empresa de soluções digitais madura, confiável e premium, com foco institucional, narrativa clara, melhor SEO/GEO, maior percepção de autoridade e conversão mais qualificada para WhatsApp e portfólio.

## 1. Auditoria da Landing Page Atual

### Resumo executivo

A homepage atual comunica melhor um funil de contratação por WhatsApp do que uma software house institucional. A estrutura prioriza oferta, contratação e vigência mínima de contrato logo no topo da experiência. Isso enfraquece percepção de maturidade, reduz autoridade, dilui posicionamento e empobrece SEO semântico.

### Diagnóstico técnico priorizado

| Área | Problema encontrado | Impacto | Solução recomendada | Prioridade |
| --- | --- | --- | --- | --- |
| Hero | O `h1` atual é genérico e orientado a venda ("vender, organizar e crescer"), sem tese institucional clara | Baixa diferenciação e percepção de empresa genérica | Reescrever o hero com posicionamento institucional, setor, tipo de parceria e resultado de negócio | Alta |
| Hero | O bloco lateral do hero é um mini-checkout de WhatsApp | A homepage parece uma página comercial transacional, não uma empresa premium | Trocar o card por prova institucional: capacidades, tipo de cliente, sinais de processo e confiança | Alta |
| Copy | A copy repete "sistema online", "contrato de 12 meses" e "WhatsApp" como eixo central | O discurso fica operacional e vendedor demais | Reposicionar a linguagem para negócio, operação, previsibilidade, evolução e parceria tecnológica | Alta |
| Hierarquia visual | A página abre com muitos CTAs de contratação e cards comerciais em sequência | O visitante não entende primeiro quem é a MAVIK, para quem ela trabalha e por que confiar | Reorganizar a IA para apresentar marca, proposta de valor, problemas resolvidos, serviços, cases e processo antes da conversão | Alta |
| Seções | A estrutura atual é: Hero > SaaS > Projetos > Planos > Sistemas > Contato | A ordem prioriza catálogo e compra antes de autoridade e contexto | Migrar para uma ordem institucional guiada por narrativa | Alta |
| CTA | Há CTA para WhatsApp no header, hero, cards, floating button, contato e checkout overlay | Pressão comercial excessiva e redução da sensação premium | Concentrar CTAs primários em pontos estratégicos e usar CTA secundário para portfólio/cases | Alta |
| Prova social | Não há prova social real na homepage | Falta confiança para negócios consultivos | Inserir cases reais, logos, depoimentos verificáveis, números de operação e segmentos atendidos | Alta |
| Portfólio | A seção `Projects` descreve ofertas, não cases reais | O visitante não vê histórico, método ou repertório de entrega | Criar seção de cases com contexto, desafio, solução e resultado | Alta |
| Posicionamento | A homepage mistura software house, catálogo SaaS, manutenção e biblioteca de sistemas | O posicionamento fica difuso e de baixo valor percebido | Definir MAVIK como parceira de tecnologia para estruturar operação digital | Alta |
| Consistência institucional | Existem textos institucionais fracos e genéricos no footer e hero | A marca não sustenta percepção de autoridade | Reescrever mensagens-mãe, manifesto curto e microcopies institucionais | Alta |
| SEO on-page | Metadata global é mínima e genérica | Baixa clareza semântica para busca e pouca competitividade orgânica | Definir títulos, descriptions, canonical, OG/Twitter, headings e entidade organizacional mais específicos | Alta |
| SEO técnico | Não há `robots.ts`, `sitemap.ts` nem dados estruturados | Perde rastreabilidade, indexação otimizada e entendimento por mecanismos de busca e IA | Implementar sitemap, robots e schema `Organization`/`LocalBusiness`/`Service`/`FAQPage` | Alta |
| GEO / local SEO | A presença local aparece apenas em texto simples e de forma superficial | Baixa relevância para buscas locais e citações por IA | Estruturar NAP consistente, área de atuação, cidade/estado, FAQ local e schema local | Alta |
| GEO / answer engine | Não existem blocos textuais pensados para respostas generativas | Menor chance de ser citado por mecanismos de IA | Escrever seções objetivas sobre quem é a MAVIK, o que faz, para quem, onde atende e como trabalha | Média |
| Performance | Quase toda a homepage está em Client Components | Mais hidratação, JS desnecessário e custo de renderização | Tornar a homepage majoritariamente Server Components e isolar interatividade | Alta |
| Performance | `framer-motion` é usado em praticamente todas as seções | Bundle maior para efeitos discretos | Remover a dependência ou restringir a poucos pontos realmente interativos | Média |
| Performance | O checkout multi-step é carregado na homepage institucional | A home carrega uma camada pesada para uma ação secundária | Tirar o checkout da home institucional e levar fluxos comerciais para páginas/contextos específicos | Alta |
| UX | A navegação do header aponta para categorias comerciais, não para blocos institucionais | A exploração fica orientada a compra, não a entendimento | Atualizar navegação para empresa, soluções, cases, processo, FAQ e contato | Média |
| UX | Há duas camadas de contato: formulário e checkout/modal, ambos levando ao WhatsApp | Duplicidade de fluxo e ruído cognitivo | Manter um fluxo simples: CTA consultivo + formulário institucional enxuto | Média |
| UX | O floating WhatsApp é permanente e dominante | Sensação de insistência comercial | Reduzir presença visual e usar apenas após rolagem/contexto | Média |
| Conteúdo | O FAQ existe no código, mas não é renderizado na homepage | Perde oportunidade de remover objeções e gerar SEO | Reintroduzir FAQ com perguntas estratégicas e dados estruturados | Média |
| Conteúdo | Depoimentos e "Como funciona" existem no código, mas não entram na home | Prova e processo ficam invisíveis | Substituir por versões mais maduras e incorporar na arquitetura nova | Média |
| Conteúdo | A seção "Sistemas online - EM BREVE MAIS SISTEMAS !" comunica improviso | Reduz credibilidade premium | Remover linguagem de catálogo emergente e usar linguagem estável | Alta |
| Institucional | O email do footer está incorreto (`gamil.com`) | Quebra de confiança e risco de perda de leads | Corrigir contato e padronizar dados institucionais | Alta |
| Marca | A direção visual atual usa roxo brilhante, glow e glassmorphism como linguagem dominante | A percepção tende para landing comercial e não para consultoria premium | Migrar para direção mais sóbria, editorial e precisa | Alta |
| Responsividade | A experiência mobile ainda prioriza cards e CTAs empilhados | A leitura fica cansativa e muito comercial | Redesenhar ritmo mobile com menos pressão e mais progressão narrativa | Média |

## 2. Evidências no código atual

- A homepage atual monta a sequência `Header > Hero > Saas > Projects > Plans > Systems > Contact > Footer > FloatingWhatsApp > CheckoutWhatsApp`, confirmando uma IA orientada a contratação e catálogo.
- O hero atual usa discurso genérico e transacional.
- O bloco lateral do hero é explicitamente um atendimento guiado para "fechar no WhatsApp".
- O CTA e o overlay de checkout aparecem como eixo central da experiência, inclusive fora de contexto institucional.
- O metadata global atual define apenas título e descrição genéricos, sem canonical, Twitter cards, robots, sitemap ou schema.
- FAQ, depoimentos e "como funciona" existem no repositório, mas não entram na homepage.

## 3. Problemas por frente de análise

### Hero

- Falta uma tese institucional clara.
- A headline não posiciona a MAVIK como parceira de tecnologia.
- O texto secundário empurra vigência contratual cedo demais.
- O card lateral simula fechamento comercial em vez de fortalecer confiança.

### Copy

- Predomínio de frases operacionais e comerciais.
- Vocabulário amplo e pouco defensável: "soluções digitais", "crescer com tecnologia", "agilidade".
- Ausência de mensagens sobre governança, previsibilidade, continuidade, integração e impacto operacional.

### Hierarquia visual

- O primeiro bloco já divide atenção entre headline, CTA, bullets e um pseudo-checkout.
- Em seguida, a página entra em grade de cards sucessivos, com baixa variação de ritmo.
- Há pouca sensação editorial, pouca pausa e pouca hierarquia entre narrativa, prova e oferta.

### Seções

- As seções funcionam como um catálogo.
- Não existe bloco forte de "quem somos", "como pensamos" ou "que tipo de parceiro somos".
- Não existe sequência narrativa que leve de contexto para confiança e então para conversão.

### CTA

- O WhatsApp virou o objetivo visual principal da página.
- Falta um CTA de consideração, como "ver cases" ou "conhecer o processo".
- O CTA deveria qualificar, não pressionar.

### Prova social

- Não há logos, números, clientes, segmentos ou cases reais.
- O componente de depoimentos tem exemplos genéricos e não está publicado.

### Portfólio

- Não há portfólio institucional.
- A seção "Projetos" vende tipos de entrega, mas não mostra repertório nem maturidade.

### SEO on-page

- Título e descrição muito amplos.
- Headings pouco semânticos para intenção institucional.
- Falta reforço de entidade de marca, serviços, setores e localização.
- Faltam páginas de apoio para cluster semântico.

### GEO / local SEO

- A localização está presente, mas pouco explorada.
- Não há estratégia explícita para Santarém/PA, Pará e atendimento regional/nacional.
- Não há dados estruturados locais nem padronização forte de nome, telefone, email e área atendida.

### Performance

- A home depende de muitos Client Components.
- Animações simples estão sendo resolvidas com biblioteca pesada.
- O overlay de checkout adiciona complexidade desnecessária à home institucional.

### Consistência institucional

- A marca ora se apresenta como software house, ora como SaaS, ora como manutenção, ora como biblioteca de sistemas.
- Isso reduz especialização percebida.

## 4. Reposicionamento recomendado para a MAVIK

### Tese de marca

A MAVIK deve se apresentar como parceira de tecnologia para empresas que precisam estruturar, digitalizar e evoluir processos com clareza, previsibilidade e execução sob medida.

### Posicionamento central

"A MAVIK desenvolve sistemas, experiências web e soluções operacionais para empresas que precisam de tecnologia bem construída, sem improviso e com visão de continuidade."

### Mensagem-mãe

"Tecnologia aplicada ao negócio com método, clareza e responsabilidade de longo prazo."

### Pilares de copy

- Clareza antes de persuasão.
- Autoridade sem exagero.
- Benefício operacional em vez de promessa vaga.
- Maturidade, previsibilidade e parceria.
- Linguagem objetiva, sem jargão vazio.

### Frases que a marca deve evitar

- "Somos apaixonados por tecnologia"
- "Levamos seu negócio para o próximo nível"
- "Soluções inovadoras para transformar seu negócio"
- "Venda mais todos os dias"
- "Feche agora pelo WhatsApp"

### Frases que a marca deve preferir

- "Projetamos e desenvolvemos soluções digitais que sustentam a operação."
- "Transformamos demandas difusas em escopo claro, entrega consistente e evolução contínua."
- "Tecnologia não como peça isolada, mas como parte da rotina, da gestão e do crescimento."
- "Cada projeto parte do contexto do negócio, não de um pacote genérico."

## 5. Nova Arquitetura Ideal da Landing Page

### Ordem recomendada

1. Header institucional
2. Hero institucional
3. Proposta de valor
4. Problemas que a MAVIK resolve
5. Serviços com foco em benefício
6. Cases / projetos reais
7. Diferenciais
8. Processo de trabalho
9. FAQ
10. CTA final
11. Rodapé institucional forte

### Estrutura detalhada

#### 1. Header institucional

- Logo
- Navegação: Soluções, Cases, Processo, FAQ, Contato
- CTA discreto: "Falar com a MAVIK"

#### 2. Hero institucional

- Eyebrow: `Software sob medida, sites institucionais e estrutura digital para empresas`
- H1: `Tecnologia bem construída para empresas que precisam operar com mais clareza, controle e consistência`
- Texto de apoio: foco em parceria, diagnóstico, execução e evolução
- CTA primário: `Conversar com a MAVIK`
- CTA secundário: `Ver projetos`
- Apoio visual: composição institucional, números ou prova curta, nunca mini-checkout

#### 3. Proposta de valor

Bloco curto respondendo:

- O que a MAVIK entrega
- Para quem entrega
- Como trabalha
- Por que isso reduz risco para o cliente

Exemplo:

"A MAVIK atua ao lado de empresas que já entenderam que tecnologia não pode depender de improviso. Estruturamos sistemas, produtos web e rotinas digitais com foco em operação, confiabilidade e evolução."

#### 4. Problemas que a MAVIK resolve

Bloco de dores objetivas:

- operação descentralizada
- retrabalho manual
- informação dispersa
- site que não representa a empresa
- sistema antigo ou frágil
- falta de parceiro técnico confiável

#### 5. Serviços com foco em benefício

Agrupar em 3 frentes:

- Sistemas sob medida
- Sites institucionais e páginas estratégicas
- Evolução, manutenção e sustentação

Cada serviço deve responder:

- quando faz sentido
- qual problema resolve
- que ganho operacional entrega

#### 6. Cases / projetos reais

Formato recomendado:

- nome do cliente ou segmento
- contexto
- desafio
- solução implementada
- resultado percebido

Se ainda não houver autorização para expor cliente:

- usar cases anônimos por segmento
- incluir escopo e resultado concreto
- evitar mockups vazios

#### 7. Diferenciais

Pontos sugeridos:

- diagnóstico e escopo com clareza
- desenvolvimento com responsabilidade técnica
- comunicação direta
- continuidade após a entrega
- foco em contexto real do negócio

#### 8. Processo de trabalho

Fluxo em 4 etapas:

- Entendimento do contexto
- Definição de escopo e prioridade
- Execução com checkpoints
- Entrega, acompanhamento e evolução

#### 9. FAQ

Perguntas recomendadas:

- A MAVIK atende apenas Santarém/PA?
- Vocês desenvolvem do zero ou também evoluem sistemas existentes?
- Como funciona o processo comercial e técnico?
- A MAVIK presta suporte após a entrega?
- Em quais tipos de projeto a empresa atua melhor?
- Como saber se preciso de site, automação ou sistema sob medida?

#### 10. CTA final

Tom consultivo:

- título: `Se a sua operação pede mais estrutura digital, a MAVIK pode ajudar`
- texto: `Começamos entendendo o cenário, avaliando o que faz sentido e definindo próximos passos com clareza.`
- CTA primário: `Conversar pelo WhatsApp`
- CTA secundário: `Ver portfólio`

#### 11. Rodapé institucional forte

- resumo institucional
- localização e área de atuação
- email e WhatsApp corretos
- navegação institucional
- possíveis links para portfólio, LinkedIn e política de privacidade

## 6. Diretriz de Copy por Seção

### Hero

- Falar de contexto empresarial, não de venda imediata.
- Evitar preço, plano e contrato no topo da página.
- Mostrar benefício de negócio e perfil de cliente.

### Serviços

- Descrever entregas como instrumentos de organização e crescimento operacional.
- Evitar lista seca de recursos.
- Sempre traduzir recurso em consequência prática.

### Cases

- Narrativa factual.
- Mostrar decisão, execução e resultado.
- Menos adjetivo, mais contexto.

### CTA

- CTA principal deve convidar para conversa qualificada.
- CTA secundário deve sustentar consideração.

### FAQ

- Respostas curtas, diretas e com linguagem de confiança.
- Úteis para SEO e GEO.

## 7. Diretriz Visual Recomendada

### Direção geral

A interface deve sair do repertório "landing de oferta" e migrar para uma linguagem mais editorial, precisa e institucional. Menos brilho, menos glass, menos cor saturada e mais contraste, espaço e composição.

### Paleta sugerida

Base:

- `Graphite` `#111318`
- `Stone` `#3B4350`
- `Cloud` `#F4F2EE`
- `Paper` `#FCFBF8`

Acento:

- `Copper` `#A46A3E` ou
- `Deep Teal` `#1E4E5A`

Uso:

- fundo claro levemente aquecido
- textos quase pretos
- acento apenas em CTA, links e pequenos marcadores
- evitar glow roxo e gradientes evidentes como linguagem principal

### Tipografia

Objetivo:

- sofisticada, estável e legível

Sugestões:

- títulos: `Manrope`, `Plus Jakarta Sans` ou `Sora`
- corpo: `Source Sans 3` ou `Instrument Sans`

Critério:

- títulos com personalidade controlada
- corpo neutro e altamente legível

### Grid

- container entre `1200px` e `1280px`
- grid de 12 colunas no desktop
- blocos com largura máxima menor para copy longa
- assimetria leve em hero e cases

### Espaçamento

- ritmo vertical base de `32 / 48 / 64 / 96`
- mais respiro entre seções
- cards com padding consistente e menos densidade visual

### Ícones

- usar com parcimônia
- traço simples e discreto
- nunca como protagonista visual

### Ritmo visual

- alternar blocos de texto amplo, grades enxutas e áreas de prova
- evitar sucessão de cards idênticos
- criar pausas com blocos de copy institucional

### Microinterações

- hover sutil em links e botões
- transições curtas em opacidade, border e elevação
- reveal simples com CSS ou classes utilitárias
- sem scroll-jacking, parallax exagerado ou carrosséis

### Responsividade

- mobile com leitura linear e respiro generoso
- hero sem card competitivo ao lado
- CTAs menos frequentes
- cases em stack com resumo claro
- sticky actions apenas se não competirem com a leitura

## 8. Recomendação Técnica de Implementação

### Estrutura de código sugerida

```text
app/
  layout.tsx
  page.tsx
  contato/page.tsx
  sitemap.ts
  robots.ts
components/
  sections/
    HeroInstitutional.tsx
    ValueProposition.tsx
    ProblemsSolved.tsx
    ServicesOverview.tsx
    CaseStudies.tsx
    Differentials.tsx
    WorkProcess.tsx
    FAQInstitutional.tsx
    FinalCTA.tsx
  shared/
    Header.tsx
    Footer.tsx
    SectionHeading.tsx
    WhatsAppButton.tsx
lib/
  content/
    institutional.ts
    cases.ts
    faq.ts
  seo/
    metadata.ts
    schema.ts
```

### Princípios técnicos

- Server Components por padrão.
- Client Components apenas para FAQ expansível, header mobile e interações pontuais.
- Remover `framer-motion` se a nova experiência usar apenas transições discretas.
- Centralizar copy em arquivos de conteúdo tipados.
- Separar claramente homepage institucional de fluxos comerciais.

## 9. SEO e GEO: Recomendações Práticas

### SEO técnico

- Definir `metadata` mais específico para home e `/contato`
- Adicionar `alternates.canonical`
- Adicionar Open Graph e Twitter card completos
- Criar `app/sitemap.ts`
- Criar `app/robots.ts`
- Implementar schema `Organization`
- Implementar schema `LocalBusiness` se a operação local for estratégica
- Implementar schema `Service` nas frentes principais
- Implementar schema `FAQPage`

### SEO on-page

- Um `h1` forte e institucional
- H2s com termos ligados a intenção real de busca
- Copy semântica com "software sob medida", "desenvolvimento de sistemas", "soluções web", "automação de processos", "site institucional"
- Cases com contexto setorial e termos de negócio

### GEO / AEO

- Incluir bloco objetivo "Quem é a MAVIK"
- Incluir bloco "Onde a MAVIK atua"
- Incluir FAQ respondendo perguntas literais
- Garantir consistência de nome, cidade, estado, telefone, email e área de atuação
- Estruturar textos para serem facilmente citáveis por IA

### Local SEO

- Reforçar Santarém/PA de forma institucional, não promocional
- Usar referência a atendimento regional e remoto, se isso for real
- Inserir links externos coerentes, como mapa ou perfil empresarial, se existirem
- Padronizar NAP em footer, schema e página de contato

## 10. Checklist de Implementação por Fases

### Fase 1: Estrutura

- [ ] Reorganizar a homepage para a nova ordem institucional
- [ ] Remover da home o checkout multi-step e o excesso de CTAs transacionais
- [ ] Criar componentes por seção com responsabilidade clara
- [ ] Revisar header e footer com foco institucional
- [ ] Definir modelo de dados para cases, FAQ e serviços

### Fase 2: Copy

- [ ] Reescrever hero, proposta de valor e rodapé
- [ ] Reescrever serviços em linguagem orientada a benefício
- [ ] Criar seção de problemas resolvidos
- [ ] Criar cases reais ou anonimizados com narrativa factual
- [ ] Revisar microcopy dos CTAs para tom consultivo
- [ ] Eliminar frases genéricas e linguagem de venda agressiva

### Fase 3: SEO / GEO

- [ ] Refinar metadata da home
- [ ] Criar metadata específica da página de contato
- [ ] Implementar `sitemap.ts`
- [ ] Implementar `robots.ts`
- [ ] Adicionar schema `Organization` / `LocalBusiness` / `Service` / `FAQPage`
- [ ] Padronizar NAP institucional
- [ ] Revisar headings, alt texts e semântica HTML

### Fase 4: UI refinada

- [ ] Revisar paleta, tipografia e tokens de espaçamento
- [ ] Trocar estética glass/glow por linguagem mais sóbria
- [ ] Redesenhar cards, grids e ritmo entre seções
- [ ] Ajustar responsividade com foco em leitura
- [ ] Aplicar microinterações discretas com CSS/Tailwind

### Fase 5: Performance final

- [ ] Converter o máximo possível para Server Components
- [ ] Reduzir JS na homepage
- [ ] Remover dependências de animação se não forem essenciais
- [ ] Revisar carregamento de fontes e assets
- [ ] Validar `npm run lint` e `npm run build`
- [ ] Auditar Lighthouse em mobile e desktop

## 11. Decisões estratégicas importantes

- A homepage institucional não deve ser o mesmo lugar do fluxo de contratação detalhado.
- O portfólio precisa existir como prova, não apenas como promessa.
- O WhatsApp deve continuar forte, mas como canal de conversa qualificada, não como mecanismo dominante da identidade.
- A MAVIK precisa parecer uma empresa que entende operação e continuidade, não uma página que tenta fechar o lead no primeiro scroll.

## 12. Resultado esperado após a refatoração

Se esse plano for executado corretamente, a MAVIK deve ganhar:

- mais autoridade percebida
- posicionamento mais claro como parceira de tecnologia
- experiência mais confiável e madura
- base técnica melhor para SEO e GEO
- conversão mais qualificada para WhatsApp
- mais valor percebido para serviços consultivos e projetos sob medida
