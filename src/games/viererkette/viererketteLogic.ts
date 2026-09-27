import {
  VIERERKETTE_PUZZLES,
  type ViererketteDifficulty,
  type ViererkettePuzzle,
} from '../../data/viererkette/puzzles'
import { dailyIndex, dailySeed, getBerlinDateString } from '../../lib/berlinDate'
import type { PlayMode } from '../../lib/playMode'
import { seededShuffle } from '../../lib/seededRandom'
import { loadDailyProgress, loadJson, saveJson } from '../../lib/storage'

export const VIERERKETTE_STORAGE_KEY = 'tagesrunde-viererkette'
export const VIERERKETTE_SETTINGS_KEY = 'tagesrunde-viererkette-settings'
export const MAX_MISTAKES = 20
export const POINTS_PER_MISTAKE = 5
export const START_POINTS = 100

export type FeedbackKind = 'one-off' | 'no-match' | 'correct' | null

export interface SolvedGroup {
  category: string
  explanation: string
  difficulty: ViererketteDifficulty
  terms: string[]
}

export type ViererketteStatus = 'playing' | 'won' | 'lost'

export interface GroupMeta {
  category: string
  explanation: string
  difficulty: ViererketteDifficulty
  terms: string[]
}

export interface ViererketteState {
  date: string
  puzzleId: string
  board: string[]
  selected: string[]
  solved: SolvedGroup[]
  mistakes: number
  points: number
  status: ViererketteStatus
  message: string | null
  feedback: FeedbackKind
  groups: Record<string, GroupMeta>
  shuffleCount: number
  mode: PlayMode
  /** Zählt Zusatzrunden, um weitere Rätsel zu wählen. */
  extraRound: number
  /** Ob dieser Sieg bereits in die Lebensstatistik eingetragen wurde. */
  statsRecorded: boolean
}

export type TermSize = 'klein' | 'normal' | 'gross'

export interface ViererketteSettings {
  darkMode: boolean
  termSize: TermSize
}

export const DEFAULT_SETTINGS: ViererketteSettings = {
  darkMode: false,
  termSize: 'normal',
}

export function getPuzzleByOffset(
  dateStr: string,
  offset: number,
): ViererkettePuzzle {
  const base = dailyIndex(dateStr, VIERERKETTE_PUZZLES.length)
  const idx = ((base + offset) % VIERERKETTE_PUZZLES.length + VIERERKETTE_PUZZLES.length) %
    VIERERKETTE_PUZZLES.length
  return VIERERKETTE_PUZZLES[idx]
}

export function getDailyPuzzle(dateStr: string = getBerlinDateString()): ViererkettePuzzle {
  return getPuzzleByOffset(dateStr, 0)
}

function buildGroups(puzzle: ViererkettePuzzle): Record<string, GroupMeta> {
  const groups: Record<string, GroupMeta> = {}
  for (const g of puzzle.groups) {
    groups[g.category] = {
      category: g.category,
      explanation: g.explanation,
      difficulty: g.difficulty,
      terms: [...g.terms].sort(),
    }
  }
  return groups
}

function allTerms(puzzle: ViererkettePuzzle): string[] {
  return puzzle.groups.flatMap((g) => [...g.terms])
}

function buildState(
  dateStr: string,
  offset: number,
  mode: PlayMode,
  extraRound: number,
): ViererketteState {
  const puzzle = getPuzzleByOffset(dateStr, offset)
  const seed = dailySeed(dateStr, 11 + offset * 97)
  const board = seededShuffle(allTerms(puzzle), seed)
  return {
    date: dateStr,
    puzzleId: puzzle.id,
    board,
    selected: [],
    solved: [],
    mistakes: 0,
    points: START_POINTS,
    status: 'playing',
    message: null,
    feedback: null,
    groups: buildGroups(puzzle),
    shuffleCount: 0,
    mode,
    extraRound,
    statsRecorded: false,
  }
}

export function createViererketteState(dateStr: string = getBerlinDateString()): ViererketteState {
  return buildState(dateStr, 0, 'daily', 0)
}

/** Neue spielbare Runde am selben Tag, ohne Tagesfortschritt zu überschreiben. */
export function createExtraViererketteState(prev: ViererketteState): ViererketteState {
  const nextExtra = prev.extraRound + 1
  return buildState(prev.date, nextExtra, 'extra', nextExtra)
}

export function loadViererketteState(dateStr: string = getBerlinDateString()): ViererketteState {
  const saved = loadDailyProgress<ViererketteState & { solution?: Record<string, string[]> }>(
    VIERERKETTE_STORAGE_KEY,
    dateStr,
  )
  const puzzle = getDailyPuzzle(dateStr)
  if (saved && saved.puzzleId === puzzle.id && saved.groups && (saved.mode ?? 'daily') === 'daily') {
    return {
      ...saved,
      mode: 'daily',
      extraRound: saved.extraRound ?? 0,
      statsRecorded: Boolean(saved.statsRecorded),
      message: null,
      feedback: saved.feedback ?? null,
    }
  }
  return createViererketteState(dateStr)
}

export function persistViererketteState(state: ViererketteState): void {
  // Zusatzrunden speichern den Tagesfortschritt nicht.
  if (state.mode !== 'daily') return
  const { message: _m, ...rest } = state
  saveJson(VIERERKETTE_STORAGE_KEY, rest)
}

export function loadViererketteSettings(): ViererketteSettings {
  const saved = loadJson<ViererketteSettings>(VIERERKETTE_SETTINGS_KEY)
  if (!saved) return { ...DEFAULT_SETTINGS }
  return {
    darkMode: Boolean(saved.darkMode),
    termSize: saved.termSize === 'klein' || saved.termSize === 'gross' ? saved.termSize : 'normal',
  }
}

export function persistViererketteSettings(settings: ViererketteSettings): void {
  saveJson(VIERERKETTE_SETTINGS_KEY, settings)
}

export function toggleSelect(state: ViererketteState, term: string): ViererketteState {
  if (state.status !== 'playing') return state
  if (!state.board.includes(term)) return state

  const selected = state.selected.includes(term)
    ? state.selected.filter((t) => t !== term)
    : state.selected.length < 4
      ? [...state.selected, term]
      : state.selected

  return { ...state, selected, message: null, feedback: null }
}

export function clearSelection(state: ViererketteState): ViererketteState {
  if (state.status !== 'playing') return state
  return { ...state, selected: [], message: null, feedback: null }
}

function findMatchingCategory(terms: string[], groups: Record<string, GroupMeta>): string | null {
  const sorted = [...terms].sort()
  for (const [category, group] of Object.entries(groups)) {
    if (group.terms.length === sorted.length && group.terms.every((t, i) => t === sorted[i])) {
      return category
    }
  }
  return null
}

export function bestOverlap(terms: string[], state: ViererketteState): number {
  const selected = new Set(terms)
  let best = 0
  for (const [category, meta] of Object.entries(state.groups)) {
    if (state.solved.some((s) => s.category === category)) continue
    const overlap = meta.terms.filter((t) => selected.has(t)).length
    if (overlap > best) best = overlap
  }
  return best
}

function autoCompleteLastGroup(state: ViererketteState): ViererketteState {
  if (state.board.length !== 4 || state.status !== 'playing') return state
  const category = findMatchingCategory(state.board, state.groups)
  if (!category) return state
  const meta = state.groups[category]
  const solved: SolvedGroup[] = [
    ...state.solved,
    {
      category,
      explanation: meta.explanation,
      difficulty: meta.difficulty,
      terms: [...meta.terms],
    },
  ]
  return {
    ...state,
    board: [],
    selected: [],
    solved,
    status: 'won',
    feedback: 'correct',
    message: 'Alle Gruppen gefunden!',
  }
}

export function submitGroup(state: ViererketteState): ViererketteState {
  if (state.status !== 'playing') return state
  if (state.selected.length !== 4) {
    return {
      ...state,
      message: 'Bitte genau vier Begriffe auswählen.',
      feedback: null,
    }
  }

  const category = findMatchingCategory(state.selected, state.groups)
  if (category) {
    const meta = state.groups[category]
    const solved: SolvedGroup[] = [
      ...state.solved,
      {
        category,
        explanation: meta.explanation,
        difficulty: meta.difficulty,
        terms: [...meta.terms],
      },
    ]
    const board = state.board.filter((t) => !state.selected.includes(t))
    let next: ViererketteState = {
      ...state,
      board,
      selected: [],
      solved,
      feedback: 'correct',
      message: `${meta.category}: ${meta.explanation}`,
    }
    if (board.length === 0) {
      next = { ...next, status: 'won', message: 'Alle Gruppen gefunden!' }
    } else if (board.length === 4) {
      next = autoCompleteLastGroup(next)
    }
    return next
  }

  const overlap = bestOverlap(state.selected, state)
  const mistakes = state.mistakes + 1
  const points = Math.max(0, state.points - POINTS_PER_MISTAKE)
  const feedback: FeedbackKind = overlap === 3 ? 'one-off' : 'no-match'
  const hint =
    feedback === 'one-off'
      ? 'Knapp daneben – drei Begriffe gehören zusammen.'
      : 'Kein Treffer.'

  if (mistakes >= MAX_MISTAKES) {
    const remaining = Object.entries(state.groups)
      .filter(([cat]) => !state.solved.some((s) => s.category === cat))
      .map(([categoryName, meta]) => ({
        category: categoryName,
        explanation: meta.explanation,
        difficulty: meta.difficulty,
        terms: [...meta.terms],
      }))
    return {
      ...state,
      mistakes,
      points,
      selected: [],
      status: 'lost',
      solved: [...state.solved, ...remaining],
      board: [],
      feedback,
      message: `${hint} Leider verloren – die Gruppen wurden aufgedeckt.`,
    }
  }

  const remaining = MAX_MISTAKES - mistakes
  const remainingText =
    remaining === 1
      ? 'Nur noch ein Versuch übrig.'
      : `Noch ${remaining} Fehlversuche möglich.`

  return {
    ...state,
    mistakes,
    points,
    selected: [],
    feedback,
    message: `${hint} (−${POINTS_PER_MISTAKE} Punkte). ${remainingText}`,
  }
}

export function shuffleBoard(state: ViererketteState): ViererketteState {
  if (state.status !== 'playing' || state.board.length === 0) return state
  const seed = dailySeed(
    state.date,
    11 + state.shuffleCount + 1 + state.board.length * 13 + state.extraRound * 31,
  )
  return {
    ...state,
    board: seededShuffle(state.board, seed),
    selected: [],
    shuffleCount: state.shuffleCount + 1,
    message: null,
    feedback: null,
  }
}

export function markStatsRecorded(state: ViererketteState): ViererketteState {
  return { ...state, statsRecorded: true }
}
