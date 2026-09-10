import { ACCENT, FAINT, INK, Label, MUTED, SIGNAL, circlePath, rectPath } from '../Frame'

export function Lab() {
  // Benzene ring centred at (230, 230), radius 92.
  const cx = 230, cy = 228, r = 92
  const pts = Array.from({ length: 6 }, (_, i) => {
    const a = (Math.PI / 3) * i - Math.PI / 2
    return [cx + r * Math.cos(a), cy + r * Math.sin(a)] as const
  })
  const hex = pts.map(([x, y], i) => `${i === 0 ? 'M' : 'L'}${x.toFixed(1)} ${y.toFixed(1)}`).join('') + 'Z'
  const inner = (i: number) => {
    const [x1, y1] = pts[i]!, [x2, y2] = pts[(i + 1) % 6]!
    const k = 0.78
    return `M${(cx + (x1 - cx) * k).toFixed(1)} ${(cy + (y1 - cy) * k).toFixed(1)}L${(cx + (x2 - cx) * k).toFixed(1)} ${(cy + (y2 - cy) * k).toFixed(1)}`
  }
  return (
    <g>
      <path className="draw" pathLength={1} d={hex} stroke={INK} strokeWidth="2" />
      <path className="draw" pathLength={1} d={`${inner(0)}${inner(2)}${inner(4)}`} stroke={INK} strokeWidth="2" />
      {pts.map(([x, y], i) => <circle key={i} cx={x} cy={y} r={3} fill={ACCENT} />)}
      <Label x={cx} y={372} anchor="middle" color={SIGNAL}>SMILES  c1ccccc1</Label>
      <Label x={cx} y={396} anchor="middle">drawn in-app with Ketcher</Label>

      {/* Inventory cards being dragged into a target. */}
      <path d={rectPath(444, 96, 280, 88, 6)} stroke={FAINT} strokeWidth="1.5" strokeDasharray="6 6" />
      <Label x={584} y={146} anchor="middle" color={FAINT}>drop here</Label>
      {[0, 1].map((i) => (
        <g key={i} transform={`translate(${i === 0 ? 470 : 444} ${i === 0 ? 122 : 216})`}>
          <rect width={260} height={72} rx={6} fill="var(--surface)" />
          <path className="draw" pathLength={1} d={rectPath(0, 0, 260, 72, 6)} stroke={i === 0 ? ACCENT : MUTED} strokeWidth="1.5" />
          {[0, 1, 2].map((d) => (
            <g key={d}>
              <circle cx={16} cy={22 + d * 14} r={2} fill={MUTED} /><circle cx={24} cy={22 + d * 14} r={2} fill={MUTED} />
            </g>
          ))}
          <rect x={44} y={16} width={120} height={9} fill={MUTED} />
          <rect x={44} y={34} width={180} height={7} fill={FAINT} />
          <rect x={44} y={48} width={90} height={7} fill={FAINT} />
        </g>
      ))}
      {/* Undo / redo. */}
      <path className="draw" pathLength={1} d="M470 330a24 24 0 1 1 44 12M470 330l-2 -18M470 330l16 -8" stroke={MUTED} strokeWidth="1.5" />
      <path className="draw" pathLength={1} d="M580 330a24 24 0 1 0 -44 12M580 330l2 -18M580 330l-16 -8" stroke={MUTED} strokeWidth="1.5" />
      <Label x={525} y={392} anchor="middle">undo, redo, on every action</Label>
      {/* Map pin. */}
      <path className="draw" pathLength={1} d="M690 322c0 -30 -24 -40 -24 -60a24 24 0 0 1 48 0c0 20 -24 30 -24 60Z" stroke={ACCENT} strokeWidth="2" />
      <path className="draw" pathLength={1} d={circlePath(690, 262, 8)} stroke={ACCENT} strokeWidth="2" />
      <path d="M660 336q30 -14 60 0" stroke={FAINT} strokeWidth="1.5" />
      <Label x={690} y={366} anchor="middle">sample origin</Label>
    </g>
  )
}
