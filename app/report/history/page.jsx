"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { assets } from "@/assets/assets";
import { useAppContext } from "@/context/AppContext";
import Loading from "@/components/Loading";
import Footer from "@/components/report/Footer";

const ReportHistory = () => {
  const { router } = useAppContext();

  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchReports = async () => {
    // Dummy reports data
    const dummyReports = [
      {
        _id: 1,
        reporter: "John Doe",
        jobType: "Office Cleaning",
        location: "Kaduna",
        gmap: "https://maps.google.com/example",
        description: "Office desk and floor cleaning request",
        image: [assets.upload_area, assets.upload_area],
        status: "pending", // pending | resolved
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
    setReports(dummyReports);
    setLoading(false);
  };

  useEffect(() => {
    fetchReports();
  }, []);

  // Badge for Supervisor side
  const getBadge = (status) => {
    if (status === "pending") {
      return (
        <span className="px-2 py-1 rounded text-xs bg-yellow-200 text-yellow-800">
          Pending (Waiting for Approval)
        </span>
      );
    }
    if (status === "resolved") {
      return (
        <span className="px-2 py-1 rounded text-xs bg-green-200 text-green-800">
          Approved
        </span>
      );
    }
  };

  // Cleaner (sender) side view
  const getSenderStatus = (status) => {
    if (status === "pending") return "Waiting";   // changed from Received → Waiting
    if (status === "resolved") return "Approved"; // changed from Completed → Approved
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
            {reports.map((report, index) => (
              <div
                key={index}
                className="flex flex-col md:flex-row gap-5 justify-between p-5 border-t border-gray-300"
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
                    <span>{getBadge(report.status)}</span>
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

                {/* Sender (Cleaner) Status */}
                <div className="font-medium my-auto">
                  {getSenderStatus(report.status)}
                </div>

                {/* Date */}
                <div>
                  <p className="flex flex-col">
                    <span>
                      Date: {new Date(report.date).toLocaleDateString()}
                    </span>
                    <span>Sender: {getSenderStatus(report.status)}</span>
                  </p>
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

export default ReportHistory;
