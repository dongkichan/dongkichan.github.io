import type { JSX } from 'react'
import type { ArtVariant } from '../../data/projects'
import { Frame, type SceneProps } from './Frame'
import { Migration } from './scenes/Migration'
import { Sweep } from './scenes/Sweep'
import { Sync } from './scenes/Sync'
import { Grid } from './scenes/Grid'
import { MicroFrontend } from './scenes/MicroFrontend'
import { Lab } from './scenes/Lab'
import { Logs } from './scenes/Logs'
import { Cnn } from './scenes/Cnn'
import { Mail } from './scenes/Mail'

const SCENES: Record<ArtVariant, (p: SceneProps) => JSX.Element> = {
  migration: Migration, sweep: Sweep, sync: Sync, grid: Grid, microfrontend: MicroFrontend, lab: Lab, logs: Logs, cnn: Cnn, mail: Mail,
}

/**
 * NDA-safe concept illustration for a project. Pure SVG, 800x480, drawn from
 * what we know about the work. Key strokes carry `className="draw"` and
 * `pathLength={1}` so they draw themselves once the row is in view.
 */
export function ProjectArt({ variant, id, decorative = true }: { variant: ArtVariant; id: string; decorative?: boolean }) {
  const Scene = SCENES[variant]
  return (
    <Frame id={id} decorative={decorative} label={LABELS[variant]}>
      <Scene id={id} />
    </Frame>
  )
}

const LABELS: Record<ArtVariant, string> = {
  migration: 'Concept: legacy PowerApps forms rebuilt as a React component tree and deployed to Azure',
  sweep: 'Concept: a 24-hour dial with six maintenance sweeps and two force refreshes, reconciling ConnectWise against carrier tracking and raising a Teams card on a stalled parcel',
  sync: 'Concept: ConnectWise feeds and a field survey app flowing through Python runbooks into twelve SharePoint lists',
  grid: 'Concept: a spreadsheet grid with merged cells and a nested table inside a row',
  microfrontend: 'Concept: six independently deployable modules docked into one shell',
  lab: 'Concept: a benzene ring drawn in the app beside draggable inventory cards and a map pin',
  logs: 'Concept: half a million log rows with a repeated pattern highlighted and a histogram',
  cnn: 'Concept: an image passing through convolutional layers to a confident classification',
  mail: 'Concept: a phone with three oversized buttons and a spoken confirmation',
}
