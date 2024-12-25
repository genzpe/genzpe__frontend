import React, { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { FiGrid } from "react-icons/fi";
import { useLocation, useNavigate } from "react-router-dom";
const Sidebar = ({ isSidebarOpen, setIsSidebarOpen }) => {
  const navigate = useNavigate();
  const location = useLocation();
  // Helper function to check if a link is active
  const isActiveLink = (path) => location.pathname === path;

  const [nestedDropdown, setNestedDropdown] = useState(null); // Nested dropdown state

  const handleNestedDropdown = (menu) => {
    setNestedDropdown(nestedDropdown === menu ? null : menu);
  };

  return (
    <>
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
                <div className="flex items-center justify-between px-4 py-2 cursor-pointer hover:bg-blue-800 rounded-md">
                  <div className="flex items-center gap-2">
                    <FiGrid className="text-2xl" />
                    <span className="font-medium">Individual</span>
                  </div>
                </div>
                <ul className="ml-4 mt-2 space-y-2 border-l-2 border-[#99DE07]">
                  <li>
                    <div
                      className="pl-4 flex items-center justify-start text-sm cursor-pointer hover:bg-blue-800"
                      onClick={() => handleNestedDropdown("eKYC")}
                    >
                      eKYC
                      {nestedDropdown === "eKYC" ? (
                        <FaChevronUp size={14} className="ml-2" />
                      ) : (
                        <FaChevronDown size={14} className="ml-2" />
                      )}
                    </div>
                    {nestedDropdown === "eKYC" && (
                      <ul className="ml-4 mt-2 space-y-2 border-l-2 border-[#99DE07]">
                        <li
                          onClick={() =>
                            navigate(
                              "/ekyc/pan-verification",
                              setIsSidebarOpen(false)
                            )
                          }
                          className={`text-[14px] my-3 ml-1 pl-4 p-1 flex items-center justify-between text-sm cursor-pointer hover:bg-blue-800 ${
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
                          className={`text-[14px] my-3 ml-1 pl-4 p-1 flex items-center justify-between text-sm cursor-pointer hover:bg-blue-800 ${
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
                          className={`text-[14px] my-3 ml-1 pl-4 p-1 flex items-center justify-between  text-sm cursor-pointer hover:bg-blue-800 ${
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
                          className={`text-[14px] my-3 ml-1 pl-4 p-1 flex items-center justify-between text-sm  cursor-pointer hover:bg-blue-800 ${
                            isActiveLink("/ekyc/itr-verification")
                              ? "bg-[#99DE07] text-black rounded pl-5"
                              : ""
                          }`}
                        >
                          ITR Compliance
                        </li>
                      </ul>
                    )}
                    <li
                      onClick={() =>
                        navigate("/prefill", setIsSidebarOpen(false))
                      }
                      className={`text-[14px] my-3 ml-1 pl-3 p-1 flex items-center justify-between cursor-pointer hover:bg-blue-800 ${
                        isActiveLink("/prefill")
                          ? "bg-[#99DE07] text-black rounded pl-5"
                          : ""
                      }`}
                    >
                      Prefill
                    </li>
                  </li>
                  <li>
                    <div
                      className="pl-4 flex items-center justify-start cursor-pointer text-sm hover:bg-blue-800"
                      onClick={() => handleNestedDropdown("creditreports")}
                    >
                      Credit Reports
                      {nestedDropdown === "creditreports" ? (
                        <FaChevronUp size={14} className="ml-2" />
                      ) : (
                        <FaChevronDown size={14} className="ml-2" />
                      )}
                    </div>
                    {nestedDropdown === "creditreports" && (
                      <ul className="ml-4 mt-2 space-y-2 border-l-2 border-[#99DE07]">
                        <li
                          onClick={() =>
                            navigate(
                              "/credit-report/equifax",
                              setIsSidebarOpen(false)
                            )
                          }
                          className={`text-[14px] my-3 ml-1 pl-4 p-1 flex items-center justify-between cursor-pointer hover:bg-blue-800 ${
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
                          className={`text-[14px] my-3 pl-4 ml-1 p-1 flex items-center justify-between   cursor-pointer hover:bg-blue-800 ${
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
              </li>

              {/* Company */}
              <li className="mt-4">
                <div className="flex items-center justify-between px-4 py-2 cursor-pointer hover:bg-blue-800 rounded-md">
                  <div className="flex items-center gap-2">
                    <FiGrid className="text-2xl" />
                    <span className="font-medium">Company</span>
                  </div>
                </div>
                <ul className="ml-4 mt-2 space-y-2 text-sm  border-l-2 border-[#99DE07]">
                  <li>
                    <div
                      className="pl-4 flex items-center justify-start   cursor-pointer hover:bg-blue-800"
                      onClick={() => handleNestedDropdown("masterdata")}
                    >
                      Master Data
                      {nestedDropdown === "masterdata" ? (
                        <FaChevronUp size={14} className="ml-2" />
                      ) : (
                        <FaChevronDown size={14} className="ml-2" />
                      )}
                    </div>
                    {nestedDropdown === "masterdata" && (
                      <ul className="ml-4 mt-2 space-y-2 text-sm border-l-2 border-[#99DE07]">
                        <li
                          className={`text-[14px] my-3 ml-1 pl-4 p-1 flex items-center justify-between cursor-pointer hover:bg-blue-800 ${
                            isActiveLink("/master/mca-details")
                              ? "bg-[#99DE07] text-black rounded pl-5"
                              : ""
                          }`}
                        >
                          MCA Details
                        </li>

                        <li
                          onClick={() =>
                            navigate("/masterdata/gst", setIsSidebarOpen(false))
                          }
                          className={`text-[14px] ml-1 my-3 pl-4 p-1 flex items-center justify-between  cursor-pointer hover:bg-blue-800 ${
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
                </ul>
              </li>

              {/* Compliance */}
              <li className="mt-4">
                <div className="flex items-center justify-between px-4 py-2 cursor-pointer hover:bg-blue-800 rounded-md">
                  <div className="flex items-center gap-2">
                    <FiGrid className="text-2xl" />
                    <span className="font-medium">Compliance</span>
                  </div>
                </div>
                <ul className="ml-4 mt-2 space-y-2 border-l-2 text-sm border-[#99DE07]">
                  <li
                    className={`text-[14px] my-3 ml-1 pl-4 p-1 flex items-center justify-between cursor-pointer hover:bg-blue-800 ${
                      isActiveLink("/compliance/cic-reporting")
                        ? "bg-[#99DE07] text-black rounded pl-5"
                        : ""
                    }`}
                  >
                    CIC Reporting
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </aside>
      </div>
    </>
  );
};

export default Sidebar;
