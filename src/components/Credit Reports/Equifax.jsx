import React, { useContext, useRef, useState } from "react";

import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";
import { toast } from "react-toastify";
import { FaChevronDown } from "react-icons/fa";
import { AuthContext } from "../../context/AuthContext";
import Loader from "../ui/Loader";
// import { formatCreditReport, handlePrint } from "@/lib/formatCreditReport";
import { FaArrowRightLong } from "react-icons/fa6";
import JSONPretty from "react-json-pretty";
import "react-json-pretty/themes/monikai.css";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { formatCreditReport, handlePrint } from "../../lib/formatCreditReport";

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
  idValue: yup.string().required("PAN Number is required"),
});

const EquifaxCreditReport = () => {
  const [reportStatus, setReportStatus] = useState(null);
  const [creditReport, setCreditReport] = useState(null);
  const [htmlReport, setHtmlReport] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalCreditOpen, setIsModalCreditOpen] = useState(false);
  const { loading, setLoading } = useContext(AuthContext);

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
          type: "EQCR",
          response_type: values.responseType,
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
          { withCredentials: true }
        );
        setLoading(false);
        if (response.data) {
          if (payload.response_type === "JSON" && response.data.success) {
            setReportStatus("Success");

            setHtmlReport(null);
            setCreditReport(response.data.data || {});
            toast.success(
              response.data.message || "Credit report fetched successfully!"
            );
            setShowDropdown(true);
            setIsModalCreditOpen(true);
          } else if (payload.response_type === "HTML") {
            setReportStatus("Success");
            setCreditReport(null);
            setHtmlReport(response.data.data); // Handle the HTML response

            toast.success("Credit report fetched successfully!");
            setIsModalOpen(true);
            setShowDropdown(true);
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

      <div className="relative w-full   flex justify-center border-none">
        {" "}
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
                  placeholder="State (e.g MP, UP etc...)"
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
                  placeholder="Postal Code (e.g 453331)"
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
                  placeholder="PAN Number (e.g ABCDE1234R)"
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
                <div className="border w-full rounded-md bg-gray-100 text-sm px-3">
                  {" "}
                  <select
                    id="responseType"
                    name="responseType"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.responseType}
                    className="w-[100%] p-2 outline-none bg-inherit"
                  >
                    <option value="JSON">JSON</option>
                    <option value="HTML">HTML</option>
                  </select>
                </div>
                {formik.touched.responseType && formik.errors.responseType ? (
                  <div className="text-red-500 text-sm mt-2">
                    {formik.errors.responseType}
                  </div>
                ) : null}
              </div>

              <Button
                type="submit"
                className="w-full max-w-sm bg-white-700 text-white py-2 rounded-md text-sm border-gray-300 border-2 mt-4 hover:bg-blue-50"
                style={{ backgroundColor: "#050D2D" }}
              >
                Fetch Credit Report
              </Button>
            </form>

            {/* Display Credit Report Result */}
            {reportStatus && (
              <div className="absolute overflow-auto bottom-0 w-full bg-green-100 rounded-md flex flex-col items-start">
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
                      setIsModalOpen(!!htmlReport); // Use !! to coerce htmlReport into a boolean
                    }}
                    className={`ml-2 transition-transform cursor-pointer ${
                      showDropdown ? "rotate-180" : ""
                    }`}
                  />
                </div>

                {showDropdown && reportStatus === "Success" && (
                  <>
                    {/* {creditReport &&
                      JSON.stringify(creditReport, undefined, 10)} */}
                    {isModalCreditOpen && creditReport && (
                      <div className="fixed inset-0  bg-black bg-opacity-65 z-50  mx-auto flex items-center justify-center px-4 py-6">
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

                    {/* Modal for HTML Report */}
                    {isModalOpen && htmlReport && (
                      <div className="fixed overflow-auto  inset-0 z-50 flex items-start justify-center bg-black bg-opacity-65">
                        <div className="bg-white rounded-lg p-6 max-w-4xl w-full">
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
