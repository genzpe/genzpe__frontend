import React, { useContext, useEffect, useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { toast } from "react-toastify";
import axios from "axios";
import {
  Card,
  CardContent,
  CardTitle,
  CardHeader,
} from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { AuthContext } from "../context/AuthContext";
import { Loader } from "../components/ui/Loader";
const ApiManage = () => {
  const { loading, setLoading } = useContext(AuthContext);
  const [apiKey, setApiKey] = useState("");

  useEffect(() => {
    const fetchApiKey = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_APP_BACKEND_URL}/auth/get-api-key`,
          {
            withCredentials: true,
          }
        );

        if (response.data.success) {
          toast.success("API key fetched successfully");

          setApiKey(response.data.api_key);
        }
      } catch (err) {
        toast.error(
          err.response?.data?.message ||
            "Failed to fetch API Key. Please try again."
        );
      }
    };

    fetchApiKey(); // Call API if email exists
  }, []);

  // Formik for form handling
  const formik = useFormik({
    initialValues: {
      apiKey: apiKey || "",
    },
    enableReinitialize: true, // Reinitialize the form when the API key changes
    validationSchema: yup.object({
      apiKey: yup.string().required("API key is required"),
    }),
    onSubmit: async (values) => {
      try {
        setLoading(true);
        const response = await axios.put(
          `${import.meta.env.VITE_APP_BACKEND_URL}/auth/update-apikey`,
          {
            api_key: values.apiKey,
          },
          { withCredentials: true }
        );
        setLoading(false);
        if (response.status === 200) {
          toast.success("API key updated successfully");
          setApiKey(response.data.updatedUser.api_key); // Update the API key in context
        } else {
          toast.error("Failed to update API key");
        }
      } catch (error) {
        setLoading(false);
        toast.error("Error updating API key");
      }
    },
  });

  return (
    <>
      {loading && <Loader />}
      <div className="relative w-full   flex justify-center border-none">
        {" "}
        <Card className="h-fit w-full max-w-lg px-6 py-8 md:max-w-xl lg:max-w-2xl md:px-10 border-none">
          <CardHeader>
            <CardTitle className="text-center mt-2 tracking-wide text-lg text-gray-800">
              Manage API Key
            </CardTitle>
          </CardHeader>
          <CardContent className="w-full flex flex-col items-center">
            <form
              onSubmit={formik.handleSubmit}
              className="w-full flex flex-col items-center justify-start"
            >
              <div className="w-full text-sm max-w-sm mb-4">
                <Input
                  id="apiKey"
                  name="apiKey"
                  type="text"
                  placeholder="Enter API Key"
                  value={formik.values.apiKey}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="w-full border rounded-md p-3 px-6 text-start text-base"
                />
                {formik.touched.apiKey && formik.errors.apiKey && (
                  <p className="text-red-500 text-sm mt-2">
                    {formik.errors.apiKey}
                  </p>
                )}
              </div>

              <Button
                type="submit"
                className="w-full max-w-sm bg-gray-200 py-2 rounded-md text-sm border-gray-300 border-2 mt-4 hover:bg-blue-50"
                style={{ backgroundColor: "#15274F" }}
              >
                Update API Key
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default ApiManage;
