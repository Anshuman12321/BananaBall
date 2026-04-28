import { useEffect, useState } from 'react'
import { apiUrl } from '../lib/api'

type HelloResponse = { message: string }

export function HomePage() {
  const [data, setData] = useState<HelloResponse | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let cancelled = false
    fetch(apiUrl('/api/hello'))
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        return res.json() as Promise<HelloResponse>
      })
      .then((json) => {
        if (!cancelled) {
          setData(json)
          setError(null)
        }
      })
      .catch((e: unknown) => {
        if (!cancelled) {
          setError(e instanceof Error ? e.message : 'Request failed')
          setData(null)
        }
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })
    return () => {
      cancelled = true
    }
  }, [])

  return (
    <div className="page">
      <header className="page-header">
        <h1>Fantasy League</h1>
        <p className="lede">
          Navigate with the menu above to manage your draft settings, roster, and
          check the league table. The frontend handles all interaction and
          presentation; the API powers live data as you connect it.
        </p>
      </header>

      <section className="card" aria-live="polite">
        <h2>API status</h2>
        {loading && <p className="muted">Checking backend…</p>}
        {!loading && error && (
          <p className="error-msg">
            Could not reach the backend ({error}). Start it with{' '}
            <code>uvicorn main:app --reload</code> from <code>backend</code>.
          </p>
        )}
        {!loading && !error && data && (
          <p className="ok-msg">
            <code>/api/hello</code> → {data.message}
          </p>
        )}
      </section>
    </div>
  )
}
