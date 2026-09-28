import { useEffect, useRef, useState } from 'react'
import { CelebrationActions } from '../../components/CelebrationActions'
import { RoundBadge } from '../../components/RoundBadge'
import { WinCelebration } from '../../components/WinCelebration'
import { getPairImage } from '../../data/paarsuche/images'
import {
  formatAverageScore,
  loadPaarsucheLifetimeStats,
  recordPaarsucheWin,
  scoreFromMoves,
  winRecordKey,
  type PaarsucheLifetimeStats,
} from './lifetimeStats'
import {
  FLIP_DELAY_MS,
  createExtraPaarsucheState,
  flipCard,
  loadPaarsucheState,
  markStatsRecorded,
  persistPaarsucheState,
  resolveMismatch,
  type PaarsucheState,
} from './paarsucheLogic'

/** Kurz sichtbar lassen, bevor gefundene Karten vom Feld verschwinden. */
const MATCH_LEAVE_MS = 550

export function PaarsuchePage() {
  const [state, setState] = useState<PaarsucheState>(() => loadPaarsucheState())
  const [lifetime, setLifetime] = useState<PaarsucheLifetimeStats>(() =>
    loadPaarsucheLifetimeStats(),
  )
  const [clearedIds, setClearedIds] = useState<string[]>(() =>
    loadPaarsucheState()
      .cards.filter((c) => c.matched)
      .map((c) => c.id),
  )
  const timerRef = useRef<number | null>(null)
  const leaveTimerRef = useRef<number | null>(null)

  useEffect(() => {
    persistPaarsucheState(state)
  }, [state])

  useEffect(() => {
    if (state.status === 'won' && !state.statsRecorded) {
      const key = winRecordKey({
        date: state.date,
        puzzleId: state.puzzleId,
        mode: state.mode,
        extraRound: state.extraRound,
      })
      setLifetime(recordPaarsucheWin(scoreFromMoves(state.moves), key))
      setState((s) => markStatsRecorded(s))
    }
  }, [
    state.status,
    state.statsRecorded,
    state.moves,
    state.date,
    state.puzzleId,
    state.mode,
    state.extraRound,
  ])

  useEffect(() => {
    const pending = state.cards
      .filter((c) => c.matched && !clearedIds.includes(c.id))
      .map((c) => c.id)
    if (pending.length === 0) return

    if (leaveTimerRef.current != null) window.clearTimeout(leaveTimerRef.current)
    leaveTimerRef.current = window.setTimeout(() => {
      setClearedIds((prev) => [...prev, ...pending])
    }, MATCH_LEAVE_MS)

    return () => {
      if (leaveTimerRef.current != null) window.clearTimeout(leaveTimerRef.current)
    }
  }, [state.cards, clearedIds])

  useEffect(() => {
    return () => {
      if (timerRef.current != null) window.clearTimeout(timerRef.current)
      if (leaveTimerRef.current != null) window.clearTimeout(leaveTimerRef.current)
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

  const startExtra = () => {
    setState((s) => createExtraPaarsucheState(s))
    setClearedIds([])
  }

  return (
    <div className="game-page paarsuche-page">
      <header className="game-header">
        <h1>Paarsuche</h1>
        <p>
          Decke zwei Karten pro Zug auf. Gleiche Bilder wandern nach links zu den gefundenen Paaren.
          Ungleiche Karten drehen sich nach einer Sekunde zurück.
        </p>
      </header>

      <RoundBadge mode={state.mode} />

      <div className="vk-lifetime" aria-label="Lebensstatistik Paarsuche">
        <div>
          <span className="vk-lifetime__label">Spiele</span>
          <strong>{lifetime.gamesWon}</strong>
        </div>
        <div>
          <span className="vk-lifetime__label">Punkteschnitt</span>
          <strong>{formatAverageScore(lifetime)}</strong>
        </div>
        <div>
          <span className="vk-lifetime__label">Höchste Punktzahl</span>
          <strong>{lifetime.gamesWon > 0 ? lifetime.highestScore : '–'}</strong>
        </div>
      </div>

      <div className="ps-layout">
        <aside className="ps-found" aria-label="Gefundene Paare">
          <h2 className="ps-found__title">Gefundene Paare</h2>
          {state.foundPairs.length === 0 ? (
            <p className="ps-found__empty">Noch keine. Finde das erste Paar!</p>
          ) : (
            <ul className="ps-found__list">
              {state.foundPairs.map((imageId, index) => {
                const image = getPairImage(imageId)
                const isNewest =
                  imageId === state.lastFoundId && index === state.foundPairs.length - 1
                return (
                  <li
                    key={`${imageId}-${index}`}
                    className={`ps-found__item ${isNewest ? 'is-new' : ''}`}
                  >
                    <span
                      className="ps-found__thumb"
                      style={{ background: image.tile }}
                      aria-hidden="true"
                    >
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
            {state.status === 'won' ? ` · ${scoreFromMoves(state.moves)} Punkte` : ''}
          </p>

          {state.message && (
            <p className="game-message" role="status">
              {state.message}
            </p>
          )}

          {state.status === 'won' && (
            <>
              <WinCelebration outcome="won" />
              <CelebrationActions onPlayAgain={startExtra} />
            </>
          )}

          <div className="ps-grid" role="list" aria-label="Kartenfeld">
            {state.cards.map((card) => {
              if (card.matched && clearedIds.includes(card.id)) {
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
              const open = card.faceUp || card.matched
              return (
                <button
                  key={card.id}
                  type="button"
                  role="listitem"
                  className={`ps-card ${open ? 'is-open' : ''} ${card.matched ? 'is-matched' : ''}`}
                  disabled={
                    state.locked || card.faceUp || card.matched || state.status === 'won'
                  }
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
