export interface AdminUser {
  _id?: string;
  email: string;
  password: string;
  isAdmin: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface HeroData {
  _id?: string;
  imageUrl: string;
  updatedAt: Date;
}

export interface Course {
  _id?: string;
  levelName: string;
  courseName: string;
  imageUrl: string;
  sessionsAr: string;
  sessionsEn: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Project {
  _id?: string;
  name: string;
  imageUrl: string;
  descriptionAr: string;
  descriptionEn: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Leader {
  _id?: string;
  id: string;
  nameAr: string;
  nameEn: string;
  ageAr: string;
  ageEn: string;
  videoUrl: string;
  thumbnailUrl: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface FAQ {
  _id?: string;
  questionAr: string;
  questionEn: string;
  answerAr: string;
  answerEn: string;
  createdAt: Date;
  updatedAt: Date;
}

