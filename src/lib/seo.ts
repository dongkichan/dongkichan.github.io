import { profile } from '../data/profile'
import type { Route } from '../routes'
import { caseJsonLd, homeJsonLd, safeJsonLd, type JsonLd } from './jsonld'
import { OG_CARD, ogCardPath } from './og'
import { absolute } from './url'

export const escapeAttr = (s: string): string =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;')

export interface PageMeta {
  title: string
  ogTitle: string
  description: string
  keywords: string
  url: string
  index: boolean
  image: PageImage
  jsonLd: JsonLd[]
}

export interface PageImage {
  url: string
  width: number
  height: number
  alt: string
}

/** The portrait: the preview image for the home page and anything without artwork of its own. */
const portrait: PageImage = {
  url: absolute(profile.photo.jpg),
  width: profile.photo.width,
  height: profile.photo.height,
  alt: profile.photo.alt,
}

export function pageMeta(route: Route): PageMeta {
  switch (route.kind) {
    case 'home':
      return {
        title: profile.seo.title,
        ogTitle: profile.seo.shortTitle,
        description: profile.seo.description,
        keywords: profile.seo.keywords,
        url: absolute('/'),
        index: true,
        image: portrait,
        jsonLd: homeJsonLd(),
      }
    case 'case': {
      const p = route.project
      return {
        title: `${p.title} — Case Study | ${profile.name}`,
        ogTitle: `${p.title} — ${profile.name}`,
        description: p.seoDescription,
        keywords: [p.title, ...p.stack, 'Case Study', profile.name, profile.title].join(', '),
        url: absolute(route.path),
        index: true,
        image: { url: absolute(ogCardPath(p)), ...OG_CARD, alt: `${p.title} — case study by ${profile.name}` },
        jsonLd: caseJsonLd(p),
      }
    }
    case 'notFound':
      return {
        title: `Page not found | ${profile.name}`,
        ogTitle: `Page not found — ${profile.name}`,
        description: 'That page moved or never existed. The work, the CV, and a way to get in touch are all on the home page.',
        keywords: '',
        url: absolute('/404/'),
        index: false,
        image: portrait,
        jsonLd: [],
      }
  }
}

const meta = (attr: 'name' | 'property', key: string, content: string) =>
  `<meta ${attr}="${key}" content="${escapeAttr(content)}">`

/** Everything per-route that goes inside <head>. Static tags live in index.html. */
export function buildHead(route: Route): string {
  const m = pageMeta(route)
  const lines = [
    `<title>${escapeAttr(m.title)}</title>`,
    meta('name', 'title', m.title),
    meta('name', 'description', m.description),
    m.keywords ? meta('name', 'keywords', m.keywords) : '',
    meta('name', 'author', profile.name),
    m.index
      ? meta('name', 'robots', 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1')
      : meta('name', 'robots', 'noindex, follow'),
    m.index ? `<link rel="canonical" href="${escapeAttr(m.url)}">` : '',
    meta('property', 'og:type', 'website'),
    meta('property', 'og:url', m.url),
    meta('property', 'og:title', m.ogTitle),
    meta('property', 'og:description', m.description),
    meta('property', 'og:image', m.image.url),
    meta('property', 'og:image:width', String(m.image.width)),
    meta('property', 'og:image:height', String(m.image.height)),
    meta('property', 'og:image:alt', m.image.alt),
    meta('property', 'og:site_name', profile.seo.siteName),
    meta('property', 'og:locale', 'en_US'),
    meta('name', 'twitter:card', 'summary_large_image'),
    meta('name', 'twitter:url', m.url),
    meta('name', 'twitter:title', m.ogTitle),
    meta('name', 'twitter:description', m.description),
    meta('name', 'twitter:image', m.image.url),
    meta('name', 'twitter:image:alt', m.image.alt),
    ...m.jsonLd.map((block) => `<script type="application/ld+json">${safeJsonLd(block)}</script>`),
  ]
  return lines.filter(Boolean).join('\n    ')
}
