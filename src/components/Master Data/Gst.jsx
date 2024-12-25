import React, { useContext, useState } from "react";

import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";
import { FaChevronDown } from "react-icons/fa";
import { toast } from "react-toastify";
import { FaArrowRightLong } from "react-icons/fa6";
import { Loader } from "../ui/Loader";

import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { AuthContext } from "../../context/AuthContext";
// Validation schema for GST
const validationSchema = yup.object({
  gst: yup
    .string()
    .matches(
      /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[A-Z0-9]{1}[Z]{1}[A-Z0-9]{1}$/,
      "Invalid GST format"
    )
    .required("GST number is required"),
});

const Gst = () => {
  const [verificationStatus, setVerificationStatus] = useState(null);
  const [gstDetails, setGstDetails] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const { loading, setLoading } = useContext(AuthContext);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const formik = useFormik({
    initialValues: {
      gst: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        setLoading(true);
        const response = await axios.post(
          `${import.meta.env.VITE_APP_BACKEND_URL}/ekyc-verification`,
          {
            id: values.gst,
            type: "GSTIN",
          },
          {
            withCredentials: true,
          }
        );
        setLoading(false);

        if (response.data && response.data.success) {
          setVerificationStatus("Success");
          setShowDropdown(true);
          setIsModalOpen(true);
          setGstDetails(response.data.data.response || {});
          toast.success(response.data.message || "Verification successful!");
        } else {
          setVerificationStatus("Failed");
          setGstDetails(null);
          toast.error(response.data.message || "Verification failed!");
        }
      } catch (error) {
        setLoading(false);
        setVerificationStatus("Failed");
        setGstDetails(null);
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
            <CardTitle className="text-center mt-2 tracking-wide text-lg text-gray-800">
              Enter GST Number
            </CardTitle>
          </CardHeader>
          <CardContent className="w-full flex flex-col items-center">
            <form
              onSubmit={formik.handleSubmit}
              className="w-full flex flex-col items-center justify-start"
            >
              <div className="w-full text-sm max-w-sm mb-4">
                <Input
                  id="gst"
                  name="gst"
                  type="text"
                  placeholder="12ABCDE1234A1AB"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.gst}
                  className="w-full border rounded-md p-3 px-6 text-start text-sm"
                />
                {formik.touched.gst && formik.errors.gst ? (
                  <div className="text-red-500 text-sm mt-2">
                    {formik.errors.gst}
                  </div>
                ) : null}
              </div>

              <Button
                type="submit"
                className={`w-full max-w-sm bg-white-700 py-2 rounded-md text-sm border-gray-300 border-2 mt-4 hover:bg-blue-50 `}
                style={{ backgroundColor: "#15274F" }}
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
                    onClick={() => {
                      setShowDropdown(!showDropdown);
                      setIsModalOpen(!!gstDetails);
                    }}
                    className={`ml-2 transition-transform cursor-pointer ${
                      showDropdown ? "rotate-180" : ""
                    }`}
                  />
                </div>

                {showDropdown &&
                  verificationStatus === "Success" &&
                  isModalOpen &&
                  gstDetails && (
                    <div className="bg-green-100 mt-4 text-left text-gray-800 space-y-4 px-4 py-2 w-full max-w-full h-[calc(100vh-8rem)] overflow-y-auto rounded-md shadow-md">
                      {/* Display Basic GST Details */}
                      <div className="w-full space-y-2">
                        <div>
                          <strong>GSTIN:</strong> {gstDetails.gstin || "N/A"}
                        </div>
                        <div>
                          <strong>Business Name:</strong>{" "}
                          {gstDetails.business_name || "N/A"}
                        </div>
                        <div>
                          <strong>Legal Name:</strong>{" "}
                          {gstDetails.legal_name || "N/A"}
                        </div>
                        <div>
                          <strong>State Jurisdiction:</strong>{" "}
                          {gstDetails.state_jurisdiction || "N/A"}
                        </div>
                        <div>
                          <strong>Date of Registration:</strong>{" "}
                          {gstDetails.date_of_registration || "N/A"}
                        </div>
                        <div>
                          <strong>Constitution of Business:</strong>{" "}
                          {gstDetails.constitution_of_business || "N/A"}
                        </div>
                        <div>
                          <strong>Taxpayer Type:</strong>{" "}
                          {gstDetails.taxpayer_type || "N/A"}
                        </div>
                        <div>
                          <strong>GSTIN Status:</strong>{" "}
                          {gstDetails.gstin_status || "N/A"}
                        </div>
                      </div>

                      {/* Display Filing Status Table */}
                      {gstDetails.filing_status &&
                        gstDetails.filing_status.length > 0 && (
                          <div className="overflow-x-auto w-full mt-4">
                            <h3 className="font-semibold text-gray-700 mb-2">
                              Filing Status:
                            </h3>
                            <table className="w-full bg-white border border-gray-200 rounded-md">
                              <thead>
                                <tr className="bg-gray-100 text-gray-700">
                                  <th className="px-4 py-2 text-left border">
                                    Return Type
                                  </th>
                                  <th className="px-4 py-2 text-left border">
                                    Financial Year
                                  </th>
                                  <th className="px-4 py-2 text-left border">
                                    Tax Period
                                  </th>
                                  <th className="px-4 py-2 text-left border">
                                    Date of Filing
                                  </th>
                                  <th className="px-4 py-2 text-left border">
                                    Status
                                  </th>
                                  <th className="px-4 py-2 text-left border">
                                    Mode of Filing
                                  </th>
                                </tr>
                              </thead>
                              <tbody>
                                {gstDetails.filing_status.flatMap(
                                  (filings, idx) =>
                                    filings.map((filing, i) => (
                                      <tr
                                        key={`${idx}-${i}`}
                                        className="text-sm text-gray-600 even:bg-gray-50"
                                      >
                                        <td className="px-4 py-2 border">
                                          {filing.return_type}
                                        </td>
                                        <td className="px-4 py-2 border">
                                          {filing.financial_year}
                                        </td>
                                        <td className="px-4 py-2 border">
                                          {filing.tax_period}
                                        </td>
                                        <td className="px-4 py-2 border">
                                          {filing.date_of_filing}
                                        </td>
                                        <td className="px-4 py-2 border">
                                          {filing.status}
                                        </td>
                                        <td className="px-4 py-2 border">
                                          {filing.mode_of_filing}
                                        </td>
                                      </tr>
                                    ))
                                )}
                              </tbody>
                            </table>
                          </div>
                        )}

                      {/* Additional Details */}
                      <div className="w-full space-y-2">
                        <div>
                          <strong>Address:</strong>{" "}
                          {gstDetails.address || "N/A"}
                        </div>
                        <div>
                          <strong>Nature of Business Activities:</strong>{" "}
                          {gstDetails.nature_bus_activities?.join(", ") ||
                            "N/A"}
                        </div>
                        <div>
                          <strong>Core Business Activity:</strong>{" "}
                          {gstDetails.nature_of_core_business_activity_description ||
                            "N/A"}
                        </div>
                        <div>
                          <strong>Aadhaar Validation:</strong>{" "}
                          {gstDetails.aadhaar_validation || "N/A"}
                        </div>
                        <div>
                          <strong>Aadhaar Validation Date:</strong>{" "}
                          {gstDetails.aadhaar_validation_date || "N/A"}
                        </div>
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

export default Gst;
