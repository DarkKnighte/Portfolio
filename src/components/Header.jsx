import { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router';
import './Header.scss';

const NAV_LINKS = [
  { to: '/', label: 'Accueil' },
  { to: '/projets', label: 'Projets' },
  { to: '/about', label: 'À propos' },
  { to: '/contact', label: 'Contact' },
];

const Header = () => {
  const [dark, setDark] = useState(true);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  // Dark mode — Shadcn utilise la classe .dark sur <html>
  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark);
  }, [dark]);

  // Effet au scroll
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className={`header ${scrolled ? 'header--scrolled' : ''}`}>
      <div className="header__inner">

        {/* Logo */}
        <Link to="/" className="header__logo">
          <span className="header__logo-bracket">&lt;</span>
          MonPortfolio
          <span className="header__logo-bracket">/&gt;</span>
        </Link>

        {/* Nav desktop */}
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
        </nav>

        <div className="header__actions">
          {/* Toggle dark/light */}
          <button
            className="header__theme-toggle"
            onClick={() => setDark(!dark)}
            aria-label="Changer le thème"
          >
            {dark ? '☀️' : '🌙'}
          </button>

          {/* Burger mobile */}
          <button
            className={`header__burger ${menuOpen ? 'header__burger--open' : ''}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menu"
          >
            <span />
            <span />
            <span />
          </button>
        </div>

      </div>
    </header>
  );
};

export default Header;
