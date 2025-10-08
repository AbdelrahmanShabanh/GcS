import { NextRequest, NextResponse } from 'next/server';
import { getDatabase } from '../../../lib/mongodb';

export async function GET() {
  try {
    const db = await getDatabase();
    const leaders = await db.collection('leaders').find({}).sort({ createdAt: 1 }).toArray();

    const formattedLeaders = leaders.map(leader => ({
      id: leader.id,
      name: {
        ar: leader.nameAr,
        en: leader.nameEn
      },
      age: {
        ar: leader.ageAr,
        en: leader.ageEn
      },
      video: leader.videoUrl,
      thumbnail: leader.thumbnailUrl
    }));

    return NextResponse.json({
      success: true,
      data: formattedLeaders
    });
  } catch (error) {
    console.error('Get leaders error:', error);
    return NextResponse.json(
      { success: false, error: 'Database error' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const { leaders } = await request.json();

    if (!leaders) {
      return NextResponse.json(
        { success: false, error: 'Leaders data is required' },
        { status: 400 }
      );
    }

    const db = await getDatabase();
    
    // Clear existing leaders
    await db.collection('leaders').deleteMany({});
    
    // Insert new leaders
    const leadersToInsert = leaders.map((leader: any) => ({
      id: leader.id,
      nameAr: leader.name.ar,
      nameEn: leader.name.en,
      ageAr: leader.age.ar,
      ageEn: leader.age.en,
      videoUrl: leader.video,
      thumbnailUrl: leader.thumbnail,
      createdAt: new Date(),
      updatedAt: new Date()
    }));
    
    if (leadersToInsert.length > 0) {
      await db.collection('leaders').insertMany(leadersToInsert);
    }

    return NextResponse.json({
      success: true,
      message: 'Leaders updated successfully'
    });
  } catch (error) {
    console.error('Update leaders error:', error);
    return NextResponse.json(
      { success: false, error: 'Database error' },
      { status: 500 }
    );
  }
}

