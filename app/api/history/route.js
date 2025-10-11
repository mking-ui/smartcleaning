import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import connectDB from "@/config/db";
import User from "@/models/User";
import Report from "@/models/Report";

export async function GET(request) {
  try {
    await connectDB();

    const token = request.cookies.get("token")?.value;
    if (!token) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }

    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch {
      return NextResponse.json({ success: false, message: "Invalid token" }, { status: 401 });
    }

    const userId = decoded.userId;
    const user = await User.findById(userId);
    if (!user) {
      return NextResponse.json({ success: false, message: "User not found" }, { status: 404 });
    }

    const reports = await Report.find({ userId }).sort({ createdAt: -1 });

    return NextResponse.json({ success: true, reports });
  } catch (error) {
    console.error("Error fetching report history:", error);
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
