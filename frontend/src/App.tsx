import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import Navbar from "./components/Navbar";
import { useStore } from "./store/useStore";
import API from "./services/api"; // फिक्स केलेली इम्पोर्ट लाईन

// १. TypeScript Interfaces
interface Project {
  _id: string;
  title: string;
  location: string;
  status: "Completed" | "Ongoing" | "Upcoming";
  category: string;
  imageUrl: string;
  sqft?: string;
  bhk?: string;
  amenities?: string[];
}

interface CareerFormInputs {
  name: string;
  email: string;
  phone: string;
  message: string;
  resume: FileList;
}

// २. ब्रोशरनुसार अचूक प्रीमियम डेटा (Real Brochure Details)
const PREMIUM_PROJECTS_DATA: Project[] = [
  {
    _id: "p1",
    title: "VISHWAVEER Park",
    location: "Shivane, Pune",
    status: "Ongoing",
    category: "1 & 2 BHK Luxurious Homes",
    imageUrl:
      "http://googleusercontent.com/image_collection/image_retrieval/15369894384836291512",
    sqft: "572 - 1100 Sq. Ft.",
    bhk: "1 & 2 BHK",
    amenities: ["Children Play Area", "Club House", "MahaRERA Registered"],
  },
  {
    _id: "p2",
    title: "Motiram Vihar",
    location: "Shahupuri, Kolhapur",
    status: "Completed",
    category: "The Quality People Trust",
    imageUrl:
      "http://googleusercontent.com/image_collection/image_retrieval/16666237162744499560",
    sqft: "1200 - 2400 Sq. Ft.",
    bhk: "2 & 3 BHK Luxury Flats",
    amenities: [
      "Premium Elevators",
      "Showrooms at Ground Floor",
      "Decorative LED Lighting",
    ],
  },
  {
    _id: "p3",
    title: "Samarth Mauli",
    location: "Shivane, Pune",
    status: "Completed",
    category: "1 BHK & 2 BHK Luxurious Homes",
    imageUrl:
      "http://googleusercontent.com/image_collection/image_retrieval/17647669092628506636",
    sqft: "600 - 1050 Sq. Ft.",
    bhk: "1 & 2 BHK",
    amenities: [
      "Modern Architectural Design",
      "Car Parking",
      "Excellent Ventilation",
    ],
  },
  {
    _id: "p4",
    title: "Samarth Sai",
    location: "Kondhwa Budruk, Pune",
    status: "Upcoming",
    category: "1 BHK Luxurious Flats",
    imageUrl:
      "http://googleusercontent.com/image_collection/image_retrieval/17694367151313124334",
    sqft: "540 - 618 Sq. Ft.",
    bhk: "1 BHK Elite",
    amenities: [
      "PMC Sanctioned Project",
      "Iscon Temple Vicinity",
      "Lift with Power Backup",
    ],
  },
  {
    _id: "p5",
    title: "Samarth Deep / Goodwill",
    location: "Dangat Patil Nagar, Shivane, Pune",
    status: "Ongoing",
    category: "1 BHK Luxurious Apartments",
    imageUrl:
      "http://googleusercontent.com/image_collection/image_retrieval/15291529588995693596",
    sqft: "452 - 618 Sq. Ft.",
    bhk: "1 BHK Flats",
    amenities: [
      "Typical Vastu Compliance",
      "Prime Residential Location",
      "Gated Compound",
    ],
  },
];

const App: React.FC = () => {
  const { language } = useStore();
  const [videoLoaded, setVideoLoaded] = useState(false);

  const [projects, setProjects] = useState<Project[]>(PREMIUM_PROJECTS_DATA);
  const [filter, setFilter] = useState<string>("All");
  const [loadingProjects, setLoadingProjects] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CareerFormInputs>();
  const [submittingCareer, setSubmittingCareer] = useState(false);
  const [careerSuccess, setCareerSuccess] = useState("");

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoadingProjects(true);
        const endpoint =
          filter === "All" ? "/projects" : `/projects?status=${filter}`;
        const res = await API.get(endpoint);

        if (res.data && res.data.data && res.data.data.length > 0) {
          setProjects(res.data.data);
        } else {
          const filtered =
            filter === "All"
              ? PREMIUM_PROJECTS_DATA
              : PREMIUM_PROJECTS_DATA.filter((p) => p.status === filter);
          setProjects(filtered);
        }
      } catch (err) {
        const filtered =
          filter === "All"
            ? PREMIUM_PROJECTS_DATA
            : PREMIUM_PROJECTS_DATA.filter((p) => p.status === filter);
        setProjects(filtered);
      } finally {
        setLoadingProjects(false);
      }
    };
    fetchProjects();
  }, [filter]);

  const onCareerSubmit = async (data: CareerFormInputs) => {
    try {
      setSubmittingCareer(true);
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("email", data.email);
      formData.append("phone", data.phone);
      formData.append("message", data.message);
      formData.append("resume", data.resume[0]);

      await API.post("/applications/apply", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setCareerSuccess(
        "अर्ज यशस्वीरित्या प्राप्त झाला! / Application Received!",
      );
      reset();
    } catch (err) {
      console.error(err);
      alert("काहीतरी चूक झाली, पुन्हा प्रयत्न करा.");
    } finally {
      setSubmittingCareer(false);
    }
  };

  return (
    <div className="bg-neutral-950 text-white min-h-screen font-sans selection:bg-amber-500 selection:text-black">
      <Navbar />

      {/* ==================== 1. HERO SECTION WITH LOGO INTEGRATION ==================== */}
      <section
        id="home"
        className="relative h-screen w-full flex items-center justify-center bg-black"
      >
        <div
          className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ${videoLoaded ? "opacity-0" : "opacity-100"}`}
          style={{
            backgroundImage:
              "url('http://googleusercontent.com/image_collection/image_retrieval/15291529588995693596')",
          }}
        />
        <video
          autoPlay
          loop
          muted
          playsInline
          onCanPlayThrough={() => setVideoLoaded(true)}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${videoLoaded ? "opacity-20" : "opacity-0"}`}
        >
          <source
            src="https://res.cloudinary.com/your-cloud/video/upload/q_auto,vc_vp9/hero-drone.mp4"
            type="video/mp4"
          />
        </video>

        <div className="relative z-10 text-center px-6 max-w-5xl flex flex-col items-center">
          {/* BRAND NEW GOLDEN LOGO LAYER */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="w-32 h-32 md:w-40 md:h-40 mb-6 bg-white/5 backdrop-blur-md rounded-full p-2 border border-amber-500/20 shadow-2xl flex items-center justify-center"
          >
            <img
              src="E:"
              alt="Shree Samarth Group Official Logo"
              className="w-full h-full object-contain filter drop-shadow-[0_0_15px_rgba(245,158,11,0.4)]"
            />
          </motion.div>

          <span className="text-amber-500 uppercase tracking-[0.4em] text-xs font-bold font-mono block mb-4">
            SHREE SAMARTH GROUP
          </span>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl md:text-6xl font-extrabold tracking-tight leading-tight"
          >
            {language === "EN"
              ? "Unity • Integrity • Progress"
              : "एकता • प्रामाणिकता • प्रगती"}{" "}
            <br />
            <span className="text-amber-500 text-3xl md:text-5xl font-bold mt-2 block tracking-wide">
              {language === "EN"
                ? "Building The Lifestyle You Deserve"
                : "तुमच्या स्वप्नातील परिपूर्ण घरांची निर्मिती."}
            </span>
          </motion.h1>

          <div className="mt-10 flex justify-center gap-4">
            <a
              href="#projects"
              className="px-8 py-3.5 bg-amber-500 text-neutral-950 font-bold uppercase tracking-wider text-xs rounded shadow-xl hover:bg-amber-400 transition duration-300"
            >
              {language === "EN" ? "Explore Portfolio" : "प्रकल्प पहा"}
            </a>
            <a
              href="#contact"
              className="px-8 py-3.5 border border-white/20 rounded backdrop-blur-sm uppercase tracking-wider text-xs hover:bg-white/10 transition duration-300"
            >
              {language === "EN" ? "Contact Office" : "संपर्क करा"}
            </a>
          </div>
        </div>
      </section>

      {/* ==================== 2. ABOUT US SECTION ==================== */}
      <section
        id="about"
        className="py-32 max-w-7xl mx-auto px-6 md:px-12 border-b border-neutral-900"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div>
            <span className="text-amber-500 uppercase tracking-widest text-xs font-bold font-mono">
              Our Heritage
            </span>
            <h2 className="text-3xl md:text-5xl font-bold mt-2 tracking-tight">
              {language === "EN"
                ? "The Quality People Trust"
                : "गुणवत्ता आणि विश्वासाची २५ वर्षे"}
            </h2>
            <p className="text-neutral-400 mt-6 leading-relaxed text-base">
              {language === "EN"
                ? "Shree Samarth Group builds structural excellence with absolute integrity. Focusing on meticulous craftsmanship and strategic urban planning, we provide premium residential landmarks in Pune and Kolhapur."
                : "श्री समर्थ ग्रुप बांधकाम क्षेत्रातील सचोटी आणि गुणवत्तेचे प्रतीक आहे. प्रत्येक प्रकल्पामध्ये अचूक इंजिनिअरिंग आणि ग्राहकांच्या सुखाचा विचार करूनच आम्ही पुण्यात आणि कोल्हापुरात दर्जेदार वास्तूंची उभारणी करत आहोत."}
            </p>
            <div className="grid grid-cols-2 gap-4 mt-8">
              {[
                "MahaRERA Approved",
                "Absolute Transparency",
                "Elite Materials",
                "Timely Possession",
              ].map((value, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 border border-neutral-900/60 p-4 bg-neutral-900/10 rounded"
                >
                  <span className="text-amber-500 font-bold">✓</span>{" "}
                  <span className="text-sm font-semibold text-gray-200">
                    {value}
                  </span>
                </div>
              ))}
            </div>
          </div>
          <div className="h-[400px] rounded-lg border border-neutral-900 shadow-2xl overflow-hidden relative group">
            <img
              src="http://googleusercontent.com/image_collection/image_retrieval/13742465229652195631"
              alt="Corporate Branding Logo Context"
              className="w-full h-full object-cover filter brightness-90 group-hover:scale-105 transition duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-transparent to-transparent opacity-80"></div>
          </div>
        </div>
      </section>

      {/* ==================== 3. PROJECTS SECTION (BROCHURE ACCURATE GRID) ==================== */}
      <section id="projects" className="py-32 bg-neutral-950 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-neutral-900 pb-8">
            <div>
              <span className="text-amber-500 uppercase tracking-widest text-xs font-bold font-mono">
                Landmarks
              </span>
              <h2 className="text-3xl md:text-5xl font-bold mt-2 tracking-tight">
                {language === "EN"
                  ? "Architectural Portfolio"
                  : "आमचे भव्य अधिकृत प्रकल्प"}
              </h2>
            </div>

            <div className="flex gap-2 mt-6 md:mt-0 overflow-x-auto pb-2 scrollbar-none">
              {["All", "Ongoing", "Completed", "Upcoming"].map((status) => (
                <button
                  key={status}
                  onClick={() => setFilter(status)}
                  className={`px-5 py-2.5 rounded text-xs font-bold tracking-widest transition duration-300 ${
                    filter === status
                      ? "bg-amber-500 text-neutral-950 shadow-lg font-black"
                      : "bg-neutral-900/50 text-gray-400 hover:text-white"
                  }`}
                >
                  {status.toUpperCase()}
                </button>
              ))}
            </div>
          </div>

          {loadingProjects ? (
            <div className="h-64 flex items-center justify-center text-amber-500 font-mono tracking-widest animate-pulse">
              LOADING ARCHITECTURAL LAYERS...
            </div>
          ) : (
            <motion.div
              layout
              className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-12"
            >
              <AnimatePresence mode="popLayout">
                {projects.map((project) => (
                  <motion.div
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.4 }}
                    key={project._id}
                    className="bg-neutral-900/10 border border-neutral-900 rounded-lg overflow-hidden group hover:border-amber-500/20 transition duration-300 flex flex-col justify-between"
                  >
                    <div>
                      <div className="h-[380px] overflow-hidden relative bg-neutral-900">
                        <img
                          src={project.imageUrl}
                          alt={project.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition duration-700 filter brightness-95"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/20 to-transparent opacity-80"></div>

                        <span className="absolute top-6 right-6 text-[10px] font-bold tracking-widest uppercase bg-neutral-950 border border-amber-500/30 text-amber-500 px-3 py-1.5 rounded backdrop-blur-md">
                          {project.status}
                        </span>

                        {project.bhk && (
                          <span className="absolute bottom-6 left-6 text-xs font-bold bg-amber-500 text-neutral-950 px-3 py-1 rounded shadow-lg">
                            {project.bhk}
                          </span>
                        )}
                      </div>

                      <div className="p-8">
                        <span className="text-amber-500/80 text-xs font-mono font-medium block mb-1 uppercase tracking-wider">
                          {project.category}
                        </span>
                        <h3 className="text-2xl font-bold tracking-wide text-white group-hover:text-amber-500 transition duration-300">
                          {project.title}
                        </h3>
                        <p className="text-gray-400 text-sm mt-2 flex items-center gap-2">
                          <span>📍</span> {project.location}
                        </p>

                        {project.sqft && (
                          <p className="text-neutral-500 text-xs font-mono mt-2">
                            📐 Salable Area: {project.sqft}
                          </p>
                        )}

                        {project.amenities && (
                          <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-neutral-900/60">
                            {project.amenities.map((amenity, index) => (
                              <span
                                key={index}
                                className="text-[10px] font-medium bg-neutral-900 border border-neutral-800 text-neutral-400 px-2 py-1 rounded"
                              >
                                • {amenity}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          )}
        </div>
      </section>

      {/* ==================== 4. CAREERS SECTION ==================== */}
      <section
        id="careers"
        className="py-32 max-w-4xl mx-auto px-6 border-t border-neutral-900"
      >
        <div className="text-center mb-12">
          <span className="text-amber-500 uppercase tracking-widest text-xs font-bold font-mono">
            Careers
          </span>
          <h2 className="text-3xl md:text-5xl font-bold mt-2 tracking-tight">
            {language === "EN" ? "Build With Passion" : "आमच्यासोबत करिअर घडवा"}
          </h2>
        </div>

        {careerSuccess && (
          <div className="p-4 mb-6 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 rounded text-center text-sm">
            {careerSuccess}
          </div>
        )}

        <form
          onSubmit={handleSubmit(onCareerSubmit)}
          className="space-y-6 bg-neutral-900/10 p-8 border border-neutral-900 rounded-lg"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">
                Full Name
              </label>
              <input
                type="text"
                {...register("name", { required: true })}
                className="w-full bg-neutral-950 border border-neutral-900 rounded p-3 focus:border-amber-500 outline-none transition text-sm text-white"
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">
                Email Address
              </label>
              <input
                type="email"
                {...register("email", { required: true })}
                className="w-full bg-neutral-950 border border-neutral-900 rounded p-3 focus:border-amber-500 outline-none transition text-sm text-white"
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">
                Phone Number
              </label>
              <input
                type="tel"
                {...register("phone", { required: true })}
                className="w-full bg-neutral-950 border border-neutral-900 rounded p-3 focus:border-amber-500 outline-none transition text-sm text-white"
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">
                Upload Resume (PDF Only)
              </label>
              <input
                type="file"
                accept=".pdf"
                {...register("resume", { required: true })}
                className="w-full bg-neutral-950 border border-neutral-900 text-gray-400 file:bg-neutral-800 file:border-0 file:text-white file:px-4 file:py-2 file:mr-4 file:text-xs file:rounded cursor-pointer p-1.5 text-xs"
              />
            </div>
          </div>
          <button
            type="submit"
            disabled={submittingCareer}
            className="w-full py-3.5 bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold uppercase tracking-widest text-xs rounded transition duration-300 shadow-lg"
          >
            {submittingCareer
              ? "PROCESSING APPLICATION..."
              : "SUBMIT APPLICATION"}
          </button>
        </form>
      </section>

      {/* ==================== 5. CONTACT US SECTION ==================== */}
      <section
        id="contact"
        className="py-32 bg-neutral-900/10 border-t border-neutral-900 px-6 md:px-12"
      >
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16">
          <div>
            <span className="text-amber-500 uppercase tracking-widest text-xs font-bold font-mono">
              Corporate Relations
            </span>
            <h2 className="text-3xl md:text-5xl font-bold mt-2 tracking-tight">
              {language === "EN" ? "Get In Touch" : "मुख्य कार्यालय संपर्क"}
            </h2>
            <div className="mt-8 space-y-6 text-gray-400 text-base">
              <p className="flex items-start gap-3">
                <span className="text-amber-500">📍</span>
                <span>
                  <strong>Corporate Office:</strong> Shree Samarth Elite,
                  Shahupuri, Kolhapur, Maharashtra.
                </span>
              </p>
              <p className="flex items-center gap-3">
                <span className="text-amber-500">📞</span>{" "}
                <span>+91 98505 22778 / +91 83088 65727</span>
              </p>
              <p className="flex items-center gap-3">
                <span className="text-amber-500">✉️</span>{" "}
                <span>info@shreesamarthgroup.com</span>
              </p>
            </div>

            <a
              href="https://wa.me/919850522778?text=Hello%20Shree%20Samarth%20Group,%20I%20am%20interested%20in%20your%20projects."
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 mt-8 px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold uppercase tracking-wider rounded transition shadow-lg"
            >
              💬 Chat on WhatsApp
            </a>
          </div>

          <div className="h-80 md:h-full bg-neutral-950 rounded border border-neutral-900 overflow-hidden shadow-xl">
            <iframe
              title="Office Location Map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d122283.79427329243!2d74.16823335!3d16.70614115!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc1000cdec07a29%3A0xe28e158dfb688657!2sKolhapur%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1710000000000!5m2!1sen!2sin"
              className="w-full h-full border-0 filter invert contrast-125 brightness-75 grayscale"
              allowFullScreen
              loading="lazy"
            />
          </div>
        </div>
      </section>

      {/* ==================== FOOTER ==================== */}
      <footer className="py-12 text-center text-xs text-gray-600 border-t border-neutral-900 bg-neutral-950">
        © 2026 Shree Samarth Group. All Rights Reserved. Unity • Integrity •
        Progress.
      </footer>
    </div>
  );
};

export default App;
