import React, { useEffect, useCallback } from 'react'
import dynamic from 'next/dynamic'
import Sidebar from './Sidebar'
import Header from './Header'

const warmImage = (src) => { const i = new Image(); i.src = src }

export default function Layout({ children }) {
  useEffect(() => {
    // Prefetch common pages (Next will do link prefetching automatically too)
    // Warm images
    ['/images/profile.jpg', '/images/logo-mobile.png'].forEach(warmImage)
  }, [])

  const handleNav = useCallback(() => {
    // placeholder for navigation analytics or focus management
  }, [])

  return (
    <div className="app-wrapper" onClick={handleNav}>
      <Sidebar />
      <main className="main-content">
        <Header />
        {children}
      </main>
    </div>
  )
}
