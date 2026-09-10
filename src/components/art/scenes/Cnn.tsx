import { ACCENT, FAINT, INK, Label, MUTED, SIGNAL, rectPath } from '../Frame'

export function Cnn() {
  const cells = 6
  return (
    <g>
      {/* Input image as pixels. */}
      {Array.from({ length: cells * cells }, (_, i) => {
        const r = Math.floor(i / cells), c = i % cells
        const a = 0.06 + ((r * 5 + c * 3) % 7) * 0.05
        return <rect key={i} x={72 + c * 22} y={172 + r * 22} width={20} height={20} fill={`rgba(245,243,238,${a.toFixed(2)})`} />
      })}
      <path className="draw" pathLength={1} d={rectPath(70, 170, 134, 134)} stroke={MUTED} strokeWidth="1.5" />
      <Label x={137} y={330} anchor="middle">input</Label>

      {/* Layers, each a stack of offset slabs. */}
      {[
        { x: 250, h: 170, d: 4, name: 'conv' },
        { x: 350, h: 130, d: 3, name: 'pool' },
        { x: 440, h: 100, d: 3, name: 'conv' },
        { x: 522, h: 64, d: 2, name: 'dense' },
      ].map((l, i) => (
        <g key={i}>
          {Array.from({ length: l.d }, (_, k) => (
            <path
              key={k}
              className={k === 0 ? 'draw' : undefined}
              pathLength={k === 0 ? 1 : undefined}
              d={rectPath(l.x + k * 8, 238 - l.h / 2 - k * 8, 44, l.h, 3)}
              stroke={k === 0 ? INK : FAINT}
              strokeWidth="1.5"
              fill="var(--surface)"
            />
          ))}
          <Label x={l.x + 22} y={330} anchor="middle">{l.name}</Label>
        </g>
      ))}
      {/* Flow arrows. */}
      <path className="draw" pathLength={1} d="M212 238h30M302 238h40M402 238h30M494 238h20M574 238h34" stroke={SIGNAL} strokeWidth="1.5" />
      <path d="M236 232l6 6-6 6M336 232l6 6-6 6M426 232l6 6-6 6M508 232l6 6-6 6M602 232l6 6-6 6" stroke={SIGNAL} strokeWidth="1.5" />

      {/* Output: class confidences. */}
      {[
        { label: 'class A', w: 112, hit: true, val: '0.94' },
        { label: 'class B', w: 12, hit: false, val: '0.04' },
        { label: 'class C', w: 6, hit: false, val: '0.02' },
      ].map((o, i) => (
        <g key={o.label}>
          <Label x={620} y={200 + i * 40}>{o.label}</Label>
          <rect x={620} y={208 + i * 40} width={112} height={8} fill={FAINT} />
          <rect className={o.hit ? 'draw' : undefined} x={620} y={208 + i * 40} width={o.w} height={8} fill={o.hit ? ACCENT : MUTED} />
          <Label x={732} y={200 + i * 40} anchor="end" color={o.hit ? ACCENT : MUTED}>{o.val}</Label>
        </g>
      ))}
      <Label x={620} y={330}>inference API</Label>
      <Label x={72} y={440}>transfer learning on a pretrained backbone</Label>
    </g>
  )
}
