import React from "react";

const AuthLoader = () => {
  return (
    <div className="z-10 m-auto absolute inset-0 bg-gray-500 opacity-60 flex justify-center items-center">
      <div className="w-8 h-8 border-4 border-gray-300 border-t-blue-600 rounded-full animate-spin"></div>
    </div>
  );
};

export default AuthLoader;
