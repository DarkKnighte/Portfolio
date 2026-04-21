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
        {/* À propos de moi */}
        <p>Développeur front-end spécialisé en React et SCSS, je conçois des interfaces modernes, dynamiques et responsive.
          <br/><br/>J'utilise les technologies fondamentales du web (HTML, CSS, JavaScript) ainsi que des outils modernes comme Vite.
          <br/><br/>Je m'inscris également dans une démarche d'évolution vers une stack MERN (MongoDB, Express, React, Node.js) afin d'élargir mes compétences vers le développement full-stack.
          <br/><br/>Je suis aujourd'hui à la recherche d'un poste pour mettre mes compétences en pratique et continuer à progresser.
        </p>

        {/* Mon Parcours */}
        <h2 className="about-drawer__title">Mon parcours</h2>
        <p>
          J'ai commencer mon parcours dans le code <br/>grâce à la formation du Wagon, qui m'a permis d'acquérir les bases du développement web et de me familiariser avec les technologies <br/>front-end et backend.
          <br/><br/>J'ai ensuite suivi la formation de développeur web d'OpenClassrooms pendant 1 an en alternance dans une entreprise qui fait de la gestion de données pour des hotels, qui m'a permis de consolider mes compétences en développement back-end, notamment avec <br/>PHP et SQL ainsi que de découvrir les bonnes pratiques de développement en entreprise.
          <br/><br/>J'ai par la suite continuer ma formation OpenClassroom sans alternance afin de pouvoir la finir dans de meilleur condition de travail possible, et me concentrer sur des projets personnels pour mettre en pratique mes compétences et continuer à apprendre de nouvelles technologies.
          <br/><br/>J'ai réalisé plusieurs projets personnels et professionnels, dont certains sont présentés dans la section "Projets" de ce portfolio, qui m'ont permis de mettre en pratique mes compétences et d'acquérir de l'expérience dans le développement web.
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
