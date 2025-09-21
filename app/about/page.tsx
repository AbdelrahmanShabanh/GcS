"use client";

import { useState, useEffect } from "react";
import Header from "../../components/sections/Header";
import Footer from "../../components/sections/Footer";
import AboutUs from "../../components/sections/AboutUs";

export default function AboutPage() {
  const [lang, setLang] = useState("ar"); // Arabic as default

  useEffect(() => {
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
    document.documentElement.lang = lang;
  }, [lang]);

  return (
    <main className="min-h-screen">
      <Header lang={lang} setLang={setLang} />
      <AboutUs lang={lang} />
      <Footer lang={lang} />
    </main>
  );
}
