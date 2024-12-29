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

// Validation schema for PAN
const validationSchema = yup.object({
  pan: yup
    .string()
    .matches(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/, "Invalid PAN format")
    .required("PAN is required"),
});

const PanVerification = () => {
  const [verificationStatus, setVerificationStatus] = useState(null);
  const [panDetails, setPanDetails] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const { loading, setLoading, api_key } = useContext(AuthContext);

  const formik = useFormik({
    initialValues: {
      pan: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        setLoading(true);
        const response = await axios.post(
          `${import.meta.env.VITE_APP_BACKEND_URL}/ekyc-verification`,
          {
            id: values.pan,
            type: "PID",
          },
          {
            withCredentials: true,
          }
        );
        setLoading(false);

        if (response.data && response.data.success) {
          setVerificationStatus("Success");

          setPanDetails(response.data.data.response || {});
          toast.success(response.data.message || "Verification successful!");
          setShowDropdown(true);
        } else {
          setVerificationStatus("Failed");
          setPanDetails(null);
          toast.error(response.data.message || "Verification failed!");
        }
      } catch (error) {
        setLoading(false);
        setVerificationStatus("Failed");
        setPanDetails(null);
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
              Enter PAN Number
            </CardTitle>
          </CardHeader>
          <CardContent className="w-full flex flex-col items-center">
            <form
              onSubmit={formik.handleSubmit}
              className="w-full flex flex-col items-center justify-start"
            >
              <div className="w-full text-sm max-w-sm mb-4">
                <Input
                  id="pan"
                  name="pan"
                  type="text"
                  placeholder="ABCDE1234F"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.pan}
                  className="w-full border rounded-md p-3 px-6 text-start text-base"
                />
                {formik.touched.pan && formik.errors.pan ? (
                  <div className="text-red-500 text-sm mt-2">
                    {formik.errors.pan}
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
              <div className="absolute bottom-0  w-full bg-green-100 rounded-md flex flex-col items-start">
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
                    onClick={() => setShowDropdown(!showDropdown)}
                    className={`ml-2 transition-transform cursor-pointer ${
                      showDropdown ? "rotate-180" : ""
                    }`}
                  />
                </div>

                {showDropdown &&
                  verificationStatus === "Success" &&
                  panDetails && (
                    <div className="mt-0 text-left text-gray-800 space-y-2 px-4 py-2 ">
                      <div>
                        <strong>Full Name:</strong>{" "}
                        {panDetails.full_name || "N/A"}
                      </div>
                      <div>
                        <strong>PAN Number:</strong>{" "}
                        {panDetails.pan_number || "N/A"}
                      </div>
                      <div>
                        <strong>State:</strong> {panDetails.state || "N/A"}
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

export default PanVerification;
