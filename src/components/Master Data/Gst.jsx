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
import JSONPretty from "react-json-pretty";
import "react-json-pretty/themes/monikai.css";
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
      <div className="relative w-full  h-[93vh] sm:h-[92vh] xl:h-[91vh] flex justify-center ">
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
                    <div className="fixed  inset-0 bg-black bg-opacity-65 z-50  mx-auto flex items-center justify-center px-4 py-6">
                      <div className="relative max-w-4xl w-full h-auto bg-white rounded-lg overflow-hidden">
                        <JSONPretty
                          className="rounded-lg w-full h-[80vh] overflow-auto "
                          id="json-pretty"
                          data={gstDetails}
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

export default Gst;
