import { NextResponse } from "next/server";
import connectDB from "@/config/db";
import Report from "@/models/Report";

// ✅ GET: Return all assigned tasks (status = "Approved")
export async function GET() {
  try {
    await connectDB();

    const assignedReports = await Report.find({ status: "Approved" })
      .populate("assignedCleaner", "firstName surname email")
      .sort({ createdAt: -1 });

    return NextResponse.json({ success: true, reports: assignedReports });
  } catch (error) {
    console.error("Error fetching assigned tasks:", error);
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

// ✅ POST: Assign a task to a cleaner
export async function POST(req) {
  try {
    await connectDB();
    const { reportId, cleanerId, days } = await req.json();

    if (!reportId || !cleanerId || !days) {
      return NextResponse.json(
        { success: false, message: "Missing required fields" },
        { status: 400 }
      );
    }

    const deadlineDate = new Date();
    deadlineDate.setDate(deadlineDate.getDate() + Number(days));

    const updated = await Report.findByIdAndUpdate(
      reportId,
      {
        assignedCleaner: cleanerId,
        deadline: deadlineDate,
        status: "Approved"
      },
      { new: true }
    );

    if (!updated) {
      return NextResponse.json(
        { success: false, message: "Report not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, report: updated });
  } catch (error) {
    console.error("Error assigning task:", error);
    return NextResponse.json(
      { success: false, message: "Assignment failed" },
      { status: 500 }
    );
  }
}
