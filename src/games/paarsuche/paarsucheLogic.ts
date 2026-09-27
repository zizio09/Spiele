import { PAARSUCHE_PUZZLES, type PaarsuchePuzzle } from '../../data/paarsuche/puzzles'
import { dailyIndex, dailySeed, getBerlinDateString } from '../../lib/berlinDate'
import { seededShuffle } from '../../lib/seededRandom'
import { loadDailyProgress, saveJson } from '../../lib/storage'

export const PAARSUCHE_STORAGE_KEY = 'tagesrunde-paarsuche'
export const FLIP_DELAY_MS = 1000

export interface PaarsucheCard {
  id: string
  imageId: string
  faceUp: boolean
  matched: boolean
}

export type PaarsucheStatus = 'playing' | 'won'

export interface PaarsucheState {
  date: string
  puzzleId: string
  cards: PaarsucheCard[]
  openIds: string[]
  moves: number
  status: PaarsucheStatus
  /** Während der Verzögerung bei Nicht-Treffer. */
  locked: boolean
  message: string | null
}

export function getDailyPaarsuchePuzzle(dateStr: string = getBerlinDateString()): PaarsuchePuzzle {
  const idx = dailyIndex(dateStr, PAARSUCHE_PUZZLES.length)
  return PAARSUCHE_PUZZLES[idx]
}

export function buildDailyCards(dateStr: string = getBerlinDateString()): {
  puzzle: PaarsuchePuzzle
  cards: PaarsucheCard[]
} {
  const puzzle = getDailyPaarsuchePuzzle(dateStr)
  const pairs = puzzle.imageIds.flatMap((imageId, i) => [
    { id: `${imageId}-a-${i}`, imageId, faceUp: false, matched: false },
    { id: `${imageId}-b-${i}`, imageId, faceUp: false, matched: false },
  ])
  const cards = seededShuffle(pairs, dailySeed(dateStr, 42))
  return { puzzle, cards }
}

export function createPaarsucheState(dateStr: string = getBerlinDateString()): PaarsucheState {
  const { puzzle, cards } = buildDailyCards(dateStr)
  return {
    date: dateStr,
    puzzleId: puzzle.id,
    cards,
    openIds: [],
    moves: 0,
    status: 'playing',
    locked: false,
    message: null,
  }
}

export function loadPaarsucheState(dateStr: string = getBerlinDateString()): PaarsucheState {
  const saved = loadDailyProgress<PaarsucheState>(PAARSUCHE_STORAGE_KEY, dateStr)
  const puzzle = getDailyPaarsuchePuzzle(dateStr)
  if (saved && saved.puzzleId === puzzle.id) {
    return { ...saved, locked: false, message: null, openIds: saved.openIds?.length === 2 ? [] : (saved.openIds ?? []) }
  }
  return createPaarsucheState(dateStr)
}

export function persistPaarsucheState(state: PaarsucheState): void {
  const { message: _m, locked: _l, ...rest } = state
  // Offene Nicht-Treffer nicht speichern
  const cards = rest.cards.map((c) =>
    c.matched ? c : { ...c, faceUp: false },
  )
  saveJson(PAARSUCHE_STORAGE_KEY, { ...rest, cards, openIds: [], locked: false })
}

export type FlipResult =
  | { state: PaarsucheState; pendingMismatch: null }
  | { state: PaarsucheState; pendingMismatch: [string, string] }

export function flipCard(state: PaarsucheState, cardId: string): FlipResult {
  if (state.status !== 'playing' || state.locked) {
    return { state, pendingMismatch: null }
  }

  const card = state.cards.find((c) => c.id === cardId)
  if (!card || card.faceUp || card.matched) {
    return { state, pendingMismatch: null }
  }

  if (state.openIds.length >= 2) {
    return { state, pendingMismatch: null }
  }

  const cards = state.cards.map((c) => (c.id === cardId ? { ...c, faceUp: true } : c))
  const openIds = [...state.openIds, cardId]

  if (openIds.length < 2) {
    return {
      state: { ...state, cards, openIds, message: null },
      pendingMismatch: null,
    }
  }

  const [aId, bId] = openIds
  const a = cards.find((c) => c.id === aId)!
  const b = cards.find((c) => c.id === bId)!
  const moves = state.moves + 1

  if (a.imageId === b.imageId) {
    const matchedCards = cards.map((c) =>
      c.id === aId || c.id === bId ? { ...c, matched: true, faceUp: true } : c,
    )
    const allMatched = matchedCards.every((c) => c.matched)
    return {
      state: {
        ...state,
        cards: matchedCards,
        openIds: [],
        moves,
        status: allMatched ? 'won' : 'playing',
        locked: false,
        message: allMatched ? `Fertig! Alle Paare in ${moves} Zügen gefunden.` : 'Paar gefunden!',
      },
      pendingMismatch: null,
    }
  }

  return {
    state: {
      ...state,
      cards,
      openIds,
      moves,
      locked: true,
      message: null,
    },
    pendingMismatch: [aId, bId],
  }
}

export function resolveMismatch(state: PaarsucheState, aId: string, bId: string): PaarsucheState {
  const cards = state.cards.map((c) =>
    c.id === aId || c.id === bId ? { ...c, faceUp: false } : c,
  )
  return {
    ...state,
    cards,
    openIds: [],
    locked: false,
    message: null,
  }
}
