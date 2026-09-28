import { useEffect, useState } from 'react'
import { WinCelebration } from './WinCelebration'

/**
 * Dev-only preview: open /dev/celebration to inspect the dog wag
 * without finishing a game.
 */
export function CelebrationPreviewPage() {
  const [outcome, setOutcome] = useState<'won' | 'finished'>('won')
  const [reduceMotion, setReduceMotion] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const apply = () => setReduceMotion(mq.matches)
    apply()
    mq.addEventListener('change', apply)
    return () => mq.removeEventListener('change', apply)
  }, [])

  return (
    <div className="game-page celebration-preview">
      <header className="game-header">
        <h1>Feier-Vorschau</h1>
        <p>
          Testseite für den wedelnden Hund – kein Spiel nötig. Adresse:{' '}
          <code>/dev/celebration</code>
        </p>
      </header>

      <div className="celebration-preview__controls">
        <label>
          Ergebnis{' '}
          <select
            value={outcome}
            onChange={(e) => setOutcome(e.target.value as 'won' | 'finished')}
          >
            <option value="won">Geschafft</option>
            <option value="finished">Runde beendet</option>
          </select>
        </label>
        <p className="celebration-preview__status" data-testid="motion-status">
          System: prefers-reduced-motion = <strong>{reduceMotion ? 'reduce' : 'no-preference'}</strong>
          {reduceMotion
            ? ' → Hund bleibt in der Mitte (statisch).'
            : ' → Hund muss sichtbar wedeln.'}
        </p>
      </div>

      <WinCelebration outcome={outcome} />

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
