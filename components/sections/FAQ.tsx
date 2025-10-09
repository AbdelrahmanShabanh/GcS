"use client";

import { useState, useEffect } from "react";
import { ApiClient } from "../../utils/api";

// كومبوننت الأسئلة الشائعة
interface FAQProps {
  lang: string;
}

export default function FAQ({ lang }: FAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [faqs, setFaqs] = useState([]);

  useEffect(() => {
    const loadFAQs = async () => {
      try {
        const response = await ApiClient.getFAQs();
        if (response.success && response.data) {
          setFaqs(response.data);
        }
      } catch (error) {
        console.error("Error loading FAQs:", error);
      }
    };

    loadFAQs();
  }, []);

  const content = {
    ar: {
      title: "الأسئلة الشائعة",
    },
    en: {
      title: "Frequently Asked Questions",
    },
  };

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-8 bg-gray-50 sm:py-12 lg:py-16" id="faq">
      <div className="container px-4 sm:px-6 lg:px-8">
        <h2 className="mb-8 text-2xl text-center section-title sm:text-3xl lg:text-4xl sm:mb-12">
          {content[lang].title}
        </h2>

        <div
          className={`grid grid-cols-1 gap-4 mx-auto max-w-6xl lg:grid-cols-2 sm:gap-6 ${
            lang === "ar" ? "rtl" : "ltr"
          }`}
        >
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="overflow-hidden bg-white rounded-xl shadow-sm transition-all duration-300 hover:shadow-md"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className={`flex justify-between items-center p-4 w-full transition-colors duration-200 sm:p-6 hover:bg-gray-50 ${
                  lang === "ar" ? "text-right" : "text-left"
                }`}
              >
                <h3
                  className={`text-sm font-semibold leading-relaxed text-gray-900 sm:text-base ${
                    lang === "ar" ? "pr-4" : "pl-4"
                  }`}
                >
                  {faq.question[lang]}
                </h3>
                <div className="flex-shrink-0">
                  <svg
                    className={`w-5 h-5 text-gray-600 transition-transform duration-300 ${
                      openIndex === index ? "rotate-180" : ""
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
              </button>

              <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  openIndex === index
                    ? "max-h-96 opacity-100"
                    : "max-h-0 opacity-0"
                }`}
              >
                <div className="px-4 pb-4 sm:px-6 sm:pb-6">
                  <div className="pt-4 border-t border-gray-100">
                    <p className="text-sm leading-relaxed text-gray-700 sm:text-base">
                      {faq.answer[lang]}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
