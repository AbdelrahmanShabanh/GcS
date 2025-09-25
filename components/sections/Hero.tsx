"use client";

import Image from "next/image";
import Button from "../ui/Button";

interface HeroProps {
  lang: string;
}

// كومبوننت قسم الهيرو
export default function Hero({ lang }: HeroProps) {
  const content =
    lang === "ar"
      ? {
          title: "ابدأ اليوم، وكن القائد التقني الذي يصنع الغد",
          subtitle: "فكر . برمج . ابتكر",
          bullets: [
            "حصص برمجة مباشرة عبر الإنترنت - حضور فردي مع مدربك الخاص",
            "مناهج تفاعلية تعتمد على مشروعات واقعية",
            "أفضل المدربين، وكل ذلك في راحة منزلك",
          ],
          cta: "تواصل على واتساب",
          ageRange: "من سن ٦ ل ١٨",
        }
      : {
          title:
            "Start today, and be the tech leader who will shape tomorrow's future",
          subtitle: "Think . Code . Innovate",
          bullets: [
            "Live online programming classes with individual attention",
            "Internationally certified curricula based on real projects",
            "Best programming instructors available at home",
          ],
          cta: "Contact on WhatsApp",
          ageRange: "Ages 6 to 18",
        };

  const handleWhatsAppClick = () => {
    const phoneNumber = "+201211506816";
    const message =
      lang === "ar"
        ? "مرحباً! أريد معرفة المزيد من المعلومات حول الدورات المتاحة"
        : "Hello! I want to know more information about the available courses";

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${phoneNumber.replace(
      "+",
      ""
    )}?text=${encodedMessage}`;

    window.open(whatsappUrl, "_blank");
  };

  return (
    <section
      className="py-12 sm:py-16 bg-gradient-to-br from-[#ffe6cd] via-primary-50 to-secondary-50"
      id="home"
    >
      <div className="container grid grid-cols-1 items-center gap-8 sm:gap-10 lg:grid-cols-[1.1fr_0.9fr]">
        <div
          className={`hero-text text-center ${
            lang === "ar" ? "lg:text-right" : "lg:text-left"
          }`}
        >
          <h1 className="mb-4 text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl">
            {content.title}
          </h1>
          {content.subtitle && (
            <h2 className="mb-6 text-xl font-semibold text-orange-500 sm:text-2xl lg:text-3xl">
              {content.subtitle}
            </h2>
          )}
          <ul className="grid gap-2 p-0 mb-5 list-none text-gray-700 sm:text-lg">
            {content.bullets.map((bullet, i) => (
              <li key={i}>{bullet}</li>
            ))}
          </ul>
          <div
            className={`hero-cta flex justify-center ${
              lang === "ar" ? "lg:justify-start" : "lg:justify-start"
            }`}
          >
            <button
              onClick={handleWhatsAppClick}
              className="px-8 py-4 text-lg font-semibold text-white rounded-xl shadow-lg transition-all duration-200 transform btn-lg bg-primary-500 hover:bg-primary-600 hover:scale-105 hover:shadow-xl"
            >
              {content.cta}
            </button>
          </div>
        </div>
        <div className="relative order-first lg:order-none">
          <Image
            src="/age-range.png"
            alt="GCschool students"
            width={640}
            height={520}
            className="w-full rounded-2xl shadow-[0_20px_60px_rgba(239,169,100,0.6)]"
            priority
            placeholder="blur"
            blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
          />
        </div>
      </div>
    </section>
  );
}
