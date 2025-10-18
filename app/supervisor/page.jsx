"use client";
import React, { useEffect, useState } from "react";
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
import Loading from "@/components/Loading";

const SupervisorDashboard = () => {
  const [reportSummary, setReportSummary] = useState([]);
  const [weeklyJobs, setWeeklyJobs] = useState([]);
  const [loading, setLoading] = useState(true);



  const fetchDashboardData = async () => {
    try {
      setLoading(true);

      const [pendingRes, inProgressRes, completedRes] = await Promise.all([
        fetch("/api/report/pending"),
        fetch("/api/report/in-progress"),
        fetch("/api/report/completed"),
      ]);

      if (!pendingRes.ok || !inProgressRes.ok || !completedRes.ok) {
        console.warn("Some data failed to load");
        return;
      }

      const pendingData = await pendingRes.json();
      const inProgressData = await inProgressRes.json();
      const completedData = await completedRes.json();

      const summary = [
        { name: "Pending", value: pendingData.reports?.length || 0, color: "#facc15" },
        { name: "In Progress", value: inProgressData.reports?.length || 0, color: "#3b82f6" },
        { name: "Completed", value: completedData.reports?.length || 0, color: "#16a34a" },
      ];

      const allReports = [
        ...(pendingData.reports || []),
        ...(inProgressData.reports || []),
        ...(completedData.reports || []),
      ];

      const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
      const weeklyCount = days.map((day) => ({
        day,
        jobs: allReports.filter((r) => new Date(r.createdAt).getDay() === days.indexOf(day)).length,
      }));

      setReportSummary(summary);
      setWeeklyJobs(weeklyCount);
    } catch (err) {
      console.warn("Error fetching dashboard data:", err.message);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Only fetch data when the user is authenticated AND role is supervisor
  useEffect(() => {

    fetchDashboardData();
    const interval = setInterval(fetchDashboardData, 90000);
    return () => clearInterval(interval);

  }, [fetchDashboardData]);

  // ✅ Conditional Rendering



  return (
    <div className="p-4 sm:p-6 space-y-8 w-full">
      <h2 className="text-lg sm:text-xl font-bold text-emerald-900">
        Supervisor Dashboard
      </h2>
      {loading ? (
        <Loading />
      ) : (
        <><><div className="grid grid-cols-1 md:grid-cols-12 gap-4">
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
            /* ✅ Charts Section */
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
              {/* Pie Chart */}
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

              {/* Bar Chart */}
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
            </div></>
            /* ✅ Manage Reports Link */
            <div className="flex justify-end">
              <Link
                href="/supervisor/reports"
                className="px-4 py-2 bg-emerald-600 text-white rounded hover:bg-emerald-700"
              >
                Manage Reports
              </Link>
            </div></>
)}


    </div>
  );
};

export default SupervisorDashboard;
