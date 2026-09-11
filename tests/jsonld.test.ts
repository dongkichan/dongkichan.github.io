import { test } from 'node:test'
import assert from 'node:assert/strict'
import { safeJsonLd, homeJsonLd, caseJsonLd } from '../src/lib/jsonld.ts'
import { projects } from '../src/data/projects.ts'

test('safeJsonLd() escapes "<" so a closing script tag cannot break out of the block', () => {
  const out = safeJsonLd({ name: '</script><script>alert(1)</script>' })
  assert.ok(!out.includes('</script>'))
  assert.deepEqual(JSON.parse(out), { name: '</script><script>alert(1)</script>' })
})

test('homeJsonLd() returns Person+ProfessionalService, WebSite and a 9-item ItemList', () => {
  const blocks = homeJsonLd()
  assert.equal(blocks.length, 3)
  assert.deepEqual(blocks[0]!['@type'], ['Person', 'ProfessionalService'])
  assert.equal(blocks[1]!['@type'], 'WebSite')
  assert.equal(blocks[2]!['@type'], 'ItemList')
  assert.equal(blocks[2]!.numberOfItems, 9)
  assert.equal(blocks[2]!.itemListElement.length, 9)
})

test('caseJsonLd() returns a CreativeWork and a 3-item BreadcrumbList for the project', () => {
  const project = projects[0]!
  const blocks = caseJsonLd(project)
  assert.equal(blocks.length, 2)
  assert.equal(blocks[0]!['@type'], 'CreativeWork')
  assert.equal(blocks[0]!.url, `https://christiangastardo.dev/work/${project.slug}/`)
  assert.equal(blocks[1]!['@type'], 'BreadcrumbList')
  assert.equal(blocks[1]!.itemListElement.length, 3)
  assert.equal(blocks[1]!.itemListElement[2].name, project.title)
})
