import { NextRequest, NextResponse } from "next/server";
import { getDatabase } from "../../../lib/mongodb";

export async function GET() {
  try {
    const db = await getDatabase();
    const pricing = await db
      .collection("pricing")
      .find({})
      .sort({ order: 1, createdAt: 1 })
      .toArray();

    const formattedPricing = pricing.map((plan) => {
      // Map ObjectIds to proper plan IDs based on content
      let planId = plan.id;

      // If it's an ObjectId (24 character hex string), map it to proper ID
      if (
        plan.id &&
        plan.id.length === 24 &&
        /^[0-9a-fA-F]{24}$/.test(plan.id)
      ) {
        // Map based on price and title content
        if (
          plan.price === "4800" ||
          plan.titleEn === "Beginner" ||
          plan.titleAr === "مبتدأ"
        ) {
          planId = "beginner";
        } else if (
          plan.price === "16800" ||
          plan.titleEn === "Expert" ||
          plan.titleAr === "احترافي"
        ) {
          planId = "expert";
        } else if (
          plan.price === "9120" ||
          plan.titleEn === "Advanced" ||
          plan.titleAr === "متقدم"
        ) {
          planId = "advanced";
        }
      }

      return {
        id: planId,
        title: {
          ar: plan.titleAr,
          en: plan.titleEn,
        },
        price: plan.price,
        period: {
          ar: plan.periodAr,
          en: plan.periodEn,
        },
        features: {
          ar: plan.featuresAr,
          en: plan.featuresEn,
        },
      };
    });

    return NextResponse.json({
      success: true,
      data: formattedPricing,
    });
  } catch (error) {
    console.error("Get pricing error:", error);
    return NextResponse.json(
      { success: false, error: "Database error" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const { pricing } = await request.json();

    if (!pricing) {
      return NextResponse.json(
        { success: false, error: "Pricing data is required" },
        { status: 400 }
      );
    }

    const db = await getDatabase();

    // Clear existing pricing
    await db.collection("pricing").deleteMany({});

    // Insert new pricing with proper ordering
    const pricingToInsert = pricing.map((plan: any, index: number) => ({
      id: plan.id, // Include the plan ID
      titleAr: plan.title.ar,
      titleEn: plan.title.en,
      price: plan.price,
      periodAr: plan.period.ar,
      periodEn: plan.period.en,
      featuresAr: plan.features.ar,
      featuresEn: plan.features.en,
      order: index + 1, // Add order field (1, 2, 3)
      createdAt: new Date(),
      updatedAt: new Date(),
    }));

    if (pricingToInsert.length > 0) {
      await db.collection("pricing").insertMany(pricingToInsert);
    }

    return NextResponse.json({
      success: true,
      message: "Pricing updated successfully",
    });
  } catch (error) {
    console.error("Update pricing error:", error);
    return NextResponse.json(
      { success: false, error: "Database error" },
      { status: 500 }
    );
  }
}
