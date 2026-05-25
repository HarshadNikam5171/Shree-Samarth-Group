import { create } from "zustand";

// १. स्टोअरच्या स्टेटचा आणि फंक्शन्सचा प्रकार (TypeScript Interface)
interface AppState {
  language: "EN" | "MR";
  setLanguage: (lang: "EN" | "MR") => void;
  activeSection: string;
  setActiveSection: (section: string) => void;
}

// २. Zustand Store ची निर्मिती
export const useStore = create<AppState>((set) => ({
  // सुरुवातीची भाषा इंग्रजी (Default Language)
  language: "EN",

  // भाषा बदलण्याचे फंक्शन
  setLanguage: (lang) => set({ language: lang }),

  // सुरुवातीचा चालू असलेला सेक्शन
  activeSection: "#home",

  // युझर कोणत्या सेक्शनवर आहे ते अपडेट करण्याचे फंक्शन
  setActiveSection: (section) => set({ activeSection: section }),
}));
