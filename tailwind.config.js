/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      // Palette is driven by CSS variables (see src/index.css) so the official
      // hex codes from the asset package can be dropped in one place.
      colors: {
        ink: 'rgb(var(--c-ink) / <alpha-value>)',
        surface: 'rgb(var(--c-surface) / <alpha-value>)',
        elevated: 'rgb(var(--c-elevated) / <alpha-value>)',
        accent: 'rgb(var(--c-accent) / <alpha-value>)',
        'accent-soft': 'rgb(var(--c-accent-soft) / <alpha-value>)',
        muted: 'rgb(var(--c-muted) / <alpha-value>)',
        line: 'rgb(var(--c-line) / <alpha-value>)',
      },
      fontFamily: {
        display: ['"Noto Sans"', 'system-ui', 'sans-serif'],
        body: ['"Open Sans"', 'system-ui', 'sans-serif'],
      },
      transitionTimingFunction: {
        micro: 'cubic-bezier(0.16, 1, 0.3, 1)', // ease-out for hovers/toggles
        reflow: 'cubic-bezier(0.65, 0, 0.35, 1)', // ease-in-out for layout
      },
    },
  },
  plugins: [],
};
