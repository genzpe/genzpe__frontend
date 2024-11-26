import React, { useContext } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { toast } from "react-toastify";
import axios from "axios";
import { AuthContext } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Loader from "@/components/ui/Loader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const ApiManage = () => {
  const { email, api_key, loading, setLoading, setApiKey } =
    useContext(AuthContext);

  // Formik for form handling
  const formik = useFormik({
    initialValues: {
      apiKey: api_key || "",
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
            email, // Send email from the context
            api_key: values.apiKey,
          }
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
      <div className="relative w-full h-[93vh] sm:h-[92vh] xl:h-[91vh] flex justify-center">
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
                  className="w-full border rounded-md p-3 px-6 text-start text-sm"
                />
                {formik.touched.apiKey && formik.errors.apiKey && (
                  <p className="text-red-500 text-sm mt-2">
                    {formik.errors.apiKey}
                  </p>
                )}
              </div>

              <Button
                type="submit"
                className="w-full max-w-sm bg-gray-200 text-gray-600 py-2 rounded-md text-sm border-gray-300 border-2 mt-4 hover:bg-blue-50"
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