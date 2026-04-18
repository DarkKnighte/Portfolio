const cache = {}

const getHeaders = () => {
  const token = import.meta.env.VITE_GITHUB_TOKEN
  if (token) {
    return { Authorization: `token ${token}` }
  }
  return {}
}

export const fetchWithCache = async (url) => {
  if (cache[url]) return cache[url]

  const res = await fetch(url, { headers: getHeaders() })
  if (!res.ok) throw new Error(`GitHub API error: ${res.status}`)

  const data = await res.json()
  cache[url] = data
  return data
}
