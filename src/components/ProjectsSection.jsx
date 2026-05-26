import React from 'react'
import { MapPin, Eye, Compass } from 'lucide-react'

export default function ProjectsSection({
  activeFilter,
  setActiveFilter,
  selectedProject,
  setSelectedProject,
  drawerOpen,
  setDrawerOpen
}) {
  const projects = [
    {
      id: 'aurelia',
      name: 'Samarth Aurelia',
      type: 'completed',
      tag: 'COMPLETED MODULE',
      location: 'Worli Seaface, Mumbai',
      desc: 'Our flagship architectural showcase. Aurelia floats majestically on high-tension structural cushions, featuring triple-deck infinity glass pools and modular sky-residences.',
      height: '350 Meters (80 Floors)',
      amenities: ['Zero-G Infinity Pool', 'Floating Sky Gardens', 'Private Heli-port', 'Platinum Concierge'],
      stats: '100% Sold Out',
      materials: 'Crystalline Facade & Suspended Alloy Trusses',
      bgGlow: 'rgba(0, 240, 255, 0.15)',
      floatClass: 'float-delay-1'
    },
    {
      id: 'celeste',
      name: 'Samarth Celeste',
      type: 'ongoing',
      tag: 'ONGOING BLUEPRINT',
      location: 'BKC Business Hub, Mumbai',
      desc: 'Reimagining commercial skyscrapers. celeste integrates suspended glass meeting spheres that float within a structural outer steel grid, maximizing carbon capture.',
      height: '240 Meters (52 Floors)',
      amenities: ['Suspended Boardrooms', 'Zero-Emission Gardens', 'Solar-Faceted Facade', 'Smart Sky-Transit Hub'],
      stats: '65% Booked',
      materials: 'Smart Electro-chromic Glass & Recycled Titanium',
      bgGlow: 'rgba(0, 240, 255, 0.1)',
      floatClass: 'float-delay-2'
    },
    {
      id: 'solaria',
      name: 'Samarth Solaria',
      type: 'upcoming',
      tag: 'UPCOMING CONCEPT',
      location: 'Koregaon Park, Pune Hills',
      desc: 'Our most radical gravity-defying blueprint. A double-helical bioclimatic structure designed to generate its own micro-climate through integrated solar skins and wind collectors.',
      height: '420 Meters (95 Floors)',
      amenities: ['Bioclimatic Double Helix', 'Kinetic Solar Spire', 'Aerosol Water Collectors', 'Gravity-Nullifying Gym'],
      stats: 'Registering Expressions of Interest',
      materials: 'Self-Healing Bio-concrete & Neon-Wire Solar mesh',
      bgGlow: 'rgba(0, 240, 255, 0.2)',
      floatClass: 'float-delay-3'
    }
  ]

  const filteredProjects = projects.filter(
    (p) => activeFilter === 'all' || p.type === activeFilter
  )

  const handleCardClick = (project) => {
    setSelectedProject(project)
    setDrawerOpen(true)
  }

  const getStatusLabel = (type) => {
    switch (type) {
      case 'completed': return 'Completed'
      case 'ongoing': return 'Ongoing'
      case 'upcoming': return 'Upcoming'
      default: return ''
    }
  }

  return (
    <section id="projects-section" className="section">
      <div className="projects-header">
        <div className="section-content" style={{ margin: 0 }}>
          <span className="section-tag">Stellar Portfolios</span>
          <h2 className="section-title">
            The Floating <span>Holographic blue-prints</span>
          </h2>
          <p className="section-description" style={{ margin: 0 }}>
            Discover our signature zero-gravity modules. Hovering as unconstrained, non-linear architectural holograms that float independently in space.
          </p>
        </div>

        {/* Dynamic Status Filters */}
        <div className="projects-filter interactive-ui">
          {['all', 'completed', 'ongoing', 'upcoming'].map((filter) => (
            <button
              key={filter}
              className={`filter-btn ${activeFilter === filter ? 'active' : ''}`}
              onClick={() => setActiveFilter(filter)}
            >
              {filter === 'all' ? 'All Modules' : getStatusLabel(filter)}
            </button>
          ))}
        </div>
      </div>

      {/* Asymmetric non-linear arrangement of floating cards */}
      <div className="projects-slider interactive-ui">
        {filteredProjects.map((project) => (
          <div
            key={project.id}
            className={`glass-card project-card hologram-panel ${project.floatClass}`}
            onClick={() => handleCardClick(project)}
            style={{
              borderColor: 'var(--glass-border)',
              boxShadow: `0 15px 40px rgba(0, 0, 0, 0.2), 0 5px 25px ${project.bgGlow}`
            }}
          >
            <div className="project-image-fallback"></div>
            <span className="project-tag">{project.tag}</span>
            <h3 className="project-name">{project.name}</h3>
            <div className="project-loc">
              <MapPin size={12} color="var(--color-blue-electric)" />
              <span>{project.location}</span>
            </div>
            <div className="project-btn">
              <span>DECRYPT BLUEPRINT</span>
              <Eye size={12} />
            </div>
          </div>
        ))}
      </div>

      {/* Slide-out Project Details Drawer */}
      <div className={`project-drawer ${drawerOpen ? 'open' : ''}`}>
        {selectedProject && (
          <>
            <button
              className="drawer-close"
              onClick={() => setDrawerOpen(false)}
              aria-label="Close project details"
            >
              ×
            </button>

            {/* Simulated Hero Card */}
            <div
              className="drawer-hero"
              style={{
                background: `linear-gradient(180deg, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.92) 100%), linear-gradient(135deg, var(--color-bg-darker) 0%, ${selectedProject.bgGlow} 100%)`
              }}
            >
              <div>
                <span className="project-tag">{selectedProject.tag}</span>
                <h3 className="project-name" style={{ fontSize: '2rem' }}>
                  {selectedProject.name}
                </h3>
              </div>
            </div>

            {/* Description */}
            <div>
              <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.1rem', marginBottom: '0.5rem', color: 'var(--color-text-primary)' }}>
                Architectural Horizon
              </h4>
              <p style={{ fontSize: '0.9rem', color: 'var(--color-text-secondary)', lineHeight: '1.6' }}>
                {selectedProject.desc}
              </p>
            </div>

            {/* Meta Grid */}
            <div className="drawer-meta-grid">
              <div className="drawer-meta-item">
                <div className="drawer-meta-label">Structural Height</div>
                <div className="drawer-meta-val">{selectedProject.height}</div>
              </div>
              <div className="drawer-meta-item">
                <div className="drawer-meta-label">Module Booking</div>
                <div className="drawer-meta-val">{selectedProject.stats}</div>
              </div>
              <div className="drawer-meta-item" style={{ gridColumn: 'span 2' }}>
                <div className="drawer-meta-label">Core Cyber Alloys</div>
                <div className="drawer-meta-val" style={{ fontSize: '0.95rem' }}>
                  {selectedProject.materials}
                </div>
              </div>
            </div>

            {/* Luxury Amenities */}
            <div>
              <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.1rem', marginBottom: '0.75rem', color: 'var(--color-text-primary)' }}>
                Quantum Amenities
              </h4>
              <div className="drawer-features">
                {selectedProject.amenities.map((amenity, idx) => (
                  <div key={idx} className="feature-tag">
                    <Compass size={14} />
                    <span>{amenity}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Call to Actions */}
            <div style={{ marginTop: 'auto', display: 'flex', gap: '1rem' }}>
              <button
                className="btn-luxury"
                style={{ flex: 1, padding: '1rem', boxShadow: `0 8px 20px ${selectedProject.bgGlow}` }}
                onClick={() => {
                  setDrawerOpen(false)
                  document.getElementById('contact-section')?.scrollIntoView({ behavior: 'smooth' })
                }}
              >
                <span>REQUEST SYSTEM BROCHURE</span>
              </button>
            </div>
          </>
        )}
      </div>

      {/* Drawer Backdrop Overlay */}
      <div
        className={`drawer-backdrop ${drawerOpen ? 'show' : ''}`}
        onClick={() => setDrawerOpen(false)}
      ></div>
    </section>
  )
}
