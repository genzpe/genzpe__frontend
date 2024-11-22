import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaChevronDown } from "react-icons/fa";

// Validation schema
const validationSchema = yup.object({
  name: yup.string().required("Name is required"),
  mobile: yup
    .string()
    .matches(/^\d{10}$/, "Mobile number must be 10 digits")
    .required("Mobile number is required"),
  pan: yup
    .string()
    .matches(/^([A-Z]{5}[0-9]{4}[A-Z]{1})$/, "PAN must be in valid format")
    .required("PAN is required"),
  fType: yup
    .string()
    .oneOf(["PDF", "JSON"], "File type must be either PDF or JSON")
    .required("File type is required"),
});

const ExperianCreditReport = () => {
  const [reportStatus, setReportStatus] = useState(null);
  const [creditReport, setCreditReport] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);

  const formik = useFormik({
    initialValues: {
      name: "",
      mobile: "",
      pan: "",
      fType: "JSON",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        const payload = {
          api_key: `${import.meta.env.MY_API_KEY}`,
          type: "EXP",
          Name: values.name,
          MobileNumber: values.mobile,
          Pan: values.pan,
          FType: values.fType,
        };

        const response = await axios.post(
          `${import.meta.env.MY_API_KEY}/api/v1/experian`,
          payload,
          {
            headers: {
              Authorization: `Bearer ${import.meta.env.MY_API_KEY}`,
            },
          }
        );

        if (response.status === 200) {
          setReportStatus("Success");

          if (values.fType === "JSON") {
            setCreditReport(response.data || {});
            setCreditReport(response.data.data);
            toast.success("Credit report fetched successfully!");
          } else {
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement("a");
            link.href = url;
            link.setAttribute("download", "ExperianCreditReport.pdf");
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            toast.success("Credit report PDF downloaded successfully!");
          }
        } else {
          setReportStatus("Failed");
          setCreditReport(null);
          toast.error("Failed to fetch the credit report!");
        }
      } catch (error) {
        console.error("Error:", error);
        setReportStatus("Failed");
        setCreditReport(null);
        toast.error(
          error.response?.data?.message ||
            "Error while fetching the credit report. Please try again."
        );
      }
    },
  });

  return (
    <div className="relative w-full h-[92vh] flex justify-center">
      <Card className="h-fit w-full max-w-lg px-6 py-8 md:max-w-xl lg:max-w-2xl md:px-10 border-none">
        <CardHeader>
          <CardTitle className="text-center mt-2 tracking-wide text-lg">
            Experian Credit Report
          </CardTitle>
        </CardHeader>
        <CardContent className="w-full flex flex-col items-center">
          <form
            onSubmit={formik.handleSubmit}
            className="w-full flex flex-col items-center justify-start"
          >
            {[
              { id: "name", placeholder: "Full Name" },
              { id: "mobile", placeholder: "Mobile Number" },
              { id: "pan", placeholder: "PAN (e.g., ABCDE1234F)" },
            ].map((field) => (
              <div key={field.id} className="w-full text-sm max-w-sm mb-4">
                <Input
                  id={field.id}
                  name={field.id}
                  type="text"
                  placeholder={field.placeholder}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values[field.id]}
                  className="w-full border rounded-md p-3 px-6 text-start text-sm"
                />
                {formik.touched[field.id] && formik.errors[field.id] ? (
                  <div className="text-red-500 text-sm mt-2">
                    {formik.errors[field.id]}
                  </div>
                ) : null}
              </div>
            ))}

            {/* File Type Selection */}
            <div className="w-full max-w-sm mb-4">
              <label className="block mb-2 font-semibold text-sm text-gray-700">
                File Type
              </label>
              <select
                id="fType"
                name="fType"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.fType}
                className="w-full p-3 border rounded-md"
              >
                <option value="JSON">JSON</option>
                <option value="PDF">PDF</option>
              </select>
              {formik.touched.fType && formik.errors.fType ? (
                <div className="text-red-500 text-sm mt-2">
                  {formik.errors.fType}
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
                  Status:{" "}
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
                  onClick={() => setShowDropdown(!showDropdown)}
                  className={`ml-2 transition-transform cursor-pointer ${
                    showDropdown ? "rotate-180" : ""
                  }`}
                />
              </div>

              {showDropdown && reportStatus === "Success" && creditReport && (
                <div className="mt-4 text-left text-gray-800 space-y-2 p-4 border rounded shadow-sm">
                  <div>
                    <strong>Client ID:</strong>{" "}
                    {creditReport.client_id || "No data available"}
                  </div>
                  <div>
                    <strong>Name:</strong>{" "}
                    {creditReport.name || "No data available"}
                  </div>
                  <div>
                    <strong>Mobile:</strong>{" "}
                    {creditReport.mobile || "No data available"}
                  </div>
                  <div>
                    <strong>PAN:</strong>{" "}
                    {creditReport.pan || "No data available"}
                  </div>
                  <div>
                    <strong>Credit Score:</strong>{" "}
                    {creditReport.credit_score || "No data available"}
                  </div>
                  <div>
                    <strong>Report Date:</strong>{" "}
                    {creditReport.credit_report.CreditProfileHeader?.ReportDate
                      ? new Intl.DateTimeFormat("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        }).format(
                          new Date(
                            creditReport.credit_report.CreditProfileHeader.ReportDate
                          )
                        )
                      : "No data available"}
                  </div>
                  <div>
                    <strong>Report Time:</strong>{" "}
                    {creditReport.credit_report.CreditProfileHeader?.ReportTime
                      ? new Intl.DateTimeFormat("en-US", {
                          hour: "numeric",
                          minute: "numeric",
                          second: "numeric",
                          hour12: true,
                        }).format(
                          new Date(
                            creditReport.credit_report.CreditProfileHeader.ReportTime
                          )
                        )
                      : "No data available"}
                  </div>

                  <div>
                    <strong>Report Number:</strong>{" "}
                    {creditReport.credit_report.CreditProfileHeader
                      ?.ReportNumber || "No data available"}
                  </div>
                  {/* <div>
                    <strong>FCI Score:</strong>{" "}
                    {creditReport.SCORE?.FCIREXScore || "No data available"}
                  </div> */}
                  <div>
                    <strong>Total CAPS Last 7 Days:</strong>{" "}
                    {creditReport.credit_report.TotalCAPS_Summary
                      ?.TotalCAPSLast7Days || "No data available"}
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

export default ExperianCreditReport;
