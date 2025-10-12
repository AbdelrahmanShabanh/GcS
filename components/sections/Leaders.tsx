"use client";

import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { ApiClient } from "../../utils/api";

interface LeadersProps {
  lang: "ar" | "en";
}

export default function Leaders({ lang }: LeadersProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState("");
  const [testimonials, setTestimonials] = useState([
    {
      id: "malek",
      name: { ar: "مالك", en: "Malek" },
      age: { ar: "13 سنة", en: "13 years" },
      video: "https://youtube.com/shorts/OnS7OhrMjPs?si=Wj2DDvb7l5tMqbNN",
      thumbnail: "/image_copy_2.png",
    },
    {
      id: "saja",
      name: { ar: "سجى", en: "Saja" },
      age: { ar: "9 سنوات", en: "9 years" },
      video: "https://youtube.com/shorts/Cg6HfDH6sbU?si=MFqFzFVDcfA2i_tb",
      thumbnail: "/image_copy.png",
    },
    {
      id: "parent",
      name: { ar: "ولي أمر", en: "Parent" },
      age: { ar: "", en: "" },
      video: "https://youtube.com/shorts/OHEKjwZjdpY?si=3EBksw_XHDSX2AK9",
      thumbnail: "/image.png",
    },
  ]);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loadLeaders = async () => {
      try {
        const response = await ApiClient.getLeaders();
        if (response.success && response.data) {
          setTestimonials(response.data);
        }
      } catch (error) {
        console.error("Error loading leaders:", error);
      }
    };

    loadLeaders();
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

  const content = {
    ar: {
      title: "آراء بعض عملائنا",
    },
    en: {
      title: "What Our Clients Say",
    },
  };

  const handleVideoClick = (videoUrl: string) => {
    setSelectedVideo(videoUrl);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedVideo("");
  };

  // Convert YouTube Shorts URL to embed URL
  const getEmbedUrl = (url: string) => {
    const videoId = url.split("/shorts/")[1]?.split("?")[0];
    return `https://www.youtube.com/embed/${videoId}`;
  };

  return (
    <section className="py-8 sm:py-12 lg:py-16 bg-secondary-50" id="leaders">
      <div className="container px-4 sm:px-6 lg:px-8">
        <h2 className="mb-14 text-2xl section-title sm:text-3xl lg:text-4xl sm:mb-13">
          {content[lang].title}
        </h2>

        <div className="relative">
          {/* Horizontal scroll container */}
          <div
            ref={scrollContainerRef}
            className="flex gap-8 overflow-x-auto pb-4 scrollbar-hide"
            style={{
              scrollbarWidth: "none",
              msOverflowStyle: "none",
              WebkitOverflowScrolling: "touch",
            }}
            onWheel={handleWheel}
          >
            {testimonials.map((testimonial, index) => (
              <div
                key={testimonial.id}
                className="overflow-hidden bg-white rounded-2xl shadow-lg transition-all duration-300 transform cursor-pointer group hover:shadow-xl hover:-translate-y-1 flex-shrink-0 w-80"
                onClick={() => handleVideoClick(testimonial.video)}
              >
                {/* Image */}
                <div className="relative w-full h-48 bg-gray-100">
                  <img
                    src={testimonial.thumbnail}
                    alt={`${testimonial.name[lang]} testimonial`}
                    className="object-cover w-full h-full"
                  />
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex gap-3 items-center mb-2">
                    {/* Play button on the left */}
                    <div className="p-2 text-white bg-orange-500 rounded-full transition-all duration-300 hover:bg-orange-600 hover:scale-110">
                      <svg
                        className="ml-0.5 w-4 h-4"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900">
                      {testimonial.name[lang]}
                    </h3>
                  </div>
                  {testimonial.age[lang] && (
                    <p className="text-base text-gray-600">
                      {testimonial.age[lang]}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* YouTube Modal */}
      {isModalOpen && (
        <div className="flex fixed inset-0 z-50 justify-center items-center bg-black bg-opacity-75">
          <div className="relative mx-4 w-full max-w-4xl">
            {/* Close button */}
            <button
              onClick={closeModal}
              className="absolute right-0 -top-12 text-white transition-colors hover:text-gray-300"
            >
              <svg
                className="w-8 h-8"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            {/* YouTube iframe */}
            <div className="relative w-full h-0 pb-[56.25%] bg-black rounded-lg overflow-hidden">
              <iframe
                src={getEmbedUrl(selectedVideo)}
                title="YouTube video"
                className="absolute top-0 left-0 w-full h-full"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
