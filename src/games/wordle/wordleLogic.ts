import { WORDLE_ANSWERS } from '../../data/wordle/answers'
import { WORDLE_DICTIONARY } from '../../data/wordle/dictionary'
import { dailyIndex, getBerlinDateString } from '../../lib/berlinDate'
import { normalizeGermanLetters } from '../../lib/normalizeGerman'
import type { PlayMode } from '../../lib/playMode'
import { clearKey, loadDailyProgress, saveJson } from '../../lib/storage'

export type LetterMark = 'correct' | 'present' | 'absent' | 'empty' | 'tbd'

export type WordleStatus = 'playing' | 'won' | 'lost'

export interface WordleState {
  date: string
  answer: string
  guesses: string[]
  /** Aktuelle Zeile: genau fünf Slots (leer = ''). */
  letters: string[]
  /** Cursor in der aktuellen Zeile (0–4). */
  cursor: number
  status: WordleStatus
  message: string | null
  mode: PlayMode
  extraRound: number
}

export const WORDLE_STORAGE_KEY = 'tagesrunde-wordle'
/** Aktive Zusatzrunde – getrennt vom Tagesfortschritt. */
export const WORDLE_SESSION_KEY = 'tagesrunde-wordle-session'
export const MAX_GUESSES = 6
export const WORD_LENGTH = 5

export function getAnswerByOffset(dateStr: string, offset: number): string {
  const base = dailyIndex(dateStr, WORDLE_ANSWERS.length)
  const idx =
    ((base + offset) % WORDLE_ANSWERS.length + WORDLE_ANSWERS.length) % WORDLE_ANSWERS.length
  return WORDLE_ANSWERS[idx]
}

export function getDailyAnswer(dateStr: string = getBerlinDateString()): string {
  return getAnswerByOffset(dateStr, 0)
}

function emptyLetters(): string[] {
  return Array.from({ length: WORD_LENGTH }, () => '')
}

function buildWordleState(
  dateStr: string,
  offset: number,
  mode: PlayMode,
  extraRound: number,
): WordleState {
  return {
    date: dateStr,
    answer: getAnswerByOffset(dateStr, offset),
    guesses: [],
    letters: emptyLetters(),
    cursor: 0,
    status: 'playing',
    message: null,
    mode,
    extraRound,
  }
}

export function createWordleState(dateStr: string = getBerlinDateString()): WordleState {
  return buildWordleState(dateStr, 0, 'daily', 0)
}

export function createExtraWordleState(prev: WordleState): WordleState {
  const nextExtra = prev.extraRound + 1
  return buildWordleState(prev.date, nextExtra, 'extra', nextExtra)
}

interface LegacyWordleState {
  date: string
  answer: string
  guesses: string[]
  current?: string
  letters?: string[]
  cursor?: number
  status: WordleStatus
  mode?: PlayMode
  extraRound?: number
}

export function loadWordleState(dateStr: string = getBerlinDateString()): WordleState {
  const session = loadDailyProgress<LegacyWordleState>(WORDLE_SESSION_KEY, dateStr)
  if (session && (session.mode ?? 'daily') === 'extra') {
    return hydrateWordleState(session, 'extra')
  }

  const saved = loadDailyProgress<LegacyWordleState>(WORDLE_STORAGE_KEY, dateStr)
  if (saved && saved.answer === getDailyAnswer(dateStr) && (saved.mode ?? 'daily') === 'daily') {
    return hydrateWordleState(saved, 'daily')
  }
  return createWordleState(dateStr)
}

function hydrateWordleState(saved: LegacyWordleState, mode: PlayMode): WordleState {
  let letters = emptyLetters()
  if (saved.letters && saved.letters.length === WORD_LENGTH) {
    letters = saved.letters.map((ch) => (ch ?? '').toUpperCase())
  } else if (typeof saved.current === 'string') {
    const chars = saved.current.toUpperCase().split('')
    for (let i = 0; i < WORD_LENGTH; i++) letters[i] = chars[i] ?? ''
  }
  const filled = letters.filter(Boolean).length
  const cursor =
    typeof saved.cursor === 'number' && saved.cursor >= 0 && saved.cursor < WORD_LENGTH
      ? saved.cursor
      : Math.min(filled, WORD_LENGTH - 1)
  return {
    date: saved.date,
    answer: saved.answer,
    guesses: saved.guesses,
    letters,
    cursor,
    status: saved.status,
    message: null,
    mode,
    extraRound: saved.extraRound ?? 0,
  }
}

export function persistWordleState(state: WordleState): void {
  const { message: _message, ...rest } = state
  if (state.mode === 'extra') {
    saveJson(WORDLE_SESSION_KEY, rest)
    return
  }
  clearKey(WORDLE_SESSION_KEY)
  saveJson(WORDLE_STORAGE_KEY, rest)
}

export function currentWord(state: WordleState): string {
  return state.letters.join('')
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

export function setCursor(state: WordleState, index: number): WordleState {
  if (state.status !== 'playing') return state
  if (index < 0 || index >= WORD_LENGTH) return state
  return { ...state, cursor: index, message: null }
}

export function addLetter(state: WordleState, letter: string): WordleState {
  if (state.status !== 'playing') return state
  const ch = normalizeGermanLetters(letter)
  if (ch.length !== 1) return { ...state, message: null }

  const letters = [...state.letters]
  letters[state.cursor] = ch
  const cursor = Math.min(state.cursor + 1, WORD_LENGTH - 1)
  return { ...state, letters, cursor, message: null }
}

export function removeLetter(state: WordleState): WordleState {
  if (state.status !== 'playing') return state
  const letters = [...state.letters]
  let cursor = state.cursor

  if (letters[cursor]) {
    letters[cursor] = ''
  } else if (cursor > 0) {
    cursor -= 1
    letters[cursor] = ''
  } else {
    return state
  }

  return { ...state, letters, cursor, message: null }
}

export function submitGuess(state: WordleState): WordleState {
  if (state.status !== 'playing') return state

  const result = isValidGuess(currentWord(state))
  if (!result.ok) {
    return { ...state, message: result.reason }
  }

  const guesses = [...state.guesses, result.word]
  if (result.word === state.answer) {
    return {
      ...state,
      guesses,
      letters: emptyLetters(),
      cursor: 0,
      status: 'won',
      message: 'Geschafft! Du hast das Wort gefunden.',
    }
  }

  if (guesses.length >= MAX_GUESSES) {
    return {
      ...state,
      guesses,
      letters: emptyLetters(),
      cursor: 0,
      status: 'lost',
      message: `Leider verloren. Die Lösung war ${state.answer}.`,
    }
  }

  return { ...state, guesses, letters: emptyLetters(), cursor: 0, message: null }
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
