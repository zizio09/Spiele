import { useEffect, useState } from 'react'

/** Vier-Frame-Sprite: links → mitte → rechts → mitte (CSS steps-Animation). */
export const WAG_SPRITE_SRC = '/celebrations/wag-sprite.webp'
export const WAG_FRAME_MS = 200
export const WAG_FRAME_COUNT = 4

type Props = {
  outcome: 'won' | 'finished'
}

/**
 * Ruhige Sieges-/Abschlussfeier mit wedelndem Hund.
 * Wedeln per CSS-Sprite (kein React-src-Swap) – zuverlässig und leicht.
 * Bei prefers-reduced-motion: statisches Mittelbild.
 */
export function WinCelebration({ outcome }: Props) {
  const [reduceMotion, setReduceMotion] = useState(false)
  const [spriteReady, setSpriteReady] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const apply = () => setReduceMotion(mq.matches)
    apply()
    mq.addEventListener('change', apply)
    return () => mq.removeEventListener('change', apply)
  }, [])

  useEffect(() => {
    let cancelled = false
    const img = new Image()
    img.onload = () => {
      if (!cancelled) setSpriteReady(true)
    }
    img.onerror = () => {
      if (!cancelled) setSpriteReady(true)
    }
    img.src = WAG_SPRITE_SRC
    return () => {
      cancelled = true
    }
  }, [])

  const title = outcome === 'won' ? 'Geschafft!' : 'Runde beendet'
  const subtitle =
    outcome === 'won'
      ? 'Der Hund freut sich mit dir.'
      : 'Beim nächsten Mal klappt’s bestimmt.'

  const wagging = spriteReady && !reduceMotion

  return (
    <div
      className={`win-celebration ${outcome === 'won' ? 'win-celebration--won' : 'win-celebration--finished'}`}
      role="status"
      aria-live="polite"
      data-wagging={wagging ? 'true' : 'false'}
      data-reduce-motion={reduceMotion ? 'true' : 'false'}
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
      <div className="win-celebration__dog-stage">
        <div
          className={`win-celebration__dog-sprite ${wagging ? 'is-wagging' : 'is-static'}`}
          role="img"
          aria-label="Hund wedelt mit dem Schwanz"
          data-testid="dog-sprite"
        />
      </div>
      <p className="win-celebration__title">{title}</p>
      <p className="win-celebration__subtitle">{subtitle}</p>
    </div>
  )
}
