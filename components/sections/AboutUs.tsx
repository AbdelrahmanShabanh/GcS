"use client";

import Image from "next/image";

interface AboutUsProps {
  lang: string;
}

export default function AboutUs({ lang }: AboutUsProps) {
  const content = {
    ar: {
      title: "من نحن",
      introduction: {
        title: "مقدمة",
        content:
          "GC School هي منصة تعليمية مبتكرة مخصصة لتعليم الأطفال من سن 6 إلى 18 عامًا أساسيات البرمجة والذكاء الاصطناعي (AI). تقدم GC School دورات عبر الإنترنت، مما يضمن إمكانية الوصول والمرونة لجميع المتعلمين. الميزة البارزة للمنصة هي دوراتها الفردية والدروس الخصوصية، مما يوفر تجارب تعلم شخصية مصممة خصيصًا لاحتياجات وتيرة كل طالب. مقرها في مصر، تهدف GC School إلى إعداد الجيل القادم للعصر الرقمي، وتزويدهم بالمهارات الأساسية للمستقبل.",
      },
      vision: {
        title: "رؤيتنا",
        content:
          "أن نصبح المنصة التعليمية الأكثر ثقة والريادة في مصر ومنطقة الشرق الأوسط وشمال أفريقيا، وتمكين الأطفال من إتقان التكنولوجيا من خلال التعلم الشخصي وإلهامهم لتشكيل المستقبل كمحللي مشاكل ومبدعين واثقين.",
      },
      mission: {
        title: "مهمتنا",
        content:
          "تقديم تعليم برمجة وذكاء اصطناعي عالي الجودة ومتاح من خلال مزيج من نماذج التعلم عبر الإنترنت وخارجها، مع التركيز على الدروس الخصوصية الفردية التي تغذي الإبداع والتفكير النقدي والمهارات العملية لتحديات العالم الحقيقي.",
      },
      values: {
        title: "قيمنا الأساسية",
        items: [
          {
            title: "التخصيص",
            description:
              "تخصيص رحلة التعلم لتلبية الاحتياجات الفردية لكل طالب.",
          },
          {
            title: "الابتكار",
            description:
              "البقاء في المقدمة من خلال دمج أحدث التقنيات في طرق التدريس.",
          },
          {
            title: "التمكين",
            description: "تزويد الطلاب بالثقة والمهارات للتميز في عالم رقمي.",
          },
          {
            title: "الشمولية",
            description:
              "جعل تعليم التكنولوجيا متاحًا للأطفال من جميع الخلفيات.",
          },
          {
            title: "التميز",
            description:
              "ضمان أعلى المعايير في محتوى الدورة والتسليم ودعم الطلاب.",
          },
        ],
      },
      audience: {
        title: "جمهورنا المستهدف",
        content:
          "تخدم GC School بشكل أساسي الأطفال من سن 6 إلى 18 عامًا الذين يتوقون لتعلم البرمجة والذكاء الاصطناعي. الآباء الذين يسعون للحصول على حلول تعليمية شخصية لأطفالهم يشكلون جمهورًا ثانويًا حيويًا. بالإضافة إلى ذلك، المدارس والمؤسسات المهتمة بدمج دورات التكنولوجيا المتقدمة في مناهجها تشكل جزءًا رئيسيًا من مجموعتنا المستهدفة.",
      },
      story: {
        title: "قصتنا",
        content:
          "تأسست GC School من شغف لسد الفجوة في تعليم التكنولوجيا للأطفال. إدراكًا أن العديد من المتعلمين الصغار يفتقرون إلى الوصول إلى تعليم تكنولوجي شخصي، طورنا منصة تجمع بين الإبداع والمتعة والإرشاد الفردي. مع مرور الوقت، نمت GC School لتقدم دورات خارجية، مما يضمن أن كل طفل يمكنه الاستفادة من التفاعلات وجهًا لوجه إلى جانب التعلم عبر الإنترنت.",
      },
      purpose: {
        title: "هدفنا",
        content:
          "إنشاء مستقبل حيث يكون تعليم التكنولوجيا جزءًا لا يتجزأ من حياة كل طفل، مما يضمن أنهم مستعدون للازدهار في العصر الرقمي.",
      },
      brand: {
        title: "نظرة عامة على العلامة التجارية",
        content:
          "تقدم GC School مزيجًا فريدًا من تجارب التعلم عبر الإنترنت وخارجها، مع التركيز على التفاعلات الفردية لتقديم تعليم مخصص. نركز على إنشاء بيئة رعاية يشعر فيها الطلاب بالثقة للاستكشاف والابتكار والنجاح.",
      },
      tone: {
        title: "نبرة الصوت",
        content:
          "نبرتنا ودودة وداعمة ومحفزة. نتواصل بطريقة تلهم الثقة وتشعل شغف التعلم في كل من الأطفال والآباء.",
      },
      whyChoose: {
        title: "لماذا تختارنا",
        items: [
          {
            title: "التعلم الفردي",
            description:
              "الدروس الخصوصية الشخصية تضمن أن كل طفل يتعلم بوتيرته الخاصة ويحصل على اهتمام فردي.",
          },
          {
            title: "النموذج المختلط",
            description:
              "نقدم دورات عبر الإنترنت وخارجها لتناسب تفضيلات التعلم المختلفة.",
          },
          {
            title: "المدربون الخبراء",
            description:
              "فريقنا يشمل محترفين ذوي مهارات عالية مع خبرة في البرمجة والذكاء الاصطناعي.",
          },
          {
            title: "التركيز على المستقبل",
            description:
              "نزود الطلاب بالمهارات الأساسية لأسواق العمل المستقبلية.",
          },
          {
            title: "التفاعلية والمتعة",
            description:
              "الدورات مصممة لتكون جذابة وممتعة، مما يجعل المواضيع المعقدة سهلة الفهم.",
          },
        ],
      },
    },
    en: {
      title: "About Us",
      introduction: {
        title: "Introduction",
        content:
          "GC School is an innovative educational platform dedicated to teaching children aged 6 to 18 years the fundamentals of programming and artificial intelligence (AI). Offering online courses, GC School ensures accessibility and flexibility for all learners. The platform's standout feature is its one-to-one courses and tutorials, providing personalized learning experiences tailored to each student's needs and pace. Based in Egypt, GC School is on a mission to prepare the upcoming generation for the digital era, equipping them with essential skills for the future.",
      },
      vision: {
        title: "Vision",
        content:
          "To become the most trusted and leading educational platform in Egypt and the MENA region, empowering children to master technology through personalized learning and inspiring them to shape the future as confident problem-solvers and innovators.",
      },
      mission: {
        title: "Mission",
        content:
          "To deliver accessible, high-quality programming and AI education through a blend of online and offline learning models, emphasizing one-to-one tutorials that nurture creativity, critical thinking, and practical skills for real-world challenges.",
      },
      values: {
        title: "Core Values",
        items: [
          {
            title: "Personalization",
            description:
              "Tailoring the learning journey to meet the individual needs of each student.",
          },
          {
            title: "Innovation",
            description:
              "Staying ahead by integrating cutting-edge technology into our teaching methods.",
          },
          {
            title: "Empowerment",
            description:
              "Equipping students with confidence and skills to excel in a digital world.",
          },
          {
            title: "Inclusivity",
            description:
              "Making tech education accessible to children from all backgrounds.",
          },
          {
            title: "Excellence",
            description:
              "Ensuring the highest standards in course content, delivery, and student support.",
          },
        ],
      },
      audience: {
        title: "Target Audience",
        content:
          "GC School caters primarily to children aged 6 to 18 years who are eager to learn about programming and AI. Parents seeking personalized education solutions for their children are a vital secondary audience. Additionally, schools and institutions interested in integrating advanced technology courses into their curriculum form a key part of our target group.",
      },
      story: {
        title: "Our Story",
        content:
          "GC School was founded out of a passion for bridging the gap in technology education for children. Recognizing that many young learners lack access to personalized tech education, we developed a platform that combines creativity, fun, and one-to-one mentoring. Over time, GC School has grown to offer offline courses, ensuring that every child can benefit from face-to-face interactions alongside online learning.",
      },
      purpose: {
        title: "Purpose",
        content:
          "To create a future where technology education is an integral part of every child's life, ensuring that they are prepared to thrive in the digital age.",
      },
      brand: {
        title: "Brand Overview",
        content:
          "GC School offers a unique blend of online and offline learning experiences, emphasizing one-to-one interactions to deliver tailored education. We focus on creating a nurturing environment where students feel confident to explore, innovate, and succeed.",
      },
      tone: {
        title: "Tone of Voice",
        content:
          "Our tone is approachable, supportive, and motivational. We communicate in a way that inspires trust and ignites a passion for learning in both children and parents.",
      },
      whyChoose: {
        title: "Why Choose Us",
        items: [
          {
            title: "One-to-One Learning",
            description:
              "Personalized tutorials ensure that every child learns at their own pace and receives individual attention.",
          },
          {
            title: "Hybrid Model",
            description:
              "Offering both online and offline courses to suit different learning preferences.",
          },
          {
            title: "Expert Instructors",
            description:
              "Our team includes highly skilled professionals with expertise in programming and AI.",
          },
          {
            title: "Future-Focused",
            description:
              "We equip students with skills that are essential for future job markets.",
          },
          {
            title: "Interactive and Fun",
            description:
              "Courses are designed to be engaging and enjoyable, making complex topics easy to understand.",
          },
        ],
      },
    },
  };

  return (
    <section
      className="py-8 sm:py-12 lg:py-16 bg-gradient-to-br from-orange-50 to-teal-50"
      id="about"
    >
      <div className="container px-4 sm:px-6 lg:px-8">
        <div className={`max-w-6xl mx-auto ${lang === "ar" ? "rtl" : "ltr"}`}>
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              {content[lang].title}
            </h1>
            <div className="w-24 h-1 bg-gradient-to-r from-orange-500 to-teal-500 mx-auto rounded-full"></div>
          </div>

          {/* Introduction */}
          <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 mb-8">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
                {content[lang].introduction.title}
              </h2>
            </div>
            <p className="text-gray-700 leading-relaxed text-base sm:text-lg">
              {content[lang].introduction.content}
            </p>
          </div>

          {/* Vision & Mission */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-teal-500 rounded-full flex items-center justify-center">
                  <svg
                    className="w-6 h-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900">
                  {content[lang].vision.title}
                </h3>
              </div>
              <p className="text-gray-700 leading-relaxed">
                {content[lang].vision.content}
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center">
                  <svg
                    className="w-6 h-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900">
                  {content[lang].mission.title}
                </h3>
              </div>
              <p className="text-gray-700 leading-relaxed">
                {content[lang].mission.content}
              </p>
            </div>
          </div>

          {/* Core Values */}
          <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 mb-8">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-gray-900">
                {content[lang].values.title}
              </h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {content[lang].values.items.map((value, index) => (
                <div
                  key={index}
                  className="bg-gradient-to-br from-orange-50 to-teal-50 rounded-xl p-6"
                >
                  <h4 className="text-lg font-semibold text-gray-900 mb-3">
                    {value.title}
                  </h4>
                  <p className="text-gray-700 text-sm leading-relaxed">
                    {value.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Target Audience & Story */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-teal-500 rounded-full flex items-center justify-center">
                  <svg
                    className="w-6 h-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900">
                  {content[lang].audience.title}
                </h3>
              </div>
              <p className="text-gray-700 leading-relaxed">
                {content[lang].audience.content}
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center">
                  <svg
                    className="w-6 h-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                    />
                  </svg>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900">
                  {content[lang].story.title}
                </h3>
              </div>
              <p className="text-gray-700 leading-relaxed">
                {content[lang].story.content}
              </p>
            </div>
          </div>

          {/* Purpose & Brand */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center">
                  <svg
                    className="w-6 h-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900">
                  {content[lang].purpose.title}
                </h3>
              </div>
              <p className="text-gray-700 leading-relaxed">
                {content[lang].purpose.content}
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-teal-500 rounded-full flex items-center justify-center">
                  <svg
                    className="w-6 h-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M7 4V2a1 1 0 011-1h8a1 1 0 011 1v2m-9 0h10m-10 0a2 2 0 00-2 2v14a2 2 0 002 2h10a2 2 0 002-2V6a2 2 0 00-2-2"
                    />
                  </svg>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900">
                  {content[lang].brand.title}
                </h3>
              </div>
              <p className="text-gray-700 leading-relaxed">
                {content[lang].brand.content}
              </p>
            </div>
          </div>

          {/* Tone of Voice */}
          <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 mb-8">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                  />
                </svg>
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-gray-900">
                {content[lang].tone.title}
              </h3>
            </div>
            <p className="text-gray-700 leading-relaxed text-base sm:text-lg">
              {content[lang].tone.content}
            </p>
          </div>

          {/* Why Choose Us */}
          <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
                  />
                </svg>
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-gray-900">
                {content[lang].whyChoose.title}
              </h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {content[lang].whyChoose.items.map((item, index) => (
                <div
                  key={index}
                  className="bg-gradient-to-br from-teal-50 to-orange-50 rounded-xl p-6"
                >
                  <h4 className="text-lg font-semibold text-gray-900 mb-3">
                    {item.title}
                  </h4>
                  <p className="text-gray-700 text-sm leading-relaxed">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
