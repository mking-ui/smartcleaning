"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { assets } from "@/assets/assets";
import Loading from "@/components/Loading";
import Footer from "@/components/cleaner/Footer";

const CleanerCompleted = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cleanerId, setCleanerId] = useState(null);

  // ✅ Load cleanerId from localStorage
  useEffect(() => {
    const storedId = localStorage.getItem("userId");
    if (storedId) {
      setCleanerId(storedId);
    } else {
      console.warn("Cleaner ID not found in localStorage");
      setLoading(false);
    }
  }, []);

  // ✅ Fetch completed reports
  const fetchReports = async (id) => {
    try {
      const res = await fetch(`/api/cleaner/completed?cleanerId=${id}`, {
        method: "GET",
        credentials: "include",
      });
      const data = await res.json();

      if (!res.ok) throw new Error(data.message);
      setReports(data.reports || []);
    } catch (error) {
      console.error("Failed to fetch completed reports:", error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (cleanerId) fetchReports(cleanerId);
  }, [cleanerId]);

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
                  {/* Task Details */}
                  <div>
                    <p className="font-semibold text-emerald-900">
                      {report.jobType || "Unnamed Task"}
                    </p>
                    <p className="text-sm text-gray-600">
                      Location: {report.location || "Not specified"}
                    </p>
                    <p className="text-sm text-gray-600">
                      Completed On:{" "}
                      {report.updatedAt
                        ? new Date(report.updatedAt).toLocaleDateString("en-GB")
                        : "Unknown"}
                    </p>
                    <p className="text-xs font-semibold mt-1 px-2 py-1 rounded w-fit bg-green-100 text-green-700">
                      Completed
                    </p>
                  </div>

                  {/* Proof Image */}
                  <div className="flex flex-col items-center gap-2 w-full md:w-40">
                    <Image
                      src={
                        report.proofImage?.url ||
                        report.images?.[0]?.url ||
                        assets.upload_area
                      }
                      alt={report.jobType || "Task image"}
                      width={128}
                      height={96}
                      className="w-full h-24 object-cover rounded-md border"
                    />
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500">No completed tasks yet.</p>
            )}
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
};

export default CleanerCompleted;
