import { SUDOKU_PUZZLES } from '../../data/sudoku/puzzles'
import { dailyIndex, getBerlinDateString } from '../../lib/berlinDate'
import { loadJson, saveJson } from '../../lib/storage'
import type {
  SudokuCell,
  SudokuDigit,
  SudokuDifficulty,
  SudokuGrid,
  SudokuSnapshot,
  SudokuState,
} from './sudokuTypes'

export const SUDOKU_STORAGE_KEY = 'tagesrunde-sudoku'
export const DIFFICULTIES: SudokuDifficulty[] = ['leicht', 'mittel', 'schwer']

function parseDigit(ch: string): SudokuDigit | null {
  const n = Number(ch)
  if (n >= 1 && n <= 9) return n as SudokuDigit
  return null
}

export function gridFromPuzzle(puzzle: string): SudokuGrid {
  const cells: SudokuGrid = []
  for (let r = 0; r < 9; r++) {
    const row: SudokuCell[] = []
    for (let c = 0; c < 9; c++) {
      const value = parseDigit(puzzle[r * 9 + c])
      row.push({
        value,
        given: value != null,
        notes: new Set(),
        conflict: false,
      })
    }
    cells.push(row)
  }
  return cells
}

function cloneNotes(notes: ReadonlySet<SudokuDigit>): Set<SudokuDigit> {
  return new Set(notes)
}

export function cloneGrid(grid: SudokuGrid): SudokuGrid {
  return grid.map((row) =>
    row.map((cell) => ({
      ...cell,
      notes: cloneNotes(cell.notes),
    })),
  )
}

function snapshotFromGrid(grid: SudokuGrid): SudokuSnapshot {
  return {
    grid: grid.map((row) =>
      row.map((cell) => ({
        value: cell.value,
        notes: [...cell.notes] as SudokuDigit[],
      })),
    ),
  }
}

function applySnapshot(grid: SudokuGrid, snap: SudokuSnapshot): SudokuGrid {
  return grid.map((row, r) =>
    row.map((cell, c) => {
      if (cell.given) return { ...cell, notes: new Set(), conflict: false }
      const s = snap.grid[r][c]
      return {
        ...cell,
        value: s.value,
        notes: new Set(s.notes),
        conflict: false,
      }
    }),
  )
}

export function getDailySudoku(
  difficulty: SudokuDifficulty,
  dateStr: string = getBerlinDateString(),
) {
  const list = SUDOKU_PUZZLES[difficulty]
  const idx = dailyIndex(dateStr, list.length)
  return list[idx]
}

export function createSudokuState(
  difficulty: SudokuDifficulty,
  dateStr: string = getBerlinDateString(),
): SudokuState {
  const puzzle = getDailySudoku(difficulty, dateStr)
  return {
    date: dateStr,
    difficulty,
    puzzleId: puzzle.id,
    solution: puzzle.solution,
    grid: gridFromPuzzle(puzzle.puzzle),
    selected: null,
    notesMode: false,
    history: [],
    status: 'playing',
    message: null,
  }
}

interface StoredSudoku {
  date: string
  difficulty: SudokuDifficulty
  puzzleId: string
  solution: string
  grid: Array<Array<{ value: SudokuDigit | null; notes: SudokuDigit[]; given: boolean }>>
  notesMode: boolean
  history: SudokuSnapshot[]
  status: 'playing' | 'won'
}

interface StoredSudokuBundle {
  date: string
  byDifficulty: Partial<Record<SudokuDifficulty, StoredSudoku>>
}

function toStored(state: SudokuState): StoredSudoku {
  return {
    date: state.date,
    difficulty: state.difficulty,
    puzzleId: state.puzzleId,
    solution: state.solution,
    grid: state.grid.map((row) =>
      row.map((cell) => ({
        value: cell.value,
        notes: [...cell.notes] as SudokuDigit[],
        given: cell.given,
      })),
    ),
    notesMode: state.notesMode,
    history: state.history,
    status: state.status,
  }
}

function fromStored(saved: StoredSudoku): SudokuState {
  const grid = saved.grid.map((row) =>
    row.map((cell) => ({
      value: cell.value,
      given: cell.given,
      notes: new Set(cell.notes) as ReadonlySet<SudokuDigit>,
      conflict: false,
    })),
  )
  return {
    date: saved.date,
    difficulty: saved.difficulty,
    puzzleId: saved.puzzleId,
    solution: saved.solution,
    grid,
    selected: null,
    notesMode: saved.notesMode,
    history: saved.history,
    status: saved.status,
    message: null,
  }
}

export function loadSudokuState(
  difficulty: SudokuDifficulty,
  dateStr: string = getBerlinDateString(),
): SudokuState {
  const puzzle = getDailySudoku(difficulty, dateStr)
  const raw = loadJson<StoredSudokuBundle | StoredSudoku>(SUDOKU_STORAGE_KEY)
  if (!raw || raw.date !== dateStr) {
    return createSudokuState(difficulty, dateStr)
  }

  // Abwärtskompatibel: früheres Einzel-Speicherformat
  if ('difficulty' in raw && 'puzzleId' in raw && !('byDifficulty' in raw)) {
    const legacy = raw as StoredSudoku
    if (legacy.difficulty === difficulty && legacy.puzzleId === puzzle.id) {
      return fromStored(legacy)
    }
    return createSudokuState(difficulty, dateStr)
  }

  const bundle = raw as StoredSudokuBundle
  const saved = bundle.byDifficulty?.[difficulty]
  if (saved && saved.puzzleId === puzzle.id) {
    return fromStored(saved)
  }
  return createSudokuState(difficulty, dateStr)
}

export function persistSudokuState(state: SudokuState): void {
  const raw = loadJson<StoredSudokuBundle | StoredSudoku>(SUDOKU_STORAGE_KEY)
  let byDifficulty: Partial<Record<SudokuDifficulty, StoredSudoku>> = {}

  if (raw && raw.date === state.date) {
    if ('byDifficulty' in raw && raw.byDifficulty) {
      byDifficulty = { ...raw.byDifficulty }
    } else if ('difficulty' in raw && 'puzzleId' in raw) {
      const legacy = raw as StoredSudoku
      byDifficulty = { [legacy.difficulty]: legacy }
    }
  }

  byDifficulty[state.difficulty] = toStored(state)
  const payload: StoredSudokuBundle = { date: state.date, byDifficulty }
  saveJson(SUDOKU_STORAGE_KEY, payload)
}

function pushHistory(state: SudokuState): SudokuSnapshot[] {
  return [...state.history, snapshotFromGrid(state.grid)].slice(-100)
}

export function selectCell(state: SudokuState, row: number, col: number): SudokuState {
  return { ...state, selected: { row, col }, message: null }
}

export function toggleNotesMode(state: SudokuState): SudokuState {
  return { ...state, notesMode: !state.notesMode, message: null }
}

export function enterDigit(state: SudokuState, digit: SudokuDigit): SudokuState {
  if (state.status === 'won' || !state.selected) return state
  const { row, col } = state.selected
  const cell = state.grid[row][col]
  if (cell.given) return { ...state, message: 'Vorgegebene Ziffern können nicht geändert werden.' }

  const history = pushHistory(state)
  const grid = cloneGrid(state.grid)

  if (state.notesMode) {
    const notes = cloneNotes(grid[row][col].notes)
    if (notes.has(digit)) notes.delete(digit)
    else notes.add(digit)
    grid[row][col] = { ...grid[row][col], notes, value: null, conflict: false }
    return { ...state, grid, history, message: null }
  }

  grid[row][col] = {
    ...grid[row][col],
    value: digit,
    notes: new Set(),
    conflict: false,
  }

  if (isGridCompleteAndCorrect(grid, state.solution)) {
    return {
      ...state,
      grid,
      history,
      status: 'won',
      message: 'Geschafft! Das Sudoku ist gelöst.',
    }
  }

  return { ...state, grid, history, message: null }
}

export function eraseCell(state: SudokuState): SudokuState {
  if (state.status === 'won' || !state.selected) return state
  const { row, col } = state.selected
  const cell = state.grid[row][col]
  if (cell.given) return { ...state, message: 'Vorgegebene Ziffern können nicht gelöscht werden.' }
  if (cell.value == null && cell.notes.size === 0) return state

  const history = pushHistory(state)
  const grid = cloneGrid(state.grid)
  grid[row][col] = { ...grid[row][col], value: null, notes: new Set(), conflict: false }
  return { ...state, grid, history, message: null }
}

export function undo(state: SudokuState): SudokuState {
  if (state.history.length === 0) return { ...state, message: 'Nichts zum Rückgängigmachen.' }
  const history = [...state.history]
  const snap = history.pop()!
  const grid = applySnapshot(state.grid, snap)
  return {
    ...state,
    grid,
    history,
    status: 'playing',
    message: null,
  }
}

export function checkEntries(state: SudokuState): SudokuState {
  const grid = cloneGrid(state.grid)
  let wrong = 0
  let filled = 0
  for (let r = 0; r < 9; r++) {
    for (let c = 0; c < 9; c++) {
      const cell = grid[r][c]
      if (cell.given || cell.value == null) {
        cell.conflict = false
        continue
      }
      filled++
      const expected = parseDigit(state.solution[r * 9 + c])
      if (cell.value !== expected) {
        cell.conflict = true
        wrong++
      } else {
        cell.conflict = false
      }
    }
  }

  if (filled === 0) {
    return { ...state, grid, message: 'Noch keine eigenen Einträge zum Prüfen.' }
  }
  if (wrong === 0) {
    if (isGridCompleteAndCorrect(grid, state.solution)) {
      return {
        ...state,
        grid,
        status: 'won',
        message: 'Alles korrekt – Sudoku gelöst!',
      }
    }
    return { ...state, grid, message: 'Alle bisherigen Einträge sind korrekt.' }
  }
  return {
    ...state,
    grid,
    message: `${wrong} Einträg${wrong === 1 ? '' : 'e'} ${wrong === 1 ? 'ist' : 'sind'} falsch markiert.`,
  }
}

export function isGridCompleteAndCorrect(grid: SudokuGrid, solution: string): boolean {
  for (let r = 0; r < 9; r++) {
    for (let c = 0; c < 9; c++) {
      const expected = parseDigit(solution[r * 9 + c])
      if (grid[r][c].value !== expected) return false
    }
  }
  return true
}

/** Hilfsfunktion für Tests: prüft, ob ein Rätsel genau eine Lösung hat. */
export function countSolutions(puzzle: string, limit = 2): number {
  const board = puzzle.split('').map((ch) => Number(ch))
  let count = 0

  const valid = (idx: number, n: number): boolean => {
    const r = Math.floor(idx / 9)
    const c = idx % 9
    for (let i = 0; i < 9; i++) {
      if (board[r * 9 + i] === n) return false
      if (board[i * 9 + c] === n) return false
    }
    const br = Math.floor(r / 3) * 3
    const bc = Math.floor(c / 3) * 3
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (board[(br + i) * 9 + (bc + j)] === n) return false
      }
    }
    return true
  }

  const rec = (): void => {
    if (count >= limit) return
    const idx = board.indexOf(0)
    if (idx === -1) {
      count++
      return
    }
    for (let n = 1; n <= 9; n++) {
      if (valid(idx, n)) {
        board[idx] = n
        rec()
        board[idx] = 0
      }
    }
  }

  rec()
  return count
}
