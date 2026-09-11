import { ACCENT, FAINT, Label, MUTED, SIGNAL, rectPath } from '../Frame'

/** ConnectWise and a field survey app flowing through runbooks into twelve SharePoint lists. */
export function Sync() {
  const lists = Array.from({ length: 12 }, (_, i) => i)
  return (
    <g>
      {/* Source: ConnectWise, three feeds. */}
      <path className="draw" pathLength={1} d={rectPath(72, 84, 168, 132, 4)} stroke={MUTED} strokeWidth="1.5" />
      <Label x={88} y={108}>ConnectWise</Label>
      {['contacts', 'sites', 'PO lines'].map((f, i) => (
        <g key={f}>
          <rect x={88} y={124 + i * 26} width={8} height={8} fill={MUTED} />
          <Label x={104} y={132 + i * 26} color={MUTED}>{f}</Label>
          <path className="draw" pathLength={1} d={`M240 ${128 + i * 26}h72`} stroke={ACCENT} strokeWidth="1.5" />
        </g>
      ))}
      {/* Source: Onsite Survey, devices logged in the field. */}
      <path className="draw" pathLength={1} d={rectPath(72, 264, 168, 132, 4)} stroke={MUTED} strokeWidth="1.5" />
      <Label x={88} y={288}>Onsite Survey</Label>
      {[0, 1, 2].map((i) => (
        <g key={i}>
          <path className="draw" pathLength={1} d={rectPath(88, 302 + i * 26, 136, 18, 2)} stroke={FAINT} strokeWidth="1" />
          <rect x={96} y={308 + i * 26} width={[70, 52, 84][i]} height={6} fill={FAINT} />
        </g>
      ))}
      <path className="draw" pathLength={1} d="M240 330h72" stroke={SIGNAL} strokeWidth="1.5" />

      {/* Runbooks, three scheduled plus the bridge. */}
      <path className="draw" pathLength={1} d={rectPath(312, 84, 176, 132, 4)} stroke={ACCENT} strokeWidth="1.5" />
      <Label x={328} y={108} color={ACCENT}>runbooks ×3</Label>
      {['paginate', 'upsert', 'stage'].map((s, i) => (
        <g key={s}>
          <path d={`M328 ${128 + i * 26}h8`} stroke={ACCENT} />
          <Label x={344} y={132 + i * 26} color={MUTED}>{s}</Label>
        </g>
      ))}
      <path className="draw" pathLength={1} d={rectPath(312, 264, 176, 132, 4)} stroke={SIGNAL} strokeWidth="1.5" />
      <Label x={328} y={288} color={SIGNAL}>bridge</Label>
      {['alias table', 'exact', 'word overlap'].map((s, i) => (
        <g key={s}>
          <Label x={328} y={314 + i * 24} color={MUTED}>{i + 1}.</Label>
          <Label x={348} y={314 + i * 24} color={MUTED}>{s}</Label>
        </g>
      ))}
      <path className="draw" pathLength={1} d="M488 150h64M544 144l8 6-8 6" stroke={ACCENT} strokeWidth="1.5" />
      <path className="draw" pathLength={1} d="M488 330h32v-150h32M544 174l8 6-8 6" stroke={SIGNAL} strokeWidth="1.5" />

      {/* Destination: twelve SharePoint lists. */}
      <path className="draw" pathLength={1} d={rectPath(560, 84, 168, 312, 4)} stroke={MUTED} strokeWidth="1.5" />
      <Label x={576} y={108}>SharePoint, 12 lists</Label>
      {lists.map((i) => {
        const col = i % 3
        const row = Math.floor(i / 3)
        const filled = i < 9
        return (
          <path
            key={i}
            className="draw"
            pathLength={1}
            d={rectPath(576 + col * 48, 124 + row * 64, 40, 52, 3)}
            stroke={filled ? ACCENT : FAINT}
            strokeWidth="1.5"
            fill={filled ? 'rgba(224,182,108,0.08)' : 'none'}
          />
        )
      })}
      <Label x={72} y={440}>nightly · idempotent · dry-run gated</Label>
      <Label x={728} y={440} anchor="end" color={ACCENT}>281 rows the old flows never saw</Label>
    </g>
  )
}
