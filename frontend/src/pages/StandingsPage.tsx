import { standings } from '../mockData'

export function StandingsPage() {
  return (
    <div className="page">
      <header className="page-header">
        <h1>League standings</h1>
        <p className="lede">
          Regular season · sorted by wins, then points for. Connect this table to
          your API for live scores and playoff seeding.
        </p>
      </header>

      <section className="card">
        <div className="table-wrap">
          <table className="data-table standings">
            <thead>
              <tr>
                <th>Rank</th>
                <th>Team</th>
                <th>Owner</th>
                <th>W–L–T</th>
                <th>PF</th>
                <th>PA</th>
                <th>Streak</th>
              </tr>
            </thead>
            <tbody>
              {standings.map((row) => (
                <tr key={row.team} className={row.owner === 'You' ? 'highlight-row' : undefined}>
                  <td>{row.rank}</td>
                  <td className="name">{row.team}</td>
                  <td>{row.owner}</td>
                  <td>
                    {row.w}–{row.l}–{row.t}
                  </td>
                  <td>{row.pf.toFixed(1)}</td>
                  <td>{row.pa.toFixed(1)}</td>
                  <td>{row.streak}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  )
}
