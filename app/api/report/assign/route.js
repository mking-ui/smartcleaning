import { NextResponse } from "next/server";
import connectDB from "@/config/db";
import Report from "@/models/Report";
import { sendMail } from "@/config/mail"; // your mail config file

export async function GET() {
  try {
    await connectDB();

    const assignedReports = await Report.find({ status: "Approved" })
      .populate("assignedCleaner", "firstName surname email")
      .sort({ createdAt: -1 });

    return NextResponse.json({ success: true, reports: assignedReports });
  } catch (error) {
    console.error("Error fetching assigned tasks:", error);
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}

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

    // Calculate task deadline
    const deadlineDate = new Date();
    deadlineDate.setDate(deadlineDate.getDate() + Number(days));

    // Update report to assign cleaner
    const updated = await Report.findByIdAndUpdate(
      reportId,
      {
        assignedCleaner: cleanerId,
        deadline: deadlineDate,
        status: "Approved", // changed from Approved to Assigned for clarity
      },
      { new: true }
    ).populate("assignedCleaner", "firstName surname email");

    if (!updated) {
      return NextResponse.json(
        { success: false, message: "Report not found" },
        { status: 404 }
      );
    }

    // ✅ Send email notification to the assigned cleaner
    if (updated.assignedCleaner?.email) {
      try {
        await sendMail({
          to: updated.assignedCleaner.email,
          subject: "New Task Assigned - SmartCleaning System",
          html: `
            <h2>Hello ${updated.assignedCleaner.firstName} ${updated.assignedCleaner.surname},</h2>
            <p>You have been assigned a new cleaning task through the <strong>SmartCleaning System</strong>.</p>
            <p><strong>Job Type:</strong> ${updated.jobType}</p>
            <p><strong>Location:</strong> ${updated.location}</p>
            <p><strong>Description:</strong> ${updated.description}</p>
            <p><strong>Urgency:</strong> ${updated.urgency}</p>
            <p><strong>Deadline:</strong> ${deadlineDate.toLocaleDateString()}</p>
            <br />
            <p>Please log in to your dashboard to view full details and mark your progress.</p>
            <p>Regards,<br/><strong>SmartCleaning Supervisor Team</strong></p>
          `,
        });
        console.log("✅ Email sent to:", updated.assignedCleaner.email);
      } catch (emailError) {
        console.error("⚠️ Failed to send email:", emailError.message);
      }
    }

    return NextResponse.json({
      success: true,
      message: "Task assigned successfully and email notification sent.",
      report: updated,
    });
  } catch (error) {
    console.error("Error assigning task:", error);
    return NextResponse.json(
      { success: false, message: "Assignment failed" },
      { status: 500 }
    );
  }
}
