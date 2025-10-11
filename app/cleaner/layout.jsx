"use client"
import Navbar from "@/components/cleaner/Navbar";
import Sidebar from "@/components/cleaner/Sidebar";

const CleanerLayout = ({ children }) => {


  return (
    <div>
      <Navbar  />
      <div className="flex w-full">
        <Sidebar  />
        {children}
      </div>
    </div>
  );
};

export default CleanerLayout;
