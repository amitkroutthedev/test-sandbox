import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  const [tag, setTag] = useState('loading…')

  useEffect(() => {
    async function getLatestReleaseTag(owner, repo) {
      try {
        const res = await fetch(
          `https://api.github.com/repos/${owner}/${repo}/releases/latest`,
          { headers: { Accept: 'application/vnd.github+json' } }
        )
        if (!res.ok) {
          setTag(res.status === 404 ? 'no releases' : `error ${res.status}`)
          return
        }
        const { tag_name } = await res.json()
        setTag(tag_name)
      } catch (e) {
        setTag('fetch failed')
      }
    }
    getLatestReleaseTag('amitkroutthedev', 'test-sandbox')
  }, [])

  return (
    <>
      <section id="center">
        <div className="hero">
          <img src={heroImg} className="base" width="170" height="179" alt="" />
          <img src={reactLogo} className="framework" alt="React logo" />
          <img src={viteLogo} className="vite" alt="Vite logo" />
        </div>
        <div>
          <h1>Get started</h1>
          <p>
            Latest release: <code>{tag}</code>
          </p>
        </div>
        <button
          type="button"
          className="counter"
          onClick={() => setCount((count) => count + 1)}
        >
          Count is {count}
        </button>
      </section>
    </>
  )
}

export default App