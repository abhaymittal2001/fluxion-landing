/*
 * Multi-dimensional pricing configuration matrix.
 *
 * Final displayed price is NEVER stored — it is computed from three dimensions:
 *   1. tier base rate        (per-tier monthly base, in INR reference units)
 *   2. billing cycle          (monthly = 1.0, annual = 0.8  -> flat 20% off)
 *   3. currency               (fx rate * regional tariff variable)
 *
 * computePrice() is the single source of truth used by the UI layer.
 */

export const BILLING = {
  monthly: { id: 'monthly', label: 'Monthly', multiplier: 1, suffix: '/mo' },
  // Flat 20% annual discount, shown as the effective per-month rate billed annually.
  annual: { id: 'annual', label: 'Annual', multiplier: 0.8, suffix: '/mo' },
};

export const CURRENCIES = {
  INR: { id: 'INR', symbol: '₹', locale: 'en-IN', fx: 1, tariff: 1.0 },
  USD: { id: 'USD', symbol: '$', locale: 'en-US', fx: 0.012, tariff: 0.95 },
  EUR: { id: 'EUR', symbol: '€', locale: 'en-IE', fx: 0.011, tariff: 0.92 },
};

// Per-tier base rate expressed in the INR reference unit. UI shows no literals.
export const TIERS = [
  {
    id: 'starter',
    name: 'Starter',
    base: 1499,
    tagline: 'For solo builders automating their first pipelines.',
    highlight: false,
    features: ['5 active automations', '10k rows / mo', 'Community connectors', 'Email support'],
  },
  {
    id: 'growth',
    name: 'Growth',
    base: 4999,
    tagline: 'For teams scaling data ops across departments.',
    highlight: true,
    features: ['50 active automations', '1M rows / mo', 'All premium connectors', 'Priority support', 'Role-based access'],
  },
  {
    id: 'scale',
    name: 'Scale',
    base: 12999,
    tagline: 'For orgs running mission-critical automation.',
    highlight: false,
    features: ['Unlimited automations', 'Unlimited rows', 'Dedicated VPC', '24/7 SLA support', 'Custom audit logs'],
  },
];

/**
 * Pure pricing function — the dynamic engine.
 * @param {number} base     tier base rate (INR reference)
 * @param {string} currency one of CURRENCIES keys
 * @param {string} billing  one of BILLING keys
 * @returns {number} rounded price in the target currency
 */
export function computePrice(base, currency, billing) {
  const c = CURRENCIES[currency];
  const b = BILLING[billing];
  const raw = base * c.fx * c.tariff * b.multiplier;
  // Round to a clean storefront figure (nearest 1 for fx currencies, 10 for INR).
  const step = currency === 'INR' ? 10 : 1;
  return Math.round(raw / step) * step;
}

/** Format a computed number for display, including the currency symbol. */
export function formatPrice(value, currency) {
  const c = CURRENCIES[currency];
  return c.symbol + value.toLocaleString(c.locale);
}

/** Convenience: compute + format in one call. */
export function priceLabel(base, currency, billing) {
  return formatPrice(computePrice(base, currency, billing), currency);
}
