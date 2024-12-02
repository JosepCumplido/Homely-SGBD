// src/hooks/useAuth.ts
import { useState, useEffect } from "react";
import SessionManager from "@/lib/sessionManager";

/*export const useAuth = () => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

    useEffect(() => {
        const token = SessionManager.getToken();

        if (token) {
            try {
                const decodedToken = SessionManager.decodeToken(token);

                if (decodedToken) {
                    console.log("Decoded token: " + decodedToken);
                    setIsAuthenticated(true);
                }
            } catch (error) {
                console.error("Error al decodificar el token:", error);
                setIsAuthenticated(false);
            }
        } else {
            setIsAuthenticated(false);
        }
    }, []);

    return { isAuthenticated, setIsAuthenticated };
};*/
