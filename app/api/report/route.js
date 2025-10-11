
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import connectDB from "@/config/db";
import User from "@/models/User";
import Report from "@/models/Report";
import cloudinary from "@/config/cloudinary";



export async function POST(request) {
  try {
    await connectDB();

    // ✅ Extract token from cookie
    const token = request.cookies.get("token")?.value;
    if (!token) {
      return NextResponse.json({ success: false, message: "Unauthorized: No token" }, { status: 401 });
    }

    // ✅ Verify token
    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
      return NextResponse.json({ success: false, message: "Invalid token" }, { status: 401 });
    }

    const userId = decoded.userId;

    // ✅ Confirm user exists
    const user = await User.findById(userId);
    if (!user) {
      return NextResponse.json({ success: false, message: "User not found" }, { status: 404 });
    }

    // ✅ Parse form data
    const formData = await request.formData();
    const firstName = formData.get("firstName");
    const surname = formData.get("surname");
    const reporterEmail = formData.get("reporterEmail");
    const location = formData.get("location");
    const googleLocation = formData.get("googleLocation");
    const description = formData.get("description");
    const urgency = formData.get("urgency");
    const jobType = formData.get("jobType");
    const files = formData.getAll("images");

    if (!files || files.length === 0) {
      return NextResponse.json({ success: false, message: "No images uploaded" }, { status: 400 });
    }

    // ✅ Upload images to Cloudinary using base64
    const uploadedImages = await Promise.all(
      files.map(async (file) => {
        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);
        const result = await cloudinary.uploader.upload(
          `data:image/jpeg;base64,${buffer.toString("base64")}`,
          { resource_type: "image" }
        );
        return { filename: result.original_filename, url: result.secure_url };
      })
    );

    // ✅ Save report to DB
    const newReport = await Report.create({
      userId,
      firstName,
      surname,
      reporterEmail,
      location,
      googleLocation,
      description,
      urgency,
      jobType,
      images: uploadedImages,
      status: "Pending"
    });

    return NextResponse.json({ success: true, message: "Report submitted", report: newReport });
  } catch (error) {
    console.error("Error in /api/report:", error);
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
