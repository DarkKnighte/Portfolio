import { useEffect } from 'react'
import './About.scss'

export function About({ open, onOpenChange }) {
  useEffect(() => {
    if (!open) return
    const handleClick = (e) => {
      const drawer = document.querySelector('.about-drawer')
      if (drawer && !drawer.contains(e.target)) {
        onOpenChange(false)
      }
    }
    const timer = setTimeout(() => {
      document.addEventListener('mousedown', handleClick)
    }, 100)
    return () => {
      clearTimeout(timer)
      document.removeEventListener('mousedown', handleClick)
    }
  }, [open, onOpenChange])

  return (
    <div className={`about-drawer ${open ? 'about-drawer--open' : ''}`}>
      <div className="about-drawer__header">
        {/* <h2 className="about-drawer__title">À propos</h2> */}
        <p className="about-drawer__desc">Qui suis-je ?</p>
      </div>
      <div className="about-drawer__content">
        <p>Développeur front-end spécialisé en React et SCSS, je conçois des interfaces modernes, dynamiques et responsive.
          <br/><br/>J'utilise les technologies fondamentales du web (HTML, CSS, JavaScript) ainsi que des outils modernes comme Vite.
          <br/><br/>Je m'inscris également dans une démarche d'évolution vers une stack MERN (MongoDB, Express, React, Node.js) afin d'élargir mes compétences vers le développement full-stack.
          <br/><br/>Je suis aujourd'hui à la recherche d'un poste pour mettre mes compétences en pratique et continuer à progresser.
        </p>
      </div>
      <button
        className="about-drawer__close"
        onClick={() => onOpenChange(false)}
      >
        Fermer
      </button>
    </div>
  )
}

export default About
