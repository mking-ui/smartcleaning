"use client";
import React, { useEffect, useState } from "react";
import { assets } from "../../assets/assets";
import Image from "next/image";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");


  useEffect(() => {
    setEmail(localStorage.getItem("user?.email") || "");
    setRole(localStorage.getItem("user?.role") || "");
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    router.push("/");
  };

  return (
    <div className="flex items-center px-4 md:px-8 py-3 justify-between border-b bg-emerald-800 text-white">
      <Image
        onClick={() => router.push("/")}
        className="w-28 lg:w-32 cursor-pointer"
        src={assets.logo}
        alt="Logo"
      />

       <button className='text-yellow-400  font-medium font-4xl px-5 py-2 sm:px-7 sm:py-2 rounded-full text-xs sm:text-sm'>{email}</button>
    
       <button className='text-yellow-400  font-medium font-4xl px-5 py-2 sm:px-7 sm:py-2 rounded-full text-xs sm:text-sm'>{role}</button>
    
      

      <button
        onClick={handleLogout}
        className="bg-yellow-400 text-emerald-800 px-5 py-2 sm:px-7 sm:py-2 rounded-full text-xs sm:text-sm"
      >
        Logout
      </button>
    </div>
  );
};

export default Navbar;

