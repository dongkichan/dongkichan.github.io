import { ACCENT, FAINT, Label, MUTED, rectPath } from '../Frame'

export function Logs() {
  const rows = 22
  const patternRows = new Set([4, 9, 14, 19])
  const widths = (i: number) => [180, 240, 130, 210, 300, 160, 260, 120][i % 8]!
  return (
    <g>
      {/* Log stream. */}
      {Array.from({ length: rows }, (_, i) => {
        const y = 84 + i * 15
        const hit = patternRows.has(i)
        return (
          <g key={i}>
            <rect x={72} y={y} width={38} height={6} fill={FAINT} />
            <rect x={122} y={y} width={widths(i)} height={6} fill={hit ? 'rgba(232,168,124,0.35)' : FAINT} />
            {hit ? <rect x={122 + widths(i) + 10} y={y} width={70} height={6} fill={ACCENT} /> : null}
          </g>
        )
      })}
      {/* Pattern brackets linking the four hits. */}
      <path className="draw" pathLength={1} d="M470 144h30v225h-30" stroke={ACCENT} strokeWidth="1.5" />
      <path className="draw" pathLength={1} d="M470 144h6M470 219h6M470 294h6M470 369h6" stroke={ACCENT} strokeWidth="1.5" />
      <Label x={512} y={260} color={ACCENT}>same pattern, 4 hits</Label>
      {/* Histogram. */}
      <path className="draw" pathLength={1} d={rectPath(560, 300, 168, 110, 4)} stroke={MUTED} strokeWidth="1.5" />
      {[30, 62, 44, 88, 52, 70].map((h, i) => (
        <rect key={i} x={576 + i * 24} y={396 - h} width={14} height={h} fill={i === 3 ? ACCENT : MUTED} />
      ))}
      <path d="M572 396h144" stroke={FAINT} />
      <Label x={560} y={432}>events / hour</Label>
      <Label x={72} y={440}>500,000 rows, streamed, not loaded</Label>
      <Label x={728} y={97} anchor="end">grep, retired</Label>
    </g>
  )
}
