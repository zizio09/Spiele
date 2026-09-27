import { useEffect, useState } from 'react'
import {
  MAX_MISTAKES,
  loadViererketteState,
  persistViererketteState,
  shuffleBoard,
  submitGroup,
  toggleSelect,
  type ViererketteState,
} from './viererketteLogic'

export function ViererkettePage() {
  const [state, setState] = useState<ViererketteState>(() => loadViererketteState())

  useEffect(() => {
    persistViererketteState(state)
  }, [state])

  return (
    <div className="game-page viererkette-page">
      <header className="game-header">
        <h1>Viererkette</h1>
        <p>
          Finde vier Gruppen zu je vier Begriffen. Vier Fehlversuche sind erlaubt. Mische die
          Felder, ohne die Lösung zu ändern.
        </p>
      </header>

      <div className="vk-toolbar">
        <p className="vk-mistakes" aria-live="polite">
          Fehlversuche: {state.mistakes} / {MAX_MISTAKES}
        </p>
        <button
          type="button"
          className="btn btn--ghost"
          onClick={() => setState((s) => shuffleBoard(s))}
          disabled={state.status !== 'playing'}
        >
          Mischen
        </button>
        <button
          type="button"
          className="btn btn--primary"
          onClick={() => setState((s) => submitGroup(s))}
          disabled={state.status !== 'playing' || state.selected.length !== 4}
        >
          Gruppe prüfen
        </button>
      </div>

      {state.message && (
        <p className="game-message" role="status">
          {state.message}
        </p>
      )}

      <div className="vk-solved" aria-live="polite">
        {state.solved.map((group) => (
          <div key={group.category} className="vk-solved__group">
            <h2>{group.category}</h2>
            <p>{group.terms.join(' · ')}</p>
          </div>
        ))}
      </div>

      {state.board.length > 0 && (
        <div className="vk-grid" role="list" aria-label="Begriffsfeld">
          {state.board.map((term) => {
            const selected = state.selected.includes(term)
            return (
              <button
                key={term}
                type="button"
                role="listitem"
                className={`vk-tile ${selected ? 'is-selected' : ''}`}
                aria-pressed={selected}
                disabled={state.status !== 'playing'}
                onClick={() => setState((s) => toggleSelect(s, term))}
              >
                {term}
              </button>
            )
          })}
        </div>
      )}
    </div>
  )
}
