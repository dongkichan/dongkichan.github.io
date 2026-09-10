import { ACCENT, FAINT, INK, Label, MUTED, SIGNAL, rectPath } from '../Frame'

export function Mail() {
  const px = 120, py = 48, pw = 210, ph = 392
  return (
    <g>
      {/* Phone. */}
      <path className="draw" pathLength={1} d={rectPath(px, py, pw, ph, 26)} stroke={INK} strokeWidth="2" />
      <rect x={px + 70} y={py + 12} width={70} height={6} rx={3} fill={FAINT} />
      <Label x={px + 20} y={py + 52} color={INK}>Inbox</Label>
      <Label x={px + pw - 20} y={py + 52} anchor="end">3 new</Label>
      {/* Three oversized buttons. */}
      {[
        { label: 'Read', y: 80, accent: true },
        { label: 'Write', y: 176, accent: false },
        { label: 'Family', y: 272, accent: false },
      ].map((b) => (
        <g key={b.label}>
          <path className="draw" pathLength={1} d={rectPath(px + 18, py + b.y, pw - 36, 80, 10)} stroke={b.accent ? ACCENT : MUTED} strokeWidth="1.5" />
          <text x={px + pw / 2} y={py + b.y + 50} textAnchor="middle" fill={b.accent ? ACCENT : INK} fontFamily="var(--font-body)" fontSize={26} fontWeight={500}>{b.label}</text>
        </g>
      ))}
      <path d={`M${px + 40} ${py + ph - 24}h${pw - 80}`} stroke={FAINT} strokeWidth="4" />

      {/* Hit target callout. */}
      <path className="draw" pathLength={1} d={`M${px + pw + 14} ${py + 80}v80`} stroke={ACCENT} strokeWidth="1.5" />
      <path d={`M${px + pw + 8} ${py + 80}h12M${px + pw + 8} ${py + 160}h12`} stroke={ACCENT} strokeWidth="1.5" />
      <Label x={px + pw + 26} y={py + 124} color={ACCENT}>44px and up</Label>

      {/* Voice confirmation. */}
      <g transform="translate(470 250)">
        {[14, 30, 48, 30, 18, 38, 22].map((h, i) => (
          <rect key={i} className="draw" x={i * 14} y={30 - h / 2} width={6} height={h} rx={3} fill={i === 2 ? ACCENT : MUTED} />
        ))}
        <path className="draw" pathLength={1} d={rectPath(-16, -16, 250, 92, 46)} stroke={SIGNAL} strokeWidth="1.5" />
        <Label x={118} y={36} color={INK}>"Email sent"</Label>
      </g>
      <Label x={470} y={372}>spoken, because hearing beats reading</Label>
      {/* Large type sample. */}
      <text x={470} y={160} fill={INK} fontFamily="var(--font-display)" fontSize={72} fontWeight={300}>Aa</text>
      <Label x={560} y={160}>large type, high contrast</Label>
      <Label x={470} y={440}>accessibility first, not retrofitted</Label>
    </g>
  )
}
