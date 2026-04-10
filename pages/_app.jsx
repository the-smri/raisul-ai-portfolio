import '../styles/globals.css'
import Layout from '../components/Layout.jsx'
import { useEffect } from 'react'

export default function App({ Component, pageProps }) {
  useEffect(() => {
    try {
      const stored = localStorage.getItem('theme')
      const theme = stored || 'dark'
      document.documentElement.setAttribute('data-theme', theme)
      if (document.body) document.body.setAttribute('data-theme', theme)
      if (!stored) localStorage.setItem('theme', theme)
    } catch (e) {}
  }, [])

  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  )
}
