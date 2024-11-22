import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isPasswordResetInitiated, setIsPasswordResetInitiated] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('authToken');
        if (token) {
            setIsAuthenticated(true);
        }
    }, []);

    const login = (token) => {
        localStorage.setItem('authToken', token);
        setTimeout(() => {
            setIsAuthenticated(true);
        }, 2000)
    };

    const logout = () => {
        localStorage.removeItem('authToken');
        setTimeout(() => {
            setIsAuthenticated(false);
        }, 2000)
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, isPasswordResetInitiated, setIsPasswordResetInitiated, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};