/**
 * Build integrity checks. Fails CI (exit 1) if the static output is not what
 * the live site needs. Run after `npm run build`.
 */
import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs'
import { gzipSync } from 'node:zlib'
import { join } from 'node:path'

const dist = 'dist'
const SLUGS = [
  'powerapps-react-migration', 'in-touch-marketing-saas', 'government-tax-platform', 'laboratory-inventory',
  'dpulse-log-analyzer', 'image-classification-deep-learning', 'mailbug-email-for-seniors',
]
const ORIGIN = 'https://christiangastardo.dev'
const JS_BUDGET_GZIP = 100 * 1024
const failures = []
const fail = (msg) => failures.push(msg)
const ok = (msg) => console.log('  ✓', msg)
const read = (p) => readFileSync(join(dist, p), 'utf8')

// Files that must exist.
const required = [
  'index.html', '404.html', 'CNAME', 'robots.txt', 'sitemap.xml', 'favicon.svg', '.nojekyll',
  'googleeb31ef72d2c3af0e.html', 'Christian_Paul_Gastardo_CV.pdf', 'assets/images/apple-touch-icon.png',
  ...SLUGS.map((s) => `work/${s}/index.html`),
]
for (const f of required) {
  if (existsSync(join(dist, f))) ok(`exists ${f}`)
  else fail(`missing ${f}`)
}
if (failures.length) finish()

// Per-page checks.
const pages = [{ file: 'index.html', url: `${ORIGIN}/`, ld: ['Person', 'WebSite', 'ItemList'] }]
  .concat(SLUGS.map((s) => ({ file: `work/${s}/index.html`, url: `${ORIGIN}/work/${s}/`, ld: ['CreativeWork', 'BreadcrumbList'] })))
for (const page of pages) {
  const html = read(page.file)
  const count = (re) => (html.match(re) ?? []).length
  if (html.length < 6_000) fail(`${page.file}: only ${html.length} bytes, prerender likely failed`)
  if (!/<h1[^>]*>/.test(html)) fail(`${page.file}: no <h1>, prerender likely failed`)
  for (const token of ['__APP_ROUTE__', '<!--app-html-->', '<!--app-head-->']) if (html.includes(token)) fail(`${page.file}: leftover ${token}`)
  if (count(/<title>/g) !== 1) fail(`${page.file}: expected exactly one <title>`)
  if (count(/<link rel="canonical"/g) !== 1) fail(`${page.file}: expected exactly one canonical`)
  if (!html.includes(`<link rel="canonical" href="${page.url}">`)) fail(`${page.file}: canonical does not match ${page.url}`)
  if (!html.includes('G-ZGW5YW2H21')) fail(`${page.file}: analytics tag missing`)
  if (/<link rel="stylesheet"[^>]*href="\/assets\//.test(html)) fail(`${page.file}: stylesheet should be inlined, not linked`)
  if (!html.includes('<style>')) fail(`${page.file}: inlined stylesheet missing`)
  if (html.includes('fonts.googleapis.com')) fail(`${page.file}: third-party font CSS should be gone`)
  if (!/<link rel="preload" as="font"/.test(html)) fail(`${page.file}: font preloads missing`)
  const blocks = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map((m) => m[1])
  if (blocks.length !== page.ld.length) fail(`${page.file}: expected ${page.ld.length} JSON-LD blocks, found ${blocks.length}`)
  blocks.forEach((b, i) => {
    try {
      const parsed = JSON.parse(b)
      const type = Array.isArray(parsed['@type']) ? parsed['@type'][0] : parsed['@type']
      if (type !== page.ld[i]) fail(`${page.file}: JSON-LD block ${i} is ${type}, expected ${page.ld[i]}`)
      if (type === 'ItemList' && parsed.numberOfItems !== 7) fail(`${page.file}: ItemList should have 7 items`)
    } catch (e) {
      fail(`${page.file}: JSON-LD block ${i} does not parse: ${e.message}`)
    }
  })
  ok(`page ${page.file}`)
}

// Every project image referenced from the pages must exist in dist.
const home = read('index.html')
const mediaRefs = [...new Set([...home.matchAll(/\/assets\/images\/projects\/[^"' )]+/g)].map((m) => m[0]))]
for (const ref of mediaRefs) {
  if (!existsSync(join(dist, ref))) fail(`missing project image ${ref}`)
}
ok(`${mediaRefs.length} project images present`)

// 404 page is noindex and real content.
const nf = read('404.html')
if (!nf.includes('noindex')) fail('404.html: missing noindex')
if (nf.includes('__APP_ROUTE__')) fail('404.html: leftover route token')
ok('404.html')

// Sitemap lists exactly the 8 canonical URLs.
const locs = [...read('sitemap.xml').matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1])
const expected = [`${ORIGIN}/`, ...SLUGS.map((s) => `${ORIGIN}/work/${s}/`)]
if (locs.length !== 8 || expected.some((u) => !locs.includes(u))) fail(`sitemap.xml: expected 8 canonical URLs, got ${locs.join(', ')}`)
ok('sitemap.xml lists 8 URLs')

// JS weight budget.
const assets = readdirSync(join(dist, 'assets')).filter((f) => f.endsWith('.js'))
let gz = 0
for (const f of assets) gz += gzipSync(readFileSync(join(dist, 'assets', f))).length
const css = readdirSync(join(dist, 'assets')).filter((f) => f.endsWith('.css')).reduce((n, f) => n + gzipSync(readFileSync(join(dist, 'assets', f))).length, 0)
console.log(`  · JS ${(gz / 1024).toFixed(1)} KB gzip across ${assets.length} chunks, CSS ${(css / 1024).toFixed(1)} KB gzip`)
if (gz <= JS_BUDGET_GZIP) ok(`JS within ${JS_BUDGET_GZIP / 1024} KB budget`)
else fail(`JS ${(gz / 1024).toFixed(1)} KB gzip exceeds ${JS_BUDGET_GZIP / 1024} KB budget`)

// Word-count budget (visible text only), the reason this rebuild exists.
const words = (html) => {
  const body = html.match(/<body[^>]*>([\s\S]*)<\/body>/)?.[1] ?? ''
  const text = body
    .replace(/<script[\s\S]*?<\/script>/g, ' ')
    .replace(/<svg[\s\S]*?<\/svg>/g, ' ')
    .replace(/<(pre|div|span)[^>]*aria-hidden="true"[^>]*>[\s\S]*?<\/\1>/g, ' ')
    .replace(/<details[\s\S]*?<\/details>/g, ' ')
    .replace(/<span class="visually-hidden">[\s\S]*?<\/span>/g, ' ')
    .replace(/<[^>]+>/g, ' ')
  return text.split(/\s+/).filter(Boolean).length
}
const homeWords = words(read('index.html'))
console.log(`  · home page visible words: ${homeWords}`)
// 950 allows for client names, image captions and the nav; the original page carried about 1,490.
if (homeWords > 950) fail(`index.html: ${homeWords} default-visible words, budget is 950`)
for (const s of SLUGS) {
  const w = words(read(`work/${s}/index.html`))
  if (w > 260) fail(`work/${s}: ${w} visible words, budget is 260`)
}
ok('word budgets')

finish()

function finish() {
  if (failures.length) {
    console.error('\nBuild verification failed:')
    for (const f of failures) console.error('  ✗', f)
    process.exit(1)
  }
  console.log('\nBuild verified.')
  const size = (p) => statSync(join(dist, p)).size
  console.log(`  index.html ${(size('index.html') / 1024).toFixed(1)} KB`)
}
