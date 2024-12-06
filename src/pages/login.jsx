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
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "@/context/AuthContext";
import axios from "axios";
import logoImage from "../assets/logoLogin.png";
import sidebackground from "../assets/sideBackgroundAuth.png";
import AuthLoader from "@/components/ui/AuthLoader";
import { BsInfoCircle } from "react-icons/bs";

const validationSchema = yup.object({
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required"),
  password: yup.string().required("Password is required"),
});

const Login = () => {
  const { loading, setLoading } = useContext(AuthContext);

  const [passwordVisible, setPasswordVisible] = useState(false);
  const navigate = useNavigate();
  const { login, setApiKey, setToken, setEmail } = useContext(AuthContext);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        setLoading(true);
        const response = await axios.post(
          `${import.meta.env.VITE_APP_BACKEND_URL}/auth/sign_in`,
          values, // Send form values directly
          {
            withCredentials: true, // Ensures cookies are sent and received
          }
        );
        if (response.status === 200) {
          setApiKey(response.data.api_key);
          toast.success(`${response.data.message}`);
          setLoading(false);
          // console.log(response.data.token);
          setToken(response.data.token);
          setEmail(response.data.email);
          login(response.data.token); // Assuming `login` updates the auth state
          setTimeout(() => {
            navigate("/");
          }, 2000);
        } else {
          toast.error(`Login failed: ${response.data.message}`);
        }
      } catch (error) {
        console.error("Error:", error);

        if (error.response) {
          // Handle server errors
          toast.error(`Login failed: ${error.response.data.message}`);
          setLoading(false);
        } else if (error.request) {
          // Handle network errors
          toast.error("Login failed: No response from server");
          setLoading(false);
        } else {
          // Handle other errors
          toast.error(`Login failed: ${error.message}`);
          setLoading(false);
        }
      }
    },
  });

  return (
    <>
      {loading && <AuthLoader />}

      <div className="relative w-full flex justify-between overflow-hidden min-h-screen ">
        <img
          src={sidebackground}
          alt="BackgroundImage"
          className="hidden md:inline-block md:max-w-[45%] max-h-[100vh]"
        />
        <Card className="h-full mt-20 mx-auto w-full md:w-[65%] max-w-lg md:max-w-xl lg:max-w-2xl md:px-20 rounded-none border-none">
          <CardHeader>
            <img
              src={logoImage}
              className="m-auto w-[101px] h-[46px]"
              alt="Genzype"
            />
            <CardTitle className="text-center font-semibold mt-1">
              Welcome Back!
            </CardTitle>
            <CardDescription className="text-center pt-1 text-base">
              Sign in now to continue your journey
            </CardDescription>
          </CardHeader>
          <CardContent className="w-full flex flex-col items-center ">
            <form
              onSubmit={formik.handleSubmit}
              className="w-full flex flex-col items-center"
            >
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
                />
                <div
                  className={`absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer text-black ${
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

              <div className="w-full flex justify-end mb-2 px-4 md:p-0">
                <div
                  className="text-[14px] font-semibold cursor-pointer text-red-400 hover:text-red-600"
                  style={{ transition: "color 0.3s" }}
                  onClick={() => navigate("/forgot-password")}
                >
                  Forgot password?
                </div>
              </div>

              <Button
                type="submit"
                className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg mt-4"
                style={{ backgroundColor: "#15274F" }}
              >
                Submit
              </Button>
            </form>
            <div className="flex flex-row items-center justify-start mt-4 text-sm">
              <div className=" mr-1 ">Are you a new user?</div>
              <div
                className="font-semibold  cursor-pointer"
                style={{ color: "#15274F", transition: "color 0.3s" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#15274F")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "#15274F")}
                onClick={() => navigate("/register")}
              >
                Sign up here
              </div>
            </div>
            <div className="border-red-500 absolute bottom-2 px-2 text-center text-xs rounded-full  flex items-center justify-around">
              <BsInfoCircle className="text-red-500 mr-1" />

              <p className="text-xs p-[1.5px] text-red-500 ">
                Disclaimer:{" "}
                <span>
                  GenZPe is a technology provider. We don't sell any data.
                </span>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default Login;
