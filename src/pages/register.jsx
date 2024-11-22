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
  const { login } = useContext(AuthContext);

  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };
  const toggleConfirmPasswordVisibility = () => {
    setConfirmPasswordVisible(!confirmPasswordVisible);
  };

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
        console.log(import.meta.env);

        const response = await fetch(
          `${import.meta.env.VITE_APP_BACKEND_URL}/auth/sign_up`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: true,
            body: JSON.stringify(submitValues),
          }
        );
        console.log("Register:", response);

        const result = await response.json();
        console.log("Register:", result);
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
        console.error("Error:", error);
        toast.error(`Registration failed: ${error.message}`);
      }
    },
  });

  return (
    <div className="relative w-full h-fit flex  justify-between  overflow-hidden">
      <img
        src={sidebackground}
        alt="BackgroundImage"
        className="max-w-[45%] max-h-[100vh]"
      />
      <Card className="h-full mt-20 mx-auto w-[65%] max-w-lg md:max-w-xl lg:max-w-2xl md:px-20 rounded-none border-none">
        <CardHeader>
          {" "}
          <img
            src={logoImage}
            className="m-auto w-[101px] h-[46px]"
            alt="Genzype"
          />
          <CardTitle className="text-center text-2xl ">Welcome!</CardTitle>
          <CardDescription className="text-center text-base">
            Register to start your journey
          </CardDescription>
        </CardHeader>
        <CardContent className="w-full flex flex-col items-center">
          <form
            onSubmit={formik.handleSubmit}
            className="w-full flex flex-col items-center"
          >
            <div className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg mb-4">
              <Input
                id="name"
                name="name"
                type="text"
                label="Name"
                placeholder="Enter full name"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.name}
                className="w-full"
              />
              {formik.touched.name && formik.errors.name ? (
                <div className="text-red-500 text-sm mt-2 flex justify-start">
                  {formik.errors.name}
                </div>
              ) : null}
            </div>
            <div className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg mb-4">
              <Input
                id="email"
                name="email"
                type="email"
                label="Email"
                placeholder="Enter email ID"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
                className="w-full"
              />
              {formik.touched.email && formik.errors.email ? (
                <div className="text-red-500 text-sm mt-2 flex justify-start">
                  {formik.errors.email}
                </div>
              ) : null}
            </div>
            <div className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg relative mb-4">
              <Input
                id="password"
                name="password"
                type={passwordVisible ? "text" : "password"}
                label="Password"
                placeholder="Password"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
                className="w-full"
                onCopy={(e) => e.preventDefault()}
                onPaste={(e) => e.preventDefault()}
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
                <div className="text-red-500 text-sm mt-2 flex justify-start">
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
                placeholder="Confirm Password"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.confirmPassword}
                className="w-full"
                onCopy={(e) => e.preventDefault()}
                onPaste={(e) => e.preventDefault()}
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
                <div className="text-red-500 text-sm mt-2 flex justify-start">
                  {formik.errors.confirmPassword}
                </div>
              ) : null}
            </div>
            <Button
              type="submit"
              className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg mt-4"
              style={{ backgroundColor: "#15274F" }}
            >
              Register
            </Button>
          </form>
          <div className="flex flex-row">
            <div className="mt-4 mr-4">Already have an account?</div>
            <div
              className="mt-4 text-[18px] font-semibold cursor-pointer"
              style={{ color: "#15274F", transition: "color 0.3s" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#15274F")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "#15274F")}
              onClick={() => navigate("/login")}
            >
              Login here
            </div>
          </div>
        </CardContent>
      </Card>

      {/* <div className="absolute bottom-0 lg:left-0 lg:p-4 pt-3 text-black lg:text-white">
        Copyright @ 2024 AltiusNxt Technologies
      </div> */}
    </div>
  );
};

export default Register;
