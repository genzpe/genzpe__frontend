import React, { useState, useContext } from "react";
import { useFormik } from "formik";
import axios from "axios";
import { toast } from "react-toastify";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";
import { AuthContext } from "../../context/AuthContext";
import { Loader } from "../ui/Loader";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
const InstaFinancialSummary = () => {
  const [verificationStatus, setVerificationStatus] = useState(null);
  const [accountDetails, setAccountDetails] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const { loading, setLoading } = useContext(AuthContext);

  const formik = useFormik({
    initialValues: {
      cin_number: "",
      insta_api_key: "",
    },
    // validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        setLoading(true);
        const response = await axios.post(
          `${import.meta.env.VITE_APP_BACKEND_URL}/financial/summary`,
          {
            cin_number: values.cin_number,
            insta_api_key: values.insta_api_key,
          },
          {
            withCredentials: true,
          }
        );
        console.log(response.data);
        setSummaryData(response.data);
        toast.success("Data fetched successfully!");
      } catch (error) {
        toast.error(
          error.response?.data?.message || "Error fetching financial summary."
        );
        setSummaryData(null);
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
                  placeholder="Enter Insta API Key"
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
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default InstaFinancialSummary;
