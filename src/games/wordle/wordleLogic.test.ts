import { describe, expect, it } from 'vitest'
import {
  addLetter,
  createWordleState,
  isValidGuess,
  removeLetter,
  scoreGuess,
  setCursor,
  submitGuess,
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
    expect(scoreGuess('AABBB', 'ACDEF')).toEqual([
      'correct',
      'absent',
      'absent',
      'absent',
      'absent',
    ])
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
    state = { ...state, letters: ['X', 'X', 'X', 'X', 'X'] }
    const next = submitGuess(state)
    expect(next.guesses).toHaveLength(0)
    expect(next.status).toBe('playing')
    expect(next.message).toBeTruthy()
  })

  it('nimmt Buchstaben über die Tastatur entgegen', () => {
    let state = createWordleState('2024-01-01')
    state = addLetter(state, 't')
    state = addLetter(state, 'i')
    expect(state.letters.join('')).toBe('TI')
    expect(state.cursor).toBe(2)
  })

  it('erlaubt Mausauswahl einer horizontalen Position in der aktuellen Zeile', () => {
    let state = createWordleState('2024-01-01')
    state = addLetter(state, 'a')
    state = addLetter(state, 'b')
    state = addLetter(state, 'c')
    state = setCursor(state, 1)
    expect(state.cursor).toBe(1)
    state = addLetter(state, 'z')
    expect(state.letters).toEqual(['A', 'Z', 'C', '', ''])
    expect(state.cursor).toBe(2)
    state = setCursor(state, 1)
    state = removeLetter(state)
    expect(state.letters[1]).toBe('')
  })
})
