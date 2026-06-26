/* Social proof — logos, metrics, and a testimonial. Static + crawlable. */

const STATS = [
  { value: '4.2B', label: 'rows automated daily' },
  { value: '99.99%', label: 'pipeline uptime' },
  { value: '12k+', label: 'teams onboarded' },
  { value: '38ms', label: 'median latency' },
];

const LOGOS = ['Northwind', 'Acme Data', 'Quanta', 'Hyperloop', 'Vertex', 'Lumen'];

export default function SocialProof() {
  return (
    <section id="proof" aria-labelledby="proof-title" className="border-y border-line bg-surface/40">
      <div className="mx-auto max-w-6xl px-6 py-20">
        <h2 id="proof-title" className="text-center text-sm font-semibold uppercase tracking-widest text-muted">
          Trusted by data teams at fast-moving companies
        </h2>

        <ul className="mt-8 flex flex-wrap items-center justify-center gap-x-10 gap-y-4 opacity-70">
          {LOGOS.map((l) => (
            <li key={l} className="font-display text-xl font-bold tracking-tight">{l}</li>
          ))}
        </ul>

        <dl className="mt-14 grid grid-cols-2 gap-8 md:grid-cols-4">
          {STATS.map((s, i) => (
            <div key={s.label} className="text-center">
              <dt className={`font-display text-4xl font-bold ${i % 2 ? 'text-saffron' : 'text-accent'}`}>{s.value}</dt>
              <dd className="mt-1 text-sm text-muted">{s.label}</dd>
            </div>
          ))}
        </dl>

        <figure className="mx-auto mt-16 max-w-3xl rounded-2xl border border-line bg-elevated p-8 text-center">
          <blockquote className="text-xl font-medium leading-relaxed md:text-2xl">
            “We replaced four internal tools with Fluxion and cut our data-ops headcount cost by 60%. The currency-aware billing alone paid for itself.”
          </blockquote>
          <figcaption className="mt-5 text-sm text-muted">
            <span className="font-semibold text-powder">Priya Nair</span> — VP Data Platform, Quanta
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
