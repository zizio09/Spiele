import { useEffect, useState } from 'react'
import {
  MAX_GUESSES,
  WORD_LENGTH,
  addLetter,
  keyStatuses,
  loadWordleState,
  persistWordleState,
  removeLetter,
  scoreGuess,
  submitGuess,
  type LetterMark,
  type WordleState,
} from './wordleLogic'

const ROWS = ['QWERTZUIOP', 'ASDFGHJKL', 'ENTERZXCVBNM⌫']

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
      if (/^[a-zA-ZäöüÄÖÜß]$/.test(e.key)) {
        e.preventDefault()
        setState((s) => addLetter(s, e.key))
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  const keys = keyStatuses(state.guesses, state.answer)

  const onVirtual = (key: string) => {
    if (key === 'ENTER') setState((s) => submitGuess(s))
    else if (key === '⌫') setState((s) => removeLetter(s))
    else setState((s) => addLetter(s, key))
  }

  const rows: Array<Array<{ letter: string; mark: LetterMark }>> = []
  for (let i = 0; i < MAX_GUESSES; i++) {
    if (i < state.guesses.length) {
      const guess = state.guesses[i]
      const marks = scoreGuess(guess, state.answer)
      rows.push(guess.split('').map((letter, j) => ({ letter, mark: marks[j] })))
    } else if (i === state.guesses.length && state.status === 'playing') {
      const letters = state.current.padEnd(WORD_LENGTH).split('')
      rows.push(
        letters.map((letter) => ({
          letter: letter.trim(),
          mark: letter.trim() ? 'tbd' : 'empty',
        })),
      )
    } else {
      rows.push(Array.from({ length: WORD_LENGTH }, () => ({ letter: '', mark: 'empty' as const })))
    }
  }

  return (
    <div className="game-page wordle-page">
      <header className="game-header">
        <h1>Wordle</h1>
        <p>
          Errate das deutsche Wort mit fünf Buchstaben. Du hast sechs Versuche. Ungültige Wörter
          zählen nicht.
        </p>
      </header>

      {state.message && (
        <p className="game-message" role="status">
          {state.message}
        </p>
      )}

      {(state.status === 'won' || state.status === 'lost') && (
        <p className="game-result" role="status">
          Lösung: <strong>{state.answer}</strong>
        </p>
      )}

      <div className="wordle-board" role="grid" aria-label="Wordle-Spielfeld">
        {rows.map((row, ri) => (
          <div className="wordle-row" role="row" key={ri}>
            {row.map((cell, ci) => (
              <div
                key={ci}
                role="gridcell"
                className={`tile ${markClass(cell.mark)} ${cell.letter ? 'tile--filled' : ''}`}
                aria-label={
                  cell.letter
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
              >
                {cell.letter}
              </div>
            ))}
          </div>
        ))}
      </div>

      <div className="keyboard" aria-label="Bildschirmtastatur">
        {ROWS.map((row, ri) => (
          <div className="keyboard__row" key={ri}>
            {ri === 2 ? (
              <>
                <button type="button" className="key key--wide" onClick={() => onVirtual('ENTER')}>
                  Eingabe
                </button>
                {'ZXCVBNM'.split('').map((k) => (
                  <button
                    key={k}
                    type="button"
                    className={`key key--${keys[k] ?? 'idle'}`}
                    onClick={() => onVirtual(k)}
                  >
                    {k}
                  </button>
                ))}
                <button type="button" className="key key--wide" onClick={() => onVirtual('⌫')}>
                  Löschen
                </button>
              </>
            ) : (
              row.split('').map((k) => (
                <button
                  key={k}
                  type="button"
                  className={`key key--${keys[k] ?? 'idle'}`}
                  onClick={() => onVirtual(k)}
                >
                  {k}
                </button>
              ))
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
