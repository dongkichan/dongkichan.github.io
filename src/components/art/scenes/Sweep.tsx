import { ACCENT, FAINT, Label, MUTED, SIGNAL, circlePath, rectPath } from '../Frame'

/** Two runbooks on a 24-hour dial, reconciling ConnectWise against carrier tracking. */
export function Sweep() {
  const hours = Array.from({ length: 24 }, (_, h) => h)
  const x = (h: number) => 72 + (h / 24) * 656
  const maintenance = [1, 5, 9, 13, 17, 21]
  const force = [5.5, 8.5]
  return (
    <g>
      {/* 24-hour rail with the carrier van-scan window shaded. */}
      <rect x={x(4.25)} y={72} width={x(9) - x(4.25)} height={44} fill="rgba(155,196,201,0.08)" />
      <path className="draw" pathLength={1} d="M72 116h656" stroke={MUTED} strokeWidth="1.5" />
      {hours.map((h) => (
        <path key={h} d={`M${x(h)} ${h % 6 === 0 ? 104 : 110}v${h % 6 === 0 ? 12 : 6}`} stroke={h % 6 === 0 ? MUTED : FAINT} />
      ))}
      {maintenance.map((h) => (
        <g key={h}>
          <path className="draw" pathLength={1} d={circlePath(x(h), 116, 6)} stroke={ACCENT} strokeWidth="1.5" />
          <path className="draw" pathLength={1} d={`M${x(h)} 122v40`} stroke={ACCENT} strokeWidth="1" />
        </g>
      ))}
      {force.map((h) => (
        <g key={h}>
          <path d={`M${x(h) - 5} 111l5 -9 5 9z`} fill={SIGNAL} />
          <path className="draw" pathLength={1} d={`M${x(h)} 122v40`} stroke={SIGNAL} strokeWidth="1" />
        </g>
      ))}
      <Label x={72} y={60}>00:00</Label>
      <Label x={x(12)} y={60} anchor="middle">12:00</Label>
      <Label x={728} y={60} anchor="end">24:00</Label>
      <Label x={x(6.6)} y={90} anchor="middle" color={SIGNAL}>van-scan window</Label>

      {/* Three systems the sweeps touch. */}
      <path className="draw" pathLength={1} d={rectPath(72, 176, 176, 92, 4)} stroke={MUTED} strokeWidth="1.5" />
      <path className="draw" pathLength={1} d={rectPath(312, 176, 176, 92, 4)} stroke={ACCENT} strokeWidth="1.5" />
      <path className="draw" pathLength={1} d={rectPath(552, 176, 176, 92, 4)} stroke={MUTED} strokeWidth="1.5" />
      <Label x={88} y={200}>ConnectWise</Label>
      <Label x={328} y={200} color={ACCENT}>runbook</Label>
      <Label x={568} y={200}>carrier tracking</Label>
      {[0, 1, 2].map((i) => (
        <g key={i}>
          <rect x={88} y={214 + i * 14} width={[120, 92, 140][i]} height={6} fill={FAINT} />
          <rect x={568} y={214 + i * 14} width={[100, 130, 84][i]} height={6} fill={FAINT} />
        </g>
      ))}
      {['health', 'recent-sync', 'reconcile', 'refresh'].map((step, i) => (
        <g key={step}>
          <path d={`M330 ${218 + i * 12}h6`} stroke={ACCENT} />
          <Label x={344} y={222 + i * 12} color={MUTED}>{step}</Label>
        </g>
      ))}
      {/* Reconcile arrows, both directions. */}
      <path className="draw" pathLength={1} d="M248 208h64M304 202l8 6-8 6" stroke={ACCENT} strokeWidth="1.5" />
      <path className="draw" pathLength={1} d="M312 236h-64M256 230l-8 6 8 6" stroke={ACCENT} strokeWidth="1.5" />
      <path className="draw" pathLength={1} d="M488 208h64M544 202l8 6-8 6" stroke={ACCENT} strokeWidth="1.5" />
      <path className="draw" pathLength={1} d="M552 236h-64M496 230l-8 6 8 6" stroke={ACCENT} strokeWidth="1.5" />

      {/* Parcel checkpoints and the Teams card that fires on a stall. */}
      <path className="draw" pathLength={1} d="M88 330h448" stroke={MUTED} strokeWidth="1.5" />
      {[88, 196, 304, 412, 536].map((cx, i) => (
        <path key={cx} className="draw" pathLength={1} d={circlePath(cx, 330, 5)} stroke={i === 3 ? SIGNAL : MUTED} strokeWidth="1.5" />
      ))}
      <Label x={88} y={356}>picked up</Label>
      <Label x={304} y={356} anchor="middle">in transit</Label>
      <Label x={412} y={356} anchor="middle" color={SIGNAL}>stalled</Label>
      <Label x={536} y={356} anchor="end">delivered</Label>
      <path className="draw" pathLength={1} d={rectPath(552, 300, 176, 68, 4)} stroke={SIGNAL} strokeWidth="1.5" />
      <rect x={568} y={314} width={8} height={8} fill={SIGNAL} />
      <rect x={584} y={315} width={110} height={6} fill={FAINT} />
      <rect x={568} y={332} width={140} height={6} fill={FAINT} />
      <rect x={568} y={346} width={90} height={6} fill={FAINT} />
      <path className="draw" pathLength={1} d="M412 324v-18h140" stroke={SIGNAL} strokeWidth="1" />
      <Label x={72} y={440}>6 + 2 sweeps a day, ~60 job-minutes a month</Label>
      <Label x={728} y={440} anchor="end" color={ACCENT}>90 / 100 calls budgeted</Label>
    </g>
  )
}
