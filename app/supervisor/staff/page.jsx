"use client";
import React, { useEffect, useState } from "react";
import Footer from "@/components/supervisor/Footer";
import Loading from "@/components/Loading";

const StaffReporterList = () => {
  const [staff, setStaff] = useState([]);
  const [reporters, setReporters] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Dummy staff (cleaners)
    const dummyStaff = [
      { id: 1, name: "Ali Musa", email: "ali@example.com", phone: "08012345678", role: "Cleaner" },
      { id: 2, name: "Fatima Bello", email: "fatima@example.com", phone: "08087654321", role: "Cleaner" },
      { id: 3, name: "Sani Ibrahim", email: "sani@example.com", phone: "08099887766", role: "Cleaner" },
    ];

    // Dummy reporters
    const dummyReporters = [
      { id: 1, name: "John Doe", email: "john@example.com", phone: "08123456789" },
      { id: 2, name: "Mary Jane", email: "mary@example.com", phone: "08111222333" },
      { id: 3, name: "Grace John", email: "grace@example.com", phone: "08144556677" },
    ];

    setStaff(dummyStaff);
    setReporters(dummyReporters);
    setLoading(false);
  }, []);

  return (
    <div className="flex-1 h-screen overflow-scroll flex flex-col justify-between text-sm">
      {loading ? (
        <Loading />
      ) : (
        <div className="md:p-10 p-4 space-y-10">
          {/* Staff Table */}
          <div>
            <h2 className="text-lg font-medium mb-3">Cleaner List</h2>
            <div className="overflow-x-auto">
              <table className="w-full border text-left text-sm">
                <thead className="bg-gray-200 text-gray-700">
                  <tr>
                    <th className="p-2 border">Name</th>
                    <th className="p-2 border">Email</th>
                    <th className="p-2 border">Phone</th>
                    <th className="p-2 border">Role</th>
                  </tr>
                </thead>
                <tbody>
                  {staff.map((s) => (
                    <tr key={s.id} className="border-b hover:bg-gray-50">
                      <td className="p-2 border">{s.name}</td>
                      <td className="p-2 border">{s.email}</td>
                      <td className="p-2 border">{s.phone}</td>
                      <td className="p-2 border">{s.role}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Reporter Table */}
          <div>
            <h2 className="text-lg font-medium mb-3">Reporter List</h2>
            <div className="overflow-x-auto">
              <table className="w-full border text-left text-sm">
                <thead className="bg-gray-200 text-gray-700">
                  <tr>
                    <th className="p-2 border">Name</th>
                    <th className="p-2 border">Email</th>
                    <th className="p-2 border">Phone</th>
                  </tr>
                </thead>
                <tbody>
                  {reporters.map((r) => (
                    <tr key={r.id} className="border-b hover:bg-gray-50">
                      <td className="p-2 border">{r.name}</td>
                      <td className="p-2 border">{r.email}</td>
                      <td className="p-2 border">{r.phone}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
};

export default StaffReporterList;
