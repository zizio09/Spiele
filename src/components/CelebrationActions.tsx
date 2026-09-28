import { Link } from 'react-router-dom'

type Props = {
  onPlayAgain: () => void
}

/**
 * Aktionen unter der Siegesfeier: nochmal spielen oder zur Spielauswahl.
 */
export function CelebrationActions({ onPlayAgain }: Props) {
  return (
    <div className="celebration-actions">
      <button type="button" className="btn btn--primary btn--xl" onClick={onPlayAgain}>
        Noch mal spielen
      </button>
      <Link to="/" className="btn btn--ghost btn--xl">
        Zurück zur Auswahl
      </Link>
    </div>
  )
}
