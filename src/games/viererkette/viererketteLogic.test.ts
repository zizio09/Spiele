import { describe, expect, it } from 'vitest'
import {
  MAX_MISTAKES,
  POINTS_PER_MISTAKE,
  START_POINTS,
  VIERERKETTE_SESSION_KEY,
  VIERERKETTE_STORAGE_KEY,
  bestOverlap,
  clearSelection,
  createExtraViererketteState,
  createViererketteState,
  loadViererketteState,
  persistViererketteState,
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

  it('meldet Einen daneben bei drei richtigen Begriffen', () => {
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
    expect(state.message).toMatch(/Einen daneben/)
  })

  it('meldet Kein Match bei weniger Überlappung', () => {
    let state = createViererketteState('2024-01-01')
    const cats = Object.keys(state.groups)
    const picks = cats.map((cat) => state.groups[cat].terms[0])
    state = { ...state, selected: picks }
    state = submitGroup(state)
    expect(state.feedback).toBe('no-match')
    expect(state.message).toMatch(/Kein Match/)
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

  it('vervollständigt die letzte Gruppe nicht automatisch', () => {
    let state = createViererketteState('2024-01-01')
    const categories = Object.keys(state.groups)
    for (let i = 0; i < 3; i++) {
      const terms = state.groups[categories[i]].terms
      state = { ...state, selected: [...terms] }
      state = submitGroup(state)
    }
    expect(state.status).toBe('playing')
    expect(state.solved).toHaveLength(3)
    expect(state.board).toHaveLength(4)
    state = { ...state, selected: [...state.board] }
    state = submitGroup(state)
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

  it('startet Zusatzrunden ohne den Tagesfortschritt zu überschreiben', () => {
    localStorage.clear()
    let daily = createViererketteState('2024-01-01')
    daily = { ...daily, status: 'won', points: 90, statsRecorded: true }
    persistViererketteState(daily)

    const extra = createExtraViererketteState(daily)
    expect(extra.mode).toBe('extra')
    expect(extra.status).toBe('playing')
    expect(extra.puzzleId).not.toBe(daily.puzzleId)
    persistViererketteState(extra)

    const raw = localStorage.getItem(VIERERKETTE_STORAGE_KEY)
    expect(raw).toBeTruthy()
    const saved = JSON.parse(raw!)
    expect(saved.mode).toBe('daily')
    expect(saved.status).toBe('won')
    expect(saved.puzzleId).toBe(daily.puzzleId)

    const sessionRaw = localStorage.getItem(VIERERKETTE_SESSION_KEY)
    expect(sessionRaw).toBeTruthy()
    const session = JSON.parse(sessionRaw!)
    expect(session.mode).toBe('extra')
    expect(session.status).toBe('playing')
  })

  it('stellt die aktive Zusatzrunde nach Remount wieder her statt der Tagesfeier', () => {
    localStorage.clear()
    let daily = createViererketteState('2024-01-01')
    daily = { ...daily, status: 'won', points: 90, statsRecorded: true }
    persistViererketteState(daily)
    const extra = createExtraViererketteState(daily)
    persistViererketteState(extra)

    const restored = loadViererketteState('2024-01-01')
    expect(restored.mode).toBe('extra')
    expect(restored.status).toBe('playing')
    expect(restored.puzzleId).toBe(extra.puzzleId)
  })
})
