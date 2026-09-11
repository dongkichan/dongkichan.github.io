import type { CSSProperties } from 'react'
import s from './Sky.module.css'
import { ARCS, BRIGHT_STARS, CONSTELLATIONS, STARS, TRACES, TWINKLES, H, W, fourPointStar, polyline, type MarginSpot } from '../lib/sky'

/**
 * The background: a night sky where astrology, technology and time meet.
 * One fixed layer behind the page. The starfield, constellations and arcs are a
 * single static SVG (painted once). Only a few elements move, each on its own
 * compositor layer, and only via transform or opacity, so scrolling stays smooth.
 * Everything is generated from a fixed seed, so the server and client agree.
 * Where things sit is decided in lib/sky.ts: the loud elements keep to the page
 * margins so they never land behind body copy.
 */

const GOLD = '#e0b66c'
const RAYS = fourPointStar(0, 0, 1)

/** Places a margin-pinned element: `offset` px outside the content container, centred on `top` %. */
function marginStyle(spot: MarginSpot): CSSProperties {
  const half = spot.size / 2
  return {
    [spot.side]: `calc(50% - var(--maxw) / 2 - ${spot.offset + half}px)`,
    top: `calc(${spot.top}% - ${half}px)`,
    width: spot.size,
    height: spot.size,
  }
}

function Ticks({ r, count, long }: { r: number; count: number; long: number }) {
  const lines: string[] = []
  const r1 = (n: number) => Math.round(n * 10) / 10
  for (let i = 0; i < count; i++) {
    const a = (i / count) * Math.PI * 2
    const len = i % long === 0 ? 12 : 5
    const x1 = 200 + Math.cos(a) * r, y1 = 200 + Math.sin(a) * r
    const x2 = 200 + Math.cos(a) * (r + len), y2 = 200 + Math.sin(a) * (r + len)
    lines.push(`M${r1(x1)} ${r1(y1)}L${r1(x2)} ${r1(y2)}`)
  }
  return <path d={lines.join('')} stroke={GOLD} strokeWidth="1" strokeOpacity="0.5" />
}

/** An orbit ring with ticks and one satellite. Rotates as a whole. */
function Ring({ className, satellite = true }: { className: string; satellite?: boolean }) {
  return (
    <svg className={className} viewBox="0 0 400 400" aria-hidden="true" fill="none">
      <circle cx="200" cy="200" r="190" stroke={GOLD} strokeOpacity="0.35" strokeWidth="1" strokeDasharray="2 7" />
      <circle cx="200" cy="200" r="168" stroke={GOLD} strokeOpacity="0.22" strokeWidth="0.8" />
      <Ticks r={170} count={60} long={5} />
      <circle cx="200" cy="200" r="120" stroke={GOLD} strokeOpacity="0.14" strokeWidth="0.8" strokeDasharray="30 14" />
      {satellite ? (
        <g>
          <circle cx="390" cy="200" r="7" fill={GOLD} fillOpacity="0.16" />
          <circle cx="390" cy="200" r="2.4" fill={GOLD} />
        </g>
      ) : null}
    </svg>
  )
}

/** The time half: a dial face with a hand that sweeps once every 90 seconds. */
function Dial() {
  return (
    <div className={s.dial} aria-hidden="true">
      <svg className={s.dialFace} viewBox="0 0 400 400" fill="none">
        <circle cx="200" cy="200" r="190" stroke={GOLD} strokeOpacity="0.3" strokeWidth="1" />
        <Ticks r={176} count={60} long={5} />
        <circle cx="200" cy="200" r="6" stroke={GOLD} strokeOpacity="0.6" strokeWidth="1" />
        <path d="M200 30v14M200 356v14M30 200h14M356 200h14" stroke={GOLD} strokeOpacity="0.5" strokeWidth="1.2" />
      </svg>
      <svg className={s.dialHand} viewBox="0 0 400 400" fill="none">
        <path d="M200 200L200 52" stroke={GOLD} strokeOpacity="0.55" strokeWidth="1.2" />
        <circle cx="200" cy="52" r="3" fill={GOLD} fillOpacity="0.8" />
      </svg>
    </div>
  )
}

export function Sky() {
  return (
    <div className={s.sky} aria-hidden="true">
      <svg className={s.field} viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="xMidYMid slice" fill="none">
        {/* Star dust. */}
        <g fill={GOLD}>
          {STARS.map((st, i) => <circle key={i} cx={st.x} cy={st.y} r={st.r} fillOpacity={st.a} />)}
        </g>
        {/* Orbit arcs across the field. */}
        {ARCS.map((a, i) => (
          <circle key={i} cx={a.cx} cy={a.cy} r={a.r} stroke={GOLD} strokeOpacity={a.a} strokeWidth="0.9" strokeDasharray={a.dash} />
        ))}
        {/* Constellations: lines and ringed nodes. */}
        {CONSTELLATIONS.map((pts, i) => (
          <g key={i}>
            <path d={polyline(pts)} stroke={GOLD} strokeOpacity="0.3" strokeWidth="0.8" />
            {pts.map(([x, y], j) => (
              <g key={j}>
                <circle cx={x} cy={y} r="2" fill={GOLD} fillOpacity="0.9" />
                <circle cx={x} cy={y} r="6" stroke={GOLD} strokeOpacity="0.35" strokeWidth="0.7" />
              </g>
            ))}
          </g>
        ))}
        {/* Circuit traces with a square node where each one starts. */}
        {TRACES.map((pts, i) => {
          const [x, y] = pts[0]!
          return (
            <g key={i} stroke={GOLD} strokeWidth="0.9">
              <path d={polyline(pts)} strokeOpacity="0.28" />
              <rect x={x - 3} y={y - 3} width="6" height="6" strokeOpacity="0.5" strokeWidth="0.8" />
            </g>
          )
        })}
      </svg>

      <Ring className={`${s.ring} ${s.ringA}`} />
      <Ring className={`${s.ring} ${s.ringB}`} />
      <Dial />

      {/* Bright stars with a glow and four rays, pinned to the page margins. */}
      {BRIGHT_STARS.map((star, i) => (
        <span key={i} className={s.bright} style={marginStyle(star)}>
          <svg viewBox="-3 -3 6 6" fill="#fff1cc" fillOpacity="0.9">
            <path d={RAYS} />
          </svg>
        </span>
      ))}

      {TWINKLES.map((t, i) => (
        <span
          key={i}
          className={s.twinkle}
          style={{ ...marginStyle(t), animationDelay: `${t.delay}s`, animationDuration: `${t.duration}s` }}
        />
      ))}
    </div>
  )
}
