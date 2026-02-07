import { NextRequest } from "next/server";
import { applicationSchema } from "@/lib/validators/application";
import { db } from "@/lib/db";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validationResult = applicationSchema.safeParse(body);
    if (!validationResult.success) {
      const errors = validationResult.error.issues.map((error) => ({
        field: error.path.join("."),
        message: error.message,
      }));
      return Response.json(
        {
          error: "Validation failed. Please check your input.",
          details: errors,
        },
        { status: 400 },
      );
    }

    const validatedData = validationResult.data;
    const application = await db.application.create({
      data: {
        name: validatedData.name,
        email: validatedData.email,
        gender: validatedData.gender,
        age: validatedData.age,
      },
    });

    return Response.json(
      {
        success: true,
        message: "Application submitted successfully",
        data: application,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("application create route filaed :", error);
    return Response.json(
      {
        error: "Internal server error",
        message:
          "An error occurred while processing your application. Please try again later. If the issue persists, please contact support.",
      },
      { status: 500 },
    );
  }
}
