import { useEffect, useState } from 'react'

/** Einzelbilder (Vorschau / reduced-motion). */
export const WAG_FRAMES = {
  left: '/celebrations/wag-left.webp',
  middle: '/celebrations/wag-middle.webp',
  right: '/celebrations/wag-right.webp',
} as const

/**
 * Animiertes GIF: links → mitte → rechts → mitte (5 fps).
 * Native Browser-Animation – kein CSS-Sprite, kein React-src-Swap.
 */
export const WAG_ANIMATED_SRC = '/celebrations/wag-animated.gif'

type Props = {
  outcome: 'won' | 'finished'
  /** Vorschau: prefers-reduced-motion ignorieren und trotzdem wedeln. */
  forceMotion?: boolean
}

/**
 * Ruhige Sieges-/Abschlussfeier mit wedelndem Hund.
 * Motion: animiertes GIF. Reduced-motion (außer forceMotion): statisches Mittelbild.
 */
export function WinCelebration({ outcome, forceMotion = false }: Props) {
  const [reduceMotion, setReduceMotion] = useState(false)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const apply = () => setReduceMotion(mq.matches)
    apply()
    mq.addEventListener('change', apply)
    return () => mq.removeEventListener('change', apply)
  }, [])

  useEffect(() => {
    let cancelled = false
    const imgs = [WAG_ANIMATED_SRC, WAG_FRAMES.middle, WAG_FRAMES.left, WAG_FRAMES.right]
    Promise.all(
      imgs.map(
        (src) =>
          new Promise<void>((resolve) => {
            const img = new Image()
            img.onload = () => resolve()
            img.onerror = () => resolve()
            img.src = src
          }),
      ),
    ).then(() => {
      if (!cancelled) setReady(true)
    })
    return () => {
      cancelled = true
    }
  }, [])

  const title = outcome === 'won' ? 'Geschafft!' : 'Runde beendet'
  const subtitle =
    outcome === 'won'
      ? 'Der Hund freut sich mit dir.'
      : 'Beim nächsten Mal klappt’s bestimmt.'

  const allowMotion = forceMotion || !reduceMotion
  const wagging = ready && allowMotion

  return (
    <div
      className={`win-celebration ${outcome === 'won' ? 'win-celebration--won' : 'win-celebration--finished'}`}
      role="status"
      aria-live="polite"
      data-wagging={wagging ? 'true' : 'false'}
      data-reduce-motion={!forceMotion && reduceMotion ? 'true' : 'false'}
      data-ready={ready ? 'true' : 'false'}
    >
      {outcome === 'won' && allowMotion && (
        <div className="win-celebration__sparkles" aria-hidden="true">
          <span />
          <span />
          <span />
          <span />
          <span />
          <span />
        </div>
      )}
      <div className="win-celebration__dog-stage">
        {wagging ? (
          <img
            className="win-celebration__dog-img is-active"
            src={WAG_ANIMATED_SRC}
            alt="Hund wedelt mit dem Schwanz"
            width={512}
            height={512}
            decoding="async"
            draggable={false}
            data-testid="dog-animated"
          />
        ) : (
          <img
            className="win-celebration__dog-img is-active"
            src={WAG_FRAMES.middle}
            alt="Hund"
            width={512}
            height={512}
            decoding="async"
            draggable={false}
            data-testid="dog-static"
          />
        )}
      </div>
      <p className="win-celebration__title">{title}</p>
      <p className="win-celebration__subtitle">{subtitle}</p>
    </div>
  )
}
