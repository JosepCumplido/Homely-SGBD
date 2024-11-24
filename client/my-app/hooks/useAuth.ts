// src/hooks/useAuth.ts
import { useState, useEffect } from "react";
import jwt from "jsonwebtoken";

export const useAuth = () => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

    useEffect(() => {
        // Obtén el token de localStorage (si está disponible)
        const token = localStorage.getItem("authToken");

        // Verifica si el token existe
        if (token) {
            try {
                // Intenta decodificar el token
                const decodedToken = jwt.decode(token);

                // Si el token es válido y tiene los datos esperados, lo consideramos autenticado
                if (decodedToken) {
                    setIsAuthenticated(true);
                }
            } catch (error) {
                console.error("Error al decodificar el token:", error);
                setIsAuthenticated(false);  // Si no se puede decodificar el token, no está autenticado
            }
        } else {
            setIsAuthenticated(false);  // Si no hay token, no está autenticado
        }
    }, []);  // Solo se ejecuta cuando el componente se monta

    return { isAuthenticated };
};
