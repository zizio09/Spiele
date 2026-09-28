import { useEffect, useId, useState } from 'react'
import { CelebrationActions } from '../../components/CelebrationActions'
import { RoundBadge } from '../../components/RoundBadge'
import { WinCelebration } from '../../components/WinCelebration'
import { DIFFICULTY_LABEL } from '../../data/viererkette/puzzles'
import {
  formatAverageScore,
  loadViererketteLifetimeStats,
  recordViererketteWin,
  winRecordKey,
  type ViererketteLifetimeStats,
} from './lifetimeStats'
import {
  MAX_MISTAKES,
  START_POINTS,
  clearSelection,
  createExtraViererketteState,
  loadViererketteSettings,
  loadViererketteState,
  markStatsRecorded,
  persistViererketteSettings,
  persistViererketteState,
  shuffleBoard,
  submitGroup,
  toggleSelect,
  type TermSize,
  type ViererketteSettings,
  type ViererketteState,
} from './viererketteLogic'

export function ViererkettePage() {
  const [state, setState] = useState<ViererketteState>(() => loadViererketteState())
  const [settings, setSettings] = useState<ViererketteSettings>(() => loadViererketteSettings())
  const [lifetime, setLifetime] = useState<ViererketteLifetimeStats>(() =>
    loadViererketteLifetimeStats(),
  )
  const [settingsOpen, setSettingsOpen] = useState(false)
  const settingsTitleId = useId()

  useEffect(() => {
    persistViererketteState(state)
  }, [state])

  useEffect(() => {
    persistViererketteSettings(settings)
  }, [settings])

  useEffect(() => {
    if (state.status === 'won' && !state.statsRecorded) {
      const key = winRecordKey({
        date: state.date,
        puzzleId: state.puzzleId,
        mode: state.mode,
        extraRound: state.extraRound,
      })
      setLifetime(recordViererketteWin(state.points, key))
      setState((s) => markStatsRecorded(s))
    }
  }, [state.status, state.statsRecorded, state.points, state.date, state.puzzleId, state.mode, state.extraRound])

  const remaining = MAX_MISTAKES - state.mistakes
  const finished = state.status === 'won' || state.status === 'lost'

  return (
    <div
      className={[
        'game-page viererkette-page',
        settings.darkMode ? 'vk--dark' : '',
        `vk--size-${settings.termSize}`,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      <header className="game-header">
        <div className="vk-title-row">
          <h1>Viererkette</h1>
          <button
            type="button"
            className="vk-settings-btn"
            aria-label="Einstellungen öffnen"
            aria-expanded={settingsOpen}
            aria-controls="vk-settings"
            onClick={() => setSettingsOpen((o) => !o)}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
              <path
                fill="currentColor"
                d="M19.14 12.94c.04-.31.06-.63.06-.94s-.02-.63-.06-.94l2.03-1.58a.5.5 0 0 0 .12-.64l-1.92-3.32a.5.5 0 0 0-.6-.22l-2.39.96a7.07 7.07 0 0 0-1.63-.94l-.36-2.54a.5.5 0 0 0-.5-.42h-3.84a.5.5 0 0 0-.5.42l-.36 2.54c-.59.24-1.13.55-1.63.94l-2.39-.96a.5.5 0 0 0-.6.22L2.77 8.84a.5.5 0 0 0 .12.64l2.03 1.58c-.04.31-.06.63-.06.94s.02.63.06.94l-2.03 1.58a.5.5 0 0 0-.12.64l1.92 3.32c.14.24.43.34.68.24l2.39-.96c.5.39 1.04.71 1.63.94l.36 2.54c.05.24.26.42.5.42h3.84c.24 0 .45-.18.5-.42l.36-2.54c.59-.24 1.13-.55 1.63-.94l2.39.96c.25.1.54 0 .68-.24l1.92-3.32a.5.5 0 0 0-.12-.64l-2.03-1.58zM12 15.5A3.5 3.5 0 1 1 12 8.5a3.5 3.5 0 0 1 0 7z"
              />
            </svg>
          </button>
        </div>
        <p>
          Ordne 16 Begriffe in vier thematische Gruppen. Manchmal verbindet die Bedeutung, manchmal
          eine Silbe oder ein verstecktes Muster – Vorsicht vor falschen Fährten. Auch die letzte
          Gruppe musst du selbst bestätigen. Jeden Tag um Mitternacht (Europe/Berlin) gibt es ein
          neues Rätsel.
        </p>
      </header>

      <RoundBadge mode={state.mode} />

      <div className="vk-lifetime" aria-label="Lebensstatistik Viererkette">
        <div>
          <span className="vk-lifetime__label">Spiele</span>
          <strong>{lifetime.gamesWon}</strong>
        </div>
        <div>
          <span className="vk-lifetime__label">Punkteschnitt</span>
          <strong>{formatAverageScore(lifetime)}</strong>
        </div>
        <div>
          <span className="vk-lifetime__label">Höchste Punktzahl</span>
          <strong>{lifetime.gamesWon > 0 ? lifetime.highestScore : '–'}</strong>
        </div>
      </div>

      {settingsOpen && (
        <div
          id="vk-settings"
          className="vk-settings"
          role="dialog"
          aria-labelledby={settingsTitleId}
        >
          <h2 id={settingsTitleId}>Einstellungen</h2>
          <label className="vk-settings__row">
            <span>Dunkelmodus</span>
            <input
              type="checkbox"
              checked={settings.darkMode}
              onChange={(e) => setSettings((s) => ({ ...s, darkMode: e.target.checked }))}
            />
          </label>
          <fieldset className="vk-settings__row">
            <legend>Begriffsgröße</legend>
            {(
              [
                ['klein', 'Kleiner'],
                ['normal', 'Normal'],
                ['gross', 'Größer'],
              ] as const
            ).map(([value, label]) => (
              <label key={value} className="vk-settings__radio">
                <input
                  type="radio"
                  name="termSize"
                  checked={settings.termSize === value}
                  onChange={() => setSettings((s) => ({ ...s, termSize: value as TermSize }))}
                />
                {label}
              </label>
            ))}
          </fieldset>
          <button type="button" className="btn btn--ghost" onClick={() => setSettingsOpen(false)}>
            Schließen
          </button>
        </div>
      )}

      <div className="vk-score" aria-live="polite">
        <div className="vk-score__label">
          <span>Punkte</span>
          <strong>
            {state.points} / {START_POINTS}
          </strong>
        </div>
        <div
          className="vk-score__track"
          role="progressbar"
          aria-label={`Punkte: ${state.points} von ${START_POINTS}`}
          aria-valuemin={0}
          aria-valuemax={START_POINTS}
          aria-valuenow={state.points}
        >
          <div
            className={[
              'vk-score__fill',
              state.points <= 25 ? 'is-critical' : state.points <= 50 ? 'is-low' : '',
            ]
              .filter(Boolean)
              .join(' ')}
            style={{ width: `${(state.points / START_POINTS) * 100}%` }}
          />
        </div>
        {state.status === 'playing' && remaining <= 1 && (
          <p className="vk-score__warn">Letzter Versuch!</p>
        )}
      </div>

      <div className="vk-toolbar">
        <button
          type="button"
          className="btn btn--ghost"
          onClick={() => setState((s) => clearSelection(s))}
          disabled={state.status !== 'playing' || state.selected.length === 0}
        >
          Auswahl löschen
        </button>
        <button
          type="button"
          className="btn btn--ghost"
          onClick={() => setState((s) => shuffleBoard(s))}
          disabled={state.status !== 'playing'}
        >
          Mischen
        </button>
        <button
          type="button"
          className="btn btn--primary"
          onClick={() => setState((s) => submitGroup(s))}
          disabled={state.status !== 'playing' || state.selected.length !== 4}
        >
          Auswahl bestätigen
        </button>
      </div>

      <p className="vk-legend" aria-hidden="true">
        <span className="vk-dot vk-dot--green">Leicht</span>
        <span className="vk-dot vk-dot--yellow">Mittel</span>
        <span className="vk-dot vk-dot--red">Anspruchsvoll</span>
        <span className="vk-dot vk-dot--purple">Besonders knifflig</span>
      </p>

      {state.message && (
        <p
          className={`game-message ${
            state.feedback === 'one-off'
              ? 'vk-feedback--one-off'
              : state.feedback === 'no-match'
                ? 'vk-feedback--no-match'
                : state.feedback === 'correct'
                  ? 'vk-feedback--correct'
                  : ''
          } ${
            state.feedback === 'one-off' || state.feedback === 'no-match' ? 'vk-feedback--shake' : ''
          }`}
          role="status"
        >
          {state.message}
        </p>
      )}

      {finished && <WinCelebration outcome={state.status === 'won' ? 'won' : 'finished'} />}

      {state.status === 'won' && (
        <p className="game-result" role="status">
          Geschafft mit {state.points} von {START_POINTS} Punkten.
        </p>
      )}

      {finished && (
        <CelebrationActions onPlayAgain={() => setState((s) => createExtraViererketteState(s))} />
      )}

      <div className="vk-solved" aria-live="polite">
        {state.solved.map((group) => (
          <div
            key={group.category}
            className={`vk-solved__group vk-solved__group--${group.difficulty}`}
          >
            <h2>
              {group.category}
              <span className="vk-diff-label"> · {DIFFICULTY_LABEL[group.difficulty]}</span>
            </h2>
            <p className="vk-solved__expl">{group.explanation}</p>
            <p>{group.terms.join(' · ')}</p>
          </div>
        ))}
      </div>

      {state.board.length > 0 && (
        <div
          className={`vk-grid ${
            state.feedback === 'one-off' || state.feedback === 'no-match' ? 'vk-grid--shake' : ''
          }`}
          role="list"
          aria-label="Begriffsfeld"
        >
          {state.board.map((term) => {
            const selected = state.selected.includes(term)
            return (
              <button
                key={term}
                type="button"
                role="listitem"
                className={`vk-tile ${selected ? 'is-selected' : ''}`}
                aria-pressed={selected}
                disabled={state.status !== 'playing'}
                onClick={() => setState((s) => toggleSelect(s, term))}
              >
                {term}
              </button>
            )
          })}
        </div>
      )}
    </div>
  )
}
