import React, { useState, useContext } from "react";
import { useFormik } from "formik";
import axios from "axios";
import { toast } from "react-toastify";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";
import { AuthContext } from "../../context/AuthContext";
import { Loader } from "../ui/Loader";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { FaArrowRightLong } from "react-icons/fa6";
import { FaChevronDown } from "react-icons/fa";
import * as yup from "yup";

const validationSchema = yup.object({
  cin_number: yup
    .string()
    .matches(
      /^[LU][0-9]{5}[A-Z]{2}[0-9]{4}[A-Z]{3}[0-9]{6}$/,
      "Invalid CIN format"
    )
    .required("CIN number is required"),

  insta_api_key: yup
    .string()
    .matches(/^[a-zA-Z0-9\\/+=]{50,}$/, "Invalid API Key format")
    .required("API Key is required"),
});

const InstaFinancialBasic = () => {
  const [verificationStatus, setVerificationStatus] = useState(null);
  const [basicDetails, setBasicDetails] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const { loading, setLoading } = useContext(AuthContext);

  const formik = useFormik({
    initialValues: {
      cin_number: "",
      insta_api_key: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        setLoading(true);
        const response = await axios.post(
          `${import.meta.env.VITE_APP_BACKEND_URL}/financial/basic`,
          {
            cin_number: values.cin_number,
            insta_api_key: values.insta_api_key,
          },
          {
            withCredentials: true,
          }
        );
        if (response.data?.success !== true) {
          toast.error(response.data.message || "Verification failed!");
          setVerificationStatus("Failed");
          setBasicDetails(null);
          showDropdown(false);
        } else if (response.data.data?.Response?.Status === "error") {
          toast.error(
            response.data.data?.Response?.Type ||
              "Your API Key is Invalid or expired!"
          );
          setVerificationStatus("Failed");
          setBasicDetails(null);
          showDropdown(false);
        } else {
          setVerificationStatus("Success");
          setBasicDetails(response.data.data?.InstaBasic?.CompanyMasterBasic);
          toast.success("Data fetched successfully!");
          setShowDropdown(true);
        }
      } catch (error) {
        setVerificationStatus("Failed");
        toast.error(
          error.response?.data?.message || "Error fetching financial summary."
        );
        setBasicDetails(null);
      } finally {
        setLoading(false);
      }
    },
  });

  return (
    <>
      {loading && <Loader />}

      <div
        className="relative w-full flex justify-center border-none"
        style={{ minHeight: "calc(100vh - 4.45rem)" }}
      >
        <Card className="h-fit w-full max-w-lg px-6 py-8 md:max-w-xl lg:max-w-2xl md:px-10 border-none">
          <CardHeader>
            <CardTitle className="text-center mt-2 tracking-wide text-lg">
              Enter Details Here
            </CardTitle>
          </CardHeader>
          <CardContent className="w-full flex flex-col items-center">
            <form
              onSubmit={formik.handleSubmit}
              className="w-full flex flex-col items-center justify-start"
            >
              {/* CIN Number Input Field */}
              <div className="w-full text-sm max-w-sm mb-4">
                <Input
                  id="cin_number"
                  name="cin_number"
                  type="text"
                  placeholder="Enter CIN Number"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.cin_number}
                  className="w-full border rounded-md p-3 px-6 text-start text-base"
                />
                {formik.touched.cin_number && formik.errors.cin_number ? (
                  <div className="text-red-500 text-sm mt-2">
                    {formik.errors.cin_number}
                  </div>
                ) : null}
              </div>

              {/* Insta API Key Input Field */}
              <div className="w-full text-sm max-w-sm mb-4">
                <Input
                  id="insta_api_key"
                  name="insta_api_key"
                  type="text"
                  placeholder="Enter Secure Key"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.insta_api_key}
                  className="w-full border rounded-md p-3 px-6 text-start text-base"
                />
                {formik.touched.insta_api_key && formik.errors.insta_api_key ? (
                  <div className="text-red-500 text-sm mt-2">
                    {formik.errors.insta_api_key}
                  </div>
                ) : null}
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                className="w-full max-w-sm bg-white-700 py-2 rounded-md text-sm border-gray-300 border-2 mt-4 hover:bg-blue-50"
                style={{ backgroundColor: "#15274F" }}
              >
                Submit
              </Button>
            </form>

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
                    }}
                    className={`ml-2 transition-transform cursor-pointer ${
                      showDropdown ? "rotate-180" : ""
                    }`}
                  />
                </div>

                {showDropdown &&
                  verificationStatus === "Success" &&
                  setBasicDetails && (
                    <div className="bg-green-100 mt-4 text-left text-gray-800 space-y-2 px-4 py-1 w-full max-w-full h-[calc(100vh-20rem)] overflow-y-auto rounded-md shadow-md">
                      {Object.entries(basicDetails).map(([key, value]) => (
                        <div key={key}>
                          <strong>
                            {key.replace(/([A-Z])/g, " $1").trim()}:
                          </strong>{" "}
                          {value || "N/A"}
                        </div>
                      ))}
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

export default InstaFinancialBasic;
