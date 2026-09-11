/**
 * Facts that appear only on the CV PDF. Everything else on the PDF (roles, skills,
 * credentials, numbers, recommendations) is read from the other data files, so the
 * CV and the site cannot drift. Regenerate with `npm run cv`.
 */
export const cv = {
  phone: '+63 956 890 7242',
  site: 'christiangastardo.dev',
  summary:
    'Senior full-stack software engineer with seven years shipping React, Angular, Next.js, and Spring Boot for enterprise, government, and SaaS. Currently leading PowerApps to React migrations and the automation around them at Greene Information Systems, with an AI-first workflow built on Claude Code and Codex. Upwork Top Rated Plus with every contract delivered. Based in Cebu, Philippines, time-zone aligned with Singapore (GMT+8).',
  /** Skill groups the site does not show but a CV should. */
  extraSkillGroups: [
    { name: 'Languages', items: ['TypeScript', 'JavaScript', 'Java', 'Python', 'C#', 'Kotlin', 'PowerShell'] },
    { name: 'Practices', items: ['Agile / Scrum', 'TDD (JUnit, Jasmine)', 'Code review', 'Lean Six Sigma (Yellow Belt)'] },
  ],
  educationDates: 'Jun 2014 – Mar 2019',
  educationLocation: 'Cebu City, Philippines',
  spokenLanguages: 'English (fluent), Filipino (native)',
  availability: '30+ hours a week, full-time or contract-to-hire. Open to relocation to Singapore with EP sponsorship.',
} as const
