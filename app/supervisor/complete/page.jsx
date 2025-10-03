"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { assets } from "@/assets/assets";
import Loading from "@/components/Loading";
import Footer from "@/components/supervisor/Footer";

const ProgressReports = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchReports = async () => {
    // Dummy assigned reports
    const dummyReports = [
      
      {
        id: 1,
        title: "Home Cleaning",
        assignedCleaner: "Fatima Bello",
        deadline: "2025-10-12",
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
            Completed Task
          </h2>

          <div className="space-y-4">
            {reports
              .filter((r) => r.status !== "Pending") // Exclude pending
              .map((report) => (
                <div
                  key={report.id}
                  className="p-4 border rounded-lg bg-white shadow-sm flex flex-col md:flex-row justify-between gap-4"
                >
                  {/* Report Info */}
                  <div>
                    <p className="font-semibold text-emerald-900">
                      {report.title}
                    </p>
                    <p className="text-sm text-gray-600">
                      Cleaner: {report.assignedCleaner}
                    </p>
                    <p className="text-sm text-gray-600">
                      Deadline: {report.deadline}
                    </p>
                    <p
                      className={`text-xs font-semibold mt-1 px-2 py-1 rounded w-fit ${
                        report.status === "In-progress"
                          ? "bg-blue-100 text-blue-700"
                          : "bg-green-100 text-green-700"
                      }`}
                    >
                      {report.status}
                    </p>
                  </div>

                  {/* Report Image */}
                  <div className="w-full md:w-32 h-24 flex-shrink-0">
                    <Image
                      src={report.image}
                      alt={report.title}
                      width={128}
                      height={96}
                      className="w-full h-full object-cover rounded-md border"
                    />
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default ProgressReports;
