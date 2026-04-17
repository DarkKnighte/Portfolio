import { useEffect, useRef } from 'react';
import './Banner.scss';
import louvre from '../assets/moi_louvre.webp'

const Banner = ({
  nom       = 'Gabriel Gambotti',
  sousTitre = 'Développeur web React',
  liens     = [
    { label: 'GitHub',   href: 'https://github.com/DarkKnighte' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/gabriel-gambotti-410a702b6' },
  ],
}) => {

  return (
    <div
      className="banner"
      style={louvre ? { backgroundImage: `url(${louvre})` } : {}}
    >
      {/* Overlay sombre pour lisibilité du texte sur la photo */}
      <div className="banner__overlay" />

      {/* Contenu texte — positionné à gauche */}
      <div className="banner__content">
        <p className="banner__eyebrow">Portfolio</p>

        <h1 className="banner__nom tracking-in-contract-bck-top">
          {nom}
        </h1>

        <p className="banner__sous-titre">{sousTitre}</p>

        <div className="banner__liens">
          {liens.map(({ label, href }) => {
            const isExternal = href.startsWith('http')
            return isExternal ? (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="banner__lien"
              >
                {label}
              </a>
            ) : (
              <a key={label} href={href} className="banner__lien banner__lien--outline">
                {label}
              </a>
            )
          })}
        </div>
      </div>
    </div>
  );
};

export default Banner;
