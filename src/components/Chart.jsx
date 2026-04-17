import { useEffect, useState } from 'react'
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts'
import { getColor } from './Langicons.jsx'
import './Chart.scss'
import { fetchWithCache } from '../lib/githubCache.js'

const GITHUB_USERNAME = 'DarkKnighte'
const EXCLUDED_LANGS  = ['Shell', 'Dockerfile', 'HCL', 'Makefile', 'Batchfile', 'PowerShell']
fetchWithCache(`https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100`)

export function Chart() {
  const [languages, setLanguages] = useState([])
  const [loading, setLoading]     = useState(true)
  const [error, setError]         = useState(null)
  const [active, setActive]       = useState(null)

  useEffect(() => {
    const fetchLanguages = async () => {
      try {
        const reposRes = await fetchWithCache(
          `https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100`
        )
        if (!reposRes.ok) throw new Error('Impossible de récupérer les repos')
        const repos = await reposRes.json()

        const langPromises = repos.map((repo) =>
          fetchWithCache(repo.languages_url).then((r) => r.json())
        )
        const langResults = await Promise.all(langPromises)

        const totals = {}
        langResults.forEach((langs) => {
          Object.entries(langs).forEach(([lang, bytes]) => {
            totals[lang] = (totals[lang] || 0) + bytes
          })
        })

        const totalBytes = Object.values(totals).reduce((a, b) => a + b, 0)
        const data = Object.entries(totals)
          .filter(([name]) => !EXCLUDED_LANGS.includes(name))
          .sort(([, a], [, b]) => b - a)
          .slice(0, 8)
          .map(([name, bytes]) => ({
            name,
            value: Math.round((bytes / totalBytes) * 100),
            bytes,
          }))

        setLanguages(data)
        setActive(data[0]?.name || null)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchLanguages()
  }, [])

  const activeData = languages.find((l) => l.name === active)

  if (loading) return <div className="chart chart--loading"><p>Chargement...</p></div>
  if (error)   return <div className="chart chart--error"><p>Erreur : {error}</p></div>

  return (
    <div className="chart">

      <div className="chart__header">
        <div>
          <h3 className="chart__title">Langages utilisés</h3>
          <p className="chart__subtitle">
           <a href={`https://github.com/${GITHUB_USERNAME}`}
            target="_blank"
            rel="noopener noreferrer"
            className="chart__subtitle-link"
          >
            GitHub — {GITHUB_USERNAME}
          </a>
        </p>
        </div>
        {active && (
          <span className="chart__badge" style={{ borderColor: getColor(active), color: getColor(active) }}>
            {active}
          </span>
        )}
      </div>

      <div className="chart__donut">
        <ResponsiveContainer width="100%" height={200}>
          <PieChart>
            <Pie
              data={languages}
              cx="50%"
              cy="50%"
              innerRadius={65}
              outerRadius={90}
              paddingAngle={2}
              dataKey="value"
              onMouseEnter={(_, index) => setActive(languages[index].name)}
            >
              {languages.map((entry) => (
                <Cell
                  key={entry.name}
                  fill={getColor(entry.name)}
                  opacity={active === entry.name ? 1 : 0.4}
                  stroke="none"
                />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        <div className="chart__center">
          <span className="chart__center-value">{activeData ? `${activeData.value}%` : ''}</span>
          <span className="chart__center-label">{active || 'Langages'}</span>
        </div>
      </div>

      <div className="chart__legend">
        {languages.map((lang) => (
          <button
            key={lang.name}
            className={`chart__legend-item ${active === lang.name ? 'chart__legend-item--active' : ''}`}
            onMouseEnter={() => setActive(lang.name)}
            onClick={() => setActive(lang.name)}
          >
            <span className="chart__legend-dot" style={{ background: getColor(lang.name) }} />
            {lang.name}
          </button>
        ))}
      </div>

      {activeData && (
        <div className="chart__bar-section">
          <div className="chart__bar-label">
            <span>{activeData.name}</span>
            <span>{activeData.value}%</span>
          </div>
          <div className="chart__bar-track">
            <div
              className="chart__bar-fill"
              style={{ width: `${activeData.value}%`, background: getColor(activeData.name) }}
            />
          </div>
        </div>
      )}

    </div>
  )
}

export default Chart
