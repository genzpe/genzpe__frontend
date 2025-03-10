import React from "react";

export const Loader = () => {
  return (
    <div className=" top-16 sm:left-64  z-10 m-auto absolute inset-0 bg-gray-500 opacity-60 flex justify-center items-center max-h-screen min-h-[91vh]">
      <div className="w-8 h-8 border-4 border-gray-300 border-t-blue-600 rounded-full animate-spin"></div>
    </div>
  );
};

export const ReportLoader = () => {
  return (
    <div
      className="top-16 sm:left-64 fixed inset-0 bg-gray-500 bg-opacity-60 flex justify-center items-center z-50"
      style={{ overflow: "hidden" }} // Disable scrolling while loading
    >
      <div className="w-8 h-8 border-4 border-gray-300 border-t-blue-600 rounded-full animate-spin"></div>
    </div>
  );
};

export const Loader1 = () => {
  return (
    <div className="sm:top-80 top-16 sm:left-64  z-10 m-auto absolute inset-0 bg-gray-500 opacity-60 flex justify-center items-center max-h-screen min-h-screen">
      <div className="w-8 h-8 border-4 border-gray-300 border-t-blue-600 rounded-full animate-spin"></div>
    </div>
  );
};

export const AuthLoader = () => {
  return (
    <div className="z-10 m-auto absolute inset-0 bg-gray-500 opacity-60 flex justify-center items-center">
      <div className="w-8 h-8 border-4 border-gray-300 border-t-blue-600 rounded-full animate-spin"></div>
    </div>
  );
};
