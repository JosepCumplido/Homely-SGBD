'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';
import jwt from 'jsonwebtoken'; // Asegúrate de tener 'jsonwebtoken' instalado

interface UserInfo {
    username: string;
    email: string;
    avatarUrl?: string; // La URL del avatar, si está disponible
}

const ProfilePage = () => {
    const { isAuthenticated } = useAuth(); // Hook que verifica si el usuario está autenticado
    const [userInfo, setUserInfo] = useState<UserInfo | null>(null); // Definir el tipo de userInfo
    const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
    const [username, setUsername] = useState<string | null>(null);
    const router = useRouter();

    // useEffect ejecutado una vez al cargar el componente
    useEffect(() => {
        const token = localStorage.getItem('authToken');
        if (token) {
            try {
                const decodedToken = jwt.decode(token) as { username: string };
                setUsername(decodedToken.username);
                fetchUserProfile(decodedToken.username);
            } catch (error) {
                console.error('Error al decodificar el token:', error);
            }
        }
    }, [isAuthenticated, router]); // Solo se ejecuta una vez al montar el componente

    const fetchUserProfile = async (username: string) => {
        try {
            const response = await fetch(`http://localhost:4000/user/profile/${username}`);
            if (!response.ok) throw new Error('Failed to fetch profile');
            const data = await response.json();
            setUserInfo(data); // Guardar la información del usuario en el estado
            setAvatarUrl(data.avatarUrl);
        } catch (error) {
            console.error('Error fetching user profile:', error);
        }
    };

    const handleLogout = () => {
        // Eliminar el token del localStorage
        localStorage.removeItem('authToken');
        // Redirigir al usuario a la página de login
        router.push('/');
    };

    const handleEditProfile = () => {
        // Redirigir a la página de edición de perfil
        router.push('/profile/edit');
    };

    const handleChats = () => {
        router.push('/chats'); // Redirigeix a la pàgina de xats
    };

    if (!userInfo) {
        return <div>Loading...</div>; // Muestra un loader mientras se carga la información
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-6 space-y-6">
            {/* Avatar grande */}
            <div>
                <Avatar className="w-32 h-32">
                    <AvatarImage src={avatarUrl || "default-avatar.png"} alt="User Avatar"/>
                    <AvatarFallback>{username ? username[0] : 'U'}</AvatarFallback>
                </Avatar>
            </div>

            {/* Username */}
            <h1 className="text-3xl font-semibold">{userInfo.username}</h1>

            {/* Botones de acción */}
            <div className="flex flex-col items-center space-y-4">

                <Button variant="outline" onClick={handleChats} className="w-40">
                    Xats
                </Button>

                {/* Botón de Editar Perfil */}
                <Button variant="outline" onClick={handleEditProfile} className="w-40">
                    Editar Perfil
                </Button>

                {/* Botón de Logout */}
                <Button variant="outline" onClick={handleLogout} className="w-40">
                    Logout
                </Button>
            </div>
        </div>
    );
};

export default ProfilePage;
