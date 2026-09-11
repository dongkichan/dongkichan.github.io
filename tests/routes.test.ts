import { test } from 'node:test'
import assert from 'node:assert/strict'
import { routes, resolveRoute, notFoundRoute } from '../src/routes.ts'
import { projects } from '../src/data/projects.ts'

test('routes contain the home page and one case-study route per project', () => {
  assert.equal(routes.filter((r) => r.kind === 'home').length, 1)
  const caseRoutes = routes.filter((r) => r.kind === 'case')
  assert.equal(caseRoutes.length, projects.length)
  for (const p of projects) {
    assert.ok(caseRoutes.some((r) => r.path === `/work/${p.slug}/`), `missing route for ${p.slug}`)
  }
})

test('there are exactly nine projects with unique slugs', () => {
  assert.equal(projects.length, 9)
  assert.equal(new Set(projects.map((p) => p.slug)).size, 9)
})

test('resolveRoute() returns the case route for a case-study path', () => {
  const r = resolveRoute('/work/powerapps-react-migration/')
  assert.equal(r.kind, 'case')
  assert.equal(r.kind === 'case' && r.project.slug, 'powerapps-react-migration')
})

test('resolveRoute() falls back to the not-found route for unknown paths', () => {
  assert.equal(resolveRoute('/nope/'), notFoundRoute)
  assert.equal(resolveRoute('/work/does-not-exist/').kind, 'notFound')
})
