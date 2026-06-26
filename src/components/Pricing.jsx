import { useRef, useEffect } from 'react';
import { TIERS, CURRENCIES, BILLING, computePrice, formatPrice } from '../data/pricingMatrix';

/*
 * STATE-ISOLATION GUARDRAIL
 * -------------------------
 * Currency + billing are intentionally NOT React state. They live in a ref so a
 * toggle never triggers reconciliation. On change we imperatively write the new
 * value into ONLY the targeted price/suffix text nodes (collected via refs) and
 * toggle `aria-pressed` / active classes on the controls. The parent component
 * and every surrounding layout block are untouched — zero re-render, zero reflow.
 *
 * Verify in Chrome DevTools: enable "Paint flashing" / React Profiler and switch
 * currency — only the price <span> text repaints; no component remounts.
 */
export default function Pricing() {
  const state = useRef({ currency: 'INR', billing: 'monthly' });
  const priceRefs = useRef({}); // tierId -> price <span>
  const suffixRefs = useRef({}); // tierId -> suffix <span>
  const currencyBtns = useRef([]);
  const billingBtns = useRef([]);

  // Imperative repaint of just the text nodes — the only DOM mutation on toggle.
  const repaint = () => {
    const { currency, billing } = state.current;
    for (const tier of TIERS) {
      const node = priceRefs.current[tier.id];
      const suffix = suffixRefs.current[tier.id];
      if (node) node.textContent = formatPrice(computePrice(tier.base, currency, billing), currency);
      if (suffix) suffix.textContent = BILLING[billing].suffix;
    }
  };

  const setCurrency = (id) => {
    if (state.current.currency === id) return;
    state.current.currency = id;
    currencyBtns.current.forEach((b) => {
      if (!b) return;
      const active = b.dataset.cur === id;
      b.setAttribute('aria-pressed', String(active));
      b.classList.toggle('bg-accent', active);
      b.classList.toggle('text-ink', active);
      b.classList.toggle('text-muted', !active);
    });
    repaint();
  };

  const setBilling = (id) => {
    if (state.current.billing === id) return;
    state.current.billing = id;
    billingBtns.current.forEach((b) => {
      if (!b) return;
      const active = b.dataset.bill === id;
      b.setAttribute('aria-pressed', String(active));
      b.classList.toggle('bg-accent', active);
      b.classList.toggle('text-ink', active);
      b.classList.toggle('text-muted', !active);
    });
    // Slide the annual-savings pill in/out via class toggle (CSS transition).
    document.getElementById('annual-pill')?.classList.toggle('opacity-100', id === 'annual');
    document.getElementById('annual-pill')?.classList.toggle('opacity-0', id !== 'annual');
    repaint();
  };

  // Paint initial values once after mount (defensive; SSR-safe parity).
  useEffect(repaint, []);

  return (
    <section id="pricing" aria-labelledby="pricing-title" className="mx-auto max-w-6xl px-6 py-24">
      <header className="mx-auto mb-12 max-w-2xl text-center">
        <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-accent">Pricing</p>
        <h2 id="pricing-title" className="font-display text-4xl font-bold tracking-tight md:text-5xl">
          Scale your automation, not your bill
        </h2>
        <p className="mt-4 text-muted">Transparent tiers in your currency. Switch anytime — no surprises.</p>

        {/* Controls */}
        <div className="mt-8 flex flex-col items-center gap-4">
          {/* Billing toggle */}
          <div role="group" aria-label="Billing cycle" className="inline-flex rounded-full border border-line bg-elevated p-1">
            {Object.values(BILLING).map((b, i) => (
              <button
                key={b.id}
                ref={(el) => (billingBtns.current[i] = el)}
                data-bill={b.id}
                aria-pressed={b.id === 'monthly'}
                onClick={() => setBilling(b.id)}
                className={`rounded-full px-5 py-1.5 text-sm font-semibold transition-colors duration-200 ease-micro ${
                  b.id === 'monthly' ? 'bg-accent text-ink' : 'text-muted'
                }`}
              >
                {b.label}
              </button>
            ))}
            <span
              id="annual-pill"
              className="pointer-events-none ml-2 self-center rounded-full bg-accent-soft px-2.5 py-1 text-xs font-semibold text-accent opacity-0 transition-opacity duration-200 ease-micro"
            >
              Save 20%
            </span>
          </div>

          {/* Currency switcher */}
          <div role="group" aria-label="Currency" className="inline-flex rounded-full border border-line bg-elevated p-1">
            {Object.values(CURRENCIES).map((c, i) => (
              <button
                key={c.id}
                ref={(el) => (currencyBtns.current[i] = el)}
                data-cur={c.id}
                aria-pressed={c.id === 'INR'}
                onClick={() => setCurrency(c.id)}
                className={`rounded-full px-4 py-1.5 text-sm font-semibold transition-colors duration-200 ease-micro ${
                  c.id === 'INR' ? 'bg-accent text-ink' : 'text-muted'
                }`}
              >
                {c.symbol} {c.id}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* Tier cards */}
      <div className="grid gap-6 md:grid-cols-3">
        {TIERS.map((tier) => (
          <article
            key={tier.id}
            className={`relative flex flex-col rounded-2xl border p-7 transition-transform duration-200 ease-micro hover:-translate-y-1 ${
              tier.highlight ? 'border-accent bg-elevated shadow-[0_0_0_1px_rgb(var(--c-accent)/0.4)]' : 'border-line bg-surface'
            }`}
          >
            {tier.highlight && (
              <span className="absolute -top-3 left-7 rounded-full bg-accent px-3 py-1 text-xs font-bold text-ink">
                Most popular
              </span>
            )}
            <h3 className="font-display text-xl font-bold">{tier.name}</h3>
            <p className="mt-1 min-h-[2.5rem] text-sm text-muted">{tier.tagline}</p>
            <div className="mt-5 flex items-baseline gap-1">
              {/* The ONLY nodes mutated on toggle: */}
              <span
                ref={(el) => (priceRefs.current[tier.id] = el)}
                className="font-display text-4xl font-bold tabular-nums"
                aria-live="polite"
              >
                {formatPrice(computePrice(tier.base, 'INR', 'monthly'), 'INR')}
              </span>
              <span ref={(el) => (suffixRefs.current[tier.id] = el)} className="text-sm text-muted">
                {BILLING.monthly.suffix}
              </span>
            </div>
            <button
              className={`mt-6 rounded-xl px-4 py-2.5 text-sm font-semibold transition-colors duration-200 ease-micro ${
                tier.highlight ? 'bg-accent text-ink hover:brightness-110' : 'border border-line text-white hover:border-accent'
              }`}
            >
              Start free trial
            </button>
            <ul className="mt-6 space-y-3 text-sm">
              {tier.features.map((f) => (
                <li key={f} className="flex items-start gap-2 text-muted">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="mt-0.5 shrink-0 text-accent" aria-hidden="true">
                    <path d="M20 6 9 17l-5-5" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <span>{f}</span>
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  );
}
