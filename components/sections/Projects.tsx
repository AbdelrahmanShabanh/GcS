"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { ApiClient } from "@/utils/api";

// كومبوننت المشاريع
interface ProjectsProps {
  lang: string;
}

export default function Projects({ lang }: ProjectsProps) {
  const [items, setItems] = useState([
    {
      img: "/377-3774504_scratch-logo-hd-png-download.png",
      t: {
        ar: "قاتل الفضاء",
        en: "Space Fighter",
      },
      d: {
        ar: "أنشئ والعب لعبتك ثلاثية الأبعاد.",
        en: "Create and play your 3D game.",
      },
    },
    {
      img: "/377-3774504_scratch-logo-hd-png-download.png",
      t: {
        ar: "سيارة الفضاء",
        en: "Space Car",
      },
      d: {
        ar: "قد سيارتك في فضاء لا نهائي.",
        en: "Drive your car in infinite space.",
      },
    },
    {
      img: "/377-3774504_scratch-logo-hd-png-download.png",
      t: {
        ar: "طيار الدرون",
        en: "Drone Pilot",
      },
      d: {
        ar: "حلّق بطائرتك في بيئة ثلاثية الأبعاد مذهلة.",
        en: "Fly your drone in an amazing 3D environment.",
      },
    },
    {
      img: "/377-3774504_scratch-logo-hd-png-download.png",
      t: {
        ar: "لعبة البولينج",
        en: "Bowling Game",
      },
      d: {
        ar: "اصنع لعبتك وتحدَّ أصدقاءك.",
        en: "Create your game and challenge your friends.",
      },
    },
  ]);

  useEffect(() => {
    const loadProjects = async () => {
      try {
        const response = await ApiClient.getProjects();
        if (response.success && response.data) {
          const transformedProjects = response.data.map((project: any) => ({
            img: project.image,
            t: {
              ar: project.name,
              en: project.name,
            },
            d: project.description,
          }));
          setItems(transformedProjects);
        }
      } catch (error) {
        console.error("Error loading projects:", error);
      }
    };

    loadProjects();
  }, []);

  const content = {
    ar: {
      title: "اكتشف بعض من مشاريع الطلاب",
    },
    en: {
      title: "Discover Some Student Projects",
    },
  };

  return (
    <section className="py-8 sm:py-12 lg:py-16 bg-white" id="projects">
      <div className="container px-4 sm:px-6 lg:px-8">
        <h2 className="mb-8 text-2xl section-title sm:text-3xl lg:text-4xl sm:mb-12 text-center">
          {content[lang].title}
        </h2>
        <div
          className={`grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4 max-w-6xl mx-auto ${
            lang === "ar" ? "rtl" : "ltr"
          }`}
        >
          {items.map((item, index) => (
            <div
              className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden group"
              key={index}
            >
              <div className="relative w-full h-48 bg-gray-100 overflow-hidden">
                {item.img.includes("data:image/gif") ||
                item.img.endsWith(".gif") ? (
                  <img
                    src={item.img}
                    alt={item.t[lang]}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    onMouseEnter={(e) => {
                      const img = e.target as HTMLImageElement;
                      img.src = img.src; // Restart the GIF
                    }}
                  />
                ) : (
                  <Image
                    src={item.img}
                    alt={item.t[lang]}
                    width={400}
                    height={200}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                )}
              </div>
              <div className="p-4 sm:p-6">
                <h4 className="mb-2 text-lg font-semibold text-gray-900">
                  {item.t[lang]}
                </h4>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {item.d[lang]}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
