import React, { useContext, useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";

import logoImage from "../assets/logoLogin.png";
import sidebackground from "../assets/sideBackgroundAuth.png";
import { AuthContext } from "@/context/AuthContext";
import AuthLoader from "@/components/ui/AuthLoader";
const validationSchema = yup.object({
  password: yup.string().required("Password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match")
    .required("Confirm Password is required"),
  otp: yup.string().required("OTP is required"),
});

const ResetPassword = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const emailFromState = location.state?.email || "";
  const { loading, setLoading } = useContext(AuthContext);

  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const toggleConfirmPasswordVisibility = () => {
    setConfirmPasswordVisible(!confirmPasswordVisible);
  };

  const handleOtpInput = (e) => {
    e.target.value = e.target.value.replace(/[^0-9]/g, "");
  };

  const formik = useFormik({
    initialValues: {
      email: emailFromState,
      password: "",
      confirmPassword: "",
      otp: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      const { confirmPassword, ...submitValues } = values;
      console.log(submitValues);
      try {
        setLoading(true);
        const response = await fetch(
          `${import.meta.env.VITE_APP_BACKEND_URL}/auth/reset_password`,
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(submitValues),
          }
        );
        const result = await response.json();
        setLoading(false);
        if (response.ok) {
          toast.success(`${result.message}`);
          setTimeout(() => {
            navigate("/login");
          }, 2000);
        } else {
          toast.error(`Failed: ${result.message}`);
        }
      } catch (error) {
        setLoading(false);
        toast.error(`Error: ${error.message}`);
      }
    },
  });

  return (
    <>
      {loading && <AuthLoader />}

      <div className="relative w-full h-fit flex  justify-between  overflow-hidden ">
        <img
          src={sidebackground}
          alt="BackgroundImage"
          className="max-w-[45%] max-h-[100vh]"
        />
        <Card className="h-full mt-20 mx-auto w-[65%] max-w-lg md:max-w-xl lg:max-w-2xl md:px-20 rounded-none border-none">
          <img
            src={logoImage}
            className="m-auto w-[101px] h-[46px]"
            alt="Genzype"
          />
          <CardHeader>
            <CardTitle className="text-center mt-10">Reset Password</CardTitle>
            <CardDescription className="text-center pt-2">
              Enter your new password & OTP we send
            </CardDescription>
          </CardHeader>
          <CardContent className="w-full flex flex-col items-center">
            <form
              onSubmit={formik.handleSubmit}
              className="w-full flex flex-col items-center"
            >
              <div className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg relative mb-4">
                <Input
                  id="password"
                  name="password"
                  type={passwordVisible ? "text" : "password"}
                  label="Password"
                  placeholder="Enter new password"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.password}
                  onCopy={(e) => e.preventDefault()}
                  onPaste={(e) => e.preventDefault()}
                  className="w-full"
                />
                <div
                  className={`absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer text-gray-500 ${
                    formik.touched.password && formik.errors.password
                      ? "pb-6"
                      : ""
                  }`}
                  onClick={togglePasswordVisibility}
                >
                  {passwordVisible ? <FaEyeSlash /> : <FaEye />}
                </div>
                {formik.touched.password && formik.errors.password ? (
                  <div className="mt-2 flex justify-start text-red-500 text-sm">
                    {formik.errors.password}
                  </div>
                ) : null}
              </div>
              <div className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg relative mb-4">
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={confirmPasswordVisible ? "text" : "password"}
                  label="Confirm Password"
                  placeholder="Confirm new password"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.confirmPassword}
                  onCopy={(e) => e.preventDefault()}
                  onPaste={(e) => e.preventDefault()}
                  className="w-full"
                />
                <div
                  className={`absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer text-gray-500 ${
                    formik.touched.confirmPassword &&
                    formik.errors.confirmPassword
                      ? "pb-6"
                      : ""
                  }`}
                  onClick={toggleConfirmPasswordVisibility}
                >
                  {confirmPasswordVisible ? <FaEyeSlash /> : <FaEye />}
                </div>
                {formik.touched.confirmPassword &&
                formik.errors.confirmPassword ? (
                  <div className="mt-2 flex justify-start text-red-500 text-sm">
                    {formik.errors.confirmPassword}
                  </div>
                ) : null}
              </div>
              <div className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg mb-4">
                <Input
                  id="otp"
                  name="otp"
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  label="OTP"
                  placeholder="Enter the OTP"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  onInput={handleOtpInput}
                  value={formik.values.otp}
                  className="w-full"
                />
                {formik.touched.otp && formik.errors.otp ? (
                  <div className="mt-2 flex justify-start text-red-500 text-sm">
                    {formik.errors.otp}
                  </div>
                ) : null}
              </div>
              <Button
                type="submit"
                className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg mt-4"
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

export default ResetPassword;
