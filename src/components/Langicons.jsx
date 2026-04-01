// ─── Logos SVG intégrés par langage ──────────────────────────────────────────

export const LANG_COLORS = {
  JavaScript:  '#f0db4f',
  TypeScript:  '#3178c6',
  Python:      '#306998',
  HTML:        '#e34c26',
  CSS:         '#563d7c',
  SCSS:        '#c6538c',
  Vue:         '#42b883',
  React:       '#61dbfb',
  'C#':        '#178600',
  Java:        '#b07219',
  PHP:         '#4f5d95',
  Ruby:        '#701516',
  Go:          '#00add8',
  Rust:        '#dea584',
  Shell:       '#89e051',
  NodeJS:      '#68a063',
  default:     '#888888',
}

export const getColor = (lang) => LANG_COLORS[lang] || LANG_COLORS.default

const icons = {
  JavaScript: (
    <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="32" height="32" rx="4" fill="#f0db4f"/>
      <path d="M9 25.3l2.3-1.4c.4.8.8 1.4 1.7 1.4.9 0 1.4-.3 1.4-1.7V14h2.8v9.7c0 2.8-1.6 4-4 4-2.1 0-3.4-1.1-4.2-2.4zm9.5-.3l2.3-1.4c.6 1 1.3 1.7 2.7 1.7 1.1 0 1.8-.6 1.8-1.3 0-.9-.7-1.2-1.9-1.8l-.7-.3c-1.9-.8-3.1-1.8-3.1-3.9 0-1.9 1.5-3.4 3.8-3.4 1.6 0 2.8.6 3.6 2l-2.2 1.4c-.4-.8-1-1.1-1.6-1.1-.7 0-1.2.4-1.2 1 0 .7.4 1 1.5 1.5l.7.3c2.2 1 3.4 2 3.4 4.1 0 2.4-1.8 3.6-4.3 3.6-2.4 0-3.9-1.1-4.8-2.4z" fill="#323330"/>
    </svg>
  ),
  TypeScript: (
    <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="32" height="32" rx="4" fill="#3178c6"/>
      <path d="M18.6 22.4v2.5c.4.2.9.4 1.5.5.6.1 1.2.2 1.8.2.6 0 1.2-.1 1.7-.2.5-.1 1-.3 1.4-.6.4-.3.7-.6.9-1.1.2-.4.3-.9.3-1.5 0-.4-.1-.8-.2-1.1-.1-.3-.3-.6-.6-.9-.3-.2-.6-.5-1-.7-.4-.2-.9-.4-1.4-.6-.4-.1-.7-.3-1-.4-.3-.1-.5-.3-.7-.4-.2-.1-.3-.3-.4-.4-.1-.2-.1-.3-.1-.5 0-.2 0-.3.1-.5.1-.1.2-.3.4-.4.2-.1.4-.2.6-.2.2-.1.5-.1.8-.1.2 0 .5 0 .7.1.3 0 .5.1.8.2.2.1.5.2.7.3.2.1.4.3.6.4v-2.4c-.4-.1-.8-.3-1.3-.3-.5-.1-1-.1-1.5-.1-.6 0-1.2.1-1.7.2-.5.2-1 .4-1.4.7-.4.3-.7.7-.9 1.1-.2.4-.3.9-.3 1.5 0 .7.2 1.4.6 1.9.4.5 1.1 1 2 1.4.4.2.8.3 1.1.5.3.1.6.3.8.4.2.1.4.3.5.5.1.2.2.4.2.6 0 .2 0 .4-.1.5-.1.2-.2.3-.4.4-.2.1-.4.2-.6.2-.2.1-.5.1-.8.1-.6 0-1.2-.1-1.7-.4-.5-.2-1-.5-1.4-.9zm-4.5-7.5H17v-2H9v2h2.9V25h2.2V14.9z" fill="white"/>
    </svg>
  ),
  HTML: (
    <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="32" height="32" rx="4" fill="#e34c26"/>
      <path d="M7 5l1.8 20.4L16 27.5l7.2-2.1L25 5H7zm14.7 6.3H12.7l.2 2.5h8.5l-.7 7.5-4.7 1.3-4.7-1.3-.3-3.8h2.4l.2 1.9 2.4.6 2.4-.6.3-3.1H11.8L11 9h10.9l-.2 2.3z" fill="white"/>
    </svg>
  ),
  CSS: (
    <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="32" height="32" rx="4" fill="#264de4"/>
      <path d="M7 5l1.8 20.4L16 27.5l7.2-2.1L25 5H7zm13 13.8l-.3 3.1-3.7 1-3.7-1-.2-2.8h2.4l.1 1.4 1.4.4 1.4-.4.2-2.2H12l-.5-6.2h9l-.2 2.3h-6.3l.1 1.7h6.1l-.3 3.7z" fill="white"/>
    </svg>
  ),
  SCSS: (
    <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="32" height="32" rx="4" fill="#c6538c"/>
      <path d="M16 7c-5 0-7.8 2.5-7.8 5.3 0 5.8 8 4.9 8 7.8 0 1-.9 1.8-2.5 1.8-2.2 0-3.1-1.2-3-2.8H8c-.2 3.2 2 5.4 6.5 5.4 3.8 0 6.3-2 6.3-5 0-6.1-8.1-5.1-8.1-7.9 0-.9.7-1.6 2.2-1.6 1.6 0 2.6.8 2.5 2.3h2.7C20.3 9.3 18.3 7 16 7z" fill="white"/>
    </svg>
  ),
  Python: (
    <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="32" height="32" rx="4" fill="#306998"/>
      <path d="M16 5c-2.4 0-5.8.4-5.8 3.2v2.4h5.8v.8H8.4C5.6 11.4 5 13.5 5 16s.6 4.6 3.4 4.8H10v-2.4c0-2.8 2.4-3.2 6-3.2s6 .4 6 3.2v6.4c0 2.8-3.4 3.2-5.8 3.2-2.4 0-5.8-.4-5.8-3.2v-2.4h-2v2.4c0 3.2 3.4 4.8 7.8 4.8s7.8-1.6 7.8-4.8v-6.4c0-2.8-2.4-4-6-4.4V8.2c0-2.8-3.4-3.2-5.8-3.2zm-1.8 3.2c.6 0 1 .4 1 1s-.4 1-1 1-.8-.4-.8-1 .2-1 .8-1zm3.6 15.6c.6 0 1 .4 1 1s-.4 1-1 1-1-.4-1-1 .4-1 1-1z" fill="white"/>
    </svg>
  ),
  React: (
    <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="32" height="32" rx="4" fill="#20232a"/>
      <ellipse cx="16" cy="16" rx="2.5" ry="2.5" fill="#61dafb"/>
      <ellipse cx="16" cy="16" rx="10" ry="4" stroke="#61dafb" strokeWidth="1.2" fill="none"/>
      <ellipse cx="16" cy="16" rx="10" ry="4" stroke="#61dafb" strokeWidth="1.2" fill="none" transform="rotate(60 16 16)"/>
      <ellipse cx="16" cy="16" rx="10" ry="4" stroke="#61dafb" strokeWidth="1.2" fill="none" transform="rotate(120 16 16)"/>
    </svg>
  ),
  Vue: (
    <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="32" height="32" rx="4" fill="#35495e"/>
      <path d="M16 25L5 8h5.5L16 18l5.5-10H27L16 25z" fill="#42b883"/>
      <path d="M16 25l-5-9h3l2 3.5L18 16h3L16 25z" fill="#35495e"/>
    </svg>
  ),
  Go: (
    <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="32" height="32" rx="4" fill="#00add8"/>
      <path d="M8 14.5c0-.3.1-.5.4-.5h16c.3 0 .4.2.4.5v3c0 .3-.1.5-.4.5H8.4c-.3 0-.4-.2-.4-.5v-3zm4 3.5c.8 0 1.5-.7 1.5-1.5S12.8 15 12 15s-1.5.7-1.5 1.5S11.2 18 12 18zm8 0c.8 0 1.5-.7 1.5-1.5S20.8 15 20 15s-1.5.7-1.5 1.5S19.2 18 20 18z" fill="white"/>
    </svg>
  ),
  Java: (
    <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="32" height="32" rx="4" fill="#b07219"/>
      <path d="M13 22.5s-.9.5.6.7c1.8.2 2.8.2 4.8-.2 0 0 .5.3 1.2.6-4.4 1.9-10-.1-6.6-.9v-.2zm-.5-2.4s-1 .8.5.9c2 .2 3.5.2 6.2-.3 0 0 .4.4.9.5-5.5 1.6-11.6.1-7.6-1.1zm7.8 4.3c.1.1-3.5 1.5-6.4 1.1-3.5-.5-3.5-1.8-3.5-1.8s.5 1.3 4.8 1.1c4.5-.2 5.1-.4 5.1-.4zm-9.8-8.3c-2.1 2.1-.5 4 3 3.5-1.2-.6-1.8-1.3-1.4-2.2.6-1.3 2.3-1.8 3.4-2.7-2 .2-4.1.6-5 1.4zm5 4.4c3.4-1.8 1.8-3.5.7-3.3-.3.1-.4.1-.4.1s.1-.2.4-.3c2.6-1 4.6 2.8-1 3.7 0 0 .2-.1.3-.2zm-3.8 5.6s.7.5-1 1c-3.5 1-14.6.9-11.1 0 1.4-.3 2.8-.7 2.8-.7s-1.8 1.4 10.7 1.3c6.2-.1 7.8-.3 7.8-.3s-.9.4-1.7.6c-4.5 1.2-15.3 1.3-17.5.2-1.9-.9 1.7-2.1 3-2.1 1.7 0 2.5.4 2.5.4l4.5-.4z" fill="white"/>
    </svg>
  ),
  PHP: (
    <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="32" height="32" rx="4" fill="#4f5d95"/>
      <path d="M16 10c-5.5 0-10 2.7-10 6s4.5 6 10 6 10-2.7 10-6-4.5-6-10-6zm-4 8.5l.5-3h1c.8 0 1.3.3 1.1 1.1-.2.8-.9 1.1-1.7 1.1h-.5l-.2.8H12zm3.2 0l.5-3h1.7c.8 0 1.2.3 1 1-.2.7-.8 1-1.5 1h-.7l-.2 1h-1l.2-1zm4.3 0l.5-3h1c.8 0 1.3.3 1.1 1.1-.2.8-.9 1.1-1.7 1.1h-.5l-.2.8h-1l.2-.8-.4.8zm-6.8-1.2h.4c.4 0 .7-.1.8-.5.1-.3-.1-.5-.5-.5h-.4l-.3 1zm3.2 0h.4c.4 0 .7-.1.8-.5.1-.3-.1-.5-.5-.5h-.4l-.3 1zm3.2 0h.4c.4 0 .7-.1.8-.5.1-.3-.1-.5-.5-.5h-.4l-.3 1z" fill="white"/>
    </svg>
  ),
  default: (lang) => (
    <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="32" height="32" rx="4" fill="#888888"/>
      <text x="16" y="21" textAnchor="middle" fill="white" fontSize="12" fontWeight="500">
        {lang?.slice(0, 2).toUpperCase()}
      </text>
    </svg>
  ),
}

export const LangIcon = ({ lang, size = 24 }) => {
  const icon = icons[lang] || icons.default(lang)
  return (
    <span style={{ width: size, height: size, display: 'inline-flex', flexShrink: 0 }}>
      {icon}
    </span>
  )
}

export default LangIcon
