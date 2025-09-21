"use client";

import Image from "next/image";

// كومبوننت الشهادة
interface CertificateProps {
  lang: string;
}

export default function Certificate({ lang }: CertificateProps) {
  const content = {
    ar: {
      subtitle: "كل طالب يعمل على إنشاء ملف شخصي جاهز لمستقبله المهني",
      mainTitle: "كل فكرة تبدأ بكود",
      subTitle: "كل كود يبدأ",
      schoolName: "في GC School",
      description:
        "في GC School نقدم دروس البرمجة باستخدام طرق تسويقية حيث نعلم: الذكاء الاصطناعي، تطوير تطبيقات الألعاب، والمزيد.",
      features: [
        "مناهج معترف بها دولياً ومتنوعة",
        "رحلة تعلم شاملة عبر الإنترنت",
        "انضم إلى عالم الابتكار والتكنولوجيا",
        "بناء مستقبل مشرق للأطفال",
        "تعزيز التفكير الإبداعي والمهارات الأساسية",
      ],
    },
    en: {
      subtitle:
        "Each student works on creating a profile ready for his professional future",
      mainTitle: "Every idea starts with a code",
      subTitle: "Every code starts",
      schoolName: "at GC School",
      description:
        "At GC School we offer programming lessons using marketing methods where we teach: Artificial Intelligence, Game Application Development, and more.",
      features: [
        "Internationally recognized and diverse curricula",
        "Comprehensive online learning journey",
        "Join the world of innovation and technology",
        "Building a bright future for children",
        "Enhancing creative thinking and essential skills",
      ],
    },
  };

  return (
    <section className="py-8 bg-gradient-to-br from-orange-50 to-teal-50 sm:py-12 lg:py-16">
      <div className="container px-4 sm:px-6 lg:px-8">
        <div
          className={`grid grid-cols-1 gap-8 items-center mx-auto max-w-7xl lg:grid-cols-2 lg:gap-12 ${
            lang === "ar" ? "rtl" : "ltr"
          }`}
        >
          {/* Left Panel - Orange Background */}
          <div className="overflow-hidden relative p-6 text-white bg-orange-500 rounded-2xl sm:p-8 lg:p-10">
            {/* Decorative elements */}
            <div className="absolute top-4 right-4 w-20 h-20 rounded-full bg-white/10"></div>
            <div className="absolute bottom-4 left-4 w-16 h-16 rounded-full bg-white/5"></div>

            <div className="relative z-10">
              {/* Logo */}
              <div className="mb-6">
                <div className="flex gap-3 items-center">
                  <div className="flex justify-center items-center w-12 h-12 bg-white rounded-lg">
                    <span className="text-xl font-bold text-orange-500">
                      GC
                    </span>
                  </div>
                  <span className="text-xl font-semibold text-white">
                    school
                  </span>
                </div>
              </div>

              {/* Main content */}
              <div
                className={`space-y-4 ${
                  lang === "ar" ? "text-right" : "text-left"
                }`}
              >
                <h3 className="text-lg font-semibold sm:text-xl text-white/90">
                  {content[lang].subtitle}
                </h3>

                <div className="space-y-2">
                  <h1 className="text-2xl font-bold leading-tight sm:text-3xl lg:text-4xl">
                    {content[lang].mainTitle}
                  </h1>
                  <h2 className="text-xl font-bold sm:text-2xl lg:text-3xl">
                    {content[lang].subTitle}
                  </h2>
                  <h3 className="text-lg font-semibold sm:text-xl lg:text-2xl text-white/90">
                    {content[lang].schoolName}
                  </h3>
                </div>

                <p className="text-sm leading-relaxed sm:text-base text-white/90">
                  {content[lang].description}
                </p>
              </div>
            </div>
          </div>

          {/* Right Panel - White Background with Image */}
          <div className="p-6 bg-white rounded-2xl shadow-lg sm:p-8">
            <div className="space-y-6">
              {/* Image */}
              <div className="relative">
                <Image
                  src="/hero-kids.png"
                  alt={lang === "ar" ? "طلاب GC School" : "GC School Students"}
                  width={600}
                  height={400}
                  className="w-full h-auto rounded-xl"
                />
              </div>

              {/* Features List */}
              <div className="space-y-4">
                {content[lang].features.map((feature, index) => (
                  <div key={index} className="flex gap-3 items-start">
                    <div className="flex-shrink-0 w-6 h-6 bg-teal-500 rounded-full flex items-center justify-center mt-0.5">
                      <svg
                        className="w-4 h-4 text-white"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <p className="text-sm leading-relaxed text-gray-700 sm:text-base">
                      {feature}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
