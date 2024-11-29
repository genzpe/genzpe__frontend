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

// Validation schema for Bank Account
const validationSchema = yup.object({
  accountNumber: yup
    .string()
    .matches(/^\d{9,18}$/, "Invalid Account Number. It must be 9-18 digits.")
    .required("Account number is required"),
  ifsc: yup
    .string()
    .matches(
      /^[A-Z]{4}0[A-Z0-9]{6}$/,
      "Invalid IFSC code. It must follow the format XXXX0YYYYYY."
    )
    .required("IFSC code is required"),
});

const BankAccountVerification = () => {
  const [verificationStatus, setVerificationStatus] = useState(null);
  const [accountDetails, setAccountDetails] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const { loading, setLoading, api_key } = useContext(AuthContext);

  const formik = useFormik({
    initialValues: {
      accountNumber: "",
      ifsc: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        setLoading(true);
        const response = await axios.post(
          `${import.meta.env.VITE_APP_BACKEND_URL}/ekyc-verification`,
          {
            type: "BID",
            id: values.accountNumber,
            id_2: values.ifsc,
          },
          {
            withCredentials: true,
          }
        );
        setLoading(false);
        if (response.data && response.data.success) {
          setVerificationStatus("Success");
          setAccountDetails(response.data.data.response || {});
          toast.success(response.data.message || "Verification successful!");
        } else {
          setVerificationStatus("Failed");
          setAccountDetails(null);
          toast.error(response.data.message || "Verification failed!");
        }
      } catch (error) {
        setLoading(false);
        setVerificationStatus("Failed");
        setAccountDetails(null);
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

      <div className="relative w-full h-[91vh] sm:[92vh] flex justify-center border:none">
        <Card className="h-fit w-full max-w-lg px-6 py-8 md:max-w-xl lg:max-w-2xl md:px-10 border-none">
          <CardHeader>
            <CardTitle className="text-center mt-2 tracking-wide text-lg">
              Enter Bank Account Details
            </CardTitle>
          </CardHeader>
          <CardContent className="w-full flex flex-col items-center">
            <form
              onSubmit={formik.handleSubmit}
              className="w-full flex flex-col items-center justify-start"
            >
              <div className="w-full text-sm max-w-sm mb-4">
                <Input
                  id="accountNumber"
                  name="accountNumber"
                  type="text"
                  placeholder="Enter Account Number"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.accountNumber}
                  className="w-full border rounded-md p-3 px-6 text-start text-sm"
                />
                {formik.touched.accountNumber && formik.errors.accountNumber ? (
                  <div className="text-red-500 text-sm mt-2">
                    {formik.errors.accountNumber}
                  </div>
                ) : null}
              </div>

              <div className="w-full text-sm max-w-sm mb-4">
                <Input
                  id="ifsc"
                  name="ifsc"
                  type="text"
                  placeholder="Enter IFSC Code"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.ifsc}
                  className="w-full border rounded-md p-3 px-6 text-start text-sm"
                />
                {formik.touched.ifsc && formik.errors.ifsc ? (
                  <div className="text-red-500 text-sm mt-2">
                    {formik.errors.ifsc}
                  </div>
                ) : null}
              </div>

              <Button
                type="submit"
                className="w-full max-w-sm bg-white-700  py-2 rounded-md text-sm border-gray-300 border-2 mt-4 hover:bg-blue-50"
                style={{ backgroundColor: "#15274F" }}
              >
                Submit
              </Button>
            </form>

            {/* Display Verification Result */}
            {verificationStatus && (
              <div className="absolute bottom-0 w-full bg-green-100 rounded-md flex flex-col items-start">
                <div
                  className={`text-base font-semibold border-y-2 border-gray-300 flex px-4 py-2 items-center justify-between w-full `}
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
                  accountDetails && (
                    <div className="mt-0 text-left text-gray-800 space-y-2 px-4 py-2 ">
                      <div>
                        <strong>Client ID:</strong> {accountDetails.client_id}
                      </div>
                      <div>
                        <strong>Account Holder:</strong>{" "}
                        {accountDetails.full_name}
                      </div>
                      <div>
                        <strong>Account Exists:</strong>{" "}
                        {accountDetails.account_exists ? "Yes" : "No"}
                      </div>
                      <div>
                        <strong>UPI ID:</strong>{" "}
                        {accountDetails.upi_id
                          ? accountDetails.upi_id
                          : "Not Linked"}
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

export default BankAccountVerification;
