import React, { useState, useEffect } from "react";
import { useStore } from "../store/useStore";

const Navbar: React.FC = () => {
  const { language, setLanguage, activeSection, setActiveSection } = useStore();
  const [isScrolled, setIsScrolled] = useState(false);

  // 1. बॅकग्राउंड चेंजसाठी स्क्रोल डिटेक्ट करणे
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // 2. Intersection Observer: युझर सध्या कोणत्या सेक्शनवर आहे हे ट्रॅक करणे
  useEffect(() => {
    const sections = document.querySelectorAll("section");
    
    // स्क्रीनच्या ३०% ते ६०% भागात जो सेक्शन येईल तो अ‍ॅक्टिव्ह होईल
    const options = { rootMargin: "-30% 0px -60% 0px" }; 

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(`#${entry.target.id}`);
        }
      });
    }, options);

    sections.forEach((section) => observer.observe(section));
    
    return () => {
      sections.forEach((section) => observer.unobserve(section));
    };
  }, [setActiveSection]);

  const menuItems = {
    EN: [
      { name: "Home", target: "#home" },
      { name: "About Us", target: "#about" },
      { name: "Projects", target: "#projects" },
      { name: "Careers", target: "#careers" },
      { name: "Contact", target: "#contact" },
    ],
    MR: [
      { name: "मुख्यपृष्ठ", target: "#home" },
      { name: "आमच्याबद्दल", target: "#about" },
      { name: "प्रकल्प", target: "#projects" },
      { name: "करिअर", target: "#careers" },
      { name: "संपर्क", target: "#contact" },
    ],
  };

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-neutral-950/90 backdrop-blur-md border-b border-neutral-900 py-4"
          : "bg-transparent py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center">
        <a
          href="#home"
          className="text-xl md:text-2xl font-bold tracking-wider text-white"
        >
          SHREE <span className="text-amber-500">SAMARTH</span>
        </a>

        <div className="hidden md:flex items-center gap-8">
          {menuItems[language].map((item) => {
            // तपासा की हा मेनू आयटम सध्या अ‍ॅक्टिव्ह आहे का
            const isActive = activeSection === item.target;

            return (
              <a
                key={item.target}
                href={item.target}
                className={`text-sm font-medium tracking-wide transition-all duration-300 ${
                  isActive
                    ? "text-amber-500 font-bold scale-105"
                    : "text-gray-300 hover:text-amber-500"
                }`}
              >
                {item.name}
              </a>
            );
          })}

          <button
            onClick={() => setLanguage(language === "EN" ? "MR" : "EN")}
            className="ml-4 px-3 py-1 text-xs font-mono font-bold border border-amber-500/50 text-amber-500 rounded hover:bg-amber-500 hover:text-neutral-950 transition duration-300"
          >
            {language === "EN" ? "मराठी" : "English"}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;