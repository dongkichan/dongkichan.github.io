/**
 * Renders public/assets/images/og/{slug}.png: the 1200x630 share card each
 * case-study page names in its Open Graph and Twitter tags. The card puts the
 * project's own artwork (its SVG concept, or the client imagery) beside the
 * title, from the same components and data the site renders.
 * Run `npm run og` after changing a project's title, tagline, art or media,
 * then commit the PNGs. Needs Google Chrome (set CHROME_PATH otherwise).
 */
import { execFileSync } from 'node:child_process'
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join, resolve } from 'node:path'
import { pathToFileURL } from 'node:url'
import { createElement } from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { ProjectArt } from '../src/components/art/ProjectArt'
import { profile } from '../src/data/profile'
import { projects, type Project } from '../src/data/projects'
import { OG_CARD, ogCardPath } from '../src/lib/og'
import { SITE_ORIGIN } from '../src/lib/url'

const esc = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')

const font = (pkg: string, file: string) =>
  pathToFileURL(resolve('node_modules/@fontsource', pkg, 'files', file)).href

/** A path under public/, as a file URL Chrome can load from the temp HTML. */
const publicUrl = (path: string) => pathToFileURL(resolve('public', path.replace(/^\//, ''))).href

const tokens = readFileSync(resolve('src/styles/tokens.css'), 'utf8')

const css = `
${tokens}
@font-face { font-family: 'Fraunces'; font-weight: 300; src: url('${font('fraunces', 'fraunces-latin-300-normal.woff2')}') format('woff2'); }
@font-face { font-family: 'Inter'; font-weight: 400; src: url('${font('inter', 'inter-latin-400-normal.woff2')}') format('woff2'); }
@font-face { font-family: 'JetBrains Mono'; font-weight: 400; src: url('${font('jetbrains-mono', 'jetbrains-mono-latin-400-normal.woff2')}') format('woff2'); }

html, body { margin: 0; padding: 0; }
body {
  width: ${OG_CARD.width}px; height: ${OG_CARD.height}px; overflow: hidden;
  background: var(--bg); color: var(--text); font-family: var(--font-body); -webkit-font-smoothing: antialiased;
}
.card {
  box-sizing: border-box; width: ${OG_CARD.width}px; height: ${OG_CARD.height}px; padding: 56px;
  display: grid; grid-template-columns: 420px 628px; column-gap: 40px; align-items: center;
}
.copy { display: flex; flex-direction: column; height: 100%; min-width: 0; }
.meta { margin: 0 0 22px; font-family: var(--font-mono); font-size: 15px; letter-spacing: 0.02em; color: var(--accent); }
h1 { margin: 0; font-family: var(--font-display); font-weight: 300; font-size: 42px; line-height: 1.08; letter-spacing: -0.01em; overflow-wrap: anywhere; }
.line { margin: 20px 0 0; font-size: 19px; line-height: 1.45; color: var(--faint); }
.who { margin-top: auto; display: grid; gap: 4px; font-size: 16px; }
.who small { font-family: var(--font-mono); font-size: 14px; color: var(--faint); }

/* Same frame the case-study page draws around the artwork. */
.art { position: relative; width: 628px; height: 377px; border: 1px solid var(--line); border-radius: var(--radius); overflow: hidden; background: var(--surface); }
.art > svg { width: 100%; height: 100%; display: block; }

/* Client imagery, mirroring ProjectMedia.module.css. */
.logo { position: relative; width: 100%; height: 100%; display: grid; place-items: center; }
.logo::before { content: ''; position: absolute; inset: 0; background-image: linear-gradient(rgba(245,243,238,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(245,243,238,0.05) 1px, transparent 1px); background-size: 40px 40px; }
.logoInner { position: relative; box-sizing: border-box; width: 100%; display: grid; justify-items: center; gap: 18px; padding: 24px; }
.logoInner img { width: min(62%, 340px); height: auto; max-height: 120px; object-fit: contain; display: block; }
.logoName { font-family: var(--font-display); font-weight: 300; font-size: 27px; color: var(--text); text-align: center; }
.caption { position: absolute; left: 14px; bottom: 12px; font-family: var(--font-mono); font-size: 11.5px; color: var(--faint); }
.shot { display: flex; flex-direction: column; width: 100%; height: 100%; }
.bar { display: flex; align-items: center; gap: 10px; padding: 8px 12px; border-bottom: 1px solid var(--line); font-family: var(--font-mono); font-size: 11.5px; color: var(--faint); }
.dots { display: inline-flex; gap: 5px; }
.dots i { width: 8px; height: 8px; border-radius: 50%; background: var(--line-strong); }
.url { margin-left: auto; }
.img { flex: 1; min-height: 0; overflow: hidden; }
.img img { width: 100%; height: 100%; object-fit: cover; object-position: top; display: block; }
`

function artwork(p: Project): string {
  const m = p.media
  if (!m) return renderToStaticMarkup(createElement(ProjectArt, { variant: p.art, id: 'og' }))
  if (m.kind === 'logo') {
    const wordmark = m.width / m.height > 1.6
    return `<div class="logo"><div class="logoInner"><img src="${publicUrl(m.src)}" width="${m.width}" height="${m.height}" alt="">${
      wordmark ? '' : `<span class="logoName">${esc(p.client)}</span>`
    }</div><span class="caption">${esc(m.caption)}</span></div>`
  }
  return `<div class="shot"><div class="bar"><span class="dots"><i></i><i></i><i></i></span><span class="url">${esc(m.caption)}</span></div><div class="img"><img src="${publicUrl(m.fallback ?? m.src)}" alt=""></div></div>`
}

const card = (p: Project) => `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><title>${esc(p.title)}</title><style>${css}</style></head>
<body>
<div class="card">
  <div class="copy">
    <p class="meta">${esc(p.category)} · ${esc(p.year)}</p>
    <h1>${esc(p.title)}</h1>
    <p class="line">${esc(p.tagline)}</p>
    <p class="who">${esc(profile.name)}<small>${esc(SITE_ORIGIN.replace(/^https:\/\//, ''))}</small></p>
  </div>
  <div class="art">${artwork(p)}</div>
</div>
</body></html>`

const chrome = [
  process.env.CHROME_PATH,
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  '/usr/bin/google-chrome',
  '/usr/bin/google-chrome-stable',
  '/usr/bin/chromium',
  '/usr/bin/chromium-browser',
].find((p): p is string => Boolean(p) && existsSync(p as string))
if (!chrome) {
  console.error('Google Chrome not found. Set CHROME_PATH to a Chrome or Chromium binary.')
  process.exit(1)
}

const work = join(tmpdir(), 'christiangastardo-og')
mkdirSync(work, { recursive: true })

for (const p of projects) {
  const htmlPath = join(work, `${p.slug}.html`)
  writeFileSync(htmlPath, card(p))
  const out = resolve('public', ogCardPath(p).replace(/^\//, ''))
  mkdirSync(resolve(out, '..'), { recursive: true })
  execFileSync(
    chrome,
    [
      '--headless=new', '--disable-gpu', '--hide-scrollbars', '--force-device-scale-factor=1',
      '--allow-file-access-from-files', '--virtual-time-budget=3000',
      `--window-size=${OG_CARD.width},${OG_CARD.height}`, `--screenshot=${out}`, pathToFileURL(htmlPath).href,
    ],
    { stdio: ['ignore', 'ignore', 'ignore'] },
  )
  const png = readFileSync(out)
  const [w, h] = [png.readUInt32BE(16), png.readUInt32BE(20)]
  if (w !== OG_CARD.width || h !== OG_CARD.height) {
    console.error(`  ✗ ${out} is ${w}x${h}, expected ${OG_CARD.width}x${OG_CARD.height}`)
    process.exit(1)
  }
  console.log(`  wrote ${out.replace(`${process.cwd()}/`, '')} (${(png.length / 1024).toFixed(0)} KB)`)
}
