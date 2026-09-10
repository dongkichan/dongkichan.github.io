import { test } from 'node:test'
import assert from 'node:assert/strict'
import { SITE_ORIGIN, absolute, normalizeRoutePath } from '../src/lib/url.ts'

test('absolute() prefixes a path with the site origin', () => {
  assert.equal(SITE_ORIGIN, 'https://christiangastardo.dev')
  assert.equal(absolute('/work/demo/'), 'https://christiangastardo.dev/work/demo/')
})

test('normalizeRoutePath() maps an empty or root path to "/"', () => {
  assert.equal(normalizeRoutePath(''), '/')
  assert.equal(normalizeRoutePath('/'), '/')
  assert.equal(normalizeRoutePath('/index.html'), '/')
})

test('normalizeRoutePath() adds a trailing slash and strips index.html', () => {
  assert.equal(normalizeRoutePath('/work/demo'), '/work/demo/')
  assert.equal(normalizeRoutePath('/work/demo/index.html'), '/work/demo/')
})

test('normalizeRoutePath() lowercases and collapses duplicate slashes', () => {
  assert.equal(normalizeRoutePath('//Work//Demo/'), '/work/demo/')
})
