import type { ReactNode } from 'react'

export interface SceneProps {
  id: string
}

/* Shared palette inside the SVGs. CSS variables resolve because the SVG is inline. */
export const INK = 'var(--text)'
export const MUTED = 'rgba(245,243,238,0.34)'
export const FAINT = 'rgba(245,243,238,0.14)'
export const ACCENT = 'var(--accent)'
export const SIGNAL = 'var(--signal)'
export const MONO = 'var(--font-mono)'

/** Path data for a rectangle, optionally rounded, so it can use pathLength. */
export function rectPath(x: number, y: number, w: number, h: number, r = 0): string {
  if (r <= 0) return `M${x} ${y}h${w}v${h}h${-w}Z`
  return `M${x + r} ${y}h${w - 2 * r}a${r} ${r} 0 0 1 ${r} ${r}v${h - 2 * r}a${r} ${r} 0 0 1 ${-r} ${r}h${-(w - 2 * r)}a${r} ${r} 0 0 1 ${-r} ${-r}v${-(h - 2 * r)}a${r} ${r} 0 0 1 ${r} ${-r}Z`
}

/** Path data for a circle, so it can use pathLength. */
export const circlePath = (cx: number, cy: number, r: number): string =>
  `M${cx - r} ${cy}a${r} ${r} 0 1 0 ${2 * r} 0a${r} ${r} 0 1 0 ${-2 * r} 0Z`

export function Label({ x, y, children, anchor = 'start', color = MUTED }: { x: number; y: number; children: ReactNode; anchor?: 'start' | 'middle' | 'end'; color?: string }) {
  return (
    <text x={x} y={y} fill={color} fontFamily={MONO} fontSize={13} textAnchor={anchor} letterSpacing="0.02em">
      {children}
    </text>
  )
}

export function Frame({ id, label, decorative, children }: { id: string; label: string; decorative: boolean; children: ReactNode }) {
  const grid = `grid-${id}`
  return (
    <svg
      viewBox="0 0 800 480"
      preserveAspectRatio="xMidYMid slice"
      role={decorative ? undefined : 'img'}
      aria-hidden={decorative ? 'true' : undefined}
      aria-label={decorative ? undefined : label}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <defs>
        <pattern id={grid} width="40" height="40" patternUnits="userSpaceOnUse">
          <path d="M40 0H0V40" stroke="rgba(245,243,238,0.05)" strokeWidth="1" />
        </pattern>
      </defs>
      <rect width="800" height="480" fill="var(--surface)" />
      <rect width="800" height="480" fill={`url(#${grid})`} />
      <g stroke={MUTED} strokeWidth="1.5">
        <path d="M24 44V24h20M776 44V24h-20M24 436v20h20M776 436v20h-20" />
      </g>
      {children}
    </svg>
  )
}
