import { describe, expect, it } from 'vitest'
import {
  addLetter,
  isValidGuess,
  scoreGuess,
  submitGuess,
  createWordleState,
} from './wordleLogic'

describe('Wordle scoreGuess', () => {
  it('markiert korrekte Positionen grün', () => {
    expect(scoreGuess('TISCH', 'TISCH')).toEqual([
      'correct',
      'correct',
      'correct',
      'correct',
      'correct',
    ])
  })

  it('behandelt doppelte Buchstaben korrekt (Grün vor Gelb)', () => {
    // Antwort hat ein A: erster Treffer grün, zweites A grau
    expect(scoreGuess('AABBB', 'ACDEF')).toEqual([
      'correct',
      'absent',
      'absent',
      'absent',
      'absent',
    ])
    // Antwort STARS, Tipp SASSY: S grün, A gelb, S gelb, rest grau
    expect(scoreGuess('SASSY', 'STARS')).toEqual([
      'correct',
      'present',
      'present',
      'absent',
      'absent',
    ])
  })

  it('lehnt ungültige Wörter ab ohne Versuch', () => {
    expect(isValidGuess('XXXXX').ok).toBe(false)
    expect(isValidGuess('ÄÄÄÄÄ').ok).toBe(false)
  })

  it('verbraucht keinen Versuch bei ungültiger Eingabe', () => {
    let state = createWordleState('2024-01-01')
    state = { ...state, current: 'XXXXX' }
    const next = submitGuess(state)
    expect(next.guesses).toHaveLength(0)
    expect(next.status).toBe('playing')
    expect(next.message).toBeTruthy()
  })

  it('nimmt Buchstaben über die Tastatur entgegen', () => {
    let state = createWordleState('2024-01-01')
    state = addLetter(state, 't')
    state = addLetter(state, 'i')
    expect(state.current).toBe('TI')
  })
})
