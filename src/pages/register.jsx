import React, { useContext, useState } from "react";
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
import { useFormik } from "formik";
import * as yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "@/context/AuthContext";
import sidebackground from "../assets/sideBackgroundAuth.png";
import logoImage from "../assets/logoLogin.png";
import AuthLoader from "@/components/ui/AuthLoader";

// Validation Schema for Formik
const validationSchema = yup.object({
  name: yup.string().required("Name is required"),
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required"),
  password: yup
    .string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match")
    .required("Confirm Password is required"),
});

const Register = () => {
  const navigate = useNavigate();
  const { login, loading, setLoading } = useContext(AuthContext);

  // State for toggling password visibility
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      const { confirmPassword, ...submitValues } = values;
      try {
        setLoading(true);

        const response = await fetch(
          `${import.meta.env.VITE_APP_BACKEND_URL}/auth/sign_up`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify(submitValues),
          }
        );
        setLoading(false);
        const result = await response.json();
        if (response.ok) {
          toast.success(`${result.message}`);
          login("success");
          setTimeout(() => {
            navigate("/");
          }, 2000);
        } else {
          toast.error(`Registration failed: ${result.message}`);
        }
      } catch (error) {
        setLoading(false);
        console.error("Error:", error);
        toast.error(`Registration failed: ${error.message}`);
      }
    },
  });

  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} />
      {loading && <AuthLoader />}
      <div className="relative w-full h-fit flex justify-between overflow-hidden">
        <img
          src={sidebackground}
          alt="BackgroundImage"
          className="max-w-[45%] max-h-[100vh]"
        />
        <Card className="h-full mt-20 mx-auto w-[65%] max-w-lg md:max-w-xl lg:max-w-2xl rounded-lg border">
          <CardHeader>
            <img
              src={logoImage}
              className="m-auto w-[101px] h-[46px]"
              alt="Genzype"
            />
            <CardTitle className="text-center text-2xl">Welcome!</CardTitle>
            <CardDescription className="text-center text-base">
              Register to start your journey
            </CardDescription>
          </CardHeader>
          <CardContent className="w-full flex flex-col items-center">
            <form
              onSubmit={formik.handleSubmit}
              className="w-full flex flex-col items-center"
            >
              {/* Name Input */}
              <div className="w-full max-w-lg mb-4">
                <Input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Enter full name"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.name}
                  className="w-full"
                />
                {formik.touched.name && formik.errors.name && (
                  <div className="text-red-500 text-sm mt-2">
                    {formik.errors.name}
                  </div>
                )}
              </div>

              {/* Email Input */}
              <div className="w-full max-w-lg mb-4">
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Enter email ID"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.email}
                  className="w-full"
                />
                {formik.touched.email && formik.errors.email && (
                  <div className="text-red-500 text-sm mt-2">
                    {formik.errors.email}
                  </div>
                )}
              </div>

              {/* Password Input */}
              <div className="w-full max-w-lg relative mb-4">
                <Input
                  id="password"
                  name="password"
                  type={passwordVisible ? "text" : "password"}
                  placeholder="Password"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.password}
                  className="w-full"
                />
                <div
                  className="absolute inset-y-0 right-3 flex items-center cursor-pointer"
                  onClick={() => setPasswordVisible(!passwordVisible)}
                >
                  {passwordVisible ? <FaEyeSlash /> : <FaEye />}
                </div>
                {formik.touched.password && formik.errors.password && (
                  <div className="text-red-500 text-sm mt-2">
                    {formik.errors.password}
                  </div>
                )}
              </div>

              {/* Confirm Password Input */}
              <div className="w-full max-w-lg relative mb-4">
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={confirmPasswordVisible ? "text" : "password"}
                  placeholder="Confirm Password"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.confirmPassword}
                  className="w-full"
                />
                <div
                  className="absolute inset-y-0 right-3 flex items-center cursor-pointer"
                  onClick={() =>
                    setConfirmPasswordVisible(!confirmPasswordVisible)
                  }
                >
                  {confirmPasswordVisible ? <FaEyeSlash /> : <FaEye />}
                </div>
                {formik.touched.confirmPassword &&
                  formik.errors.confirmPassword && (
                    <div className="text-red-500 text-sm mt-2">
                      {formik.errors.confirmPassword}
                    </div>
                  )}
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                className="w-full max-w-lg mt-4"
                style={{ backgroundColor: "#15274F" }}
              >
                Register
              </Button>
            </form>

            {/* Redirect to Login */}
            <div className="mt-4 text-center">
              <span>Already have an account?</span>
              <span
                className="ml-2 text-blue-600 cursor-pointer font-semibold"
                onClick={() => navigate("/login")}
              >
                Login here
              </span>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default Register;
