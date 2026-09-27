/**
 * Wandelt Umlaute und ß in A–Z-Äquivalente um und entfernt sonstige Zeichen.
 * Ä→AE, Ö→OE, Ü→UE, ß→SS.
 */
export function normalizeGermanLetters(input: string): string {
  return input
    .toUpperCase()
    .replace(/Ä/g, 'AE')
    .replace(/Ö/g, 'OE')
    .replace(/Ü/g, 'UE')
    .replace(/ß/g, 'SS')
    .replace(/[^A-Z]/g, '')
}

/** Prüft, ob der normalisierte Text genau fünf Buchstaben A–Z hat. */
export function isFiveLetterNormalized(input: string): boolean {
  return normalizeGermanLetters(input).length === 5
}
