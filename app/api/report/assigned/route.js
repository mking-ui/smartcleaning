import { NextResponse } from "next/server";
import connectDB from "@/config/db";
import Report from "@/models/Report";
import User from "@/models/User"; // This is the model referenced by assignedCleaner

export async function GET(req) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);
    const email = searchParams.get("email");

    if (!email) {
      return NextResponse.json({ success: false, message: "Missing cleaner email" }, { status: 400 });
    }

    // Find the user (cleaner) by email
    const cleaner = await User.findOne({ email });

    if (!cleaner) {
      return NextResponse.json({ success: false, message: "Cleaner not found" }, { status: 404 });
    }

    // Find reports assigned to this cleaner
    const assignedReports = await Report.find({
      assignedCleaner: cleaner._id,
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
