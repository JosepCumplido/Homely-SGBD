// hooks/useUsername.ts
import { useState, useEffect } from 'react';
import jwt from 'jsonwebtoken';

const useUsername = () => {
    const [username, setUsername] = useState<string | null>(null);

    useEffect(() => {
        const token = localStorage.getItem('authToken'); // Obtener el token del almacenamiento local

        if (token) {
            try {
                const decodedToken = jwt.decode(token) as { username: string }; // Decodificar el token
                if (decodedToken?.username) {
                    setUsername(decodedToken.username); // Establecer el username
                } else {
                    setUsername(null); // Si el token no contiene username, limpiamos el estado
                }
            } catch (error) {
                console.error('Error al decodificar el token:', error);
                setUsername(null); // Si ocurre un error, limpiamos el estado
            }
        } else {
            setUsername(null); // Si no hay token, limpiamos el estado
        }
    }, []); // Este hook solo se ejecuta una vez cuando el componente se monta

    return { loggedUsername: username };
};

export default useUsername;
