import { NextRequest, NextResponse } from "next/server";
import { getDatabase } from "../../../lib/mongodb";

export async function GET() {
  try {
    const db = await getDatabase();
    const projects = await db
      .collection("projects")
      .find({})
      .sort({ createdAt: 1 })
      .toArray();

    const formattedProjects = projects.map((project) => ({
      id: project._id,
      name: project.name,
      image: project.imageUrl,
      description: {
        ar: project.descriptionAr,
        en: project.descriptionEn,
      },
    }));

    return NextResponse.json({
      success: true,
      data: formattedProjects,
    });
  } catch (error) {
    console.error("Get projects error:", error);
    return NextResponse.json(
      { success: false, error: "Database error" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const { projects } = await request.json();

    if (!projects) {
      return NextResponse.json(
        { success: false, error: "Projects data is required" },
        { status: 400 }
      );
    }

    const db = await getDatabase();

    // Clear existing projects
    await db.collection("projects").deleteMany({});

    // Insert new projects
    const projectsToInsert = projects.map((project: any) => ({
      name: project.name,
      imageUrl: project.image,
      descriptionAr: project.description.ar,
      descriptionEn: project.description.en,
      createdAt: new Date(),
      updatedAt: new Date(),
    }));

    if (projectsToInsert.length > 0) {
      await db.collection("projects").insertMany(projectsToInsert);
    }

    return NextResponse.json({
      success: true,
      message: "Projects updated successfully",
    });
  } catch (error) {
    console.error("Update projects error:", error);
    return NextResponse.json(
      { success: false, error: "Database error" },
      { status: 500 }
    );
  }
}
