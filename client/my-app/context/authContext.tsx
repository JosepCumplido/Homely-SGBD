// Comprovar si l'usuari esta autenticat
'use client'
import React, { createContext, useContext, useState, useEffect } from "react";
import SessionManager from "@/lib/sessionManager";
import {User} from "shared/models/user";
import {LoginRequest} from "shared/data/loginRequest";

interface AuthContextType {
    token: string | null;
    user: User | null;
    login: (username: string, password: string) => void;
    logout: () => void;
    saveToken: (token: string) => void;
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

    const login = async (username: string, password: string) => {
        try {
            console.log("Logging in...")
            const request = new LoginRequest(username, password);
            const response = await fetch('http://localhost:4000/user/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(request),
            });

            if (response.ok) {
                const result = await response.json();
                console.log("Login ok")
                saveToken(result.token)
            } else {
                const errorData = await response.json();
                new Error(errorData)
            }
        } catch (e) {
            console.log(e)
        }
    }

    const saveToken = (token: string) => {
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
        <AuthContext.Provider value={{ token, user, login, logout, saveToken, isAuthenticated }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error("useAuth must be used within an AuthProvider");
    return context;
};
