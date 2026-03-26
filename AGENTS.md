# MAVIK Engineering Instructions

## Mission
Build and refine MAVIK's institutional website and lead-generation flows with a premium, credible, market-mature frontend.
The result must feel handcrafted by a senior product team, never like generic AI-generated UI.

## Product Context
MAVIK is a software house focused on:
- custom software
- SaaS platforms
- web systems
- mobile apps
- automation
- premium institutional websites

This website is not a salesy landing page.
It must position MAVIK as a serious technology partner.

## Core Principles
1. Premium over flashy
2. Clarity over density
3. Authority over hype
4. Real UX over decorative effects
5. Business positioning over "marketing page" clichés
6. Production-ready code only

## Visual Direction
Reference quality level:
- Stripe
- Linear
- Vercel
- Apple

Do not copy layouts or brand assets from any external company.
Use them only as a quality benchmark.

The UI must communicate:
- maturity
- clarity
- technical credibility
- elegance
- restraint

## Design Rules
- Prefer spacious layouts with strong visual hierarchy
- Use clean section separation
- Avoid overcrowded blocks
- Use subtle borders like `border-white/10`
- Prefer zinc/slate palettes over saturated colors
- Use restrained gradients only when they add depth
- Use rounded corners like `rounded-2xl` and `rounded-3xl`
- Keep shadows subtle
- Every hover/interaction must feel intentional
- Typography must be sharp, modern, and readable
- Large headings should use tighter tracking
- Supporting text must prioritize readability and rhythm

## UX Rules
- The page must read like a premium company website, not a launch page
- Every section must have a clear purpose
- No empty decorative blocks
- No carousel unless there is a strong usability reason
- No oversized badges saying obvious things
- Avoid fake dashboards or fake metrics unless explicitly provided
- CTA placement must be strategic, not repetitive spam

## Frontend Engineering Rules
- Use Next.js App Router
- Use TypeScript strict mode
- Use Tailwind CSS
- Use functional components with `const`
- Define explicit interfaces/types for props
- Keep components small, composable, and reusable
- Prefer server components where possible
- Use client components only when needed
- Use `next/image` for real images
- Prioritize semantic HTML and accessibility
- Use early returns
- No semicolons
- Avoid over-abstracting too early
- Avoid giant components
- Avoid unnecessary dependencies

## Motion Rules
- Motion must be subtle and premium
- Use Framer Motion only where it improves perceived quality
- Avoid bouncy or exaggerated animations
- Prefer opacity, translate, and slight blur transitions
- Standard transitions should feel smooth and restrained

## Accessibility Rules
- Keyboard navigation must work
- Interactive elements must have visible focus states
- Use ARIA labels where needed
- Ensure color contrast is acceptable
- Use proper heading order
- Use landmarks and semantic sections

## SEO and GEO Rules
This website must be structured for strong SEO and GEO.

Always:
- write semantic headings
- maintain one clear H1 per page
- use descriptive section titles
- optimize metadata
- support institutional/local search intent
- reinforce MAVIK as a software company in Pará/Brazil without keyword stuffing
- make content understandable to both users and generative engines

## Copywriting Rules
The copy must sound:
- premium
- institutional
- confident
- direct
- mature

Never write like:
- generic agency clichés
- startup hype
- aggressive sales pages
- empty AI buzzwords

Avoid phrases like:
- "transforming ideas into reality"
- "we are passionate about technology"
- "take your business to the next level"

Prefer:
- concrete business value
- operational clarity
- technical authority
- strategic positioning

## AI Secretary Feature Rules
We are also implementing an AI Secretary for real-time lead qualification and client guidance.

The AI Secretary must:
- feel professional, clear, and trustworthy
- answer in PT-BR by default
- support EN when needed
- guide the user toward contact or qualification
- avoid robotic or overly verbose replies
- never fabricate capabilities, prices, deadlines, or client results
- escalate to WhatsApp/contact CTA when appropriate
- collect lead context naturally:
  - name
  - company
  - type of project
  - urgency
  - budget range if relevant
- keep the experience fast and conversational
- prioritize lead clarity over gimmicks

## Delivery Standard
Before implementing any feature:
1. Describe the intended hierarchy and UX flow
2. List libraries/hooks that will be used
3. Implement production-ready code
4. Validate responsiveness
5. Validate accessibility
6. Validate consistency with premium design rules

## Commit Convention
Use:
`<type>(<scope>): <description>`

Examples:
- `feat(lp): rebuild premium hero section`
- `feat(ai): implement real-time lead secretary widget`
- `refactor(ui): improve case study card hierarchy`
- `fix(a11y): add focus-visible states to navigation`