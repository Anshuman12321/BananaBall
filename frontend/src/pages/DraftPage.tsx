import { useState } from 'react'
import { draftBoard } from '../mockData'

type DraftType = 'snake' | 'linear'

export function DraftPage() {
  const [draftType, setDraftType] = useState<DraftType>('snake')
  const [rounds, setRounds] = useState(15)
  const [secondsPerPick, setSecondsPerPick] = useState(90)

  return (
    <div className="page">
      <header className="page-header">
        <h1>Draft options</h1>
        <p className="lede">
          Configure how your league runs its draft. These controls are UI-only for
          now; wire them to your FastAPI models when you persist settings.
        </p>
      </header>

      <div className="grid-2">
        <section className="card">
          <h2>Draft format</h2>
          <div className="option-group" role="radiogroup" aria-label="Draft format">
            <label className={`option-tile ${draftType === 'snake' ? 'active' : ''}`}>
              <input
                type="radio"
                name="draftType"
                checked={draftType === 'snake'}
                onChange={() => setDraftType('snake')}
              />
              <span className="option-title">Snake draft</span>
              <span className="option-desc">
                Order reverses each round (1–N, N–1, …). Most common for fantasy.
              </span>
            </label>
            <label className={`option-tile ${draftType === 'linear' ? 'active' : ''}`}>
              <input
                type="radio"
                name="draftType"
                checked={draftType === 'linear'}
                onChange={() => setDraftType('linear')}
              />
              <span className="option-title">Linear draft</span>
              <span className="option-desc">
                Same pick order every round. Faster for mock drafts or simple leagues.
              </span>
            </label>
          </div>
        </section>

        <section className="card">
          <h2>Timing & length</h2>
          <label className="field">
            <span>Rounds</span>
            <input
              type="number"
              min={10}
              max={20}
              value={rounds}
              onChange={(e) => setRounds(Number(e.target.value))}
            />
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
          <p className="muted small">
            Roster slots follow league rules (QB/RB/WR/TE/FLEX/K/DEF + bench). Adjust
            in league settings when you add backend support.
          </p>
        </section>
      </div>

      <section className="card">
        <div className="card-head">
          <h2>Available players</h2>
          <span className="pill">Mock board</span>
        </div>
        <div className="table-wrap">
          <table className="data-table">
            <thead>
              <tr>
                <th>Rank</th>
                <th>Player</th>
                <th>Pos</th>
                <th>NFL</th>
                <th>ADP</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {draftBoard.map((p) => (
                <tr key={p.name}>
                  <td>{p.rank}</td>
                  <td className="name">{p.name}</td>
                  <td>
                    <span className={`pos pos-${p.pos}`}>{p.pos}</span>
                  </td>
                  <td>{p.team}</td>
                  <td>{p.adp.toFixed(1)}</td>
                  <td>
                    <button type="button" className="btn-ghost">
                      Queue
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  )
}
