import { Link } from 'react-router-dom'

type GameCard = {
  to: string
  title: string
  hint: string
  text: string
  tone: 'wordle' | 'viererkette' | 'sudoku' | 'paarsuche'
}

const GAMES: GameCard[] = [
  {
    to: '/wordle',
    title: 'Wordle',
    hint: 'Finde das Wort mit fünf Buchstaben',
    text: 'Sechs Versuche für das deutsche Tageswort – klar, ruhig und ohne Ablenkung.',
    tone: 'wordle',
  },
  {
    to: '/viererkette',
    title: 'Viererkette',
    hint: 'Ordne 16 Begriffe in vier Gruppen',
    text: 'Vier Verbindungen erkennen. Ein Fehler ist noch okay – zwei daneben und die Gruppe geht zurück.',
    tone: 'viererkette',
  },
  {
    to: '/sudoku',
    title: 'Sudoku',
    hint: 'Fülle das 9×9-Raster richtig aus',
    text: 'Klassisches Sudoku mit drei Schwierigkeitsstufen, Hilfszahlen und großer Schrift.',
    tone: 'sudoku',
  },
  {
    to: '/paarsuche',
    title: 'Paarsuche',
    hint: 'Finde die acht Bildpaare',
    text: 'Zwei gleiche Bilder aufdecken. Gefundene Paare wandern nach links – das Feld wird übersichtlicher.',
    tone: 'paarsuche',
  },
]

function WordleArt() {
  const cells = ['W', 'O', 'R', 'D', 'L', 'E', '', '', '']
  return (
    <div className="game-card__symbol game-card__symbol--wordle" aria-hidden="true">
      {cells.map((letter, i) => (
        <span
          key={i}
          className={`game-card__tile ${letter ? 'has-letter' : ''} ${letter === 'E' ? 'is-accent' : ''}`}
        >
          {letter}
        </span>
      ))}
    </div>
  )
}

function ViererketteArt() {
  const shades = [3, 2, 1, 0, 2, 3, 0, 1, 1, 0, 3, 2, 0, 1, 2, 3]
  return (
    <div className="game-card__symbol game-card__symbol--viererkette" aria-hidden="true">
      {shades.map((shade, i) => (
        <span key={i} className={`game-card__cell shade-${shade}`} />
      ))}
    </div>
  )
}

function SudokuArt() {
  const cells = ['5', '', '3', '', '7', '', '', '1', '9']
  return (
    <div className="game-card__symbol game-card__symbol--sudoku" aria-hidden="true">
      {cells.map((n, i) => (
        <span key={i} className={`game-card__sudoku-cell ${n ? 'has-num' : ''}`}>
          {n}
        </span>
      ))}
    </div>
  )
}

function PaarsucheArt() {
  return (
    <div className="game-card__symbol game-card__symbol--paarsuche" aria-hidden="true">
      <span className="game-card__pair">
        <span className="game-card__pair-face" />
      </span>
      <span className="game-card__pair">
        <span className="game-card__pair-face" />
      </span>
    </div>
  )
}

function GameArt({ tone }: { tone: GameCard['tone'] }) {
  switch (tone) {
    case 'wordle':
      return <WordleArt />
    case 'viererkette':
      return <ViererketteArt />
    case 'sudoku':
      return <SudokuArt />
    case 'paarsuche':
      return <PaarsucheArt />
  }
}

export function HomePage() {
  return (
    <div className="home home--spiele">
      <section className="spiele-banner" aria-labelledby="spiele-title">
        <div className="spiele-banner__media" aria-hidden="true">
          <picture>
            <source srcSet="/images/home-banner.webp" type="image/webp" />
            <img
              src="/images/home-banner.jpg"
              alt=""
              width={1600}
              height={900}
              decoding="async"
              fetchPriority="high"
            />
          </picture>
        </div>
        <div className="spiele-banner__shade" aria-hidden="true" />
        <header className="spiele-header">
          <h1 id="spiele-title" className="spiele-header__title">
            Spiele
          </h1>
          <p className="spiele-header__lead">Vier Tagesrätsel – groß, klar und ohne Werbung.</p>
        </header>
      </section>

      <section className="spiele-grid" aria-label="Spielauswahl">
        <ul className="spiele-grid__list">
          {GAMES.map((game) => (
            <li key={game.to}>
              <Link to={game.to} className={`game-card game-card--${game.tone}`}>
                <div className="game-card__body">
                  <p className="game-card__hint">{game.hint}</p>
                  <h2 className="game-card__title">{game.title}</h2>
                  <p className="game-card__text">{game.text}</p>
                </div>
                <div className="game-card__art">
                  <GameArt tone={game.tone} />
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </div>
  )
}
