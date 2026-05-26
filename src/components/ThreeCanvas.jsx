import React, { useRef, useEffect } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import * as THREE from 'three'
import {
  HeroSkyscraper,
  VisionPillars,
  ProjectsModules,
  ServicesPlatforms,
  BaseFoundation,
  ParticleField
} from './Procedural3D'

// Camera Rig Component that interpolates camera position and orientation based on scroll percent
function CameraRig({ scrollPercent, interactiveMode }) {
  const { camera } = useThree()
  const lookTarget = useRef(new THREE.Vector3(0, 1.2, 0))
  const dummyCameraPos = useRef(new THREE.Vector3(0, 2.5, 7.5))

  // Scroll mapping function to calculate target positions
  const getCameraTargets = (p) => {
    // p is between 0.0 and 1.0
    if (p <= 0.25) {
      // 1. Home Section to 2. About Section
      const t = p / 0.25
      return {
        posX: THREE.MathUtils.lerp(0, -3.2, t),
        posY: THREE.MathUtils.lerp(2.5, -5.2, t),
        posZ: THREE.MathUtils.lerp(7.5, 6.8, t),
        lookX: THREE.MathUtils.lerp(0, 0, t),
        lookY: THREE.MathUtils.lerp(1.2, -7.0, t),
        lookZ: THREE.MathUtils.lerp(0, 0, t)
      }
    } else if (p <= 0.55) {
      // 2. About Section to 3. Projects Section
      const t = (p - 0.25) / 0.3
      return {
        posX: THREE.MathUtils.lerp(-3.2, 3.2, t),
        posY: THREE.MathUtils.lerp(-5.2, -13.5, t),
        posZ: THREE.MathUtils.lerp(6.8, 8.2, t),
        lookX: THREE.MathUtils.lerp(0, 0, t),
        lookY: THREE.MathUtils.lerp(-7.0, -15.0, t),
        lookZ: THREE.MathUtils.lerp(0, 0, t)
      }
    } else if (p <= 0.8) {
      // 3. Projects Section to 4. Services Section
      const t = (p - 0.55) / 0.25
      return {
        posX: THREE.MathUtils.lerp(3.2, -2.5, t),
        posY: THREE.MathUtils.lerp(-13.5, -22.5, t),
        posZ: THREE.MathUtils.lerp(8.2, 6.5, t),
        lookX: THREE.MathUtils.lerp(0, 0, t),
        lookY: THREE.MathUtils.lerp(-15.0, -24.0, t),
        lookZ: THREE.MathUtils.lerp(0, 0, t)
      }
    } else {
      // 4. Services Section to 5. Careers & Contact
      const t = Math.min(1.0, (p - 0.8) / 0.2)
      return {
        posX: THREE.MathUtils.lerp(-2.5, 0, t),
        posY: THREE.MathUtils.lerp(-22.5, -31.5, t),
        posZ: THREE.MathUtils.lerp(6.5, 9.5, t),
        lookX: THREE.MathUtils.lerp(0, 0, t),
        lookY: THREE.MathUtils.lerp(-24.0, -34.0, t),
        lookZ: THREE.MathUtils.lerp(0, 0, t)
      }
    }
  }

  useFrame((state, delta) => {
    // If user is orbiting manually, skip scroll rigging
    if (interactiveMode) return

    const targets = getCameraTargets(scrollPercent)

    // Smoothly lerp camera position
    dummyCameraPos.current.set(targets.posX, targets.posY, targets.posZ)
    camera.position.lerp(dummyCameraPos.current, 0.08) // Dampened position lerp

    // Smoothly lerp lookAt target
    const targetLook = new THREE.Vector3(targets.lookX, targets.lookY, targets.lookZ)
    lookTarget.current.lerp(targetLook, 0.08)
    camera.lookAt(lookTarget.current)
  })

  return null
}

export default function ThreeCanvas({ scrollPercent, activeFilter, interactiveMode, theme }) {
  // Custom fog and lighting depending on the solar platinum or deep space dark themes
  const fogColor = theme === 'dark' ? '#030308' : '#f2f4f8'
  const ambientIntensity = theme === 'dark' ? 0.35 : 0.75
  const directionalColor = theme === 'dark' ? '#00f0ff' : '#0077ff'

  return (
    <Canvas
      camera={{ position: [0, 2.5, 7.5], fov: 45 }}
      style={{ background: 'transparent' }}
      gl={{ antialias: true, alpha: true }}
    >
      <fog attach="fog" args={[fogColor, 5, 26]} />

      {/* Ambient glow */}
      <ambientLight intensity={ambientIntensity} />

      {/* Cinematic studio light pointing at active elements */}
      <directionalLight
        position={[5, 10, 5]}
        intensity={theme === 'dark' ? 1.8 : 1.3}
        color={directionalColor}
        castShadow
      />
      <directionalLight
        position={[-5, -15, 2]}
        intensity={0.7}
        color="#00f0ff" // secondary electric blue studio light
      />
      <pointLight position={[0, -2, 5]} intensity={0.5} color="#ffffff" />

      {/* Background Particle Fields */}
      <ParticleField count={150} />

      {/* Core Architectural Components */}
      <group>
        {/* 1. Hero Skyscraper at y = 1.2 */}
        <HeroSkyscraper />

        {/* 2. Pillars at y = -7.0 */}
        <VisionPillars />

        {/* 3. Projects Platforms at y = -15.0 */}
        <ProjectsModules activeFilter={activeFilter} />

        {/* 4. Services Platforms at y = -24.0 */}
        <ServicesPlatforms />

        {/* 5. Careers & Contact Base Foundation at y = -34.0 */}
        <BaseFoundation />
      </group>

      {/* Dynamic camera rig */}
      <CameraRig scrollPercent={scrollPercent} interactiveMode={interactiveMode} />

      {/* Interactive orbit controls */}
      {interactiveMode && (
        <OrbitControls
          enableDamping
          dampingFactor={0.05}
          maxPolarAngle={Math.PI / 1.5}
          minPolarAngle={Math.PI / 4}
          maxDistance={15}
          minDistance={3}
        />
      )}
    </Canvas>
  )
}
