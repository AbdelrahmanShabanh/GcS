"use client";

import { useState, useEffect } from "react";
import { ApiClient } from "@/utils/api";

// كومبوننت الأسئلة الشائعة
interface FAQProps {
  lang: string;
}

export default function FAQ({ lang }: FAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [faqs, setFaqs] = useState([
    {
      question: {
        ar: "ما هي حصص البرمجة؟",
        en: "What are coding classes?",
      },
      answer: {
        ar: "تعلم حصص البرمجة الطلاب كيفية التواصل بفعالية مع أجهزة الكمبيوتر، مما يسمح لهم بإنشاء وتطوير مجموعة متنوعة من الإبداعات الرقمية مثل البرمجيات والألعاب والبرامج والمواقع والتطبيقات. توفر هذه الحصص عبر الإنترنت رؤى قيمة حول استخدام لغات البرمجة مثل JavaScript و Python، بالإضافة إلى استخدام الأدوات التفاعلية مثل MIT Scratch وغيرها.",
        en: "Coding classes teach students how to communicate effectively with computers, allowing them to create and develop a variety of digital creations such as software, games, programmes, websites, and applications. These online classes provide valuable insights into the use of programming languages such as JavaScript and Python, as well as the use of interactive tools such as MIT Scratch and others.",
      },
    },
    {
      question: {
        ar: "ما هي حصص البرمجة للأطفال؟",
        en: "What are coding classes for kids?",
      },
      answer: {
        ar: "تهدف GC SCHOOL إلى تعليم الطلاب من سن 6 إلى 18 المبادئ الأساسية للغات البرمجة، بدءاً من المفاهيم البسيطة مثل بناء الجملة والمتغيرات وهياكل البيانات وما إلى ذلك، والتقدم إلى المفاهيم الأكثر تعقيداً مثل تعدد الأشكال والتزامن وما إلى ذلك، باستخدام لغات وأدوات تفاعلية مثل MIT Scratch وغيرها.",
        en: "GC SCHOOL aims to teach students aged 6 to 18 the fundamental principles of programming languages, beginning with simple concepts such as syntax, variables, data structures, and so on, and progressing to more complex concepts such as polymorphism, concurrency, and so on, using interactive languages and tools such as MIT Scratch and others.",
      },
    },
    {
      question: {
        ar: "كيف أشرح البرمجة لطفل؟",
        en: "How to explain coding to a child?",
      },
      answer: {
        ar: "من الأفضل تقديم البرمجة للأطفال من خلال أمثلة عملية ومألوفة مثل الألعاب والرسوم المتحركة والموسيقى. تركز حصصنا على تعليم الأطفال كيفية البرمجة من خلال إنشاء ألعاب بسيطة أو استخدام شخصيات الرسوم المتحركة.",
        en: "It is best to introduce coding to children through relatable, practical examples such as games, cartoons, and music. Our classes focus on teaching children how to code through the creation of simple games or the use of cartoon characters.",
      },
    },
    {
      question: {
        ar: "ما هو العمر المناسب لبدء البرمجة؟",
        en: "What is a good age to start coding?",
      },
      answer: {
        ar: "يمكن للأطفال الاستفادة بشكل كبير من بدء رحلة البرمجة في سن مبكرة. لغة البرمجة Scratch Jr متاحة للأطفال في سن الخامسة. تعلم البرمجة يشبه تعلم لغة ثانية، والأطفال يتفوقون في اكتساب اللغة خلال سنواتهم التكوينية. ومع ذلك، فإن الأهم ليس سنهم، بل حماسهم للموضوع والبيئة الداعمة التي تعزز فضولهم.",
        en: "Children can benefit significantly from starting their coding journey at a young age. Scratch Jr, a coding language, is available to children as young as five. Learning to code is similar to learning a second language, and children excel at language acquisition during their formative years. What matters most, however, is not their age, but their enthusiasm for the subject and the supportive environment that fosters their curiosity.",
      },
    },
    {
      question: {
        ar: "هل البرمجة سهلة التعلم؟",
        en: "Is coding easy to learn?",
      },
      answer: {
        ar: "تختلف صعوبة تعلم البرمجة اعتماداً على متى وأين وكيف تتعلم. ومع ذلك، من المهم التمييز بين مجرد معرفة الأساسيات والفهم الحقيقي واستخدام المفاهيم العديدة للبرمجة التي تفتح الباب أمام إمكانيات لا حدود لها. ورش العمل لدينا مخصصة لغرس تقدير الأطفال لجمال إنشاء برامجهم الخاصة وكذلك لتوضيح الإمكانيات التي تبدو غير محدودة التي قد تفتحها خبرة البرمجة.",
        en: "The difficulty of learning to code varies depending on when, where, and how you learn. However, it is critical to distinguish between simply knowing the fundamentals and genuinely comprehending and utilizing the numerous coding ideas that open the door to limitless possibilities. Our workshops are intended to inculcate in children an appreciation for the beauty of creating their own software as well as to illuminate the seemingly unlimited possibilities that coding expertise may open up.",
      },
    },
    {
      question: {
        ar: "هل يمكن لطفل في السادسة تعلم البرمجة؟",
        en: "Can a 6 Year old learn coding?",
      },
      answer: {
        ar: "نعم، يمكن لطفل في السادسة من العمر اكتساب مهارات البرمجة. بالنسبة للأطفال الصغار جداً، قد تكون مهارات القراءة والكتابة عائقاً أمام تعلم البرمجة، مما قد يكون صعباً بشكل خاص لمن هم دون سن السادسة. ومع ذلك، تتعامل حصص GC SCHOOL مع هذه المشكلة من خلال تقديم البرمجة عبر MIT Scratch ولغات السحب والإفلات سهلة الاستخدام الأخرى. هذه الاستراتيجية تمكن الأطفال من استكشاف الأفكار الأساسية للبرمجة من خلال تقنيات التعلم التفاعلية والمثيرة للاهتمام.",
        en: "Yes, a 6-year-old can pick up coding skills. For extremely young children, reading and typing skills might be a barrier to learning how to code, which can be particularly difficult for those under the age of six. GC SCHOOL classes, however, deal with this issue by introducing programming through MIT Scratch and other user-friendly drag-and-drop languages. This strategy enables children to explore the core ideas of coding through engaging and interactive learning techniques.",
      },
    },
    {
      question: {
        ar: "كيف أشجع طفلي على البرمجة؟",
        en: "How do I encourage my child to code?",
      },
      answer: {
        ar: "نهدف إلى إلهام الأطفال من خلال إظهار قوة البرمجة كأداة للسماح لخيالهم بالانطلاق وإنشاء عوالمهم السحرية الخاصة. بالإضافة إلى تعليم فوائد البرمجة، تعزز دوراتنا أيضاً الإبداع والثقة بالنفس. نحقق هذا من خلال استخدام لغات البرمجة المثيرة للاهتمام والتفاعلية، مثل MIT Scratch. تغطي دروسنا في GC SCHOOL مجموعة واسعة من المواضيع، مثل الرسوم المتحركة والموسيقى والرسم وسرد القصص وأكثر من ذلك بكثير.",
        en: "By demonstrating to kids the power of coding as a tool for letting their imaginations run wild and creating their own enchanted worlds, we aim to inspire them. In addition to teaching the benefits of programming, our courses also promote creativity and self-assurance. We accomplish this by utilizing interesting and interactive programming languages, such as MIT Scratch. Our lessons at GC SCHOOL cover a wide range of subjects, such as cartoons, music, painting, storytelling, and much more.",
      },
    },
    {
      question: {
        ar: "يجب أن تكون جيداً في الرياضيات لتعلم البرمجة؟",
        en: "Do you have to be good at math to code?",
      },
      answer: {
        ar: "لا يحتاج طفلك إلى أن يكون عبقرياً في الرياضيات ليتفوق في البرمجة، رغم أنه سيجد التعلم أسهل إذا كان كذلك. يمكن للبرمجة حتى تحسين إنجازه الأكاديمي في مواد مثل الرياضيات والإنجليزية. نؤكد على تطوير الإبداع والتفكير المنطقي والتفكير التحليلي في دوراتنا، وهي مكونات حاسمة لتطوير برمجيات قوية، وهذه المواهب تأخذ الأولوية على خلفية رياضية قوية.",
        en: "Your child does not need to be a math prodigy to excel at coding, though they will find it easier to learn if they are. Coding can even improve their academic achievement in subjects like math and English. We stress the development of creativity, logical reasoning, and analytical thinking in our courses, which are critical components for developing robust software, and these talents take precedence over a strong math background.",
      },
    },
    {
      question: {
        ar: "هل يمكنني تعلم البرمجة بنفسي؟",
        en: "Can I learn to code on my own?",
      },
      answer: {
        ar: "نعم، يمكن تعلم البرمجة بشكل مستقل، لكن التعلم مع معلمين متخصصين وبيئة تعليمية منظمة يوفر فوائد كبيرة. في GC SCHOOL، نوفر بيئة تعليمية داعمة مع معلمين خبراء ومواد تعليمية مصممة خصيصاً للأطفال. هذا النهج المنظم يساعد على بناء أساس قوي في البرمجة ويضمن التقدم المستمر في التعلم.",
        en: "Yes, you can learn to code on your own, but learning with specialized instructors and a structured educational environment provides significant benefits. At GC SCHOOL, we provide a supportive learning environment with expert instructors and educational materials specifically designed for children. This structured approach helps build a strong foundation in coding and ensures consistent learning progress.",
      },
    },
    {
      question: {
        ar: "هل تطوير الألعاب مدرج في البرمجة؟",
        en: "Is game development included in coding?",
      },
      answer: {
        ar: "بالتأكيد، تطوير الألعاب هو مكون أساسي من البرمجة. في الواقع، إنه واحد من أكثر الطرق إثارة للاهتمام وتأثيراً لتقديم الأطفال للبرمجة. بينما يشرعون في مغامرة تطوير الألعاب، لن يتعلم طفلك المهارات التقنية فحسب، بل سيطور أيضاً مواهب مهمة مثل توليد الأفكار وحل المشاكل والتنفيذ. هذه الطريقة ستعزز إبداعهم وتحسن التفكير المكاني وتطور التفكير المنطقي، من بين فوائد أخرى.",
        en: "Absolutely, game development is an essential component of coding. In fact, it's one of the most engaging and impactful ways to introduce children to coding. As they embark on the adventure of game development, your child will not only learn technical skills but will also develop important talents such as idea generating, problem-solving, and execution. This method will boost their creativity, improve spatial reasoning, and develop logical thinking, among other benefits.",
      },
    },
  ]);

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
