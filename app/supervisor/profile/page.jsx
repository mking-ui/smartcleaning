"use client";
import React from "react";
import Image from "next/image";
import { assets } from "@/assets/assets";

const SupervisorProfile = ({ user }) => {
  return (
    <div className="flex-1 min-h-screen bg-slate-100 p-6 md:p-10">
      <div className="bg-white shadow-xl max-w-md mx-auto rounded-lg overflow-hidden">
        {/* Profile Picture */}
        <div className="flex flex-col items-center p-6 bg-emerald-900 text-white">
          <Image
            src={user?.profilePic || assets.upload_area}
            alt="Supervisor"
            width={100}
            height={100}
            className="w-24 h-24 rounded-full object-cover border-4 border-yellow-400"
          />
          <h2 className="mt-3 text-xl font-bold">{user?.fullName}</h2>
          <p className="text-yellow-300 text-sm">Supervisor</p>
        </div>

        {/* Info */}
        <div className="p-6 space-y-4">
          <div className="border-b pb-2">
            <p className="text-gray-600 text-sm">Username</p>
            <p className="font-semibold">{user?.username}</p>
          </div>
          <div className="border-b pb-2">
            <p className="text-gray-600 text-sm">Email</p>
            <p className="font-semibold">{user?.email}</p>
          </div>
          <div className="border-b pb-2">
            <p className="text-gray-600 text-sm">Phone</p>
            <p className="font-semibold">{user?.phone}</p>
          </div>
        </div>

        {/* Footer Action (Optional) */}
        <div className="p-4 bg-gray-50 text-center">
          <button className="bg-yellow-400 text-emerald-900 px-6 py-2 rounded font-semibold hover:opacity-90 transition">
            Manage Reports
          </button>
        </div>
      </div>
    </div>
  );
};

export default SupervisorProfile;
