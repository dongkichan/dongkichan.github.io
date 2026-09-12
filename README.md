# christiangastardo.dev

Portfolio and marketing site for Christian Paul Gastardo, Senior Full-Stack Software Engineer (AI-augmented development).

Live at **[christiangastardo.dev](https://christiangastardo.dev)**.

## How it works

- **Vite 8 + React 19 + TypeScript**, prerendered to static HTML at build time. No client-side router: every route is a real file, and React hydrates on top for the case-study modal and the animations.
- **8 routes**: home plus one case study per project under `/work/{slug}/`, plus a real `404.html`.
- **Content lives in `src/data/`.** Copy, projects, testimonials, credentials, the CV, and the hero terminal script are plain TypeScript objects. Components never contain copy.
- **Deploys from GitHub Actions** (`.github/workflows/deploy.yml`) on every push to `main`: typecheck, lint, tests, build, verify, then publish `dist/` to GitHub Pages. This repo is the source of truth; `dist/` is never committed.

## Commands

```bash
npm install
npm run dev        # Vite dev server (case-study routes work via SPA fallback)
npm run check      # typecheck + lint + tests + build + verify, what CI runs
npm run build      # client build → SSR build → prerender to dist/
npm run preview    # serve dist/ locally
npm run cv         # regenerate public/Christian_Paul_Gastardo_CV.pdf from src/data/ (needs Google Chrome)
npm run og         # regenerate the case-study share cards in public/assets/images/og/ (needs Google Chrome)
```

## Layout

```
index.html                 Vite template with <!--app-head--> / <!--app-html--> / __APP_ROUTE__ tokens
public/                    Copied verbatim: CNAME, robots.txt, favicon, CV PDF, Search Console file, images, share cards
scripts/prerender.ts       Renders every route, writes HTML, 404.html, sitemap.xml, .nojekyll
scripts/verify-build.mjs   CI gate: routes, canonicals, JSON-LD, share cards, analytics tag, JS weight, word budget
scripts/build-og.ts        Renders the 1200x630 share card for each case study with headless Chrome
src/data/                  All content
src/lib/                   Pure helpers: routes, SEO head, JSON-LD, template injection, terminal engine
src/hooks/                 useInView, useCountUp, useHydrated, useMediaQuery, focus trap, scroll lock
src/components/            Sections, case study, modal; art/ holds the seven SVG concept illustrations
src/styles/                Design tokens and base styles (CSS Modules per component)
tests/                     node:test suites for src/lib and routes
```

## Editing content

Change the words in `src/data/*.ts` and push. To swap the hero headline, edit `profile.hero.headline` (two alternatives are kept alongside it). To change availability, edit `profile.availability`. The CV PDF is rendered from the same data by `scripts/build-cv.ts` (CV-only facts such as phone and month-level dates live in `src/data/cv.ts` and `experience[].dates`); run `npm run cv` after a content change and commit the PDF. To add a project, add an entry to `projects` and a scene in `src/components/art/scenes/`; routes, sitemap, and JSON-LD follow automatically. Then run `npm run og` and commit the new share card, which the build verifier requires.

## SEO

Per-route title, description, canonical, Open Graph, and Twitter tags. The home page previews with the portrait; each case study previews with its own 1200x630 card in `public/assets/images/og/`, rendered by `npm run og` from the project's artwork and title. JSON-LD: Person + ProfessionalService, WebSite, and ItemList on the home page; CreativeWork + BreadcrumbList on each case study. `sitemap.xml` is generated at build time from the route list. `robots.txt` allows standard crawlers and blocks AI training crawlers.

## License

All rights reserved. Code may be referenced for educational purposes; content (writing, photography, case studies) is not licensed for reuse.
