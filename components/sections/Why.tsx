"use client";

import Image from "next/image";

// كومبوننت لماذا نحن
export default function Why({ lang }: { lang: string }) {
  const heading = lang === "ar" ? "ليه GCschool؟" : "Why GCschool?";
  const certAlt = lang === "ar" ? "شهادة GCschool" : "GCschool Certificate";

  const items =
    lang === "ar"
      ? [
          {
            icon: "cap",
            h: "منهج STEM & AI معتمد",
            p: "نتعلم البرمجة على نفس أدوات المحترفين.",
          },
          {
            icon: "video",
            h: "أونلاين مباشر 1 الى 1",
            p: "حصص شخصية خاصه مع مدربين خبرة.",
          },
          {
            icon: "teacher",
            h: " مدربين نخبة خبره في مجال التعليم عن بعد",
            p: "مدربون مؤهلون.",
          },
          {
            icon: "chart",
            h: "خطة تقدم طويلة المدى",
            p: "وضوح كامل لمسار ابنك التعليمي.",
          },
        ]
      : [
          {
            icon: "cap",
            h: "Accredited STEM & AI Curriculum",
            p: "We learn coding using the same tools as professionals.",
          },
          {
            icon: "video",
            h: "Live Online 1:1",
            p: "Personalized lessons with experienced instructors.",
          },
          {
            icon: "teacher",
            h: "Elite Instructors",
            p: "Qualified instructors.",
          },
          {
            icon: "chart",
            h: "Long-term Progress Plan",
            p: "Full clarity on your child's learning path.",
          },
        ];

  const Icon = ({ name }: { name: string }) => {
    const base = "w-7 h-7 text-primary-600 flex-shrink-0";
    if (name === "cap")
      return (
        <svg
          className={base}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden
        >
          <path d="M22 10L12 5 2 10l10 5 10-5z" />
          <path d="M6 12v4c0 1.657 2.686 3 6 3s6-1.343 6-3v-4" />
        </svg>
      );
    if (name === "video")
      return (
        <svg
          className={base}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden
        >
          <rect x="3" y="5" width="14" height="14" rx="2" />
          <path d="M17 9l4-2v10l-4-2" />
        </svg>
      );
    if (name === "teacher")
      return (
        <svg
          className={base}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden
        >
          <circle cx="8" cy="7" r="3" />
          <path d="M2 21v-1a6 6 0 0 1 12 0v1" />
          <rect x="14" y="5" width="8" height="6" rx="1" />
          <path d="M18 11v2" />
        </svg>
      );
    return (
      <svg
        className={base}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden
      >
        <path d="M3 3v18h18" />
        <path d="M7 15l4-4 3 3 5-5" />
      </svg>
    );
  };
  return (
    <section className="py-16" id="why">
      <div className="container grid grid-cols-1 gap-10 items-center lg:grid-cols-2">
        <div className="why-list">
          <h2 className="section-title">{heading}</h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-1">
            {items.map((x) => (
              <div
                className="overflow-hidden relative p-5 bg-gradient-to-br rounded-2xl border border-white shadow-lg from-primary-50 to-secondary-50"
                key={x.h}
              >
                <div className="absolute -top-4 -left-4 w-20 h-20 rounded-full bg-primary-500/10" />
                <div className="absolute -bottom-5 -right-6 w-24 h-24 rounded-full bg-secondary-500/10" />
                <div className="flex relative z-10 gap-3 items-start">
                  <Icon name={x.icon} />
                  <div>
                    <h3 className="mb-1 font-semibold text-gray-900">{x.h}</h3>
                    <p className="text-sm leading-6 text-gray-700">{x.p}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="why-art">
          <div className="overflow-hidden relative rounded-3xl shadow-2xl">
            <Image
              src="/certificate-std.png"
              alt={certAlt}
              width={560}
              height={420}
              className="w-full"
            />
            <div className="absolute inset-0 bg-gradient-to-t to-transparent from-black/10" />
          </div>
        </div>
      </div>
    </section>
  );
}
