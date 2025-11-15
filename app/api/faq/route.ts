import { NextRequest, NextResponse } from 'next/server';
import { getDatabase } from '../../../lib/mongodb';

export async function GET() {
  try {
    const db = await getDatabase();
    const faqs = await db.collection('faqs').find({}).sort({ createdAt: 1 }).toArray();

    const formattedFAQs = faqs.map(faq => ({
      id: faq._id,
      question: {
        ar: faq.questionAr,
        en: faq.questionEn
      },
      answer: {
        ar: faq.answerAr,
        en: faq.answerEn
      }
    }));

    return NextResponse.json({
      success: true,
      data: formattedFAQs
    });
  } catch (error) {
    console.error('Get FAQs error:', error);
    return NextResponse.json(
      { success: false, error: 'Database error' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const { faqs } = await request.json();

    if (!faqs) {
      return NextResponse.json(
        { success: false, error: 'FAQs data is required' },
        { status: 400 }
      );
    }

    const db = await getDatabase();
    
    // Clear existing FAQs
    await db.collection('faqs').deleteMany({});
    
    // Insert new FAQs
    const faqsToInsert = faqs.map((faq: any) => ({
      questionAr: faq.question.ar,
      questionEn: faq.question.en,
      answerAr: faq.answer.ar,
      answerEn: faq.answer.en,
      createdAt: new Date(),
      updatedAt: new Date()
    }));
    
    if (faqsToInsert.length > 0) {
      await db.collection('faqs').insertMany(faqsToInsert);
    }

    return NextResponse.json({
      success: true,
      message: 'FAQs updated successfully'
    });
  } catch (error) {
    console.error('Update FAQs error:', error);
    return NextResponse.json(
      { success: false, error: 'Database error' },
      { status: 500 }
    );
  }
}

