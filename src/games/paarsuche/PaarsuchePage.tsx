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
          Decke zwei Karten pro Zug auf. Gleiche Bilder bleiben sichtbar – und wandern nach links zu
          den gefundenen Paaren. Ungleiche Karten drehen sich nach einer Sekunde zurück.
        </p>
      </header>

      <RoundBadge mode={state.mode} />

      <div className="ps-layout">
        <aside className="ps-found" aria-label="Gefundene Paare">
          <h2 className="ps-found__title">Gefundene Paare</h2>
          {state.foundPairs.length === 0 ? (
            <p className="ps-found__empty">Noch keine. Finde das erste Paar!</p>
          ) : (
            <ul className="ps-found__list">
              {state.foundPairs.map((imageId, index) => {
                const image = getPairImage(imageId)
                const isNewest = imageId === state.lastFoundId && index === state.foundPairs.length - 1
                return (
                  <li
                    key={`${imageId}-${index}`}
                    className={`ps-found__item ${isNewest ? 'is-new' : ''}`}
                  >
                    <span className="ps-found__thumb" style={{ background: image.tile }} aria-hidden="true">
                      {image.render(`found-${imageId}-${index}`)}
                    </span>
                    <span className="ps-found__label">{image.label}</span>
                  </li>
                )
              })}
            </ul>
          )}
        </aside>

        <div className="ps-main">
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
              if (card.matched) {
                return (
                  <div
                    key={card.id}
                    className="ps-slot ps-slot--empty"
                    role="listitem"
                    aria-label="Leeres Feld – Paar gefunden"
                  />
                )
              }

              const image = getPairImage(card.imageId)
              const open = card.faceUp
              return (
                <button
                  key={card.id}
                  type="button"
                  role="listitem"
                  className={`ps-card ${open ? 'is-open' : ''}`}
                  disabled={state.locked || card.faceUp || state.status === 'won'}
                  aria-label={open ? image.label : 'Verdeckte Karte'}
                  onClick={() => onFlip(card.id)}
                >
                  <span className="ps-card__inner">
                    <span className="ps-card__back" aria-hidden="true">
                      ?
                    </span>
                    <span
                      className="ps-card__front"
                      style={{ background: image.tile }}
                      aria-hidden={!open}
                    >
                      {image.render(`ps-${card.id}`)}
                    </span>
                  </span>
                </button>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
