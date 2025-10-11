import { NextResponse } from "next/server";
import connectDB from "@/config/db";
import Report from "@/models/Report";

export async function GET() {
  try {
    await connectDB();

    const reports = await Report.find({ status: "In Progress" })
      .populate("assignedCleaner", "firstName surname email")
      .sort({ createdAt: -1 });

    return NextResponse.json({ success: true, reports });
  } catch (error) {
    console.error("Error fetching in-progress reports:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch reports", error: error.message },
      { status: 500 }
    );
  }
}
