import { WORDLE_ANSWERS } from '../../data/wordle/answers'
import { WORDLE_DICTIONARY } from '../../data/wordle/dictionary'
import { dailyIndex, getBerlinDateString } from '../../lib/berlinDate'
import { normalizeGermanLetters } from '../../lib/normalizeGerman'
import { loadDailyProgress, saveJson } from '../../lib/storage'

export type LetterMark = 'correct' | 'present' | 'absent' | 'empty' | 'tbd'

export type WordleStatus = 'playing' | 'won' | 'lost'

export interface WordleState {
  date: string
  answer: string
  guesses: string[]
  current: string
  status: WordleStatus
  message: string | null
}

export const WORDLE_STORAGE_KEY = 'tagesrunde-wordle'
export const MAX_GUESSES = 6
export const WORD_LENGTH = 5

export function getDailyAnswer(dateStr: string = getBerlinDateString()): string {
  const idx = dailyIndex(dateStr, WORDLE_ANSWERS.length)
  return WORDLE_ANSWERS[idx]
}

export function createWordleState(dateStr: string = getBerlinDateString()): WordleState {
  return {
    date: dateStr,
    answer: getDailyAnswer(dateStr),
    guesses: [],
    current: '',
    status: 'playing',
    message: null,
  }
}

export function loadWordleState(dateStr: string = getBerlinDateString()): WordleState {
  const saved = loadDailyProgress<WordleState>(WORDLE_STORAGE_KEY, dateStr)
  if (saved && saved.answer === getDailyAnswer(dateStr)) {
    return { ...saved, message: null }
  }
  return createWordleState(dateStr)
}

export function persistWordleState(state: WordleState): void {
  const { message: _message, ...rest } = state
  saveJson(WORDLE_STORAGE_KEY, rest)
}

/**
 * Wertet einen Tipp aus. Grün zuerst, dann Gelb für Restvorkommen.
 */
export function scoreGuess(guess: string, answer: string): LetterMark[] {
  const g = guess.toUpperCase().split('')
  const a = answer.toUpperCase().split('')
  const marks: LetterMark[] = Array(WORD_LENGTH).fill('absent')
  const remaining: Record<string, number> = {}

  for (let i = 0; i < WORD_LENGTH; i++) {
    if (g[i] === a[i]) {
      marks[i] = 'correct'
    } else {
      remaining[a[i]] = (remaining[a[i]] ?? 0) + 1
    }
  }

  for (let i = 0; i < WORD_LENGTH; i++) {
    if (marks[i] === 'correct') continue
    const ch = g[i]
    if ((remaining[ch] ?? 0) > 0) {
      marks[i] = 'present'
      remaining[ch]!--
    } else {
      marks[i] = 'absent'
    }
  }

  return marks
}

export function isValidGuess(raw: string): { ok: true; word: string } | { ok: false; reason: string } {
  const word = normalizeGermanLetters(raw)
  if (word.length !== WORD_LENGTH) {
    return { ok: false, reason: 'Nur Wörter mit genau fünf Buchstaben (A–Z) sind erlaubt.' }
  }
  if (!WORDLE_DICTIONARY.has(word)) {
    return { ok: false, reason: 'Dieses Wort steht nicht in der Wortliste.' }
  }
  return { ok: true, word }
}

export function addLetter(state: WordleState, letter: string): WordleState {
  if (state.status !== 'playing') return state
  const ch = normalizeGermanLetters(letter)
  if (ch.length !== 1 || state.current.length >= WORD_LENGTH) return { ...state, message: null }
  return { ...state, current: state.current + ch, message: null }
}

export function removeLetter(state: WordleState): WordleState {
  if (state.status !== 'playing' || state.current.length === 0) return state
  return { ...state, current: state.current.slice(0, -1), message: null }
}

export function submitGuess(state: WordleState): WordleState {
  if (state.status !== 'playing') return state

  const result = isValidGuess(state.current)
  if (!result.ok) {
    return { ...state, message: result.reason }
  }

  const guesses = [...state.guesses, result.word]
  if (result.word === state.answer) {
    return {
      ...state,
      guesses,
      current: '',
      status: 'won',
      message: 'Richtig! Gut gemacht.',
    }
  }

  if (guesses.length >= MAX_GUESSES) {
    return {
      ...state,
      guesses,
      current: '',
      status: 'lost',
      message: `Leider verloren. Die Lösung war ${state.answer}.`,
    }
  }

  return { ...state, guesses, current: '', message: null }
}

export function keyStatuses(guesses: string[], answer: string): Record<string, LetterMark> {
  const best: Record<string, LetterMark> = {}
  const rank: Record<LetterMark, number> = {
    correct: 3,
    present: 2,
    absent: 1,
    empty: 0,
    tbd: 0,
  }

  for (const guess of guesses) {
    const marks = scoreGuess(guess, answer)
    for (let i = 0; i < guess.length; i++) {
      const ch = guess[i]
      const mark = marks[i]
      if (!best[ch] || rank[mark] > rank[best[ch]]) {
        best[ch] = mark
      }
    }
  }
  return best
}
