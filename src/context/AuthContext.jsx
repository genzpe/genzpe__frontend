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

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  const login = (token) => {
    localStorage.setItem("authToken", token);
    setTimeout(() => {
      setIsAuthenticated(true);
    }, 2000);
  };

  const logout = () => {
    localStorage.removeItem("authToken");
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
