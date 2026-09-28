import { useEffect, useState } from 'react'

/** Optimierte WebP-Frames (~512px, ~40 KB). */
const FRAME_SRCS = [
  '/celebrations/wag-left.webp',
  '/celebrations/wag-middle.webp',
  '/celebrations/wag-right.webp',
] as const

/** Sequenz: links → mitte → rechts → mitte */
const SEQUENCE = [0, 1, 2, 1] as const
const FRAME_MS = 200

type Props = {
  outcome: 'won' | 'finished'
}

function preloadImages(srcs: readonly string[]): Promise<void> {
  return Promise.all(
    srcs.map(
      (src) =>
        new Promise<void>((resolve) => {
          const img = new Image()
          img.onload = () => resolve()
          img.onerror = () => resolve()
          img.src = src
        }),
    ),
  ).then(() => undefined)
}

/**
 * Ruhige Sieges-/Abschlussfeier mit wedelndem Hund.
 * Drei vorab geladene Frames; Sichtbarkeit per Opacity (kein src-Swap).
 * Bei prefers-reduced-motion: nur Mittelbild.
 */
export function WinCelebration({ outcome }: Props) {
  const [seqIndex, setSeqIndex] = useState(0)
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
    preloadImages(FRAME_SRCS).then(() => {
      if (!cancelled) setReady(true)
    })
    return () => {
      cancelled = true
    }
  }, [])

  useEffect(() => {
    if (!ready || reduceMotion) return
    const id = window.setInterval(() => {
      setSeqIndex((i) => (i + 1) % SEQUENCE.length)
    }, FRAME_MS)
    return () => window.clearInterval(id)
  }, [ready, reduceMotion])

  const activeFrame = reduceMotion || !ready ? 1 : SEQUENCE[seqIndex]
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
      <div className="win-celebration__dog-stage">
        {FRAME_SRCS.map((src, i) => (
          <img
            key={src}
            className={`win-celebration__dog ${i === activeFrame ? 'is-active' : ''}`}
            src={src}
            alt={i === activeFrame ? 'Hund wedelt mit dem Schwanz' : ''}
            width={512}
            height={512}
            decoding="sync"
            draggable={false}
          />
        ))}
      </div>
      <p className="win-celebration__title">{title}</p>
      <p className="win-celebration__subtitle">{subtitle}</p>
    </div>
  )
}
