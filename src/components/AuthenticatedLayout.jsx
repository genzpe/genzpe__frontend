import { AuthContext } from "@/context/AuthContext";
import axios from "axios";
import React, { useContext, useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { FiMenu, FiX, FiGrid } from "react-icons/fi";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import logoImage from "../assets/logoImage.png";
import { CgProfile } from "react-icons/cg";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { IoMdNotificationsOutline } from "react-icons/io";
import { RxQuestionMarkCircled } from "react-icons/rx";

const AuthenticatedLayout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  // Helper function to check if a link is active
  const isActiveLink = (path) => location.pathname === path;
  // Toggle sidebar visibility
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  const [activeDropdown, setActiveDropdown] = useState(null); // Active dropdown state
  const [nestedDropdown, setNestedDropdown] = useState(null); // Nested dropdown state
  const handleDropdown = (menu) => {
    setActiveDropdown(activeDropdown === menu ? null : menu);
    setNestedDropdown(null); // Reset nested dropdowns when main dropdown changes
  };

  const handleNestedDropdown = (menu) => {
    setNestedDropdown(nestedDropdown === menu ? null : menu);
  };

  // Toggle profile dropdown visibility
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };
  const { logout } = useContext(AuthContext);

  const handleLogout = async () => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_APP_BACKEND_URL}/auth/logout`,
        {}, // An empty object for the POST body if no data is needed
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true, // Ensures cookies are sent with the request
        }
      );

      // console.log("Logout:", response.data);
      toast.success("Logout successful");
      logout(); // Call the logout function from your context or auth handler
    } catch (error) {
      console.error("Error:", error);
      if (error.response) {
        // Server-side error
        toast.error(`Logout failed: ${error.response.data.error.message}`);
      } else if (error.request) {
        // Network error or no response
        toast.error("Logout failed: No response from server");
      } else {
        // Other errors
        toast.error(`Logout failed: ${error.message}`);
      }
    }
  };

  return (
    <div className="h-screen">
      {/* Navbar */}
      <nav
        className="fixed h-16 z-50 w-full bg-white  border-gray-200"
        style={{ background: "#050D2D", color: "white" }}
      >
        <div className="px-3 py-3 lg:px-5 lg:pl-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center justify-start rtl:justify-end">
              <button
                data-drawer-target="logo-sidebar"
                data-drawer-toggle="logo-sidebar"
                aria-controls="logo-sidebar"
                type="button"
                className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                onClick={toggleSidebar}
              >
                <span className="sr-only">Open sidebar</span>
                <svg
                  className="w-6 h-6"
                  aria-hidden="true"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    clipRule="evenodd"
                    fillRule="evenodd"
                    d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
                  ></path>
                </svg>
              </button>

              <img
                src={logoImage}
                className="w-[101px] h-[46px] ml-10"
                alt="Genzype"
              />
            </div>
            <div className="flex items-center">
              <div className="flex justify-evenly items-center ms-3 w-fit">
                <div className="mx-3">
                  <RxQuestionMarkCircled className="w-8 h-8" />
                </div>
                <div className="mx-3 ">
                  <button>
                    <IoMdNotificationsOutline className="mt-1 w-8 h-8" />
                  </button>
                </div>
                <div className="mx-3">
                  {/* Profile Dropdown Button */}
                  <button
                    type="button"
                    className="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
                    aria-expanded={isDropdownOpen ? "true" : "false"}
                    onClick={toggleDropdown}
                  >
                    <span className="sr-only">Open user menu</span>
                    <CgProfile className="w-8 h-8" />
                  </button>
                  {/* Profile Dropdown Menu */}
                  {isDropdownOpen && (
                    <div
                      className="absolute right-0 z-10 mt-2 w-48 bg-white rounded-lg shadow-lg dark:bg-gray-800"
                      aria-labelledby="dropdown-user"
                    >
                      <ul className="py-1 text-sm text-gray-700 dark:text-gray-200">
                        <li>
                          <Link
                            to="#"
                            className="block px-4 py-2 text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                          >
                            Settings
                          </Link>
                        </li>
                        <li>
                          <Button
                            onClick={handleLogout}
                            className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg mt-4 bg-gray-800"
                          >
                            Logout
                          </Button>
                        </li>
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Sidebar */}
      <div className="flex ">
        <aside
          id="logo-sidebar"
          className={`fixed top-0 w-64 left-0 z-40 h-screen pt-20 transition-transform ${
            isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          } bg-white border-r border-gray-200 sm:translate-x-0  dark:border-gray-700`}
          style={{ background: "#050D2D", color: "white" }}
          aria-label="Sidebar"
        >
          <div className="h-full px-3 mt-4 pb-4 overflow-y-auto ">
            <ul className="space-y-2 font-medium">
              {/* Individual */}
              <li>
                <div
                  className="flex items-center justify-between px-4 py-2 cursor-pointer hover:bg-blue-800 rounded-md"
                  onClick={() => handleDropdown("individual")}
                >
                  <div className="flex items-center gap-2">
                    <FiGrid className="text-2xl" />
                    <span className="font-medium">Individual</span>
                  </div>
                  {activeDropdown === "individual" ? (
                    <FaChevronUp size={16} />
                  ) : (
                    <FaChevronDown size={16} />
                  )}
                </div>
                {activeDropdown === "individual" && (
                  <ul className="ml-4 mt-2 space-y-2">
                    <li>
                      <div
                        className="pl-4 flex items-center justify-between border-l-2 border-green-500 cursor-pointer hover:bg-blue-800"
                        onClick={() => handleNestedDropdown("eKYC")}
                      >
                        eKYC
                        {nestedDropdown === "eKYC" ? (
                          <FaChevronUp size={14} />
                        ) : (
                          <FaChevronDown size={14} />
                        )}
                      </div>
                      {nestedDropdown === "eKYC" && (
                        <ul className="ml-4 mt-2 space-y-2">
                          <li
                            onClick={() =>
                              navigate(
                                "/ekyc/pan-verification",
                                setIsSidebarOpen(false)
                              )
                            }
                            className={`text-[14px] my-3 pl-4 p-1 flex items-center justify-between border-l-2 border-green-500 cursor-pointer hover:bg-blue-800 ${
                              isActiveLink("/ekyc/pan-verification")
                                ? "bg-[#99DE07] text-black rounded pl-5"
                                : ""
                            }`}
                          >
                            PAN Card Verification
                          </li>
                          <li
                            onClick={() =>
                              navigate(
                                "/ekyc/aadhaar-verification",
                                setIsSidebarOpen(false)
                              )
                            }
                            className={`text-[14px] my-3 pl-4 p-1 flex items-center justify-between border-l-2 border-green-500 cursor-pointer hover:bg-blue-800 ${
                              isActiveLink("/ekyc/aadhaar-verification")
                                ? "bg-[#99DE07] text-black rounded pl-5"
                                : ""
                            }`}
                          >
                            Aadhaar Validation
                          </li>
                          <li
                            onClick={() =>
                              navigate(
                                "/ekyc/bankaccount-verification",
                                setIsSidebarOpen(false)
                              )
                            }
                            className={`text-[14px] my-3 pl-4 p-1 flex items-center justify-between border-l-2 border-green-500 cursor-pointer hover:bg-blue-800 ${
                              isActiveLink("/ekyc/bankaccount-verification")
                                ? "bg-[#99DE07] text-black rounded pl-5"
                                : ""
                            }`}
                          >
                            Bank Account Verification
                          </li>
                          <li
                            onClick={() =>
                              navigate(
                                "/ekyc/itr-verification",
                                setIsSidebarOpen(false)
                              )
                            }
                            className={`text-[14px] my-3 pl-4 p-1 flex items-center justify-between border-l-2 border-green-500 cursor-pointer hover:bg-blue-800 ${
                              isActiveLink("/ekyc/itr-verification")
                                ? "bg-[#99DE07] text-black rounded pl-5"
                                : ""
                            }`}
                          >
                            ITR Compliance
                          </li>
                        </ul>
                      )}
                    </li>
                    <li>
                      <div
                        className="pl-4 flex items-center justify-between border-l-2 border-green-500 cursor-pointer hover:bg-blue-800"
                        onClick={() => handleNestedDropdown("cKYC")}
                      >
                        cKYC
                        {nestedDropdown === "cKYC" ? (
                          <FaChevronUp size={14} />
                        ) : (
                          <FaChevronDown size={14} />
                        )}
                      </div>
                      {nestedDropdown === "cKYC" && (
                        <ul className="ml-4 mt-2 space-y-2">
                          <li
                            className={`text-[14px] my-3 pl-4 p-1 flex items-center justify-between border-l-2 border-green-500 cursor-pointer hover:bg-blue-800 ${
                              isActiveLink("/ckyc/search")
                                ? "bg-[#99DE07] text-black rounded pl-5"
                                : ""
                            }`}
                          >
                            cKYC Search
                          </li>
                          <li
                            className={`text-[14px] my-3 pl-4 p-1 flex items-center justify-between border-l-2 border-green-500 cursor-pointer hover:bg-blue-800 ${
                              isActiveLink("/ckyc/download")
                                ? "bg-[#99DE07] text-black rounded pl-5"
                                : ""
                            }`}
                          >
                            cKYC Download
                          </li>
                        </ul>
                      )}
                    </li>
                  </ul>
                )}
              </li>

              {/* Company */}
              <li className="mt-4">
                <div
                  className="flex items-center justify-between px-4 py-2 cursor-pointer hover:bg-blue-800 rounded-md"
                  onClick={() => handleDropdown("company")}
                >
                  <div className="flex items-center gap-2">
                    <FiGrid className="text-2xl" />
                    <span className="font-medium">Company</span>
                  </div>
                  {activeDropdown === "company" ? (
                    <FaChevronUp size={16} />
                  ) : (
                    <FaChevronDown size={16} />
                  )}
                </div>
                {activeDropdown === "company" && (
                  <ul className="ml-4 mt-2 space-y-2">
                    <li>
                      <div
                        className="pl-4 flex items-center justify-between border-l-2 border-green-500 cursor-pointer hover:bg-blue-800"
                        onClick={() => handleNestedDropdown("masterdata")}
                      >
                        Master Data
                        {nestedDropdown === "masterdata" ? (
                          <FaChevronUp size={14} />
                        ) : (
                          <FaChevronDown size={14} />
                        )}
                      </div>
                      {nestedDropdown === "masterdata" && (
                        <ul className="ml-4 mt-2 space-y-2">
                          <li
                            className={`text-[14px] my-3 pl-4 p-1 flex items-center justify-between border-l-2 border-green-500 cursor-pointer hover:bg-blue-800 ${
                              isActiveLink("/master/mca-details")
                                ? "bg-[#99DE07] text-black rounded pl-5"
                                : ""
                            }`}
                          >
                            MCA Details
                          </li>
                          <li
                            className={`text-[14px] my-3 pl-4 p-1 flex items-center justify-between border-l-2 border-green-500 cursor-pointer hover:bg-blue-800 ${
                              isActiveLink("/masterdata/gst")
                                ? "bg-[#99DE07] text-black rounded pl-5"
                                : ""
                            }`}
                          >
                            GST
                          </li>
                        </ul>
                      )}
                    </li>
                    <li>
                      <div
                        className="pl-4 flex items-center justify-between border-l-2 border-green-500 cursor-pointer hover:bg-blue-800"
                        onClick={() => handleNestedDropdown("creditreports")}
                      >
                        Credit Reports
                        {nestedDropdown === "creditreports" ? (
                          <FaChevronUp size={14} />
                        ) : (
                          <FaChevronDown size={14} />
                        )}
                      </div>
                      {nestedDropdown === "creditreports" && (
                        <ul className="ml-4 mt-2 space-y-2">
                          <li
                            onClick={() =>
                              navigate(
                                "/credit-report/equifax",
                                setIsSidebarOpen(false)
                              )
                            }
                            className={`text-[14px] my-3 pl-4 p-1 flex items-center justify-between border-l-2 border-green-500 cursor-pointer hover:bg-blue-800 ${
                              isActiveLink("/credit-report/equifax")
                                ? "bg-[#99DE07] text-black rounded pl-5"
                                : ""
                            }`}
                          >
                            Equifax
                          </li>
                          <li
                            onClick={() =>
                              navigate(
                                "/credit-report/experian",
                                setIsSidebarOpen(false)
                              )
                            }
                            className={`text-[14px] my-3 pl-4 p-1 flex items-center justify-between border-l-2 border-green-500 cursor-pointer hover:bg-blue-800 ${
                              isActiveLink("/credit-report/experian")
                                ? "bg-[#99DE07] text-black rounded pl-5"
                                : ""
                            }`}
                          >
                            Experian
                          </li>
                        </ul>
                      )}
                    </li>
                  </ul>
                )}
              </li>

              {/* Compliance */}
              <li className="mt-4">
                <div
                  className="flex items-center justify-between px-4 py-2 cursor-pointer hover:bg-blue-800 rounded-md"
                  onClick={() => handleDropdown("compliance")}
                >
                  <div className="flex items-center gap-2">
                    <FiGrid className="text-2xl" />
                    <span className="font-medium">Compliance</span>
                  </div>
                  {activeDropdown === "compliance" ? (
                    <FaChevronUp size={16} />
                  ) : (
                    <FaChevronDown size={16} />
                  )}
                </div>
                {activeDropdown === "compliance" && (
                  <ul className="ml-4 mt-2 space-y-2">
                    <li
                      className={`text-[14px] my-3 pl-4 p-1 flex items-center justify-between border-l-2 border-green-500 cursor-pointer hover:bg-blue-800 ${
                        isActiveLink("/compliance/cic-reporting")
                          ? "bg-[#99DE07] text-black rounded pl-5"
                          : ""
                      }`}
                    >
                      CIC Reporting
                    </li>
                  </ul>
                )}
              </li>
            </ul>
          </div>
        </aside>
        <div className="mt-16 sm:ml-64 flex-1 max-h-[92vh] h-[92vh] overflow-y-auto">
          {/* Content */}
          {children}
        </div>
      </div>
    </div>
  );
};

export default AuthenticatedLayout;