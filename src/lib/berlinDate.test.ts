import { describe, expect, it } from 'vitest'
import { dailyIndex, daysSinceEpoch, getBerlinDateString } from './berlinDate'

describe('berlinDate', () => {
  it('formatiert das Berlin-Datum als YYYY-MM-DD', () => {
    // 2024-06-15 22:30 UTC = 2024-06-16 00:30 in Berlin (MESZ)
    const d = new Date('2024-06-15T22:30:00.000Z')
    expect(getBerlinDateString(d)).toBe('2024-06-16')
  })

  it('wechselt am Mitternacht Europe/Berlin', () => {
    const before = new Date('2024-01-01T22:59:00.000Z') // MEZ = 23:59
    const after = new Date('2024-01-01T23:00:00.000Z') // MEZ = 00:00 nächsten Tags
    expect(getBerlinDateString(before)).toBe('2024-01-01')
    expect(getBerlinDateString(after)).toBe('2024-01-02')
  })

  it('liefert stabile Tagesindizes', () => {
    expect(daysSinceEpoch('2024-01-01')).toBe(0)
    expect(daysSinceEpoch('2024-01-02')).toBe(1)
    expect(dailyIndex('2024-01-01', 10)).toBe(0)
    expect(dailyIndex('2024-01-11', 10)).toBe(0)
  })
})
