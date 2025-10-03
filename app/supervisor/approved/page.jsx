"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { assets } from "@/assets/assets";
import { useAppContext } from "@/context/AppContext";
import Footer from "@/components/supervisor/Footer";
import Loading from "@/components/Loading";

const ApprovedList = () => {
  const { router } = useAppContext();

  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchReports = async () => {
    // Dummy reports data (no cleaner info on reporter side)
    const dummyReports = [
      {
        _id: 1,
        reporter: "John Doe",
        jobType: "Office Cleaning",
        location: "Kaduna",
        gmap: "https://maps.google.com/example",
        description: "Office desk and floor cleaning request",
        image: [assets.upload_area],
        status: "approved",
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
        status: "approved",
        date: new Date(),
      },
      {
        _id: 3,
        reporter: "Grace John",
        jobType: "Event Center Cleaning",
        location: "Barnawa",
        gmap: "https://maps.google.com/example3",
        description: "Post-event hall cleaning and sanitation",
        image: [assets.upload_area],
        status: "approved",
        date: new Date(),
      },
    ];

    // Only approved reports
    setReports(dummyReports.filter((r) => r.status === "approved"));
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
          <h2 className="text-lg font-medium">Approved Reports</h2>
          <div className="max-w-4xl rounded-md">
            {reports.length > 0 ? (
              reports.map((report, index) => (
                <div
                  key={index}
                  className="flex flex-col md:flex-row gap-5 justify-between p-5 border-t border-gray-300 bg-green-50"
                >
                  {/* Report Image + Info */}
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
                    <div className="flex flex-col gap-2">
                      <span className="font-medium">{report.jobType}</span>
                      <span className="text-gray-600">{report.description}</span>
                      <span className="px-2 py-1 rounded text-xs bg-green-200 text-green-800 w-fit">
                        Approved
                      </span>
                    </div>
                  </div>

                  {/* Reporter Info */}
                  <div>
                    <p>
                      <span className="font-medium">Reporter:</span>{" "}
                      {report.reporter}
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

                  {/* Date */}
                  <div>
                    <p className="flex flex-col">
                      <span>
                        Date: {new Date(report.date).toLocaleDateString()}
                      </span>
                      <span>Status: Approved</span>
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500">No approved reports found.</p>
            )}
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
};

export default ApprovedList;
