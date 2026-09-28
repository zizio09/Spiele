import { useEffect, useRef, useState } from 'react'
import { PlayAgainButton } from '../../components/PlayAgainButton'
import { RoundBadge } from '../../components/RoundBadge'
import { WinCelebration } from '../../components/WinCelebration'
import { getPairImage } from '../../data/paarsuche/images'
import {
  FLIP_DELAY_MS,
  createExtraPaarsucheState,
  flipCard,
  loadPaarsucheState,
  persistPaarsucheState,
  resolveMismatch,
  type PaarsucheState,
} from './paarsucheLogic'

export function PaarsuchePage() {
  const [state, setState] = useState<PaarsucheState>(() => loadPaarsucheState())
  const timerRef = useRef<number | null>(null)

  useEffect(() => {
    persistPaarsucheState(state)
  }, [state])

  useEffect(() => {
    return () => {
      if (timerRef.current != null) window.clearTimeout(timerRef.current)
    }
  }, [])

  const onFlip = (cardId: string) => {
    setState((prev) => {
      const result = flipCard(prev, cardId)
      if (result.pendingMismatch) {
        const [a, b] = result.pendingMismatch
        if (timerRef.current != null) window.clearTimeout(timerRef.current)
        timerRef.current = window.setTimeout(() => {
          setState((s) => resolveMismatch(s, a, b))
        }, FLIP_DELAY_MS)
      }
      return result.state
    })
  }

  return (
    <div className="game-page paarsuche-page">
      <header className="game-header">
        <h1>Paarsuche</h1>
        <p>
          Decke zwei Karten pro Zug auf. Gleiche Bilder bleiben sichtbar. Ungleiche Karten drehen
          sich nach einer Sekunde zurück.
        </p>
      </header>

      <RoundBadge mode={state.mode} />

      <p className="ps-moves" aria-live="polite">
        Züge: {state.moves}
      </p>

      {state.message && (
        <p className="game-message" role="status">
          {state.message}
        </p>
      )}

      {state.status === 'won' && (
        <>
          <WinCelebration outcome="won" />
          <PlayAgainButton onClick={() => setState((s) => createExtraPaarsucheState(s))} />
        </>
      )}

      <div className="ps-grid" role="list" aria-label="Kartenfeld">
        {state.cards.map((card) => {
          const image = getPairImage(card.imageId)
          const open = card.faceUp || card.matched
          return (
            <button
              key={card.id}
              type="button"
              role="listitem"
              className={`ps-card ${open ? 'is-open' : ''} ${card.matched ? 'is-matched' : ''}`}
              disabled={state.locked || card.faceUp || card.matched || state.status === 'won'}
              aria-label={open ? image.label : 'Verdeckte Karte'}
              onClick={() => onFlip(card.id)}
            >
              <span className="ps-card__inner">
                <span className="ps-card__back" aria-hidden="true">
                  ?
                </span>
                <span className="ps-card__front">{image.render(`ps-${card.id}`)}</span>
              </span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
