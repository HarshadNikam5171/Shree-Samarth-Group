import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MapPin, Eye, Compass, ArrowRight, ShieldCheck, Tag, Info } from 'lucide-react'

// ----------------------------------------------------
// DYNAMIC IMAGE IMPORT LOGIC (Vite Eager Globbing)
// ----------------------------------------------------
const imageModules = import.meta.glob('../assets/ssg_projects/*.png', { eager: true })

// Sort images numerically: SSG1.png, SSG2.png ... SSG15.png
const sortedImageKeys = Object.keys(imageModules).sort((a, b) => {
  const numA = parseInt(a.match(/SSG(\d+)\.png/)?.[1] || '0', 10)
  const numB = parseInt(b.match(/SSG(\d+)\.png/)?.[1] || '0', 10)
  return numA - numB
})

const projectImages = sortedImageKeys.map((key) => imageModules[key].default)

// ----------------------------------------------------
// PREMIUM PORTFOLIO METADATA (15 Predefined Landmarks)
// ----------------------------------------------------
const PROJECTS_METADATA = [
  {
    name: "Samarth Aurelia",
    tag: "Residential",
    location: "Worli Seaface, Mumbai",
    desc: "Our flagship luxury residency. Aurelia floats on structural cushions, featuring triple-deck infinity glass pools and modular sky-suites.",
    height: "350 Meters (80 Floors)",
    amenities: ["Zero-G Infinity Pool", "Floating Sky Gardens", "Private Heli-port", "Platinum Concierge"],
    stats: "100% Sold Out",
    materials: "Crystalline Facade & Suspended Alloy Trusses",
    bgGlow: "rgba(0, 240, 255, 0.25)"
  },
  {
    name: "Samarth Celeste",
    tag: "Commercial",
    location: "BKC Business Hub, Mumbai",
    desc: "Reimagining modern offices. Celeste integrates suspended glass meeting spheres that float within a structural outer steel grid.",
    height: "240 Meters (52 Floors)",
    amenities: ["Suspended Boardrooms", "Zero-Emission Gardens", "Solar-Faceted Facade", "Smart Transit Hub"],
    stats: "65% Booked",
    materials: "Smart Electro-chromic Glass & Recycled Titanium",
    bgGlow: "rgba(0, 136, 255, 0.25)"
  },
  {
    name: "Samarth Solaria",
    tag: "Luxury Apartments",
    location: "Koregaon Park, Pune Hills",
    desc: "A double-helical bioclimatic structure designed to generate its own micro-climate through integrated solar skins and wind collectors.",
    height: "420 Meters (95 Floors)",
    amenities: ["Bioclimatic Double Helix", "Kinetic Solar Spire", "Water Collectors", "Gravity-Nullifying Gym"],
    stats: "Registering Expressions of Interest",
    materials: "Self-Healing Bio-concrete & Neon-Wire Solar Mesh",
    bgGlow: "rgba(0, 240, 255, 0.3)"
  },
  {
    name: "Samarth Nebula",
    tag: "Mixed Use",
    location: "Ghatkopar Skyheights, Mumbai",
    desc: "A vertical city boasting floating gardens and an integrated sky-train platform that operates on electromagnetic tracks.",
    height: "310 Meters (70 Floors)",
    amenities: ["Electromagnetic Sky-Train", "Rainforest Bio-dome", "Hyper-Speed Elevators", "360 Observation Deck"],
    stats: "82% Sold",
    materials: "Aerospace Graphene Composites & Kinetic Glass Panels",
    bgGlow: "rgba(139, 92, 246, 0.25)"
  },
  {
    name: "Samarth Zephyr",
    tag: "Residential",
    location: "Marine Drive, Mumbai",
    desc: "Aerodynamic wind-diverting structures crafted to stand resilient against coastal storms while generating clean wind energy.",
    height: "290 Meters (64 Floors)",
    amenities: ["Wind-Turbine Core", "Oceanfront Viewing Decks", "Private Beach Elevators", "Saline Filtration Spas"],
    stats: "90% Booked",
    materials: "Carbon-Fiber Reinforced Poly-alloys & Marine Steel",
    bgGlow: "rgba(6, 182, 212, 0.25)"
  },
  {
    name: "Samarth Polaris",
    tag: "Luxury Apartments",
    location: "Kalyani Nagar, Pune",
    desc: "High-elevation smart homes designed with adaptive holographic interiors and premium automated robotic butler dispatch systems.",
    height: "190 Meters (40 Floors)",
    amenities: ["Holographic Living Rooms", "Automated Drone Docks", "Private Sky Pools", "Quantum Air Purification"],
    stats: "Fully Completed",
    materials: "Bespoke Italian Gold-Flecked Marble & Smoked Quartz",
    bgGlow: "rgba(56, 189, 248, 0.25)"
  },
  {
    name: "Samarth Etherea",
    tag: "Commercial",
    location: "Hiranandani Meadows, Thane",
    desc: "A green-certified smart business park wrapped in living moss panels and self-cooling bio-ceramic architectural screens.",
    height: "150 Meters (32 Floors)",
    amenities: ["Living Bio-Walls", "Hydroponic Office Cafés", "Thermal Cooling Ventilation", "Executive Lounges"],
    stats: "45% Leased",
    materials: "Thermodynamic Bio-ceramic Blocks & Timber Framework",
    bgGlow: "rgba(16, 185, 129, 0.25)"
  },
  {
    name: "Samarth Lumina",
    tag: "Luxury Apartments",
    location: "Prabhadevi, Mumbai",
    desc: "Glow-in-the-dark architectural masterwork that stores solar radiation during the day and emits a mesmerizing blue light at night.",
    height: "380 Meters (85 Floors)",
    amenities: ["Photoluminescent Facade", "Crystal Sky Walk", "Private Wine Cellars", "Underground Robotic Valet"],
    stats: "75% Sold Out",
    materials: "Luminescent Quantum-Dot Paint & Toughened Silica Glass",
    bgGlow: "rgba(0, 240, 255, 0.3)"
  },
  {
    name: "Samarth Astraea",
    tag: "Mixed Use",
    location: "Baner Heights, Pune",
    desc: "Hyper-luxurious high-rise integrating top-tier commercial complexes, designer boutiques, and premium high-altitude residential penthouses.",
    height: "220 Meters (48 Floors)",
    amenities: ["Designer Shopping Arcade", "Helipad Club Lounge", "Thermal Hot Springs", "VR Conference Chambers"],
    stats: "Launch Phase",
    materials: "Brushed Champagne Gold Titanium & Crystalline Glaze",
    bgGlow: "rgba(245, 158, 11, 0.25)"
  },
  {
    name: "Samarth Horizon",
    tag: "Residential",
    location: "Lokhandwala, Mumbai",
    desc: "High-tension cantilevered modular homes allowing residents to rotate their apartments for customized views and sun exposure.",
    height: "260 Meters (58 Floors)",
    amenities: ["360 Rotating Modules", "AI Home Orchestration", "Floating Tennis Court", "Meditation Rooms"],
    stats: "Booking Open",
    materials: "Lightweight High-Strength Aluminum-Lithium Alloys",
    bgGlow: "rgba(29, 78, 216, 0.25)"
  },
  {
    name: "Samarth Nova",
    tag: "Commercial",
    location: "Viman Nagar, Pune",
    desc: "A futuristic tech hub featuring micro-climate control domes and interactive dynamic light-emitting walls for digital art displays.",
    height: "180 Meters (38 Floors)",
    amenities: ["Micro-Climate Atrium", "Interactive Media Facade", "E-Sports Arenas", "Wellness Recovery Spas"],
    stats: "50% Leased",
    materials: "Flexible OLED Smart Glass & Recycled Structural Carbon",
    bgGlow: "rgba(0, 240, 255, 0.25)"
  },
  {
    name: "Samarth Zenith",
    tag: "Luxury Apartments",
    location: "Alibaug Coast, Raigad",
    desc: "Super-premium coastal villa towers featuring individual high-tide private harbors and private cascading sea-water pools.",
    height: "120 Meters (25 Floors)",
    amenities: ["Private Yacht Docks", "Saltwater Lagoon Pools", "Helipad & VIP Shuttle", "Private Sea-Deck Dining"],
    stats: "Ultra-Exclusive (Invite Only)",
    materials: "Corrosion-Proof Sea-Tempered Composites & White Basalt",
    bgGlow: "rgba(2, 132, 199, 0.3)"
  },
  {
    name: "Samarth Apex",
    tag: "Mixed Use",
    location: "Colaba Shore, Mumbai",
    desc: "An icon of heritage meeting modernity. Features suspended historical arches integrated with cutting-edge carbon-neutral framing.",
    height: "200 Meters (45 Floors)",
    amenities: ["Heritage Museum Gallery", "Ocean-View Sky Deck", "Organic Roof Gardens", "Smart Parking Silo"],
    stats: "Under Construction",
    materials: "Recycled Historic Red Sandstone & Carbon-Fiber Core",
    bgGlow: "rgba(0, 240, 255, 0.2)"
  },
  {
    name: "Samarth Kronos",
    tag: "Commercial",
    location: "Kothrud Pinnacle, Pune",
    desc: "Designed as a chronological sundial tower where the shadow of the structural apex points precisely to integrated garden dials.",
    height: "170 Meters (35 Floors)",
    amenities: ["Sundial Plaza Gardens", "Executive Fitness Centers", "Electric Vehicle Superchargers", "Sky Conference Pods"],
    stats: "Pre-Launch VIP Booking",
    materials: "High-Reflection Stainless Steel & Solar PV Shingles",
    bgGlow: "rgba(14, 165, 233, 0.25)"
  },
  {
    name: "Samarth Aethel",
    tag: "Luxury Apartments",
    location: "Bandra West, Mumbai",
    desc: "The pinnacle of architectural opulence, with solid gold-leaf interior inlays, private sky-forest parks, and individual elevator access.",
    height: "310 Meters (68 Floors)",
    amenities: ["Private Sky Forests", "Gold-Leaf Indoor Pools", "24/7 Butler & Sommelier", "Private Theater Suite"],
    stats: "Limited Availability",
    materials: "Rare Italian Calacatta Gold Marble & Brass Structural Ribs",
    bgGlow: "rgba(212, 175, 55, 0.3)"
  }
]

// ----------------------------------------------------
// DYNAMIC PREFAB GENERATOR FOR SCALABILITY
// ----------------------------------------------------
const getProjectData = (index, imageUrl) => {
  if (index < PROJECTS_METADATA.length) {
    return {
      id: `ssg-project-${index + 1}`,
      image: imageUrl,
      ...PROJECTS_METADATA[index]
    }
  }

  // Fallback for future images dropped into assets folder
  const tags = ["Residential", "Commercial", "Luxury Apartments", "Mixed Use"]
  const selectedTag = tags[index % tags.length]
  const glowColors = ["rgba(0, 240, 255, 0.25)", "rgba(0, 136, 255, 0.25)", "rgba(139, 92, 246, 0.25)", "rgba(16, 185, 129, 0.25)"]

  return {
    id: `ssg-project-${index + 1}`,
    name: `Samarth Tower ${index + 1}`,
    tag: selectedTag,
    location: "Signature Coast, Maharashtra",
    desc: "A futuristic structural milestone ascending with weightless glassmorphism panels, self-cooling ceramic skins, and organic high-tensile alloy anchors.",
    height: "280 Meters (62 Floors)",
    amenities: ["Zero-Emission Atriums", "Holographic Concierge", "Electro-chromic Glass Panels", "Sky Walk Pool"],
    stats: "Registering Expressions of Interest",
    materials: "Titanium Alloy Trusses & Self-Healing Bio-concrete",
    bgGlow: glowColors[index % glowColors.length],
    image: imageUrl
  }
}

// Map sorted images to projects list
const ALL_PROJECTS = projectImages.map((img, i) => getProjectData(i, img))

export default function ProjectsSection({
  activeFilter,
  setActiveFilter,
  selectedProject,
  setSelectedProject,
  drawerOpen,
  setDrawerOpen
}) {
  const [hoveredCardId, setHoveredCardId] = useState(null)
  const containerRef = useRef(null)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })

  // Subtle floating particles for the section
  const particles = Array.from({ length: 25 }, (_, i) => ({
    id: i,
    size: Math.random() * 4 + 1,
    x: Math.random() * 100,
    y: Math.random() * 100,
    duration: Math.random() * 20 + 10,
    delay: Math.random() * -10
  }))

  // Track mouse coordinates over the Projects section for premium cursor parallax highlight
  const handleMouseMove = (e) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    })
  }

  // Sync state between lowercase filter id and actual project tag
  const handleFilterClick = (filterId) => {
    setActiveFilter(filterId)
  }

  const getFilteredProjects = () => {
    if (activeFilter === 'all') return ALL_PROJECTS
    return ALL_PROJECTS.filter((project) => {
      const normalizedTag = project.tag.toLowerCase().replace(/\s+/g, '')
      const normalizedFilter = activeFilter.toLowerCase().replace(/\s+/g, '')
      return normalizedTag.includes(normalizedFilter) || normalizedFilter.includes(normalizedTag)
    })
  }

  const filteredProjects = getFilteredProjects()

  const handleCardClick = (project) => {
    setSelectedProject(project)
    setDrawerOpen(true)
  }

  const filterTabs = [
    { id: 'all', label: 'All Projects' },
    { id: 'residential', label: 'Residential' },
    { id: 'commercial', label: 'Commercial' },
    { id: 'luxuryapartments', label: 'Luxury Penthouses' },
    { id: 'mixeduse', label: 'Mixed Use' }
  ]

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08
      }
    }
  }

  const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 70,
        damping: 15
      }
    }
  }

  return (
    <section
      id="projects-section"
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative w-full min-h-screen py-24 px-4 md:px-12 lg:px-24 bg-[#030308] overflow-hidden flex flex-col justify-center"
      style={{ pointerEvents: 'none' }}
    >
      {/* ----------------------------------------------------
          EXTRA PREMIUM EFFECTS: FLOATING COSMIC DUST & BLUR BLOBS
          ---------------------------------------------------- */}
      {/* Background Radial Glow Blob */}
      <div className="absolute top-1/4 left-1/3 w-[500px] h-[500px] rounded-full bg-cyan-500/5 blur-[120px] pointer-events-none z-0" />
      <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] rounded-full bg-blue-500/5 blur-[140px] pointer-events-none z-0" />

      {/* Floating Particles Cloud */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        {particles.map((p) => (
          <motion.div
            key={p.id}
            className="absolute rounded-full bg-cyan-400/20"
            style={{
              width: p.size,
              height: p.size,
              left: `${p.x}%`,
              top: `${p.y}%`,
              boxShadow: '0 0 10px rgba(0, 240, 255, 0.4)'
            }}
            animate={{
              y: [0, -100, 0],
              x: [0, Math.sin(p.id) * 30, 0],
              opacity: [0.1, 0.7, 0.1]
            }}
            transition={{
              duration: p.duration,
              repeat: Infinity,
              delay: p.delay,
              ease: 'easeInOut'
            }}
          />
        ))}
      </div>

      {/* Mouse Track Light Spotlight (Desktop Custom Parallax Effect) */}
      <div
        className="absolute w-[600px] h-[600px] rounded-full bg-[radial-gradient(circle,rgba(0,240,255,0.04)_0%,rgba(0,0,0,0)_70%)] pointer-events-none z-0 hidden lg:block"
        style={{
          left: mousePos.x - 300,
          top: mousePos.y - 300,
          transform: 'translate3d(0, 0, 0)'
        }}
      />

      {/* ----------------------------------------------------
          HEADER SECTION
          ---------------------------------------------------- */}
      <div className="relative z-10 w-full flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-16 pointer-events-auto interactive-ui">
        <div className="max-w-[700px]">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-2 mb-3 text-cyan-400 font-bold tracking-[4px] uppercase text-xs text-shadow-glow"
          >
            <span className="w-12 h-[1px] bg-cyan-400" />
            Stellar Portfolios
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-serif text-4xl md:text-5xl lg:text-6xl font-light text-white leading-tight uppercase tracking-tight"
          >
            OUR LANDMARK <span className="font-light italic text-cyan-400 block lg:inline">PROJECTS</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-4 font-sans text-[#9aa2b1] text-base md:text-lg leading-relaxed"
          >
            Crafting premium residential and commercial spaces with innovation, trust, and architectural excellence. Explore our gravity-defying sanctuaries below.
          </motion.p>
        </div>

        {/* Dynamic Status/Luxury Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-wrap gap-2 p-1.5 bg-[#090a14] rounded-full border border-cyan-500/10 self-start lg:self-end shadow-2xl backdrop-blur-md"
        >
          {filterTabs.map((tab) => (
            <button
              key={tab.id}
              className={`px-5 py-2.5 rounded-full font-sans text-xs font-semibold uppercase tracking-wider transition-all duration-300 ${
                activeFilter === tab.id
                  ? 'bg-[#030308] text-cyan-400 shadow-[0_4px_20px_rgba(0,240,255,0.15)] border border-cyan-400/20'
                  : 'text-[#9aa2b1] hover:text-white bg-transparent'
              }`}
              onClick={() => handleFilterClick(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </motion.div>
      </div>

      {/* ----------------------------------------------------
          PROJECTS RESPONSIVE GRID (DESKTOP: 3COL | TABLET: 2COL | MOBILE: 1COL)
          ---------------------------------------------------- */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-50px' }}
        className="relative z-10 w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 interactive-ui"
      >
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((project) => (
            <motion.div
              layout
              key={project.id}
              variants={cardVariants}
              onClick={() => handleCardClick(project)}
              onMouseEnter={() => setHoveredCardId(project.id)}
              onMouseLeave={() => setHoveredCardId(null)}
              className="group relative w-full h-[460px] rounded-3xl overflow-hidden cursor-pointer flex flex-col justify-end p-8 border border-white/5 backdrop-blur-md bg-[rgba(9,10,20,0.45)] hover:border-cyan-400/40 transition-all duration-500 shadow-2xl"
              style={{
                boxShadow: hoveredCardId === project.id 
                  ? `0 30px 60px rgba(0, 0, 0, 0.6), 0 0 25px ${project.bgGlow}` 
                  : '0 20px 40px rgba(0, 0, 0, 0.4)'
              }}
            >
              {/* Dynamic Neon Border Draw Effect on Hover */}
              <div 
                className="absolute inset-0 border-[1.5px] border-cyan-400/0 rounded-3xl transition-all duration-500 pointer-events-none z-30 group-hover:border-cyan-400/60"
                style={{
                  boxShadow: hoveredCardId === project.id ? `inset 0 0 20px ${project.bgGlow}` : 'none'
                }}
              />

              {/* Large Premium Project Image with Dynamic Zoom Overlay */}
              <div className="absolute inset-0 w-full h-full z-0 overflow-hidden">
                <div 
                  className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-90 z-10 transition-all duration-500 group-hover:from-black group-hover:via-black/55" 
                />
                {/* Neon Cyan Layer Glow on Hover */}
                <div 
                  className="absolute inset-0 opacity-0 z-10 transition-all duration-500 group-hover:opacity-20 mix-blend-screen"
                  style={{
                    background: `linear-gradient(0deg, ${project.bgGlow} 0%, transparent 100%)`
                  }}
                />
                
                {project.image ? (
                  <motion.img
                    src={project.image}
                    alt={project.name}
                    className="w-full h-full object-cover transition-all duration-700 ease-out origin-center"
                    animate={{
                      scale: hoveredCardId === project.id ? 1.08 : 1.0
                    }}
                  />
                ) : (
                  <div className="w-full h-full bg-[#090a14] flex items-center justify-center">
                    <Compass className="w-12 h-12 text-cyan-400/20" />
                  </div>
                )}
              </div>

              {/* ----------------------------------------------------
                  PROJECT DETAILS LAYER (ANIMS UP ON HOVER)
                  ---------------------------------------------------- */}
              <div className="relative z-20 w-full flex flex-col h-fit">
                {/* Luxury Category Tag */}
                <span className="flex items-center gap-1.5 w-fit text-cyan-400 font-bold uppercase tracking-widest text-[10px] mb-2 text-shadow-glow">
                  <Tag size={10} />
                  {project.tag}
                </span>

                {/* Project Title */}
                <h3 className="font-serif text-2xl text-white group-hover:text-cyan-200 transition-colors duration-300 leading-snug">
                  {project.name}
                </h3>

                {/* Location */}
                <div className="flex items-center gap-1 text-xs text-[#9aa2b1] mt-1.5 mb-4">
                  <MapPin size={12} className="text-cyan-400" />
                  <span>{project.location}</span>
                </div>

                {/* Animated Description & Spec reveal on Hover */}
                <div className="h-0 opacity-0 overflow-hidden group-hover:h-auto group-hover:opacity-100 transition-all duration-500 ease-in-out">
                  <p className="text-xs text-[#9aa2b1] leading-relaxed mb-5">
                    {project.desc}
                  </p>
                  
                  {/* Miniature Spec Indicators */}
                  <div className="grid grid-cols-2 gap-3 pb-4 mb-4 border-t border-white/5 pt-3">
                    <div>
                      <div className="text-[9px] uppercase tracking-wider text-[#9aa2b1]/60">Booking Level</div>
                      <div className="text-[11px] font-bold font-serif text-cyan-300">{project.stats}</div>
                    </div>
                    <div>
                      <div className="text-[9px] uppercase tracking-wider text-[#9aa2b1]/60">Structural Height</div>
                      <div className="text-[11px] font-bold font-serif text-white">{project.height.split(' ')[0]} m</div>
                    </div>
                  </div>
                </div>

                {/* Luxury Cyber CTA Button */}
                <div className="flex items-center justify-between mt-2 pt-2 border-t border-white/5">
                  <div className="flex items-center gap-2 font-sans font-bold text-xs uppercase tracking-widest text-cyan-400 group-hover:text-white transition-all duration-300">
                    <span>Explore Project</span>
                    <ArrowRight size={12} className="transform transition-transform duration-300 group-hover:translate-x-1.5" />
                  </div>
                  <div className="p-2.5 rounded-full bg-cyan-400/5 group-hover:bg-cyan-400/20 text-cyan-400 border border-cyan-400/10 group-hover:border-cyan-400/30 transition-all duration-300">
                    <Eye size={12} />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* ----------------------------------------------------
          SUPER PREMIUM SLIDE-OUT SPEC SHEET / DRAWER
          ---------------------------------------------------- */}
      <AnimatePresence>
        {drawerOpen && selectedProject && (
          <>
            {/* Dark Blur Backdrop overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setDrawerOpen(false)}
              className="fixed inset-0 z-[190] bg-black/80 backdrop-blur-md pointer-events-auto"
            />

            {/* Slide-out detail spec panel */}
            <motion.div
              initial={{ x: '100%', opacity: 0.8 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: '100%', opacity: 0.8 }}
              transition={{ type: 'spring', damping: 24, stiffness: 120 }}
              className="fixed top-0 right-0 h-screen w-full md:w-[600px] max-w-full bg-[#030308] border-l border-cyan-500/10 z-[200] flex flex-col pointer-events-auto shadow-[0_0_100px_rgba(0,0,0,0.9)] overflow-y-auto"
            >
              {/* Header actions */}
              <div className="absolute top-6 left-6 z-50">
                <button
                  onClick={() => setDrawerOpen(false)}
                  className="flex items-center justify-center w-10 h-10 rounded-full border border-white/10 hover:border-cyan-400/30 bg-black/40 text-[#9aa2b1] hover:text-cyan-400 transition-all duration-300"
                  aria-label="Close details"
                >
                  ✕
                </button>
              </div>

              {/* Cinematic Full-Size Hero Banner */}
              <div className="relative w-full h-[320px] shrink-0 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-[#030308] via-black/30 to-black/60 z-10" />
                <div 
                  className="absolute inset-0 opacity-20 mix-blend-screen z-10"
                  style={{ background: `linear-gradient(180deg, ${selectedProject.bgGlow} 0%, transparent 100%)` }}
                />
                
                {selectedProject.image ? (
                  <img
                    src={selectedProject.image}
                    alt={selectedProject.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-[#090a14] flex items-center justify-center">
                    <Compass className="w-16 h-16 text-cyan-400/10" />
                  </div>
                )}

                {/* Heading Floating Container */}
                <div className="absolute bottom-6 left-8 right-8 z-20">
                  <span className="flex items-center gap-1.5 text-cyan-400 font-bold uppercase tracking-widest text-[10px] mb-1.5 text-shadow-glow">
                    <Tag size={10} />
                    {selectedProject.tag}
                  </span>
                  <h3 className="font-serif text-3xl md:text-4xl text-white">
                    {selectedProject.name}
                  </h3>
                  <div className="flex items-center gap-1.5 text-xs text-[#9aa2b1] mt-1.5">
                    <MapPin size={12} className="text-cyan-400" />
                    <span>{selectedProject.location}</span>
                  </div>
                </div>
              </div>

              {/* Spec Sheet Contents */}
              <div className="flex-grow p-8 md:p-10 flex flex-col gap-8">
                {/* Concept description */}
                <div>
                  <h4 className="flex items-center gap-2 font-serif text-sm uppercase tracking-widest text-white mb-3">
                    <Info size={14} className="text-cyan-400" />
                    Architectural Concept
                  </h4>
                  <p className="font-sans text-xs md:text-sm text-[#9aa2b1] leading-relaxed">
                    {selectedProject.desc}
                  </p>
                </div>

                {/* Progress bar */}
                <div className="p-5 rounded-2xl border border-white/5 bg-[#090a14]/60 backdrop-blur-sm">
                  <div className="flex justify-between items-center mb-2.5">
                    <span className="text-[10px] uppercase font-bold tracking-widest text-[#9aa2b1]">Booking Status</span>
                    <span className="text-[10px] uppercase font-bold tracking-widest text-cyan-400">{selectedProject.stats}</span>
                  </div>
                  <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ 
                        width: selectedProject.stats.includes('100%') ? '100%' 
                              : selectedProject.stats.includes('90%') ? '90%'
                              : selectedProject.stats.includes('82%') ? '82%'
                              : selectedProject.stats.includes('75%') ? '75%'
                              : selectedProject.stats.includes('65%') ? '65%'
                              : selectedProject.stats.includes('50%') ? '50%'
                              : selectedProject.stats.includes('45%') ? '45%'
                              : '15%' // fallback for pre-launch
                      }}
                      transition={{ duration: 1, ease: 'easeOut' }}
                      className="h-full bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full"
                    />
                  </div>
                </div>

                {/* Technical Meta Specs Grid */}
                <div>
                  <h4 className="flex items-center gap-2 font-serif text-sm uppercase tracking-widest text-white mb-4">
                    <ShieldCheck size={14} className="text-cyan-400" />
                    Technical Metrics
                  </h4>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 rounded-xl border border-white/5 bg-[#090a14]/40 hover:border-cyan-400/20 transition-all duration-300">
                      <span className="text-[9px] uppercase tracking-wider text-[#9aa2b1]/60 block mb-1">Structural Height</span>
                      <span className="font-serif text-sm text-white font-medium">{selectedProject.height}</span>
                    </div>

                    <div className="p-4 rounded-xl border border-white/5 bg-[#090a14]/40 hover:border-cyan-400/20 transition-all duration-300">
                      <span className="text-[9px] uppercase tracking-wider text-[#9aa2b1]/60 block mb-1">Core Construction Alloys</span>
                      <span className="font-serif text-sm text-white font-medium">{selectedProject.materials}</span>
                    </div>
                  </div>
                </div>

                {/* Premium Amenities */}
                <div>
                  <h4 className="flex items-center gap-2 font-serif text-sm uppercase tracking-widest text-white mb-4">
                    <Compass size={14} className="text-cyan-400" />
                    Quantum Amenities
                  </h4>
                  <div className="flex flex-wrap gap-2.5">
                    {selectedProject.amenities.map((amenity, idx) => (
                      <span
                        key={idx}
                        className="flex items-center gap-1.5 px-4 py-2.5 rounded-full border border-white/5 bg-[#090a14]/40 text-xs text-[#9aa2b1] hover:border-cyan-400/20 hover:text-white transition-all duration-300"
                      >
                        <Compass size={12} className="text-cyan-400" />
                        {amenity}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Actions (Request System Brochure) */}
                <div className="mt-auto pt-6 flex flex-col gap-3">
                  <button
                    onClick={() => {
                      setDrawerOpen(false)
                      document.getElementById('contact-section')?.scrollIntoView({ behavior: 'smooth' })
                    }}
                    className="w-full flex items-center justify-center gap-2.5 py-4 px-6 rounded-full font-sans font-bold text-xs uppercase tracking-widest text-white bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 transition-all duration-300 shadow-[0_10px_25px_rgba(0,240,255,0.25)] hover:shadow-[0_15px_30px_rgba(0,240,255,0.4)]"
                    style={{
                      boxShadow: `0 10px 25px ${selectedProject.bgGlow}`
                    }}
                  >
                    <span>Request System Brochure</span>
                    <ArrowRight size={14} />
                  </button>
                  <button
                    onClick={() => setDrawerOpen(false)}
                    className="w-full py-3.5 px-6 rounded-full font-sans font-bold text-xs uppercase tracking-widest text-[#9aa2b1] hover:text-white bg-transparent border border-white/10 hover:border-white/20 transition-all duration-300"
                  >
                    Back to Showcase
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  )
}
