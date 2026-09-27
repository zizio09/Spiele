import { Link, Outlet, useLocation } from 'react-router-dom'
import { formatBerlinDateDisplay, getBerlinDateString } from '../lib/berlinDate'

const NAV = [
  { to: '/wordle', label: 'Wordle' },
  { to: '/viererkette', label: 'Viererkette' },
  { to: '/sudoku', label: 'Sudoku' },
  { to: '/paarsuche', label: 'Paarsuche' },
]

export function Layout() {
  const location = useLocation()
  const today = formatBerlinDateDisplay(getBerlinDateString())
  const isHome = location.pathname === '/'

  return (
    <div className="app-shell">
      <a className="skip-link" href="#inhalt">
        Zum Inhalt springen
      </a>
      <header className="site-header">
        <div className="site-header__inner">
          <Link to="/" className="brand" aria-label="Tagesrunde – Startseite">
            <span className="brand__mark" aria-hidden="true" />
            <span className="brand__text">Tagesrunde</span>
          </Link>
          <p className="site-date" aria-live="polite">
            {today}
          </p>
          <nav className="site-nav" aria-label="Spiele">
            {NAV.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className={location.pathname === item.to ? 'is-active' : undefined}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </header>
      <main id="inhalt" className={isHome ? 'main main--home' : 'main'}>
        <Outlet />
      </main>
      <footer className="site-footer">
        <p>Vier Tagesrätsel · Mitternacht Europe/Berlin · Fortschritt lokal gespeichert</p>
      </footer>
    </div>
  )
}
