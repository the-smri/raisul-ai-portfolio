import React, { memo } from 'react'
import Link from 'next/link'

function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <img src="/images/logo-mobile.png" className="desktop-logo" alt="Logo" />
        <h2 style={{ color: 'white', margin: 0 }}>raisul<span style={{ color: '#10b981' }}>.ai</span></h2>
      </div>
      <nav className="nav-menu">
        <Link href="/" className="nav-item">Dashboard</Link>
        <Link href="/#about" className="nav-item">My Story</Link>
        <Link href="/#skills" className="nav-item">Technical Skills</Link>
        <Link href="/blog" className="nav-item">Blog</Link>
        <Link href="/tutorials" className="nav-item">Tutorials</Link>
        <Link href="/#contact" className="nav-item">Connect</Link>
      </nav>
    </aside>
  )
}

export default memo(Sidebar)
