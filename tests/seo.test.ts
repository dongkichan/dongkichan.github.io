import { test } from 'node:test'
import assert from 'node:assert/strict'
import { buildHead } from '../src/lib/seo.ts'
import { resolveRoute, notFoundRoute } from '../src/routes.ts'

const count = (s: string, re: RegExp) => (s.match(re) ?? []).length

test('buildHead() for the home route emits title, self canonical, og:url and three JSON-LD blocks', () => {
  const head = buildHead(resolveRoute('/'))
  assert.equal(count(head, /<title>/g), 1)
  assert.ok(head.includes('<link rel="canonical" href="https://christiangastardo.dev/">'))
  assert.ok(head.includes('<meta property="og:url" content="https://christiangastardo.dev/">'))
  assert.equal(count(head, /<script type="application\/ld\+json">/g), 3)
})

test('buildHead() for a case route uses the project title and its own canonical URL', () => {
  const head = buildHead(resolveRoute('/work/mailbug-email-for-seniors/'))
  assert.ok(head.includes('<title>MailBug'))
  assert.ok(head.includes('<link rel="canonical" href="https://christiangastardo.dev/work/mailbug-email-for-seniors/">'))
  assert.equal(count(head, /<script type="application\/ld\+json">/g), 2)
})

test('buildHead() escapes ampersands and quotes inside meta content', () => {
  const head = buildHead(resolveRoute('/'))
  assert.ok(!/content="[^"]*&(?!amp;|quot;|#39;|lt;|gt;)[^"]*"/.test(head), 'unescaped & in content attr')
})

test('buildHead() marks the not-found page noindex', () => {
  const head = buildHead(notFoundRoute)
  assert.ok(head.includes('<meta name="robots" content="noindex'))
})
