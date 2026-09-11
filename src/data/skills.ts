/** The short row shown on the page: the stack that sells. */
export const headlineSkills: readonly string[] = [
  'React', 'Angular', 'Next.js', 'TypeScript', 'Spring Boot', 'Node.js', '.NET', 'Python',
  'Azure', 'AWS', 'PostgreSQL', 'Claude Code', 'Codex',
]

/** Full taxonomy, kept for structured data and the CV. */
export const skillGroups: readonly { name: string; items: readonly string[] }[] = [
  { name: 'Frontend', items: ['React', 'Angular', 'Next.js', 'TypeScript', 'TailwindCSS', 'Vite', 'Zustand', 'React Query', 'NgRx', 'RxJS'] },
  { name: 'Backend', items: ['Spring Boot', 'Node.js', 'Express', '.NET', 'Python (Flask, Django)', 'REST APIs', 'Microservices'] },
  { name: 'Cloud and DevOps', items: ['Azure (SWA, DevOps, Automation)', 'AWS', 'GCP', 'Docker', 'Kubernetes', 'CI/CD'] },
  { name: 'AI-augmented', items: ['Claude Code', 'Codex', 'GitHub Copilot', 'LLM workflow design', 'Prompt engineering'] },
  { name: 'Databases', items: ['PostgreSQL', 'MySQL', 'MSSQL', 'MongoDB', 'Firebase', 'Dataverse'] },
  { name: 'Integrations', items: ['Microsoft Graph', 'SharePoint', 'PowerApps', 'Power Automate'] },
]

/** `knowsAbout` for the Person JSON-LD. */
export const knowsAbout: readonly string[] = [
  'React', 'Next.js', 'Vite', 'TypeScript', 'TailwindCSS', 'Angular', 'NgRx', 'RxJS', 'Spring Boot', 'Java',
  'Node.js', 'Microservices', 'REST APIs', 'AI-Augmented Development', 'Claude Code', 'Codex',
  'LLM Workflow Design', 'Prompt Engineering', 'PowerApps', 'Power Automate', 'Microsoft Graph', 'SharePoint',
  'Azure Automation', 'Workflow Automation', 'Process Automation', 'Systems Integration', 'ConnectWise PSA Integration',
  'Python Runbooks', 'Microsoft Teams Integration', 'Azure Static Web Apps', 'Azure DevOps', 'AWS', 'GCP',
  'Full-Stack Development', 'Frontend Engineering', 'Software Architecture',
]
