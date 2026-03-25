import { useEffect, useState } from 'react'
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts'
import './Chart.scss'

const GITHUB_USERNAME = 'DarkKnighte'

const LANG_COLORS = {
  JavaScript:   '#f0db4f',
  TypeScript:   '#3178c6',
  Python:       '#306998',
  HTML:         '#e34c26',
  CSS:          '#563d7c',
  SCSS:         '#c6538c',
  Vue:          '#42b883',
  React:        '#61dbfb',
  'C#':         '#178600',
  Java:         '#b07219',
  PHP:          '#4f5d95',
  Ruby:         '#701516',
  Go:           '#00add8',
  Rust:         '#dea584',
  Shell:        '#89e051',
  default:      '#888888',
}

const getColor = (lang) => LANG_COLORS[lang] || LANG_COLORS.default

export function GithubLanguages() {
  const [languages, setLanguages] = useState([])
  const [loading, setLoading]     = useState(true)
  const [error, setError]         = useState(null)
  const [active, setActive]       = useState(null)

  useEffect(() => {
    const fetchLanguages = async () => {
      try {
        // 1. Récupère tous les repos publics
        const reposRes = await fetch(
          `https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100`
        )
        if (!reposRes.ok) throw new Error('Impossible de récupérer les repos')
        const repos = await reposRes.json()

        // 2. Pour chaque repo, récupère les langages
        const langPromises = repos.map((repo) =>
          fetch(repo.languages_url).then((r) => r.json())
        )
        const langResults = await Promise.all(langPromises)

        // 3. Agrège les octets par langage
        const totals = {}
        langResults.forEach((langs) => {
          Object.entries(langs).forEach(([lang, bytes]) => {
            totals[lang] = (totals[lang] || 0) + bytes
          })
        })

        // 4. Transforme en tableau trié
        const totalBytes = Object.values(totals).reduce((a, b) => a + b, 0)
        const data = Object.entries(totals)
          .sort(([, a], [, b]) => b - a)
          .slice(0, 8) // top 8 langages
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
  const totalRepos = languages.length

  if (loading) {
    return (
      <div className="github-languages github-languages--loading">
        <p>Chargement des langages...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="github-languages github-languages--error">
        <p>Erreur : {error}</p>
      </div>
    )
  }

  return (
    <div className="github-languages">

      {/* Header */}
      <div className="github-languages__header">
        <div>
          <h3 className="github-languages__title">Langages utilisés</h3>
          <p className="github-languages__subtitle">GitHub — {GITHUB_USERNAME}</p>
        </div>
        {active && (
          <span className="github-languages__badge" style={{ borderColor: getColor(active), color: getColor(active) }}>
            {active}
          </span>
        )}
      </div>

      {/* Donut chart */}
      <div className="github-languages__chart">
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
            <Tooltip
              formatter={(value) => [`${value}%`, 'Utilisation']}
              contentStyle={{
                background: 'var(--card)',
                border: '1px solid var(--border)',
                borderRadius: '8px',
                color: 'var(--foreground)',
              }}
            />
          </PieChart>
        </ResponsiveContainer>

        {/* Centre du donut */}
        <div className="github-languages__center">
          <span className="github-languages__center-value">
            {activeData ? `${activeData.value}%` : ''}
          </span>
          <span className="github-languages__center-label">
            {active || 'Langages'}
          </span>
        </div>
      </div>

      {/* Légende */}
      <div className="github-languages__legend">
        {languages.map((lang) => (
          <button
            key={lang.name}
            className={`github-languages__legend-item ${active === lang.name ? 'github-languages__legend-item--active' : ''}`}
            onMouseEnter={() => setActive(lang.name)}
            onClick={() => setActive(lang.name)}
          >
            <span
              className="github-languages__legend-dot"
              style={{ background: getColor(lang.name) }}
            />
            {lang.name}
          </button>
        ))}
      </div>

      {/* Barre du langage actif */}
      {activeData && (
        <div className="github-languages__bar-section">
          <div className="github-languages__bar-label">
            <span>{activeData.name}</span>
            <span>{activeData.value}%</span>
          </div>
          <div className="github-languages__bar-track">
            <div
              className="github-languages__bar-fill"
              style={{
                width: `${activeData.value}%`,
                background: getColor(activeData.name),
              }}
            />
          </div>
        </div>
      )}

    </div>
  )
}

export default GithubLanguages
