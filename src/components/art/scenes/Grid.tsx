import { ACCENT, FAINT, Label, MUTED, rectPath } from '../Frame'

export function Grid() {
  const x0 = 72, y0 = 92, cw = 94, rh = 38, cols = 7, rows = 7
  const w = cw * cols, h = rh * rows
  return (
    <g>
      {/* Sheet with header row and row numbers. */}
      <path d={rectPath(x0, y0, w, h)} stroke={MUTED} strokeWidth="1.5" />
      <rect x={x0} y={y0} width={w} height={rh} fill="rgba(245,243,238,0.05)" />
      {Array.from({ length: cols - 1 }, (_, i) => (
        <path key={`c${i}`} d={`M${x0 + cw * (i + 1)} ${y0}v${h}`} stroke={FAINT} />
      ))}
      {Array.from({ length: rows - 1 }, (_, i) => (
        <path key={`r${i}`} d={`M${x0} ${y0 + rh * (i + 1)}h${w}`} stroke={FAINT} />
      ))}
      {['Campaign', 'Region', 'Q1', 'Q2', 'Q3', 'Q4', 'Total'].map((t, i) => (
        <Label key={t} x={x0 + cw * i + 12} y={y0 + 24}>{t}</Label>
      ))}
      {/* Cell values as bars. */}
      {Array.from({ length: rows - 1 }, (_, r) =>
        Array.from({ length: cols }, (_, c) =>
          c === 0 || c === 1 ? null : (
            <rect key={`${r}${c}`} x={x0 + cw * c + 12} y={y0 + rh * (r + 1) + 14} width={30 + ((r * 7 + c * 13) % 40)} height={8} fill={FAINT} />
          ),
        ),
      )}
      {/* Merged regions: Region column spanning rows 1-3 and rows 4-6. */}
      <rect x={x0 + cw} y={y0 + rh} width={cw} height={rh * 3} fill="rgba(232,168,124,0.08)" />
      <path className="draw" pathLength={1} d={rectPath(x0 + cw, y0 + rh, cw, rh * 3)} stroke={ACCENT} strokeWidth="2" />
      <Label x={x0 + cw + 12} y={y0 + rh * 2 + 24} color={ACCENT}>EMEA</Label>
      <rect x={x0 + cw} y={y0 + rh * 4} width={cw} height={rh * 3} fill="rgba(232,168,124,0.05)" />
      <path className="draw" pathLength={1} d={rectPath(x0 + cw, y0 + rh * 4, cw, rh * 3)} stroke={ACCENT} strokeWidth="1.5" />
      <Label x={x0 + cw + 12} y={y0 + rh * 5 + 24} color={ACCENT}>APAC</Label>
      {/* Row 3 expanded: nested accordion table inside the sheet. */}
      <rect x={x0 + cw * 2 + 8} y={y0 + rh * 3 + 4} width={cw * 5 - 16} height={rh * 2 - 8} fill="var(--surface)" />
      <path className="draw" pathLength={1} d={rectPath(x0 + cw * 2 + 8, y0 + rh * 3 + 4, cw * 5 - 16, rh * 2 - 8, 3)} stroke={ACCENT} strokeWidth="1.5" />
      <path className="draw" pathLength={1} d={`M${x0 + cw * 2 + 8} ${y0 + rh * 4}h${cw * 5 - 16}`} stroke={FAINT} />
      <path d={`M${x0 + cw * 2 + 22} ${y0 + rh * 3 + 30}l6 -8 6 8`} stroke={ACCENT} strokeWidth="1.5" />
      <Label x={x0 + cw * 2 + 40} y={y0 + rh * 3 + 30}>3 line items</Label>
      {[0, 1].map((r) =>
        [0, 1, 2, 3].map((c) => (
          <rect key={`n${r}${c}`} x={x0 + cw * 3 + 20 + c * 100} y={y0 + rh * 3 + 14 + r * 36} width={40 + ((r + c) * 11) % 30} height={7} fill={MUTED} />
        )),
      )}
      {/* Export. */}
      <path className="draw" pathLength={1} d={rectPath(700, 372, 32, 40, 3)} stroke={MUTED} strokeWidth="1.5" />
      <path className="draw" pathLength={1} d="M716 384v18M710 396l6 6 6-6" stroke={ACCENT} strokeWidth="2" />
      <Label x={716} y={432} anchor="middle">.xlsx</Label>
      <Label x={72} y={432}>merge, unmerge, nest, export</Label>
    </g>
  )
}
