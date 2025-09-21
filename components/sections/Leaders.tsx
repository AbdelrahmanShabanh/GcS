"use client";

import Image from "next/image";

interface LeadersProps {
  lang: string;
}

export default function Leaders({ lang }: LeadersProps) {
  const testimonials = [
    {
      id: "malek",
      name: { ar: "مالك", en: "Malek" },
      age: { ar: "13 سنة", en: "13 years" },
      video:
        "https://drive.google.com/file/d/1rgc7EyfU8yBLqWwPckEdcOwV61JpiUXS/view?usp=sharing",
      thumbnail: "/image_copy_2.png",
    },
    {
      id: "saja",
      name: { ar: "سجى", en: "Saja" },
      age: { ar: "9 سنوات", en: "9 years" },
      video:
        "https://drive.google.com/file/d/1bTfejRVs7lUNPlC4LZBqZSX-niLliKux/view?usp=sharing",
      thumbnail: "/image_copy.png",
    },
    {
      id: "parent",
      name: { ar: "ولي أمر", en: "Parent" },
      age: { ar: "", en: "" },
      video:
        "https://drive.google.com/file/d/1lFay3XhbgtUkxJUjdrsfZXmsPHsR_iNg/view?usp=sharing",
      thumbnail: "/image.png",
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

  const handleVideoClick = (videoUrl: string) => {
    window.open(videoUrl, "_blank");
  };

  return (
    <section className="py-8 sm:py-12 lg:py-16 bg-secondary-50" id="leaders">
      <div className="container px-4 sm:px-6 lg:px-8">
        <h2 className="mb-14 text-2xl section-title sm:text-3xl lg:text-4xl sm:mb-13">
          {content[lang].title}
        </h2>

        <div className="grid grid-cols-1 gap-8 mx-auto max-w-7xl sm:grid-cols-2 lg:grid-cols-3 lg:gap-10">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="overflow-hidden bg-white rounded-2xl shadow-lg transition-all duration-300 transform cursor-pointer group hover:shadow-xl hover:-translate-y-1"
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
    </section>
  );
}
