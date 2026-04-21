import { useEffect, useState, useRef } from 'react'
import { LangIcon, getColor } from './Langicons.jsx'
import { fetchWithCache } from '../lib/githubCache.js'
import Modal from './Modal.jsx'
import './ProjectsCarousel.scss'

const GITHUB_USERNAME = 'DarkKnighte'
const EXCLUDED_LANGS  = ['Shell', 'Dockerfile', 'HCL', 'Makefile', 'Batchfile', 'PowerShell']
const ALLOWED_REPOS   = ['projet-Booki', 'Kasa', 'Mon-Vieux-Grimoire']
fetchWithCache(`https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100`)

const EXTRA_LANGS = {
  'Kasa': ['React', 'Vue', 'NodeJS'],
  'Mon-Vieux-Grimoire': ['NodeJS', 'MongoDB', 'Express'],
}

// Tableau d'images par repo — première image affichée dans le carousel
// Les suivantes s'affichent dans la modal
import kasaMain from '../assets/kasa/kasa_main.webp'
import kasaAbout from '../assets/kasa/kasa_about.webp'
import kasaAppart from '../assets/kasa/kasa_appart.webp'
import booki from '../assets/booki/booki.webp'
import booki2 from '../assets/booki/booki2.webp'
import grimoireMain from '../assets/grimoire/backend.webp'
import grimoireCreate from '../assets/grimoire/grimoire_creation.webp'

const PROJECT_IMAGES = {
  'projet-Booki':       [booki, booki2],
  'Kasa':               [kasaMain, kasaAbout, kasaAppart],
  'Mon-Vieux-Grimoire': [grimoireMain, grimoireCreate],
}

const PROJECT_CONTEXT = {
  'projet-Booki':       'Projet réalisé dans le cadre de ma formation OpenClassrooms. Il s\'agit d\'un site de réservation d\'hébergements, avec un focus sur la création d\'une interface responsive et fidèle aux maquettes fournies.',
  'Kasa':               'Projet réalisé dans le cadre de ma formation OpenClassrooms. Il s\'agit d\'une application web de location immobilière, développée avec React pour construire une interface utilisateur dynamique et responsive, tout en gérant l\'état de l\'application et les interactions utilisateur.',
  'Mon-Vieux-Grimoire': 'Projet réalisé dans le cadre de ma formation OpenClassrooms. Il s\'agit d\'une application de partage de livres, avec un focus sur le développement back-end avec Node.js, en créant une API RESTful pour gérer les données de l\'application, tout en assurant la sécurité et la performance du serveur. J\'ai également travaillé avec MongoDB, une base de données NoSQL, pour stocker et gérer les données de manière flexible et efficace.',
}

const PROJECT_EXPERIENCE = {
  'projet-Booki':       'Ce projet m\'a permis de mettre en pratique les bases du développement front-end, notamment la structuration HTML et le stylisme CSS pour créer une interface responsive et fidèle aux maquettes fournies.',
  'Kasa':               'Ce projet m\'a offert l\'opportunité de me plonger dans le développement d\'une application web complète, en utilisant React pour construire une interface utilisateur dynamique et responsive, tout en gérant l\'état de l\'application et les interactions utilisateur.',
  'Mon-Vieux-Grimoire': 'Ce projet m\'a permis d\'explorer le développement back-end avec Node.js, en créant une API RESTful pour gérer les données de l\'application, tout en assurant la sécurité et la performance du serveur. J\'ai également travaillé avec MongoDB, une base de données NoSQL, pour stocker et gérer les données de manière flexible et efficace.',
}

export function ProjectsCarousel() {
  const [projects, setProjects]        = useState([])
  const [loading, setLoading]          = useState(true)
  const [error, setError]              = useState(null)
  const [current, setCurrent]          = useState(0)
  const [selectedProject, setSelected] = useState(null)
  const [activeLang, setActiveLang]    = useState(null)
  const autoRef                        = useRef(null)

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const repos = await fetchWithCache(
          `https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100`
        )
        const filteredRepos = repos.filter((repo) => ALLOWED_REPOS.includes(repo.name))

        const langResults = await Promise.all(
          filteredRepos.map((repo) => fetchWithCache(repo.languages_url))
        )

        const data = filteredRepos.map((repo, i) => {
          const apiLangs   = langResults[i]
          const totalBytes = Object.values(apiLangs).reduce((a, b) => a + b, 0)

          const apiLangData = Object.entries(apiLangs)
            .filter(([name]) => !EXCLUDED_LANGS.includes(name))
            .sort(([, a], [, b]) => b - a)
            .map(([name, bytes]) => ({
              name,
              value: Math.round((bytes / totalBytes) * 100),
              source: 'api',
            }))

          const extraLangs = (EXTRA_LANGS[repo.name] || []).map((name) => ({
            name,
            value: 0,
            source: 'manual',
          }))

          return {
            repo,
            langs:   [...apiLangData, ...extraLangs],
            images:  PROJECT_IMAGES[repo.name]  || [],
            context: PROJECT_CONTEXT[repo.name] || null,
            experience: PROJECT_EXPERIENCE[repo.name] || null,
          }
        })

        const filtered = data.filter((p) => p.langs.length > 0)
        setProjects(filtered)
        if (filtered.length > 0) setActiveLang(filtered[0].langs[0]?.name || null)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchProjects()
  }, [])

  useEffect(() => {
    if (projects.length === 0) return
    autoRef.current = setInterval(() => {
      setCurrent((c) => {
        const next = (c + 1) % projects.length
        setActiveLang(projects[next]?.langs[0]?.name || null)
        return next
      })
    }, 4000)
    return () => clearInterval(autoRef.current)
  }, [projects])

  const goTo = (index) => {
    clearInterval(autoRef.current)
    setCurrent(index)
    setActiveLang(projects[index]?.langs[0]?.name || null)
  }

  const prev = () => goTo((current - 1 + projects.length) % projects.length)
  const next = () => goTo((current + 1) % projects.length)

  if (loading) return <div className="projects-carousel projects-carousel--loading"><p>Chargement des projets...</p></div>
  if (error)   return <div className="projects-carousel projects-carousel--error"><p>Erreur : {error}</p></div>
  if (projects.length === 0) return null

  const { repo, langs, images, context, experience } = projects[current]
  const displayImage = images[0] || null // ← première image uniquement dans le carousel

  return (
    <>
      <div className="projects-carousel">

        <div className="projects-carousel__header">
          <h3 className="projects-carousel__title">{repo.name}</h3>
          <span className="projects-carousel__counter">{current + 1} / {projects.length}</span>
        </div>

        {/* Première image uniquement */}
        {displayImage ? (
          <img
            src={displayImage}
            alt={repo.name}
            className="projects-carousel__screenshot"
            onClick={() => setSelected(projects[current])}
          />
        ) : (
          <div
            className="projects-carousel__screenshot-placeholder"
            onClick={() => setSelected(projects[current])}
          >
            <span>Voir le projet →</span>
          </div>
        )}

        {/* Logos langages */}
        <div className="projects-carousel__langs">
          {langs.map((lang) => (
            <div
              key={lang.name}
              className={`projects-carousel__lang ${activeLang === lang.name ? 'projects-carousel__lang--active' : ''}`}
            >
              <LangIcon lang={lang.name} size={20} />
              {lang.value > 0 && (
                <span className="projects-carousel__lang-pct" style={{ color: getColor(lang.name) }}>
                </span>
              )}
            </div>
          ))}
        </div>

        <div className="projects-carousel__nav">
          <button className="projects-carousel__btn" onClick={prev}>←</button>
          <div className="projects-carousel__dots">
            {projects.map((_, i) => (
              <div
                key={i}
                className={`projects-carousel__dot ${i === current ? 'projects-carousel__dot--active' : ''}`}
                onClick={() => goTo(i)}
              />
            ))}
          </div>
          <button className="projects-carousel__btn" onClick={next}>→</button>
        </div>

      </div>

      {selectedProject && (
        <Modal
          repo={selectedProject.repo}
          langs={selectedProject.langs}
          images={selectedProject.images}
          context={selectedProject.context}
          experience={selectedProject.experience}
          onClose={() => setSelected(null)}
        />
      )}
    </>
  )
}

export default ProjectsCarousel
