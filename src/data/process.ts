export interface Step {
  name: string
  text: string
}

export const processSteps: readonly Step[] = [
  { name: 'Understand', text: 'I read everything you have and ask what nobody asked.' },
  { name: 'Plan', text: 'A written plan you can push back on before code exists.' },
  { name: 'Build', text: 'AI-augmented, human-reviewed, tested. Progress you can see.' },
  { name: 'Ship and hand over', text: 'Deployed, documented, and walked through with your team.' },
]

/**
 * Reliability commitments. Owner confirms each one is true before launch.
 * Remove any that do not hold; the section renders whatever is here.
 */
export const commitments: readonly { name: string; text: string }[] = [
  { name: 'Written updates', text: 'Progress notes in writing, on the cadence you choose.' },
  { name: 'No surprises', text: 'Scope and cost changes are agreed before they happen.' },
  { name: 'Handover included', text: 'Documentation and a walkthrough ship with the code.' },
]
