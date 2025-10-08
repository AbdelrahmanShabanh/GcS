import { NextRequest, NextResponse } from 'next/server';
import { getDatabase } from '@/lib/mongodb';

export async function GET() {
  try {
    const db = await getDatabase();
    const heroData = await db.collection('hero_data').findOne({}, { sort: { updatedAt: -1 } });

    if (heroData) {
      return NextResponse.json({
        success: true,
        data: {
          image: heroData.imageUrl
        }
      });
    } else {
      return NextResponse.json({
        success: true,
        data: {
          image: '/age-range.png'
        }
      });
    }
  } catch (error) {
    console.error('Get hero data error:', error);
    return NextResponse.json(
      { success: false, error: 'Database error' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const { image } = await request.json();

    if (!image) {
      return NextResponse.json(
        { success: false, error: 'Image URL is required' },
        { status: 400 }
      );
    }

    const db = await getDatabase();
    
    // Update or insert hero data
    await db.collection('hero_data').updateOne(
      {},
      { 
        $set: { 
          imageUrl: image,
          updatedAt: new Date()
        }
      },
      { upsert: true }
    );

    return NextResponse.json({
      success: true,
      message: 'Hero data updated successfully'
    });
  } catch (error) {
    console.error('Update hero data error:', error);
    return NextResponse.json(
      { success: false, error: 'Database error' },
      { status: 500 }
    );
  }
}

