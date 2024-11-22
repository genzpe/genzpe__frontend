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

// Validation schema for ITR
const validationSchema = yup.object({
  itrId: yup
    .string()
    .matches(
      /^[A-Za-z0-9]{6,12}$/,
      "Invalid ITR ID. Must be 6-12 alphanumeric characters."
    )
    .required("ITR ID is required"),
});

const ItrVerification = () => {
  const [verificationStatus, setVerificationStatus] = useState(null);
  const [itrDetails, setItrDetails] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);

  const formik = useFormik({
    initialValues: {
      itrId: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_APP_BACKEND_URL}/api/v1/ekyc-verification`,
          {
            type: "ITR",
            id: values.itrId,
          },
          {
            headers: {
              Authorization: `Bearer ${import.meta.env.MY_API_KEY}`, // Replace with actual token
            },
          }
        );

        if (response.data && response.data.success) {
          setVerificationStatus("Success");
          setItrDetails(response.data.data.response || {});
          toast.success(response.data.message || "Verification successful!");
        } else {
          setVerificationStatus("Failed");
          setItrDetails(null);
          toast.error(response.data.message || "Verification failed!");
        }
      } catch (error) {
        setVerificationStatus("Failed");
        setItrDetails(null);
        toast.error(
          error.response?.data?.message ||
            "Error during verification. Please try again."
        );
      }
    },
  });

  return (
    <div className="relative w-full  h-[93vh] sm:h-[92vh] xl:h-[91vh] flex justify-center">
      <Card className="h-fit w-full max-w-lg px-6 py-8 md:max-w-xl lg:max-w-2xl md:px-10 border-none">
        <CardHeader>
          <CardTitle className="text-center mt-2 tracking-wide text-lg text-gray-800">
            Enter ITR ID
          </CardTitle>
        </CardHeader>
        <CardContent className="w-full flex flex-col items-center">
          <form
            onSubmit={formik.handleSubmit}
            className="w-full flex flex-col items-center justify-start"
          >
            <div className="w-full text-sm max-w-sm mb-4">
              <Input
                id="itrId"
                name="itrId"
                type="text"
                placeholder="Enter ITR ID"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.itrId}
                className="w-full border rounded-md p-3 px-6 text-start text-sm"
              />
              {formik.touched.itrId && formik.errors.itrId ? (
                <div className="text-red-500 text-sm mt-2">
                  {formik.errors.itrId}
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
                className={`text-base font-semibold border-y-2 border-gray-300 flex px-4 py-2 items-center justify-between w-full cursor-pointer`}
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
                itrDetails && (
                  <div className="mt-4 text-left text-gray-800 space-y-2 p-4">
                    <div>
                      <strong>PAN Number:</strong> {itrDetails.pan || "N/A"}
                    </div>
                    <div>
                      <strong>Assessment Year:</strong>{" "}
                      {itrDetails.assessment_year || "N/A"}
                    </div>
                    <div>
                      <strong>Filing Status:</strong>{" "}
                      {itrDetails.filing_status || "N/A"}
                    </div>
                    <div>
                      <strong>ITR Type:</strong> {itrDetails.itr_type || "N/A"}
                    </div>
                    <div>
                      <strong>Verification Status:</strong>{" "}
                      {itrDetails.is_verified ? "Verified" : "Not Verified"}
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

export default ItrVerification;
