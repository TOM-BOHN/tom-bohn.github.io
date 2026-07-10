import type { Config } from 'tailwindcss'

// Our theme colors are plain CSS custom properties (e.g. `var(--accent)`)
// rather than static hex/rgb values, since their actual value changes per
// theme (light/dark/xanga). Tailwind can only generate opacity-modifier
// utilities (e.g. `bg-accent/10`, `border-accent-orange/40`) for colors it
// can decompose into RGB channels at build time - a bare `var(--x)` doesn't
// qualify, so those classes were silently generating no CSS at all (fully
// transparent, invisible borders) anywhere they were used. Wrapping each
// color in `color-mix()` with the `<alpha-value>` placeholder lets Tailwind
// substitute the requested opacity at build time while still resolving the
// actual color from the CSS variable at runtime. See:
// https://github.com/tailwindlabs/tailwindcss/discussions/12824
function withOpacity(cssVariable: string) {
  return `color-mix(in srgb, var(${cssVariable}) calc(<alpha-value> * 100%), transparent)`
}

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'bg-primary': withOpacity('--bg-primary'),
        'bg-secondary': withOpacity('--bg-secondary'),
        'text-primary': withOpacity('--text-primary'),
        'text-secondary': withOpacity('--text-secondary'),
        'accent': withOpacity('--accent'),
        'accent-hover': withOpacity('--accent-hover'),
        'accent-orange': withOpacity('--accent-orange'),
        'accent-orange-hover': withOpacity('--accent-orange-hover'),
        'on-accent': withOpacity('--on-accent'),
        'on-accent-orange': withOpacity('--on-accent-orange'),
        'border': withOpacity('--border'),
        'link': withOpacity('--link'),
        'link-hover': withOpacity('--link-hover'),
      },
    },
  },
  plugins: [],
}
export default config
