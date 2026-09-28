import { loadJson, saveJson } from '../../lib/storage'

export const PAARSUCHE_LIFETIME_KEY = 'tagesrunde-paarsuche-lifetime'

/** Mindestzüge bei acht Paaren (jedes Paar im ersten Versuch). */
export const PERFECT_MOVES = 8
/** Startpunktzahl bei perfektem Spiel. */
export const START_POINTS = 100
/** Abzug je Zug über dem Minimum. */
export const POINTS_PER_EXTRA_MOVE = 5

export interface PaarsucheLifetimeStats {
  /** Anzahl gewonnener Spiele (Lebenszeit). */
  gamesWon: number
  /** Summe der Endpunktzahlen aller Siege. */
  totalPoints: number
  /** Höchste Endpunktzahl eines Sieges. */
  highestScore: number
  /** Verhindert Doppelzählung (z. B. Strict Mode / Reload). */
  lastRecordedKey?: string
}

export const EMPTY_LIFETIME_STATS: PaarsucheLifetimeStats = {
  gamesWon: 0,
  totalPoints: 0,
  highestScore: 0,
}

/**
 * Punkte aus Zügen: weniger Züge = höhere Punktzahl.
 * Formel: max(0, 100 − 5 × (Züge − 8)); 8 Züge = 100.
 */
export function scoreFromMoves(moves: number): number {
  const extra = Math.max(0, Math.round(moves) - PERFECT_MOVES)
  return Math.max(0, START_POINTS - POINTS_PER_EXTRA_MOVE * extra)
}

export function loadPaarsucheLifetimeStats(): PaarsucheLifetimeStats {
  const saved = loadJson<Partial<PaarsucheLifetimeStats>>(PAARSUCHE_LIFETIME_KEY)
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
export function averageScore(stats: PaarsucheLifetimeStats): number {
  if (stats.gamesWon <= 0) return 0
  return stats.totalPoints / stats.gamesWon
}

export function formatAverageScore(stats: PaarsucheLifetimeStats): string {
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

/** Speichert einen Sieg (Punkte aus Zügen). Idempotent je gameKey. */
export function recordPaarsucheWin(
  points: number,
  gameKey: string,
): PaarsucheLifetimeStats {
  const prev = loadPaarsucheLifetimeStats()
  if (prev.lastRecordedKey === gameKey) return prev
  const score = Math.max(0, Math.round(points))
  const next: PaarsucheLifetimeStats = {
    gamesWon: prev.gamesWon + 1,
    totalPoints: prev.totalPoints + score,
    highestScore: Math.max(prev.highestScore, score),
    lastRecordedKey: gameKey,
  }
  saveJson(PAARSUCHE_LIFETIME_KEY, next)
  return next
}
