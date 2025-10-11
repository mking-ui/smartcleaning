import { NextResponse } from "next/server";
import connectDB from "@/config/db";
import Report from "@/models/Report";

export async function GET(req) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);
    const cleanerId = searchParams.get("cleanerId");

    if (!cleanerId) {
      return NextResponse.json({ success: false, message: "Missing cleaner ID" }, { status: 400 });
    }

    const assignedReports = await Report.find({
      assignedCleaner: cleanerId,
      status: "Approved"
    })
      .populate("assignedCleaner", "firstName surname email")
      .sort({ createdAt: -1 });

    return NextResponse.json({ success: true, reports: assignedReports });
  } catch (error) {
    console.error("Error fetching assigned reports:", error);
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
