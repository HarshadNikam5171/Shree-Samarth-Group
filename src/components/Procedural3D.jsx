import React, { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

// Helper Component for Electric Cyan Glowing Particles/Stardust
export function ParticleField({ count = 150 }) {
  const meshRef = useRef()
  const lightBeamsRef = useRef()

  // Generate random cosmic particles
  const particles = React.useMemo(() => {
    const temp = []
    for (let i = 0; i < count; i++) {
      const x = THREE.MathUtils.randFloatSpread(35)
      const y = THREE.MathUtils.randFloatSpread(55) - 15 // vertical spread
      const z = THREE.MathUtils.randFloatSpread(35)
      const speed = THREE.MathUtils.randFloat(0.05, 0.2)
      const size = THREE.MathUtils.randFloat(0.015, 0.05)
      temp.push({ x, y, z, speed, size })
    }
    return temp
  }, [count])

  useFrame((state) => {
    const time = state.clock.getElapsedTime()
    if (meshRef.current) {
      meshRef.current.rotation.y = time * 0.008
      meshRef.current.rotation.x = Math.sin(time * 0.004) * 0.05
    }
  })

  return (
    <group>
      {/* Cyan & White Sparkles */}
      <points ref={meshRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[new Float32Array(particles.flatMap(p => [p.x, p.y, p.z])), 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          color="#00f0ff"
          size={0.05}
          transparent
          opacity={0.7}
          sizeAttenuation
          blending={THREE.AdditiveBlending}
        />
      </points>

      {/* Cyber Space Beams */}
      <group ref={lightBeamsRef}>
        <mesh position={[-6, -10, -5]} rotation={[0.2, 0.3, 0]}>
          <cylinderGeometry args={[0.01, 1.2, 40, 16]} />
          <meshBasicMaterial color="#00f0ff" transparent opacity={0.02} blending={THREE.AdditiveBlending} side={THREE.DoubleSide} />
        </mesh>
        <mesh position={[6, -22, -3]} rotation={[-0.3, -0.1, 0.2]}>
          <cylinderGeometry args={[0.01, 1.8, 45, 16]} />
          <meshBasicMaterial color="#0088ff" transparent opacity={0.015} blending={THREE.AdditiveBlending} side={THREE.DoubleSide} />
        </mesh>
      </group>
    </group>
  )
}

// 1. HERO SECTION: Futuristic Architectural Cluster connected by suspended skywalks
export function HeroSkyscraper() {
  const clusterRef = useRef()
  const towerARef = useRef()
  const towerBRef = useRef()
  const towerCRef = useRef()

  useFrame((state) => {
    const time = state.clock.getElapsedTime()
    
    // Smooth zero-g drift for the entire cluster
    if (clusterRef.current) {
      clusterRef.current.position.y = Math.sin(time * 0.5) * 0.12 + 1.2
      clusterRef.current.rotation.y = time * 0.06
    }

    // Independent weightless drift and slow micro-rotations for each tower
    if (towerARef.current) {
      towerARef.current.position.y = Math.sin(time * 0.9) * 0.06
      towerARef.current.rotation.y = time * 0.03
    }
    if (towerBRef.current) {
      towerBRef.current.position.y = Math.sin(time * 0.7 + 1.2) * 0.08
      towerBRef.current.rotation.y = -time * 0.02
    }
    if (towerCRef.current) {
      towerCRef.current.position.y = Math.sin(time * 0.8 + 2.5) * 0.05
      towerCRef.current.rotation.y = time * 0.015
    }
  })

  // Material configurations
  const glassMat = new THREE.MeshStandardMaterial({
    color: '#00f0ff',
    transparent: true,
    opacity: 0.35,
    roughness: 0.05,
    metalness: 0.1
  })

  const wireMat = new THREE.MeshStandardMaterial({
    color: '#00f0ff',
    wireframe: true,
    roughness: 0.1,
    metalness: 0.9
  })

  const marbleMat = new THREE.MeshStandardMaterial({
    color: '#1a1d29',
    roughness: 0.4,
    metalness: 0.3
  })

  const neonMat = new THREE.MeshBasicMaterial({
    color: '#00f0ff',
    transparent: true,
    opacity: 0.8,
    blending: THREE.AdditiveBlending
  })

  return (
    <group ref={clusterRef} position={[0, 1.2, 0]}>
      
      {/* ========================================================
          TOWER A: Glass Helix Bioclimatic Spire (Left-Front)
          ======================================================== */}
      <group ref={towerARef} position={[-1.0, 0, 0.6]}>
        {/* Core Spine */}
        <mesh>
          <cylinderGeometry args={[0.15, 0.2, 3.2, 8]} />
          <meshStandardMaterial color="#0c0d16" roughness={0.7} />
        </mesh>
        
        {/* Glass twisted facade rings */}
        <mesh position={[0, 0.2, 0]}>
          <cylinderGeometry args={[0.42, 0.45, 1.4, 6]} />
          <primitive object={glassMat} />
        </mesh>
        <mesh position={[0, 0.2, 0]}>
          <cylinderGeometry args={[0.43, 0.46, 1.41, 6]} />
          <primitive object={wireMat} />
        </mesh>

        {/* Small floating ring */}
        <mesh position={[0, 1.1, 0]} rotation={[0.2, 0, 0.1]}>
          <torusGeometry args={[0.55, 0.015, 8, 32]} />
          <meshBasicMaterial color="#00f0ff" />
        </mesh>

        {/* Spire tip */}
        <mesh position={[0, 1.6, 0]}>
          <cylinderGeometry args={[0.005, 0.1, 0.8, 4]} />
          <meshStandardMaterial color="#00f0ff" metalness={0.9} />
        </mesh>
      </group>

      {/* ========================================================
          TOWER B: Offset Stacked Cantilever Blocks (Right-Front)
          ======================================================== */}
      <group ref={towerBRef} position={[1.0, 0, 0.6]}>
        {/* Foundation */}
        <mesh position={[0, -1.0, 0]}>
          <boxGeometry args={[0.6, 0.2, 0.6]} />
          <primitive object={marbleMat} />
        </mesh>

        {/* Stacked offset modules */}
        <mesh position={[0, -0.4, 0]} rotation={[0, 0.2, 0]}>
          <boxGeometry args={[0.5, 0.6, 0.5]} />
          <primitive object={glassMat} />
        </mesh>
        <mesh position={[0, -0.4, 0]} rotation={[0, 0.2, 0]}>
          <boxGeometry args={[0.51, 0.61, 0.51]} />
          <primitive object={wireMat} />
        </mesh>

        <mesh position={[0.1, 0.3, -0.1]} rotation={[0, -0.4, 0]}>
          <boxGeometry args={[0.45, 0.6, 0.45]} />
          <primitive object={marbleMat} />
        </mesh>
        
        <mesh position={[-0.05, 1.0, 0.05]} rotation={[0, 0.5, 0]}>
          <boxGeometry args={[0.4, 0.6, 0.4]} />
          <primitive object={glassMat} />
        </mesh>
        <mesh position={[-0.05, 1.0, 0.05]} rotation={[0, 0.5, 0]}>
          <boxGeometry args={[0.41, 0.61, 0.41]} />
          <primitive object={wireMat} />
        </mesh>

        {/* Top Antenna */}
        <mesh position={[0, 1.45, 0]}>
          <cylinderGeometry args={[0.01, 0.01, 0.5]} />
          <meshBasicMaterial color="#ffffff" />
        </mesh>
      </group>

      {/* ========================================================
          TOWER C: Futuristic Triangular Mirror Monolith (Back)
          ======================================================== */}
      <group ref={towerCRef} position={[0, 0.1, -1.1]} rotation={[0, Math.PI / 6, 0]}>
        {/* Main Monolith Body */}
        <mesh>
          <cylinderGeometry args={[0.2, 0.35, 3.4, 3]} />
          <meshStandardMaterial color="#0d0f19" roughness={0.15} metalness={0.95} />
        </mesh>
        
        {/* Glow lines wrapped around monolith */}
        {[...Array(6)].map((_, idx) => (
          <mesh key={idx} position={[0, -1.2 + idx * 0.5, 0]} rotation={[0, idx * 0.1, 0]}>
            <cylinderGeometry args={[0.22 - idx * 0.01, 0.23 - idx * 0.01, 0.015, 3]} />
            <primitive object={neonMat} />
          </mesh>
        ))}

        {/* Floating sky-deck crown */}
        <mesh position={[0, 1.65, 0]} rotation={[0.1, 0.2, 0]}>
          <cylinderGeometry args={[0.3, 0.1, 0.15, 3]} />
          <meshStandardMaterial color="#00f0ff" metalness={0.8} />
        </mesh>
      </group>

      {/* ========================================================
          SUSPENDED SKYWALKS: Glowing Neon Connections
          ======================================================== */}
      {/* 1. Skywalk A to B (Front cross-connection) at y = 0.4 */}
      <mesh position={[0, 0.4, 0.6]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.035, 0.035, 2.0, 8]} />
        <primitive object={neonMat} />
      </mesh>
      {/* Supporting wire trusses */}
      <mesh position={[0, 0.48, 0.6]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.005, 0.005, 2.0, 4]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0.4} />
      </mesh>

      {/* 2. Skywalk B to C (Right-to-Back connection) */}
      {/* Pivot at mid point between (1.0, 0.6) and (0, -1.1) which is (0.5, -0.25) at y = -0.5 */}
      <group position={[0.5, -0.5, -0.25]} rotation={[0.42, 0.5, 0]}>
        <mesh>
          <cylinderGeometry args={[0.03, 0.03, 2.0, 8]} />
          <primitive object={neonMat} />
        </mesh>
      </group>

      {/* 3. Skywalk C to A (Back-to-Left connection) */}
      {/* Pivot at mid point between (0, -1.1) and (-1.0, 0.6) which is (-0.5, -0.25) at y = 1.0 */}
      <group position={[-0.5, 1.0, -0.25]} rotation={[-0.42, -0.5, 0]}>
        <mesh>
          <cylinderGeometry args={[0.03, 0.03, 2.0, 8]} />
          <primitive object={neonMat} />
        </mesh>
      </group>

      {/* Small weightless subsidiary shards drifting nearby */}
      <mesh position={[-1.5, -1.2, 1.2]} rotation={[0.4, 0.5, 0.2]}>
        <boxGeometry args={[0.15, 0.3, 0.15]} />
        <meshStandardMaterial color="#00f0ff" transparent opacity={0.5} />
      </mesh>
      <mesh position={[1.6, -0.8, -0.8]} rotation={[0.1, 0.2, 0.8]}>
        <boxGeometry args={[0.2, 0.2, 0.2]} />
        <meshStandardMaterial color="#0d0f19" roughness={0.3} />
      </mesh>
    </group>
  )
}

// 2. ABOUT SECTION: Floating Abstract Architectural Pillars (Cyber-Cyan style)
export function VisionPillars() {
  const groupRef = useRef()
  const p1Ref = useRef()
  const p2Ref = useRef()
  const p3Ref = useRef()

  useFrame((state) => {
    const time = state.clock.getElapsedTime()
    if (groupRef.current) {
      groupRef.current.rotation.y = time * 0.04
    }

    // Individual pillar bobbing and rotations
    if (p1Ref.current) {
      p1Ref.current.position.y = Math.sin(time * 1.1) * 0.15
      p1Ref.current.rotation.y = time * 0.12
    }
    if (p2Ref.current) {
      p2Ref.current.position.y = Math.sin(time * 0.9 + 1.5) * 0.18
      p2Ref.current.rotation.y = -time * 0.15
    }
    if (p3Ref.current) {
      p3Ref.current.position.y = Math.sin(time * 1.3 + 3.0) * 0.12
      p3Ref.current.rotation.y = time * 0.08
    }
  })

  const neonMat = new THREE.MeshBasicMaterial({
    color: '#00f0ff',
    transparent: true,
    opacity: 0.7
  })

  return (
    <group ref={groupRef} position={[0, -7.0, 0]}>
      {/* Central soft electric light beam */}
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[0.08, 0.08, 4.0, 8]} />
        <meshBasicMaterial color="#00f0ff" transparent opacity={0.12} />
      </mesh>

      {/* Pillar 1: Vision */}
      <group ref={p1Ref} position={[-2.2, 0, 0]}>
        <mesh position={[0, -1.2, 0]}>
          <boxGeometry args={[0.6, 0.12, 0.6]} />
          <meshStandardMaterial color="#00f0ff" metalness={0.9} roughness={0.1} />
        </mesh>
        <mesh position={[0, 0, 0]}>
          <cylinderGeometry args={[0.18, 0.18, 2.2, 8]} />
          <meshStandardMaterial color="#0d0f19" roughness={0.4} />
        </mesh>
        {/* Custom neon rings */}
        <mesh position={[0, 0, 0]}>
          <cylinderGeometry args={[0.19, 0.19, 0.1, 8]} />
          <primitive object={neonMat} />
        </mesh>
        <mesh position={[0, 1.2, 0]}>
          <boxGeometry args={[0.6, 0.12, 0.6]} />
          <meshStandardMaterial color="#00f0ff" metalness={0.9} roughness={0.1} />
        </mesh>
      </group>

      {/* Pillar 2: Quality */}
      <group ref={p2Ref} position={[1.1, 0, 1.9]}>
        <mesh position={[0, -1.2, 0]}>
          <cylinderGeometry args={[0.3, 0.3, 0.12, 8]} />
          <meshStandardMaterial color="#0088ff" metalness={0.9} roughness={0.1} />
        </mesh>
        {[...Array(10)].map((_, i) => (
          <mesh key={i} position={[0, -0.9 + i * 0.2, 0]} rotation={[0, i * 0.3, 0]}>
            <boxGeometry args={[0.42, 0.1, 0.42]} />
            <meshStandardMaterial color={i % 2 === 0 ? "#0d0f19" : "#00f0ff"} roughness={0.3} metalness={i % 2 === 0 ? 0.2 : 0.8} />
          </mesh>
        ))}
        <mesh position={[0, 1.2, 0]}>
          <cylinderGeometry args={[0.3, 0.3, 0.12, 8]} />
          <meshStandardMaterial color="#0088ff" metalness={0.9} roughness={0.1} />
        </mesh>
      </group>

      {/* Pillar 3: Legacy */}
      <group ref={p3Ref} position={[1.1, 0, -1.9]}>
        <mesh position={[0, -1.2, 0]}>
          <cylinderGeometry args={[0.3, 0.35, 0.12, 3]} />
          <meshStandardMaterial color="#00f0ff" metalness={0.9} roughness={0.1} />
        </mesh>
        <mesh position={[0, 0, 0]}>
          <cylinderGeometry args={[0.2, 0.25, 2.2, 3]} />
          <meshStandardMaterial color="#ffffff" transparent opacity={0.25} metalness={0.1} roughness={0.05} />
        </mesh>
        <mesh position={[0, 0, 0]}>
          <cylinderGeometry args={[0.04, 0.04, 2.2, 8]} />
          <meshStandardMaterial color="#00f0ff" metalness={0.9} roughness={0.1} />
        </mesh>
        <mesh position={[0, 1.2, 0]}>
          <cylinderGeometry args={[0.3, 0.2, 0.12, 3]} />
          <meshStandardMaterial color="#00f0ff" metalness={0.9} roughness={0.1} />
        </mesh>
      </group>
    </group>
  )
}

// 3. PROJECTS SECTION: 3 Distinct Floating Modules (Cyber style)
export function ProjectsModules({ activeFilter }) {
  const completedRef = useRef()
  const ongoingRef = useRef()
  const upcomingRef = useRef()

  useFrame((state) => {
    const time = state.clock.getElapsedTime()

    // Smooth bobbing and rotations
    if (completedRef.current) {
      completedRef.current.position.y = Math.sin(time * 0.7) * 0.1 - 15.0
      completedRef.current.rotation.y = time * 0.06
    }
    if (ongoingRef.current) {
      ongoingRef.current.position.y = Math.sin(time * 0.8 + 1.0) * 0.12 - 15.0
      ongoingRef.current.rotation.y = time * 0.05 + 2.0
    }
    if (upcomingRef.current) {
      upcomingRef.current.position.y = Math.sin(time * 0.6 + 2.0) * 0.08 - 15.0
      upcomingRef.current.rotation.y = time * 0.07 + 4.0
    }
  })

  const isCompletedVisible = activeFilter === 'all' || activeFilter === 'completed'
  const isOngoingVisible = activeFilter === 'all' || activeFilter === 'ongoing'
  const isUpcomingVisible = activeFilter === 'all' || activeFilter === 'upcoming'

  const completedScale = isCompletedVisible ? 1.0 : 0.15
  const ongoingScale = isOngoingVisible ? 1.0 : 0.15
  const upcomingScale = isUpcomingVisible ? 1.0 : 0.15

  const neonMat = new THREE.MeshBasicMaterial({
    color: '#00f0ff',
    transparent: true,
    opacity: 0.7
  })

  return (
    <group>
      {/* 3A. COMPLETED PROJECT: Premium Cyber Towers */}
      <group
        ref={completedRef}
        position={[-3.2, -15.0, 0]}
        scale={[completedScale, completedScale, completedScale]}
      >
        <mesh position={[0, -1.0, 0]}>
          <cylinderGeometry args={[1.5, 1.6, 0.15, 8]} />
          <meshStandardMaterial color="#0a0b14" roughness={0.6} />
        </mesh>
        <mesh position={[0, -0.92, 0]}>
          <cylinderGeometry args={[1.51, 1.51, 0.02, 8]} />
          <meshStandardMaterial color="#00f0ff" metalness={0.9} roughness={0.1} />
        </mesh>

        <group position={[-0.4, 0.2, 0.3]}>
          <mesh position={[0, 0.4, 0]}>
            <boxGeometry args={[0.5, 1.8, 0.5]} />
            <meshStandardMaterial color="#ffffff" transparent opacity={0.25} roughness={0.05} />
          </mesh>
          <mesh position={[0, 0.4, 0]}>
            <boxGeometry args={[0.51, 1.81, 0.51]} />
            <meshStandardMaterial color="#00f0ff" wireframe metalness={0.9} />
          </mesh>
        </group>

        <group position={[0.4, 0.5, -0.3]}>
          <mesh position={[0, 0.5, 0]}>
            <boxGeometry args={[0.4, 2.2, 0.4]} />
            <meshStandardMaterial color="#ffffff" transparent opacity={0.2} roughness={0.05} />
          </mesh>
          <mesh position={[0, 0.5, 0]}>
            <boxGeometry args={[0.41, 2.21, 0.41]} />
            <meshStandardMaterial color="#0088ff" wireframe metalness={0.9} />
          </mesh>
        </group>
      </group>

      {/* 3B. ONGOING PROJECT: Futuristic Cyber Grid Crane */}
      <group
        ref={ongoingRef}
        position={[0, -15.0, -1.5]}
        scale={[ongoingScale, ongoingScale, ongoingScale]}
      >
        <mesh position={[0, -1.0, 0]}>
          <cylinderGeometry args={[1.5, 1.6, 0.15, 8]} />
          <meshStandardMaterial color="#0a0b14" roughness={0.6} />
        </mesh>
        <mesh position={[0, -0.92, 0]}>
          <cylinderGeometry args={[1.51, 1.51, 0.02, 8]} />
          <meshStandardMaterial color="#00f0ff" metalness={0.9} roughness={0.1} />
        </mesh>

        <mesh position={[0, 0.3, 0]}>
          <boxGeometry args={[0.8, 2.0, 0.8]} />
          <meshStandardMaterial color="#00f0ff" wireframe metalness={0.95} roughness={0.1} />
        </mesh>
        
        <mesh position={[0, -0.4, 0]}>
          <boxGeometry args={[0.76, 0.3, 0.76]} />
          <meshStandardMaterial color="#090a12" roughness={0.7} />
        </mesh>
      </group>

      {/* 3C. UPCOMING PROJECT: Twisting Cyber Spire Helix */}
      <group
        ref={upcomingRef}
        position={[3.2, -15.0, 0]}
        scale={[upcomingScale, upcomingScale, upcomingScale]}
      >
        <mesh position={[0, -1.0, 0]}>
          <cylinderGeometry args={[1.5, 1.6, 0.15, 8]} />
          <meshStandardMaterial color="#0a0b14" roughness={0.6} />
        </mesh>
        <mesh position={[0, -0.92, 0]}>
          <cylinderGeometry args={[1.51, 1.51, 0.02, 8]} />
          <meshStandardMaterial color="#00f0ff" metalness={0.9} roughness={0.1} />
        </mesh>

        {[...Array(12)].map((_, i) => {
          const y = -0.7 + i * 0.22
          const angle = i * 0.35
          return (
            <group key={i} position={[0, y, 0]} rotation={[0, angle, 0]}>
              <mesh>
                <boxGeometry args={[0.65, 0.08, 0.65]} />
                <meshStandardMaterial color="#00f0ff" metalness={0.9} roughness={0.15} />
              </mesh>
            </group>
          )
        })}

        <mesh position={[0, 0.4, 0]}>
          <cylinderGeometry args={[0.15, 0.15, 2.3, 12]} />
          <primitive object={neonMat} />
        </mesh>
      </group>
    </group>
  )
}

// 4. SERVICES SECTION: Ecotech maintenance platforms (Cyber blue drone pads)
export function ServicesPlatforms() {
  const basePadRef = useRef()
  const orbRef = useRef()
  const drone1Ref = useRef()
  const drone2Ref = useRef()

  useFrame((state) => {
    const time = state.clock.getElapsedTime()

    if (basePadRef.current) {
      basePadRef.current.position.y = Math.sin(time * 0.95) * 0.15 - 24.0
      basePadRef.current.rotation.y = time * 0.04
    }

    if (orbRef.current) {
      const scale = 1.0 + Math.sin(time * 3.0) * 0.08
      orbRef.current.scale.set(scale, scale, scale)
    }

    if (drone1Ref.current) {
      const radius = 1.8
      const speed = 1.8
      drone1Ref.current.position.x = Math.cos(time * speed) * radius
      drone1Ref.current.position.z = Math.sin(time * speed) * radius
      drone1Ref.current.position.y = Math.sin(time * 2.0) * 0.4
    }

    if (drone2Ref.current) {
      const radius = 2.4
      const speed = -1.2
      drone2Ref.current.position.x = Math.cos(time * speed) * radius
      drone2Ref.current.position.z = Math.sin(time * speed) * radius
      drone2Ref.current.position.y = Math.cos(time * 1.5) * 0.3
    }
  })

  return (
    <group>
      <group ref={basePadRef} position={[0, -24.0, 0]}>
        <mesh position={[0, -0.3, 0]}>
          <cylinderGeometry args={[2.0, 2.1, 0.25, 6]} />
          <meshStandardMaterial color="#0a0b14" roughness={0.5} />
        </mesh>
        
        <mesh position={[0, -0.16, 0]}>
          <cylinderGeometry args={[1.9, 1.9, 0.02, 6]} />
          <meshStandardMaterial color="#00f0ff" metalness={0.9} roughness={0.1} />
        </mesh>

        <mesh position={[0, 0.1, 0]}>
          <cylinderGeometry args={[0.4, 0.5, 0.5, 6]} />
          <meshStandardMaterial color="#00f0ff" metalness={0.9} roughness={0.1} />
        </mesh>

        <group ref={orbRef} position={[0, 0.7, 0]}>
          <mesh>
            <sphereGeometry args={[0.22, 32, 32]} />
            <meshBasicMaterial color="#00f0ff" transparent opacity={0.7} blending={THREE.AdditiveBlending} />
          </mesh>
          <mesh scale={[1.25, 1.25, 1.25]}>
            <sphereGeometry args={[0.22, 16, 16]} />
            <meshBasicMaterial color="#0088ff" wireframe />
          </mesh>
        </group>
      </group>

      <group ref={drone1Ref} position={[0, -23.5, 0]}>
        <mesh>
          <sphereGeometry args={[0.08, 8, 8]} />
          <meshBasicMaterial color="#ffffff" />
        </mesh>
        <mesh position={[0, 0, 0]} scale={1.3}>
          <sphereGeometry args={[0.08, 8, 8]} />
          <meshBasicMaterial color="#00f0ff" wireframe />
        </mesh>
        <mesh position={[0, -0.8, 0]} rotation={[0.1, 0, 0.1]}>
          <cylinderGeometry args={[0.005, 0.08, 1.6, 8]} />
          <meshBasicMaterial color="#00f0ff" transparent opacity={0.2} blending={THREE.AdditiveBlending} />
        </mesh>
      </group>

      <group ref={drone2Ref} position={[0, -23.5, 0]}>
        <mesh>
          <sphereGeometry args={[0.06, 8, 8]} />
          <meshBasicMaterial color="#00f0ff" />
        </mesh>
        <mesh position={[0, -0.5, 0]} rotation={[0.2, 0, -0.2]}>
          <cylinderGeometry args={[0.005, 0.06, 1.0, 8]} />
          <meshBasicMaterial color="#ffffff" transparent opacity={0.15} blending={THREE.AdditiveBlending} />
        </mesh>
      </group>
    </group>
  )
}

// 5. CAREERS & CONTACT SECTION: Massive Slate-Gold Architectural Foundation
export function BaseFoundation() {
  const gridRef = useRef()
  const beamRef = useRef()

  useFrame((state) => {
    const time = state.clock.getElapsedTime()
    if (gridRef.current) {
      gridRef.current.rotation.y = Math.sin(time * 0.1) * 0.04
    }
    if (beamRef.current) {
      beamRef.current.scale.x = 1.0 + Math.sin(time * 2.5) * 0.15
      beamRef.current.scale.z = 1.0 + Math.sin(time * 2.5) * 0.15
    }
  })

  return (
    <group ref={gridRef} position={[0, -34.0, 0]}>
      <mesh position={[0, -1.5, 0]}>
        <cylinderGeometry args={[4.5, 5.0, 2.5, 12]} />
        <meshStandardMaterial color="#07080f" roughness={0.65} metalness={0.7} />
      </mesh>

      <mesh position={[0, -0.2, 0]}>
        <cylinderGeometry args={[4.2, 4.22, 0.1, 12]} />
        <meshStandardMaterial color="#00f0ff" metalness={0.9} roughness={0.15} />
      </mesh>

      <group position={[0, 0.3, 0]}>
        <mesh>
          <cylinderGeometry args={[1.5, 1.5, 0.8, 8]} />
          <meshStandardMaterial color="#00f0ff" transparent opacity={0.15} roughness={0.05} metalness={0.3} />
        </mesh>
        
        <mesh position={[0, 0.45, 0]}>
          <cylinderGeometry args={[1.6, 1.65, 0.1, 8]} />
          <meshStandardMaterial color="#00f0ff" metalness={0.9} roughness={0.1} />
        </mesh>
      </group>

      {/* Cyber Blue energy light beam */}
      <mesh ref={beamRef} position={[0, 10.0, 0]}>
        <cylinderGeometry args={[0.3, 0.6, 20.0, 16]} />
        <meshBasicMaterial color="#00f0ff" transparent opacity={0.1} blending={THREE.AdditiveBlending} side={THREE.DoubleSide} />
      </mesh>
      <mesh position={[0, 10.0, 0]}>
        <cylinderGeometry args={[0.05, 0.08, 20.0, 16]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0.2} blending={THREE.AdditiveBlending} side={THREE.DoubleSide} />
      </mesh>

      {[...Array(6)].map((_, i) => {
        const angle = (i * Math.PI) / 3
        const radius = 3.6
        const x = Math.cos(angle) * radius
        const z = Math.sin(angle) * radius
        return (
          <group key={i} position={[x, 0.1, z]} rotation={[0, -angle, 0]}>
            <mesh>
              <cylinderGeometry args={[0.1, 0.15, 0.7, 4]} />
              <meshStandardMaterial color="#090a12" roughness={0.7} />
            </mesh>
            <mesh position={[0, 0.36, 0]}>
              <boxGeometry args={[0.22, 0.04, 0.22]} />
              <meshStandardMaterial color="#00f0ff" metalness={0.9} />
            </mesh>
          </group>
        )
      })}
    </group>
  )
}
