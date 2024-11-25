import React, { useContext } from "react";
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
import { useNavigate } from "react-router-dom";
import { AuthContext } from "@/context/AuthContext";
import logoImage from "../assets/logoLogin.png";
import sidebackground from "../assets/sideBackgroundAuth.png";
import AuthLoader from "@/components/ui/AuthLoader";
import axios from "axios"; // Custom Axios instance

const validationSchema = yup.object({
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required"),
});

const ForgotPassword = () => {
  const { setIsPasswordResetInitiated } = useContext(AuthContext);
  const navigate = useNavigate();
  const { loading, setLoading } = useContext(AuthContext);

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        setLoading(true);
        const response = await axios.post(
          `${import.meta.env.VITE_APP_BACKEND_URL}/auth/forgot_password`,
          values, // Send form values directly
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        console.log("Forgot Password:", response.data);
        setLoading(false);

        if (response.status === 200) {
          toast.success(response.data.message);
          setIsPasswordResetInitiated(true);
          setTimeout(() => {
            navigate("/reset-password", { state: { email: values.email } });
          }, 2000);
        }
      } catch (error) {
        setLoading(false);
        const errorMessage =
          error.response?.data?.message || "Something went wrong!";
        toast.error(`Error: ${errorMessage}`);
      }
    },
  });

  return (
    <>
      <ToastContainer />
      {loading && <AuthLoader />}

      <div className="relative w-full h-fit flex  justify-between  overflow-hidden ">
        <img
          src={sidebackground}
          alt="BackgroundImage"
          className="max-w-[45%] max-h-[100vh]"
        />
        <Card className="h-full mt-28 mx-auto w-[65%] max-w-lg md:max-w-xl lg:max-w-2xl md:px-20 rounded-none border-none">
          <img
            src={logoImage}
            className="m-auto w-[101px] h-[46px]"
            alt="Genzype"
          />
          <CardHeader>
            <CardTitle className="text-center ">Forgot Password</CardTitle>
            <CardDescription className="text-center pt-2">
              Enter your email & we will send you OTP
            </CardDescription>
          </CardHeader>
          <CardContent className="w-full flex flex-col items-center">
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
                  placeholder="Enter your email"
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
              <Button
                type="submit"
                className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg mt-4"
                style={{ backgroundColor: "#15274F" }}
              >
                Send OTP
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default ForgotPassword;
