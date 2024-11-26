import React, { useContext, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";
import { toast } from "react-toastify";
import { FaChevronDown } from "react-icons/fa";
import { AuthContext } from "@/context/AuthContext";
import Loader from "../ui/Loader";
import { formatCreditReport, handlePrint } from "@/lib/formatCreditReport";
import { FaArrowRightLong } from "react-icons/fa6";
// import ReportView from "./ReportView";

// Validation schema
const validationSchema = yup.object({
  firstName: yup.string().required("First Name is required"),
  lastName: yup.string().required("Last Name is required"),
  dob: yup
    .string()
    .matches(
      /^\d{4}-\d{2}-\d{2}$/,
      "Date of Birth must be in YYYY-MM-DD format"
    )
    .required("Date of Birth is required"),
  address: yup.string().required("Address is required"),
  state: yup.string().required("State is required"),
  postal: yup
    .string()
    .matches(/^\d{6}$/, "Postal code must be 6 digits")
    .required("Postal code is required"),
  mobile: yup
    .string()
    .matches(/^\d{10}$/, "Mobile number must be 10 digits")
    .required("Mobile number is required"),
  idValue: yup.string().required("ID Value is required"),
});

const EquifaxCreditReport = () => {
  const [reportStatus, setReportStatus] = useState(null);
  const [creditReport, setCreditReport] = useState(null);
  const [htmlReport, setHtmlReport] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { loading, setLoading, api_key } = useContext(AuthContext);

  const printRef = useRef();

  const formik = useFormik({
    initialValues: {
      firstName: "",
      middleName: "",
      lastName: "",
      dob: "",
      address: "",
      state: "",
      postal: "",
      mobile: "",
      idValue: "",
      responseType: "JSON",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        setLoading(true);
        const payload = {
          api_key: { api_key },
          type: "EQCR",
          response_type: values.responseType,
          eqreporttype: "",
          FirstName: values.firstName,
          MiddleName: values.middleName,
          LastName: values.lastName,
          DOB: values.dob,
          Address: values.address,
          State: values.state,
          Postal: values.postal,
          MobileNumber: values.mobile,
          IDValue: values.idValue,
        };

        const response = await axios.post(
          `${import.meta.env.VITE_APP_BACKEND_URL}/equifax`,
          payload,
          {
            headers: {
              Authorization: `Bearer ${api_key}`,
              "Content-Type": "application/json",
            },
          }
        );
        setLoading(false);
        if (response.data) {
          if (payload.response_type === "JSON" && response.data.success) {
            setReportStatus("Success");
            setHtmlReport(null);
            setCreditReport(response.data.data.response || {});
            toast.success(
              response.data.message || "Credit report fetched successfully!"
            );
          } else if (payload.response_type === "HTML") {
            setReportStatus("Success");
            setCreditReport(null);
            setHtmlReport(response.data.data); // Handle the HTML response
            setIsModalOpen(true);
            setShowDropdown(true);
            toast.success("Credit report fetched successfully!");
          } else {
            setReportStatus("Failed");
            setCreditReport(null);
            setHtmlReport(null);
            toast.error(
              response.data.message || "Failed to fetch the credit report!"
            );
          }
        }
      } catch (error) {
        setLoading(false);

        console.error("Error:", error);
        setReportStatus("Failed");
        setCreditReport(null);
        setHtmlReport(null);
        toast.error(
          error.response?.data?.message ||
            "Error while fetching the credit report. Please try again."
        );
      }
    },
  });

  return (
    <>
      {loading && <Loader />}

      <div className="relative w-full flex justify-center">
        <Card className="h-fit w-full max-w-lg px-6 md:py-8 pb-8 pt-4 md:max-w-xl lg:max-w-2xl md:px-10 border-none">
          <CardHeader>
            <CardTitle className="text-center md:mt-2 mt-0 tracking-wide text-lg ">
              Equifax Credit Report
            </CardTitle>
          </CardHeader>
          <CardContent className="w-full flex flex-col items-center">
            <form
              onSubmit={formik.handleSubmit}
              className="w-full flex flex-col items-center justify-start"
            >
              <div className="w-full text-sm max-w-sm mb-4">
                <Input
                  id="firstName"
                  name="firstName"
                  type="text"
                  placeholder="First Name"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.firstName}
                  className="w-full border rounded-md p-3 px-6 text-start text-sm"
                />
                {formik.touched.firstName && formik.errors.firstName ? (
                  <div className="text-red-500 text-sm mt-2">
                    {formik.errors.firstName}
                  </div>
                ) : null}
              </div>

              <div className="w-full text-sm max-w-sm mb-4">
                <Input
                  id="middleName"
                  name="middleName"
                  type="text"
                  placeholder="Middle Name (Optional)"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.middleName}
                  className="w-full border rounded-md p-3 px-6 text-start text-sm"
                />
              </div>

              <div className="w-full text-sm max-w-sm mb-4">
                <Input
                  id="lastName"
                  name="lastName"
                  type="text"
                  placeholder="Last Name"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.lastName}
                  className="w-full border rounded-md p-3 px-6 text-start text-sm"
                />
                {formik.touched.lastName && formik.errors.lastName ? (
                  <div className="text-red-500 text-sm mt-2">
                    {formik.errors.lastName}
                  </div>
                ) : null}
              </div>

              <div className="w-full text-sm max-w-sm mb-4">
                <Input
                  id="dob"
                  name="dob"
                  type="text"
                  placeholder="Date of Birth (YYYY-MM-DD)"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.dob}
                  className="w-full border rounded-md p-3 px-6 text-start text-sm"
                />
                {formik.touched.dob && formik.errors.dob ? (
                  <div className="text-red-500 text-sm mt-2">
                    {formik.errors.dob}
                  </div>
                ) : null}
              </div>

              <div className="w-full text-sm max-w-sm mb-4">
                <Input
                  id="address"
                  name="address"
                  type="text"
                  placeholder="Address"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.address}
                  className="w-full border rounded-md p-3 px-6 text-start text-sm"
                />
                {formik.touched.address && formik.errors.address ? (
                  <div className="text-red-500 text-sm mt-2">
                    {formik.errors.address}
                  </div>
                ) : null}
              </div>

              <div className="w-full text-sm max-w-sm mb-4">
                <Input
                  id="state"
                  name="state"
                  type="text"
                  placeholder="State"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.state}
                  className="w-full border rounded-md p-3 px-6 text-start text-sm"
                />
                {formik.touched.state && formik.errors.state ? (
                  <div className="text-red-500 text-sm mt-2">
                    {formik.errors.state}
                  </div>
                ) : null}
              </div>

              <div className="w-full text-sm max-w-sm mb-4">
                <Input
                  id="postal"
                  name="postal"
                  type="text"
                  placeholder="Postal Code (6 digits)"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.postal}
                  className="w-full border rounded-md p-3 px-6 text-start text-sm"
                />
                {formik.touched.postal && formik.errors.postal ? (
                  <div className="text-red-500 text-sm mt-2">
                    {formik.errors.postal}
                  </div>
                ) : null}
              </div>

              <div className="w-full text-sm max-w-sm mb-4">
                <Input
                  id="mobile"
                  name="mobile"
                  type="text"
                  placeholder="Mobile Number (10 digits)"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.mobile}
                  className="w-full border rounded-md p-3 px-6 text-start text-sm"
                />
                {formik.touched.mobile && formik.errors.mobile ? (
                  <div className="text-red-500 text-sm mt-2">
                    {formik.errors.mobile}
                  </div>
                ) : null}
              </div>

              <div className="w-full text-sm max-w-sm mb-4">
                <Input
                  id="idValue"
                  name="idValue"
                  type="text"
                  placeholder="ID Value"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.idValue}
                  className="w-full border rounded-md p-3 px-6 text-start text-sm"
                />
                {formik.touched.idValue && formik.errors.idValue ? (
                  <div className="text-red-500 text-sm mt-2">
                    {formik.errors.idValue}
                  </div>
                ) : null}
              </div>
              <div className="w-full text-sm max-w-sm mb-4">
                <label
                  htmlFor="responseType"
                  className="block text-gray-600 mb-2"
                >
                  Response Type
                </label>
                <select
                  id="responseType"
                  name="responseType"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.responseType}
                  className="w-full border rounded-md p-3 px-6 text-start text-sm"
                >
                  <option value="JSON">JSON</option>
                  <option value="HTML">HTML</option>
                </select>
                {formik.touched.responseType && formik.errors.responseType ? (
                  <div className="text-red-500 text-sm mt-2">
                    {formik.errors.responseType}
                  </div>
                ) : null}
              </div>

              <Button
                type="submit"
                className="w-full max-w-sm bg-white-700 text-gray-400 py-2 rounded-md text-sm border-gray-300 border-2 mt-4 hover:bg-blue-50"
              >
                Fetch Credit Report
              </Button>
            </form>

            {/* Display Credit Report Result */}
            {reportStatus && (
              <div className="absolute bottom-0 w-full bg-green-100 rounded-md flex flex-col items-start">
                <div className="text-base font-semibold border-y-2 border-gray-300 px-4 py-2 flex items-center justify-between w-full">
                  <div className="flex items-center text-base w-fit">
                    Status
                    <FaArrowRightLong className="mx-2" />
                    <span
                      className={`${
                        reportStatus === "Success"
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      {reportStatus}
                    </span>
                  </div>
                  <FaChevronDown
                    onClick={() => {
                      setShowDropdown(!showDropdown);
                      setIsModalOpen(!!htmlReport); // Use !! to coerce htmlReport into a boolean
                    }}
                    className={`ml-2 transition-transform cursor-pointer ${
                      showDropdown ? "rotate-180" : ""
                    }`}
                  />
                </div>

                {showDropdown && reportStatus === "Success" && (
                  <>
                    {creditReport && (
                      <div className="mt-0 text-left text-gray-800 space-y-2 px-4 py-2 ">
                        <div>
                          <strong>Client ID:</strong>{" "}
                          {creditReport.client_id || "No data available"}
                        </div>
                        <div>
                          <strong>Name:</strong>{" "}
                          {creditReport.name || "No data available"}
                        </div>
                        <div>
                          <strong>Date of Birth:</strong>{" "}
                          {creditReport.dob || "No data available"}
                        </div>
                        <div>
                          <strong>Address:</strong>{" "}
                          {creditReport.address || "No data available"}
                        </div>
                        <div>
                          <strong>Phone Number:</strong>{" "}
                          {creditReport.phone || "No data available"}
                        </div>
                        <div>
                          <strong>Email:</strong>{" "}
                          {creditReport.email || "No data available"}
                        </div>
                        <div>
                          <strong>Credit Score:</strong>{" "}
                          {creditReport.credit_score || "No data available"}
                        </div>
                        <div>
                          <strong>Inquiry Purpose:</strong>{" "}
                          {creditReport.inquiry_purpose || "No data available"}
                        </div>
                        <div>
                          <strong>Account Details:</strong>{" "}
                          {creditReport.account_details ? (
                            <ul className="list-disc pl-5">
                              {creditReport.account_details.map(
                                (account, index) => (
                                  <li key={index}>
                                    {account.type}: {account.balance}
                                  </li>
                                )
                              )}
                            </ul>
                          ) : (
                            "No data available"
                          )}
                        </div>
                        <div>
                          <strong>Enquiries:</strong>{" "}
                          {creditReport.enquiries ? (
                            <ul className="list-disc pl-5">
                              {creditReport.enquiries.map((enquiry, index) => (
                                <li key={index}>
                                  {enquiry.date} - {enquiry.purpose}
                                </li>
                              ))}
                            </ul>
                          ) : (
                            "No data available"
                          )}
                        </div>
                      </div>
                    )}

                    {/* Modal for HTML Report */}
                    {isModalOpen && htmlReport && (
                      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                        <div className="bg-white rounded-lg p-6 max-w-4xl w-full">
                          {/* <div className="flex justify-between items-center border-b pb-4">
                            <h2 className="text-xl font-semibold">
                            HTML Credit Report
                          </h2>
                         
                          </div> */}
                          <div
                            ref={printRef}
                            className="mt-4 overflow-y-auto"
                            dangerouslySetInnerHTML={{
                              __html: formatCreditReport(htmlReport),
                            }}
                          />
                          <div className="md:mt-4 mt-0 text-right">
                            <button
                              onClick={() => handlePrint(printRef)}
                              className="md:px-4 px-2 md:py-2 py-1  bg-blue-500 text-white rounded hover:bg-blue-600"
                            >
                              Print
                            </button>
                            <button
                              onClick={() => {
                                setShowDropdown(!showDropdown);
                                setIsModalOpen(false);
                              }}
                              className="text-gray-500 hover:text-gray-800 ml-2 "
                            >
                              Close
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default EquifaxCreditReport;
