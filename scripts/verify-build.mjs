/**
 * Build integrity checks. Fails CI (exit 1) if the static output is not what
 * the live site needs. Run after `npm run build`.
 */
import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs'
import { gzipSync } from 'node:zlib'
import { join } from 'node:path'

const dist = 'dist'
const SLUGS = [
  'powerapps-react-migration', 'receiving-automation-runbooks', 'asset-inventory-sync-runbooks', 'in-touch-marketing-saas', 'government-tax-platform', 'laboratory-inventory',
  'dpulse-log-analyzer', 'image-classification-deep-learning', 'mailbug-email-for-seniors',
]
const ORIGIN = 'https://christiangastardo.dev'
const PORTRAIT = '/assets/images/optimized/christian-paul-gastardo-profile-photo.jpg'
const ogCard = (slug) => `assets/images/og/${slug}.png`
const OG_CARD = { width: 1200, height: 630, maxBytes: 1024 * 1024 }
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
  ...SLUGS.map(ogCard),
]
for (const f of required) {
  if (existsSync(join(dist, f))) ok(`exists ${f}`)
  else fail(`missing ${f}`)
}
if (failures.length) finish()

// Per-page checks.
const pages = [{ file: 'index.html', url: `${ORIGIN}/`, image: `${ORIGIN}${PORTRAIT}`, ld: ['Person', 'WebSite', 'ItemList'] }]
  .concat(SLUGS.map((s) => ({ file: `work/${s}/index.html`, url: `${ORIGIN}/work/${s}/`, image: `${ORIGIN}/${ogCard(s)}`, ld: ['CreativeWork', 'BreadcrumbList'] })))
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
  // The home page previews with the portrait; each case study previews with its own share card.
  if (!html.includes(`<meta property="og:image" content="${page.image}">`)) fail(`${page.file}: og:image should be ${page.image}`)
  if (!html.includes(`<meta name="twitter:image" content="${page.image}">`)) fail(`${page.file}: twitter:image should be ${page.image}`)
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
      if (type === 'ItemList' && parsed.numberOfItems !== SLUGS.length) fail(`${page.file}: ItemList should have ${SLUGS.length} items`)
    } catch (e) {
      fail(`${page.file}: JSON-LD block ${i} does not parse: ${e.message}`)
    }
  })
  ok(`page ${page.file}`)
}

// Every project image referenced from the pages must exist in dist.
const home = read('index.html')
const mediaRefs = [...new Set([...home.matchAll(/\/assets\/images\/(?:projects|logos)\/[^"' )]+/g)].map((m) => m[0]))]
for (const ref of mediaRefs) {
  if (!existsSync(join(dist, ref))) fail(`missing project image ${ref}`)
}
ok(`${mediaRefs.length} project images present`)

// Share cards are real PNGs at the Open Graph size, small enough for every network's crawler.
for (const s of SLUGS) {
  const png = readFileSync(join(dist, ogCard(s)))
  if (png.readUInt32BE(0) !== 0x89504e47) fail(`${ogCard(s)}: not a PNG`)
  const [w, h] = [png.readUInt32BE(16), png.readUInt32BE(20)]
  if (w !== OG_CARD.width || h !== OG_CARD.height) fail(`${ogCard(s)}: ${w}x${h}, expected ${OG_CARD.width}x${OG_CARD.height}`)
  if (png.length > OG_CARD.maxBytes) fail(`${ogCard(s)}: ${(png.length / 1024).toFixed(0)} KB, over ${OG_CARD.maxBytes / 1024} KB`)
}
ok(`${SLUGS.length} share cards at ${OG_CARD.width}x${OG_CARD.height}`)

// 404 page is noindex and real content.
const nf = read('404.html')
if (!nf.includes('noindex')) fail('404.html: missing noindex')
if (nf.includes('__APP_ROUTE__')) fail('404.html: leftover route token')
ok('404.html')

// Sitemap lists exactly the 8 canonical URLs.
const locs = [...read('sitemap.xml').matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1])
const expected = [`${ORIGIN}/`, ...SLUGS.map((s) => `${ORIGIN}/work/${s}/`)]
if (locs.length !== expected.length || expected.some((u) => !locs.includes(u))) fail(`sitemap.xml: expected ${expected.length} canonical URLs, got ${locs.join(', ')}`)
ok(`sitemap.xml lists ${expected.length} URLs`)

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
// 1,050 allows nine project rows, client names, image captions and the nav; the original page carried about 1,490.
if (homeWords > 1050) fail(`index.html: ${homeWords} default-visible words, budget is 1050`)
// 270 allows the six-word share row under the case study; the copy itself stays under 260.
for (const s of SLUGS) {
  const w = words(read(`work/${s}/index.html`))
  if (w > 270) fail(`work/${s}: ${w} visible words, budget is 270`)
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
