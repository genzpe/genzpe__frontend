import React from "react";

const Loader = () => {
  return (
    <div className=" mt-16 sm:ml-64  z-10 m-auto absolute inset-0 bg-gray-500 opacity-60 flex justify-center items-center max-h-screen min-h-screen">
      <div className="w-8 h-8 border-4 border-gray-300 border-t-blue-600 rounded-full animate-spin"></div>
    </div>
  );
};

export default Loader;
