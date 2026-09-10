export const TOKENS = { head: '<!--app-head-->', html: '<!--app-html-->', route: '__APP_ROUTE__' } as const

export interface Injection {
  head: string
  html: string
  route: string
}

/**
 * Fill the three template tokens. Replacement callbacks are used on purpose:
 * `String.replace` with a string argument interprets `$&`, `$'` and `$1`.
 */
export function injectTemplate(template: string, { head, html, route }: Injection): string {
  const missing = Object.values(TOKENS).filter((token) => !template.includes(token))
  if (missing.length) throw new Error(`template is missing tokens: ${missing.join(', ')}`)
  return template
    .replace(TOKENS.head, () => head)
    .replace(TOKENS.html, () => html)
    .replace(TOKENS.route, () => route)
}

export interface SitemapEntry {
  loc: string
  lastmod: string
  changefreq: 'daily' | 'weekly' | 'monthly' | 'yearly'
  priority: string
}

export function renderSitemap(entries: readonly SitemapEntry[]): string {
  const urls = entries
    .map(
      (e) =>
        `  <url>\n    <loc>${e.loc}</loc>\n    <lastmod>${e.lastmod}</lastmod>\n    <changefreq>${e.changefreq}</changefreq>\n    <priority>${e.priority}</priority>\n  </url>`,
    )
    .join('\n')
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`
}
