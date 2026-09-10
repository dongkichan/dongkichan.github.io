import { test } from 'node:test'
import assert from 'node:assert/strict'
import { sessionFrame, totalChars, type SessionLine } from '../src/lib/session.ts'

const lines: SessionLine[] = [
  { kind: 'prompt', text: 'abc' },
  { kind: 'agent', text: 'de', typed: false },
  { kind: 'ok', text: 'fgh' },
]

test('totalChars() counts only the characters of typed lines (instant lines count as one tick)', () => {
  assert.equal(totalChars(lines), 3 + 1 + 3)
})

test('sessionFrame() reveals typed lines character by character in order', () => {
  const f = sessionFrame(lines, 2)
  assert.deepEqual(f.map((l) => l.text), ['ab', '', ''])
  assert.deepEqual(f.map((l) => l.visible), [true, false, false])
})

test('sessionFrame() shows an instant line in full as soon as its tick is reached', () => {
  const f = sessionFrame(lines, 4)
  assert.deepEqual(f.map((l) => l.text), ['abc', 'de', ''])
  assert.deepEqual(f.map((l) => l.visible), [true, true, false])
})

test('sessionFrame() marks the active line and settles when everything is revealed', () => {
  const mid = sessionFrame(lines, 5)
  assert.equal(mid[2]?.text, 'f')
  assert.equal(mid[2]?.active, true)
  const done = sessionFrame(lines, 99)
  assert.deepEqual(done.map((l) => l.text), ['abc', 'de', 'fgh'])
  assert.ok(done.every((l) => l.visible && !l.active))
})
