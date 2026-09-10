export type ArtVariant = 'migration' | 'grid' | 'microfrontend' | 'lab' | 'logs' | 'cnn' | 'mail'

export interface ProjectMedia {
  kind: 'screenshot' | 'logo'
  /** WebP for screenshots, SVG for logos. */
  src: string
  /** JPEG/PNG fallback for screenshots. */
  fallback?: string
  width: number
  height: number
  alt: string
  /** Short label under the image, usually the public domain. */
  caption: string
  href?: string
}

export interface Outcome {
  value: string
  label: string
}

export interface Project {
  slug: string
  title: string
  category: string
  year: string
  client: string
  clientNote?: string
  role: string
  /** One-line subhead on the case study. */
  tagline: string
  /** One-line outcome shown on the work list. Fourteen words or fewer. */
  outcomeLine: string
  problem: string
  built: readonly [string, string, string]
  stack: readonly string[]
  outcomes: readonly [Outcome, Outcome, Outcome]
  takeaway: string
  art: ArtVariant
  /** Real imagery when the product is public or the client has a logo we can show. Falls back to `art`. */
  media?: ProjectMedia
  /** Meta description for the case-study page. */
  seoDescription: string
  /** ISO date of the last content change, used for sitemap lastmod. */
  updated: string
}

export const projects: readonly Project[] = [
  {
    slug: 'powerapps-react-migration',
    title: 'PowerApps → React Migration',
    category: 'Enterprise, AI-augmented',
    year: '2026 — present',
    client: 'Greene Information Systems',
    clientNote: 'Remote, US',
    role: 'Software Developer, end-to-end ownership',
    tagline: 'Legacy PowerApps, rebuilt as production React with an AI-first workflow.',
    outcomeLine: 'Business-critical PowerApps rebuilt as production React, live on Azure.',
    problem:
      'A US client ran its business on a sprawl of PowerApps: fast to build, slow to scale, hard to integrate. Rewriting them by hand would take a year. Doing nothing meant debt growing as fast as features.',
    built: [
      'A React, Vite, and Tailwind foundation with Zustand and React Query, small enough for AI tools to reason about safely.',
      'Claude Code and Codex as the primary engineering surface for planning, scaffolding, refactoring, and review, with a human deciding what ships.',
      'Deploys to Azure Static Web Apps through Azure DevOps, Microsoft Graph and SharePoint integrations, and a runbook for every feature.',
    ],
    stack: ['React', 'Vite', 'TailwindCSS', 'Zustand', 'React Query', 'Azure SWA', 'Claude Code'],
    outcomes: [
      { value: 'End-to-end', label: 'Feature ownership' },
      { value: 'Azure SWA', label: 'Production deploys' },
      { value: 'Documented', label: 'Every handover' },
    ],
    takeaway:
      'AI changes what is hard. The bottleneck is no longer typing speed but specification, judgement, and knowing when to throw the output away.',
    art: 'migration',
    media: { kind: 'logo', src: '/assets/images/projects/greene-information-systems.svg', width: 89, height: 80, alt: 'Greene Information Systems logo', caption: 'greeneis.com', href: 'https://greeneis.com' },
    seoDescription:
      'Case study: migrating business-critical PowerApps to production React (Vite, Tailwind, Zustand, React Query) with an AI-first workflow using Claude Code and Codex, deployed to Azure Static Web Apps.',
    updated: '2026-09-09',
  },
  {
    slug: 'in-touch-marketing-saas',
    title: 'In Touch — Marketing Optimization SaaS',
    category: 'Enterprise SaaS, design to code',
    year: '2025',
    client: 'Indicia Worldwide',
    clientNote: 'Now adm Indicia. Remote, UK',
    role: 'Full-Stack Software Engineer',
    tagline: 'A spreadsheet-grade grid for marketing data, inside an Angular SPA.',
    outcomeLine: 'A spreadsheet-grade grid with merged cells, nested tables, and export.',
    problem:
      'The platform needed a grid that behaves like a spreadsheet: merge and unmerge cells, nest accordion tables inside cells, export to .xlsx. The underlying data was relational, not two-dimensional.',
    built: [
      'A custom grid engine that owns layout independently of data, so a merged region is a first-class concept rather than a CSS hack.',
      'Figma designs translated into responsive Angular components with strict TypeScript and documented, tested primitives.',
      'Spreadsheet export driven by logical state rather than display state, integrated with a Java backend for persistence and business rules.',
    ],
    stack: ['Angular', 'TypeScript', 'Java', 'Custom grid engine'],
    outcomes: [
      { value: 'Merge / unmerge', label: 'First-class cell operations' },
      { value: 'Nested tables', label: 'Accordion rows inside cells' },
      { value: '5 stars', label: 'From the Global Head of Engineering' },
    ],
    takeaway: 'When a UI fights its data model, the UI loses. Decoupling display from data made every later feature cheaper.',
    art: 'grid',
    media: { kind: 'logo', src: '/assets/images/projects/adm-indicia.svg', width: 192, height: 24, alt: 'adm Indicia logo', caption: 'adm-indicia.com', href: 'https://adm-indicia.com' },
    seoDescription:
      'Case study: a spreadsheet-grade Angular grid with merge/unmerge cells, nested accordion tables, and .xlsx export for an enterprise marketing-optimisation SaaS at Indicia Worldwide.',
    updated: '2026-09-09',
  },
  {
    slug: 'government-tax-platform',
    title: 'IRAS Income Tax System',
    category: 'Government, micro-frontends',
    year: '2024 — 2025',
    client: 'Inland Revenue Authority of Singapore',
    clientNote: 'Delivered through Accenture',
    role: 'Packaged App Development Senior Analyst',
    tagline: "Singapore's income tax filing, citizen-scale, on a micro-frontend shell.",
    outcomeLine: "Income tax modules for Singapore's IRAS on a micro-frontend shell, with fewer regressions.",
    problem:
      "IRAS runs Singapore's income tax for every resident and business: filing, payments, audit, registry, reports, support. Many teams, one shell. Coupling kills velocity here, and so does fragmentation.",
    built: [
      'Six independently deployable modules integrated through one shell with shared design tokens and authentication.',
      'NgRx state and strictly validated reactive forms across high-traffic flows, with server-driven schema where rules change quarterly.',
      'A comprehensive Jasmine unit-test suite that raised coverage and reduced regression incidents.',
    ],
    stack: ['Angular', 'Micro-frontends', 'NgRx', 'Jasmine'],
    outcomes: [
      { value: '6 modules', label: 'Independently deployable' },
      { value: 'Fewer regressions', label: 'Coverage raised across modules' },
      { value: 'Weeks', label: 'From onboarding to full velocity' },
    ],
    takeaway:
      'Micro-frontends are an organisational pattern in a technical disguise. Design for team boundaries and the architecture chooses itself.',
    art: 'microfrontend',
    media: { kind: 'screenshot', src: '/assets/images/projects/iras.webp', fallback: '/assets/images/projects/iras.jpg', width: 1200, height: 720, alt: 'IRAS, Inland Revenue Authority of Singapore website', caption: 'iras.gov.sg', href: 'https://www.iras.gov.sg' },
    seoDescription:
      "Case study: IRAS, Singapore's national income tax system, built in Angular with a micro-frontend architecture, NgRx state, reactive forms, and a Jasmine test suite that reduced regressions.",
    updated: '2026-09-09',
  },
  {
    slug: 'laboratory-inventory',
    title: 'Quipnex Laboratory Inventory',
    category: 'Research SaaS, long-term contract',
    year: '2023 — 2024',
    client: 'Quipnex',
    clientNote: 'Upwork, 1,618-hour engagement',
    role: 'Senior Full-Stack Developer',
    tagline: 'Quipnex, a digital assistant for chemists.',
    outcomeLine: 'Quipnex, a digital assistant for chemists: molecule drawing, inventory, maps. 1,618 hours.',
    problem:
      'Quipnex set out to replace the spreadsheet sprawl research labs use for specimens, structures, and locations: one place for inventory, molecule drawing, sample mapping, and notes, with nothing ever lost.',
    built: [
      'Ketcher integrated for in-browser structure drawing; chemists draw, the app stores canonical SMILES.',
      'Drag-and-drop inventory on NgRx with full undo and redo through action replay, so every change is reversible.',
      'Google Maps for sample provenance, plus a reusable component library and design system that made the second half of the engagement far faster than the first.',
    ],
    stack: ['Angular 15', 'NgRx', 'Ketcher', 'Google Maps', 'RxJS'],
    outcomes: [
      { value: '1,618 hrs', label: 'One engagement, five-star reviews' },
      { value: 'Undo / redo', label: 'On every action' },
      { value: 'Design system', label: 'Built from scratch' },
    ],
    takeaway:
      'The design system was not a deliverable. It was the most leveraged thing I shipped: every later feature was cheaper and harder to break.',
    art: 'lab',
    media: { kind: 'screenshot', src: '/assets/images/projects/quipnex.webp', fallback: '/assets/images/projects/quipnex.jpg', width: 1200, height: 720, alt: 'Quipnex website', caption: 'quipnex.com', href: 'https://quipnex.com' },
    seoDescription:
      'Case study: Quipnex, a laboratory inventory app for chemists with Ketcher structure drawing, drag-and-drop inventory, Google Maps, and undo/redo, delivered over a 1,618-hour Upwork engagement.',
    updated: '2026-09-09',
  },
  {
    slug: 'dpulse-log-analyzer',
    title: 'DPulse — Log Analyzer',
    category: 'Desktop, data tooling',
    year: '2021 — 2022',
    client: 'Fujitsu GDC Philippines',
    role: 'Application Systems Engineer',
    tagline: 'Half a million log rows, made readable.',
    outcomeLine: '500,000-row logs made readable for engineers who used to grep by hand.',
    problem:
      'Support engineers were grepping through 500,000-row log files to find patterns. Every investigation was slow, error-prone, and started from scratch.',
    built: [
      'An Electron and Angular desktop tool that runs where the logs live, with no upload step and no privacy concerns.',
      'A streaming parser so the UI stays responsive on the worst log dumps.',
      'Pattern detection over structured filters and saved investigations, so the next engineer does not start over.',
    ],
    stack: ['Electron', 'Angular', 'TensorFlow', 'Python'],
    outcomes: [
      { value: '500K+ rows', label: 'In a single file' },
      { value: 'Repeatable', label: 'Saved investigations' },
      { value: 'STARS award', label: 'Big Thank You, Fujitsu' },
    ],
    takeaway:
      'Tools built next to the people who use them are different from tools built for them. An hour with support engineers shaped this more than a month of specs.',
    art: 'logs',
    media: { kind: 'logo', src: '/assets/images/projects/fujitsu.svg', width: 200, height: 97, alt: 'Fujitsu logo', caption: 'fujitsu.com', href: 'https://www.fujitsu.com/global/' },
    seoDescription:
      'Case study: DPulse, an Electron and Angular desktop log analyser that makes 500,000+ row operational logs searchable and repeatable for support engineers at Fujitsu.',
    updated: '2026-09-09',
  },
  {
    slug: 'image-classification-deep-learning',
    title: 'Image Classification — Deep Learning',
    category: 'Machine learning',
    year: '2021 — 2022',
    client: 'Fujitsu GDC Philippines',
    role: 'Application Systems Engineer',
    tagline: 'Production CNNs, before the LLM era.',
    outcomeLine: 'A production image classifier behind a clean inference API, pre-LLM.',
    problem:
      'Operational images had to be sorted and routed automatically. Hand-labelling did not scale and rule-based heuristics kept missing edge cases. Other apps needed to call the model without caring about Python.',
    built: [
      'A CNN trained with transfer learning on a pretrained Keras backbone, tuned with augmentation, class weighting, and learning-rate schedules.',
      'An inference API that takes an image and returns a class and confidence, with no ML knowledge required on the caller side.',
      'A documented training pipeline so retraining is a script, not tribal knowledge.',
    ],
    stack: ['TensorFlow', 'Keras', 'Python', 'CNN', 'Transfer learning'],
    outcomes: [
      { value: 'Transfer learning', label: 'Pretrained backbone' },
      { value: 'Inference API', label: 'Stack-agnostic consumers' },
      { value: 'Reproducible', label: 'Scripted retraining' },
    ],
    takeaway:
      'AI is mostly data plumbing and evaluation discipline. Knowing what good looks like is still the hard part, and it is why LLM workflows work for me today.',
    art: 'cnn',
    media: { kind: 'logo', src: '/assets/images/projects/fujitsu.svg', width: 200, height: 97, alt: 'Fujitsu logo', caption: 'fujitsu.com', href: 'https://www.fujitsu.com/global/' },
    seoDescription:
      'Case study: a TensorFlow and Keras image-classification system using transfer learning, packaged behind an inference API with a reproducible training pipeline, at Fujitsu.',
    updated: '2026-09-09',
  },
  {
    slug: 'mailbug-email-for-seniors',
    title: 'MailBug — Email for Seniors',
    category: 'Mobile, accessibility',
    year: '2019 — 2020',
    client: 'MailBug',
    clientNote: 'Built at Koda Kollectiv',
    role: 'Software Engineer, Android',
    tagline: 'Email, redesigned for the people email forgot.',
    outcomeLine: "MailBug's Android email client for older adults: big targets, voice cues.",
    problem:
      'Mainstream email clients are built for power users. For older users with failing eyesight and unsteady hands they are a wall of friction. The brief: a client a 70-year-old can use confidently within a week.',
    built: [
      'An inbox rebuilt around 44px-plus hit targets, large type, and high contrast, accessibility first rather than retrofitted.',
      'The action surface cut to read, reply, photo, and call, with spoken confirmations such as "Email sent".',
      'Real-time sync over Firebase and a contact list that puts family first.',
    ],
    stack: ['Kotlin', 'Firebase', 'Android SDK'],
    outcomes: [
      { value: '44px+', label: 'Minimum hit target' },
      { value: 'Voice cues', label: 'Spoken confirmations' },
      { value: 'Family first', label: 'Contacts model' },
    ],
    takeaway:
      'Designing for someone unlike yourself is the fastest way to become a better engineer. I have not shipped UI the same way since.',
    art: 'mail',
    media: { kind: 'screenshot', src: '/assets/images/projects/mailbug.webp', fallback: '/assets/images/projects/mailbug.jpg', width: 1200, height: 720, alt: 'MailBug website', caption: 'mailbug.com', href: 'https://mailbug.com' },
    seoDescription:
      'Case study: the MailBug Android email client for older adults, accessibility-first with large hit targets, simplified flows, and voice confirmations, built in Kotlin and Firebase.',
    updated: '2026-09-09',
  },
]

export const projectBySlug = (slug: string): Project | undefined => projects.find((p) => p.slug === slug)
