// api/github.js
// ─── API serverless Vercel ────────────────────────────────────────────────────
// Le token reste côté serveur, jamais exposé au client

export default async function handler(req, res) {
  // CORS — autorise ton domaine Vercel
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

  if (req.method === 'OPTIONS') {
    return res.status(200).end()
  }

  const { url } = req.query

  if (!url) {
    return res.status(400).json({ error: 'Missing url parameter' })
  }

  // Sécurité — autorise uniquement les appels vers api.github.com
  if (!url.startsWith('https://api.github.com/')) {
    return res.status(403).json({ error: 'Forbidden URL' })
  }

  try {
    const response = await fetch(url, {
      headers: {
        Authorization: `token ${process.env.GITHUB_TOKEN}`,
        Accept: 'application/vnd.github.v3+json',
      },
    })

    if (!response.ok) {
      return res.status(response.status).json({ error: `GitHub API error: ${response.status}` })
    }

    const data = await response.json()

    // Cache 5 minutes
    res.setHeader('Cache-Control', 's-maxage=300, stale-while-revalidate')
    return res.status(200).json(data)
  } catch (err) {
    return res.status(500).json({ error: err.message })
  }
}
