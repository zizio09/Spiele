import { describe, expect, it } from 'vitest'
import { SUDOKU_PUZZLES } from '../../data/sudoku/puzzles'
import {
  checkEntries,
  countSolutions,
  createSudokuState,
  enterDigit,
  eraseCell,
  selectCell,
  undo,
} from './sudokuLogic'
import type { SudokuDigit } from './sudokuTypes'

describe('Sudoku', () => {
  it('hat für Beispielrätsel genau eine Lösung', () => {
    for (const diff of ['leicht', 'mittel', 'schwer', 'sehr-schwer'] as const) {
      const puzzle = SUDOKU_PUZZLES[diff][0]
      expect(countSolutions(puzzle.puzzle)).toBe(1)
      expect(puzzle.solution).toHaveLength(81)
      expect(puzzle.puzzle).toHaveLength(81)
    }
  })

  it('macht Vorgaben unveränderlich', () => {
    let state = createSudokuState('leicht', '2024-01-01')
    // erste vorgegebene Zelle finden
    let row = 0
    let col = 0
    outer: for (let r = 0; r < 9; r++) {
      for (let c = 0; c < 9; c++) {
        if (state.grid[r][c].given) {
          row = r
          col = c
          break outer
        }
      }
    }
    const before = state.grid[row][col].value
    state = selectCell(state, row, col)
    state = enterDigit(state, (((before ?? 1) % 9) + 1) as SudokuDigit)
    expect(state.grid[row][col].value).toBe(before)
    state = eraseCell(state)
    expect(state.grid[row][col].value).toBe(before)
  })

  it('unterstützt Rückgängig und Prüfung', () => {
    let state = createSudokuState('leicht', '2024-01-01')
    let row = -1
    let col = -1
    for (let r = 0; r < 9; r++) {
      for (let c = 0; c < 9; c++) {
        if (!state.grid[r][c].given) {
          row = r
          col = c
          break
        }
      }
      if (row >= 0) break
    }
    state = selectCell(state, row, col)
    state = enterDigit(state, 9)
    expect(state.grid[row][col].value).toBe(9)
    state = undo(state)
    expect(state.grid[row][col].value).toBeNull()
    state = enterDigit(state, 1)
    state = checkEntries(state)
    expect(state.message).toBeTruthy()
  })

  it('gewinnt bei korrekter vollständiger Lösung', () => {
    let state = createSudokuState('leicht', '2024-01-01')
    for (let r = 0; r < 9; r++) {
      for (let c = 0; c < 9; c++) {
        if (!state.grid[r][c].given) {
          const d = Number(state.solution[r * 9 + c]) as SudokuDigit
          state = selectCell(state, r, c)
          state = enterDigit(state, d)
        }
      }
    }
    expect(state.status).toBe('won')
  })
})
