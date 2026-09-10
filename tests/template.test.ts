import { test } from 'node:test'
import assert from 'node:assert/strict'
import { injectTemplate, renderSitemap } from '../src/lib/template.ts'

const tpl = '<head><!--app-head--></head><body><div id="root" data-route="__APP_ROUTE__"><!--app-html--></div></body>'

test('injectTemplate() fills head, html and route tokens', () => {
  const out = injectTemplate(tpl, { head: '<title>T</title>', html: '<p>hi</p>', route: '/work/x/' })
  assert.equal(out, '<head><title>T</title></head><body><div id="root" data-route="/work/x/"><p>hi</p></div></body>')
})

test('injectTemplate() treats "$" sequences in content literally', () => {
  const out = injectTemplate(tpl, { head: '', html: "<p>costs $& and $' and $1</p>", route: '/' })
  assert.ok(out.includes("<p>costs $& and $' and $1</p>"))
})

test('injectTemplate() throws when the template is missing a token', () => {
  assert.throws(() => injectTemplate('<div></div>', { head: '', html: '', route: '/' }), /app-html/)
})

test('renderSitemap() emits one <url> per entry with loc, lastmod, changefreq and priority', () => {
  const xml = renderSitemap([
    { loc: 'https://christiangastardo.dev/', lastmod: '2026-09-09', changefreq: 'monthly', priority: '1.0' },
    { loc: 'https://christiangastardo.dev/work/a/', lastmod: '2026-04-25', changefreq: 'yearly', priority: '0.8' },
  ])
  assert.ok(xml.startsWith('<?xml version="1.0" encoding="UTF-8"?>'))
  assert.equal((xml.match(/<loc>/g) ?? []).length, 2)
  assert.ok(xml.includes('<lastmod>2026-04-25</lastmod>'))
  assert.ok(xml.includes('<priority>1.0</priority>'))
})
