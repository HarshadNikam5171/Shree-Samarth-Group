import React from 'react'
import { Eye, ShieldCheck, HeartHandshake, Award } from 'lucide-react'

export default function AboutSection() {
  const pillars = [
    {
      icon: <Eye size={20} />,
      title: 'Futuristic Vision',
      desc: 'Architecting anti-gravity weightless skylines and floating ecological campuses that redefine physical limits.'
    },
    {
      icon: <ShieldCheck size={20} />,
      title: 'Uncompromised Quality',
      desc: 'Constructing with space-grade alloy brackets, double-tempered gold-leaf glass panels, and premium Italian marble.'
    },
    {
      icon: <HeartHandshake size={20} />,
      title: 'Timeless Legacy',
      desc: 'Forging relationships built on generational trust, absolute transparency, and impeccable punctual handovers.'
    }
  ]

  const directors = [
    {
      initials: 'HN',
      name: 'Harshad Nikam',
      role: 'Chief Executive & Visionary',
      bio: 'Pioneered India\'s first high-altitude floating structural blueprints, steering Samarth towards global engineering boundaries.'
    },
    {
      initials: 'SD',
      name: 'Samarth Director',
      role: 'Chief Structural Engineer',
      bio: 'Leading structural dynamics and weightless tension analysis, ensuring each tower ascends smoothly with maximum safety margins.'
    }
  ]

  return (
    <section id="about-section" className="section">
      <div className="section-content" style={{ maxWidth: '800px' }}>
        <span className="section-tag">Legacy & Vision</span>
        <h2 className="section-title">
          Architects of the <span>Impossible Horizon</span>
        </h2>
        <p className="section-description" style={{ maxWidth: '650px' }}>
          Shree Samarth Group has been at the absolute forefront of premium luxury real estate. By merging advanced architectural engineering with zero-gravity aesthetics, we construct residential and commercial sanctuaries that float above ordinary living.
        </p>
      </div>

      {/* 3 Pillars layout */}
      <div className="about-pillars interactive-ui">
        {pillars.map((pillar, i) => (
          <div key={i} className="glass-card pillar-card">
            <div className="pillar-icon">{pillar.icon}</div>
            <h3 className="pillar-name">{pillar.title}</h3>
            <p className="pillar-desc">{pillar.desc}</p>
          </div>
        ))}
      </div>

      {/* Directors Section */}
      <div className="directors-section">
        <div className="section-content" style={{ marginBottom: '2rem' }}>
          <span className="section-tag" style={{ fontSize: '0.65rem' }}>Leadership</span>
          <h3 className="section-title" style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>
            The <span>Masterminds</span> Behind Shree Samarth
          </h3>
        </div>

        <div className="directors-grid interactive-ui">
          {directors.map((director, i) => (
            <div key={i} className="glass-card director-card">
              <div className="director-img-container">
                {director.initials}
              </div>
              <div className="director-info">
                <h4>{director.name}</h4>
                <p>{director.role}</p>
                <span>{director.bio}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
