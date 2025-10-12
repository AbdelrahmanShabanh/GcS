import { NextRequest, NextResponse } from "next/server";
import { getDatabase } from "../../../../lib/mongodb";

export async function POST(request: NextRequest) {
  try {
    const db = await getDatabase();

    // Clear all existing projects
    await db.collection("projects").deleteMany({});

    return NextResponse.json({
      success: true,
      message: "All projects cleared successfully",
    });
  } catch (error) {
    console.error("Clear projects error:", error);
    return NextResponse.json(
      { success: false, error: "Database error" },
      { status: 500 }
    );
  }
}
