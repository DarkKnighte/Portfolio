const cache = {}

export const fetchWithCache = async (url) => {
  if (cache[url]) return cache[url]

  const res = await fetch(url)
  if (!res.ok) throw new Error(`GitHub API error: ${res.status}`)

  const data = await res.json()
  cache[url] = data
  return data
}
