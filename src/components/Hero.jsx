import { Icon } from './icons';

/*
 * Hero — semantic, crawlable, and the anchor of the entry orchestration.
 * Entry animation is driven from Loader.jsx via WAAPI on [data-entry] nodes and
 * completes within the 500ms budget (compositor-only opacity/transform).
 */
export default function Hero() {
  return (
    <header id="top" className="relative overflow-hidden">
      {/* Ambient accent glow (decorative) */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-[-12%] h-[440px] w-[760px] -translate-x-1/2 rounded-full bg-accent/15 blur-[130px]" />
        <div className="absolute left-[15%] top-[10%] h-[280px] w-[280px] rounded-full bg-saffron/10 blur-[120px]" />
      </div>

      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6" aria-label="Primary">
        <a href="#top" className="flex items-center gap-2 font-display text-lg font-bold tracking-tight text-powder">
          <Icon name="cube" size={24} className="text-accent" />
          fluxion
        </a>
        <div className="hidden items-center gap-8 font-display text-sm text-muted md:flex">
          <a href="#features" className="transition-colors duration-200 ease-micro hover:text-powder">platform</a>
          <a href="#pricing" className="transition-colors duration-200 ease-micro hover:text-powder">pricing</a>
          <a href="#proof" className="transition-colors duration-200 ease-micro hover:text-powder">customers</a>
        </div>
        <div className="flex items-center gap-3">
          {/* Search affordance — uses the provided search glyph */}
          <button
            aria-label="Search docs"
            className="hidden items-center gap-2 rounded-lg border border-line bg-elevated/40 px-3 py-2 font-display text-xs text-muted transition-colors duration-200 ease-micro hover:text-powder sm:flex"
          >
            <Icon name="search" size={16} />
            <span>search docs</span>
            <kbd className="rounded bg-ink px-1.5 py-0.5 text-[10px] text-muted">⌘K</kbd>
          </button>
          <a href="#pricing" className="rounded-lg bg-accent px-4 py-2 font-display text-sm font-bold text-ink transition-[filter] duration-200 ease-micro hover:brightness-105">
            get started
          </a>
        </div>
      </nav>

      <div className="mx-auto max-w-6xl px-6 pb-20 pt-16 text-center md:pt-24">
        <span data-entry="1" className="inline-flex items-center gap-2 rounded-full border border-line bg-elevated/50 px-4 py-1.5 font-display text-xs font-medium text-accent">
          <Icon name="link" size={14} /> 200+ native connectors
        </span>
        <h1 data-entry="2" className="mx-auto mt-6 max-w-4xl font-display text-4xl font-bold leading-[1.08] tracking-tight md:text-6xl">
          Automate your data,<br />
          <span className="text-accent">at the speed of thought</span>
        </h1>
        <p data-entry="3" className="mx-auto mt-6 max-w-2xl text-lg text-muted">
          Fluxion turns raw, messy data into governed, real-time automation pipelines — built visually, run autonomously, observed end to end.
        </p>
        <div data-entry="4" className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <a href="#pricing" className="group inline-flex items-center gap-2 rounded-lg bg-accent px-6 py-3 font-display font-bold text-ink transition-[filter] duration-200 ease-micro hover:brightness-105">
            start free — no card
            <Icon name="chevronRight" size={16} className="transition-transform duration-200 ease-micro group-hover:translate-x-0.5" />
          </a>
          <a href="#features" className="inline-flex items-center gap-2 rounded-lg border border-line px-6 py-3 font-display font-semibold text-powder transition-colors duration-200 ease-micro hover:border-accent">
            see how it works
          </a>
        </div>
      </div>
    </header>
  );
}
