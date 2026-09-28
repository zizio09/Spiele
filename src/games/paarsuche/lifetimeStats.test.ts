import { beforeEach, describe, expect, it } from 'vitest'
import {
  averageScore,
  formatAverageScore,
  loadPaarsucheLifetimeStats,
  recordPaarsucheWin,
  scoreFromMoves,
  winRecordKey,
} from './lifetimeStats'

describe('Paarsuche lifetime stats', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('startet bei null und formatiert Platzhalter', () => {
    const stats = loadPaarsucheLifetimeStats()
    expect(stats.gamesWon).toBe(0)
    expect(stats.highestScore).toBe(0)
    expect(formatAverageScore(stats)).toBe('–')
    expect(averageScore(stats)).toBe(0)
  })

  it('rechnet Punkte aus Zügen (weniger = besser)', () => {
    expect(scoreFromMoves(8)).toBe(100)
    expect(scoreFromMoves(10)).toBe(90)
    expect(scoreFromMoves(28)).toBe(0)
    expect(scoreFromMoves(40)).toBe(0)
  })

  it('zählt Siege, Schnitt und Höchstwert', () => {
    recordPaarsucheWin(scoreFromMoves(8), 'a')
    recordPaarsucheWin(scoreFromMoves(10), 'b')
    const stats = loadPaarsucheLifetimeStats()
    expect(stats.gamesWon).toBe(2)
    expect(stats.highestScore).toBe(100)
    expect(averageScore(stats)).toBe(95)
    expect(formatAverageScore(stats)).toBe('95')
  })

  it('zählt denselben gameKey nicht doppelt', () => {
    const key = winRecordKey({
      date: '2024-01-01',
      puzzleId: 'ps-01',
      mode: 'daily',
      extraRound: 0,
    })
    recordPaarsucheWin(100, key)
    recordPaarsucheWin(100, key)
    expect(loadPaarsucheLifetimeStats().gamesWon).toBe(1)
  })
})
