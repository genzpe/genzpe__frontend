import React, { useContext, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";
import { toast } from "react-toastify";

import { FaChevronDown } from "react-icons/fa";
import { Link } from "react-router-dom";
import Loader from "../ui/Loader";
import { AuthContext } from "@/context/AuthContext";
import { FaArrowRightLong } from "react-icons/fa6";
import JSONPretty from "react-json-pretty";
import "react-json-pretty/themes/monikai.css";
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
  const [creditReportLink, setCreditReportLink] = useState(null);
  const { loading, setLoading, api_key } = useContext(AuthContext);
  const [isModalCreditOpen, setIsModalCreditOpen] = useState(false);

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
        setLoading(true);
        const payload = {
          api_key: { api_key },
          type: "EXP",
          Name: values.name,
          MobileNumber: values.mobile,
          Pan: values.pan,
          FType: values.fType,
        };

        const response = await axios.post(
          `${import.meta.env.VITE_APP_BACKEND_URL}/experian`,
          payload,
          { withCredentials: true }
        );
        setLoading(false);

        if (response.status === 200) {
          setReportStatus("Success");

          if (values.fType === "JSON") {
            setCreditReport(response.data || {});
            setCreditReport(response.data.data);
            toast.success("Credit report fetched successfully!");
          } else {
            const creditReportLinkk = response?.data?.credit_report_link;
            if (!creditReportLinkk) {
              console.error("Failed to get credit report link.");
              return;
            }
            setCreditReportLink(creditReportLinkk);
            toast.success("Credit report PDF downloaded successfully!");
          }
        } else {
          setReportStatus("Failed");
          setCreditReport(null);
          toast.error("Failed to fetch the credit report!");
        }
      } catch (error) {
        setLoading(false);

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
    <>
      {loading && <Loader />}
      <div className="relative w-full h-[92vh] flex justify-center">
        <Card className="h-fit w-full max-w-lg px-6 md:py-8 pb-8 pt-4 md:max-w-xl lg:max-w-2xl md:px-10 border-none">
          <CardHeader>
            <CardTitle className="text-center md:mt-2 mt-0 tracking-wide text-lg">
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
                <div className="border w-full rounded-md">
                  <select
                    id="fType"
                    name="fType"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.fType}
                    className="w-[96%] p-3 outline-none "
                  >
                    <option value="JSON">JSON</option>
                    <option value="PDF">PDF</option>
                  </select>
                </div>
                {formik.touched.fType && formik.errors.fType ? (
                  <div className="text-red-500 text-sm mt-2">
                    {formik.errors.fType}
                  </div>
                ) : null}
              </div>

              <Button
                type="submit"
                className={`w-full max-w-sm bg-white-700 text-white py-2 rounded-md text-sm border-gray-300 border-2 mt-4 hover:bg-blue-50 ${
                  creditReportLink
                    ? `bg-green-600 hover:bg-green-500 text-white`
                    : ""
                } `}
                style={{ backgroundColor: "#15274F" }}
              >
                {creditReportLink ? (
                  <Link
                    to={creditReportLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setCreditReportLink(null)}
                  >
                    View Credit Report
                  </Link>
                ) : (
                  `Fetch Credit Report`
                )}
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
                      setIsModalCreditOpen(!!creditReport);
                    }}
                    className={`ml-2 transition-transform cursor-pointer ${
                      showDropdown ? "rotate-180" : ""
                    }`}
                  />
                </div>

                {showDropdown &&
                  reportStatus === "Success" &&
                  isModalCreditOpen &&
                  creditReport && (
                    <div className="fixed  inset-0 bg-black bg-opacity-50 z-50 top-24 mx-auto flex items-center justify-center px-4 py-6">
                      <div className="relative max-w-4xl w-full h-auto bg-white rounded-lg overflow-hidden">
                        <JSONPretty
                          className="rounded-lg w-full h-[80vh] overflow-auto "
                          id="json-pretty"
                          data={creditReport}
                        />
                        <button
                          onClick={() => {
                            setShowDropdown(!showDropdown);
                            setIsModalOpen(false);
                          }}
                          className="absolute bottom-4 md:right-10 right-4 z-100 bg-white text-blue-500 hover:text-gray-800 rounded-lg p-2"
                        >
                          Close
                        </button>
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

export default ExperianCreditReport;
