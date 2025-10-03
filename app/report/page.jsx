'use client'
import React, { useState } from "react";
import Image from "next/image";
import { assets } from "@/assets/assets";

const ReportCleaningSpace = () => {
  const [files, setFiles] = useState([]);
  const [reporterName, setReporterName] = useState("");
  const [location, setLocation] = useState("");
  const [googleLocation, setGoogleLocation] = useState("");
  const [description, setDescription] = useState("");
  const [urgency, setUrgency] = useState("Normal");
  const [jobType, setJobType] = useState("Spillage");

  const handleSubmit = (e) => {
    e.preventDefault();
    const reportData = {
      reporterName,
      location,
      googleLocation,
      description,
      urgency,
      jobType,
      files,
    };
    console.log("Submitted Report:", reportData);
    alert("Report submitted successfully!");
  };

  return (
    <div className="flex-1 min-h-screen  justify-between  bg-slate-100 text-black">
      <form
        onSubmit={handleSubmit}
        className="md:p-10 p-4 space-y-5 border max-w-3xl my-3 mx-auto w-full bg-white" 
      >
        <h2 className="text-2xl font-bold text-center text-emerald-900">
          Cleaning Space Report Form
        </h2>

        {/* Reporter Name - Full */}
        <div className="flex flex-col gap-1 w-full">
          <label htmlFor="reporterName" className="text-base font-medium">
            Reporter Name
          </label>
          <input
            id="reporterName"
            type="text"
            placeholder="Enter your full name"
            className="outline-none py-2 px-3 rounded border border-gray-400 w-full"
            onChange={(e) => setReporterName(e.target.value)}
            value={reporterName}
            required
          />
        </div>

        {/* Location & Google Location */}
        <div className="flex flex-col sm:flex-row gap-4 w-full">
          <div className="flex flex-col gap-1 w-full sm:w-1/2">
            <label htmlFor="location" className="text-base font-medium">
              Location
            </label>
            <input
              id="location"
              type="text"
              placeholder="E.g. Block A, Room 5"
              className="outline-none py-2 px-3 rounded border border-gray-400 w-full"
              onChange={(e) => setLocation(e.target.value)}
              value={location}
              required
            />
          </div>
          <div className="flex flex-col gap-1 w-full sm:w-1/2">
            <label htmlFor="googleLocation" className="text-base font-medium">
              Google Location
            </label>
            <input
              id="googleLocation"
              type="url"
              placeholder="Paste Google Maps link"
              className="outline-none py-2 px-3 rounded border border-gray-400 w-full"
              onChange={(e) => setGoogleLocation(e.target.value)}
              value={googleLocation}
            />
          </div>
        </div>

        {/* Description */}
        <div className="flex flex-col gap-1 w-full">
          <label htmlFor="description" className="text-base font-medium">
            Description of Issue
          </label>
          <textarea
            id="description"
            rows={4}
            className="outline-none py-2 px-3 rounded border border-gray-400 resize-none w-full"
            placeholder="Briefly describe the cleaning issue"
            onChange={(e) => setDescription(e.target.value)}
            value={description}
            required
          ></textarea>
        </div>

        {/* Urgency & Job Type */}
        <div className="flex flex-col sm:flex-row gap-4 w-full">
          <div className="flex flex-col gap-1 w-full sm:w-1/2">
            <label htmlFor="urgency" className="text-base font-medium">
              Urgency
            </label>
            <select
              id="urgency"
              className="outline-none py-2 px-3 rounded border border-gray-400 w-full"
              onChange={(e) => setUrgency(e.target.value)}
              value={urgency}
            >
              <option value="Low">Low</option>
              <option value="Normal">Normal</option>
              <option value="High">High</option>
              <option value="Critical">Critical</option>
            </select>
          </div>

          <div className="flex flex-col gap-1 w-full sm:w-1/2">
            <label htmlFor="jobType" className="text-base font-medium">
              Type of Cleaning Job
            </label>
            <select
              id="jobType"
              className="outline-none py-2 px-3 rounded border border-gray-400 w-full"
              onChange={(e) => setJobType(e.target.value)}
              value={jobType}
            >
              <option value="Spillage">Spillage</option>
              <option value="Trash Overflow">Trash Overflow</option>
              <option value="Dirty Restroom">Dirty Restroom</option>
              <option value="Sweeping Required">Sweeping Required</option>
              <option value="Mopping Required">Mopping Required</option>
              <option value="Sanitization">Sanitization</option>
              <option value="Others">Others</option>
            </select>
          </div>
        </div>

        {/* Upload / Camera Capture */}
        <div>
          <p className="text-base font-medium">Capture / Upload Photo</p>
          <div className="flex flex-col sm:flex-row gap-4 mt-2">
            {[...Array(2)].map((_, index) => (
              <label
                key={index}
                htmlFor={`image${index}`}
                className="cursor-pointer flex-1"
              >
                <input
                  type="file"
                  id={`image${index}`}
                  hidden
                  accept="image/*"
                  capture="environment"
                  onChange={(e) => {
                    if (e.target.files) {
                      const updatedFiles = [...files];
                      updatedFiles[index] = e.target.files[0];
                      setFiles(updatedFiles);
                    }
                  }}
                />
                <div className="w-full h-40 border border-gray-400 rounded flex items-center justify-center overflow-hidden bg-gray-50">
                  {files[index] ? (
                    <Image
                      src={URL.createObjectURL(files[index])}
                      alt="Preview"
                      width={200}
                      height={200}
                      className="object-cover w-full h-full"
                    />
                  ) : (
                    <Image
                      src={assets.upload_area}
                      alt="Upload"
                      width={50}
                      height={50}
                    />
                  )}
                </div>
              </label>
            ))}
          </div>
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full px-8 py-2.5 text-emerald-900 bg-yellow-400 hover:text-yellow-400 font-medium rounded hover:bg-emerald-800"
        >
          Submit Report
        </button>
      </form>
    </div>
  );
};

export default ReportCleaningSpace;
