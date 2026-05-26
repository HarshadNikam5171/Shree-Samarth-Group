import React, { useState } from 'react'
import { Send, MapPin, Briefcase, Mail, Phone, Globe, ArrowUpRight } from 'lucide-react'

export default function ContactSection() {
  const [formSubmitted, setFormSubmitted] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    type: 'booking',
    message: ''
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    // Simulated luxurious form submission
    setFormSubmitted(true)
    setTimeout(() => {
      setFormSubmitted(false)
      setFormData({ name: '', email: '', type: 'booking', message: '' })
    }, 5000)
  }

  const jobs = [
    { title: 'Zero-G Architect', dept: 'Design & Physics Division', loc: 'Mumbai HO' },
    { title: 'Elite Hospitality Manager', dept: 'Residence Concierge', loc: 'Worli Skyline' },
    { title: 'Kinetic Façade Engineer', dept: 'Sustainable Materials', loc: 'B BKC site' }
  ]

  return (
    <section id="contact-section" className="section" style={{ minHeight: 'auto', paddingBottom: '0' }}>
      <div className="section-content" style={{ maxWidth: '800px' }}>
        <span className="section-tag">Ascend With Us</span>
        <h2 className="section-title">
          Secure Your <span>Floating Sanctuary</span>
        </h2>
        <p className="section-description">
          Whether you are looking to purchase an anti-gravity residential sky-villa, form a corporate partnership, or join our revolutionary tension engineering crew, we invite you to connect with our private concierge team.
        </p>
      </div>

      <div className="contact-container">
        {/* Contact Inquiry Form Card */}
        <div className="glass-card contact-form-card interactive-ui">
          {formSubmitted ? (
            <div style={{ textAlign: 'center', padding: '2rem 0' }}>
              <div
                style={{
                  width: '60px',
                  height: '60px',
                  borderRadius: '50%',
                  border: '2px solid var(--color-gold)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--color-gold)',
                  margin: '0 auto 1.5rem',
                  fontSize: '1.5rem',
                  fontWeight: 'bold'
                }}
              >
                ✓
              </div>
              <h3 className="form-title" style={{ marginBottom: '1rem' }}>Inquiry Received</h3>
              <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.9rem', lineHeight: '1.6' }}>
                Thank you for reaching out. A Shree Samarth Private Curator has been assigned to your request and will contact you via secure channels within 12 hours.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <h3 className="form-title">Private Concierge Desk</h3>
              
              <div className="form-grid">
                <div className="form-group">
                  <label htmlFor="form-name">Your Full Name</label>
                  <input
                    type="text"
                    id="form-name"
                    required
                    placeholder="e.g. Harshad Nikam"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="form-email">Secure Email Address</label>
                  <input
                    type="email"
                    id="form-email"
                    required
                    placeholder="e.g. harshad@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>

                <div className="form-group form-full">
                  <label htmlFor="form-type">Type of Inquiry</label>
                  <select
                    id="form-type"
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                  >
                    <option value="booking">Residential Pre-Booking (Aurelia / Solaria)</option>
                    <option value="commercial">Commercial Lease (Celeste Suites)</option>
                    <option value="partnership">Strategic Masterplan Venture</option>
                    <option value="career">Engineering & Design Career</option>
                  </select>
                </div>

                <div className="form-group form-full">
                  <label htmlFor="form-message">Details of your request</label>
                  <textarea
                    id="form-message"
                    required
                    rows="4"
                    placeholder="Specify your design requirements or corporate goals..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  ></textarea>
                </div>

                <div className="form-full" style={{ marginTop: '1rem' }}>
                  <button type="submit" className="btn-luxury" style={{ width: '100%', justifyContent: 'center' }}>
                    <span>TRANSMIT SECURE INQUIRY</span>
                    <Send size={14} />
                  </button>
                </div>
              </div>
            </form>
          )}
        </div>

        {/* Careers & Open Vacancies */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
          <div>
            <h3 className="form-title" style={{ fontSize: '1.5rem', marginBottom: '0.5rem', color: 'var(--color-text-primary)' }}>
              Open Vacancies
            </h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)', marginBottom: '1.5rem' }}>
              We are seeking forward-thinking structural physicists, zero-g computational designers, and premium curators to expand the boundaries of anti-gravity metropolis layouts.
            </p>

            <div className="careers-list interactive-ui">
              {jobs.map((job, idx) => (
                <div key={idx} className="glass-card job-card">
                  <div className="job-info">
                    <h4>{job.title}</h4>
                    <span>{job.dept} • {job.loc}</span>
                  </div>
                  <button
                    className="job-btn"
                    onClick={() => {
                      setFormData({
                        ...formData,
                        type: 'career',
                        message: `Applying for ${job.title} position...`
                      })
                      document.getElementById('form-name')?.focus()
                    }}
                    title="Apply now"
                  >
                    <ArrowUpRight size={16} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Core Contacts info */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', borderTop: '1px solid var(--color-border)', paddingTop: '2rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', fontSize: '0.9rem', color: 'var(--color-text-secondary)' }}>
              <MapPin size={16} color="var(--color-gold)" />
              <span>Samarth Corporate HQ, Worli Seaface, Mumbai, MH, India</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', fontSize: '0.9rem', color: 'var(--color-text-secondary)' }}>
              <Phone size={16} color="var(--color-gold)" />
              <span>+91 22 8888 7777</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', fontSize: '0.9rem', color: 'var(--color-text-secondary)' }}>
              <Mail size={16} color="var(--color-gold)" />
              <span>concierge@shreesamarthgroup.com</span>
            </div>
          </div>
        </div>
      </div>

      {/* Luxury Footer */}
      <footer className="interactive-ui">
        <div>
          <span style={{ fontFamily: 'var(--font-serif)', color: 'var(--color-text-primary)', fontWeight: 'bold', letterSpacing: '1px' }}>
            SHREE SAMARTH GROUP
          </span>
          <p style={{ fontSize: '0.7rem', marginTop: '0.25rem' }}>
            © {new Date().getFullYear()} Shree Samarth Group. All rights reserved in weightless space.
          </p>
        </div>

        <div className="footer-socials">
          <a href="#" className="social-link" aria-label="Globe Website"><Globe size={18} /></a>
          <a href="#" className="social-link" aria-label="Mail Contact"><Mail size={18} /></a>
        </div>
      </footer>
    </section>
  )
}
