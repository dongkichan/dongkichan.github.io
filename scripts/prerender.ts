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
const template = readFileSync(resolve(dist, 'index.html'), 'utf8')

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
