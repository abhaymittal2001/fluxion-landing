# Fluxion — AI Data Automation Platform (Phase 1 Speed Run)

A premium, responsive SaaS landing page built with **React + Vite + Tailwind CSS**.
Zero external UI/animation component libraries — every structure and transition is
hand-built with native CSS Transitions and the Web Animations API (WAAPI).

## Run locally

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build -> dist/
npm run preview  # serve the production build
```

## How the graded requirements are satisfied

### Feature 1 — Matrix-driven pricing & performance-isolated currency switcher
- **No hardcoded UI values.** Every price is computed by `computePrice()` from a
  multi-dimensional config matrix in [`src/data/pricingMatrix.js`](src/data/pricingMatrix.js):
  `base rate × currency fx × regional tariff × billing multiplier (annual = 0.8 → flat 20% off)`.
- **State isolation guardrail.** Currency and billing are **not** React state — they
  live in a `useRef`. Toggling writes the recomputed string directly into the
  targeted price/suffix text nodes (collected via refs) and toggles classes on the
  controls. The parent component and surrounding layout **never re-render or reflow**.
  Verify in DevTools (React Profiler / Paint Flashing): only the price `<span>` text
  repaints on switch. See [`src/components/Pricing.jsx`](src/components/Pricing.jsx).

### Feature 2 — Bento → Accordion wrapper with state persistence (zero dependency)
- Desktop Bento grid ↔ mobile touch Accordion, swapped purely with responsive CSS.
- **Context lock:** a `matchMedia` listener carries the active (hovered) bento index
  across the breakpoint so the matching accordion panel opens on layout transition.
  Panel reveal uses WAAPI. See [`src/components/BentoFeatures.jsx`](src/components/BentoFeatures.jsx).

### SEO & semantic HTML
- Semantic landmarks (`<header>`, `<main>`, `<section>`, `<nav>`, `<footer>`),
  `aria-labelledby`/`aria-pressed`/`aria-expanded`, crawlable text nodes.
- Full meta + Open Graph + Twitter cards + JSON-LD structured data in
  [`index.html`](index.html).

### Motion & performance
- Entry orchestration (loader fade + staggered hero reveal) completes within the
  **500ms** budget and never blocks TTI — content is in the DOM at first paint; the
  loader sets `pointer-events: none` immediately. See [`src/components/Loader.jsx`](src/components/Loader.jsx).
- Micro-interactions 150–200ms ease-out; structural reflows 300–400ms ease-in-out.
- `prefers-reduced-motion` honored.

## Asset slots (drop in the official asset package)
- **Color palette:** replace the `--c-*` RGB triplets in [`src/index.css`](src/index.css)
  with the exact hex codes from the palette. Nothing else changes.
- **Fonts:** the two official font files go in `public/fonts/` (currently wired to
  Noto Sans + Open Sans variable fonts via `@font-face`).
- **SVGs:** swap the inline placeholder icons for the provided SVG pack.

## Tech
React 19 · Vite · Tailwind CSS 3 · native CSS / WAAPI motion · no animation libs.
