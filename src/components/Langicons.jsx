// ─── Logos via Devicons CDN ───────────────────────────────────────────────────
// Nécessite dans index.html :
// <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/devicon.min.css"/>

export const LANG_COLORS = {
  JavaScript:  '#f7df1e',
  TypeScript:  '#3178c6',
  Python:      '#306998',
  HTML:        '#e44d26',
  CSS:         '#1572b6',
  SCSS:        '#cc6699',
  Vue:         '#42b883',
  React:       '#61dafb',
  'C#':        '#178600',
  Java:        '#b07219',
  PHP:         '#777bb4',
  Ruby:        '#cc342d',
  Go:          '#00add8',
  Rust:        '#dea584',
  Shell:       '#89e051',
  NodeJS:      '#68a063',
  MongoDB:     '#47A248',
  default:     '#888888',
}

export const getColor = (lang) => LANG_COLORS[lang] || LANG_COLORS.default

// ─── Map nom langage → nom devicon ───────────────────────────────────────────
const DEVICON_MAP = {
  JavaScript:  'javascript',
  TypeScript:  'typescript',
  HTML:        'html5',
  CSS:         'css3',
  SCSS:        'sass',
  React:       'react',
  Vue:         'vuejs',
  Python:      'python',
  NodeJS:      'nodejs',
  Java:        'java',
  PHP:         'php',
  Ruby:        'ruby',
  Go:          'go',
  Rust:        'rust',
  'C#':        'csharp',
  Shell:       'bash',
  MongoDB:     'mongodb',
}

export const LangIcon = ({ lang, size = 24 }) => {
  const iconName = DEVICON_MAP[lang]

  // Si le langage est connu → icône Devicon colorée
  if (iconName) {
    return (
      <i
        className={`devicon-${iconName}-plain colored`}
        style={{
          fontSize: size,
          lineHeight: 1,
          flexShrink: 0,
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      />
    )
  }

  // Fallback → carré avec les 2 premières lettres
  return (
    <span style={{
      width: size,
      height: size,
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: '#555',
      borderRadius: '4px',
      color: 'white',
      fontSize: size * 0.38,
      fontWeight: 600,
      fontFamily: 'monospace',
      flexShrink: 0,
    }}>
      {lang?.slice(0, 2).toUpperCase()}
    </span>
  )
}

export default LangIcon
