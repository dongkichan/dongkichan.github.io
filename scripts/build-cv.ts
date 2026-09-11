/**
 * Renders public/Christian_Paul_Gastardo_CV.pdf from the same data the site uses.
 * Run `npm run cv` after changing anything in src/data/, then commit the PDF.
 * Needs Google Chrome (set CHROME_PATH to point at another Chromium build).
 */
import { execFileSync } from 'node:child_process'
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join, resolve } from 'node:path'
import { pathToFileURL } from 'node:url'
import { awards, certifications, education } from '../src/data/credentials'
import { cv } from '../src/data/cv'
import { experience } from '../src/data/experience'
import { profile } from '../src/data/profile'
import { skillGroups } from '../src/data/skills'
import { stats } from '../src/data/stats'
import { testimonials } from '../src/data/testimonials'

const OUT = resolve('public', profile.cvPath.replace(/^\//, ''))

const esc = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')

const font = (pkg: string, file: string) =>
  pathToFileURL(resolve('node_modules/@fontsource', pkg, 'files', file)).href

const css = `
@font-face { font-family: 'Fraunces'; font-weight: 300; src: url('${font('fraunces', 'fraunces-latin-300-normal.woff2')}') format('woff2'); }
@font-face { font-family: 'Fraunces'; font-weight: 400; src: url('${font('fraunces', 'fraunces-latin-400-normal.woff2')}') format('woff2'); }
@font-face { font-family: 'Inter'; font-weight: 400; src: url('${font('inter', 'inter-latin-400-normal.woff2')}') format('woff2'); }
@font-face { font-family: 'Inter'; font-weight: 500; src: url('${font('inter', 'inter-latin-500-normal.woff2')}') format('woff2'); }
@font-face { font-family: 'Inter'; font-weight: 600; src: url('${font('inter', 'inter-latin-600-normal.woff2')}') format('woff2'); }
@font-face { font-family: 'JetBrains Mono'; font-weight: 400; src: url('${font('jetbrains-mono', 'jetbrains-mono-latin-400-normal.woff2')}') format('woff2'); }

@page { size: letter; margin: 0.42in 0.5in 0.42in; }
:root {
  --ink: #17181c; --muted: #4c4f58; --faint: #7a7d86; --rule: #d8d4cb; --accent: #8a6a2b; --plate: #f4f1ea;
  --serif: 'Fraunces', Georgia, serif; --sans: 'Inter', system-ui, sans-serif; --mono: 'JetBrains Mono', Menlo, monospace;
}
* { box-sizing: border-box; margin: 0; padding: 0; }
html { font-size: 10pt; }
body { font-family: var(--sans); color: var(--ink); line-height: 1.36; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
a { color: inherit; text-decoration: none; }
ul { list-style: none; }

header { display: grid; grid-template-columns: 1fr auto; gap: 0 22pt; align-items: center; padding-bottom: 10pt; border-bottom: 1.5pt solid var(--ink); }
.side { display: grid; justify-items: center; gap: 6pt; }
.photo { width: 74pt; height: 74pt; object-fit: cover; border-radius: 6pt; display: block; }
h1 { font-family: var(--serif); font-weight: 300; font-size: 23pt; line-height: 1.05; letter-spacing: -0.01em; }
.role { font-size: 11.5pt; color: var(--muted); margin-top: 4pt; }
.contact { display: flex; flex-wrap: wrap; gap: 3pt 14pt; font-size: 9.25pt; color: var(--muted); margin-top: 7pt; }
.contact li::before { content: ''; }
.badge { font-family: var(--mono); font-size: 8pt; color: var(--accent); border: 0.75pt solid var(--accent); border-radius: 3pt; padding: 2.5pt 6pt; white-space: nowrap; }

section { margin-top: 9pt; break-inside: auto; }
h2 { break-after: avoid; }
h2 { font-family: var(--mono); font-weight: 400; font-size: 8.5pt; letter-spacing: 0.12em; text-transform: uppercase; color: var(--accent); margin-bottom: 5pt; padding-bottom: 3pt; border-bottom: 0.75pt solid var(--rule); }
p.summary { max-width: 62em; }

.stats { display: grid; grid-template-columns: repeat(4, 1fr); gap: 0 12pt; margin-top: 8pt; background: var(--plate); border-radius: 4pt; padding: 6pt 12pt 7pt; }
.stats li { font-size: 8.75pt; color: var(--muted); line-height: 1.3; }
.stats b { display: block; font-family: var(--serif); font-weight: 400; font-size: 13.5pt; color: var(--ink); line-height: 1.15; }

/* Block layout, not grid, so Chrome can break a role between bullets across the page fold. */
.job { padding: 4.5pt 0 5.5pt; border-bottom: 0.5pt solid var(--rule); }
.job:last-child { border-bottom: 0; }
.jobHead { display: flex; justify-content: space-between; align-items: flex-start; gap: 16pt; break-after: avoid; }
h3 { font-size: 10.5pt; font-weight: 600; line-height: 1.3; }
.org { color: var(--muted); font-size: 9.75pt; margin-top: 1pt; }
.dates { font-family: var(--mono); font-size: 8.5pt; color: var(--faint); white-space: nowrap; padding-top: 3pt; }
.job ul { margin-top: 3pt; }
.job li { position: relative; padding-left: 12pt; margin-top: 1.5pt; color: var(--ink); break-inside: avoid; }
.job li::before { content: ''; position: absolute; left: 0; top: 0.72em; width: 6pt; height: 0.75pt; background: var(--accent); }

.skills { display: grid; gap: 3pt; }
.skills li { font-size: 9.5pt; }
.skills b::after { content: ' · '; color: var(--faint); font-weight: 400; }
.skills b { font-weight: 600; color: var(--ink); }
.skills span { color: var(--muted); }

.two { display: grid; grid-template-columns: minmax(0, 1fr) minmax(0, 1fr); gap: 0 28pt; }
.two section { break-inside: avoid; }
.two section + section { margin-top: 8pt; }
.plain li { display: flex; justify-content: space-between; gap: 12pt; padding: 2.5pt 0; border-bottom: 0.5pt solid var(--rule); font-size: 9.5pt; }
.plain li:last-child { border-bottom: 0; }
.plain li span:last-child:not(:only-child) { color: var(--faint); font-family: var(--mono); font-size: 8.25pt; white-space: nowrap; padding-top: 1pt; }
.plain li span:first-child em { font-style: normal; color: var(--muted); }

.recs { font-size: 9.5pt; color: var(--muted); }
.recs b { font-weight: 600; color: var(--ink); }
.small { color: var(--muted); font-size: 9.25pt; margin-top: 4pt; }
`

const recs = testimonials.filter((t) => t.source === 'LinkedIn')

const html = `<!doctype html>
<html lang="en"><head><meta charset="utf-8">
<title>${esc(profile.name)} — CV</title>
<meta name="author" content="${esc(profile.name)}">
<style>${css}</style></head>
<body>
<header>
  <div>
    <h1>${esc(profile.name)}</h1>
    <p class="role">${esc(profile.title)} · ${esc(profile.focus.replace(/^./, (c) => c.toUpperCase()))}</p>
    <ul class="contact">
    <li>${esc(profile.location.city)}, ${esc(profile.location.country)} (${esc(profile.location.timezone)})</li>
    <li><a href="mailto:${esc(profile.email)}">${esc(profile.email)}</a></li>
    <li>${esc(cv.phone)}</li>
    <li><a href="https://${esc(cv.site)}">${esc(cv.site)}</a></li>
    ${profile.socials
      .filter((s) => s.label !== 'Upwork')
      .map((s) => `<li><a href="${esc(s.href)}">${esc(s.href.replace(/^https:\/\/(www\.)?/, ''))}</a></li>`)
      .join('\n    ')}
  </ul>
  </div>
  <div class="side">
    <img class="photo" src="${pathToFileURL(resolve('public' + profile.photo.jpg)).href}" alt="">
    <a class="badge" href="${esc(profile.upworkUrl)}">Upwork Top Rated Plus</a>
  </div>
</header>

<section>
  <h2>Summary</h2>
  <p class="summary">${esc(cv.summary)}</p>
  <ul class="stats">
    ${stats.map((s) => `<li><b>${esc(s.display)}</b><span>${esc(s.label)}</span></li>`).join('\n    ')}
  </ul>
</section>

<section>
  <h2>Experience</h2>
  ${experience
    .map(
      (r) => `<article class="job">
    <div class="jobHead">
      <div><h3>${esc(r.title)}</h3><p class="org">${esc(r.company)} · ${esc(r.location)}</p></div>
      <span class="dates">${esc(r.dates)}</span>
    </div>
    <ul>${r.bullets.map((b) => `<li>${esc(b)}</li>`).join('')}</ul>
  </article>`,
    )
    .join('\n  ')}
</section>

<section>
  <h2>Education</h2>
  <ul class="plain">
    <li><span>${esc(education.degree)} <em>· ${esc(education.school)}, ${esc(cv.educationLocation)}</em></span><span>${esc(cv.educationDates)}</span></li>
  </ul>
</section>

<div class="two">
  <div>
    <section>
      <h2>Skills</h2>
      <ul class="skills">
        ${[...skillGroups, ...cv.extraSkillGroups]
          .map((g) => `<li><b>${esc(g.name)}</b><span>${g.items.map(esc).join(', ')}</span></li>`)
          .join('\n        ')}
      </ul>
    </section>
    <section>
      <h2>Recognition</h2>
      <ul class="plain">
        ${awards.map((a) => `<li><span>${esc(a.name)} <em>· ${esc(a.issuer)}</em></span><span>${esc(a.date)}</span></li>`).join('\n        ')}
      </ul>
    </section>
  </div>
  <div>
    <section>
      <h2>Certifications</h2>
      <ul class="plain">
        ${certifications
          .map((c) => `<li><span>${esc(c.name)} <em>· ${esc(c.issuer)}</em></span><span>${esc(c.date ?? '')}</span></li>`)
          .join('\n        ')}
      </ul>
    </section>
    <section>
      <h2>Recommendations</h2>
      <p class="recs">${recs
        .map((t) => `<b>${esc(t.name)}</b>, ${esc(t.title.replace(/^Direct/, 'direct'))} (${esc(t.date)})`)
        .join('; ')}. All on ${esc(recs[0]?.source ?? 'LinkedIn')}.</p>
      <p class="small">Full text and Upwork client reviews at <a href="https://${esc(cv.site)}/#proof">${esc(cv.site)}/#proof</a>.</p>
    </section>
    <section>
      <h2>Languages and availability</h2>
      <ul class="plain">
        <li><span>${esc(cv.spokenLanguages)}</span></li>
        <li><span>${esc(cv.availability)}</span></li>
      </ul>
    </section>
  </div>
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

const work = join(tmpdir(), 'christiangastardo-cv')
mkdirSync(work, { recursive: true })
const htmlPath = join(work, 'cv.html')
writeFileSync(htmlPath, html)

execFileSync(
  chrome,
  [
    '--headless=new', '--disable-gpu', '--no-pdf-header-footer', '--allow-file-access-from-files',
    `--print-to-pdf=${OUT}`, pathToFileURL(htmlPath).href,
  ],
  { stdio: ['ignore', 'ignore', 'ignore'] },
)

const pdf = readFileSync(OUT)
const pages = (pdf.toString('latin1').match(/\/Type\s*\/Page[^s]/g) ?? []).length
console.log(`  wrote ${OUT} (${(pdf.length / 1024).toFixed(0)} KB, ${pages} page${pages === 1 ? '' : 's'})`)
if (pages > 2) {
  console.error('  ✗ CV runs past two pages; tighten the copy in src/data/ or the styles in scripts/build-cv.ts')
  process.exit(1)
}
