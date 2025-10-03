"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { assets } from "@/assets/assets";
import { useAppContext } from "@/context/AppContext";
import Footer from "@/components/supervisor/Footer";
import Loading from "@/components/Loading";

const PendingReports = () => {
  const { router } = useAppContext();

  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedReport, setSelectedReport] = useState(null); // For modal

  const fetchReports = async () => {
    // Dummy reports
    const dummyReports = [
      {
        _id: 1,
        reporter: "John Doe",
        jobType: "Office Cleaning",
        location: "Kaduna",
        gmap: "https://maps.google.com/example",
        description: "Office desk and floor cleaning request",
        image: [assets.upload_area, assets.upload_area],
        status: "pending",
        date: new Date(),
      },
      {
        _id: 2,
        reporter: "Mary Jane",
        jobType: "Home Cleaning",
        location: "Zaria",
        gmap: "https://maps.google.com/example2",
        description: "Kitchen cleaning and waste disposal",
        image: [assets.upload_area],
        status: "resolved",
        date: new Date(),
      },
    ];

    setReports(dummyReports.filter((r) => r.status === "pending"));
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
        <div className="md:p-10 p-4 space-y-5">
          <h2 className="text-lg font-medium">Pending Reports</h2>
          <div className="max-w-4xl rounded-md">
            {reports.length > 0 ? (
              reports.map((report, index) => (
                <div
                  key={index}
                  className="flex flex-col md:flex-row gap-5 justify-between p-5 border-t border-gray-300 bg-yellow-50"
                >
                  {/* Reporter Info & Images */}
                  <div className="flex-1 flex gap-5 max-w-80">
                    {report.image[0] ? (
                      <Image
                        className="max-w-16 max-h-16 object-cover rounded"
                        src={report.image[0]}
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
                      <span className="px-2 py-1 rounded text-xs bg-yellow-200 text-yellow-800 w-fit">
                        Pending
                      </span>
                    </p>
                  </div>

                  {/* Reporter & Location */}
                  <div>
                    <p>
                      <span className="font-medium">{report.reporter}</span>
                      <br />
                      <span>{report.location}</span>
                      <br />
                      <a
                        href={report.gmap}
                        target="_blank"
                        className="text-blue-500 underline"
                      >
                        Google Maps
                      </a>
                    </p>
                  </div>

                  {/* Status */}
                  <div className="font-medium my-auto text-yellow-700">
                    Awaiting Assignment
                  </div>

                  {/* Date & View */}
                  <div className="flex flex-col items-start gap-2">
                    <span>
                      Date: {new Date(report.date).toLocaleDateString()}
                    </span>
                    <button
                      onClick={() => setSelectedReport(report)}
                      className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700"
                    >
                      View
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500">No pending reports found.</p>
            )}
          </div>
        </div>
      )}

      {/* Modal */}
      {selectedReport && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/60 z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-2xl w-full relative">
            <button
              onClick={() => setSelectedReport(null)}
              className="absolute top-2 right-2 text-gray-500 hover:text-black"
            >
              ✕
            </button>

            <h2 className="text-lg font-bold mb-3">{selectedReport.jobType}</h2>
            <p className="mb-2">{selectedReport.description}</p>
            <p className="mb-2">
              <strong>Reporter:</strong> {selectedReport.reporter}
            </p>
            <p className="mb-2">
              <strong>Location:</strong> {selectedReport.location}
            </p>
            <a
              href={selectedReport.gmap}
              target="_blank"
              className="text-blue-600 underline mb-3 block"
            >
              View on Google Maps
            </a>

            {/* Images */}
            <div className="grid grid-cols-2 gap-3 mb-4">
              {selectedReport.image.map((img, idx) => (
                <Image
                  key={idx}
                  src={img}
                  alt={`report_img_${idx}`}
                  width={200}
                  height={200}
                  className="rounded object-cover"
                />
              ))}
            </div>

            {/* Approve button */}
            <button
              onClick={() => router.push("/supervisor/approved")}
              className="w-full py-2 bg-green-600 text-white rounded hover:bg-green-700"
            >
              Approve
            </button>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default PendingReports;
