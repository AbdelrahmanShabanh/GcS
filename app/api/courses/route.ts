import { NextRequest, NextResponse } from 'next/server';
import { getDatabase } from '../../../lib/mongodb';

export async function GET() {
  try {
    const db = await getDatabase();
    const courses = await db.collection('courses').find({}).sort({ levelName: 1, _id: 1 }).toArray();

    // Group courses by level
    const groupedCourses: { [key: string]: any[] } = {};
    
    courses.forEach(course => {
      const level = course.levelName;
      if (!groupedCourses[level]) {
        groupedCourses[level] = [];
      }
      
      groupedCourses[level].push({
        id: course._id,
        img: course.imageUrl,
        t: course.courseName,
        d: {
          ar: course.sessionsAr,
          en: course.sessionsEn
        },
        order: course.order || 999
      });
    });

    // Sort courses within each level by order
    Object.keys(groupedCourses).forEach(level => {
      groupedCourses[level].sort((a, b) => (a.order || 999) - (b.order || 999));
    });

    return NextResponse.json({
      success: true,
      data: groupedCourses
    });
  } catch (error) {
    console.error('Get courses error:', error);
    return NextResponse.json(
      { success: false, error: 'Database error' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const { courses } = await request.json();

    if (!courses) {
      return NextResponse.json(
        { success: false, error: 'Courses data is required' },
        { status: 400 }
      );
    }

    const db = await getDatabase();
    
    // Clear existing courses
    await db.collection('courses').deleteMany({});
    
    // Insert new courses
    const coursesToInsert = [];
    for (const [levelName, levelCourses] of Object.entries(courses)) {
      for (const course of levelCourses as any[]) {
        coursesToInsert.push({
          levelName,
          courseName: course.t,
          imageUrl: course.img,
          sessionsAr: course.d.ar,
          sessionsEn: course.d.en,
          order: course.order || 999,
          createdAt: new Date(),
          updatedAt: new Date()
        });
      }
    }
    
    if (coursesToInsert.length > 0) {
      await db.collection('courses').insertMany(coursesToInsert);
    }

    return NextResponse.json({
      success: true,
      message: 'Courses updated successfully'
    });
  } catch (error) {
    console.error('Update courses error:', error);
    return NextResponse.json(
      { success: false, error: 'Database error' },
      { status: 500 }
    );
  }
}

