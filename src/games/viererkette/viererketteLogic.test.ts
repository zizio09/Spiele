import { describe, expect, it } from 'vitest'
import {
  MAX_MISTAKES,
  POINTS_PER_MISTAKE,
  START_POINTS,
  bestOverlap,
  clearSelection,
  createViererketteState,
  shuffleBoard,
  submitGroup,
  toggleSelect,
} from './viererketteLogic'

describe('Viererkette', () => {
  it('erkennt eine korrekte Gruppe mit Erklärung und Farbe', () => {
    let state = createViererketteState('2024-01-01')
    const firstCategory = Object.keys(state.groups)[0]
    const meta = state.groups[firstCategory]
    for (const term of meta.terms) {
      state = toggleSelect(state, term)
    }
    state = submitGroup(state)
    expect(state.solved.some((g) => g.category === firstCategory)).toBe(true)
    expect(state.solved[0].explanation).toBe(meta.explanation)
    expect(state.solved[0].difficulty).toBe(meta.difficulty)
    expect(state.mistakes).toBe(0)
    expect(state.points).toBe(START_POINTS)
    expect(state.board).toHaveLength(12)
    expect(state.feedback).toBe('correct')
  })

  it('meldet Knapp daneben bei drei richtigen Begriffen', () => {
    let state = createViererketteState('2024-01-01')
    const cats = Object.keys(state.groups)
    const three = state.groups[cats[0]].terms.slice(0, 3)
    const other = state.groups[cats[1]].terms[0]
    state = { ...state, selected: [...three, other] }
    expect(bestOverlap(state.selected, state)).toBe(3)
    state = submitGroup(state)
    expect(state.feedback).toBe('one-off')
    expect(state.mistakes).toBe(1)
    expect(state.points).toBe(START_POINTS - POINTS_PER_MISTAKE)
    expect(state.message).toMatch(/Knapp daneben/)
  })

  it('meldet Kein Treffer bei weniger Überlappung', () => {
    let state = createViererketteState('2024-01-01')
    const cats = Object.keys(state.groups)
    const picks = cats.map((cat) => state.groups[cat].terms[0])
    state = { ...state, selected: picks }
    state = submitGroup(state)
    expect(state.feedback).toBe('no-match')
    expect(state.message).toMatch(/Kein Treffer/)
  })

  it('endet nach 20 Fehlversuchen', () => {
    let state = createViererketteState('2024-01-01')
    const cats = Object.keys(state.groups)
    for (let i = 0; i < MAX_MISTAKES; i++) {
      const picks = cats.map((cat) => state.groups[cat].terms[i % 4])
      state = { ...state, selected: picks }
      state = submitGroup(state)
    }
    expect(state.status).toBe('lost')
    expect(state.mistakes).toBe(MAX_MISTAKES)
    expect(state.points).toBe(0)
    expect(state.solved).toHaveLength(4)
  })

  it('vervollständigt die letzte Gruppe automatisch', () => {
    let state = createViererketteState('2024-01-01')
    const categories = Object.keys(state.groups)
    for (let i = 0; i < 3; i++) {
      const terms = state.groups[categories[i]].terms
      state = { ...state, selected: [...terms] }
      state = submitGroup(state)
    }
    expect(state.status).toBe('won')
    expect(state.solved).toHaveLength(4)
    expect(state.board).toHaveLength(0)
  })

  it('löscht die Auswahl und mischt ohne die Lösung zu ändern', () => {
    let state = createViererketteState('2024-01-01')
    state = toggleSelect(state, state.board[0])
    state = clearSelection(state)
    expect(state.selected).toHaveLength(0)
    const shuffled = shuffleBoard(state)
    expect([...shuffled.board].sort()).toEqual([...state.board].sort())
  })
})
