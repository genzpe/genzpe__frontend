import React, { useContext, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";
import { FaChevronDown } from "react-icons/fa";
import {  toast } from "react-toastify";
import { FaArrowRightLong } from "react-icons/fa6";
import { AuthContext } from "@/context/AuthContext";
import Loader from "../ui/Loader";

// Validation schema for Aadhaar
const validationSchema = yup.object({
  aadhaar: yup
    .string()
    .matches(/^\d{12}$/, "Invalid Aadhaar format. It must be 12 digits.")
    .required("Aadhaar number is required"),
});

const AadhaarVerification = () => {
  const [verificationStatus, setVerificationStatus] = useState(null);
  const [aadhaarDetails, setAadhaarDetails] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const { loading, setLoading, api_key } = useContext(AuthContext);

  const formik = useFormik({
    initialValues: {
      aadhaar: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        setLoading(true);
        const response = await axios.post(
          `${import.meta.env.VITE_APP_BACKEND_URL}/ekyc-verification`,
          {
            type: "ADV",
            id: String(values.aadhaar),
          },
          {
            headers: {
              Authorization: `Bearer ${api_key}`,
              "Content-Type": "application/json",
            },
          }
        );
        setLoading(false);
        if (response.data && response.data.success) {
          setVerificationStatus("Success");
          setAadhaarDetails(response.data.data.response || {});
          toast.success(response.data.message || "Verification successful!");
        } else {
          setVerificationStatus("Failed");
          setAadhaarDetails(null);
          toast.error(response.data.message || "Verification failed!");
        }
      } catch (error) {
        setLoading(false);
        setVerificationStatus("Failed");
        setAadhaarDetails(null);
        toast.error(
          error.response?.data?.message ||
            "Error during verification. Please try again."
        );
      }
    },
  });

  return (
    <>
      {loading && <Loader />}
      <div
        className="relative w-full h-[92vh] sm:h-[92vh] flex justify-center border:none"
        // style={{ backgroundColor: "#15274F" }}
      >
        <Card className="h-fit w-full max-w-lg px-6 py-8 md:max-w-xl lg:max-w-2xl md:px-10 border-none">
          <CardHeader>
            <CardTitle className="text-center mt-2 tracking-wide  text-lg">
              Enter Aadhaar Number
            </CardTitle>
          </CardHeader>
          <CardContent className="w-full flex flex-col items-center">
            <form
              onSubmit={formik.handleSubmit}
              className="w-full flex flex-col items-center justify-start"
            >
              <div className="w-full text-sm max-w-sm mb-4">
                <Input
                  id="aadhaar"
                  name="aadhaar"
                  type="text"
                  placeholder="XXXXXXXXXXXX"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.aadhaar}
                  className="w-full border rounded-md p-3 px-6 text-start text-sm"
                />
                {formik.touched.aadhaar && formik.errors.aadhaar ? (
                  <div className="text-red-500 text-sm mt-2">
                    {formik.errors.aadhaar}
                  </div>
                ) : null}
              </div>

              <Button
                type="submit"
                className="w-full  max-w-sm bg-white-700 text-gray-400 py-2 rounded-md text-sm border-gray-300 border-2 mt-4 hover:bg-blue-50"
              >
                Submit
              </Button>
            </form>

            {/* Display Verification Result */}
            {verificationStatus && (
              <div className="absolute bottom-0 w-full  bg-green-100 rounded-md  flex flex-col items-start">
                <div
                  className={`text-base font-semibold border-y-2 border-gray-300 flex px-4 py-2  items-center justify-between w-full `}
                >
                  <div className="flex items-center  text-base  w-fit">
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
                  aadhaarDetails && (
                    <div className="mt-0 text-left text-gray-800 space-y-2 px-4 py-2 ">
                      <div>
                        <strong>Client ID:</strong> {aadhaarDetails.client_id}
                      </div>
                      <div>
                        <strong>Age Range:</strong> {aadhaarDetails.age_range}
                      </div>
                      <div>
                        <strong>Aadhaar Number:</strong>{" "}
                        {aadhaarDetails.aadhaar_number}
                      </div>
                      <div>
                        <strong>State:</strong> {aadhaarDetails.state}
                      </div>
                      <div>
                        <strong>Gender:</strong> {aadhaarDetails.gender}
                      </div>
                      <div>
                        <strong>Last Digits:</strong> XXXXXXX
                        {aadhaarDetails.last_digits}
                      </div>
                      <div>
                        <strong>Is Mobile Linked:</strong>{" "}
                        {aadhaarDetails.is_mobile ? "Yes" : "No"}
                      </div>
                    </div>
                  )}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default AadhaarVerification;
