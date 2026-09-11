# christiangastardo.dev

Personal portfolio and marketing site. Vite 8 + React 19 + TypeScript, prerendered to static HTML, deployed to GitHub Pages by `.github/workflows/deploy.yml`. See README.md for the layout.

## Rules of the road

- All copy lives in `src/data/`. Do not hardcode words in components.
- `npm run check` must pass before pushing. It runs typecheck, lint, tests, build, and `scripts/verify-build.mjs`.
- Budgets enforced by verify: total JS under 100 KB gzip; home page under 1,050 default-visible words; case studies under 260.
- Animated components render their settled state on the server and on the first client render (see `useHydrated`, `useMediaQuery`). Never introduce a hydration mismatch to start an animation earlier.
- Illustrations are NDA-safe SVG concepts in `src/components/art/scenes/`. No client screenshots.
- Keep `public/CNAME`, `public/googleeb31ef72d2c3af0e.html`, and the asset paths under `/assets/images/` stable; they are indexed and referenced externally.
- Client-facing copy changes get a human review before merge to `main`.
