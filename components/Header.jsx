import React, { memo } from 'react'
import Link from 'next/link'

function Header() {
  return (
    <header className="dashboard-header sticky-header">
      <div className="top-nav-brand">
        <Link href="/" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
          <img src="/images/logo-mobile.png" alt="raisul.ai logo" style={{ width: 50, height: 50, objectFit: 'contain' }} />
        </Link>
        <nav className="mobile-top-links">
          <Link href="/">Home</Link>
          <Link href="/blog">Blog</Link>
          <Link href="/tutorials">Tutorials</Link>
        </nav>
      </div>

      <nav className="top-nav-links">
        <Link href="/">Home</Link>
        <Link href="/blog">Blog</Link>
        <Link href="/tutorials">Tutorials</Link>
        <a href="#contact" className="btn-hire-nav">Hire Me</a>
      </nav>

      <div className="header-actions">
        <div className="user-profile">
          <img src="/images/profile.jpg" alt="Raisul" className="user-avatar" />
        </div>
      </div>
    </header>
  )
}

export default memo(Header)
