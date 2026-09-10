export const SITE_ORIGIN = 'https://christiangastardo.dev'

export const absolute = (path: string): string => `${SITE_ORIGIN}${path}`

/**
 * Canonical form for a route path: leading slash, trailing slash, lowercase,
 * no `index.html`, no duplicate slashes. `''` and `'/index.html'` become `'/'`.
 */
export function normalizeRoutePath(pathname: string): string {
  let p = pathname.toLowerCase().replace(/\/{2,}/g, '/')
  if (!p.startsWith('/')) p = `/${p}`
  p = p.replace(/index\.html$/, '')
  if (!p.endsWith('/')) p = `${p}/`
  return p
}
