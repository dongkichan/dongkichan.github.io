/**
 * Section headings and the one-line asides that sit beside them on the home
 * page. Edit copy here, not in the components. The Hero and Contact headings
 * live in profile.ts with the rest of the personal details.
 */
export const sections = {
  workedWith: { lead: 'Worked with teams at' },
  work: {
    title: 'Selected work',
    /* Nine case studies are shown; the full body of work is larger. Keep the count honest if projects are added or removed. */
    aside: 'Nine of many since 2019, for clients you can look up.',
  },
  process: {
    title: 'How the work gets done',
    aside: 'Four steps, every time.',
    commitmentsLead: 'What you can hold me to',
  },
  proof: {
    title: 'Kind words',
    aside: 'In their own words. Each one links to its source.',
  },
  about: { title: 'Some context' },
  cv: { title: 'The path, so far' },
} as const
