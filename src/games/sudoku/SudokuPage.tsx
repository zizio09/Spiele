import { useEffect, useState } from 'react'
import { CelebrationActions } from '../../components/CelebrationActions'
import { RoundBadge } from '../../components/RoundBadge'
import { WinCelebration } from '../../components/WinCelebration'
import {
  DIFFICULTIES,
  checkEntries,
  createExtraSudokuState,
  enterDigit,
  eraseCell,
  loadSudokuState,
  persistSudokuState,
  selectCell,
  toggleNotesMode,
  undo,
} from './sudokuLogic'
import type { SudokuDigit, SudokuDifficulty, SudokuState } from './sudokuTypes'

const DIGITS = [1, 2, 3, 4, 5, 6, 7, 8, 9] as SudokuDigit[]

const DIFF_LABEL: Record<SudokuDifficulty, string> = {
  leicht: 'Leicht',
  mittel: 'Mittel',
  schwer: 'Schwer',
  'sehr-schwer': 'Sehr schwer',
}

export function SudokuPage() {
  const [difficulty, setDifficulty] = useState<SudokuDifficulty>('leicht')
  const [state, setState] = useState<SudokuState>(() => loadSudokuState('leicht'))

  useEffect(() => {
    setState(loadSudokuState(difficulty))
  }, [difficulty])

  useEffect(() => {
    persistSudokuState(state)
  }, [state])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'z') {
        e.preventDefault()
        setState((s) => undo(s))
        return
      }
      if (e.ctrlKey || e.metaKey || e.altKey) return
      if (e.key >= '1' && e.key <= '9') {
        e.preventDefault()
        setState((s) => enterDigit(s, Number(e.key) as SudokuDigit))
        return
      }
      if (e.key === 'Backspace' || e.key === 'Delete' || e.key === '0') {
        e.preventDefault()
        setState((s) => eraseCell(s))
        return
      }
      if (e.key === 'n' || e.key === 'N') {
        e.preventDefault()
        setState((s) => toggleNotesMode(s))
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  return (
    <div className="game-page sudoku-page">
      <header className="game-header">
        <h1>Sudoku</h1>
        <p>
          Fülle das Gitter so, dass jede Zeile, Spalte und jeder 3×3-Block die Ziffern 1 bis 9
          genau einmal enthält. Hilfszahlen helfen beim Notieren. Kein Zeit- oder Fehlerlimit.
        </p>
      </header>

      <RoundBadge mode={state.mode} />

      <div className="sudoku-toolbar" role="group" aria-label="Schwierigkeit">
        {DIFFICULTIES.map((d) => (
          <button
            key={d}
            type="button"
            className={`btn ${difficulty === d ? 'btn--primary' : 'btn--ghost'}`}
            aria-pressed={difficulty === d}
            onClick={() => setDifficulty(d)}
          >
            {DIFF_LABEL[d]}
          </button>
        ))}
      </div>

      {state.message && (
        <p className="game-message" role="status">
          {state.message}
        </p>
      )}

      {state.status === 'won' && (
        <>
          <WinCelebration outcome="won" />
          <p className="game-result" role="status">
            Gelöst!
          </p>
          <CelebrationActions onPlayAgain={() => setState((s) => createExtraSudokuState(s))} />
        </>
      )}

      <div
        className="sudoku-grid"
        role="grid"
        aria-label={`Sudoku ${DIFF_LABEL[difficulty]}`}
      >
        {state.grid.map((row, r) => (
          <div className="sudoku-row" role="row" key={r}>
            {row.map((cell, c) => {
              const selected =
                state.selected?.row === r && state.selected?.col === c
              return (
                <button
                  key={c}
                  type="button"
                  role="gridcell"
                  className={[
                    'sudoku-cell',
                    cell.given ? 'is-given' : '',
                    selected ? 'is-selected' : '',
                    cell.conflict ? 'is-conflict' : '',
                    r % 3 === 0 ? 'edge-top' : '',
                    c % 3 === 0 ? 'edge-left' : '',
                  ]
                    .filter(Boolean)
                    .join(' ')}
                  aria-label={`Zeile ${r + 1}, Spalte ${c + 1}${
                    cell.value ? `, Wert ${cell.value}` : ', leer'
                  }${cell.given ? ', vorgegeben' : ''}`}
                  onClick={() => setState((s) => selectCell(s, r, c))}
                >
                  {cell.value != null ? (
                    <span className="sudoku-value">{cell.value}</span>
                  ) : cell.notes.size > 0 ? (
                    <span className="sudoku-notes" aria-hidden="true">
                      {DIGITS.map((d) => (
                        <span key={d} className={cell.notes.has(d) ? 'on' : ''}>
                          {cell.notes.has(d) ? d : ''}
                        </span>
                      ))}
                    </span>
                  ) : null}
                </button>
              )
            })}
          </div>
        ))}
      </div>

      <div className="sudoku-controls">
        <div className="digit-pad" aria-label="Zifferneingabe">
          {DIGITS.map((d) => (
            <button
              key={d}
              type="button"
              className="btn btn--ghost digit"
              onClick={() => setState((s) => enterDigit(s, d))}
            >
              {d}
            </button>
          ))}
        </div>
        <div className="sudoku-actions">
          <button
            type="button"
            className={`btn ${state.notesMode ? 'btn--primary' : 'btn--ghost'}`}
            aria-pressed={state.notesMode}
            onClick={() => setState((s) => toggleNotesMode(s))}
          >
            Hilfszahlen
          </button>
          <button type="button" className="btn btn--ghost" onClick={() => setState((s) => eraseCell(s))}>
            Löschen
          </button>
          <button type="button" className="btn btn--ghost" onClick={() => setState((s) => undo(s))}>
            Rückgängig
          </button>
          <button
            type="button"
            className="btn btn--primary"
            onClick={() => setState((s) => checkEntries(s))}
          >
            Fehler anzeigen
          </button>
        </div>
      </div>
    </div>
  )
}
