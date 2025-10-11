"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { assets } from "@/assets/assets";
import Loading from "@/components/Loading";
import Footer from "@/components/report/Footer";
import { useRouter } from "next/navigation";

const ReportHistory = () => {
  const router = useRouter();
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);

  // Load cached history first
  useEffect(() => {
    const cached = localStorage.getItem("reportHistory");
    if (cached) {
      setReports(JSON.parse(cached));
      setLoading(false);
    }
    fetchReports(); // Fetch fresh data in background
  }, []);

  const fetchReports = async () => {
    try {
      const res = await fetch("/api/history", {
        method: "GET",
        credentials: "include"
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      setReports(data.reports);
      localStorage.setItem("reportHistory", JSON.stringify(data.reports));
    } catch (error) {
      console.error("Failed to fetch reports:", error.message);
    } finally {
      setLoading(false);
    }
  };

  const getBadge = (status) => {
    const normalized = status?.toLowerCase() || "pending";
    if (normalized === "pending") {
      return (
        <span className="px-2 py-1 rounded text-xs bg-yellow-200 text-yellow-800">
          Pending (Waiting for Approval)
        </span>
      );
    }
    if (normalized === "resolved") {
      return (
        <span className="px-2 py-1 rounded text-xs bg-green-200 text-green-800">
          Approved
        </span>
      );
    }
  };

  const getSenderStatus = (status) => {
    const normalized = status?.toLowerCase() || "pending";
    if (normalized === "pending") return "Waiting";
    if (normalized === "resolved") return "Approved";
    return "";
  };

  return (
    <div className="flex-1 h-screen overflow-scroll flex flex-col justify-between text-sm">
      {loading ? (
        <Loading />
      ) : (
        <div className="md:p-10 p-4 space-y-5">
          <h2 className="text-lg font-medium">Report History</h2>
          <div className="max-w-4xl rounded-md">

            {reports.length > 0 ? (
            reports.map((report, index) => (
              <div
                key={index}
                className="flex flex-col md:flex-row gap-5 justify-between p-5 border-t border-gray-300"
              >
                {/* Reporter Info & Images */}
                <div className="flex-1 flex gap-5 max-w-80">
                  {report.images?.[0]?.url ? (
                    <Image
                      className="max-w-16 max-h-16 object-cover rounded"
                      src={report.images[0].url}
                      alt="report_image"
                      width={64}
                      height={64}
                    />
                  ) : (
                    <Image
                      className="max-w-16 max-h-16"
                      src={assets.box_icon}
                      alt="box_icon"
                      width={64}
                      height={64}
                    />
                  )}
                  <p className="flex flex-col gap-2">
                    <span className="font-medium">{report.jobType}</span>
                    <span className="text-gray-600">{report.description}</span>
                    <span className="text-red-500 text-xs font-semibold">
                      Urgency: {report.urgency}
                    </span>
                    <span>{getBadge(report.status)}</span>
                  </p>
                </div>

                {/* Reporter & Location */}
                <div>
                  <p>
                    <span className="font-medium">{report.reporterName}</span>
                    <br />
                    <span>{report.location}</span>
                    <br />
                    <a
                      href={report.googleLocation}
                      target="_blank"
                      className="text-blue-500 underline"
                    >
                      Google Maps
                    </a>
                  </p>
                </div>

                {/* Sender (Cleaner) Status */}
                <div className="font-medium my-auto">
                  {getSenderStatus(report.status)}
                </div>

                {/* Date */}
                <div>
                  <p className="flex flex-col">
                    <span>
                      Date: {new Date(report.createdAt).toLocaleDateString()}
                    </span>
                    <span>Status: {getSenderStatus(report.status)}</span>
                  </p>
                </div>
              </div>
            ))): (
              <p className="text-gray-500">No reports found.</p>
          
          )}


          </div>
        </div>
      )}
      <Footer />
    </div>
  );
};

export default ReportHistory;
