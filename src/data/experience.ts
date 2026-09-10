export interface Role {
  years: string
  title: string
  company: string
  location: string
  /** One line for the compact timeline. */
  summary: string
  /** Full detail, shown on expand. */
  bullets: readonly string[]
}

export const experience: readonly Role[] = [
  {
    years: '2026 — now',
    title: 'Software Developer, PowerApps to React Migration',
    company: 'Greene Information Systems',
    location: 'Remote (US)',
    summary: 'Legacy PowerApps rebuilt as production React with an AI-first workflow.',
    bullets: [
      'Migrating legacy PowerApps into production-grade React, Vite, and Tailwind apps using an AI-first workflow.',
      'Claude Code and Codex as primary tools for planning, code generation, and refactoring; features owned end to end.',
      'Deploys to Azure Static Web Apps via Azure DevOps Repos and Pipelines; Azure Automation runbooks maintained.',
      'Integrations across Microsoft Graph, SharePoint, and external platforms, with documented handovers.',
    ],
  },
  {
    years: '2025',
    title: 'Full-Stack Software Engineer',
    company: 'Indicia Worldwide',
    location: 'Remote (UK)',
    summary: 'Built a spreadsheet-grade Angular grid for a UK marketing SaaS.',
    bullets: [
      'Converted Figma designs into responsive Angular components for the In Touch marketing-optimisation SaaS.',
      'Shipped a dynamic grid layout system with merge and unmerge cells and nested accordion tables.',
      'Spreadsheet-format export and complex UI components, integrated with a Java backend.',
      'Recognised by the Global Head of Engineering for "speed, diligence, and technical expertise."',
    ],
  },
  {
    years: '2024 — 25',
    title: 'Packaged App Development Senior Analyst',
    company: 'Accenture',
    location: 'Cebu, PH',
    summary: "Income tax modules for Singapore's IRAS, on Angular micro-frontends.",
    bullets: [
      "Built income tax modules for IRAS, Singapore's tax authority, in Angular with a micro-frontend architecture.",
      'NgRx state management and reactive forms across high-traffic citizen-facing modules.',
      'Authored comprehensive Jasmine unit tests; raised coverage and reduced regression incidents.',
      'Onboarded onto a complex Angular, NgRx, and micro-frontend stack in weeks while keeping delivery velocity.',
    ],
  },
  {
    years: '2023 — 24',
    title: 'Senior Full-Stack Developer, Top Rated Plus',
    company: 'Upwork, long-term client engagements',
    location: 'Remote',
    summary: 'A 1,618-hour SaaS engagement with consistent five-star ratings.',
    bullets: [
      'Delivered a 1,618-hour enterprise SaaS engagement building Angular features end to end with consistent five-star ratings.',
      'Built Quipnex Laboratory Inventory: Ketcher chemical structures, drag and drop, Google Maps, undo and redo, rich text.',
      'Designed reusable component libraries and a complete design system that accelerated downstream feature delivery.',
      'Top Rated Plus badge (top 10%), 100% job success across 15 completed projects.',
    ],
  },
  {
    years: '2021 — 23',
    title: 'Application Systems Engineer',
    company: 'Fujitsu GDC Philippines (via WeServ)',
    location: 'Cebu, PH',
    summary: 'DPulse, Calendar Note, and a TensorFlow classifier; STARS award.',
    bullets: [
      'Built and supported moderate-to-complex integration processes for enterprise clients.',
      'Calendar Note (team collaboration with mentions and task assignment) and DPulse (desktop log analyser, 500k+ rows).',
      'Deep-learning image-classification system using TensorFlow and Keras.',
      'Awarded the STARS Big Thank You Award for outstanding client commitment.',
    ],
  },
  {
    years: '2019 — 20',
    title: 'Software Engineer, Android Developer',
    company: 'Koda Kollectiv',
    location: 'Mandaue City, PH',
    summary: 'Production Android apps in Kotlin and Firebase, including MailBug.',
    bullets: [
      'Shipped multiple production Android apps in Kotlin and Firebase.',
      'The MailBug Android email client for older adults, accessibility-first by design.',
      'GPS-based services and real-time database sync across consumer apps.',
    ],
  },
]
