"use client";

import { useState, useRef } from "react";

// كومبوننت القادة
interface LeadersProps {
  lang: string;
}

export default function Leaders({ lang }: LeadersProps) {
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  const videoRefs = useRef<{ [key: string]: HTMLVideoElement | null }>({});

  const testimonials = [
    {
      id: "malek",
      name: { ar: "مالك", en: "Malek" },
      age: { ar: "13 سنة", en: "13 years" },
      video: "/IMG_4690.MP4",
      thumbnail: "/IMG_4690.MP4", // We'll use the video as thumbnail
    },
    {
      id: "saja",
      name: { ar: "سجى", en: "Saja" },
      age: { ar: "9 سنوات", en: "9 years" },
      video: "/WhatsApp Video 2025-09-10 at 13.20.26_b21eb067.mp4",
      thumbnail: "/WhatsApp Video 2025-09-10 at 13.20.26_b21eb067.mp4",
    },
    {
      id: "parent",
      name: { ar: "ولي أمر", en: "Parent" },
      age: { ar: "", en: "" },
      video: "/WhatsApp Video 2025-09-10 at 13.20.26_c6c4f8ba.mp4",
      thumbnail: "/WhatsApp Video 2025-09-10 at 13.20.26_c6c4f8ba.mp4",
    },
  ];

  const content = {
    ar: {
      title: "آراء بعض عملائنا",
    },
    en: {
      title: "What Our Clients Say",
    },
  };

  const handleVideoClick = (videoId: string) => {
    setSelectedVideo(videoId);
    // Play the video
    const video = videoRefs.current[videoId];
    if (video) {
      video.play();
    }
  };

  const handleCloseModal = () => {
    // Pause all videos
    Object.values(videoRefs.current).forEach((video) => {
      if (video) {
        video.pause();
        video.currentTime = 0;
      }
    });
    setSelectedVideo(null);
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      handleCloseModal();
    }
  };

  return (
    <>
      <section className="py-8 bg-gray-50 sm:py-12 lg:py-16" id="leaders">
        <div className="container px-4 sm:px-6 lg:px-8">
          <h2 className="mb-8 text-2xl section-title sm:text-3xl lg:text-4xl sm:mb-12">
            {content[lang].title}
          </h2>

          <div className="grid grid-cols-1 gap-8 mx-auto max-w-7xl sm:grid-cols-2 lg:grid-cols-3 lg:gap-10">
            {testimonials.map((testimonial) => (
              <div
                key={testimonial.id}
                className="overflow-hidden bg-white rounded-2xl shadow-lg transition-all duration-300 transform cursor-pointer group hover:shadow-xl hover:-translate-y-1"
                onClick={() => handleVideoClick(testimonial.id)}
              >
                <div className="relative bg-gray-900 aspect-video">
                  <video
                    ref={(el) => (videoRefs.current[testimonial.id] = el)}
                    className="object-cover w-full h-full"
                    muted
                    loop
                    preload="metadata"
                    poster={testimonial.thumbnail}
                    onLoadedMetadata={(e) => {
                      // Ensure video duration is properly loaded
                      const video = e.target as HTMLVideoElement;
                      if (video.duration) {
                        video.currentTime = 0;
                      }
                    }}
                    onError={(e) => {
                      console.error('Video loading error:', e);
                    }}
                  >
                    <source src={testimonial.video} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>

                  {/* Play overlay */}
                  <div className="flex absolute inset-0 justify-center items-center transition-colors bg-black/30 group-hover:bg-black/20">
                    <div className="p-4 rounded-full transition-all duration-300 bg-white/90 group-hover:bg-white group-hover:scale-110">
                      <svg
                        className="ml-1 w-8 h-8 text-gray-800"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                  </div>
                </div>

                <div className="p-6 sm:p-8">
                  <h3 className="mb-2 text-xl font-bold text-gray-900 sm:text-2xl">
                    {testimonial.name[lang]}
                  </h3>
                  {testimonial.age[lang] && (
                    <p className="text-base text-gray-600 sm:text-lg">
                      {testimonial.age[lang]}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Video Modal */}
      {selectedVideo && (
        <div
          className="flex fixed inset-0 z-50 justify-center items-center backdrop-blur-sm bg-black/80"
          onClick={handleBackdropClick}
        >
          <div className="relative mx-4 w-full max-w-4xl">
            {/* Close button */}
            <button
              onClick={handleCloseModal}
              className="absolute right-0 -top-12 z-10 text-white transition-colors hover:text-gray-300"
              aria-label={lang === "ar" ? "إغلاق" : "Close"}
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

            {/* Video container */}
            <div className="overflow-hidden relative bg-black rounded-lg shadow-2xl">
              <video
                ref={(el) => (videoRefs.current[selectedVideo] = el)}
                className="w-full h-auto max-h-[80vh]"
                controls
                autoPlay
                onEnded={handleCloseModal}
              >
                <source
                  src={testimonials.find((t) => t.id === selectedVideo)?.video}
                  type="video/mp4"
                />
                Your browser does not support the video tag.
              </video>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
