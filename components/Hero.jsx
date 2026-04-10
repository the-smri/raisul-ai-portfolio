import React, { memo } from 'react'
import Link from 'next/link'

function Hero() {
  return (
    <section id="home" className="dashboard-section">
      <div className="card hero-card">
        <div className="hero-text">
          <span className="hero-badge">Software Engineer | Educator | AI Enthusiast</span>
          <h1>I'm <span className="highlight">S M Raisul Islam</span></h1>
          <p className="hero-intro">I build <strong>AI-powered tools</strong>, teach <strong>500+ students</strong>, and create content that makes technology accessible — all from Bangladesh.</p>
          <div className="hero-cta-row">
            <a href="#contact" className="btn btn-primary btn-hire-hero">🚀 Hire Me</a>
            <Link href="/blog" className="btn btn-outline-hero">Read Blog</Link>
          </div>
        </div>
        <div className="hero-illustration-wrapper">
          <img src="/images/profile.jpg" alt="S M Raisul Islam" className="hero-illustration" />
        </div>
      </div>
    </section>
  )
}

export default memo(Hero)
