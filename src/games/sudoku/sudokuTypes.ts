import type { PlayMode } from '../../lib/playMode'

export type SudokuDifficulty = 'leicht' | 'mittel' | 'schwer'

export type SudokuDigit = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9

export type CellNotes = ReadonlySet<SudokuDigit>

export interface SudokuCell {
  value: SudokuDigit | null
  given: boolean
  notes: CellNotes
  /** Markiert bei Prüfung als fehlerhaft. */
  conflict: boolean
}

export type SudokuGrid = SudokuCell[][]

export interface SudokuSnapshot {
  grid: Array<Array<{ value: SudokuDigit | null; notes: SudokuDigit[] }>>
}

export interface SudokuState {
  date: string
  difficulty: SudokuDifficulty
  puzzleId: string
  solution: string
  grid: SudokuGrid
  selected: { row: number; col: number } | null
  notesMode: boolean
  history: SudokuSnapshot[]
  status: 'playing' | 'won'
  message: string | null
  mode: PlayMode
  extraRound: number
}
