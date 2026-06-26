import { useRef, useState, useEffect, useCallback } from 'react';
import { Icon } from './icons';

/*
 * BENTO  <->  ACCORDION  (zero external dependencies)
 * ---------------------------------------------------
 * Desktop: a Bento grid. Mobile (< 768px): a touch accordion.
 * The layout swap itself is pure CSS (Tailwind responsive utilities); React only
 * owns two pieces of state:
 *   - activeIndex: which node is "hovered/locked" (desktop) or open (mobile)
 *   - isMobile:    drives ARIA + which interaction model is live
 *
 * CONTEXT LOCK: a `resize` listener watches the breakpoint. When the viewport
 * crosses from desktop -> mobile while a bento node is active (hovered), that
 * exact index is carried over so the matching accordion panel opens smoothly on
 * the next layout. Implemented with the Web Animations API for the panel reveal.
 */

const MOBILE_QUERY = '(max-width: 767px)';

const FEATURES = [
  {
    id: 'pipelines',
    title: 'Visual Pipeline Builder',
    body: 'Drag, drop, and branch data flows across 200+ sources. No glue code — just declarative steps that compile to optimized execution graphs.',
    icon: 'cube',
    span: 'md:col-span-2 md:row-span-2',
  },
  {
    id: 'agents',
    title: 'Autonomous Agents',
    body: 'Spin up reasoning agents that monitor streams and act on thresholds in real time.',
    icon: 'cog',
    span: 'md:col-span-1',
  },
  {
    id: 'observability',
    title: 'Full Observability',
    body: 'Trace every row, retry, and transform with millisecond lineage.',
    icon: 'arrowTrendingUp',
    span: 'md:col-span-1',
  },
  {
    id: 'governance',
    title: 'Governance & RBAC',
    body: 'Row-level policies, audit logs, and SOC2-ready access controls baked in.',
    icon: 'chartPie',
    span: 'md:col-span-2',
  },
];

export default function BentoFeatures() {
  const [isMobile, setIsMobile] = useState(() =>
    typeof window !== 'undefined' ? window.matchMedia(MOBILE_QUERY).matches : false
  );
  const [activeIndex, setActiveIndex] = useState(0);
  const activeRef = useRef(0); // mirror so the resize handler reads the latest without re-binding
  const panelRefs = useRef([]);

  const setActive = useCallback((i) => {
    activeRef.current = i;
    setActiveIndex(i);
  }, []);

  // Context-lock: watch the breakpoint and carry the active index across.
  useEffect(() => {
    const mql = window.matchMedia(MOBILE_QUERY);
    const onChange = (e) => {
      // The active index is preserved automatically (activeRef holds it);
      // flipping isMobile re-renders into the other layout with the same index.
      setIsMobile(e.matches);
    };
    mql.addEventListener('change', onChange);
    return () => mql.removeEventListener('change', onChange);
  }, []);

  // Smoothly reveal the open accordion panel via WAAPI (no CSS-in-JS engine).
  useEffect(() => {
    if (!isMobile) return;
    const panel = panelRefs.current[activeIndex];
    if (!panel) return;
    const full = panel.scrollHeight;
    panel.animate(
      [
        { height: '0px', opacity: 0 },
        { height: full + 'px', opacity: 1 },
      ],
      { duration: 360, easing: 'cubic-bezier(0.65, 0, 0.35, 1)', fill: 'forwards' }
    );
  }, [activeIndex, isMobile]);

  return (
    <section id="features" aria-labelledby="features-title" className="mx-auto max-w-6xl px-6 py-24">
      <header className="mx-auto mb-12 max-w-2xl text-center">
        <p className="mb-3 font-display text-sm font-semibold uppercase tracking-widest text-saffron">Platform</p>
        <h2 id="features-title" className="font-display text-3xl font-bold tracking-tight md:text-5xl">
          Everything your data team needs
        </h2>
      </header>

      {/* ===== DESKTOP: BENTO GRID ===== */}
      <div className="hidden gap-4 md:grid md:auto-rows-[minmax(180px,1fr)] md:grid-cols-3" role="list">
        {FEATURES.map((f, i) => (
          <article
            key={f.id}
            role="listitem"
            onMouseEnter={() => setActive(i)}
            onFocus={() => setActive(i)}
            tabIndex={0}
            className={`group flex flex-col justify-between rounded-2xl border bg-surface p-6 transition-all duration-200 ease-micro hover:-translate-y-1 ${f.span} ${
              activeIndex === i ? 'border-accent bg-elevated' : 'border-line'
            }`}
          >
            <Icon name={f.icon} size={30} className="text-accent" />
            <div>
              <h3 className="font-display text-lg font-bold">{f.title}</h3>
              <p className="mt-2 text-sm text-muted">{f.body}</p>
            </div>
          </article>
        ))}
      </div>

      {/* ===== MOBILE: ACCORDION ===== */}
      <div className="flex flex-col gap-3 md:hidden">
        {FEATURES.map((f, i) => {
          const open = activeIndex === i;
          return (
            <div key={f.id} className={`overflow-hidden rounded-2xl border ${open ? 'border-accent bg-elevated' : 'border-line bg-surface'}`}>
              <button
                onClick={() => setActive(open ? -1 : i)}
                aria-expanded={open}
                aria-controls={`panel-${f.id}`}
                className="flex w-full items-center justify-between gap-3 p-5 text-left"
              >
                <span className="flex items-center gap-3">
                  <Icon name={f.icon} size={24} className="text-accent" />
                  <span className="font-display font-bold">{f.title}</span>
                </span>
                <Icon
                  name="chevronDown"
                  size={20}
                  className={`shrink-0 text-muted transition-transform duration-200 ease-micro ${open ? 'rotate-180' : ''}`}
                />
              </button>
              <div
                id={`panel-${f.id}`}
                ref={(el) => (panelRefs.current[i] = el)}
                role="region"
                hidden={!open}
                className="px-5 pb-5 text-sm text-muted"
              >
                {f.body}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
