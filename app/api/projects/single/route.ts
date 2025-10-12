import { NextRequest, NextResponse } from "next/server";
import { getDatabase } from "../../../../lib/mongodb";

export async function POST(request: NextRequest) {
  try {
    const projectData = await request.json();

    if (!projectData.name || !projectData.image || !projectData.description) {
      return NextResponse.json(
        { success: false, error: "Project data is incomplete" },
        { status: 400 }
      );
    }

    const db = await getDatabase();

    // Insert single project
    const projectToInsert = {
      name: projectData.name,
      imageUrl: projectData.image,
      descriptionAr: projectData.description.ar,
      descriptionEn: projectData.description.en,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const result = await db.collection("projects").insertOne(projectToInsert);

    return NextResponse.json({
      success: true,
      message: "Project saved successfully",
      id: result.insertedId,
    });
  } catch (error) {
    console.error("Save single project error:", error);
    return NextResponse.json(
      { success: false, error: "Database error" },
      { status: 500 }
    );
  }
}
