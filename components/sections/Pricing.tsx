"use client";

// كومبوننت الأسعار
interface PricingProps {
  lang: string;
}

export default function Pricing({ lang }: PricingProps) {
  const plans = [
    {
      t: { ar: "ربع سنوي", en: "Quarterly" },
      p: "4800",
      period: { ar: "ربع سنوي", en: "Quarterly" },
      f: {
        ar: [
          "تعلم أساسيات البرمجة وفهم الحاسوب",
          "تطبيق مفاهيم البرمجة لحل التحديات",
          "تحليل وإصلاح أخطاء الكود بفعالية",
          "إظهار الإتقان من خلال البرمجة العملية",
        ],
        en: [
          "Show programming and computer understanding basics",
          "Apply coding concepts to solve challenges",
          "Analyze and fix code errors effectively",
          "Demonstrate mastery through practical programming",
        ],
      },
    },
    {
      t: { ar: "سنوي", en: "Annually" },
      p: "16800",
      period: { ar: "سنوي", en: "Annually" },
      f: {
        ar: [
          "فهم علوم البيانات والتحليل في مجالات مختلفة",
          "استخدام Python لتحليل البيانات وأنظمة التوصية",
          "تطوير مهارات في معالجة البيانات والتصور والتفسير",
          "تعلم مبادئ وتقنيات أنظمة التوصية",
        ],
        en: [
          "Understanding data science and analysis in various fields",
          "Using Python for data analysis and recommendation systems",
          "Developing skills in data manipulation, visualization, and interpretation",
          "Learning the principles and techniques of recommendation systems",
        ],
      },
      best: true,
    },
    {
      t: { ar: "نصف سنوي", en: "Biannual" },
      p: "9120",
      period: { ar: "نصف سنوي", en: "Biannual" },
      f: {
        ar: [
          "فهم علوم البيانات والتحليل في مجالات مختلفة",
          "استخدام Python لتحليل البيانات وأنظمة التوصية",
          "تطوير مهارات في معالجة البيانات والتصور والتفسير",
          "تعلم مبادئ وتقنيات أنظمة التوصية",
        ],
        en: [
          "Understanding data science and analysis in various fields",
          "Using Python for data analysis and recommendation systems",
          "Developing skills in data manipulation, visualization, and interpretation",
          "Learning the principles and techniques of recommendation systems",
        ],
      },
    },
  ];

  const content = {
    ar: {
      title: "خطط الأسعار",
      subscribe: "اشترك الآن",
      currency: "جنيه",
    },
    en: {
      title: "Pricing Plans",
      subscribe: "Subscribe now",
      currency: "EGP",
    },
  };

  const handleWhatsAppClick = (plan: any) => {
    const phoneNumber = "+201211506816";
    const message =
      lang === "ar"
        ? `مرحباً! أريد الاشتراك في خطة ${plan.t.ar} بسعر ${plan.p} ${content.ar.currency} ${plan.period.ar}`
        : `Hello! I want to subscribe to the ${plan.t.en} plan for ${plan.p} ${content.en.currency} ${plan.period.en}`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${phoneNumber.replace(
      "+",
      ""
    )}?text=${encodedMessage}`;

    window.open(whatsappUrl, "_blank");
  };

  const handleFreeSessionClick = () => {
    const phoneNumber = "+201211506816";
    const message =
      lang === "ar"
        ? "مرحباً! أريد معرفة المزيد من التفاصيل حول الجلسة المجانية"
        : "Hello! I want to know more details about the free session";

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${phoneNumber.replace(
      "+",
      ""
    )}?text=${encodedMessage}`;

    window.open(whatsappUrl, "_blank");
  };

  const handleWhatsAppIconClick = () => {
    const phoneNumber = "+201211506816";
    const message =
      lang === "ar"
        ? "مرحباً! أريد الاستفسار عن الدورات المتاحة"
        : "Hello! I want to inquire about the available courses";

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${phoneNumber.replace(
      "+",
      ""
    )}?text=${encodedMessage}`;

    window.open(whatsappUrl, "_blank");
  };

  return (
    <section className="py-8 sm:py-12 lg:py-16 bg-secondary-50" id="pricing">
      <div className="container px-4 sm:px-6 lg:px-8">
        <h2 className="mb-14 text-2xl section-title sm:text-3xl lg:text-4xl sm:mb-13">
          {content[lang].title}
        </h2>

        <div className="grid grid-cols-1 gap-6 mx-auto max-w-7xl lg:grid-cols-3 lg:gap-8">
          {plans.map((plan, index) => (
            <div
              key={plan.t[lang]}
              className={`relative bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 ${
                plan.best
                  ? "bg-blue-500 text-white scale-105 lg:scale-110"
                  : "text-gray-900"
              }`}
            >
              {plan.best && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <span className="px-4 py-1 text-sm font-medium text-white bg-orange-500 rounded-full">
                    {lang === "ar" ? "الأكثر شعبية" : "Most Popular"}
                  </span>
                </div>
              )}

              <div className="p-6 sm:p-8">
                <h3
                  className={`text-xl sm:text-2xl font-bold mb-4 ${
                    plan.best ? "text-white" : "text-gray-900"
                  }`}
                >
                  {plan.t[lang]}
                </h3>

                <div className="mb-6">
                  <div
                    className={`text-3xl sm:text-4xl font-extrabold ${
                      plan.best ? "text-white" : "text-orange-500"
                    }`}
                  >
                    {plan.p}
                  </div>
                  <div
                    className={`text-sm font-medium ${
                      plan.best ? "text-white/80" : "text-gray-500"
                    }`}
                  >
                    / {plan.period[lang]}
                  </div>
                </div>

                <ul
                  className={`space-y-3 mb-6 ${
                    plan.best ? "text-white" : "text-gray-700"
                  }`}
                >
                  {plan.f[lang].map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex gap-3 items-start">
                      <div
                        className={`flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center mt-0.5 ${
                          plan.best
                            ? "bg-white text-teal-500"
                            : "bg-purple-500 text-white"
                        }`}
                      >
                        <svg
                          className="w-3 h-3"
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
                      <span className="text-sm leading-relaxed sm:text-base">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                <div className="space-y-3">
                  <button
                    onClick={() => handleWhatsAppClick(plan)}
                    className={`w-full py-3 px-6 rounded-xl font-semibold text-sm sm:text-base transition-all duration-200 flex items-center justify-center gap-2 ${
                      plan.best
                        ? "bg-white text-orange-500 hover:bg-gray-50"
                        : "bg-white border-2 border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white"
                    }`}
                  >
                    {content[lang].subscribe}
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </button>

                  <button
                    onClick={handleFreeSessionClick}
                    className={`w-full py-2 px-4 rounded-lg font-medium text-xs sm:text-sm transition-all duration-200 flex items-center justify-center gap-2 ${
                      plan.best
                        ? "bg-white/20 text-white border border-white/30 hover:bg-white/30"
                        : "bg-gray-100 text-gray-700 border border-gray-200 hover:bg-gray-200"
                    }`}
                  >
                    {lang === "ar"
                      ? "اسأل عن الحصه المجانية"
                      : "Ask for Free Session"}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* WhatsApp Floating Icon */}
        <div className="fixed right-6 bottom-6 z-50">
          <button
            onClick={handleWhatsAppIconClick}
            className="p-4 text-white bg-green-500 rounded-full shadow-lg transition-all duration-300 transform hover:bg-green-600 hover:shadow-xl hover:scale-110"
            aria-label={
              lang === "ar" ? "تواصل معنا عبر واتساب" : "Contact us on WhatsApp"
            }
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}
