import { test } from 'node:test'
import assert from 'node:assert/strict'
import { shareTargets, shareUrl } from '../src/lib/share.ts'
import { projects } from '../src/data/projects.ts'

const project = projects.find((p) => p.slug === 'mailbug-email-for-seniors')!

test('shareUrl() is the canonical case-study URL', () => {
  assert.equal(shareUrl(project), 'https://christiangastardo.dev/work/mailbug-email-for-seniors/')
})

test('shareTargets() returns LinkedIn, X and Email links that carry the encoded case-study URL', () => {
  const targets = shareTargets(project)
  const encoded = encodeURIComponent('https://christiangastardo.dev/work/mailbug-email-for-seniors/')
  assert.deepEqual(targets.map((t) => t.label), ['LinkedIn', 'X', 'Email'])
  const [linkedin, x, email] = targets
  assert.ok(linkedin!.href.startsWith('https://www.linkedin.com/sharing/share-offsite/?url='))
  assert.ok(linkedin!.href.includes(encoded))
  assert.ok(x!.href.startsWith('https://x.com/intent/post?'))
  assert.ok(x!.href.includes(`url=${encoded}`))
  assert.ok(x!.href.includes('text='))
  assert.ok(email!.href.startsWith('mailto:?subject='))
  assert.ok(email!.href.includes(encoded))
})

test('shareTargets() escapes the title so an ampersand cannot break the query string', () => {
  const t = shareTargets({ ...project, title: 'A & B' })
  assert.ok(t[1]!.href.includes('A%20%26%20B'))
  assert.ok(t[2]!.href.includes('A%20%26%20B'))
})
