import { beforeEach, describe, expect, it } from 'vitest'
import {
  averageScore,
  formatAverageScore,
  loadViererketteLifetimeStats,
  recordViererketteWin,
  winRecordKey,
} from './lifetimeStats'

describe('Viererkette lifetime stats', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('startet bei null und formatiert Platzhalter', () => {
    const stats = loadViererketteLifetimeStats()
    expect(stats.gamesWon).toBe(0)
    expect(stats.highestScore).toBe(0)
    expect(formatAverageScore(stats)).toBe('–')
    expect(averageScore(stats)).toBe(0)
  })

  it('zählt Siege, Schnitt und Höchstwert', () => {
    recordViererketteWin(90, 'a')
    recordViererketteWin(80, 'b')
    const stats = loadViererketteLifetimeStats()
    expect(stats.gamesWon).toBe(2)
    expect(stats.highestScore).toBe(90)
    expect(averageScore(stats)).toBe(85)
    expect(formatAverageScore(stats)).toBe('85')
  })

  it('zählt denselben gameKey nicht doppelt', () => {
    const key = winRecordKey({
      date: '2024-01-01',
      puzzleId: 'vk-01',
      mode: 'daily',
      extraRound: 0,
    })
    recordViererketteWin(95, key)
    recordViererketteWin(95, key)
    expect(loadViererketteLifetimeStats().gamesWon).toBe(1)
  })
})
