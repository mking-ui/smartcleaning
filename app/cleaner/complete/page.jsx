"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { assets } from "@/assets/assets";
import Loading from "@/components/Loading";
import Footer from "@/components/cleaner/Footer";

const CleanerCompleted = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchReports = async () => {
    // Dummy completed reports
    const dummyReports = [
      {
        id: 1,
        title: "Office Cleaning",
        assignedCleaner: "Ali Musa",
        completedOn: "2025-10-02",
        status: "Completed",
        image: assets.upload_area,
      },
      {
        id: 2,
        title: "Home Cleaning",
        assignedCleaner: "Fatima Bello",
        completedOn: "2025-09-28",
        status: "Completed",
        image: assets.upload_area,
      },
    ];

    setReports(dummyReports);
    setLoading(false);
  };

  useEffect(() => {
    fetchReports();
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
                  key={report.id}
                  className="p-4 border rounded-lg bg-white shadow-sm flex flex-col md:flex-row justify-between gap-4"
                >
                  {/* Task Details */}
                  <div>
                    <p className="font-semibold text-emerald-900">{report.title}</p>
                    <p className="text-sm text-gray-600">
                      Cleaner: {report.assignedCleaner}
                    </p>
                    <p className="text-sm text-gray-600">
                      Completed On: {report.completedOn}
                    </p>
                    <p
                      className={`text-xs font-semibold mt-1 px-2 py-1 rounded w-fit ${
                        report.status === "Completed"
                          ? "bg-green-100 text-green-700"
                          : "bg-blue-100 text-blue-700"
                      }`}
                    >
                      {report.status}
                    </p>
                  </div>

                  {/* Task Image */}
                  <div className="flex flex-col items-center gap-2 w-full md:w-40">
                    <Image
                      src={report.image}
                      alt={report.title}
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
