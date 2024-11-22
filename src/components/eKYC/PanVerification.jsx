import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";
import { FaChevronDown } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaArrowRightLong } from "react-icons/fa6";

// Validation schema for PAN
const validationSchema = yup.object({
  pan: yup
    .string()
    .matches(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/, "Invalid PAN format")
    .required("PAN is required"),
});

const PanVerification = () => {
  const [verificationStatus, setVerificationStatus] = useState(null);
  const [panDetails, setPanDetails] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);

  const formik = useFormik({
    initialValues: {
      pan: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_APP_BACKEND_URL}/ekyc-verification`,
          {
            id: values.pan,
            type: "PID",
          },
          {
            headers: {
              Authorization: `Bearer ${import.meta.env.VITE_MY_API_KEY}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (response.data && response.data.success) {
          setVerificationStatus("Success");
          setPanDetails(response.data.data.response || {});
          toast.success(response.data.message || "Verification successful!");
        } else {
          setVerificationStatus("Failed");
          setPanDetails(null);
          toast.error(response.data.message || "Verification failed!");
        }
      } catch (error) {
        setVerificationStatus("Failed");
        setPanDetails(null);
        toast.error(
          error.response?.data?.message ||
            "Error during verification. Please try again."
        );
      }
    },
  });

  return (
    <div className="relative w-full  h-[93vh] sm:h-[92vh] xl:h-[91vh] flex justify-center ">
      <Card className="h-fit w-full max-w-lg px-6 py-8 md:max-w-xl lg:max-w-2xl md:px-10 border-none">
        <CardHeader>
          <CardTitle className="text-center mt-2 tracking-wide text-lg text-gray-800">
            Enter PAN Number
          </CardTitle>
        </CardHeader>
        <CardContent className="w-full flex flex-col items-center">
          <form
            onSubmit={formik.handleSubmit}
            className="w-full flex flex-col items-center justify-start"
          >
            <div className="w-full text-sm max-w-sm mb-4">
              <Input
                id="pan"
                name="pan"
                type="text"
                placeholder="ABCDE1234F"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.pan}
                className="w-full border rounded-md p-3 px-6 text-start text-sm"
              />
              {formik.touched.pan && formik.errors.pan ? (
                <div className="text-red-500 text-sm mt-2">
                  {formik.errors.pan}
                </div>
              ) : null}
            </div>

            <Button
              type="submit"
              className="w-full max-w-sm bg-white-700 text-gray-400 py-2 rounded-md text-sm border-gray-300 border-2 mt-4 hover:bg-blue-50"
            >
              Submit
            </Button>
          </form>

          {/* Display Verification Result */}
          {verificationStatus && (
            <div className="absolute bottom-0 w-full bg-green-100 rounded-md flex flex-col items-start">
              <div
                className={`text-base font-semibold border-y-2 border-gray-300 flex px-4 py-2 items-center justify-between w-full`}
              >
                <div className="flex items-center text-base w-fit">
                  Response <FaArrowRightLong className="mx-2" />
                  <span
                    className={`${
                      verificationStatus === "Success"
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {verificationStatus}
                  </span>
                </div>
                <FaChevronDown
                  onClick={() => setShowDropdown(!showDropdown)}
                  className={`ml-2 transition-transform cursor-pointer ${
                    showDropdown ? "rotate-180" : ""
                  }`}
                />
              </div>

              {showDropdown &&
                verificationStatus === "Success" &&
                panDetails && (
                  <div className="mt-4 text-left text-gray-800 space-y-2 p-4">
                    <div>
                      <strong>Client ID:</strong>{" "}
                      {panDetails.client_id || "N/A"}
                    </div>
                    <div>
                      <strong>Full Name:</strong>{" "}
                      {panDetails.full_name || "N/A"}
                    </div>
                    <div>
                      <strong>PAN Number:</strong>{" "}
                      {panDetails.pan_number || "N/A"}
                    </div>
                    <div>
                      <strong>State:</strong> {panDetails.state || "N/A"}
                    </div>
                  </div>
                )}
            </div>
          )}
        </CardContent>
      </Card>
      <ToastContainer />
    </div>
  );
};

export default PanVerification;
