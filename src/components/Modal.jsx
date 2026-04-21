import { useEffect, useState } from 'react'
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts'
import { LangIcon, getColor } from './Langicons.jsx'
import './Modal.scss'

export function Modal({ repo, langs, images = [], context, experience, onClose }) {
  const [activeLang, setActiveLang]   = useState(null)
  const [currentImg, setCurrentImg]   = useState(0)

  useEffect(() => {
    const apiLangs = langs.filter((l) => l.source === 'api' && l.value > 0)
    if (apiLangs.length > 0) setActiveLang(apiLangs[0].name)
  }, [langs])

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowRight') setCurrentImg((i) => (i + 1) % images.length)
      if (e.key === 'ArrowLeft')  setCurrentImg((i) => (i - 1 + images.length) % images.length)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose, images.length])

  const apiLangs    = langs.filter((l) => l.source === 'api' && l.value > 0)
  const manualLangs = langs.filter((l) => l.source === 'manual')
  const activeData  = apiLangs.find((l) => l.name === activeLang)

  return (
    <div className="modal__overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>

        {/* Header */}
        <div className="modal__header">
          <h2 className="modal__title">{repo.name}</h2>
          <div className="modal__header-actions">
            <a
              href={repo.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="modal__github-link"
            >
              GitHub →
            </a>
            <button className="modal__close" onClick={onClose}>✕</button>
          </div>
        </div>

        {/* Body 2 colonnes */}
        <div className="modal__body">

          {/* ── Gauche : donut + langages ── */}
          <div className="modal__left">

            {apiLangs.length > 0 && (
              <div className="modal__donut">
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
                <div className="modal__donut-center">
                  <span className="modal__donut-value">{activeData ? `${activeData.value}%` : ''}</span>
                  <span className="modal__donut-label">{activeLang}</span>
                </div>
              </div>
            )}

            {apiLangs.length > 0 && (
              <div className="modal__langs">
                <p className="modal__section-label">Langages détectés</p>
                {apiLangs.map((lang) => (
                  <button
                    key={lang.name}
                    className={`modal__lang-item ${activeLang === lang.name ? 'modal__lang-item--active' : ''}`}
                    onMouseEnter={() => setActiveLang(lang.name)}
                    onClick={() => setActiveLang(lang.name)}
                  >
                    <LangIcon lang={lang.name} size={24} />
                    <span className="modal__lang-name">{lang.name}</span>
                    <span className="modal__lang-pct" style={{ color: getColor(lang.name) }}>
                      {lang.value}%
                    </span>
                  </button>
                ))}
              </div>
            )}

            {manualLangs.length > 0 && (
              <div className="modal__langs">
                <p className="modal__section-label">Technologies</p>
                {manualLangs.map((lang) => (
                  <div key={lang.name} className="modal__lang-item">
                    <LangIcon lang={lang.name} size={24} />
                    <span className="modal__lang-name">{lang.name}</span>
                  </div>
                ))}
              </div>
            )}

          </div>

          {/* ── Droite : carousel images + descriptions ── */}
          <div className="modal__right">

            {/* Carousel d'images */}
            {images.length > 0 ? (
              <div className="modal__img-carousel">
                <img
                  src={images[currentImg]}
                  alt={`${repo.name} ${currentImg + 1}`}
                  className="modal__image"
                />

                {/* Navigation si plusieurs images */}
                {images.length > 1 && (
                  <div className="modal__img-nav">
                    <button
                      className="modal__img-btn"
                      onClick={() => setCurrentImg((i) => (i - 1 + images.length) % images.length)}
                    >←</button>

                    <div className="modal__img-dots">
                      {images.map((_, i) => (
                        <button
                          key={i}
                          className={`modal__img-dot ${i === currentImg ? 'modal__img-dot--active' : ''}`}
                          onClick={() => setCurrentImg(i)}
                        />
                      ))}
                    </div>

                    <button
                      className="modal__img-btn"
                      onClick={() => setCurrentImg((i) => (i + 1) % images.length)}
                    >→</button>
                  </div>
                )}
              </div>
            ) : (
              <div className="modal__image-placeholder">
                <span>Pas d'image disponible</span>
              </div>
            )}

            {/* Description GitHub */}
            {repo.description && (
              <div className="modal__desc-block">
                <p className="modal__section-label">Description</p>
                <p className="modal__description">{repo.description}</p>
              </div>
            )}

            {/* Contexte manuel */}
            {context && (
              <div className="modal__desc-block">
                <p className="modal__section-label">Contexte</p>
                <p className="modal__description">{context}</p>
              </div>
            )}

            {/* Expérience personnelle */}
            {experience && (
              <div className="modal__desc-block">
                <p className="modal__section-label">Mon expérience</p>
                {/*
                  Ce texte est défini dans PROJECT_EXPERIENCE dans ProjectsCarousel.jsx
                */}
                <p className="modal__description">{experience}</p>
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  )
}

export default Modal
