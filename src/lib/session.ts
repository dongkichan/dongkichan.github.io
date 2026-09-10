export type SessionLineKind = 'prompt' | 'agent' | 'ok' | 'test' | 'deploy' | 'note' | 'done'

export interface SessionLine {
  kind: SessionLineKind
  text: string
  /** Typed character by character (default) or shown at once, like tool output. */
  typed?: boolean
  /** Extra ticks to hold on this line after it completes. */
  pauseAfter?: number
}

export interface FrameLine {
  kind: SessionLineKind
  text: string
  visible: boolean
  /** The line the cursor sits on right now. */
  active: boolean
}

const cost = (line: SessionLine): number => (line.typed === false ? 1 : line.text.length)

/** Total ticks needed to play the whole script, pauses included. */
export function totalChars(lines: readonly SessionLine[]): number {
  return lines.reduce((sum, l) => sum + cost(l) + (l.pauseAfter ?? 0), 0)
}

/** Pure function: what the panel shows after `ticks` ticks. Deterministic, frame-rate independent. */
export function sessionFrame(lines: readonly SessionLine[], ticks: number): FrameLine[] {
  let remaining = Math.max(0, Math.floor(ticks))
  return lines.map((line) => {
    if (remaining <= 0) return { kind: line.kind, text: '', visible: false, active: false }
    const lineCost = cost(line)
    const consumed = Math.min(lineCost, remaining)
    remaining -= consumed
    const complete = consumed >= lineCost
    const text = line.typed === false ? line.text : line.text.slice(0, consumed)
    const pause = line.pauseAfter ?? 0
    let pauseConsumed = 0
    if (complete && pause > 0) {
      pauseConsumed = Math.min(pause, remaining)
      remaining -= pauseConsumed
    }
    const active = !complete || pauseConsumed < pause
    return { kind: line.kind, text, visible: true, active }
  })
}

export const isSettled = (lines: readonly SessionLine[], ticks: number): boolean => ticks >= totalChars(lines)
