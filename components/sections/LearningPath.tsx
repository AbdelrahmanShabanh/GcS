"use client";

import Image from "next/image";
import { useState } from "react";

// كومبوننت مسار التعلم
interface LearningPathProps {
  lang: string;
}

export default function LearningPath({ lang }: LearningPathProps) {
  const tabs = {
    ar: ["المستوى الاول", "المستوى الثاني", "المستوى الثالث"],
    en: ["Level 1", "Level 2", "Level 3"],
  };

  // المحتوى لكل مستوى (يمكنك تزويدنا بمحتوى المستوى الثاني/الثالث لاحقاً)
  const levelToCards: Record<
    string,
    { img: string; t: string; d: { ar: string; en: string } }[]
  > = {
    "المستوى الاول": [
      {
        img: "/Code.org_logo.svg.png",
        t: "Code.org Pre",
        d: { ar: "6 حصص", en: "6 sessions" },
      },
      {
        img: "/download.jpeg",
        t: "Scratch Jr",
        d: { ar: "6 حصص", en: "6 sessions" },
      },
      {
        img: "/codeorg2019_social.webp",
        t: "Code.org Express",
        d: { ar: "6 حصص", en: "6 sessions" },
      },
      {
        img: "/377-3774504_scratch-logo-hd-png-download.png",
        t: "Scratch",
        d: { ar: "6 حصص", en: "6 sessions" },
      },
    ],
    "المستوى الثاني": [
      {
        img: "/7c53b61d-0a24-408b-84e6-1bcec10775f6.png",
        t: "PictoBlox (ML)",
        d: { ar: "6 حصص", en: "6 sessions" },
      },
      {
        img: "/images.png",
        t: "EduBlocks (Web)",
        d: { ar: "6 حصص", en: "6 sessions" },
      },
      {
        img: "/images (1).png",
        t: "EduBlocks (Python)",
        d: { ar: "6 حصص", en: "6 sessions" },
      },
      {
        img: "/MIT-App-Inventor-Platform-Icon-MIT-App-Inventor-is-a-platform-for-creating-open-source_Q320.jpg",
        t: "MIT App Inventor",
        d: { ar: "6 حصص", en: "6 sessions" },
      },
    ],
    "المستوى الثالث": [
      {
        img: "/HTML-CSS-JS-Logo.png",
        t: "Web Development",
        d: { ar: "24 حصه", en: "24 sessions" },
      },
      {
        img: "/Python.svg.png",
        t: "Python",
        d: { ar: "18 حصه", en: "18 sessions" },
      },
    ],
  };

  const [activeTab, setActiveTab] = useState<string>(tabs.ar[0]);
  const cards = levelToCards[activeTab] ?? [];

  const content = {
    ar: {
      title: "مسار التعلم",
      comingSoon: "سيتم إضافة محتوى",
    },
    en: {
      title: "Learning Path",
      comingSoon: "Content for",
    },
  };

  return (
    <section
      className="py-8 sm:py-12 lg:py-16 bg-secondary-50"
      id="learning-path"
    >
      <div className="container px-4 sm:px-6 lg:px-8">
        <h2 className="mb-6 text-2xl section-title sm:text-3xl lg:text-4xl sm:mb-8">
          {content[lang].title}
        </h2>
        <div className="flex gap-2 sm:gap-2.5 flex-wrap justify-center mb-5 sm:mb-6">
          {tabs[lang].map((t, index) => {
            const arabicTab = tabs.ar[index];
            return (
              <button
                type="button"
                onClick={() => setActiveTab(arabicTab)}
                className={`px-3 sm:px-3.5 py-2 sm:py-2.5 rounded-full cursor-pointer transition-colors text-sm sm:text-base ${
                  activeTab === arabicTab
                    ? "bg-primary-500 text-white"
                    : "bg-white border border-primary-200 text-gray-700 hover:bg-gray-50"
                }`}
                key={t}
                aria-pressed={activeTab === arabicTab}
              >
                {t}
              </button>
            );
          })}
        </div>
        {cards.length > 0 ? (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 sm:gap-6">
            {cards.map((c) => (
              <div
                className="bg-white rounded-xl shadow-sm transition-shadow duration-200 card hover:shadow-md"
                key={c.t}
              >
                <div className="overflow-hidden relative w-full h-40 rounded-t-xl sm:h-48">
                  <Image
                    src={c.img}
                    alt={c.t}
                    width={280}
                    height={200}
                    className="object-contain p-2 w-full h-full"
                  />
                </div>
                <div className="p-3 sm:p-4">
                  <h4 className="mb-1 text-sm font-semibold text-gray-900 sm:text-base sm:mb-2">
                    {c.t}
                  </h4>
                  <p className="text-xs text-gray-500 sm:text-sm">
                    {c.d[lang]}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="py-8 text-center text-gray-600 sm:py-12">
            <p className="text-sm sm:text-base">
              {content[lang].comingSoon}{" "}
              {tabs[lang][tabs.ar.indexOf(activeTab)]}{" "}
              {lang === "ar" ? "قريباً." : "coming soon."}
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
