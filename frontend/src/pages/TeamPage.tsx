import { bench, starters } from '../mockData'

export function TeamPage() {
  return (
    <div className="page">
      <header className="page-header">
        <div className="team-head">
          <div>
            <h1>Team management</h1>
            <p className="lede">
              Midnight Blitz · <span className="record">9–2</span> · #1 in standings
            </p>
          </div>
          <div className="actions">
            <button type="button" className="btn-secondary">
              Propose trade
            </button>
            <button type="button" className="btn-primary">
              Add / drop
            </button>
          </div>
        </div>
      </header>

      <section className="card">
        <h2>Starting lineup</h2>
        <div className="table-wrap">
          <table className="data-table">
            <thead>
              <tr>
                <th>Slot</th>
                <th>Player</th>
                <th>Pos</th>
                <th>NFL</th>
                <th>Proj</th>
              </tr>
            </thead>
            <tbody>
              {starters.map((row) => (
                <tr key={row.slot + row.player}>
                  <td className="slot-label">{row.slot}</td>
                  <td className="name">{row.player}</td>
                  <td>
                    <span className={`pos pos-${row.pos === 'FLEX' ? 'FLEX' : row.pos}`}>
                      {row.pos}
                    </span>
                  </td>
                  <td>{row.nflTeam}</td>
                  <td>{row.proj?.toFixed(1) ?? '—'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="card">
        <h2>Bench</h2>
        <div className="table-wrap">
          <table className="data-table">
            <thead>
              <tr>
                <th>Slot</th>
                <th>Player</th>
                <th>Pos</th>
                <th>NFL</th>
                <th>Proj</th>
              </tr>
            </thead>
            <tbody>
              {bench.map((row) => (
                <tr key={row.player}>
                  <td className="slot-label">{row.slot}</td>
                  <td className="name">{row.player}</td>
                  <td>
                    <span className={`pos pos-${row.pos}`}>{row.pos}</span>
                  </td>
                  <td>{row.nflTeam}</td>
                  <td>{row.proj?.toFixed(1) ?? '—'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  )
}
