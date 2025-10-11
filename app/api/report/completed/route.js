import { NextResponse } from "next/server";
import connectDB from "@/config/db";
import Report from "@/models/Report";
import User from "@/models/User";

export async function GET() {
  try {
    await connectDB();

    // ✅ Fetch all reports where status = "Resolved" or "Completed"
    const completedReports = await Report.find({
      status: { $in: ["Resolved", "Completed"] },
    })
      .populate("assignedCleaner", "firstName surname email")
      .sort({ updatedAt: -1 });

    return NextResponse.json({
      success: true,
      count: completedReports.length,
      reports: completedReports,
    });
  } catch (error) {
    console.error("Error fetching completed reports:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch completed reports", error: error.message },
      { status: 500 }
    );
  }
}
