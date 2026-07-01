/** Tailwind-safe class bundles (avoid dynamic `bg-${color}` which JIT won't emit). */
export const accentTheme = {
  'afrika-orange': {
    bgSoft: 'bg-afrika-orange/10',
    text: 'text-afrika-orange',
    border: 'border-afrika-orange',
  },
  'afrika-gold': {
    bgSoft: 'bg-afrika-gold/10',
    text: 'text-afrika-gold',
    border: 'border-afrika-gold',
  },
} as const

export type AccentColor = keyof typeof accentTheme
