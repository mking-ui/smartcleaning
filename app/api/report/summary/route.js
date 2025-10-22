import connectDB from "@/config/db";
import Report from "@/models/Report";
import { NextResponse } from "next/server";


export async function GET() {
  try {
    await connectDB();

    // Fetch all statuses in parallel for speed
    const [pending, inProgress, completed] = await Promise.all([
      Report.find({ status: "Pending" }).lean(),
      Report.find({ status: "In Progress" }).lean(),
      Report.find({ status: "Completed" }).lean(),
    ]);

    // Prepare summary data
    const summary = [
      { name: "Pending", value: pending.length, color: "#facc15" },
      { name: "In Progress", value: inProgress.length, color: "#3b82f6" },
      { name: "Completed", value: completed.length, color: "#16a34a" },
    ];

    // Combine all reports for weekly chart data
    const allReports = [...pending, ...inProgress, ...completed];
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const weeklyJobs = days.map((day, index) => ({
      day,
      jobs: allReports.filter(
        (r) => new Date(r.createdAt).getDay() === index
      ).length,
    }));

    return NextResponse.json({
      success: true,
      summary,
      weeklyJobs,
    });
  } catch (error) {
    console.error("Error fetching report summary:", error);
    return NextResponse.json(
      { success: false, message: "Failed to load summary" },
      { status: 500 }
    );
  }
}
