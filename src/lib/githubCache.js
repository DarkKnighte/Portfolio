// src/lib/githubCache.js
// ─── Cache + proxy Vercel en production ───────────────────────────────────────

const cache = {}

// En local → appel direct GitHub avec le token VITE_
// En production Vercel → passe par /api/github pour éviter CORS
const getUrl = (url) => {
  const isDev = import.meta.env.DEV
  if (isDev) return url
  return `/api/github?url=${encodeURIComponent(url)}`
}

const getHeaders = () => {
  const isDev = import.meta.env.DEV
  if (isDev && import.meta.env.VITE_GITHUB_TOKEN) {
    return { Authorization: `token ${import.meta.env.VITE_GITHUB_TOKEN}` }
  }
  return {}
}

export const fetchWithCache = async (url) => {
  if (cache[url]) return cache[url]

  const fetchUrl     = getUrl(url)
  const fetchHeaders = getHeaders()

  const res = await fetch(fetchUrl, { headers: fetchHeaders })

  if (!res.ok) throw new Error(`GitHub API error: ${res.status}`)

  const data = await res.json()
  cache[url] = data
  return data
}
