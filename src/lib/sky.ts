/**
 * Geometry for the night-sky background. Pure data and pure functions, no DOM,
 * so the server and the client paint the same field and the placement rules
 * can be tested.
 *
 * The sky is one fixed layer behind a scrolling page, so anything bright that
 * sits inside the reading column ends up behind body copy sooner or later.
 * Two rules keep the words clear:
 *  - the loud elements (bright four-ray stars, twinkles) are pinned to the
 *    margins outside the content container, measured from its edge, so they
 *    slide off-screen on narrow viewports instead of landing on text;
 *  - the hand-placed figures (constellations, circuit traces) live in the
 *    outer BAND of the star field, which `xMidYMid slice` crops away on phones.
 * The quiet texture (star dust, orbit arcs) stays everywhere and is dimmed by
 * the reading lane in Sky.module.css.
 */

/** Star-field viewBox. */
export const W = 1600
export const H = 1000
/** Outer fraction of the field, each side, where hand-placed figures may sit. */
export const BAND = 0.15
/** Closest a margin-pinned element's centre may sit to the container edge, in px. Covers its own glow. */
export const MIN_MARGIN_OFFSET = 16

export type Side = 'left' | 'right'

/** Small deterministic PRNG (mulberry32). Same output on server and client. */
export function rng(seed: number) {
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

/** Star dust: tiny gold points scattered over the whole field. */
export interface Star { x: number; y: number; r: number; a: number }

export function makeStars(count: number, seed: number): Star[] {
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

/** An element pinned to a page margin: `offset` px outside the content container on `side`, `top` % down the viewport, `size` px square. */
export interface MarginSpot { side: Side; offset: number; top: number; size: number }

interface MarginRange { minOffset: number; maxOffset: number; minSize: number; maxSize: number }

function placeInMargins(count: number, rand: () => number, range: MarginRange): MarginSpot[] {
  const spots: MarginSpot[] = []
  for (let i = 0; i < count; i++) {
    spots.push({
      side: i % 2 === 0 ? 'left' : 'right',
      offset: Math.round(range.minOffset + rand() * (range.maxOffset - range.minOffset)),
      top: r1(6 + rand() * 88),
      size: Math.round(range.minSize + rand() * (range.maxSize - range.minSize)),
    })
  }
  return spots
}

/** Bright four-ray stars with a glow. `size` is the glow box; the rays span a third of it. */
export type BrightStar = MarginSpot

export function makeBrightStars(count: number, seed: number): BrightStar[] {
  return placeInMargins(count, rng(seed), { minOffset: 20, maxOffset: 116, minSize: 36, maxSize: 54 })
}

/** Slowly pulsing points of light. */
export interface Twinkle extends MarginSpot { delay: number; duration: number }

export function makeTwinkles(count: number, seed: number): Twinkle[] {
  const rand = rng(seed)
  const spots = placeInMargins(count, rand, { minOffset: 20, maxOffset: 116, minSize: 4, maxSize: 7 })
  return spots.map((spot) => ({ ...spot, delay: r1(rand() * 6), duration: r1(3.5 + rand() * 3) }))
}

export const STARS = makeStars(190, 20260910)
export const BRIGHT_STARS = makeBrightStars(9, 20260911)
export const TWINKLES = makeTwinkles(8, 77)

export type Points = Array<[number, number]>

/** Constellations: hand-placed anchors so they read as figures, not noise. Outer bands only. */
export const CONSTELLATIONS: Points[] = [
  [[40, 180], [110, 140], [170, 200], [230, 160], [200, 260], [120, 300]],
  [[1380, 560], [1440, 500], [1520, 530], [1570, 620], [1490, 680]],
  [[30, 820], [90, 760], [150, 810], [210, 770], [238, 860]],
]

/** Circuit-like traces: right-angle polylines with a square node at the start. The technology half. Outer bands only. */
export const TRACES: Points[] = [
  [[1380, 120], [1470, 120], [1470, 180], [1540, 180], [1540, 140], [1590, 140]],
  [[60, 640], [60, 710], [140, 710], [140, 760], [200, 760]],
  [[1580, 880], [1500, 880], [1500, 830], [1400, 830]],
]

/** Large faint arcs, like orbit paths crossing the field. Quiet enough to stay everywhere. */
export const ARCS = [
  { cx: 1250, cy: 220, r: 420, dash: '3 9', a: 0.16 },
  { cx: 380, cy: 900, r: 520, dash: '1 7', a: 0.14 },
  { cx: 900, cy: 480, r: 300, dash: '4 10', a: 0.12 },
]

export function polyline(pts: Points): string {
  return pts.map(([x, y], i) => `${i === 0 ? 'M' : 'L'}${x} ${y}`).join('')
}

export function fourPointStar(x: number, y: number, size: number): string {
  const s = size, k = size * 0.16
  return `M${x} ${y - s}L${x + k} ${y - k}L${x + s} ${y}L${x + k} ${y + k}L${x} ${y + s}L${x - k} ${y + k}L${x - s} ${y}L${x - k} ${y - k}Z`
}
