const { MongoClient } = require('mongodb');
const bcrypt = require('bcryptjs');

// Production MongoDB URI
const MONGODB_URI = process.env.MONGODB_URI || "mongodb+srv://gcschool-admin:26FwWDk4C5KzeLVw@myou.j6sr5u0.mongodb.net/?retryWrites=true&w=majority&appName=Myou";

async function initProductionDatabase() {
  const client = new MongoClient(MONGODB_URI);
  
  try {
    await client.connect();
    console.log("Connected to MongoDB Atlas");
    
    const db = client.db("gcschool");
    
    // Create admin user
    const hashedPassword = await bcrypt.hash("admin123", 10);
    await db.collection('adminUsers').deleteMany({});
    await db.collection('adminUsers').insertOne({
      email: "admin@gcschool.tech",
      password: hashedPassword,
      isAdmin: true,
      createdAt: new Date(),
      updatedAt: new Date()
    });
    
    // Seed other collections
    await seedHeroData(db);
    await seedCourses(db);
    await seedProjects(db);
    await seedLeaders(db);
    await seedFAQs(db);
    
    console.log("Production database initialized successfully!");
    
  } catch (error) {
    console.error("Error initializing production database:", error);
  } finally {
    await client.close();
  }
}

async function seedHeroData(db) {
  await db.collection('heroData').deleteMany({});
  await db.collection('heroData').insertOne({
    image: "/age-range.png",
    createdAt: new Date(),
    updatedAt: new Date()
  });
}

async function seedCourses(db) {
  await db.collection('courses').deleteMany({});
  const courses = [
    {
      level: "المستوى الاول",
      courses: [
        { img: "/Code.org_logo.svg.png", t: "Code.org Pre", d: { ar: "6 حصص", en: "6 sessions" } },
        { img: "/377-3774504_scratch-logo-hd-png-download.png", t: "Scratch Jr", d: { ar: "6 حصص", en: "6 sessions" } }
      ]
    },
    {
      level: "المستوى الثاني", 
      courses: [
        { img: "/Code.org_logo.svg.png", t: "Code.org Express", d: { ar: "6 حصص", en: "6 sessions" } },
        { img: "/377-3774504_scratch-logo-hd-png-download.png", t: "Scratch", d: { ar: "6 حصص", en: "6 sessions" } }
      ]
    },
    {
      level: "المستوى الثالث",
      courses: [
        { img: "/hd-python-logo-symbol-transparent-png-735811696257415dbkifcuokn.png", t: "Python", d: { ar: "12 حصص", en: "12 sessions" } },
        { img: "/HTML-CSS-JS-Logo.png", t: "HTML/CSS/JS", d: { ar: "12 حصص", en: "12 sessions" } }
      ]
    }
  ];
  
  await db.collection('courses').insertMany(courses.map(course => ({
    ...course,
    createdAt: new Date(),
    updatedAt: new Date()
  })));
}

async function seedProjects(db) {
  await db.collection('projects').deleteMany({});
  const projects = [
    {
      name: "قاتل الفضاء",
      imageUrl: "/377-3774504_scratch-logo-hd-png-download.png",
      descriptionAr: "أنشئ والعب لعبتك ثلاثية الأبعاد.",
      descriptionEn: "Create and play your 3D game."
    },
    {
      name: "سيارة الفضاء", 
      imageUrl: "/377-3774504_scratch-logo-hd-png-download.png",
      descriptionAr: "قد سيارتك في فضاء لا نهائي.",
      descriptionEn: "Drive your car in infinite space."
    },
    {
      name: "طيار الدرون",
      imageUrl: "/377-3774504_scratch-logo-hd-png-download.png", 
      descriptionAr: "حلّق بطائرتك في بيئة ثلاثية الأبعاد مذهلة.",
      descriptionEn: "Fly your plane in amazing 3D environment."
    },
    {
      name: "لعبة البولينج",
      imageUrl: "/377-3774504_scratch-logo-hd-png-download.png",
      descriptionAr: "اصنع لعبتك وتحدَّ أصدقاءك.",
      descriptionEn: "Make your game and challenge your friends."
    }
  ];
  
  await db.collection('projects').insertMany(projects.map(project => ({
    ...project,
    createdAt: new Date(),
    updatedAt: new Date()
  })));
}

async function seedLeaders(db) {
  await db.collection('leaders').deleteMany({});
  const leaders = [
    {
      id: "malek",
      nameAr: "مالك",
      nameEn: "Malek", 
      ageAr: "13 سنة",
      ageEn: "13 years",
      videoUrl: "https://youtube.com/shorts/OnS7OhrMjPs?si=Wj2DDvb7l5tMqbNN",
      thumbnailUrl: "/image_copy_2.png"
    },
    {
      id: "saja",
      nameAr: "سجى",
      nameEn: "Saja",
      ageAr: "9 سنوات", 
      ageEn: "9 years",
      videoUrl: "https://youtube.com/shorts/example2",
      thumbnailUrl: "/image_copy.png"
    },
    {
      id: "parent",
      nameAr: "ولي أمر",
      nameEn: "Parent",
      ageAr: "ولي أمر",
      ageEn: "Parent", 
      videoUrl: "https://youtube.com/shorts/example3",
      thumbnailUrl: "/image.png"
    }
  ];
  
  await db.collection('leaders').insertMany(leaders.map(leader => ({
    ...leader,
    createdAt: new Date(),
    updatedAt: new Date()
  })));
}

async function seedFAQs(db) {
  await db.collection('faqs').deleteMany({});
  const faqs = [
    {
      questionAr: "ما هي حصص البرمجة؟",
      questionEn: "What are coding classes?",
      answerAr: "تعلم حصص البرمجة الطلاب كيفية التواصل بفعالية مع أجهزة الكمبيوتر، مما يسمح لهم بإنشاء وتطوير مجموعة متنوعة من الإبداعات الرقمية مثل البرمجيات والألعاب والبرامج والمواقع والتطبيقات.",
      answerEn: "Coding classes teach students how to effectively communicate with computers, allowing them to create and develop a variety of digital creations such as software, games, programs, websites, and applications."
    },
    {
      questionAr: "هل يمكن لطفل في السادسة تعلم البرمجة؟",
      questionEn: "Can a 6-year-old child learn programming?",
      answerAr: "نعم، يمكن لطفل في السادسة من العمر اكتساب مهارات البرمجة. بالنسبة للأطفال الصغار جداً، قد تكون مهارات القراءة والكتابة عائقاً أمام تعلم البرمجة.",
      answerEn: "Yes, a 6-year-old child can acquire programming skills. For very young children, reading and writing skills may be a barrier to learning programming."
    }
  ];
  
  await db.collection('faqs').insertMany(faqs.map(faq => ({
    ...faq,
    createdAt: new Date(),
    updatedAt: new Date()
  })));
}

initProductionDatabase();
