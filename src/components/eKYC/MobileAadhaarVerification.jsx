import React, { useContext, useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";
import { FaChevronDown } from "react-icons/fa";
import { toast } from "react-toastify";
import { FaArrowRightLong } from "react-icons/fa6";
import { Loader } from "../ui/Loader";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { AuthContext } from "../../context/AuthContext";
// Validation schema for Aadhaar
const validationSchema = yup.object({
  aadhaarNumber: yup
    .string()
    .matches(/^\d{12}$/, "Invalid Aadhaar format. It must be 12 digits.")
    .required("Aadhaar number is required"),
  mobileNumber: yup
    .string()
    .matches(
      /^[6-9]\d{9}$/,
      "Invalid mobile number. Must be 10 digits starting with 6-9."
    )
    .required("Mobile number is required"),
});

const MobileAadhaarVerification = () => {
  const [verificationStatus, setVerificationStatus] = useState(null);
  const [mobileaadhaarDetails, setMobileAadhaarDetails] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const { loading, setLoading } = useContext(AuthContext);

  const formik = useFormik({
    initialValues: {
      aadhaarNumber: "",
      mobileNumber: "",
    },

    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        setLoading(true);
        const response = await axios.post(
          `${import.meta.env.VITE_APP_BACKEND_URL}/mobile-aadhaar-verification`,
          {
            aadhaarNumber: values.aadhaarNumber,
            mobileNumber: values.mobileNumber,
          },
          { withCredentials: true }
        );
        setLoading(false);
        if (response.data && response.data.success) {
          setVerificationStatus("Success");
          setMobileAadhaarDetails(response.data.data.response || {});
          toast.success(response.data.message || "Verification successful!");
          setShowDropdown(true);
        } else {
          setVerificationStatus("Failed");
          setMobileAadhaarDetails(null);
          toast.error(response.data.message || "Verification failed!");
        }
      } catch (error) {
        setLoading(false);
        setVerificationStatus("Failed");
        setMobileAadhaarDetails(null);
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
        className="relative w-full   flex justify-center border-none"
        style={{ minHeight: "calc(100vh - 4.45rem)" }}
      >
        <Card className="h-fit w-full max-w-lg px-6 py-8 md:max-w-xl lg:max-w-2xl md:px-10 border-none">
          <CardHeader>
            <CardTitle className="text-center mt-2 tracking-wide  text-lg">
              Enter Mobile Aadhaar Numbers
            </CardTitle>
          </CardHeader>
          <CardContent className="w-full flex flex-col items-center">
            <form
              onSubmit={formik.handleSubmit}
              className="w-full flex flex-col items-center justify-start"
            >
              <div className="w-full text-sm max-w-sm mb-4">
                <Input
                  id="aadhaarNumber"
                  name="aadhaarNumber"
                  type="number"
                  placeholder="XXXXXXXXXXXX"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.aadhaar}
                  className="w-full border rounded-md p-3 px-6 text-start text-base"
                />
                {formik.touched.aadhaar && formik.errors.aadhaar ? (
                  <div className="text-red-500 text-sm mt-2">
                    {formik.errors.aadhaar}
                  </div>
                ) : null}
              </div>
              <div className="w-full text-sm max-w-sm mb-4">
                <Input
                  id="mobileNumber"
                  name="mobileNumber"
                  type="number"
                  placeholder="1234567890"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.aadhaar}
                  className="w-full border rounded-md p-3 px-6 text-start text-base"
                />
                {formik.touched.aadhaar && formik.errors.aadhaar ? (
                  <div className="text-red-500 text-sm mt-2">
                    {formik.errors.aadhaar}
                  </div>
                ) : null}
              </div>
              <Button
                type="submit"
                className="w-full  max-w-sm bg-white-700 py-2 rounded-md text-sm border-gray-300 border-2 mt-4 hover:bg-blue-50"
                style={{ backgroundColor: "#15274F" }}
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
                  mobileaadhaarDetails && (
                    <div className="mt-0 text-left text-gray-800 space-y-2 px-4 py-2 ">
                      <div>
                        <strong>Mobile Number:</strong>{" "}
                        {mobileaadhaarDetails.mobile_number}
                      </div>
                      <div>
                        <strong>Aadhaar Number:</strong>{" "}
                        {mobileaadhaarDetails.aadhaar_number}
                      </div>

                      <div>
                        <strong>Is Verification:</strong>{" "}
                        {mobileaadhaarDetails.is_mobile ? "True" : "False"}
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

export default MobileAadhaarVerification;
