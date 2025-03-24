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
import Gst from "./components/Master Data/Gst";
import Prefill from "./components/Prefill";
import MobileAadhaarVerification from "./components/eKYC/MobileAadhaarVerification";
import McaDetails from "./components/eKYC/McaDetails";
import InstaFinancialBasic from "./components/Insta Finance Reports/InstaFinancialBasic";
import InstaFinancialSummary from "./components/Insta Finance Reports/InstaFinancialSummary";
import InstaFinancialDetails from "./components/Insta Finance Reports/InstaFinancialDetails";
import InstaFinancialDocs from "./components/Insta Finance Reports/InstaFinancialDocs";
import InstaFinancialLegals from "./components/Insta Finance Reports/InstaFinancialLegals";
import ViewDocsDocument from "./components/Insta Finance Reports/ViewDocsDocument";
import ViewDetailedDoc from "./components/Insta Finance Reports/ViewDetailedDoc";
import ViewLegalDoc from "./components/Insta Finance Reports/ViewLegalDoc";
import CibilReport from "./components/Credit Reports/CibilReport";
import ViewSummaryDoc from "./components/Insta Finance Reports/ViewSummaryDoc";

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
        path="/prefill"
        element={
          isAuthenticated ? (
            <AuthenticatedLayout>
              <Prefill />
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
      />{" "}
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
        path="/ekyc/mobile-aadhaar-verification"
        element={
          isAuthenticated ? (
            <AuthenticatedLayout>
              <MobileAadhaarVerification />
            </AuthenticatedLayout>
          ) : (
            <Navigate to="/login" />
          )
        }
      />{" "}
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
      <Route
        path="/gst/basic"
        element={
          isAuthenticated ? (
            <AuthenticatedLayout>
              <Gst />
            </AuthenticatedLayout>
          ) : (
            <Navigate to="/login" />
          )
        }
      />
      <Route
        path="/master/mca-details"
        element={
          isAuthenticated ? (
            <AuthenticatedLayout>
              <McaDetails />
            </AuthenticatedLayout>
          ) : (
            <Navigate to="/login" />
          )
        }
      />
      {/* // finacial Routes */}
      <Route
        path="/financial/basic"
        element={
          isAuthenticated ? (
            <AuthenticatedLayout>
              <InstaFinancialBasic />
            </AuthenticatedLayout>
          ) : (
            <Navigate to="/login" />
          )
        }
      />
      <Route
        path="/financial/summary"
        element={
          isAuthenticated ? (
            <AuthenticatedLayout>
              <InstaFinancialSummary />
            </AuthenticatedLayout>
          ) : (
            <Navigate to="/login" />
          )
        }
      />
      <Route
        path="/financial/summary/view-document-report"
        element={
          isAuthenticated ? (
            <AuthenticatedLayout>
              <ViewSummaryDoc />
            </AuthenticatedLayout>
          ) : (
            <Navigate to="/login" />
          )
        }
      />
      <Route
        path="/financial/details"
        element={
          isAuthenticated ? (
            <AuthenticatedLayout>
              <InstaFinancialDetails />
            </AuthenticatedLayout>
          ) : (
            <Navigate to="/login" />
          )
        }
      />
      <Route
        path="/financial/docs"
        element={
          isAuthenticated ? (
            <AuthenticatedLayout>
              <InstaFinancialDocs />
            </AuthenticatedLayout>
          ) : (
            <Navigate to="/login" />
          )
        }
      />
      <Route
        path="/financial/legal"
        element={
          isAuthenticated ? (
            <AuthenticatedLayout>
              <InstaFinancialLegals />
            </AuthenticatedLayout>
          ) : (
            <Navigate to="/login" />
          )
        }
      />
      <Route
        path="/financial/docs/view-document-report"
        element={
          isAuthenticated ? (
            <AuthenticatedLayout>
              <ViewDocsDocument />
            </AuthenticatedLayout>
          ) : (
            <Navigate to="/login" />
          )
        }
      />
      <Route
        path="/financial/detailed/view-document-report"
        element={
          isAuthenticated ? (
            <AuthenticatedLayout>
              <ViewDetailedDoc />
            </AuthenticatedLayout>
          ) : (
            <Navigate to="/login" />
          )
        }
      />
      <Route
        path="/financial/legal/view-document-report"
        element={
          isAuthenticated ? (
            <AuthenticatedLayout>
              <ViewLegalDoc />
            </AuthenticatedLayout>
          ) : (
            <Navigate to="/login" />
          )
        }
      />
      <Route
        path="/credit-report/cibil"
        element={
          isAuthenticated ? (
            <AuthenticatedLayout>
              <CibilReport />
            </AuthenticatedLayout>
          ) : (
            <Navigate to="/login" />
          )
        }
      />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default App;
