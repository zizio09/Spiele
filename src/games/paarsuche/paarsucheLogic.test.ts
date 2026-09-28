import { afterEach, describe, expect, it, vi } from 'vitest'
import {
  createPaarsucheState,
  flipCard,
  resolveMismatch,
} from './paarsucheLogic'

describe('Paarsuche', () => {
  afterEach(() => {
    vi.useRealTimers()
  })

  it('erzeugt 16 Karten mit acht Paaren', () => {
    const state = createPaarsucheState('2024-01-01')
    expect(state.cards).toHaveLength(16)
    const counts = new Map<string, number>()
    for (const c of state.cards) {
      counts.set(c.imageId, (counts.get(c.imageId) ?? 0) + 1)
    }
    expect(counts.size).toBe(8)
    for (const n of counts.values()) expect(n).toBe(2)
  })

  it('hält Treffer als gefunden und zählt Züge', () => {
    let state = createPaarsucheState('2024-01-01')
    const target = state.cards[0].imageId
    const pair = state.cards.filter((c) => c.imageId === target)
    let r = flipCard(state, pair[0].id)
    state = r.state
    r = flipCard(state, pair[1].id)
    state = r.state
    expect(state.moves).toBe(1)
    expect(state.cards.filter((c) => c.matched)).toHaveLength(2)
    expect(state.foundPairs).toEqual([target])
    expect(state.lastFoundId).toBe(target)
    expect(r.pendingMismatch).toBeNull()
  })

  it('sperrt die dritte Karte während der Fehlverzögerung', () => {
    let state = createPaarsucheState('2024-01-01')
    const a = state.cards[0]
    const b = state.cards.find((c) => c.imageId !== a.imageId)!
    let r = flipCard(state, a.id)
    state = r.state
    r = flipCard(state, b.id)
    state = r.state
    expect(state.locked).toBe(true)
    expect(r.pendingMismatch).toEqual([a.id, b.id])
    const third = state.cards.find((c) => c.id !== a.id && c.id !== b.id)!
    const blocked = flipCard(state, third.id)
    expect(blocked.state.openIds).toHaveLength(2)
    expect(blocked.state.cards.find((c) => c.id === third.id)?.faceUp).toBe(false)
    state = resolveMismatch(state, a.id, b.id)
    expect(state.locked).toBe(false)
    expect(state.cards.find((c) => c.id === a.id)?.faceUp).toBe(false)
  })

  it('endet, wenn alle Paare gefunden sind', () => {
    let state = createPaarsucheState('2024-01-01')
    const byImage = new Map<string, string[]>()
    for (const c of state.cards) {
      const list = byImage.get(c.imageId) ?? []
      list.push(c.id)
      byImage.set(c.imageId, list)
    }
    for (const ids of byImage.values()) {
      let r = flipCard(state, ids[0])
      state = r.state
      r = flipCard(state, ids[1])
      state = r.state
    }
    expect(state.status).toBe('won')
    expect(state.cards.every((c) => c.matched)).toBe(true)
    expect(state.foundPairs).toHaveLength(8)
    expect(state.moves).toBe(8)
  })
})
