"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { assets } from "@/assets/assets";
import Footer from "@/components/supervisor/Footer"; // or CleanerFooter
import Loading from "@/components/Loading";

const CleanerProgress = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedReport, setSelectedReport] = useState(null);
  const [proofImage, setProofImage] = useState(null);

  const fetchReports = async () => {
    // Dummy accepted reports (In-progress)
    const dummyReports = [
      {
        id: 1,
        title: "Office Cleaning",
        assignedCleaner: "Ali Musa",
        deadline: "2025-10-10",
        status: "In-progress",
        image: assets.upload_area,
      },
      {
        id: 2,
        title: "Home Cleaning",
        assignedCleaner: "Fatima Bello",
        deadline: "2025-10-12",
        status: "In-progress",
        image: assets.upload_area,
      },
    ];

    setReports(dummyReports);
    setLoading(false);
  };

  useEffect(() => {
    fetchReports();
  }, []);

  // ✅ Handle status update
  const handleStatusUpdate = (id) => {
    setReports((prev) =>
      prev.map((r) =>
        r.id === id ? { ...r, status: "Completed", proof: proofImage } : r
      )
    );
    alert("Task marked as Completed with proof submitted!");
    setSelectedReport(null);
    setProofImage(null);
  };

  return (
    <div className="flex-1 h-screen overflow-scroll flex flex-col justify-between text-sm">
      {loading ? (
        <Loading />
      ) : (
        <div className="md:p-10 p-4">
          <h2 className="text-lg font-bold text-emerald-900 mb-6">
            Assigned Tasks (In-progress)
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

                  {/* Task Image + Update Button */}
                  <div className="flex flex-col items-center gap-2 w-full md:w-40">
                    <Image
                      src={report.image}
                      alt={report.title}
                      width={128}
                      height={96}
                      className="w-full h-24 object-cover rounded-md border"
                    />
                    {report.status === "In-progress" && (
                      <button
                        onClick={() => setSelectedReport(report)}
                        className="w-full py-1.5 text-sm bg-green-600 text-white rounded hover:bg-green-700"
                      >
                        Update Status
                      </button>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500">No tasks in progress.</p>
            )}
          </div>
        </div>
      )}

      {/* ✅ Modal for proof upload */}
      {selectedReport && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-lg w-full relative">
            <button
              onClick={() => setSelectedReport(null)}
              className="absolute top-2 right-2 text-gray-500 hover:text-black"
            >
              ✕
            </button>

            <h2 className="text-lg font-bold mb-3  text-emerald-800">
              Update Task: {selectedReport.title}
            </h2>
            <p className="mb-4 text-sm text-emerald-800">
              Upload or snap an image as proof of completion.
            </p>

            {/* Upload proof */}
            <input
              type="file"
              accept="image/*"
              capture="environment"
              onChange={(e) =>
                setProofImage(
                  e.target.files && e.target.files[0]
                    ? URL.createObjectURL(e.target.files[0])
                    : null
                )
              }
              className="mb-3"
            />

            {/* Preview uploaded proof */}
            {proofImage && (
              <Image
                src={proofImage}
                alt="proof"
                width={200}
                height={200}
                className="rounded border mb-3 object-cover"
              />
            )}

            <button
              onClick={() => handleStatusUpdate(selectedReport.id)}
              disabled={!proofImage}
              className={`w-full py-2 rounded ${
                proofImage
                  ? "bg-yellow-400 text-emerald-800 hover:bg-emerald-800/70"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
            >
              Submit Proof & Complete Task
            </button>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default CleanerProgress;
