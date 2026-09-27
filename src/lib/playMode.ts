/** Tagesrätsel vs. zusätzliche Runde am selben Tag. */
export type PlayMode = 'daily' | 'extra'

export function roundLabel(mode: PlayMode): string {
  return mode === 'daily' ? 'Tagesrätsel' : 'Zusatzrunde'
}
