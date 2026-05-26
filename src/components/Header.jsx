import React, { useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Sun, Moon, Compass } from 'lucide-react'

// Micro-3D Rotating Logo Component
function MicroLogo3D() {
  const outerMesh = useRef()
  const innerMesh = useRef()
  const [hovered, setHovered] = useState(false)

  useFrame((state, delta) => {
    // Spins much faster when hovered
    const speed = hovered ? 4.5 : 0.6
    if (outerMesh.current) {
      outerMesh.current.rotation.y += delta * speed
      outerMesh.current.rotation.x += delta * (speed * 0.4)
    }
    if (innerMesh.current) {
      innerMesh.current.rotation.y -= delta * (speed * 0.7)
      innerMesh.current.rotation.z += delta * (speed * 0.3)
    }
  })

  return (
    <group
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      {/* Outer futuristic glowing wireframe octahedron */}
      <mesh ref={outerMesh} scale={1.3}>
        <octahedronGeometry args={[1.0, 1]} />
        <meshBasicMaterial color="#00f0ff" wireframe />
      </mesh>
      
      {/* Inner solid glowing core */}
      <mesh ref={innerMesh} scale={0.45}>
        <dodecahedronGeometry args={[1.0]} />
        <meshBasicMaterial color="#ffffff" wireframe />
      </mesh>
    </group>
  )
}

export default function Header({
  activeSection,
  interactiveMode,
  setInteractiveMode,
  theme,
  toggleTheme
}) {
  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About & Directors' },
    { id: 'projects', label: 'Projects' },
    { id: 'services', label: 'Services' },
    { id: 'contact', label: 'Contact' }
  ]

  const handleLinkClick = (e, id) => {
    e.preventDefault()
    if (interactiveMode) {
      setInteractiveMode(false)
    }
    const element = document.getElementById(`${id}-section`)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <header className="interactive-ui">
      {/* Brand logo wrapping micro-3D Canvas */}
      <a href="#home" className="logo" onClick={(e) => handleLinkClick(e, 'home')}>
        <div className="logo-3d-container">
          <Canvas
            camera={{ position: [0, 0, 3.2], fov: 45 }}
            style={{ background: 'transparent', width: '100%', height: '100%' }}
            gl={{ antialias: true, alpha: true }}
          >
            <ambientLight intensity={1.0} />
            <MicroLogo3D />
          </Canvas>
        </div>
        <span>SHREE SAMARTH</span>
      </a>

      {/* Navigation menu */}
      <nav>
        {navLinks.map((link) => (
          <a
            key={link.id}
            href={`#${link.id}`}
            className={activeSection === link.id ? 'active' : ''}
            onClick={(e) => handleLinkClick(e, link.id)}
          >
            {link.label}
          </a>
        ))}
      </nav>

      {/* Header controls */}
      <div className="header-actions">
        <button
          className="btn-luxury btn-luxury-secondary"
          onClick={() => setInteractiveMode(!interactiveMode)}
          title={interactiveMode ? "Lock Scroll Navigation" : "Enable Free Orbit Exploration"}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.6rem 1.2rem',
            fontSize: '0.7rem',
            borderColor: interactiveMode ? 'var(--color-blue-electric)' : 'var(--color-border)',
            backgroundColor: interactiveMode ? 'rgba(0, 240, 255, 0.08)' : 'transparent',
            color: interactiveMode ? 'var(--color-blue-electric)' : 'var(--color-text-primary)'
          }}
        >
          <Compass size={14} className={interactiveMode ? "spin-animation" : ""} />
          <span>{interactiveMode ? "RETURN TO SCROLL" : "EXPLORE 3D ORBIT"}</span>
        </button>

        <button
          className="theme-toggle"
          onClick={toggleTheme}
          aria-label="Toggle luxury mode theme"
        >
          {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
        </button>
      </div>
    </header>
  )
}
