import { useState, useEffect } from 'react'

function App() {
  const [tag, setTag] = useState('loading…')
  const [repo, setRepo] = useState(null)

  const OWNER = 'amitkroutthedev'
  const REPO = 'test-sandbox'

  useEffect(() => {
    async function load() {
      try {
        const [relRes, repoRes] = await Promise.all([
          fetch(`https://api.github.com/repos/${OWNER}/${REPO}/releases/latest`, {
            headers: { Accept: 'application/vnd.github+json' },
          }),
          fetch(`https://api.github.com/repos/${OWNER}/${REPO}`, {
            headers: { Accept: 'application/vnd.github+json' },
          }),
        ])
        setTag(relRes.ok ? (await relRes.json()).tag_name : relRes.status === 404 ? 'no release' : `err ${relRes.status}`)
        if (repoRes.ok) setRepo(await repoRes.json())
      } catch {
        setTag('fetch failed')
      }
    }
    load()
  }, [])

  const stats = [
    { label: 'Stars', value: repo?.stargazers_count ?? '—' },
    { label: 'Forks', value: repo?.forks_count ?? '—' },
    { label: 'Open issues', value: repo?.open_issues_count ?? '—' },
    { label: 'Watchers', value: repo?.subscribers_count ?? '—' },
    { label: 'Language', value: repo?.language ?? '—' },
    { label: 'Default branch', value: repo?.default_branch ?? '—' },
  ]

  return (
    <div style={{ maxWidth: 720, margin: '40px auto', padding: 24, fontFamily: 'system-ui, sans-serif', color: '#1a1a1a' }}>
      <header style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
        <div>
          <h1 style={{ margin: 0, fontSize: 24 }}>{OWNER}/{REPO}</h1>
          <p style={{ margin: '4px 0 0', color: '#666', fontSize: 14 }}>
            {repo?.description || 'Deployment build — current release info below.'}
          </p>
        </div>
        <span style={{ background: '#1a7f37', color: '#fff', padding: '6px 14px', borderRadius: 999, fontSize: 14, fontWeight: 600, fontFamily: 'monospace' }}>
          {tag}
        </span>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: 14, marginTop: 28 }}>
        {stats.map((s) => (
          <div key={s.label} style={{ border: '1px solid #e1e4e8', borderRadius: 10, padding: 16, background: '#fafbfc' }}>
            <div style={{ fontSize: 12, color: '#888', textTransform: 'uppercase', letterSpacing: 0.5 }}>{s.label}</div>
            <div style={{ fontSize: 20, fontWeight: 700, marginTop: 6 }}>{s.value}</div>
          </div>
        ))}
      </div>

      <p style={{ marginTop: 28, lineHeight: 1.6, color: '#444', fontSize: 14 }}>
        This page is wired to the GitHub API and shows the newest published release tag at deploy time.
        Numbers update on each page load. If you only push git tags without publishing a Release, the tag
        badge will read “no release” — publish one from the repo’s Releases tab to populate it.
      </p>
      <p>New update with new tag</p>
    </div>
  )
}

export default App