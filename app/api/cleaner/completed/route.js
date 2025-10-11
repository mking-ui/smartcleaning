import { NextResponse } from "next/server";
import connectDB from "@/config/db";
import Report from "@/models/Report";

export async function GET(req) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);
    const cleanerId = searchParams.get("cleanerId");

    if (!cleanerId) {
      return NextResponse.json(
        { success: false, message: "Cleaner ID is required" },
        { status: 400 }
      );
    }

    // ✅ Fetch completed reports for this cleaner
    const reports = await Report.find({
      "assignedCleaner._id": cleanerId,
      status: "Resolved",
    }).sort({ updatedAt: -1 });

    return NextResponse.json({ success: true, reports });
  } catch (error) {
    console.error("Error fetching completed reports:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch completed reports" },
      { status: 500 }
    );
  }
}
