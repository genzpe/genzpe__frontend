import React, { useState } from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

const AuthenticatedLayout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  // Toggle sidebar visibility
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
    setIsDropdownOpen(false);
  };
  // Toggle profile dropdown visibility
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
    setIsSidebarOpen(false);
  };
  return (
    <>
      <div className="h-screen">
        {/* Navbar */}
        <Navbar
          setIsSidebarOpen={setIsSidebarOpen}
          isDropdownOpen={isDropdownOpen}
          setIsDropdownOpen={setIsDropdownOpen}
          toggleSidebar={toggleSidebar}
          toggleDropdown={toggleDropdown}
        />

        {/* Sidebar */}
        <Sidebar
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
          isDropdownOpen={isDropdownOpen}
        />
        <div className="mt-[4.45rem] sm:ml-64 flex-1 max-h-[92vh] ">
          {/* Content */}
          {children}
        </div>
      </div>
    </>
  );
};

export default AuthenticatedLayout;
