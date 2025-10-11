"use client"
import Navbar from "@/components/report/Navbar";
import Sidebar from "@/components/report/Sidebar";

const ReportLayout = ({ children }) => {
 

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

export default ReportLayout;
