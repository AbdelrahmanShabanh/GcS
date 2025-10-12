"use client";

import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { ApiClient } from "../../utils/api";

// كومبوننت المشاريع
interface ProjectsProps {
  lang: string;
}

export default function Projects({ lang }: ProjectsProps) {
  const [items, setItems] = useState([]);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

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

  // Handle mouse wheel horizontal scrolling
  const handleWheel = (e: React.WheelEvent) => {
    if (scrollContainerRef.current) {
      e.preventDefault();
      scrollContainerRef.current.scrollBy({
        left: e.deltaY,
        behavior: "smooth",
      });
    }
  };

  // Handle mouse enter - disable body scroll
  const handleMouseEnter = () => {
    document.body.style.overflow = "hidden";
  };

  // Handle mouse leave - enable body scroll
  const handleMouseLeave = () => {
    document.body.style.overflow = "auto";
  };

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
        <div className="relative">
          {/* Horizontal scroll container */}
          <div
            ref={scrollContainerRef}
            className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide"
            style={{
              scrollbarWidth: "none",
              msOverflowStyle: "none",
              WebkitOverflowScrolling: "touch",
            }}
            onWheel={handleWheel}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            {items.map((item, index) => (
              <div
                className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden group flex-shrink-0 w-80"
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
      </div>
    </section>
  );
}
