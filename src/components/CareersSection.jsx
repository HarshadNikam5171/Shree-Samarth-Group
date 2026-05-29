import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Briefcase, MapPin, Tag, ArrowRight, Sparkles, 
  TrendingUp, Users, Cpu, ShieldCheck, Upload, Send, Compass
} from 'lucide-react'

// ----------------------------------------------------
// VACANCIES METADATA (6 realistic real-estate roles)
// ----------------------------------------------------
const VACANCIES = [
  {
    title: "Lead Civil Engineer",
    dept: "Engineering",
    exp: "8-12 Years",
    loc: "Worli Seaface Site, Mumbai",
    desc: "Oversee structural steel frame integration, foundation seismic dampening, and high-tensile alloy truss allocations."
  },
  {
    title: "Senior Site Supervisor",
    dept: "Operations",
    exp: "6-10 Years",
    loc: "BKC Business Hub, Mumbai",
    desc: "Coordinate daily construction workflows, ensuring zero-emission standards and high-tensile material compliance."
  },
  {
    title: "Zero-G Concept Architect",
    dept: "Architecture",
    exp: "5-9 Years",
    loc: "Corporate HQ, Mumbai",
    desc: "Formulate ultra-premium spatial layout blueprints, floating skywalk concepts, and glassmorphism outer facade details."
  },
  {
    title: "High-Rise Project Manager",
    dept: "Management",
    exp: "10-15 Years",
    loc: "Corporate HQ, Mumbai",
    desc: "Direct comprehensive project lifecycle milestones, manage procurement budgets, and secure punctual handovers."
  },
  {
    title: "Senior Sales Curator",
    dept: "Sales",
    exp: "4-8 Years",
    loc: "Worli Gallery, Mumbai",
    desc: "Represent Shree Samarth to HNW investors, delivering premium walkthroughs and managing luxury portfolios."
  },
  {
    title: "CRM Executive",
    dept: "Sales",
    exp: "3-6 Years",
    loc: "Worli Gallery, Mumbai",
    desc: "Curate absolute custom post-booking experiences, managing client requests and secure sky-suite modifications."
  }
]

// ----------------------------------------------------
// MINI BENEFITS CARDS
// ----------------------------------------------------
const BENEFIT_CARDS = [
  {
    icon: <TrendingUp className="w-5 h-5 text-cyan-400" />,
    title: "Career Growth",
    desc: "Chart rapid advancement tracks with sponsored global seminars and executive mobility structures."
  },
  {
    icon: <Users className="w-5 h-5 text-cyan-400" />,
    title: "Modern Work Culture",
    desc: "Cultivate absolute intellectual freedom within dynamic design silos and autonomous team circles."
  },
  {
    icon: <Cpu className="w-5 h-5 text-cyan-400" />,
    title: "Landmark Projects",
    desc: "Build the floating skywalks, kinetic facades, and high-strength alloy sanctuaries defining India's skylines."
  }
]

export default function CareersSection() {
  const [modalOpen, setModalOpen] = useState(false)
  const [selectedJob, setSelectedJob] = useState("")
  const [formSubmitted, setFormSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const sectionRef = useRef(null)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    position: '',
    experience: '4',
    city: '',
    resume: null,
    message: ''
  })

  // Track cursor spotlight
  const handleMouseMove = (e) => {
    if (!sectionRef.current) return
    const rect = sectionRef.current.getBoundingClientRect()
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    })
  }

  // Open apply modal
  const triggerApply = (jobTitle = "General Application") => {
    setSelectedJob(jobTitle)
    setFormData(prev => ({ ...prev, position: jobTitle }))
    setFormSubmitted(false)
    setModalOpen(true)
  }

  // Submit Application
  const handleFormSubmit = (e) => {
    e.preventDefault()
    setSubmitting(true)
    setTimeout(() => {
      setSubmitting(false)
      setFormSubmitted(true)
      setFormData({
        name: '',
        email: '',
        phone: '',
        position: '',
        experience: '4',
        city: '',
        resume: null,
        message: ''
      })
    }, 2000)
  }

  // Stardust Particles Cloud
  const particles = Array.from({ length: 15 }, (_, i) => ({
    id: i,
    size: Math.random() * 3 + 1.5,
    x: Math.random() * 100,
    y: Math.random() * 100,
    duration: Math.random() * 15 + 10,
    delay: Math.random() * -10
  }))

  return (
    <section
      id="careers-section"
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      className="relative w-full py-28 px-4 md:px-12 lg:px-24 bg-[#030308] border-b border-white/5 overflow-hidden flex flex-col justify-center"
      style={{ pointerEvents: 'none' }}
    >
      {/* ----------------------------------------------------
          EXTRA PREMIUM EFFECTS: FLOATING BLOBS & COSMIC DUST
          ---------------------------------------------------- */}
      {/* Ambient Radial Glowing Light Beams */}
      <div className="absolute top-1/3 left-1/4 w-[450px] h-[450px] rounded-full bg-cyan-500/5 blur-[120px] pointer-events-none z-0" />
      <div className="absolute bottom-1/3 right-1/4 w-[500px] h-[500px] rounded-full bg-blue-500/5 blur-[130px] pointer-events-none z-0" />

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
              boxShadow: '0 0 8px rgba(0, 240, 255, 0.3)'
            }}
            animate={{
              y: [0, -80, 0],
              x: [0, Math.sin(p.id) * 20, 0],
              opacity: [0.1, 0.6, 0.1]
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

      {/* Spotlight cursor tracking */}
      <div
        className="absolute w-[500px] h-[500px] rounded-full bg-[radial-gradient(circle,rgba(0,240,255,0.035)_0%,rgba(0,0,0,0)_70%)] pointer-events-none z-0 hidden lg:block"
        style={{
          left: mousePos.x - 250,
          top: mousePos.y - 250,
          transform: 'translate3d(0, 0, 0)'
        }}
      />

      {/* ----------------------------------------------------
          SECTION HEADING
          ---------------------------------------------------- */}
      <div className="relative z-10 max-w-[800px] mb-16 pointer-events-auto interactive-ui">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-2 mb-3 text-cyan-400 font-bold tracking-[4px] uppercase text-xs text-shadow-glow"
        >
          <span className="w-12 h-[1px] bg-cyan-400" />
          Join Our Team
        </motion.div>
        
        <motion.h2
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-serif text-4xl md:text-5xl lg:text-6xl font-light text-white leading-tight uppercase tracking-tight"
        >
          BUILD YOUR FUTURE <span className="font-light italic text-cyan-400 block lg:inline">WITH SHREE SAMARTH GROUP</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-4 font-sans text-[#9aa2b1] text-base md:text-lg leading-relaxed"
        >
          Join a visionary team delivering premium residential, commercial, and landmark infrastructure projects with innovation, trust, and engineering excellence.
        </motion.p>
      </div>

      {/* ----------------------------------------------------
          DUAL COLUMN STRUCTURE
          ---------------------------------------------------- */}
      <div className="relative z-10 w-full grid grid-cols-1 lg:grid-cols-12 gap-16 items-start interactive-ui pointer-events-auto">
        
        {/* LEFT COLUMN: INTRO CONTENT & 3 LUXURY MINI CARDS */}
        <div className="lg:col-span-5 flex flex-col gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col gap-4"
          >
            <h3 className="font-serif text-2xl text-white font-light tracking-wide uppercase">
              Where Engineering Meets <span className="text-cyan-400 font-light italic">Artistry</span>
            </h3>
            <p className="text-sm text-[#9aa2b1] leading-relaxed">
              At Shree Samarth Group, we construct sanctuaries that persist for generations. We promote absolute creative sovereignty, enabling structural engineers and master architects to formulate landmarks with premium composites.
            </p>
            <p className="text-sm text-[#9aa2b1]/85 leading-relaxed">
              By syncing with our private curated desks, on-site personnel and design managers collaborate to exceed execution margins and secure punctual handovers.
            </p>
          </motion.div>

          {/* 3 Premium Benefit Mini Cards */}
          <div className="flex flex-col gap-5 mt-4">
            {BENEFIT_CARDS.map((benefit, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="group relative p-6 rounded-2xl border border-white/5 bg-[#090a14]/30 hover:border-cyan-400/20 hover:bg-[#090a14]/50 transition-all duration-300 flex items-start gap-4 shadow-xl"
              >
                {/* Glow outlines */}
                <div className="absolute inset-0 rounded-2xl border border-cyan-400/0 group-hover:border-cyan-400/15 transition-all duration-300 pointer-events-none" />
                
                <div className="shrink-0 flex items-center justify-center w-10 h-10 rounded-xl bg-cyan-400/5 group-hover:bg-cyan-400/15 text-cyan-400 border border-cyan-400/10 transition-all duration-300">
                  {benefit.icon}
                </div>

                <div>
                  <h4 className="font-serif text-sm text-white group-hover:text-cyan-200 transition-colors duration-300 mb-1">
                    {benefit.title}
                  </h4>
                  <p className="text-[11px] text-[#9aa2b1] leading-relaxed">
                    {benefit.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* RIGHT COLUMN: OPEN POSITIONS VACANCY GRID */}
        <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-6">
          {VACANCIES.map((job, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.05 }}
              onClick={() => triggerApply(job.title)}
              className="group relative p-6 rounded-2xl border border-white/5 bg-[#090a14]/40 hover:border-cyan-400/30 hover:bg-[#090a14]/75 transition-all duration-300 flex flex-col justify-between h-[255px] cursor-pointer shadow-lg"
            >
              {/* Card Neon Glow Borders */}
              <div className="absolute inset-0 rounded-2xl border border-cyan-400/0 group-hover:border-cyan-400/25 transition-all duration-300 pointer-events-none" />
              
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <span className="px-2 py-0.5 rounded bg-cyan-400/5 border border-cyan-400/10 text-[9px] font-bold text-cyan-400 uppercase tracking-widest">
                    {job.dept}
                  </span>
                  <span className="px-2 py-0.5 rounded bg-white/5 border border-white/10 text-[9px] font-bold text-[#9aa2b1] uppercase tracking-widest">
                    {job.exp} Exp
                  </span>
                </div>

                <h4 className="font-serif text-lg text-white group-hover:text-cyan-200 transition-colors duration-300 leading-snug">
                  {job.title}
                </h4>

                <div className="flex items-center gap-1 text-[10px] text-[#9aa2b1] mt-1 mb-3">
                  <MapPin size={10} className="text-cyan-400" />
                  <span>{job.loc}</span>
                </div>

                <p className="text-[11px] text-[#9aa2b1] leading-relaxed line-clamp-3">
                  {job.desc}
                </p>
              </div>

              {/* Action trigger arrow */}
              <div className="flex items-center justify-between border-t border-white/5 pt-3 mt-3">
                <span className="text-[10px] font-bold uppercase tracking-widest text-cyan-400 group-hover:text-white transition-colors duration-300">
                  Apply Now
                </span>
                <div className="p-2 rounded-full bg-cyan-400/5 group-hover:bg-cyan-400/20 text-cyan-400 border border-cyan-400/10 group-hover:border-cyan-400/30 transition-all duration-300">
                  <ArrowRight size={12} className="transform transition-transform duration-300 group-hover:translate-x-0.5" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* ----------------------------------------------------
          BOTTOM CALL TO ACTION BANNER
          ---------------------------------------------------- */}
      <div className="relative z-10 w-full mt-24 max-w-[1000px] mx-auto p-10 rounded-3xl border border-white/5 bg-[#090a14]/30 hover:border-cyan-400/20 transition-all duration-500 shadow-2xl overflow-hidden text-center flex flex-col items-center gap-6 pointer-events-auto interactive-ui">
        {/* Glow lasers */}
        <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(0,240,255,0.03)_0%,rgba(0,0,0,0)_70%)] pointer-events-none" />
        
        <h3 className="font-serif text-2xl sm:text-3xl text-white font-light uppercase tracking-wide leading-tight">
          READY TO BUILD <span className="font-light italic text-cyan-400 text-shadow-glow">TOMORROW’S LANDMARKS?</span>
        </h3>
        
        <p className="text-xs sm:text-sm text-[#9aa2b1] max-w-[550px] leading-relaxed">
          Become part of a visionary team redefining modern living spaces. Chart your signature onto structures that change the horizon.
        </p>

        <button
          onClick={() => triggerApply("General Application")}
          className="mt-2 py-3.5 px-8 rounded-full font-sans font-bold text-xs uppercase tracking-widest text-white bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 transition-all duration-300 shadow-[0_10px_20px_rgba(0,240,255,0.2)] hover:shadow-[0_15px_30px_rgba(0,240,255,0.35)] flex items-center justify-center gap-2"
        >
          <span>Apply Now</span>
          <ArrowRight size={14} />
        </button>
      </div>

      {/* ----------------------------------------------------
          TALENT APPLICATION GLASSMORPHIC MODAL FORM
          ---------------------------------------------------- */}
      <AnimatePresence>
        {modalOpen && (
          <>
            {/* Modal Blur Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setModalOpen(false)}
              className="fixed inset-0 z-[195] bg-black/85 backdrop-blur-md pointer-events-auto cursor-pointer"
            />

            {/* Application Drawer Panel */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 150 }}
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] md:w-[650px] max-h-[90vh] bg-[#030308] border border-cyan-500/10 z-[200] rounded-3xl p-6 sm:p-10 flex flex-col pointer-events-auto shadow-[0_0_80px_rgba(0,0,0,0.85)] overflow-y-auto"
            >
              {/* Close Button */}
              <button
                onClick={() => setModalOpen(false)}
                className="absolute top-5 right-5 w-8 h-8 rounded-full border border-white/10 bg-black/40 text-[#9aa2b1] hover:text-cyan-400 hover:border-cyan-400/30 flex items-center justify-center transition-all duration-300 text-sm"
                aria-label="Close form"
              >
                ✕
              </button>

              <div className="text-center mb-6 pt-2">
                <span className="inline-flex items-center gap-2 text-cyan-400 font-bold uppercase tracking-[3px] text-[10px] text-shadow-glow mb-2">
                  Encrypted Application Intake
                </span>
                <h3 className="font-serif text-2xl text-white uppercase tracking-wide">
                  APPLY FOR <span className="font-light italic text-cyan-400">{selectedJob}</span>
                </h3>
              </div>

              {formSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-10 flex flex-col items-center"
                >
                  <div className="w-14 h-14 rounded-full bg-cyan-400/5 border border-cyan-400/30 flex items-center justify-center text-cyan-400 text-2xl mb-5 shadow-[0_0_15px_rgba(0,240,255,0.15)] animate-pulse">
                    ✓
                  </div>
                  <h4 className="font-serif text-xl text-white mb-2">Transmission Successful</h4>
                  <p className="text-xs text-[#9aa2b1] max-w-[380px] leading-relaxed mb-6">
                    Thank you. Your candidate credentials have been encrypted and uploaded into our candidate ledger. A Shree Samarth Private Curator will review details within 12 hours.
                  </p>
                  <button
                    onClick={() => setModalOpen(false)}
                    className="px-6 py-2.5 rounded-full border border-cyan-400/20 text-cyan-400 hover:bg-cyan-400/5 text-xs font-bold uppercase tracking-wider transition-all duration-300"
                  >
                    Close Portal
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleFormSubmit} className="flex flex-col gap-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {/* Name */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[9px] uppercase font-bold tracking-widest text-[#9aa2b1]" htmlFor="modal-name">Full Name</label>
                      <input
                        type="text"
                        id="modal-name"
                        required
                        placeholder="e.g. Harshad Nikam"
                        className="px-4 py-3 rounded-xl bg-[#030308]/60 border border-white/5 focus:border-cyan-400/40 text-xs text-white focus:outline-none transition-all duration-300 focus:shadow-[0_0_12px_rgba(0,240,255,0.05)]"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      />
                    </div>

                    {/* Email */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[9px] uppercase font-bold tracking-widest text-[#9aa2b1]" htmlFor="modal-email">Email Address</label>
                      <input
                        type="email"
                        id="modal-email"
                        required
                        placeholder="e.g. harshad@example.com"
                        className="px-4 py-3 rounded-xl bg-[#030308]/60 border border-white/5 focus:border-cyan-400/40 text-xs text-white focus:outline-none transition-all duration-300 focus:shadow-[0_0_12px_rgba(0,240,255,0.05)]"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {/* Phone */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[9px] uppercase font-bold tracking-widest text-[#9aa2b1]" htmlFor="modal-phone">Mobile Number</label>
                      <input
                        type="tel"
                        id="modal-phone"
                        required
                        placeholder="e.g. +91 98765 43210"
                        className="px-4 py-3 rounded-xl bg-[#030308]/60 border border-white/5 focus:border-cyan-400/40 text-xs text-white focus:outline-none transition-all duration-300 focus:shadow-[0_0_12px_rgba(0,240,255,0.05)]"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      />
                    </div>

                    {/* Position */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[9px] uppercase font-bold tracking-widest text-[#9aa2b1]" htmlFor="modal-position">Position Applying For</label>
                      <select
                        id="modal-position"
                        required
                        className="px-4 py-3 rounded-xl bg-[#030308]/60 border border-white/5 focus:border-cyan-400/40 text-xs text-white focus:outline-none transition-all duration-300 focus:shadow-[0_0_12px_rgba(0,240,255,0.05)] select-custom"
                        value={formData.position}
                        onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                      >
                        <option value="" disabled>Select role...</option>
                        {VACANCIES.map(job => (
                          <option key={job.title} value={job.title}>{job.title}</option>
                        ))}
                        <option value="General Application">Other / General Application</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {/* Experience slider */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[9px] uppercase font-bold tracking-widest text-[#9aa2b1]" htmlFor="modal-exp">Years of Experience ({formData.experience} Years)</label>
                      <div className="flex items-center gap-3 mt-1.5">
                        <span className="text-[10px] text-[#9aa2b1]">0</span>
                        <input
                          type="range"
                          id="modal-exp"
                          min="0"
                          max="20"
                          step="1"
                          className="flex-grow accent-cyan-400 bg-white/10 rounded-full h-1 cursor-pointer"
                          value={formData.experience}
                          onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                        />
                        <span className="text-[10px] text-[#9aa2b1]">20+</span>
                      </div>
                    </div>

                    {/* City */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[9px] uppercase font-bold tracking-widest text-[#9aa2b1]" htmlFor="modal-city">Current City</label>
                      <input
                        type="text"
                        id="modal-city"
                        required
                        placeholder="e.g. Mumbai, Pune"
                        className="px-4 py-3 rounded-xl bg-[#030308]/60 border border-white/5 focus:border-cyan-400/40 text-xs text-white focus:outline-none transition-all duration-300 focus:shadow-[0_0_12px_rgba(0,240,255,0.05)]"
                        value={formData.city}
                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      />
                    </div>
                  </div>

                  {/* Drag-n-drop Upload Resume */}
                  <div className="flex flex-col gap-1.5">
                    <span className="text-[9px] uppercase font-bold tracking-widest text-[#9aa2b1]">Upload Resume (PDF, DOCX)</span>
                    <label className="flex flex-col items-center justify-center w-full h-[95px] rounded-xl border border-dashed border-white/10 hover:border-cyan-400/30 bg-[#030308]/30 hover:bg-cyan-400/5 cursor-pointer transition-all duration-300">
                      <div className="flex flex-col items-center justify-center p-2 text-center">
                        <Upload className="w-4 h-4 text-cyan-400 mb-1" />
                        <span className="text-[11px] text-[#9aa2b1]">
                          {formData.resume ? formData.resume.name : 'Select CV file...'}
                        </span>
                      </div>
                      <input
                        type="file"
                        required={!formData.resume}
                        accept=".pdf,.doc,.docx"
                        className="hidden"
                        onChange={(e) => setFormData({ ...formData, resume: e.target.files[0] })}
                      />
                    </label>
                  </div>

                  {/* Message */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[9px] uppercase font-bold tracking-widest text-[#9aa2b1]" htmlFor="modal-message">Message (Optional)</label>
                    <textarea
                      id="modal-message"
                      rows="2"
                      placeholder="Why do you wish to build tomorrow's landmarks with Shree Samarth?"
                      className="px-4 py-3 rounded-xl bg-[#030308]/60 border border-white/5 focus:border-cyan-400/40 text-xs text-white focus:outline-none transition-all duration-300 focus:shadow-[0_0_12px_rgba(0,240,255,0.05)] resize-none"
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-full font-sans font-bold text-xs uppercase tracking-widest text-white bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 disabled:from-blue-800 disabled:to-cyan-800 transition-all duration-300 shadow-[0_10px_20px_rgba(0,240,255,0.2)]"
                  >
                    {submitting ? (
                      <>
                        <div className="w-3.5 h-3.5 rounded-full border-2 border-white/20 border-t-white animate-spin" />
                        <span>Transmitting Credentials...</span>
                      </>
                    ) : (
                      <>
                        <span>Submit Secure Application</span>
                        <Send size={12} />
                      </>
                    )}
                  </button>
                </form>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  )
}
