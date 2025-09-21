"use client";

import Image from "next/image";
import Link from "next/link";

// كومبوننت الفوتر
interface FooterProps {
  lang: string;
}

export default function Footer({ lang }: FooterProps) {
  const content = {
    ar: {
      slogan: "فكر . ابرمج . ابتكر",
      tagline: "مدرسة القسم الرقمي والإبداعي",
      contactTitle: "معلومات التواصل",
      quickLinksTitle: "روابط سريعة",
      pricing: "الأسعار",
      projects: "المشاريع",
      testimonials: "آراء العملاء",
      curriculum: "المناهج",
      copyright: "© 2025 GCschool. جميع الحقوق محفوظة.",
    },
    en: {
      slogan: "Think . Code . Innovate",
      tagline: "School of digital and creative department",
      contactTitle: "Contact Info",
      quickLinksTitle: "Quick Links",
      pricing: "Pricing",
      projects: "Projects",
      testimonials: "Testimonials",
      curriculum: "Curriculum",
      copyright: "© 2025 GCschool. All rights reserved.",
    },
  };
  return (
    <footer className="pt-8 text-white bg-orange-500" id="contact">
      <div className="container grid grid-cols-1 gap-6 pb-5 md:grid-cols-3">
        <div>
          <Link
            className="flex gap-3 items-center mb-4 font-extrabold text-white"
            href="#"
          >
            <Image src="/log.png" alt="GCschool" width={240} height={70} />
          </Link>
          <div className="space-y-2">
            <h3 className="text-lg font-semibold text-white">
              {content[lang].slogan}
            </h3>
            <p className="text-sm text-white/90">{content[lang].tagline}</p>
          </div>
        </div>
        <div>
          <h4 className="mb-4 font-semibold text-white">
            {content[lang].contactTitle}
          </h4>
          <ul className="grid gap-2 p-0 m-0 list-none">
            <li className="flex gap-2 items-center text-white/90">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
              </svg>
              contact@gcschool.tech
            </li>
            <li className="flex gap-2 items-center text-white/90">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
              </svg>
              +201211506816
            </li>
          </ul>
        </div>
        <div>
          <h4 className="mb-4 font-semibold text-white">
            {content[lang].quickLinksTitle}
          </h4>
          <ul className="grid gap-2 p-0 m-0 list-none">
            <li>
              <Link
                href="#pricing"
                className="transition-colors hover:text-white/80 text-white/90"
              >
                {content[lang].pricing}
              </Link>
            </li>
            <li>
              <Link
                href="#projects"
                className="transition-colors hover:text-white/80 text-white/90"
              >
                {content[lang].projects}
              </Link>
            </li>
            <li>
              <Link
                href="#leaders"
                className="transition-colors hover:text-white/80 text-white/90"
              >
                {content[lang].testimonials}
              </Link>
            </li>
            <li>
              <Link
                href="#faq"
                className="transition-colors hover:text-white/80 text-white/90"
              >
                {lang === "ar" ? "الأسئلة الشائعة" : "FAQ"}
              </Link>
            </li>
            <li>
              <Link
                href="#curriculum"
                className="transition-colors hover:text-white/80 text-white/90"
              >
                {content[lang].curriculum}
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="py-4 text-center border-t border-white/20 text-white/80">
        {content[lang].copyright}
      </div>
    </footer>
  );
}
