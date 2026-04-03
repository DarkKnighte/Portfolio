import { useEffect, useState } from 'react'
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts'
import { LangIcon, getColor } from './Langicons.jsx'
import './Modal.scss'

export function Modal({ repo, langs, image, context, onClose }) {

  const [activeLang, setActiveLang] = useState(null)

  useEffect(() => {
    const apiLangs = langs.filter((l) => l.source === 'api' && l.value > 0)
    if (apiLangs.length > 0) setActiveLang(apiLangs[0].name)
  }, [langs])

  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  const apiLangs    = langs.filter((l) => l.source === 'api' && l.value > 0)
  const manualLangs = langs.filter((l) => l.source === 'manual')
  const activeData  = apiLangs.find((l) => l.name === activeLang)

  return (
    <div className="project-modal__overlay" onClick={onClose}>
      <div className="project-modal" onClick={(e) => e.stopPropagation()}>

        {/* Header */}
        <div className="project-modal__header">
          <h2 className="project-modal__title">{repo.name}</h2>
          <div className="project-modal__header-actions">
            <a
              href={repo.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="project-modal__github-link"
            >
              GitHub →
            </a>
            <button className="project-modal__close" onClick={onClose}>✕</button>
          </div>
        </div>

        {/* Body — 2 colonnes */}
        <div className="project-modal__body">

          {/* ── Colonne gauche : donut + langages ── */}
          <div className="project-modal__left">

            {/* Donut interactif */}
            {apiLangs.length > 0 && (
              <div className="project-modal__donut">
                <ResponsiveContainer width="100%" height={180}>
                  <PieChart>
                    <Pie
                      data={apiLangs}
                      cx="50%"
                      cy="50%"
                      innerRadius={50}
                      outerRadius={75}
                      paddingAngle={2}
                      dataKey="value"
                      onMouseEnter={(_, index) => setActiveLang(apiLangs[index].name)}
                    >
                      {apiLangs.map((entry) => (
                        <Cell
                          key={entry.name}
                          fill={getColor(entry.name)}
                          opacity={activeLang === entry.name ? 1 : 0.4}
                          stroke="none"
                        />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>

                {/* Centre */}
                <div className="project-modal__donut-center">
                  <span className="project-modal__donut-value">
                    {activeData ? `${activeData.value}%` : ''}
                  </span>
                  <span className="project-modal__donut-label">{activeLang}</span>
                </div>
              </div>
            )}

            {/* Langages détectés (API) */}
            {apiLangs.length > 0 && (
              <div className="project-modal__langs">
                <p className="project-modal__section-label">Langages détectés</p>
                {apiLangs.map((lang) => (
                  <button
                    key={lang.name}
                    className={`project-modal__lang-item ${activeLang === lang.name ? 'project-modal__lang-item--active' : ''}`}
                    onMouseEnter={() => setActiveLang(lang.name)}
                    onClick={() => setActiveLang(lang.name)}
                  >
                    <LangIcon lang={lang.name} size={24} />
                    <span className="project-modal__lang-name">{lang.name}</span>
                    <span className="project-modal__lang-pct" style={{ color: getColor(lang.name) }}>
                      {lang.value}%
                    </span>
                  </button>
                ))}
              </div>
            )}

            {/* Langages manuels (ex: React) */}
            {manualLangs.length > 0 && (
              <div className="project-modal__langs">
                <p className="project-modal__section-label">Technologies</p>
                {manualLangs.map((lang) => (
                  <div key={lang.name} className="project-modal__lang-item">
                    <LangIcon lang={lang.name} size={24} />
                    <span className="project-modal__lang-name">{lang.name}</span>
                  </div>
                ))}
              </div>
            )}

          </div>

          {/* ── Colonne droite : screenshot + descriptions ── */}
          <div className="project-modal__right">

            {/* Screenshot */}
            {image ? (
              <img src={image} alt={repo.name} className="project-modal__image" />
            ) : (
              <div className="project-modal__image-placeholder">
                <span>Pas d'image disponible</span>
              </div>
            )}

            {/* Description GitHub — automatique */}
            {repo.description && (
              <div className="project-modal__desc-block">
                <p className="project-modal__section-label">Description</p>
                {/*
                  Cette description vient directement de GitHub (repo.description).
                  Pour la modifier, change la description de ton repo sur GitHub.
                */}
                <p className="project-modal__description">{repo.description}</p>
              </div>
            )}

            {/* Contexte manuel — à modifier dans PROJECT_CONTEXT dans ProjectsCarousel.jsx */}
            {context && (
              <div className="project-modal__desc-block">
                <p className="project-modal__section-label">Contexte</p>
                {/*
                  Ce texte est défini manuellement dans ProjectsCarousel.jsx
                  dans la constante PROJECT_CONTEXT['nom-du-repo'].
                  Exemples : "Projet de formation", "Projet personnel", etc.
                */}
                <p className="project-modal__description">{context}</p>
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  )
}

export default Modal
