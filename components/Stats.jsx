import React, { memo } from 'react'

function StatCard({ value, label, className = '' }) {
  return (
    <div className={`card stat-card ${className}`}>
      <div className="stat-icon" />
      <span className="stat-value">{value}</span>
      <span className="stat-label">{label}</span>
    </div>
  )
}

function Stats() {
  return (
    <section className="dashboard-section">
      <div className="stats-row">
        <StatCard value="500+" label="Students Mentored" className="card-purple" />
        <StatCard value="150+" label="Video Tutorials" className="card-green" />
        <StatCard value="15+" label="Tech Projects" className="card-orange" />
      </div>
    </section>
  )
}

export default memo(Stats)
