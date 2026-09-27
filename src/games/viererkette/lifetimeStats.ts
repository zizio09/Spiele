import { loadJson, saveJson } from '../../lib/storage'

export const VIERERKETTE_LIFETIME_KEY = 'tagesrunde-viererkette-lifetime'

export interface ViererketteLifetimeStats {
  /** Anzahl gewonnener Spiele (Lebenszeit). */
  gamesWon: number
  /** Summe der Endpunktzahlen aller Siege. */
  totalPoints: number
  /** Höchste Endpunktzahl eines Sieges. */
  highestScore: number
  /** Verhindert Doppelzählung (z. B. Strict Mode / Reload). */
  lastRecordedKey?: string
}

export const EMPTY_LIFETIME_STATS: ViererketteLifetimeStats = {
  gamesWon: 0,
  totalPoints: 0,
  highestScore: 0,
}

export function loadViererketteLifetimeStats(): ViererketteLifetimeStats {
  const saved = loadJson<Partial<ViererketteLifetimeStats>>(VIERERKETTE_LIFETIME_KEY)
  if (!saved) return { ...EMPTY_LIFETIME_STATS }
  const gamesWon = Math.max(0, Number(saved.gamesWon) || 0)
  const totalPoints = Math.max(0, Number(saved.totalPoints) || 0)
  const highestScore = Math.max(0, Number(saved.highestScore) || 0)
  return {
    gamesWon,
    totalPoints,
    highestScore,
    lastRecordedKey: typeof saved.lastRecordedKey === 'string' ? saved.lastRecordedKey : undefined,
  }
}

/** Punkteschnitt über alle Siege; 0 wenn noch keines gewonnen. */
export function averageScore(stats: ViererketteLifetimeStats): number {
  if (stats.gamesWon <= 0) return 0
  return stats.totalPoints / stats.gamesWon
}

export function formatAverageScore(stats: ViererketteLifetimeStats): string {
  if (stats.gamesWon <= 0) return '–'
  const avg = averageScore(stats)
  return Number.isInteger(avg) ? String(avg) : avg.toFixed(1).replace('.', ',')
}

export function winRecordKey(parts: {
  date: string
  puzzleId: string
  mode: string
  extraRound: number
}): string {
  return `${parts.date}:${parts.puzzleId}:${parts.mode}:${parts.extraRound}`
}

/** Speichert einen Sieg (Punkte = Endpunktzahl dieses Spiels). Idempotent je gameKey. */
export function recordViererketteWin(
  points: number,
  gameKey: string,
): ViererketteLifetimeStats {
  const prev = loadViererketteLifetimeStats()
  if (prev.lastRecordedKey === gameKey) return prev
  const score = Math.max(0, Math.round(points))
  const next: ViererketteLifetimeStats = {
    gamesWon: prev.gamesWon + 1,
    totalPoints: prev.totalPoints + score,
    highestScore: Math.max(prev.highestScore, score),
    lastRecordedKey: gameKey,
  }
  saveJson(VIERERKETTE_LIFETIME_KEY, next)
  return next
}
