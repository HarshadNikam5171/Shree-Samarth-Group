import React from 'react'
import { ArrowDown, Award, HardHat, ShieldCheck } from 'lucide-react'

export default function HomeSection() {
  const handleExploreClick = (e) => {
    e.preventDefault()
    const aboutSection = document.getElementById('about-section')
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section id="home-section" className="section">
      <div className="section-content">
        <span className="section-tag">Anti-Gravity Metropolis</span>
        <h1 className="section-title">
          Shaping the <span>Weightless Future</span> of Living
        </h1>
        <p className="section-description">
          Welcome to Shree Samarth Group's signature architectural masterpiece. A futuristic, floating residential and commercial eco-system designed with pure white-and-gold premium aesthetics, state-of-the-art structural physics, and ultra-luxury sky amenities.
        </p>

        <div className="interactive-ui" style={{ display: 'flex', gap: '1rem', marginTop: '2.5rem' }}>
          <a href="#about" className="btn-luxury" onClick={handleExploreClick}>
            <span>ENTER MASTERPLAN</span>
            <ArrowDown size={14} />
          </a>
          <a
            href="#projects"
            className="btn-luxury btn-luxury-secondary"
            onClick={(e) => {
              e.preventDefault()
              document.getElementById('projects-section')?.scrollIntoView({ behavior: 'smooth' })
            }}
          >
            <span>VIEW TOWERS</span>
          </a>
        </div>

        {/* Brand Core Values Statistics */}
        <div className="hero-stats">
          <div className="stat-item">
            <div className="stat-num">18+</div>
            <div className="stat-label">Years Legacy</div>
          </div>
          <div className="stat-item">
            <div className="stat-num">45M+</div>
            <div className="stat-label">Sq. Ft Developed</div>
          </div>
          <div className="stat-item">
            <div className="stat-num">9.9/10</div>
            <div className="stat-label">Client Trust</div>
          </div>
        </div>
      </div>

      {/* Mouse scroll indicator */}
      <div className="scroll-indicator">
        <span>Scroll to descend</span>
        <div className="scroll-mouse">
          <div className="scroll-wheel"></div>
        </div>
      </div>
    </section>
  )
}
