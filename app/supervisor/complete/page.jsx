"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { assets } from "@/assets/assets";
import Loading from "@/components/Loading";
import Footer from "@/components/supervisor/Footer";

const CompletedReports = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✅ Fetch reports with "Resolved" or "Completed" status
  const fetchReports = async () => {
    try {
      const res = await fetch("/api/report/completed", {
        method: "GET",
        credentials: "include",
      });

      const data = await res.json();

      if (!res.ok) {
        console.error("Failed to fetch completed reports:", data.message);
        return;
      }

      setReports(data.reports || []);
    } catch (error) {
      console.error("Error fetching completed reports:", error);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Initial load and auto-refresh every 10 seconds
  useEffect(() => {
    fetchReports();
    const interval = setInterval(fetchReports, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex-1 h-screen overflow-scroll flex flex-col justify-between text-sm">
      {loading ? (
        <Loading />
      ) : (
        <div className="md:p-10 p-4">
          <h2 className="text-lg font-bold text-emerald-900 mb-6">
            Completed Tasks
          </h2>

          <div className="space-y-4">
            {reports.length > 0 ? (
              reports.map((report) => (
                <div
                  key={report._id}
                  className="p-4 border rounded-lg bg-white shadow-sm flex flex-col md:flex-row justify-between gap-4"
                >
                  {/* Report Info */}
                  <div>
                    <p className="font-semibold text-emerald-900">
                      {report.jobType || "Untitled Task"}
                    </p>
                    <p className="text-sm text-gray-600">
                      Cleaner:{" "}
                      {report.assignedCleaner
                        ? `${report.assignedCleaner.firstName} ${report.assignedCleaner.surname}`
                        : "Unassigned"}
                    </p>
                    <p className="text-sm text-gray-600">
                      Location: {report.location || "Not specified"}
                    </p>
                    <p className="text-sm text-gray-600">
                      Completed On:{" "}
                      {report.updatedAt
                        ? new Date(report.updatedAt).toLocaleDateString("en-GB")
                        : "—"}
                    </p>
                    <p className="text-xs font-semibold mt-1 px-2 py-1 rounded w-fit bg-green-100 text-green-700">
                      {report.status}
                    </p>
                  </div>

                  {/* Proof Image */}
                  <div className="w-full md:w-32 h-24 flex-shrink-0">
                    <Image
                      src={
                        report.images?.[report.images.length - 1]?.url ||
                        assets.upload_area
                      }
                      alt={report.jobType || "Completed task image"}
                      width={128}
                      height={96}
                      className="w-full h-full object-cover rounded-md border"
                    />
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500">No completed tasks found.</p>
            )}
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default CompletedReports;
