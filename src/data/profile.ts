export const profile = {
  name: 'Christian Paul Gastardo',
  alternateName: 'Christian Gastardo',
  title: 'Senior Full-Stack Software Engineer',
  focus: 'AI-augmented development',
  location: { city: 'Cebu City', region: 'Central Visayas', country: 'Philippines', timezone: 'GMT+8' },
  email: 'hi@christiangastardo.dev',
  cvPath: '/Christian_Paul_Gastardo_CV.pdf',
  availability: { open: true, label: 'Available for 30+ hrs a week' },
  currentRole: 'Leading PowerApps to React migrations at Greene Information Systems',
  socials: [
    { label: 'LinkedIn', handle: 'in/cgastardo', href: 'https://linkedin.com/in/cgastardo' },
    { label: 'GitHub', handle: 'dongkichan', href: 'https://github.com/dongkichan' },
    { label: 'Upwork', handle: 'Top Rated Plus', href: 'https://www.upwork.com/freelancers/cpgastardo' },
  ],
  recommendationsUrl: 'https://www.linkedin.com/in/cgastardo/details/recommendations/',
  upworkUrl: 'https://www.upwork.com/freelancers/cpgastardo',
  photo: {
    webp: '/assets/images/webp/christian-paul-gastardo-profile-photo.webp',
    jpg: '/assets/images/optimized/christian-paul-gastardo-profile-photo.jpg',
    width: 800,
    height: 800,
    alt: 'Portrait of Christian Paul Gastardo',
  },
  hero: {
    role: 'Senior full-stack software engineer, AI-augmented development.',
    subhead:
      'Seven years shipping React, Angular, Next.js, and Spring Boot for enterprise, government, and SaaS. I plan with AI, build with judgement, and finish what I start.',
    primaryCta: { label: 'Start a project', href: '#contact' },
    secondaryCta: { label: 'See the work', href: '#work' },
  },
  workedWith: ['Accenture', 'Fujitsu', 'Indicia Worldwide', 'Greene Information Systems', 'Koda Kollectiv'],
  bio: [
    'I am a senior full-stack engineer in Cebu. Most of my work is React, Angular, Next.js, and Spring Boot, but the through-line is reliability under complexity: enterprise platforms, government modules, lab tooling.',
    'Right now I lead PowerApps to React migrations with an AI-first workflow. The hard part is no longer typing code. It is deciding what to build and what to throw away.',
  ],
  contact: {
    heading: { lead: 'Got a problem?', tail: 'Send a note.' },
    // Set to a sentence such as 'I reply within one business day.' once confirmed. Empty string hides it.
    responseNote: '',
  },
  seo: {
    title:
      'Christian Paul Gastardo — Senior Full-Stack Software Engineer | AI-Augmented Development (React, Next.js, Spring Boot)',
    shortTitle: 'Christian Paul Gastardo — Senior Full-Stack Software Engineer',
    description:
      'Senior full-stack engineer with 7+ years shipping React, Angular, Next.js, and Spring Boot. AI-augmented development with Claude Code and Codex. Upwork Top Rated Plus, 100% job success across 15 projects.',
    keywords:
      'Senior Full-Stack Software Engineer, AI-Augmented Development, React Developer, Next.js Developer, Angular Developer, Spring Boot, TypeScript, Vite, Claude Code, Codex, PowerApps to React Migration, Top Rated Plus Upwork, Cebu Philippines Developer, Christian Paul Gastardo',
    siteName: 'Christian Paul Gastardo Portfolio',
  },
  copyrightYear: 2026,
} as const
