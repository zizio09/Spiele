import { useEffect, useState } from 'react'

const FRAMES = [
  '/celebrations/wag-left.png',
  '/celebrations/wag-middle.png',
  '/celebrations/wag-right.png',
  '/celebrations/wag-middle.png',
] as const

const FRAME_MS = 200

type Props = {
  /** Gewinn vs. beendete Runde (Verlust). */
  outcome: 'won' | 'finished'
}

/**
 * Ruhige Sieges-/Abschlussfeier mit wedelndem Hund.
 * Bei prefers-reduced-motion: statisches Mittelbild.
 */
export function WinCelebration({ outcome }: Props) {
  const [frame, setFrame] = useState(1)
  const [reduceMotion, setReduceMotion] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const apply = () => setReduceMotion(mq.matches)
    apply()
    mq.addEventListener('change', apply)
    return () => mq.removeEventListener('change', apply)
  }, [])

  useEffect(() => {
    if (reduceMotion) {
      setFrame(1)
      return
    }
    const id = window.setInterval(() => {
      setFrame((f) => (f + 1) % FRAMES.length)
    }, FRAME_MS)
    return () => window.clearInterval(id)
  }, [reduceMotion])

  const title = outcome === 'won' ? 'Geschafft!' : 'Runde beendet'
  const subtitle =
    outcome === 'won'
      ? 'Der Hund freut sich mit dir.'
      : 'Beim nächsten Mal klappt’s bestimmt.'

  return (
    <div
      className={`win-celebration ${outcome === 'won' ? 'win-celebration--won' : 'win-celebration--finished'}`}
      role="status"
      aria-live="polite"
    >
      {outcome === 'won' && !reduceMotion && (
        <div className="win-celebration__sparkles" aria-hidden="true">
          <span />
          <span />
          <span />
          <span />
          <span />
          <span />
        </div>
      )}
      <img
        className="win-celebration__dog"
        src={FRAMES[reduceMotion ? 1 : frame]}
        alt="Hund wedelt mit dem Schwanz"
        width={640}
        height={360}
        decoding="async"
      />
      <p className="win-celebration__title">{title}</p>
      <p className="win-celebration__subtitle">{subtitle}</p>
    </div>
  )
}
