import React, { useContext, useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";
import { FaChevronDown } from "react-icons/fa";
import { toast } from "react-toastify";
import { FaArrowRightLong } from "react-icons/fa6";
import { Loader } from "./ui/Loader";
import { Card, CardHeader, CardTitle, CardContent } from "./ui/card";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { AuthContext } from "../context/AuthContext";

// Validation schema for Full Name and Mobile Number
const validationSchema = yup.object({
  fullname: yup
    .string()
    .min(2, "Full name should be at least 2 characters long")
    .required("Full name is required"),
  mobileNumber: yup
    .string()
    .matches(/^\d{10}$/, "Mobile number must be 10 digits.")
    .required("Mobile number is required"),
});

const Prefill = () => {
  const [verificationStatus, setVerificationStatus] = useState(null);
  const [accountDetails, setAccountDetails] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const { loading, setLoading } = useContext(AuthContext);

  const formik = useFormik({
    initialValues: {
      fullname: "",
      mobileNumber: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        setLoading(true);
        debugger;
        const response = await axios.post(
          `${import.meta.env.VITE_APP_BACKEND_URL}/prefill`,
          {
            type: "PRFL",
            fullname: values.fullname,
            mobileNumber: values.mobileNumber,
          },
          {
            withCredentials: true,
          }
        );
        setAccountDetails(
          response.data.data.result.CCRResponse?.CIRReportDataLst[0]
        );
        setVerificationStatus("Success");
        setShowDropdown(true);
        console.log(response);
        setLoading(false);
        toast.success("Verification successful!");
      } catch (error) {
        setLoading(false);
        setVerificationStatus("Failed");
        setAccountDetails(null);
        toast.error(
          error.response?.message ||
            "Error during verification. Please try again."
        );
      }
    },
  });

  const renderPersonalInfo = (personalInfo) => {
    return (
      <div>
        <h4 className="font-semibold">Personal Info:</h4>
        <p>
          <strong>Full Name:</strong> {personalInfo.Name.FullName}
        </p>
        <p>
          <strong>First Name:</strong> {personalInfo.Name.FirstName}
        </p>
        <p>
          <strong>Middle Name:</strong> {personalInfo.Name.MiddleName}
        </p>
        <p>
          <strong>Last Name:</strong> {personalInfo.Name.LastName}
        </p>
        <p>
          <strong>Date of Birth:</strong> {personalInfo.DateOfBirth}
        </p>
        <p>
          <strong>Gender:</strong> {personalInfo.Gender}
        </p>
        <p>
          <strong>Age:</strong> {personalInfo.Age.Age} years
        </p>
      </div>
    );
  };

  const renderAddressInfo = (addressInfo) => {
    return (
      <div>
        <h4 className="font-semibold">Address Info:</h4>
        {addressInfo.map((address, index) => (
          <div key={index} className="mb-2">
            <p>
              <strong>Address:</strong> {address.Address}
            </p>
            <p>
              <strong>State:</strong> {address.State}
            </p>
            <p>
              <strong>Postal Code:</strong> {address.Postal}
            </p>
            <p>
              <strong>Type:</strong> {address.Type}
            </p>
          </div>
        ))}
      </div>
    );
  };

  const renderPhoneInfo = (phoneInfo) => {
    return (
      <div>
        <h4 className="font-semibold">Phone Info:</h4>
        {phoneInfo.map((phone, index) => (
          <div key={index} className="mb-2">
            <p>
              <strong>Phone Number:</strong> {phone.Number}
            </p>
            <p>
              <strong>Phone Type:</strong> {phone.typeCode}
            </p>
          </div>
        ))}
      </div>
    );
  };

  const renderEmailInfo = (emailInfo) => {
    return (
      <div>
        <h4 className="font-semibold">Email Info:</h4>
        {emailInfo.map((email, index) => (
          <div key={index} className="mb-2">
            <p>
              <strong>Email Address:</strong>{" "}
              <span className="lowercase">{email.EmailAddress}</span>
            </p>
            <p>
              <strong>Reported Date:</strong> {email.ReportedDate}
            </p>
          </div>
        ))}
      </div>
    );
  };

  const renderIdentityInfo = (identityInfo) => {
    return (
      <div>
        <h4 className="font-semibold">Identity Info:</h4>
        {identityInfo?.PANId.map((pan, index) => (
          <div key={index} className="mb-2">
            <p>
              <strong>PAN Number:</strong> {pan.IdNumber}
            </p>
            <p>
              <strong>Reported Date:</strong> {pan.ReportedDate}
            </p>
          </div>
        ))}
        {identityInfo?.VoterID?.map((pan, index) => (
          <div key={index} className="mb-2">
            <p>
              <strong>VoterID Number:</strong> {pan.IdNumber}
            </p>
            <p>
              <strong>Reported Date:</strong> {pan.ReportedDate}
            </p>
          </div>
        ))}
        {identityInfo?.NationalIDCard?.map((pan, index) => (
          <div key={index} className="mb-2">
            <p>
              <strong>NationalIDCard Number:</strong> {pan.IdNumber}
            </p>
            <p>
              <strong>Reported Date:</strong> {pan.ReportedDate}
            </p>
          </div>
        ))}
        {identityInfo?.Passport?.map((pan, index) => (
          <div key={index} className="mb-2">
            <p>
              <strong>Passport Number:</strong> {pan.IdNumber}
            </p>
            <p>
              <strong>Reported Date:</strong> {pan.ReportedDate}
            </p>
          </div>
        ))}
        {identityInfo.DriverLicense?.map((pan, index) => (
          <div key={index} className="mb-2">
            <p>
              <strong>DriverLicense Number:</strong> {pan.IdNumber}
            </p>
            <p>
              <strong>Reported Date:</strong> {pan.ReportedDate}
            </p>
          </div>
        ))}
        {identityInfo.OtherId?.map((pan, index) => (
          <div key={index} className="mb-2">
            <p>
              <strong>OtherId Number:</strong> {pan.IdNumber}
            </p>
            <p>
              <strong>Reported Date:</strong> {pan.ReportedDate}
            </p>
          </div>
        ))}
      </div>
    );
  };

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
              {/* Full Name Input Field */}
              <div className="w-full text-sm max-w-sm mb-4">
                <Input
                  id="fullname"
                  name="fullname"
                  type="text"
                  placeholder="Enter Fullname"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.fullname}
                  className="w-full border rounded-md p-3 px-6 text-start text-base"
                />
                {formik.touched.fullname && formik.errors.fullname ? (
                  <div className="text-red-500 text-sm mt-2">
                    {formik.errors.fullname}
                  </div>
                ) : null}
              </div>

              {/* Mobile Number Input Field */}
              <div className="w-full text-sm max-w-sm mb-4">
                <Input
                  id="mobileNumber"
                  name="mobileNumber"
                  type="text"
                  placeholder="Enter Mobile Number"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.mobileNumber}
                  className="w-full border rounded-md p-3 px-6 text-start text-base"
                />
                {formik.touched.mobileNumber && formik.errors.mobileNumber ? (
                  <div className="text-red-500 text-sm mt-2">
                    {formik.errors.mobileNumber}
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

                {/* Display Account Details if available */}
                {showDropdown && accountDetails && (
                  <div
                    className="w-full  p-4  rounded-md max-h-80 overflow-y-auto"
                    style={{ maxHeight: "500px" }} // Set a fixed height to enable scrolling
                  >
                    {/* Personal Info */}
                    {renderPersonalInfo(
                      accountDetails.CIRReportData.IDAndContactInfo.PersonalInfo
                    )}
                    {/* Identity Info */}
                    {renderIdentityInfo(
                      accountDetails.CIRReportData.IDAndContactInfo.IdentityInfo
                    )}
                    {/* Address Info */}
                    {renderAddressInfo(
                      accountDetails.CIRReportData.IDAndContactInfo.AddressInfo
                    )}

                    {/* Phone Info */}
                    {renderPhoneInfo(
                      accountDetails.CIRReportData.IDAndContactInfo.PhoneInfo
                    )}

                    {/* Email Info */}
                    {renderEmailInfo(
                      accountDetails.CIRReportData.IDAndContactInfo
                        .EmailAddressInfo
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

export default Prefill;
