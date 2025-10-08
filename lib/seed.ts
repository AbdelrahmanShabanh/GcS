import { getDatabase } from './mongodb';
import bcrypt from 'bcryptjs';

export const seedDatabase = async () => {
  try {
    const db = await getDatabase();
    
    // Check if data already exists
    const adminCount = await db.collection('admin_users').countDocuments();
    if (adminCount > 0) {
      console.log('Database already seeded');
      return;
    }

    // Create admin user
    const hashedPassword = await bcrypt.hash('admin123', 10);
    await db.collection('admin_users').insertOne({
      email: 'admin@gcschool.tech',
      password: hashedPassword,
      isAdmin: true,
      createdAt: new Date(),
      updatedAt: new Date()
    });

    // Create hero data
    await db.collection('hero_data').insertOne({
      imageUrl: '/age-range.png',
      updatedAt: new Date()
    });

    // Create courses
    const courses = [
      {
        levelName: 'المستوى الاول',
        courseName: 'Code.org Pre',
        imageUrl: '/Code.org_logo.svg.png',
        sessionsAr: '6 حصص',
        sessionsEn: '6 sessions',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        levelName: 'المستوى الاول',
        courseName: 'Scratch Jr',
        imageUrl: '/download.jpeg',
        sessionsAr: '6 حصص',
        sessionsEn: '6 sessions',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        levelName: 'المستوى الاول',
        courseName: 'Code.org Express',
        imageUrl: '/codeorg2019_social.webp',
        sessionsAr: '6 حصص',
        sessionsEn: '6 sessions',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        levelName: 'المستوى الاول',
        courseName: 'Scratch',
        imageUrl: '/377-3774504_scratch-logo-hd-png-download.png',
        sessionsAr: '6 حصص',
        sessionsEn: '6 sessions',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        levelName: 'المستوى الثاني',
        courseName: 'PictoBlox (ML)',
        imageUrl: '/7c53b61d-0a24-408b-84e6-1bcec10775f6.png',
        sessionsAr: '6 حصص',
        sessionsEn: '6 sessions',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        levelName: 'المستوى الثاني',
        courseName: 'EduBlocks (Web)',
        imageUrl: '/images.png',
        sessionsAr: '6 حصص',
        sessionsEn: '6 sessions',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        levelName: 'المستوى الثاني',
        courseName: 'EduBlocks (Python)',
        imageUrl: '/images (1).png',
        sessionsAr: '6 حصص',
        sessionsEn: '6 sessions',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        levelName: 'المستوى الثاني',
        courseName: 'MIT App Inventor',
        imageUrl: '/MIT-App-Inventor-Platform-Icon-MIT-App-Inventor-is-a-platform-for-creating-open-source_Q320.jpg',
        sessionsAr: '6 حصص',
        sessionsEn: '6 sessions',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        levelName: 'المستوى الثالث',
        courseName: 'Web Development',
        imageUrl: '/HTML-CSS-JS-Logo.png',
        sessionsAr: '24 حصه',
        sessionsEn: '24 sessions',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        levelName: 'المستوى الثالث',
        courseName: 'Python',
        imageUrl: '/Python.svg.png',
        sessionsAr: '18 حصه',
        sessionsEn: '18 sessions',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ];

    await db.collection('courses').insertMany(courses);

    // Create projects
    const projects = [
      {
        name: 'Space Adventure',
        imageUrl: '/proj-space.png',
        descriptionAr: 'مشروع رحلة فضائية تفاعلية باستخدام Scratch',
        descriptionEn: 'Interactive space adventure project using Scratch',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Bowling Game',
        imageUrl: '/proj-bowling.png',
        descriptionAr: 'لعبة بولينج ثلاثية الأبعاد',
        descriptionEn: '3D Bowling Game',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Smart Car',
        imageUrl: '/proj-car.png',
        descriptionAr: 'سيارة ذكية مع مستشعرات',
        descriptionEn: 'Smart car with sensors',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Drone Control',
        imageUrl: '/proj-drone.png',
        descriptionAr: 'تحكم في الطائرة بدون طيار',
        descriptionEn: 'Drone control system',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ];

    await db.collection('projects').insertMany(projects);

    // Create leaders
    const leaders = [
      {
        id: 'malek',
        nameAr: 'مالك',
        nameEn: 'Malek',
        ageAr: '13 سنة',
        ageEn: '13 years',
        videoUrl: 'https://youtube.com/shorts/OnS7OhrMjPs?si=Wj2DDvb7l5tMqbNN',
        thumbnailUrl: '/image_copy_2.png',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 'saja',
        nameAr: 'سجى',
        nameEn: 'Saja',
        ageAr: '9 سنوات',
        ageEn: '9 years',
        videoUrl: 'https://youtube.com/shorts/Cg6HfDH6sbU?si=MFqFzFVDcfA2i_tb',
        thumbnailUrl: '/image_copy.png',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 'parent',
        nameAr: 'ولي أمر',
        nameEn: 'Parent',
        ageAr: '',
        ageEn: '',
        videoUrl: 'https://youtube.com/shorts/OHEKjwZjdpY?si=3EBksw_XHDSX2AK9',
        thumbnailUrl: '/image.png',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ];

    await db.collection('leaders').insertMany(leaders);

    // Create FAQs
    const faqs = [
      {
        questionAr: 'ما هي حصص البرمجة؟',
        questionEn: 'What are programming classes?',
        answerAr: 'تعلم حصص البرمجة الطلاب كيفية التواصل بفعالية مع أجهزة الكمبيوتر، مما يسمح لهم بإنشاء وتطوير مجموعة متنوعة من الإبداعات الرقمية مثل البرمجيات والألعاب والبرامج والمواقع والتطبيقات. توفر هذه الحصص عبر الإنترنت رؤى قيمة حول استخدام لغات البرمجة مثل JavaScript و Python، بالإضافة إلى استخدام الأدوات التفاعلية مثل MIT Scratch وغيرها.',
        answerEn: 'Programming classes teach students how to effectively communicate with computers, allowing them to create and develop a variety of digital creations such as software, games, programs, websites, and applications. These online classes provide valuable insights into using programming languages like JavaScript and Python, as well as using interactive tools like MIT Scratch and others.',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        questionAr: 'ما هي حصص البرمجة للأطفال؟',
        questionEn: 'What are programming classes for children?',
        answerAr: 'تهدف GC SCHOOL إلى تعليم الطلاب من سن 6 إلى 18 المبادئ الأساسية للغات البرمجة، بدءاً من المفاهيم البسيطة مثل بناء الجملة والمتغيرات وهياكل البيانات وما إلى ذلك، والتقدم إلى المفاهيم الأكثر تعقيداً مثل تعدد الأشكال والتزامن وما إلى ذلك، باستخدام لغات وأدوات تفاعلية مثل MIT Scratch وغيرها.',
        answerEn: 'GC SCHOOL aims to teach students aged 6 to 18 the fundamental principles of programming languages, starting from simple concepts like syntax, variables, data structures, and so on, and progressing to more complex concepts like polymorphism and concurrency, using interactive languages and tools like MIT Scratch and others.',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        questionAr: 'كيف أشرح البرمجة لطفل؟',
        questionEn: 'How do I explain programming to a child?',
        answerAr: 'من الأفضل تقديم البرمجة للأطفال من خلال أمثلة عملية ومألوفة مثل الألعاب والرسوم المتحركة والموسيقى. تركز حصصنا على تعليم الأطفال كيفية البرمجة من خلال إنشاء ألعاب بسيطة أو استخدام شخصيات الرسوم المتحركة.',
        answerEn: 'It is best to introduce coding to children through relatable, practical examples such as games, cartoons, and music. Our classes focus on teaching children how to code through the creation of simple games or the use of cartoon characters.',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        questionAr: 'ما هو العمر المناسب لبدء البرمجة؟',
        questionEn: 'What is the appropriate age to start programming?',
        answerAr: 'يمكن للأطفال الاستفادة بشكل كبير من بدء رحلة البرمجة في سن مبكرة. لغة البرمجة Scratch Jr متاحة للأطفال في سن الخامسة. تعلم البرمجة يشبه تعلم لغة ثانية، والأطفال يتفوقون في اكتساب اللغة خلال سنواتهم التكوينية. ومع ذلك، فإن الأهم ليس سنهم، بل حماسهم للموضوع والبيئة الداعمة التي تعزز فضولهم.',
        answerEn: 'Children can benefit significantly from starting their coding journey at a young age. Scratch Jr, a coding language, is available to children as young as five. Learning to code is similar to learning a second language, and children excel at language acquisition during their formative years. What matters most, however, is not their age, but their enthusiasm for the subject and the supportive environment that fosters their curiosity.',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        questionAr: 'هل البرمجة سهلة التعلم؟',
        questionEn: 'Is programming easy to learn?',
        answerAr: 'تختلف صعوبة تعلم البرمجة اعتماداً على متى وأين وكيف تتعلم. ومع ذلك، من المهم التمييز بين مجرد معرفة الأساسيات والفهم الحقيقي واستخدام المفاهيم العديدة للبرمجة التي تفتح الباب أمام إمكانيات لا حدود لها. ورش العمل لدينا مخصصة لغرس تقدير الأطفال لجمال إنشاء برامجهم الخاصة وكذلك لتوضيح الإمكانيات التي تبدو غير محدودة التي قد تفتحها خبرة البرمجة.',
        answerEn: 'The difficulty of learning to code varies depending on when, where, and how you learn. However, it is critical to distinguish between simply knowing the fundamentals and genuinely comprehending and utilizing the numerous coding ideas that open the door to limitless possibilities. Our workshops are intended to inculcate in children an appreciation for the beauty of creating their own software as well as to illuminate the seemingly unlimited possibilities that coding expertise may open up.',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ];

    await db.collection('faqs').insertMany(faqs);

    console.log('Database seeded successfully');
  } catch (error) {
    console.error('Error seeding database:', error);
    throw error;
  }
};

