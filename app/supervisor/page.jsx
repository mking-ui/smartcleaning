"use client";
import React from "react";
import Link from "next/link";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";

const SupervisorDashboard = () => {
  // ✅ Mock stats
  const reportSummary = [
    { name: "Pending", value: 8, color: "#facc15" },
    { name: "In-progress", value: 5, color: "#3b82f6" },
    { name: "Completed", value: 12, color: "#16a34a" },
  ];

  const weeklyJobs = [
    { day: "Mon", jobs: 4 },
    { day: "Tue", jobs: 2 },
    { day: "Wed", jobs: 6 },
    { day: "Thu", jobs: 3 },
    { day: "Fri", jobs: 5 },
    { day: "Sat", jobs: 7 },
    { day: "Sun", jobs: 1 },
  ];

  return (
    <div className="p-4 sm:p-6 space-y-8 w-full">
      <h2 className="text-lg sm:text-xl font-bold text-emerald-900">
        Supervisor Dashboard
      </h2>

      {/* Report Summary - 3 cards across full width */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
        {reportSummary.map((item) => (
          <div
            key={item.name}
            className="col-span-4 p-4 sm:p-5 bg-white rounded-xl shadow-sm border flex flex-col items-center sm:items-start"
          >
            <p className="text-gray-500 text-sm sm:text-base font-medium">
              {item.name}
            </p>
            <p className="text-2xl sm:text-3xl font-bold text-emerald-800">
              {item.value}
            </p>
          </div>
        ))}
      </div>

      {/* Charts - split 6/6 */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        <div className="col-span-6 bg-white p-4 sm:p-6 rounded-xl shadow-sm border">
          <h3 className="text-base sm:text-lg font-semibold mb-4">
            Reports Status
          </h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={reportSummary}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={80}
                label={({ name, value }) => `${name}: ${value}`}
              >
                {reportSummary.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="col-span-6 bg-white p-4 sm:p-6 rounded-xl shadow-sm border">
          <h3 className="text-base sm:text-lg font-semibold mb-4">
            Jobs This Week
          </h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={weeklyJobs}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="jobs" fill="#16a34a" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Link to Manage Reports */}
      <div className="flex justify-end">
        <Link
          href="/supervisor/reports"
          className="px-4 py-2 bg-emerald-600 text-white rounded hover:bg-emerald-700"
        >
          Manage Reports
        </Link>
      </div>
    </div>
  );
};

export default SupervisorDashboard;
