"use client";
import React, { useState } from "react";
import Image from "next/image";
import { assets } from "@/assets/assets";

const UpdateProfileForm = ({ user }) => {
  const [fullName, setFullName] = useState(user?.fullName || "");
  const [email, setEmail] = useState(user?.email || "");
  const [phone, setPhone] = useState(user?.phone || "");
  const [username, setUsername] = useState(user?.username || "");
  const [profilePic, setProfilePic] = useState(null);

  // password fields
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showConfirm, setShowConfirm] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newPassword && newPassword !== confirmPassword) {
      alert("New password and confirm password do not match.");
      return;
    }
    setShowConfirm(true);
  };

  const handleConfirm = () => {
    setShowConfirm(false);
    console.log({
      fullName,
      email,
      phone,
      username,
      profilePic,
      currentPassword,
      newPassword,
    });
  };

  return (
    <div className="flex-1 min-h-screen bg-slate-100 p-6 md:p-10">
      <div className="bg-white  shadow-xl max-w-3xl mx-auto p-6">
        <h2 className="text-2xl font-bold text-emerald-900 mb-6 text-center">
          Update Profile
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Profile Picture */}
          <div className="flex flex-col items-center">
            <label htmlFor="profile-pic" className="cursor-pointer">
              <input
                type="file"
                id="profile-pic"
                hidden
                accept="image/*"
                onChange={(e) => setProfilePic(e.target.files[0])}
              />
              <Image
                src={
                  profilePic
                    ? URL.createObjectURL(profilePic)
                    : assets.upload_area
                }
                alt="Profile Picture"
                width={100}
                height={100}
                className="w-24 h-24 object-cover rounded-full border"
              />
            </label>
            <p className="text-sm text-gray-500 mt-2">Click to upload</p>
          </div>

          {/* Full Name */}
          <div>
            <label className="font-medium">Full Name</label>
            <input
              type="text"
              className="w-full border rounded px-3 py-2"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
            />
          </div>

          {/* Email */}
          <div>
            <label className="font-medium">Email</label>
            <input
              type="email"
              className="w-full border rounded px-3 py-2"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Phone */}
          <div>
            <label className="font-medium">Phone</label>
            <input
              type="tel"
              className="w-full border rounded px-3 py-2"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </div>

          {/* Username */}
          <div>
            <label className="font-medium">Username</label>
            <input
              type="text"
              className="w-full border rounded px-3 py-2"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          {/* Password Update */}
          <div className="border-t pt-4 mt-4">
            <h3 className="font-semibold text-emerald-900 mb-2">
              Change Password
            </h3>
            <div className="space-y-3">
              <input
                type="password"
                placeholder="Current Password"
                className="w-full border rounded px-3 py-2"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
              />
              <input
                type="password"
                placeholder="New Password"
                className="w-full border rounded px-3 py-2"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
              <input
                type="password"
                placeholder="Confirm New Password"
                className="w-full border rounded px-3 py-2"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-yellow-400 text-emerald-900 font-semibold py-2 rounded hover:opacity-90 transition"
          >
            Save Changes
          </button>
        </form>
      </div>

      {/* Confirmation Modal */}
      {showConfirm && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/70 z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full text-center my-8 mx-6">
            <h3 className="text-lg font-bold mb-4 text-emerald-900">
              Confirm Update
            </h3>
            <p className="mb-6">Are you sure you want to save changes?</p>
            <div className="flex justify-center gap-4">
              <button
                onClick={handleConfirm}
                className="px-6 py-2 bg-yellow-400 text-emerald-900 rounded font-semibold"
              >
                Yes, Save
              </button>
              <button
                onClick={() => setShowConfirm(false)}
                className="px-6 py-2 border border-gray-400 rounded"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UpdateProfileForm;
