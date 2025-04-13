import React, { useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { ReportLoader } from "../ui/Loader";
import { toast } from "react-toastify";

const validationSchema = yup.object({
  forename: yup.string().required("First name is required"),
  surname: yup.string().required("Last name is required"),
  identifierName: yup.string().required("Identifier type is required"),
  id: yup.string().required("Identification number is required"),
  street: yup.string().required("Street address is required"),
  city: yup.string().required("City is required"),
  postalCode: yup.string().required("Postal code is required"),
  region: yup.string().required("Region is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  dob: yup.string().required("Date of Birth is required"),
  phone: yup.number().required("Phone number is required"),
  gender: yup.string().required("Gender is required"),
  legalStatus: yup.string().required("Legal copy status is required"),
  consent: yup.boolean().required("Consent is required"),
});

// Call this function when needed

const CibilCreditForm = () => {
  const [loading, setLoading] = useState(false);
  const [reportUrl, setReportUrl] = useState(null);
  // const [showClick, setShowClick] = useState(false);

  const formik = useFormik({
    initialValues: {
      forename: "",
      surname: "",
      identifierName: "",
      id: "",
      street: "",
      city: "",
      postalCode: "",
      region: "",
      email: "",
      dob: "",
      phone: "",
      gender: "",
      legalStatus: "Accept",
      consent: true,
      responseType: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        setLoading(true);

        if (values.responseType === "HTML") {
          const response = await axios.post(
            `${import.meta.env.VITE_APP_BACKEND_URL}/cibil`,
            {
              CustomerInfo: {
                Name: { Forename: values.forename, Surname: values.surname },
                IdentificationNumber: {
                  IdentifierName: values.identifierName,
                  Id: values.id,
                },
                Address: {
                  StreetAddress: values.street,
                  City: values.city,
                  PostalCode: values.postalCode,
                  Region: values.region,
                  AddressType: 1,
                },
                EmailID: values.email,
                DateOfBirth: values.dob,
                PhoneNumber: { Number: values.phone },
                Gender: values.gender,
              },
              LegalCopyStatus: values.legalStatus,
              UserConsentForDataSharing: values.consent,
              responseType: values.responseType,
            },
            {
              withCredentials: true,
            }
          );
          if (!response.data) {
            throw new Error("No response data received");
          }

          if (!response.data.success) {
            throw new Error(response.data.message || "Verification failed!");
          }

          if (response.data.data?.Response?.Status === "error") {
            throw new Error(
              response.data.data.Response.Type || "Verification failed!"
            );
          }

          if (!response.data.htmlUrl) {
            throw new Error("No report URL received");
          }
          toast.success("Data fetched successfully!");
          setReportUrl(response.data.htmlUrl);
          formik.resetForm();
        } else {
          try {
            // Open blank window first to avoid popup blockers
            const printWindow = window.open("", "_blank");

            if (!printWindow) {
              throw new Error(
                "Popup blocked! Please allow pop-ups to print the report."
              );
            }

            // Now start fetching the PDF
            const fetchResponse = await fetch(
              `${import.meta.env.VITE_APP_BACKEND_URL}/cibil`,
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify({
                  CustomerInfo: {
                    Name: {
                      Forename: values.forename,
                      Surname: values.surname,
                    },
                    IdentificationNumber: {
                      IdentifierName: values.identifierName,
                      Id: values.id,
                    },
                    Address: {
                      StreetAddress: values.street,
                      City: values.city,
                      PostalCode: values.postalCode,
                      Region: values.region,
                      AddressType: 1,
                    },
                    EmailID: values.email,
                    DateOfBirth: values.dob,
                    PhoneNumber: { Number: values.phone },
                    Gender: values.gender,
                  },

                  LegalCopyStatus: values.legalStatus,
                  UserConsentForDataSharing: values.consent,
                  responseType: values.responseType,
                }),
              }
            );

            if (!fetchResponse.ok) {
              throw new Error("Failed to fetch the PDF.");
            }

            const blob = await fetchResponse.blob();
            const fileURL = URL.createObjectURL(blob);

            printWindow.location.href = fileURL;

            printWindow.onload = () => {
              printWindow.focus();
              printWindow.print();
            };
          } catch (err) {
            console.error("❌ Error printing PDF:", err);
            toast.error("Error printing PDF");
          }
        }
      } catch (error) {
        toast.error(error.message || "Error fetching Credit Report!");
        console.error("Error:", error.message || error);
      } finally {
        setLoading(false);
      }
    },
  });

  return (
    <>
      {loading && <ReportLoader />}

      <div className="relative w-full flex justify-center border-none">
        <Card className="h-fit w-full max-w-lg px-6 md:py-8 pb-8 pt-4 md:max-w-xl lg:max-w-2xl md:px-10 border-none">
          <CardHeader>
            <CardTitle className="text-center md:mt-2 mt-0 tracking-wide text-lg">
              CIBIL Credit Report
            </CardTitle>
          </CardHeader>
          <CardContent className="w-full flex flex-col items-center">
            <form
              onSubmit={formik.handleSubmit}
              className="w-full flex flex-col items-center justify-start"
            >
              {/* Other Fields */}
              {[
                "forename",
                "surname",
                "street",
                "city",
                "postalCode",
                "region",
                "email",
                "dob",
                "phone",
              ].map((field) => (
                <div className="w-full text-sm max-w-sm mb-4" key={field}>
                  <Input
                    id={field}
                    name={field}
                    placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                    {...formik.getFieldProps(field)}
                    className="w-full border rounded-md p-3 px-6 text-start text-sm"
                    type={field === "phone" ? "number" : "text"}
                  />
                  {formik.touched[field] && formik.errors[field] && (
                    <div className="text-red-500 text-sm mt-2">
                      {formik.errors[field]}
                    </div>
                  )}
                </div>
              ))}

              {/* Identifier Type Dropdown */}
              <div className="w-full text-sm max-w-sm mb-4">
                <select
                  id="identifierName"
                  name="identifierName"
                  {...formik.getFieldProps("identifierName")}
                  className="w-full border rounded-md p-3 px-6 text-start text-sm cursor-pointer"
                >
                  <option value="">Select Identifier Type</option>
                  {/* <option value="PAN">PAN</option> */}
                  <option value="TaxId">Tax ID</option>
                </select>
                {formik.touched.identifierName &&
                  formik.errors.identifierName && (
                    <div className="text-red-500 text-sm mt-2">
                      {formik.errors.identifierName}
                    </div>
                  )}
              </div>

              {/* Identification Number */}
              <div className="w-full text-sm max-w-sm mb-4">
                <Input
                  id="id"
                  name="id"
                  placeholder="Identification Number"
                  {...formik.getFieldProps("id")}
                  className="w-full border rounded-md p-3 px-6 text-start text-sm"
                />
                {formik.touched.id && formik.errors.id && (
                  <div className="text-red-500 text-sm mt-2">
                    {formik.errors.id}
                  </div>
                )}
              </div>
              {/* Gender Dropdown */}
              <div className="w-full text-sm max-w-sm mb-4">
                <select
                  id="gender"
                  name="gender"
                  {...formik.getFieldProps("gender")}
                  className="w-full border rounded-md p-3 px-6 text-start text-sm cursor-pointer"
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              {/* Response Type Dropdown */}
              <div className="w-full text-sm max-w-sm mb-4">
                <select
                  id="responseType"
                  name="responseType"
                  {...formik.getFieldProps("responseType")}
                  className="w-full border rounded-md p-3 px-6 text-start text-sm cursor-pointer"
                >
                  <option value="">Select Response Type</option>
                  <option value="HTML">HTML</option>
                  {/* <option value="PDf">PDF</option> */}
                </select>
                {formik.touched.responseType && formik.errors.responseType && (
                  <div className="text-red-500 text-sm mt-2">
                    {formik.errors.responseType}
                  </div>
                )}
              </div>
              {reportUrl ? (
                <a
                  href={reportUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cursor-pointer w-full max-w-sm inline-block text-center bg-green-700 text-white py-2 rounded-md text-sm border-gray-300 border-2 mt-4 hover:bg-green-800"
                >
                  Click Here to View Report
                </a>
              ) : (
                <Button
                  type="submit"
                  className="cursor-pointer w-full max-w-sm bg-white-700 text-white py-2 rounded-md text-sm border-gray-300 border-2 mt-4 hover:bg-blue-50"
                  style={{ backgroundColor: "#050D2D" }}
                >
                  Fetch Credit Report
                </Button>
              )}
            </form>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default CibilCreditForm;
