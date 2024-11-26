import React, { useContext } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "react-toastify";
import { AuthContext } from "@/context/AuthContext";
import axios from "axios";
import Loader from "@/components/ui/Loader";

const Home = () => {
  const { logout } = useContext(AuthContext);
  const { loading, setLoading } = useContext(AuthContext);

  const handleLogout = async () => {
    try {
      setLoading(true);
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
      setLoading(false);

      // console.log("Logout:", response.data);
      toast.success("Logout successful");
      logout(); // Call the logout function from your context or auth handler
    } catch (error) {
      setLoading(false);
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
      {loading && <Loader />}

      <div className="relative w-full h-full p-5 flex justify-center">
        <Card className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg overflow-hidden">
          <CardHeader>
            <CardTitle className="text-center mt-10">
              Welcome to the Community!
            </CardTitle>
          </CardHeader>
          <CardContent className="w-full flex flex-col items-center">
            <p className="text-center mb-4">You are now logged in.</p>
            <Button
              onClick={handleLogout}
              className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg mt-4 bg-gray-800"
            >
              Logout
            </Button>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default Home;
