import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import logoImage from "../assets/logoImage.png";
import { CgProfile } from "react-icons/cg";
import { IoMdNotificationsOutline } from "react-icons/io";
import { RxQuestionMarkCircled } from "react-icons/rx";
import { FaArrowRightToBracket } from "react-icons/fa6";
import { toast } from "react-toastify";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

const Navbar = ({
  setIsSidebarOpen,
  isDropdownOpen,
  setIsDropdownOpen,
  toggleDropdown,
  toggleSidebar,
}) => {
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

      logout();
      toast.success("Logout successful");

      // Call the logout function from your context or auth handler
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
    <>
      {/* Navbar */}
      <nav
        className="fixed h-fit z-50 w-full bg-white  border-gray-200"
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
                <div className="md:mx-3 mx-2">
                  <RxQuestionMarkCircled className="md:w-8 md:h-8 w-6 h-6" />
                </div>
                <div className="md:mx-3 mx-2 mt-[6px]">
                  <button>
                    <IoMdNotificationsOutline className="md:w-8 md:h-8 w-6 h-6" />
                  </button>
                </div>
                <div className="md:mx-3 mx-2">
                  {/* Profile Dropdown Button */}
                  <button
                    type="button"
                    className="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
                    aria-expanded={isDropdownOpen ? "true" : "false"}
                    onClick={toggleDropdown}
                  >
                    <span className="sr-only">Open user menu</span>
                    <CgProfile className="md:w-8 md:h-8 w-6 h-6" />
                  </button>
                  {/* Profile Dropdown Menu */}
                  {isDropdownOpen && (
                    <div
                      onClick={() => {
                        setIsDropdownOpen(!isDropdownOpen);
                        setIsSidebarOpen(false);
                      }}
                      className="absolute right-2 z-10 mt-2 w-48 bg-white rounded-lg shadow-lg dark:bg-gray-800"
                      aria-labelledby="dropdown-user"
                    >
                      <ul className="py-1 text-sm text-gray-700 dark:text-gray-200">
                        <li>
                          <Link
                            to="/manage-api-key"
                            className="block px-4 py-2 text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                          >
                            Your Api Key
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="#"
                            className="block px-4 py-2 text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                          >
                            Settings
                          </Link>
                        </li>
                        <li className="mx-2 mb-1">
                          <Button
                            onClick={handleLogout}
                            className="md:hidden inline-block w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg mt-4 bg-[#050D2D] hover:bg-[#172045]"
                          >
                            Logout
                          </Button>
                        </li>
                      </ul>
                    </div>
                  )}
                </div>
                <div>
                  <Button
                    onClick={handleLogout}
                    className="w-fit sm:inline-block hidden max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg bg-[#050D2D]"
                  >
                    <span className="flex items-center justify-around text-base">
                      LogOut <FaArrowRightToBracket className="ml-1 text-xl" />
                    </span>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
