import { useState } from 'react'
import { draftBoard } from '../mockData'

type DraftType = 'snake' | 'linear'

export function DraftPage() {
  const [draftType, setDraftType] = useState<DraftType>('snake')
  const [rounds, setRounds] = useState(15)
  const [secondsPerPick, setSecondsPerPick] = useState(90)
  const [settingsOpen, setSettingsOpen] = useState(false)
  const featuredPlayer = draftBoard[0]
  const queuedPlayers = draftBoard.slice(1, 5)
  const recentActivity = draftBoard.slice(0, 4)
  const clockTeam = 'Gotham Knights'

  return (
    <div className="draft-page space-y-8">
      <section className="draft-hero">
        <div className="draft-hero-headline">
          <h1>Draft Dashboard</h1>
          <p>Focus on your next pick with a clear board, queue, and live draft status.</p>
        </div>
      </section>

      <section className="draft-status-strip">
        <article className="status-item">
          <p>Status</p>
          <strong>Live Draft</strong>
        </article>
        <article className="status-item">
          <p>Round / Pick</p>
          <strong>Round 1, Pick 4</strong>
        </article>
        <article className="status-item">
          <p>On the Clock</p>
          <strong>{clockTeam}</strong>
        </article>
        <article className="status-item timer">
          <p>Time Remaining</p>
          <strong>
            {String(Math.floor(secondsPerPick / 60)).padStart(2, '0')}:
            {String(secondsPerPick % 60).padStart(2, '0')}
          </strong>
        </article>
      </section>

      <div className="draft-grid">
        <section className="draft-board">
          <div className="board-head">
            <h2>Available Players</h2>
            <div className="board-search">
              <span className="material-symbols-outlined">search</span>
              <input placeholder="Search players" type="text" />
            </div>
          </div>

          {featuredPlayer && (
            <article className="featured-prospect">
              <div className="absolute top-0 right-0 p-8 z-10 text-right">
                <p className="prospect-score">94</p>
              </div>
              <div className="relative z-10">
                <span className={`pos pos-${featuredPlayer.pos}`}>{featuredPlayer.pos}</span>
                <h3>{featuredPlayer.name}</h3>
                <p>{featuredPlayer.team} guard with strong projection value and an ADP of {featuredPlayer.adp.toFixed(1)}.</p>
                <div className="prospect-stats">
                  <div>
                    <span>RANK</span>
                    <strong>{featuredPlayer.rank}</strong>
                  </div>
                  <div>
                    <span>ADP</span>
                    <strong>{featuredPlayer.adp.toFixed(1)}</strong>
                  </div>
                  <div>
                    <span>TEAM</span>
                    <strong>{featuredPlayer.team}</strong>
                  </div>
                </div>
              </div>
              <div className="featured-actions">
                <button type="button" className="primary-cta compact">
                  Draft Selected Player
                </button>
                <button type="button" className="glass-cta compact">
                  Add to Queue
                </button>
              </div>
            </article>
          )}

          <div className="prospect-list">
            {draftBoard.map((p) => (
              <article key={p.name} className="prospect-row">
                <span className="rank">{p.rank}</span>
                <div>
                  <p>{p.name}</p>
                  <small>
                    {p.team} · ADP {p.adp.toFixed(1)}
                  </small>
                </div>
                <span className={`pos pos-${p.pos}`}>{p.pos}</span>
                <button type="button" className="queue-button">
                  Queue
                </button>
              </article>
            ))}
          </div>
        </section>

        <aside className="draft-side-column">
          <section className="draft-settings glass-panel">
            <button
              type="button"
              className="settings-toggle"
              aria-expanded={settingsOpen}
              onClick={() => setSettingsOpen((prev) => !prev)}
            >
              <span>Draft Settings</span>
              <span className="material-symbols-outlined">{settingsOpen ? 'expand_less' : 'expand_more'}</span>
            </button>

            {settingsOpen && (
              <>
                <div className="option-group" role="radiogroup" aria-label="Draft format">
                  <label className={`option-tile ${draftType === 'snake' ? 'active' : ''}`}>
                    <input type="radio" name="draftType" checked={draftType === 'snake'} onChange={() => setDraftType('snake')} />
                    <span className="option-title">Snake Draft</span>
                    <span className="option-desc">Order reverses each round for balanced fantasy play.</span>
                  </label>
                  <label className={`option-tile ${draftType === 'linear' ? 'active' : ''}`}>
                    <input type="radio" name="draftType" checked={draftType === 'linear'} onChange={() => setDraftType('linear')} />
                    <span className="option-title">Linear Draft</span>
                    <span className="option-desc">Same pick order every round for fast mock drafts.</span>
                  </label>
                </div>
                <div className="settings-grid">
                  <label className="field">
                    <span>Rounds</span>
                    <input type="number" min={10} max={20} value={rounds} onChange={(e) => setRounds(Number(e.target.value))} />
                  </label>
                  <label className="field">
                    <span>Seconds per pick</span>
                    <input
                      type="number"
                      min={30}
                      max={300}
                      step={15}
                      value={secondsPerPick}
                      onChange={(e) => setSecondsPerPick(Number(e.target.value))}
                    />
                  </label>
                </div>
              </>
            )}
          </section>

          <section className="queue-panel">
            <p>Your Queue</p>
            {queuedPlayers.map((player) => (
              <div key={player.name}>
                <span>{player.name}</span>
                <small>
                  {player.pos} · ADP {player.adp.toFixed(1)}
                </small>
              </div>
            ))}
          </section>
        </aside>
      </div>

      <section className="draft-feed">
        <h2>
          <span className="material-symbols-outlined">history</span>
          Recent Picks
        </h2>
        <div className="space-y-3">
          {recentActivity.map((player, index) => (
            <article key={`${player.name}-${index}`} className="activity-card">
              <span>{String(index + 1).padStart(2, '0')}</span>
              <div>
                <p>{player.name}</p>
                <small>
                  Selected by {index % 2 === 0 ? 'Gotham Knights' : 'Metro Hawks'} · {player.team}
                </small>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  )
}
