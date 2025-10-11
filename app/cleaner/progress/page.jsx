"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { assets } from "@/assets/assets";
import Footer from "@/components/supervisor/Footer";
import Loading from "@/components/Loading";

const CleanerProgress = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedReport, setSelectedReport] = useState(null);
  const [proofImage, setProofImage] = useState(null); // for preview
  const [proofImageFile, setProofImageFile] = useState(null); // actual file
  const [isSubmiting, setIsSubmiting] = useState(false);

  // ✅ Fetch reports assigned to this cleaner (In-progress only)
  const fetchReports = async () => {

    try {
      const email = localStorage.getItem("email");

      if (!email) {
        alert("Cleaner email not found. Please log in again.");
        setLoading(false);
        return;
      }

      const res = await fetch(`/api/in-progress?email=${email}`, {
        method: "GET",
        credentials: "include",
      });

      const data = await res.json();

      if (!res.ok) {
        console.error("Failed to fetch reports:", data.message);
        alert(data.message || "Failed to load reports.");
        return;
      }

      setReports(data.reports || []);
    } catch (error) {
      console.error("Error fetching in-progress reports:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReports();
  }, []);

  // ✅ Handle proof upload and mark as completed
  const handleStatusUpdate = async (id) => {
    setIsSubmiting(true);
    try {
      if (!proofImage) return alert("Please upload a proof image.");

      const formData = new FormData();
      formData.append("id", id);
      formData.append("proofImage", proofImageFile); // keep the file object, not just URL

      const res = await fetch("/api/update-status", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (data.success) {
        alert("Task marked as completed!");
        setReports((prev) =>
          prev.map((r) =>
            r._id === id
              ? { ...r, status: "Resolved", proofImage: data.report.proofImage }
              : r
          )
        );
        setSelectedReport(null);
        setProofImage(null);
      } else {
        alert(data.message || "Failed to update task");
      }
    } catch (error) {
      console.error("Error updating status:", error);
      alert("Something went wrong.");
    }
    setIsSubmiting(false)
  };


  return (
    <div className="flex-1 h-screen overflow-scroll flex flex-col justify-between text-sm">
      {loading ? (
        <Loading />
      ) : (
        <div className="md:p-10 p-4">
          <h2 className="text-lg font-bold text-emerald-900 mb-6">
            Assigned Tasks (In Progress)
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
                      {report.jobType || "Untitled Task"}
                    </p>
                    <p className="text-sm text-gray-600">
                      Location: {report.location || "Not specified"}
                    </p>
                    <p className="text-sm text-gray-600">
                      Deadline:{" "}
                      {report.deadline
                        ? new Date(report.deadline).toLocaleDateString("en-GB")
                        : "No deadline"}
                    </p>
                    <p
                      className={`text-xs font-semibold mt-1 px-2 py-1 rounded w-fit ${report.status === "In Progress"
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
                      src={report.images?.[0]?.url || assets.upload_area}
                      alt={report.jobType || "Task image"}
                      width={128}
                      height={96}
                      className="w-full h-24 object-cover rounded-md border"
                    />
                    {report.status === "In Progress" && (
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

            <h2 className="text-lg font-bold mb-3 text-emerald-800">
              Update Task: {selectedReport.jobType}
            </h2>
            <p className="mb-4 text-sm text-emerald-800">
              Upload or snap an image as proof of completion.
            </p>

            <input
              type="file"
              accept="image/*"
              capture="environment"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  setProofImage(URL.createObjectURL(file)); // preview
                  setProofImageFile(file);                  // upload
                }
              }}
              className="mb-3"
            />

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
              onClick={() => handleStatusUpdate(selectedReport._id)}
              disabled={!proofImage || isSubmiting}
              className={`w-full py-2 rounded ${proofImage
                  ? "bg-yellow-400 text-emerald-800 hover:bg-emerald-800/70"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
                }`}
          
            >
             { isSubmiting? "Please wait ...":"Submit Proof & Complete Task"}
            </button>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default CleanerProgress;
