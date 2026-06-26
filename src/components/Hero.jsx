/*
 * Hero — semantic, crawlable, and the anchor of the entry orchestration.
 * Entry animation is a single CSS keyframe set (staggered via animation-delay)
 * that completes well within the 500ms budget and never blocks TTI: the text is
 * in the DOM at paint, only opacity/transform animate (compositor-only).
 */
export default function Hero() {
  return (
    <header id="top" className="relative overflow-hidden">
      {/* Ambient accent glow (decorative) */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-[-10%] h-[420px] w-[720px] -translate-x-1/2 rounded-full bg-accent/20 blur-[120px]" />
      </div>

      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6" aria-label="Primary">
        <a href="#top" className="flex items-center gap-2 font-display text-lg font-bold">
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden="true" className="text-accent">
            <path d="M4 7h6M4 12h10M4 17h7M16 5l4 4-4 4" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Fluxion
        </a>
        <div className="hidden items-center gap-8 text-sm text-muted md:flex">
          <a href="#features" className="transition-colors duration-200 ease-micro hover:text-white">Platform</a>
          <a href="#pricing" className="transition-colors duration-200 ease-micro hover:text-white">Pricing</a>
          <a href="#proof" className="transition-colors duration-200 ease-micro hover:text-white">Customers</a>
        </div>
        <a href="#pricing" className="rounded-xl bg-accent px-4 py-2 text-sm font-semibold text-ink transition-[filter] duration-200 ease-micro hover:brightness-110">
          Get started
        </a>
      </nav>

      <div className="mx-auto max-w-6xl px-6 pb-20 pt-16 text-center md:pt-24">
        <span data-entry="1" className="inline-flex items-center gap-2 rounded-full border border-line bg-elevated px-4 py-1.5 text-xs font-semibold text-accent">
          <span className="h-1.5 w-1.5 rounded-full bg-accent" /> Now with autonomous agents
        </span>
        <h1 data-entry="2" className="mx-auto mt-6 max-w-4xl font-display text-5xl font-bold leading-[1.05] tracking-tight md:text-7xl">
          Automate your data,<br />
          <span className="text-accent">at the speed of thought</span>
        </h1>
        <p data-entry="3" className="mx-auto mt-6 max-w-2xl text-lg text-muted">
          Fluxion turns raw, messy data into governed, real-time automation pipelines — built visually, run autonomously, observed end to end.
        </p>
        <div data-entry="4" className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <a href="#pricing" className="rounded-xl bg-accent px-6 py-3 font-semibold text-ink transition-[filter] duration-200 ease-micro hover:brightness-110">
            Start free — no card
          </a>
          <a href="#features" className="rounded-xl border border-line px-6 py-3 font-semibold text-white transition-colors duration-200 ease-micro hover:border-accent">
            See how it works
          </a>
        </div>
      </div>
    </header>
  );
}
