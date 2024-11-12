import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export const useAuth = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const router = useRouter();

    useEffect(() => {
        // Revisa el token en el localStorage cada vez que el componente se carga
        const checkAuth = () => {
            const token = localStorage.getItem("authToken");
            setIsAuthenticated(!!token);  // Autenticado si el token existe
        };

        checkAuth();

        // Agregar un listener para cambios en localStorage (opcional, útil para detectar cambios de otras pestañas)
        window.addEventListener("storage", checkAuth);

        // Cleanup el listener en desmontaje
        return () => window.removeEventListener("storage", checkAuth);
    }, []);

    const logout = () => {
        localStorage.removeItem("authToken");  // Eliminar el token
        setIsAuthenticated(false);
        router.push("/login");  // Redirigir al login
    };

    return { isAuthenticated, logout };
};
