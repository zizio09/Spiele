import type { PlayMode } from '../lib/playMode'
import { roundLabel } from '../lib/playMode'

export function RoundBadge({ mode }: { mode: PlayMode }) {
  return (
    <p className={`round-badge round-badge--${mode}`} aria-live="polite">
      {roundLabel(mode)}
      {mode === 'extra' ? (
        <span className="round-badge__hint"> – zählt nicht als Tagesfortschritt</span>
      ) : null}
    </p>
  )
}
