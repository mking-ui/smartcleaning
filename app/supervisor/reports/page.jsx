"use client";
import { assets } from "@/assets/assets";
import React, { useState } from "react";

const ManageReports = () => {
  const reportsData = [
    {
      id: 1,
      title: "Dirty Hallway",
      location: "Block A",
      reporter: "John Doe",
      status: "Pending",
      assignedCleaner: "",
      deadline: "",
      image: assets.clean,
    },
    {
      id: 2,
      title: "Spilled Water",
      location: "Cafeteria",
      reporter: "Mary Jane",
      status: "Pending",
      assignedCleaner: "",
      deadline: "",
      image: assets.clean,
    },
    {
      id: 3,
      title: "Toilet Water",
      location: "Cafeteria",
      reporter: "Mary Jane",
      status: "Pending",
      assignedCleaner: "",
      deadline: "",
      image: assets.clean,
    },
  ];

  const cleaners = ["Aliyu Musa", "Grace John", "Kefas Bala"];
  const daysOptions = [1, 2, 3, 5, 7];

  const [reports, setReports] = useState(reportsData);
  const [selectedReportId, setSelectedReportId] = useState("");
  const [selectedCleaner, setSelectedCleaner] = useState("");
  const [selectedDays, setSelectedDays] = useState("");

  const handleAssign = () => {
    if (!selectedReportId || !selectedCleaner || !selectedDays) {
      alert("Please select report, cleaner and days.");
      return;
    }

    const deadline = new Date();
    deadline.setDate(deadline.getDate() + parseInt(selectedDays));

    setReports((prev) =>
      prev.map((r) =>
        r.id === parseInt(selectedReportId)
          ? {
              ...r,
              assignedCleaner: selectedCleaner,
              status: "In-progress",
              deadline: deadline.toISOString().split("T")[0],
            }
          : r
      )
    );

    alert("Task successfully assigned!");
    setSelectedReportId("");
    setSelectedCleaner("");
    setSelectedDays("");
  };

  const selectedReport = reports.find(
    (r) => r.id === parseInt(selectedReportId)
  );

  return (
    <div className="min-h-screen w-full bg-gray-50 p-4 sm:p-6">
      <h2 className="text-xl sm:text-2xl font-bold text-emerald-900 mb-6">
        Manage Reports
      </h2>

      {/* Dropdown to select report */}
      <div className="bg-white p-4 rounded-lg shadow-md mb-6">
        <label className="block font-semibold text-gray-700 mb-2">
          Select Report
        </label>
        <select
          value={selectedReportId}
          onChange={(e) => setSelectedReportId(e.target.value)}
          className="w-full border rounded px-3 py-2"
        >
          <option value="">-- Choose Report --</option>
          {reports
            .filter((r) => r.status === "Pending")
            .map((report) => (
              <option key={report.id} value={report.id}>
                {report.title} ({report.location})
              </option>
            ))}
        </select>
      </div>

      {/* Auto-filled Report Details + Image */}
      {selectedReport && (
        <div className="bg-white p-4 rounded-lg shadow-md mb-6 flex flex-col md:flex-row gap-6">
          {/* Left: Details */}
          <div className="flex-1">
            <h3 className="font-bold text-emerald-900 mb-2">Report Details</h3>
            <p>
              <strong>Title:</strong> {selectedReport.title}
            </p>
            <p>
              <strong>Location:</strong> {selectedReport.location}
            </p>
            <p>
              <strong>Reporter:</strong> {selectedReport.reporter}
            </p>
          </div>

          {/* Right: Image */}
          <div className="w-full md:w-48 h-32 flex-shrink-0">
            <img
              src={selectedReport.image}
              alt={selectedReport.title}
              className="w-full h-full object-cover rounded-md border"
            />
          </div>
        </div>
      )}

      {/* Cleaner + Days Selection */}
      {selectedReport && (
        <div className="bg-white p-4 rounded-lg shadow-md space-y-4">
          <div>
            <label className="block font-semibold text-gray-700 mb-2">
              Assign Cleaner
            </label>
            <select
              value={selectedCleaner}
              onChange={(e) => setSelectedCleaner(e.target.value)}
              className="w-full border rounded px-3 py-2"
            >
              <option value="">-- Choose Cleaner --</option>
              {cleaners.map((cleaner, idx) => (
                <option key={idx} value={cleaner}>
                  {cleaner}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block font-semibold text-gray-700 mb-2">
              Select Days
            </label>
            <select
              value={selectedDays}
              onChange={(e) => setSelectedDays(e.target.value)}
              className="w-full border rounded px-3 py-2"
            >
              <option value="">-- Select Days --</option>
              {daysOptions.map((d, idx) => (
                <option key={idx} value={d}>
                  {d} day{d > 1 ? "s" : ""}
                </option>
              ))}
            </select>
          </div>

          <button
            onClick={handleAssign}
            className="w-full bg-yellow-400 text-emerald-900 font-semibold py-2 rounded hover:opacity-90 transition"
          >
            Assign Task
          </button>
        </div>
      )}

      {/* Assigned Reports List */}
      <div className="mt-8">
        <h3 className="text-lg font-bold text-emerald-900 mb-4">
          Assigned Tasks
        </h3>
        <div className="space-y-4">
          {reports
            .filter((r) => r.status !== "Pending")
            .map((report) => (
              <div
                key={report.id}
                className="p-4 border rounded-lg bg-white shadow-sm flex flex-col md:flex-row justify-between gap-4"
              >
                <div>
                  <p className="font-semibold text-emerald-900">{report.title}</p>
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
                <div className="w-full md:w-32 h-24 flex-shrink-0">
                  <img
                    src={report.image}
                    alt={report.title}
                    className="w-full h-full object-cover rounded-md border"
                  />
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default ManageReports;
