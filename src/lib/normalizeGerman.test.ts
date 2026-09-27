import { describe, expect, it } from 'vitest'
import { isFiveLetterNormalized, normalizeGermanLetters } from './normalizeGerman'

describe('normalizeGermanLetters', () => {
  it('wandelt Umlaute und ß um', () => {
    expect(normalizeGermanLetters('äöüß')).toBe('AEOEUESS')
    expect(normalizeGermanLetters('Größe')).toBe('GROESSE')
  })

  it('prüft die Länge nach Normalisierung', () => {
    expect(isFiveLetterNormalized('TISCH')).toBe(true)
    expect(isFiveLetterNormalized('MÄUSE')).toBe(false) // MAEUSE = 6
    expect(isFiveLetterNormalized('Straße')).toBe(false) // STRASSE = 7
  })
})
