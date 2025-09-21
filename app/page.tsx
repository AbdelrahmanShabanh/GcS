"use client";

import { useState, useEffect } from "react";

// Import all components
// import Topbar from "../components/sections/Topbar";
import Header from "../components/sections/Header";
import Hero from "../components/sections/Hero";
// import Tools from "../components/sections/Tools";
import Why from "../components/sections/Why";
import LearningPath from "../components/sections/LearningPath";
import Projects from "../components/sections/Projects";
import Pricing from "../components/sections/Pricing";
import Leaders from "../components/sections/Leaders";
import FAQ from "../components/sections/FAQ";
import Certificate from "../components/sections/Certificate";
import Footer from "../components/sections/Footer";

// الصفحة الرئيسية بتجمع كل الأقسام
export default function HomePage() {
  const [lang, setLang] = useState("ar"); // Arabic as default

  useEffect(() => {
    // Update document direction and language based on state
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
    document.documentElement.lang = lang;
  }, [lang]);

  return (
    <main className={lang === "ar" ? "rtl" : "ltr"}>
      {/* <Topbar /> */}
      <Header lang={lang} setLang={setLang} />
      <Hero lang={lang} />
      {/* <Tools /> */}
      <Why lang={lang} />
      <LearningPath lang={lang} />
      <Projects lang={lang} />
      <Pricing lang={lang} />
      <Leaders lang={lang} />
      <FAQ lang={lang} />
      <Certificate lang={lang} />
      <Footer lang={lang} />
    </main>
  );
}
