import { Link, useSearchParams } from 'react-router-dom'
import { WinCelebration } from './WinCelebration'

/**
 * Vorschau der Siegesfeier ohne Spiel.
 * /preview/celebration — Gewinn
 * /preview/celebration?loss=1 — Runde beendet
 */
export function CelebrationPreviewPage() {
  const [params] = useSearchParams()
  const loss = params.get('loss') === '1' || params.get('loss') === 'true'
  const forceMotion = params.get('force') !== '0'
  const outcome: 'won' | 'finished' = loss ? 'finished' : 'won'

  return (
    <div className="game-page celebration-preview">
      <header className="game-header">
        <h1>Feier-Vorschau</h1>
        <p>
          Testseite für den wedelnden Hund – kein Spiel nötig.{' '}
          <Link to="/preview/celebration">Gewinn</Link>
          {' · '}
          <Link to="/preview/celebration?loss=1">Runde beendet</Link>
        </p>
      </header>

      <p className="celebration-preview__status" data-testid="motion-status">
        {forceMotion
          ? 'Vorschau erzwingt Wedeln (auch bei reduced-motion).'
          : 'System-Einstellung für Bewegung wird respektiert.'}{' '}
        Adresse: <code>/preview/celebration{loss ? '?loss=1' : ''}</code>
      </p>

      <WinCelebration outcome={outcome} forceMotion={forceMotion} />

      <section className="celebration-preview__frames" aria-label="Einzelbilder">
        <h2>Einzelbilder (links · mitte · rechts)</h2>
        <div className="celebration-preview__strip">
          <figure>
            <img src="/celebrations/wag-left.webp" alt="Schwanz links" width={160} height={160} />
            <figcaption>links</figcaption>
          </figure>
          <figure>
            <img src="/celebrations/wag-middle.webp" alt="Schwanz mitte" width={160} height={160} />
            <figcaption>mitte</figcaption>
          </figure>
          <figure>
            <img src="/celebrations/wag-right.webp" alt="Schwanz rechts" width={160} height={160} />
            <figcaption>rechts</figcaption>
          </figure>
        </div>
      </section>
    </div>
  )
}
