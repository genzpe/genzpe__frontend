import axios from "axios";
import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isPasswordResetInitiated, setIsPasswordResetInitiated] =
    useState(false);
  const [loading, setLoading] = useState(false);
  const [api_key, setApiKey] = useState(null);
  const [token, setToken] = useState(null);
  const [email, setEmail] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  const [prefillAccess, setPrefillAccess] = useState(null);

  useEffect(() => {
    // const token = localStorage.getItem("authToken");
    const fetchUserInfo = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_APP_BACKEND_URL}/auth/get-user-info`,
          {
            withCredentials: true,
          }
        );

        if (response.status === 200 && response.data?.user) {
          // User is authenticated
          setIsAuthenticated(true);
        } else {
          // User is not authenticated
          setIsAuthenticated(false);
        }
      } catch (error) {
        console.error("Error fetching user info:", error);
        setIsAuthenticated(false); // Ensure not authenticated on failure
      }
    };

    fetchUserInfo();
  }, []);

  const login = (token) => {
    // localStorage.setItem("authToken", token);
    setTimeout(() => {
      setIsAuthenticated(true);
    }, 2000);
  };

  const logout = () => {
    // localStorage.removeItem("authToken");
    setTimeout(() => {
      setIsAuthenticated(false);
    }, 2000);
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        isPasswordResetInitiated,
        setIsPasswordResetInitiated,
        login,
        logout,
        loading,
        email,
        setEmail,
        setLoading,
        api_key,
        setApiKey,
        token,
        setToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
