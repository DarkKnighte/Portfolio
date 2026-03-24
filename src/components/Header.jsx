import { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router';
import './Header.scss';
import About from './About.jsx';
import badmanImg from '../assets/badman.png';

const NAV_LINKS = [
  { to: '/', label: 'Accueil' },
  { to: '/projets', label: 'Projets' },
  { to: '/contact', label: 'Contact' },
];

const Header = () => {
  const [dark, setDark] = useState(true);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark);
  }, [dark]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>  {/* ← Fragment nécessaire pour avoir le Drawer en dehors du header */}
      <header className={`header ${scrolled ? 'header--scrolled' : ''}`}>
        <div className="header__inner">

          <Link to="/" className="header__logo">
            <img src={badmanImg} alt="Logo" className="header__logo-image" />
            <span className="header__logo-bracket">&lt;</span>
            MonPortfolio
            <span className="header__logo-bracket">/&gt;</span>
          </Link>

          <nav className={`header__nav ${menuOpen ? 'header__nav--open' : ''}`}>
            {NAV_LINKS.map(({ to, label }) => (
              <NavLink
                key={to}
                to={to}
                end
                className={({ isActive }) =>
                  `header__link ${isActive ? 'header__link--active' : ''}`
                }
                onClick={() => setMenuOpen(false)}
              >
                {label}
              </NavLink>
            ))}

            {/* ← Bouton À propos à la place du NavLink */}
            <button
              className="header__link"
              onClick={() => {
                setDrawerOpen(true);
                setMenuOpen(false);
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

      {/* ← Drawer About en dehors du header */}
      <About open={drawerOpen} onOpenChange={setDrawerOpen} />
    </>
  );
};

export default Header;
