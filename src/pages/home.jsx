import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Home = () => {
  return (
    <div className="relative w-full h-[50vh]  flex justify-center items-center bg-gray-50">
      <Card className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg shadow-lg rounded-lg border-none">
        <CardHeader>
          <CardTitle className="text-center text-2xl font-semibold text-gray-800 ">
            Welcome to the Portal!
          </CardTitle>
        </CardHeader>
        <CardContent className="w-full flex flex-col items-center">
          <p className="text-center text-gray-600 text-lg">
            You are now logged in. Enjoy your experience!
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Home;
