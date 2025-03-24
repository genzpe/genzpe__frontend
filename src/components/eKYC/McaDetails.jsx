import React, { useContext, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { AuthContext } from "../../context/AuthContext";
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";
import { FaChevronDown } from "react-icons/fa";
import { toast } from "react-toastify";
import { FaArrowRightLong } from "react-icons/fa6";
import { Loader } from "../ui/Loader";

// Validation schema
const validationSchema = yup.object({
  entityId: yup
    .string()
    .matches(
      /^[LU][0-9]{5}[A-Z]{2}[0-9]{4}[A-Z]{3}[0-9]{6}$/,
      "Invalid CIN format"
    )
    .required("CIN is required"),
});

const McaDetails = () => {
  const [verificationStatus, setVerificationStatus] = useState(null);
  const [mcaDetails, setMcaDetails] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const { loading, setLoading } = useContext(AuthContext);

  const formik = useFormik({
    initialValues: {
      entityId: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        setLoading(true);
        const response = await axios.post(
          `${import.meta.env.VITE_APP_BACKEND_URL}/mca-company-details`,
          {
            entityId: values.entityId,
          },
          {
            withCredentials: true,
          }
        );
        setLoading(false);
        if (response.data && response.data.success) {
          setVerificationStatus("Success");

          setMcaDetails(response.data?.data?.responseData || {});
          toast.success(
            response?.data?.data?.message || "Verification successful!"
          );
          setShowDropdown(true);
        } else {
          setVerificationStatus("Failed");
          setMcaDetails(null);
          toast.error(response?.data?.data?.message || "Verification failed!");
        }
      } catch (error) {
        setLoading(false);
        setVerificationStatus("Failed");
        setMcaDetails(null);
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
        className="relative w-full   flex justify-center "
        style={{ minHeight: "calc(100vh - 4.45rem)" }}
      >
        <Card className="h-fit w-full max-w-lg px-6 py-8 md:max-w-xl lg:max-w-2xl md:px-10 border-none">
          <CardHeader>
            <CardTitle className="text-center mt-2 tracking-wide text-lg text-gray-800">
              Enter CIN Number
            </CardTitle>
          </CardHeader>
          <CardContent className="w-full flex flex-col items-center">
            <form
              onSubmit={formik.handleSubmit}
              className="w-full flex flex-col items-center justify-start"
            >
              <div className="w-full text-sm max-w-sm mb-4">
                <Input
                  id="entityId"
                  name="entityId"
                  type="text"
                  placeholder="Enter CIN Number"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.entityId}
                  className="w-full border rounded-md p-3 px-6 text-start text-base"
                />
                {formik.touched.entityId && formik.errors.entityId ? (
                  <div className="text-red-500 text-sm mt-2">
                    {formik.errors.entityId}
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
                <div className="text-base font-semibold border-y-2 border-gray-300 flex px-4 py-2 items-center justify-between w-full">
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
                  mcaDetails?.details && (
                    <div className="mt-4 text-left text-gray-800 space-y-2 px-4  shadow-lg rounded-lg max-h-[60vh] overflow-y-auto w-full">
                      {/* Company Info */}
                      <h2 className="text-lg font-semibold text-gray-900">
                        Company Information
                      </h2>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-2 rounded-lg">
                        {Object.entries(mcaDetails.details.company_info).map(
                          ([key, value]) => (
                            <div key={key}>
                              <strong className="capitalize">
                                {key.replace(/_/g, " ")}:
                              </strong>{" "}
                              {value || "N/A"}
                            </div>
                          )
                        )}
                      </div>

                      {/* Directors Table */}
                      <h3 className="text-lg font-semibold mt-4">Directors</h3>
                      {mcaDetails.details.directors.length > 0 ? (
                        <div className="overflow-x-auto bg-white rounded-lg">
                          <table className="min-w-full border border-gray-300">
                            <thead>
                              <tr className="bg-gray-200">
                                <th className="px-4 py-2 border">DIN Number</th>
                                <th className="px-4 py-2 border">
                                  Director Name
                                </th>
                                <th className="px-4 py-2 border">Start Date</th>
                                <th className="px-4 py-2 border">End Date</th>
                              </tr>
                            </thead>
                            <tbody>
                              {mcaDetails.details.directors.map(
                                (director, index) => (
                                  <tr key={index} className="border-t">
                                    <td className="px-4 py-2 border">
                                      {director.din_number || "N/A"}
                                    </td>
                                    <td className="px-4 py-2 border">
                                      {director.director_name || "N/A"}
                                    </td>
                                    <td className="px-4 py-2 border">
                                      {director.start_date || "N/A"}
                                    </td>
                                    <td className="px-4 py-2 border">
                                      {director.end_date || "N/A"}
                                    </td>
                                  </tr>
                                )
                              )}
                            </tbody>
                          </table>
                        </div>
                      ) : (
                        <p>No director details available.</p>
                      )}

                      {/* Charges Table */}
                      <h3 className="text-lg font-semibold mt-4">Charges</h3>
                      {mcaDetails.details.charges.length > 0 ? (
                        <div className="overflow-x-auto bg-white rounded-lg">
                          <table className="min-w-full border border-gray-300">
                            <thead>
                              <tr className="bg-gray-200">
                                {Object.keys(mcaDetails.details.charges[0]).map(
                                  (key, index) => (
                                    <th
                                      key={index}
                                      className="px-4 py-2 border capitalize"
                                    >
                                      {key.replace(/_/g, " ")}
                                    </th>
                                  )
                                )}
                              </tr>
                            </thead>
                            <tbody>
                              {mcaDetails.details.charges.map(
                                (charge, index) => (
                                  <tr key={index} className="border-t">
                                    {Object.values(charge).map((value, i) => (
                                      <td key={i} className="px-4 py-2 border">
                                        {value || "N/A"}
                                      </td>
                                    ))}
                                  </tr>
                                )
                              )}
                            </tbody>
                          </table>
                        </div>
                      ) : (
                        <p>No charges available.</p>
                      )}
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

export default McaDetails;
