import type { AppRoute } from './useHashRoute'
import { useHashRoute } from './useHashRoute'
import { DraftPage } from './pages/DraftPage'
import { HomePage } from './pages/HomePage'
import { StandingsPage } from './pages/StandingsPage'
import { TeamPage } from './pages/TeamPage'
import './App.css'

const nav: { route: AppRoute; label: string }[] = [
  { route: 'home', label: 'Home' },
  { route: 'draft', label: 'Draft' },
  { route: 'team', label: 'My team' },
  { route: 'standings', label: 'Standings' },
]

function App() {
  const [route, navigate] = useHashRoute()

  return (
    <div className="app">
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <header className="app-header">
        <div className="brand">
          <span className="brand-mark" aria-hidden="true" />
          <div>
            <span className="brand-title">BananaBall Fantasy League</span>
            <span className="brand-sub">Capstone II</span>
          </div>
        </div>
        <nav className="main-nav" aria-label="Main">
          <ul>
            {nav.map(({ route: r, label }) => (
              <li key={r}>
                <button
                  type="button"
                  className={route === r ? 'nav-link active' : 'nav-link'}
                  onClick={() => navigate(r)}
                  aria-current={route === r ? 'page' : undefined}
                >
                  {label}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </header>

      <main id="main" className="app-main">
        {route === 'home' && <HomePage />}
        {route === 'draft' && <DraftPage />}
        {route === 'team' && <TeamPage />}
        {route === 'standings' && <StandingsPage />}
      </main>
    </div>
  )
}

export default App
