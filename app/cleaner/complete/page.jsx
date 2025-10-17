"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { assets } from "@/assets/assets";
import Loading from "@/components/Loading";
import Footer from "@/components/cleaner/Footer";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const CleanerCompleted = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);

  const fallbackImage = "/placeholder.png"; // ✅ fallback image

  // ✅ Fetch completed reports for the logged-in cleaner
  const fetchReports = async (email) => {
    try {
      const res = await fetch(`/api/cleaner/completed?email=${email}`, {
        method: "GET",
        credentials: "include",
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to fetch reports");
      setReports(data.reports || []);
    } catch (error) {
      console.error("Error fetching completed reports:", error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (status === "authenticated" && session?.user?.email) {
      fetchReports(session.user.email);
    } else if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, session]);

  // ✅ Date formatter
  const formatDateTime = (dateString) => {
    if (!dateString) return "Unknown";
    const date = new Date(dateString);
    return date.toLocaleString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    });
  };

  const safeImage = (url) => {
    if (url && typeof url === "string" && url.trim() !== "") return url;
    if (typeof assets.upload_area === "string") return assets.upload_area;
    return fallbackImage;
  };

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
              reports.map((report) => {
                const initialImage = safeImage(report.images?.[0]?.url);
                const proofImage = safeImage(
                  report.images?.[report.images.length - 1]?.url
                );

                return (
                  <div
                    key={report._id}
                    className="p-4 border rounded-lg bg-white shadow-sm flex flex-col md:flex-row justify-between gap-4"
                  >
                    {/* 🧾 Left: Task Info */}
                    <div className="flex-1">
                      <p className="font-semibold text-emerald-900">
                        {report.jobType || "Unnamed Task"}
                      </p>
                      <p className="text-sm text-gray-600">
                        Location: {report.location || "Not specified"}
                      </p>
                      <p className="text-sm text-gray-600">
                        Assigned On:{" "}
                        {report.createdAt
                          ? formatDateTime(report.createdAt)
                          : "Unknown"}
                      </p>
                      <p className="text-sm text-gray-600">
                          Completed On:{" "}
                        {report?.updatedAt
                          ? formatDateTime(new Date(report.updatedAt))
                          : report?.proofImage?.url
                            ? "Awaiting timestamp..."
                            : "Not completed yet"}
                      </p>
                      <p className="text-xs font-semibold mt-1 px-2 py-1 rounded w-fit bg-green-100 text-green-700">
                        Completed
                      </p>
                    </div>

                    {/* 🖼️ Right: Two Images (side-by-side) */}
                    <div className="flex flex-col md:flex-row items-center gap-3 md:w-80">
                      {/* Task Image */}
                      <div className="flex flex-col items-center">
                        <p className="text-xs text-gray-500 font-semibold mb-1">
                          Task Image
                        </p>
                        <Image
                          src={initialImage}
                          alt="Initial task image"
                          width={150}
                          height={100}
                          className="w-32 h-28 object-cover rounded-md border cursor-pointer hover:opacity-80"
                          onClick={() => setSelectedImage(initialImage)}
                        />
                      </div>

                      {/* Proof Image */}
                      <div className="flex flex-col items-center">
                        <p className="text-xs text-gray-500 font-semibold mb-1">
                          Proof Image
                        </p>
                        <Image
                          src={proofImage}
                          alt="Proof of completion"
                          width={150}
                          height={100}
                          className="w-32 h-28 object-cover rounded-md border cursor-pointer hover:opacity-80"
                          onClick={() => setSelectedImage(proofImage)}
                        />
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <p className="text-gray-500">No completed tasks yet.</p>
            )}
          </div>
        </div>
      )}

      <Footer />

      {/* 🖼️ Image Modal */}
      {selectedImage && (
        <div
          onClick={() => setSelectedImage(null)}
          className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 cursor-pointer"
        >
          <Image
            src={selectedImage}
            alt="Full-size preview"
            width={700}
            height={500}
            className="max-w-[90%] max-h-[85%] object-contain rounded-lg shadow-lg"
          />
        </div>
      )}
    </div>
  );
};

export default CleanerCompleted;
