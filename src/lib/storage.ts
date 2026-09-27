export function loadJson<T>(key: string): T | null {
  try {
    const raw = localStorage.getItem(key)
    if (raw == null) return null
    return JSON.parse(raw) as T
  } catch {
    return null
  }
}

export function saveJson(key: string, value: unknown): void {
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch {
    // Speichern fehlgeschlagen (z. B. Quota) – Spiel bleibt spielbar.
  }
}

export function clearKey(key: string): void {
  try {
    localStorage.removeItem(key)
  } catch {
    // ignorieren
  }
}

/** Lädt gespeicherten Fortschritt nur, wenn er zum heutigen Berlin-Datum passt. */
export function loadDailyProgress<T extends { date: string }>(
  key: string,
  today: string,
): T | null {
  const data = loadJson<T>(key)
  if (!data || data.date !== today) return null
  return data
}
