import type { SessionLine } from '../lib/session'

/**
 * The hero terminal script. Deliberately free of made-up metrics:
 * it shows the shape of the workflow, not fabricated numbers.
 */
export const buildSession: readonly SessionLine[] = [
  { kind: 'prompt', text: 'read spec.md', pauseAfter: 6 },
  { kind: 'ok', text: 'requirements understood, open questions listed', typed: false, pauseAfter: 8 },
  { kind: 'prompt', text: 'plan', pauseAfter: 4 },
  { kind: 'agent', text: 'components, integrations, migration path, test strategy', pauseAfter: 8 },
  { kind: 'note', text: 'plan reviewed with client', typed: false, pauseAfter: 10 },
  { kind: 'prompt', text: 'build', pauseAfter: 4 },
  { kind: 'agent', text: 'generate, then review every line', pauseAfter: 6 },
  { kind: 'test', text: 'tests passing', typed: false, pauseAfter: 8 },
  { kind: 'prompt', text: 'deploy', pauseAfter: 4 },
  { kind: 'deploy', text: 'live on Azure Static Web Apps', typed: false, pauseAfter: 8 },
  { kind: 'note', text: 'docs and walkthrough handed over', typed: false, pauseAfter: 10 },
  { kind: 'done', text: 'shipped', typed: false },
]

export const buildSessionSummary =
  'A terminal log of the workflow: read the spec, plan, build with AI and review every line, tests pass, deploy, hand over documentation, shipped.'
