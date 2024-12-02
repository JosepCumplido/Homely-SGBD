// Comprovar si l'usuari esta autenticat
'use client'
import React, { createContext, useContext, useState, useEffect } from "react";
import SessionManager from "@/lib/sessionManager";
import {User} from "shared/models/user";

interface AuthContextType {
    user: User | null;
    login: (token: string) => void;
    logout: () => void;
    isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [token, setToken] = useState<string | null>(null);

    useEffect(() => {
        const token = SessionManager.getToken();
        if (token) {
            setToken(token);
            const decodedToken = SessionManager.decodeToken(token);
            setUser(decodedToken.user)
        }
    }, []);

    const login = (token: string) => {
        SessionManager.saveToken(token)
        const decodedToken = SessionManager.decodeToken(token);
        setToken(token)
        setUser(decodedToken.user)
    };

    const logout = () => {
        SessionManager.removeToken();
        setToken(null)
        setUser(null);
    };

    const isAuthenticated: boolean = SessionManager.getToken() !== null;

    return (
        <AuthContext.Provider value={{ user, login, logout, isAuthenticated }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error("useAuth must be used within an AuthProvider");
    return context;
};
