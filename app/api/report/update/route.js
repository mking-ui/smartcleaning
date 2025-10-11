import connectDB from "@/config/db";
import Report from "@/models/Report";
import { NextResponse } from "next/server";

export async function PUT(request) {
  try {
    await connectDB();
    const body = await request.json();
    const { reportId } = body;

    if (!reportId) {
      return NextResponse.json({ success: false, message: "Missing report ID" }, { status: 400 });
    }

    const updatedReport = await Report.findByIdAndUpdate(
      reportId,
      { status: "resolved" },
      { new: true }
    );

    if (!updatedReport) {
      return NextResponse.json({ success: false, message: "Report not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, report: updatedReport });
  } catch (error) {
    console.error("Error updating report:", error);
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
