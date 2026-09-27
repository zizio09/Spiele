/** Datum in Europe/Berlin als YYYY-MM-DD. */
export function getBerlinDateString(now: Date = new Date()): string {
  return new Intl.DateTimeFormat('en-CA', {
    timeZone: 'Europe/Berlin',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(now)
}

/** Formatiertes deutsches Datum für die Anzeige. */
export function formatBerlinDateDisplay(dateStr: string): string {
  const [year, month, day] = dateStr.split('-').map(Number)
  const utcNoon = new Date(Date.UTC(year, month - 1, day, 12))
  return new Intl.DateTimeFormat('de-DE', {
    timeZone: 'Europe/Berlin',
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(utcNoon)
}

const EPOCH = '2024-01-01'

/** Tage seit festem Epoch-Datum (Berlin-Kalendertag). */
export function daysSinceEpoch(dateStr: string): number {
  const [y, m, d] = dateStr.split('-').map(Number)
  const [ey, em, ed] = EPOCH.split('-').map(Number)
  const a = Date.UTC(y, m - 1, d)
  const b = Date.UTC(ey, em - 1, ed)
  return Math.floor((a - b) / 86_400_000)
}

/** Stabiler Index für Tagesrätsel. */
export function dailyIndex(dateStr: string, length: number): number {
  if (length <= 0) return 0
  const days = daysSinceEpoch(dateStr)
  const idx = ((days % length) + length) % length
  return idx
}

/** Deterministischer Seed aus dem Datum. */
export function dailySeed(dateStr: string, salt = 0): number {
  const days = daysSinceEpoch(dateStr)
  return (days * 2654435761 + salt * 97) >>> 0
}
