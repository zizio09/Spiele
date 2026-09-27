import { describe, expect, it } from 'vitest'
import {
  createViererketteState,
  shuffleBoard,
  submitGroup,
  toggleSelect,
} from './viererketteLogic'

describe('Viererkette', () => {
  it('erkennt eine korrekte Gruppe', () => {
    let state = createViererketteState('2024-01-01')
    const firstCategory = Object.keys(state.solution)[0]
    const terms = state.solution[firstCategory]
    for (const term of terms) {
      state = toggleSelect(state, term)
    }
    state = submitGroup(state)
    expect(state.solved.some((g) => g.category === firstCategory)).toBe(true)
    expect(state.mistakes).toBe(0)
    expect(state.board).toHaveLength(12)
  })

  it('zählt Fehlversuche und endet nach vier Fehlern', () => {
    let state = createViererketteState('2024-01-01')
    const categories = Object.keys(state.solution)
    for (let i = 0; i < 4; i++) {
      // Je ein Begriff aus jeder Gruppe → keine gültige Gruppe
      const picks = categories.map((cat) => state.solution[cat][i % 4])
      state = { ...state, selected: picks }
      state = submitGroup(state)
    }
    expect(state.status).toBe('lost')
    expect(state.mistakes).toBe(4)
    expect(state.solved).toHaveLength(4)
  })

  it('vervollständigt die letzte Gruppe automatisch', () => {
    let state = createViererketteState('2024-01-01')
    const categories = Object.keys(state.solution)
    for (let i = 0; i < 3; i++) {
      const terms = state.solution[categories[i]]
      state = { ...state, selected: [...terms] }
      state = submitGroup(state)
    }
    expect(state.status).toBe('won')
    expect(state.solved).toHaveLength(4)
    expect(state.board).toHaveLength(0)
  })

  it('mischt ohne die Lösung zu ändern', () => {
    const state = createViererketteState('2024-01-01')
    const shuffled = shuffleBoard(state)
    expect([...shuffled.board].sort()).toEqual([...state.board].sort())
    expect(shuffled.solution).toEqual(state.solution)
  })
})
