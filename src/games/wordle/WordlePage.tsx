import { useEffect, useState } from 'react'
import { CelebrationActions } from '../../components/CelebrationActions'
import { RoundBadge } from '../../components/RoundBadge'
import { WinCelebration } from '../../components/WinCelebration'
import {
  MAX_GUESSES,
  WORD_LENGTH,
  addLetter,
  createExtraWordleState,
  loadWordleState,
  persistWordleState,
  removeLetter,
  scoreGuess,
  setCursor,
  submitGuess,
  type LetterMark,
  type WordleState,
} from './wordleLogic'

function markClass(mark: LetterMark): string {
  switch (mark) {
    case 'correct':
      return 'tile--correct'
    case 'present':
      return 'tile--present'
    case 'absent':
      return 'tile--absent'
    default:
      return ''
  }
}

export function WordlePage() {
  const [state, setState] = useState<WordleState>(() => loadWordleState())

  useEffect(() => {
    persistWordleState(state)
  }, [state])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.ctrlKey || e.metaKey || e.altKey) return
      if (e.key === 'Enter') {
        e.preventDefault()
        setState((s) => submitGuess(s))
        return
      }
      if (e.key === 'Backspace') {
        e.preventDefault()
        setState((s) => removeLetter(s))
        return
      }
      if (e.key === 'ArrowLeft') {
        e.preventDefault()
        setState((s) => setCursor(s, Math.max(0, s.cursor - 1)))
        return
      }
      if (e.key === 'ArrowRight') {
        e.preventDefault()
        setState((s) => setCursor(s, Math.min(WORD_LENGTH - 1, s.cursor + 1)))
        return
      }
      if (/^[a-zA-ZäöüÄÖÜß]$/.test(e.key)) {
        e.preventDefault()
        setState((s) => addLetter(s, e.key))
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  const activeRow = state.status === 'playing' ? state.guesses.length : -1
  const playing = state.status === 'playing'

  const rows: Array<Array<{ letter: string; mark: LetterMark }>> = []
  for (let i = 0; i < MAX_GUESSES; i++) {
    if (i < state.guesses.length) {
      const guess = state.guesses[i]
      const marks = scoreGuess(guess, state.answer)
      rows.push(guess.split('').map((letter, j) => ({ letter, mark: marks[j] })))
    } else if (i === state.guesses.length && state.status === 'playing') {
      rows.push(
        state.letters.map((letter) => ({
          letter,
          mark: letter ? ('tbd' as const) : ('empty' as const),
        })),
      )
    } else {
      rows.push(Array.from({ length: WORD_LENGTH }, () => ({ letter: '', mark: 'empty' as const })))
    }
  }

  return (
    <div className="game-page wordle-page">
      <header className="game-header game-header--compact">
        <h1>Wordle</h1>
        <p>
          Errate das deutsche Wort mit fünf Buchstaben – sechs Versuche. Tippe auf der physischen
          Tastatur. Klicke in der Zeile auf eine Position, um dort zu schreiben.
        </p>
      </header>

      <RoundBadge mode={state.mode} />

      {state.message && (
        <p className="game-message" role="status">
          {state.message}
        </p>
      )}

      {(state.status === 'won' || state.status === 'lost') && (
        <>
          <WinCelebration outcome={state.status === 'won' ? 'won' : 'finished'} />
          <p className="game-result" role="status">
            {state.status === 'won'
              ? 'Du hast gewonnen!'
              : 'Leider verloren.'}{' '}
            Lösung: <strong>{state.answer}</strong>
          </p>
          <CelebrationActions onPlayAgain={() => setState((s) => createExtraWordleState(s))} />
        </>
      )}

      <div className="wordle-board" role="grid" aria-label="Wordle-Spielfeld">
        {rows.map((row, ri) => (
          <div className="wordle-row" role="row" key={ri}>
            {row.map((cell, ci) => {
              const isActiveRow = ri === activeRow
              const isCursor = isActiveRow && state.cursor === ci
              return (
                <button
                  key={ci}
                  type="button"
                  role="gridcell"
                  className={`tile ${markClass(cell.mark)} ${cell.letter ? 'tile--filled' : ''} ${
                    isCursor ? 'tile--cursor' : ''
                  }`}
                  disabled={!isActiveRow}
                  aria-label={
                    isActiveRow
                      ? `Position ${ci + 1}${cell.letter ? `, ${cell.letter}` : ', leer'}${
                          isCursor ? ', ausgewählt' : ''
                        }`
                      : cell.letter
                        ? `${cell.letter}, ${
                            cell.mark === 'correct'
                              ? 'richtig'
                              : cell.mark === 'present'
                                ? 'an anderer Stelle'
                                : cell.mark === 'absent'
                                  ? 'nicht enthalten'
                                  : 'eingegeben'
                          }`
                        : 'leer'
                  }
                  onClick={() => {
                    if (isActiveRow) setState((s) => setCursor(s, ci))
                  }}
                >
                  {cell.letter}
                </button>
              )
            })}
          </div>
        ))}
      </div>

      {playing && (
        <div className="wordle-actions" aria-label="Worteingabe">
          <button
            type="button"
            className="btn btn--primary btn--xl wordle-actions__btn"
            onClick={() => setState((s) => submitGuess(s))}
          >
            Eingabe
          </button>
          <button
            type="button"
            className="btn btn--ghost btn--xl wordle-actions__btn"
            onClick={() => setState((s) => removeLetter(s))}
          >
            Löschen
          </button>
        </div>
      )}
    </div>
  )
}
