import { ACCENT, FAINT, INK, Label, MUTED, SIGNAL, rectPath } from '../Frame'

const MODULES = ['Filing', 'Payments', 'Audit', 'Registry', 'Reports', 'Support']

export function MicroFrontend() {
  return (
    <g>
      {/* Shell. */}
      <path className="draw" pathLength={1} d={rectPath(72, 72, 656, 336, 8)} stroke={INK} strokeWidth="1.5" />
      <path d="M72 112h656" stroke={MUTED} strokeWidth="1.5" />
      <circle cx={96} cy={92} r={4} fill={MUTED} /><circle cx={112} cy={92} r={4} fill={MUTED} />
      <Label x={140} y={97} color={INK}>shell: auth, tokens, routing</Label>
      <rect x={560} y={84} width={150} height={16} rx={8} fill={FAINT} />
      {/* Bus from shell to modules. */}
      <path className="draw" pathLength={1} d="M160 136h480" stroke={SIGNAL} strokeWidth="1.5" />
      {/* Six modules docking in. */}
      {MODULES.map((name, i) => {
        const col = i % 3, row = Math.floor(i / 3)
        const x = 104 + col * 208, y = 160 + row * 112, w = 176, h = 88
        const cx = x + w / 2
        return (
          <g key={name}>
            <path className="draw" pathLength={1} d={`M${cx} 136v${row === 0 ? 24 : 136}`} stroke={SIGNAL} strokeWidth="1.5" strokeDasharray={row === 1 ? '4 6' : undefined} />
            <path className="draw" pathLength={1} d={rectPath(x, y, w, h, 5)} stroke={i === 0 ? ACCENT : MUTED} strokeWidth="1.5" />
            <path d={`M${x} ${y + 26}h${w}`} stroke={FAINT} />
            <Label x={x + 12} y={y + 18} color={i === 0 ? ACCENT : MUTED}>{name}</Label>
            <rect x={x + 12} y={y + 40} width={w - 60} height={8} fill={FAINT} />
            <rect x={x + 12} y={y + 56} width={w - 24} height={8} fill={FAINT} />
            <rect x={x + 12} y={y + 72} width={w - 96} height={8} fill={FAINT} />
          </g>
        )
      })}
      {/* Store. */}
      <path className="draw" pathLength={1} d="M40 300a20 8 0 1 0 40 0a20 8 0 1 0 -40 0v44a20 8 0 0 0 40 0v-44" stroke={SIGNAL} strokeWidth="1.5" />
      <Label x={60} y={370} anchor="middle" color={SIGNAL}>NgRx</Label>
      <Label x={72} y={440}>6 modules, independently deployable, one shell</Label>
    </g>
  )
}
