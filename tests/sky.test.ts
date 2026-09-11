import { test } from 'node:test'
import assert from 'node:assert/strict'
import { BRIGHT_STARS, TWINKLES, CONSTELLATIONS, TRACES, W, BAND, MIN_MARGIN_OFFSET, makeBrightStars, makeTwinkles } from '../src/lib/sky.ts'

/* The sky is one fixed layer, so anything bright that sits inside the reading
   column ends up behind body copy as the page scrolls past. The loud elements
   are therefore pinned to the margins outside the content container, and the
   hand-placed figures stay in the outer bands of the star field. */

const inOuterBand = (xs: number[]) => Math.max(...xs) <= W * BAND || Math.min(...xs) >= W * (1 - BAND)

test('bright stars are pinned to the margins outside the reading column', () => {
  assert.equal(BRIGHT_STARS.length, 9)
  for (const star of BRIGHT_STARS) {
    assert.ok(star.side === 'left' || star.side === 'right', 'each bright star picks a margin side')
    assert.ok(star.offset >= MIN_MARGIN_OFFSET, `bright star offset ${star.offset} sits too close to the container edge`)
    assert.ok(star.top >= 4 && star.top <= 96, `bright star top ${star.top}% is off the field`)
  }
  assert.ok(BRIGHT_STARS.some((s) => s.side === 'left') && BRIGHT_STARS.some((s) => s.side === 'right'), 'both margins get bright stars')
})

test('twinkles are pinned to the margins outside the reading column', () => {
  assert.equal(TWINKLES.length, 8)
  for (const t of TWINKLES) {
    assert.ok(t.side === 'left' || t.side === 'right', 'each twinkle picks a margin side')
    assert.ok(t.offset >= MIN_MARGIN_OFFSET, `twinkle offset ${t.offset} sits too close to the container edge`)
  }
})

test('constellations stay in the outer bands of the field', () => {
  for (const pts of CONSTELLATIONS) {
    assert.ok(inOuterBand(pts.map(([x]) => x)), `constellation crosses the reading band: ${JSON.stringify(pts)}`)
  }
})

test('circuit traces stay in the outer bands of the field', () => {
  for (const pts of TRACES) {
    assert.ok(inOuterBand(pts.map(([x]) => x)), `trace crosses the reading band: ${JSON.stringify(pts)}`)
  }
})

test('margin placement is deterministic so the server and client agree', () => {
  assert.deepEqual(makeBrightStars(9, 20260911), BRIGHT_STARS)
  assert.deepEqual(makeTwinkles(8, 77), TWINKLES)
  assert.notDeepEqual(makeBrightStars(9, 1), BRIGHT_STARS, 'a different seed gives a different sky')
})
