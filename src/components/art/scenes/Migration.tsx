import { ACCENT, FAINT, INK, Label, MUTED, SIGNAL, rectPath } from '../Frame'

export function Migration() {
  const fields = [0, 1, 2, 3, 4]
  return (
    <g>
      {/* Legacy form: dense, uneven, boxed. */}
      <path d={rectPath(64, 96, 250, 290, 4)} stroke={MUTED} strokeWidth="1.5" />
      <path d="M64 128h250" stroke={MUTED} strokeWidth="1.5" />
      {fields.map((i) => (
        <g key={i}>
          <rect x={80} y={148 + i * 44} width={60 + (i % 2) * 24} height={10} fill={FAINT} />
          <rect x={80} y={164 + i * 44} width={i === 2 ? 120 : 218} height={20} fill="rgba(245,243,238,0.07)" stroke={FAINT} />
        </g>
      ))}
      <rect x={80} y={368 - 6} width={78} height={22} fill={FAINT} />
      <Label x={64} y={412}>PowerApps, legacy</Label>

      {/* Transition: the AI-assisted rewrite. */}
      <path className="draw" pathLength={1} d="M334 240h116" stroke={ACCENT} strokeWidth="2" />
      <path className="draw" pathLength={1} d="M436 228l14 12-14 12" stroke={ACCENT} strokeWidth="2" />
      <Label x={392} y={222} anchor="middle" color={SIGNAL}>claude + codex</Label>
      <Label x={392} y={272} anchor="middle">plan, generate, review</Label>

      {/* React component tree. */}
      <path className="draw" pathLength={1} d={rectPath(560, 96, 120, 34, 4)} stroke={INK} strokeWidth="1.5" />
      <Label x={620} y={118} anchor="middle" color={INK}>{'<App />'}</Label>
      <path className="draw" pathLength={1} d="M620 130v26M560 156h120M560 156v22M680 156v22" stroke={MUTED} strokeWidth="1.5" />
      <path className="draw" pathLength={1} d={rectPath(506, 178, 108, 30, 4)} stroke={MUTED} strokeWidth="1.5" />
      <path className="draw" pathLength={1} d={rectPath(626, 178, 108, 30, 4)} stroke={MUTED} strokeWidth="1.5" />
      <Label x={560} y={198} anchor="middle">Layout</Label>
      <Label x={680} y={198} anchor="middle">Grid</Label>
      <path className="draw" pathLength={1} d="M560 208v22M680 208v22M520 230h80M640 230h80M520 230v18M600 230v18M640 230v18M720 230v18" stroke={MUTED} strokeWidth="1.5" />
      {[500, 580, 620, 700].map((x, i) => (
        <path key={x} className="draw" pathLength={1} d={rectPath(x, 248, 40, 24, 3)} stroke={i === 1 ? ACCENT : MUTED} strokeWidth="1.5" />
      ))}
      <Label x={620} y={302} anchor="middle">React, Vite, Tailwind</Label>

      {/* Pipeline to production. */}
      <path className="draw" pathLength={1} d="M506 372h228" stroke={FAINT} strokeWidth="2" />
      {['build', 'test', 'deploy'].map((step, i) => (
        <g key={step}>
          <circle cx={520 + i * 70} cy={372} r={5} fill={i === 2 ? ACCENT : MUTED} />
          <Label x={520 + i * 70} y={400} anchor="middle">{step}</Label>
        </g>
      ))}
      <path className="draw" pathLength={1} d="M722 372l6 7 12-14" stroke={ACCENT} strokeWidth="2.5" />
      <Label x={734} y={400} anchor="middle" color={ACCENT}>Azure</Label>
    </g>
  )
}
