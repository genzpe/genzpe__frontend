import React, { useContext, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";
import { FaChevronDown } from "react-icons/fa";
import { toast } from "react-toastify";
import { FaArrowRightLong } from "react-icons/fa6";
import { AuthContext } from "@/context/AuthContext";
import Loader from "../ui/Loader";

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
  const { loading, setLoading, api_key } = useContext(AuthContext);

  const formik = useFormik({
    initialValues: {
      itrId: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        setLoading(true);
        debugger;
        const response = await axios.post(
          `${import.meta.env.VITE_APP_BACKEND_URL}/ekyc-verification`,
          {
            type: "ITRC",
            id: values.itrId,
          },
          { withCredentials: true }
        );
        setLoading(false);

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
        setLoading(false);
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
    <>
      {loading && <Loader />}

      <div className="relative w-full  h-[92vh] sm:h-[92vh] xl:h-[91vh] flex justify-center">
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
                className="w-full max-w-sm bg-white-700 py-2 rounded-md text-sm border-gray-300 border-2 mt-4 hover:bg-blue-50"
                style={{ backgroundColor: "#15274F" }}
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
                    <div className="mt-0 text-left text-gray-800 space-y-2 px-4 py-2">
                      {/* Displaying PAN Number */}
                      <div>
                        <strong>PAN Number:</strong>{" "}
                        {itrDetails.pan_number || "N/A"}
                      </div>

                      {/* Displaying PAN Status */}
                      <div>
                        <strong>PAN Status:</strong>{" "}
                        {itrDetails.pan_status || "N/A"}
                      </div>

                      {/* Displaying Client ID */}
                      <div>
                        <strong>Client ID:</strong>{" "}
                        {itrDetails.client_id || "N/A"}
                      </div>

                      {/* Displaying Compliant Status */}
                      <div>
                        <strong>Compliant:</strong>{" "}
                        {itrDetails.compliant ? "Yes" : "No"}
                      </div>

                      {/* Displaying Masked Name */}
                      <div>
                        <strong>Masked Name:</strong>{" "}
                        {itrDetails.masked_name || "N/A"}
                      </div>

                      {/* Displaying PAN-Aadhaar Linked Status */}
                      <div>
                        <strong>PAN-Aadhaar Linked:</strong>{" "}
                        {itrDetails.pan_aadhaar_linked || "N/A"}
                      </div>

                      {/* Displaying PAN Allotment Date */}
                      <div>
                        <strong>PAN Allotment Date:</strong>{" "}
                        {itrDetails.pan_allotment_date || "N/A"}
                      </div>

                      {/* Displaying Specified Person under Section 206 */}
                      <div>
                        <strong>Specified Person under Section 206:</strong>{" "}
                        {itrDetails.specified_person_under_206 || "N/A"}
                      </div>

                      {/* Displaying Valid PAN Status */}
                      <div>
                        <strong>Valid PAN:</strong>{" "}
                        {itrDetails.valid_pan ? "Yes" : "No"}
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

export default ItrVerification;
