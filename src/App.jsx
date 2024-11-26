import React, { useContext, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Home from "./pages/Home";
import { AuthContext } from "./context/AuthContext";
import ForgotPassword from "./pages/FogotPassword";
import ResetPassword from "./pages/ResetPassword";
import { toast } from "react-toastify";
// import Sidebar from "./components/Sidebar"; // Import Sidebar
// import Navbar from "./components/Navbar"; // Import Navbar
import AuthenticatedLayout from "./components/AuthenticatedLayout";
import PanVerification from "./components/eKYC/PanVerification";
import AadhaarVerification from "./components/eKYC/AadhaarVerification";
import BankAccountVerification from "./components/eKYC/BankAccountVerification";
import ItrVerification from "./components/eKYC/ItrVerification";
import EquifaxCreditReport from "./components/Credit Reports/Equifax";
import ExperianCreditReport from "./components/Credit Reports/Experian";
import ApiManage from "./pages/ApiManage";

const App = () => {
  const { isAuthenticated, isPasswordResetInitiated } = useContext(AuthContext);

  return (
    <>
      <Router>
        <AppRoutes
          isAuthenticated={isAuthenticated}
          isPasswordResetInitiated={isPasswordResetInitiated}
        />
      </Router>
    </>
  );
};

const AppRoutes = ({ isAuthenticated, isPasswordResetInitiated }) => {
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/reset-password" && !isPasswordResetInitiated) {
      toast("You must initiate the password reset process first.");
    }
  }, [location.pathname, isPasswordResetInitiated]);

  useEffect(() => {
    if (location.pathname === "/home" && !isAuthenticated) {
      toast("You must SignIn/register to access the home page.");
    }
  }, [location.pathname, isAuthenticated]);

  return (
    <Routes>
      <Route
        path="/"
        element={
          isAuthenticated ? (
            <AuthenticatedLayout>
              <Home />
            </AuthenticatedLayout>
          ) : (
            <Login />
          )
        }
      />
      <Route
        path="/register"
        element={isAuthenticated ? <Navigate to="/" /> : <Register />}
      />
      <Route
        path="/login"
        element={isAuthenticated ? <Navigate to="/" /> : <Login />}
      />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route
        path="/reset-password"
        element={
          isPasswordResetInitiated ? (
            <ResetPassword />
          ) : (
            <Navigate to="/forgot-password" />
          )
        }
      />
      <Route
        path="/"
        element={
          isAuthenticated ? (
            <AuthenticatedLayout>
              <Home />
            </AuthenticatedLayout>
          ) : (
            <Navigate to="/login" />
          )
        }
      />
      <Route
        path="/ekyc/pan-verification"
        element={
          isAuthenticated ? (
            <AuthenticatedLayout>
              <PanVerification />
            </AuthenticatedLayout>
          ) : (
            <Navigate to="/login" />
          )
        }
      />
      <Route
        path="/ekyc/aadhaar-verification"
        element={
          isAuthenticated ? (
            <AuthenticatedLayout>
              <AadhaarVerification />
            </AuthenticatedLayout>
          ) : (
            <Navigate to="/login" />
          )
        }
      />

      <Route
        path="/ekyc/itr-verification"
        element={
          isAuthenticated ? (
            <AuthenticatedLayout>
              <ItrVerification />
            </AuthenticatedLayout>
          ) : (
            <Navigate to="/login" />
          )
        }
      />
      <Route
        path="/ekyc/bankaccount-verification"
        element={
          isAuthenticated ? (
            <AuthenticatedLayout>
              <BankAccountVerification />
            </AuthenticatedLayout>
          ) : (
            <Navigate to="/login" />
          )
        }
      />
      <Route
        path="/credit-report/equifax"
        element={
          isAuthenticated ? (
            <AuthenticatedLayout>
              <EquifaxCreditReport />
            </AuthenticatedLayout>
          ) : (
            <Navigate to="/login" />
          )
        }
      />
      <Route
        path="/credit-report/experian"
        element={
          isAuthenticated ? (
            <AuthenticatedLayout>
              <ExperianCreditReport />
            </AuthenticatedLayout>
          ) : (
            <Navigate to="/login" />
          )
        }
      />
      <Route
        path="/manage-api-key"
        element={
          isAuthenticated ? (
            <AuthenticatedLayout>
              <ApiManage />
            </AuthenticatedLayout>
          ) : (
            <Navigate to="/" />
          )
        }
      />

      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default App;
