import React, { useState } from "react";
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
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaChevronDown } from "react-icons/fa";

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
  const [showDropdown, setShowDropdown] = useState(false);

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
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        const payload = {
          api_key: `${import.meta.env.MY_API_KEY}`,
          type: "EQCR",
          response_type: "JSON",
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
              Authorization: `Bearer ${import.meta.env.VITE_MY_API_KEY}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (response.data && response.data.success) {
          setReportStatus("Success");
          setCreditReport(response.data);
          setCreditReport(response.data.data.response || {});
          toast.success(
            response.data.message || "Credit report fetched successfully!"
          );
        } else {
          setReportStatus("Failed");
          setCreditReport(null);
          toast.error(
            response.data.message || "Failed to fetch the credit report!"
          );
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
    <div className="relative w-full h-[92vh] sm:h-[100vh] flex justify-center">
      <Card className="h-fit w-full max-w-lg px-6 py-8 md:max-w-xl lg:max-w-2xl md:px-10 border-none">
        <CardHeader>
          <CardTitle className="text-center mt-2 tracking-wide text-lg ">
            Equifax Credit Report
          </CardTitle>
        </CardHeader>
        <CardContent className="w-full flex flex-col items-center">
          <form
            onSubmit={formik.handleSubmit}
            className="w-full flex flex-col items-center justify-start"
          >
            {[
              { id: "firstName", placeholder: "First Name" },
              { id: "middleName", placeholder: "Middle Name" },
              { id: "lastName", placeholder: "Last Name" },
              { id: "dob", placeholder: "Date of Birth (YYYY-MM-DD)" },
              { id: "address", placeholder: "Address" },
              { id: "state", placeholder: "State" },
              { id: "postal", placeholder: "Postal Code" },
              { id: "mobile", placeholder: "Mobile Number" },
              { id: "idValue", placeholder: "ID Value (e.g., PAN)" },
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
                    {creditReport.credit_report?.CreditProfileHeader?.ReportDate
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
                    {creditReport.credit_report?.CreditProfileHeader?.ReportTime
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
                    {creditReport.credit_report?.CreditProfileHeader
                      ?.ReportNumber || "No data available"}
                  </div>
                  <div>
                    <strong>Total CAPS Last 7 Days:</strong>{" "}
                    {creditReport.credit_report?.TotalCAPS_Summary
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

export default EquifaxCreditReport;
