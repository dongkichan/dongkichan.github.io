/**
 * Runs after `vite build` (client) and `vite build --ssr` (server).
 * Reads the client template, renders every route, writes static HTML,
 * plus 404.html, sitemap.xml and .nojekyll.
 */
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { pathToFileURL } from 'node:url'
import { injectTemplate, renderSitemap, type SitemapEntry } from '../src/lib/template'
import { absolute } from '../src/lib/url'
import type { Route } from '../src/routes'

const root = process.cwd()
const dist = resolve(root, 'dist')
const rawTemplate = readFileSync(resolve(dist, 'index.html'), 'utf8')

/**
 * Inline the built stylesheet (about 6 KB gzipped) into every page. It removes a
 * render-blocking request from the critical path; the file stays on disk unchanged.
 */
function inlineStylesheet(html: string): string {
  return html.replace(/<link rel="stylesheet"[^>]*href="(\/assets\/[^"]+\.css)"[^>]*>/g, (_tag, href: string) => {
    const css = readFileSync(resolve(dist, href.replace(/^\//, '')), 'utf8').trim()
    return `<style>${css}</style>`
  })
}

/** Fonts the first screen needs: preloaded so they start with the HTML, not after layout. */
const PRELOAD_FONTS = [
  { family: 'Fraunces', weight: '300', style: 'normal' },
  { family: 'Fraunces', weight: '300', style: 'italic' },
  { family: 'Inter', weight: '400', style: 'normal' },
  { family: 'JetBrains Mono', weight: '400', style: 'normal' },
]

function fontPreloads(css: string): string {
  const links: string[] = []
  for (const block of css.match(/@font-face\{[^}]*\}/g) ?? []) {
    const family = /font-family:\s*["']?([^;"']+)/.exec(block)?.[1]?.trim()
    const style = /font-style:\s*(\w+)/.exec(block)?.[1] ?? 'normal'
    const weight = /font-weight:\s*(\d+)/.exec(block)?.[1]
    const url = /url\((\/assets\/[^)]+\.woff2)\)/.exec(block)?.[1]
    if (!family || !weight || !url) continue
    if (PRELOAD_FONTS.some((f) => f.family === family && f.weight === weight && f.style === style)) {
      links.push(`<link rel="preload" as="font" type="font/woff2" crossorigin href="${url}">`)
    }
  }
  return links.join('\n    ')
}

const inlined = inlineStylesheet(rawTemplate)
const template = inlined.replace('<!--app-head-->', () => `${fontPreloads(inlined)}\n    <!--app-head-->`)

type ServerEntry = { routes: readonly Route[]; render: (route: Route) => { html: string; head: string } }
const server = (await import(pathToFileURL(resolve(root, '.ssr-dist/entry-server.js')).href)) as ServerEntry

const outputFile = (route: Route): string => {
  if (route.kind === 'notFound') return resolve(dist, '404.html')
  return resolve(dist, route.path.replace(/^\//, ''), 'index.html')
}

const write = (file: string, content: string) => {
  mkdirSync(dirname(file), { recursive: true })
  writeFileSync(file, content)
  console.log('  wrote', file.replace(`${root}/`, ''))
}

for (const route of server.routes) {
  const { html, head } = server.render(route)
  write(outputFile(route), injectTemplate(template, { head, html, route: route.path }))
}

const today = new Date().toISOString().slice(0, 10)
const entries: SitemapEntry[] = server.routes
  .filter((r) => r.kind !== 'notFound')
  .map((r) => ({
    loc: absolute(r.path),
    lastmod: r.kind === 'case' ? r.project.updated : today,
    changefreq: r.kind === 'home' ? 'monthly' : 'yearly',
    priority: r.kind === 'home' ? '1.0' : '0.8',
  }))
write(resolve(dist, 'sitemap.xml'), renderSitemap(entries))
write(resolve(dist, '.nojekyll'), '')
