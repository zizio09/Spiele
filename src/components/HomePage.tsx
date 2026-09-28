import { Link } from 'react-router-dom'
import heroArt from '../assets/hero.svg'

const GAMES = [
  {
    to: '/wordle',
    title: 'Wordle',
    text: 'Sechs Versuche für das deutsche Fünf-Buchstaben-Wort des Tages.',
  },
  {
    to: '/viererkette',
    title: 'Viererkette',
    text: 'Sechzehn Begriffe, vier farbige Gruppen – Verbindungen erkennen, knapp daneben zählen.',
  },
  {
    to: '/sudoku',
    title: 'Sudoku',
    text: 'Klassisches 9×9 mit drei Schwierigkeitsstufen und Notizen.',
  },
  {
    to: '/paarsuche',
    title: 'Paarsuche',
    text: 'Acht Bildpaare aufdecken – ein festes Tageslayout für alle.',
  },
]

export function HomePage() {
  return (
    <div className="home">
      <section className="hero" aria-labelledby="hero-title">
        <div className="hero__visual" aria-hidden="true">
          <img src={heroArt} alt="" className="hero__img" />
        </div>
        <div className="hero__copy">
          <p className="hero__brand">Tagesrunde</p>
          <h1 id="hero-title">Vier Spiele. Ein Tag. Deine Runde.</h1>
          <p className="hero__lead">
            Jeden Tag neue Rätsel – Wordle, Viererkette, Sudoku und Paarsuche, komplett auf Deutsch.
          </p>
          <div className="hero__actions">
            <Link className="btn btn--primary" to="/wordle">
              Mit Wordle starten
            </Link>
            <Link className="btn btn--ghost" to="/viererkette">
              Zur Viererkette
            </Link>
            <Link className="btn btn--ghost" to="/preview/celebration">
              Vorschau Feier
            </Link>
          </div>
        </div>
      </section>

      <section className="game-picker" aria-labelledby="picker-title">
        <h2 id="picker-title">Die vier Spiele</h2>
        <p className="section-lead">Wähle ein Spiel – jedes hat genau ein Tagesrätsel.</p>
        <ul className="game-picker__list">
          {GAMES.map((game, i) => (
            <li key={game.to} style={{ animationDelay: `${0.05 * i}s` }}>
              <Link to={game.to} className="game-picker__link">
                <span className="game-picker__title">{game.title}</span>
                <span className="game-picker__text">{game.text}</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </div>
  )
}
