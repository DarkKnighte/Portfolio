import { useState, useEffect } from 'react';
import './Header.scss';
import About from './About.jsx';

const NAV_LINKS = [
  { to: 'top',     label: 'Accueil' },
  { to: 'projets', label: 'Projets' },
  { to: 'contact', label: 'Contact' },
];

const Header = () => {
  const [dark, setDark]             = useState(true);
  const [scrolled, setScrolled]     = useState(false);
  const [menuOpen, setMenuOpen]     = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('top');

  // ─── Dark mode ───────────────────────────────────────────────────────
  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark);
  }, [dark]);

  // ─── Scroll effet header ─────────────────────────────────────────────
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // ─── Détection section active ─────────────────────────────────────────
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY

      // Si tout en haut → Accueil actif
      if (scrollY < 100) {
        setActiveSection('top')
        return
      }

      // Vérifie chaque section
      const sections = ['contact', 'projets'] // ordre inverse pour priorité
      for (const id of sections) {
        const el = document.getElementById(id)
        if (!el) continue
        const rect = el.getBoundingClientRect()
        if (rect.top <= 120) {
          setActiveSection(id)
          return
        }
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // ─── Scroll vers section ─────────────────────────────────────────────
  const scrollTo = (to) => {
    setMenuOpen(false)
    if (to === 'top') {
      window.scrollTo({ top: 0, behavior: 'smooth' })
      setActiveSection('top')
      return
    }
    const el = document.getElementById(to)
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 70
      window.scrollTo({ top, behavior: 'smooth' })
    }
  }

  return (
    <>
      <header className={`header ${scrolled ? 'header--scrolled' : ''}`}>
        <div className="header__inner">

          {/* Liens sociaux */}
          <div className="header__socials">
            <a
              href="https://github.com/DarkKnighte"
              target="_blank"
              rel="noopener noreferrer"
              className="header__social-link"
              aria-label="GitHub"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.009-.868-.013-1.703-2.782.604-3.369-1.34-3.369-1.34-.454-1.155-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844a9.59 9.59 0 012.504.337c1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z"/>
              </svg>
            </a>

            <a
              href="https://www.linkedin.com/in/gabriel-gambotti-410a702b6/"
              target="_blank"
              rel="noopener noreferrer"
              className="header__social-link"
              aria-label="LinkedIn"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </a>
          </div>

          {/* Navigation */}
          <nav className={`header__nav ${menuOpen ? 'header__nav--open' : ''}`}>
            {NAV_LINKS.map(({ to, label }) => (
              <button
                key={to}
                className={`header__link ${!drawerOpen && activeSection === to ? 'header__link--active' : ''}`}
                onClick={() => scrollTo(to)}
              >
                {label}
              </button>
            ))}

            {/* À propos */}
            <button
              className={`header__link ${drawerOpen ? 'header__link--active' : ''}`}
              onClick={() => {
                setDrawerOpen(true)
                setMenuOpen(false)
              }}
            >
              À propos
            </button>
          </nav>

          <div className="header__actions">
            <button
              className="header__theme-toggle"
              onClick={() => setDark(!dark)}
              aria-label="Changer le thème"
            >
              {dark ? '☀️' : '🌙'}
            </button>
            <button
              className={`header__burger ${menuOpen ? 'header__burger--open' : ''}`}
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Menu"
            >
              <span /><span /><span />
            </button>
          </div>

        </div>
      </header>

      <About open={drawerOpen} onOpenChange={setDrawerOpen} />
    </>
  );
};

export default Header;
