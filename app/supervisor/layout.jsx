"use client"
import Navbar from "@/components/supervisor/Navbar";
import Sidebar from "@/components/supervisor/Sidebar";

const SupervisorLayout = ({ children }) => {
  
  return (
    <div>
      <Navbar />
      <div className="flex w-full">
        <Sidebar />
        {children}
      </div>
    </div>
  );
};

export default SupervisorLayout;
