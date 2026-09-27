import { VIERERKETTE_PUZZLES, type ViererkettePuzzle } from '../../data/viererkette/puzzles'
import { dailyIndex, dailySeed, getBerlinDateString } from '../../lib/berlinDate'
import { seededShuffle } from '../../lib/seededRandom'
import { loadDailyProgress, saveJson } from '../../lib/storage'

export const VIERERKETTE_STORAGE_KEY = 'tagesrunde-viererkette'
export const MAX_MISTAKES = 4

export interface SolvedGroup {
  category: string
  terms: string[]
}

export type ViererketteStatus = 'playing' | 'won' | 'lost'

export interface ViererketteState {
  date: string
  puzzleId: string
  /** Aktive Begriffe in Anzeigereihenfolge. */
  board: string[]
  selected: string[]
  solved: SolvedGroup[]
  mistakes: number
  status: ViererketteStatus
  message: string | null
  /** Lösung: Kategorie → sortierte Begriffe */
  solution: Record<string, string[]>
  shuffleCount: number
}

export function getDailyPuzzle(dateStr: string = getBerlinDateString()): ViererkettePuzzle {
  const idx = dailyIndex(dateStr, VIERERKETTE_PUZZLES.length)
  return VIERERKETTE_PUZZLES[idx]
}

function buildSolution(puzzle: ViererkettePuzzle): Record<string, string[]> {
  const solution: Record<string, string[]> = {}
  for (const g of puzzle.groups) {
    solution[g.category] = [...g.terms].sort()
  }
  return solution
}

function allTerms(puzzle: ViererkettePuzzle): string[] {
  return puzzle.groups.flatMap((g) => [...g.terms])
}

export function createViererketteState(dateStr: string = getBerlinDateString()): ViererketteState {
  const puzzle = getDailyPuzzle(dateStr)
  const seed = dailySeed(dateStr, 11)
  const board = seededShuffle(allTerms(puzzle), seed)
  return {
    date: dateStr,
    puzzleId: puzzle.id,
    board,
    selected: [],
    solved: [],
    mistakes: 0,
    status: 'playing',
    message: null,
    solution: buildSolution(puzzle),
    shuffleCount: 0,
  }
}

export function loadViererketteState(dateStr: string = getBerlinDateString()): ViererketteState {
  const saved = loadDailyProgress<ViererketteState>(VIERERKETTE_STORAGE_KEY, dateStr)
  const puzzle = getDailyPuzzle(dateStr)
  if (saved && saved.puzzleId === puzzle.id) {
    return { ...saved, message: null }
  }
  return createViererketteState(dateStr)
}

export function persistViererketteState(state: ViererketteState): void {
  const { message: _m, ...rest } = state
  saveJson(VIERERKETTE_STORAGE_KEY, rest)
}

export function toggleSelect(state: ViererketteState, term: string): ViererketteState {
  if (state.status !== 'playing') return state
  if (!state.board.includes(term)) return state

  const selected = state.selected.includes(term)
    ? state.selected.filter((t) => t !== term)
    : state.selected.length < 4
      ? [...state.selected, term]
      : state.selected

  return { ...state, selected, message: null }
}

function findMatchingCategory(terms: string[], solution: Record<string, string[]>): string | null {
  const sorted = [...terms].sort()
  for (const [category, group] of Object.entries(solution)) {
    if (group.length === sorted.length && group.every((t, i) => t === sorted[i])) {
      return category
    }
  }
  return null
}

function autoCompleteLastGroup(state: ViererketteState): ViererketteState {
  if (state.board.length !== 4 || state.status !== 'playing') return state
  const category = findMatchingCategory(state.board, state.solution)
  if (!category) return state
  const solved: SolvedGroup[] = [
    ...state.solved,
    { category, terms: [...state.solution[category]] },
  ]
  return {
    ...state,
    board: [],
    selected: [],
    solved,
    status: 'won',
    message: 'Alle Gruppen gefunden!',
  }
}

export function submitGroup(state: ViererketteState): ViererketteState {
  if (state.status !== 'playing') return state
  if (state.selected.length !== 4) {
    return { ...state, message: 'Bitte genau vier Begriffe auswählen.' }
  }

  const category = findMatchingCategory(state.selected, state.solution)
  if (category) {
    const solved: SolvedGroup[] = [
      ...state.solved,
      { category, terms: [...state.solution[category]] },
    ]
    const board = state.board.filter((t) => !state.selected.includes(t))
    let next: ViererketteState = {
      ...state,
      board,
      selected: [],
      solved,
      message: `Gruppe gefunden: ${category}`,
    }
    if (board.length === 0) {
      next = { ...next, status: 'won', message: 'Alle Gruppen gefunden!' }
    } else if (board.length === 4) {
      next = autoCompleteLastGroup(next)
    }
    return next
  }

  const mistakes = state.mistakes + 1
  if (mistakes >= MAX_MISTAKES) {
    const remaining = Object.entries(state.solution)
      .filter(([cat]) => !state.solved.some((s) => s.category === cat))
      .map(([category, terms]) => ({ category, terms: [...terms] }))
    return {
      ...state,
      mistakes,
      selected: [],
      status: 'lost',
      solved: [...state.solved, ...remaining],
      board: [],
      message: 'Leider verloren. Die Gruppen wurden aufgedeckt.',
    }
  }

  return {
    ...state,
    mistakes,
    selected: [],
    message: `Leider falsch. Noch ${MAX_MISTAKES - mistakes} Fehlversuch${MAX_MISTAKES - mistakes === 1 ? '' : 'e'}.`,
  }
}

export function shuffleBoard(state: ViererketteState): ViererketteState {
  if (state.status !== 'playing' || state.board.length === 0) return state
  const seed = dailySeed(state.date, 11 + state.shuffleCount + 1 + state.board.length * 13)
  return {
    ...state,
    board: seededShuffle(state.board, seed),
    selected: [],
    shuffleCount: state.shuffleCount + 1,
    message: null,
  }
}
