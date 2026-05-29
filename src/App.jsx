import React, { useState, useEffect, useRef } from 'react'
import ThreeCanvas from './components/ThreeCanvas'
import Header from './components/Header'
import HomeSection from './components/HomeSection'
import AboutSection from './components/AboutSection'
import ProjectsSection from './components/ProjectsSection'
import ServicesSection from './components/ServicesSection'
import ContactSection from './components/ContactSection'
import FallbackUI from './components/FallbackUI'
import CareersSection from './components/CareersSection'
import './App.css'

function App() {
  const [scrollPercent, setScrollPercent] = useState(0)
  const [activeSection, setActiveSection] = useState('home')
  const [activeFilter, setActiveFilter] = useState('all')
  const [selectedProject, setSelectedProject] = useState(null)
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [interactiveMode, setInteractiveMode] = useState(false)
  const [theme, setTheme] = useState('dark')
  const [webglSupported, setWebglSupported] = useState(true)
  const [isMobile, setIsMobile] = useState(false)

  const cursorRef = useRef(null)
  const dotRef = useRef(null)

  // 1. WebGL Support Check & Mobile detection
  useEffect(() => {
    const detectWebGL = () => {
      try {
        const canvas = document.createElement('canvas')
        return !!(
          window.WebGLRenderingContext &&
          (canvas.getContext('webgl') || canvas.getContext('experimental-webgl'))
        )
      } catch (e) {
        return false
      }
    }
    setWebglSupported(detectWebGL())

    const handleResize = () => {
      setIsMobile(window.innerWidth <= 1024)
    }
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // 2. High-Performance Custom Luxury Cursor Tracker (avoiding React re-renders)
  useEffect(() => {
    if (isMobile) return

    const handleMouseMove = (e) => {
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`
      }
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`
      }
    }

    // Hover scale effects for premium interaction
    const handleMouseOver = (e) => {
      const target = e.target
      if (
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.closest('button') ||
        target.closest('a') ||
        target.classList.contains('project-card') ||
        target.classList.contains('job-card')
      ) {
        if (cursorRef.current) {
          cursorRef.current.style.width = '48px'
          cursorRef.current.style.height = '48px'
          cursorRef.current.style.backgroundColor = 'rgba(212, 175, 55, 0.08)'
          cursorRef.current.style.borderColor = 'var(--color-gold)'
        }
      }
    }

    const handleMouseOut = (e) => {
      const target = e.target
      if (
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.closest('button') ||
        target.closest('a') ||
        target.classList.contains('project-card') ||
        target.classList.contains('job-card')
      ) {
        if (cursorRef.current) {
          cursorRef.current.style.width = '24px'
          cursorRef.current.style.height = '24px'
          cursorRef.current.style.backgroundColor = 'transparent'
          cursorRef.current.style.borderColor = 'var(--color-gold)'
        }
      }
    }

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseover', handleMouseOver)
    window.addEventListener('mouseout', handleMouseOut)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseover', handleMouseOver)
      window.removeEventListener('mouseout', handleMouseOut)
    }
  }, [isMobile])

  // 3. Global Scroll Handler linked directly to 3D Camera coordinates
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      if (docHeight <= 0) return

      const percent = scrollTop / docHeight
      // Clamp percent strictly between 0 and 0.999
      const clampedPercent = Math.min(0.999, Math.max(0, percent))
      setScrollPercent(clampedPercent)

      // Section mapping based on scroll levels
      if (clampedPercent < 0.12) {
        setActiveSection('home')
      } else if (clampedPercent < 0.35) {
        setActiveSection('about')
      } else if (clampedPercent < 0.58) {
        setActiveSection('projects')
      } else if (clampedPercent < 0.76) {
        setActiveSection('services')
      } else if (clampedPercent < 0.89) {
        setActiveSection('careers')
      } else {
        setActiveSection('contact')
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // 4. Dark & Light Theme State Manager
  const toggleTheme = () => {
    const nextTheme = theme === 'light' ? 'dark' : 'light'
    setTheme(nextTheme)
    document.documentElement.setAttribute('data-theme', nextTheme)
  }

  // Sync theme changes with default styles
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
  }, [theme])

  return (
    <>
      {/* Luxury Custom Cursor (Desktop only) */}
      {!isMobile && (
        <>
          <div
            ref={cursorRef}
            className="luxury-cursor"
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              pointerEvents: 'none',
              zIndex: 9999,
              transform: 'translate3d(-100px, -100px, 0)',
              willChange: 'transform',
              transition: 'width 0.3s ease, height 0.3s ease, background-color 0.3s ease, border-color 0.3s ease'
            }}
          ></div>
          <div
            ref={dotRef}
            className="luxury-cursor-dot"
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              pointerEvents: 'none',
              zIndex: 9999,
              transform: 'translate3d(-100px, -100px, 0)',
              willChange: 'transform'
            }}
          ></div>
        </>
      )}

      {/* 3D WebGL Background / Fallback */}
      <div className="canvas-container">
        {webglSupported ? (
          <ThreeCanvas
            scrollPercent={scrollPercent}
            activeFilter={['completed', 'ongoing', 'upcoming'].includes(activeFilter) ? activeFilter : 'all'}
            interactiveMode={interactiveMode}
            theme={theme}
          />
        ) : (
          <FallbackUI />
        )}
      </div>

      {/* Floating hints in Orbit Mode */}
      {interactiveMode && (
        <div
          className="interactive-ui"
          style={{
            position: 'fixed',
            bottom: '2rem',
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 100,
            background: 'var(--glass-bg)',
            backdropFilter: 'blur(10px)',
            border: '1px solid var(--color-gold)',
            borderRadius: '30px',
            padding: '0.8rem 2rem',
            boxShadow: 'var(--glass-shadow)',
            color: 'var(--color-text-primary)',
            fontSize: '0.8rem',
            fontWeight: 600,
            letterSpacing: '1px',
            textTransform: 'uppercase',
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.25rem',
            pointerEvents: 'auto'
          }}
        >
          <span>DRAG TO ORBIT • PINCH TO ZOOM</span>
          <span style={{ fontSize: '0.65rem', color: 'var(--color-gold)' }}>
            Exploring Floating Metropolis
          </span>
        </div>
      )}

      {/* Main Luxury Website Layout Overlay */}
      <div className="ui-overlay">
        {/* Sticky Header Nav */}
        <Header
          activeSection={activeSection}
          interactiveMode={interactiveMode}
          setInteractiveMode={setInteractiveMode}
          theme={theme}
          toggleTheme={toggleTheme}
        />

        {/* Home Hero Module */}
        <HomeSection />

        {/* About & Core Legacy Pillars */}
        <AboutSection />

        {/* Architectural Projects portfolio */}
        <ProjectsSection
          activeFilter={activeFilter}
          setActiveFilter={setActiveFilter}
          selectedProject={selectedProject}
          setSelectedProject={setSelectedProject}
          drawerOpen={drawerOpen}
          setDrawerOpen={setDrawerOpen}
        />

        {/* Maintenance platforms / Ecological Services */}
        <ServicesSection />

        {/* Unified Careers Portfolio scroll section */}
        <CareersSection />

        {/* Contact and vacancies Base Anchor */}
        <ContactSection />
      </div>
    </>
  )
}

export default App
