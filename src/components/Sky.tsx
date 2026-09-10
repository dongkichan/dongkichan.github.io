import s from './Sky.module.css'

/**
 * The background: a night sky where astrology, technology and time meet.
 * One fixed layer behind the page. The starfield, constellations and arcs are a
 * single static SVG (painted once). Only a few elements move, each on its own
 * compositor layer, and only via transform or opacity, so scrolling stays smooth.
 * Everything is generated from a fixed seed, so the server and client agree.
 */

const W = 1600
const H = 1000
const GOLD = '#e0b66c'

/** Small deterministic PRNG (mulberry32). Same output on server and client. */
function rng(seed: number) {
  let a = seed >>> 0
  return () => {
    a = (a + 0x6d2b79f5) >>> 0
    let t = a
    t = Math.imul(t ^ (t >>> 15), t | 1)
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

const r1 = (n: number) => Math.round(n * 10) / 10

interface Star { x: number; y: number; r: number; a: number }

function makeStars(count: number, seed: number): Star[] {
  const rand = rng(seed)
  const stars: Star[] = []
  for (let i = 0; i < count; i++) {
    const t = rand()
    stars.push({
      x: r1(rand() * W),
      y: r1(rand() * H),
      r: r1(t < 0.75 ? 0.6 + rand() * 0.7 : 1.2 + rand() * 1.3),
      a: r1(0.25 + rand() * 0.55),
    })
  }
  return stars
}

const STARS = makeStars(190, 20260910)
const BRIGHT = STARS.filter((st) => st.r > 1.9).slice(0, 9)

/** A few constellations: hand-placed anchors so they read as figures, not noise. */
const CONSTELLATIONS: Array<Array<[number, number]>> = [
  [[210, 180], [290, 150], [360, 210], [420, 170], [470, 250], [400, 300]],
  [[1080, 620], [1150, 560], [1240, 590], [1300, 680], [1220, 740]],
  [[620, 780], [700, 740], [760, 800], [850, 770], [900, 860]],
]

/** Circuit-like traces: right-angle paths with square nodes. The technology half. */
const TRACES = [
  'M1180 120 h90 v60 h70 v-40 h60',
  'M120 640 v70 h80 v50 h60',
  'M1360 880 h-70 v-50 h-90',
]

/** Large faint arcs, like orbit paths crossing the field. */
const ARCS = [
  { cx: 1250, cy: 220, r: 420, dash: '3 9', a: 0.16 },
  { cx: 380, cy: 900, r: 520, dash: '1 7', a: 0.14 },
  { cx: 900, cy: 480, r: 300, dash: '4 10', a: 0.12 },
]

function fourPointStar(x: number, y: number, size: number): string {
  const s = size, k = size * 0.16
  return `M${x} ${y - s}L${x + k} ${y - k}L${x + s} ${y}L${x + k} ${y + k}L${x} ${y + s}L${x - k} ${y + k}L${x - s} ${y}L${x - k} ${y - k}Z`
}

function Ticks({ r, count, long }: { r: number; count: number; long: number }) {
  const lines: string[] = []
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

const TWINKLES = (() => {
  const rand = rng(77)
  return Array.from({ length: 8 }, () => ({
    left: r1(4 + rand() * 92),
    top: r1(4 + rand() * 92),
    delay: r1(rand() * 6),
    duration: r1(3.5 + rand() * 3),
    size: 4 + Math.round(rand() * 3),
  }))
})()

export function Sky() {
  return (
    <div className={s.sky} aria-hidden="true">
      <svg className={s.field} viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="xMidYMid slice" fill="none">
        <defs>
          <radialGradient id="sky-glow">
            <stop offset="0" stopColor="#ffe6b0" stopOpacity="0.9" />
            <stop offset="0.35" stopColor={GOLD} stopOpacity="0.35" />
            <stop offset="1" stopColor={GOLD} stopOpacity="0" />
          </radialGradient>
        </defs>
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
            <path d={pts.map(([x, y], j) => `${j === 0 ? 'M' : 'L'}${x} ${y}`).join('')} stroke={GOLD} strokeOpacity="0.3" strokeWidth="0.8" />
            {pts.map(([x, y], j) => (
              <g key={j}>
                <circle cx={x} cy={y} r="2" fill={GOLD} fillOpacity="0.9" />
                <circle cx={x} cy={y} r="6" stroke={GOLD} strokeOpacity="0.35" strokeWidth="0.7" />
              </g>
            ))}
          </g>
        ))}
        {/* Circuit traces. */}
        {TRACES.map((d, i) => (
          <g key={i} stroke={GOLD} strokeOpacity="0.28" strokeWidth="0.9">
            <path d={d} />
          </g>
        ))}
        {TRACES.map((d, i) => {
          const m = /M(\d+) (\d+)/.exec(d)!
          return <rect key={i} x={Number(m[1]) - 3} y={Number(m[2]) - 3} width="6" height="6" stroke={GOLD} strokeOpacity="0.5" strokeWidth="0.8" />
        })}
        {/* Bright stars with a glow and four rays. */}
        {BRIGHT.map((st, i) => (
          <g key={i}>
            <circle cx={st.x} cy={st.y} r={st.r * 9} fill="url(#sky-glow)" fillOpacity="0.35" />
            <path d={fourPointStar(st.x, st.y, st.r * 6)} fill="#fff1cc" fillOpacity="0.85" />
          </g>
        ))}
      </svg>

      <Ring className={`${s.ring} ${s.ringA}`} />
      <Ring className={`${s.ring} ${s.ringB}`} />
      <Dial />

      {TWINKLES.map((t, i) => (
        <span
          key={i}
          className={s.twinkle}
          style={{ left: `${t.left}%`, top: `${t.top}%`, width: t.size, height: t.size, animationDelay: `${t.delay}s`, animationDuration: `${t.duration}s` }}
        />
      ))}
    </div>
  )
}
