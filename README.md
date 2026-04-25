# christiangastardo.dev

Portfolio site for Christian Paul Gastardo — Senior Full-Stack Software Engineer (AI-Augmented Development).

Live at **[christiangastardo.dev](https://christiangastardo.dev)**.

## Stack

- **Vite + React 18** with custom static-site generation (SSG) — every route is prerendered to plain HTML at build time.
- **8 prerendered routes**: home + 7 dedicated case-study pages under `/work/{slug}/`.
- **No client-side router**: deep links resolve to real HTML files; React hydrates on top for the interactive case-study modal.
- **GitHub Pages** hosting + Cloudflare-fronted custom domain.

## Source

This repo holds the **deployed build artifacts**. The source code lives separately and is built/copied here for deployment.

Source: refactored React components, the `data.js` content store, the `prerender.mjs` SSG script, and per-route SEO head builder. Run `npm run build` in the source repo and copy `dist/` over the contents here (preserving `CNAME`, `favicon.svg`, `assets/images/`, `googleeb31ef72d2c3af0e.html`).

## SEO

- Per-route `<title>`, meta description, canonical URL, Open Graph, Twitter Card.
- JSON-LD: `Person` + `ProfessionalService` + `WebSite` + `ItemList` on home; `CreativeWork` + `BreadcrumbList` on each case study.
- `sitemap.xml` lists all 8 real URLs.
- `robots.txt` allows all standard crawlers + `/assets/`; disallows AI training crawlers.

## Performance

- React production builds, code-split into a vendor chunk + app chunk.
- CSS minified by esbuild.
- Profile photo served via `<picture>` (WebP + JPG fallback) with explicit dimensions to eliminate CLS.
- Google Fonts loaded with `preconnect` + `display=swap`.

## License

All rights reserved. Code may be referenced for educational purposes; project content (writing, photography, case studies) is not licensed for reuse.
