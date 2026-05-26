import React from 'react'
import { Landmark, Feather, ShieldAlert, Award } from 'lucide-react'

export default function ServicesSection() {
  const services = [
    {
      num: '01',
      title: 'Zero-Gravity Maintenance',
      desc: 'Deploying autonomous soft-magnetic maintenance drones to perform exterior glass polishing, structural integrity sweeps, and carbon filtration cleaning without disturbing residents.'
    },
    {
      num: '02',
      title: 'Eco-Tech Sustainability',
      desc: 'Integrating advanced aerosol moisture extractors, smart organic composting waste units, and self-cooling ceramic skins that maintain absolute thermodynamic comfort.'
    },
    {
      num: '03',
      title: 'Advanced Tension Engineering',
      desc: 'Providing full structural recalculations using high-tensile alloy anchors, dampers, and gravity-offsetting support joints, assuring 100% safety and seismic stability.'
    },
    {
      num: '04',
      title: 'Elite Club Management',
      desc: 'Curating world-class residential management services, offering five-star custom concierge dispatch, private flight heli-logistics, and luxury botanical garden curators.'
    }
  ]

  return (
    <section id="services-section" className="section">
      <div className="section-content" style={{ maxWidth: '700px' }}>
        <span className="section-tag">Elite Framework</span>
        <h2 className="section-title">
          Futuristic <span>Ecological Services</span>
        </h2>
        <p className="section-description">
          Our commitment extends far beyond the construction of architectural wonders. We implement fully automated, zero-emission maintenance and premium hospitality frameworks that ensure your floating sanctuary stays flawless for generations.
        </p>
      </div>

      {/* Grid of Services */}
      <div className="services-grid interactive-ui">
        {services.map((service, idx) => (
          <div key={idx} className="glass-card service-card">
            <div className="service-num">{service.num}</div>
            <div className="service-info">
              <h3>{service.title}</h3>
              <p>{service.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
