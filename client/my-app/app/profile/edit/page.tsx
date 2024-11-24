'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import jwt from 'jsonwebtoken'; // Asegúrate de tener 'jsonwebtoken' instalado
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';

interface UserInfo {
    username: string;
    email: string;
    avatarUrl?: string; // La URL del avatar, si está disponible
}

const EditProfilePage = () => {
    const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
    const [username, setUsername] = useState<string>('');  // Nuevo nombre de usuario
    const [email, setEmail] = useState<string>('');       // Nuevo email
    const [currentPassword, setCurrentPassword] = useState<string>('');  // Contraseña actual
    const [newPassword, setNewPassword] = useState<string>('');  // Nueva contraseña
    const [currentUsername, setCurrentUsername] = useState<string>(''); // Nombre de usuario actual
    const router = useRouter();

    // Decodificar el token y obtener el username actual desde el localStorage
    useEffect(() => {
        const token = localStorage.getItem('authToken');
        if (!token) {
            router.push('/login');
            return;
        }

        try {
            const decodedToken = jwt.decode(token) as { username: string };
            setCurrentUsername(decodedToken.username); // Establecer el currentUsername
            console.log("Decoded username:", decodedToken.username);
            fetchUserProfile(decodedToken.username);  // Usar el username del token para obtener el perfil
        } catch (error) {
            console.error("Error al decodificar el token:", error);
        }
    }, [router]);

    // Función para obtener los datos del perfil del usuario
    const fetchUserProfile = async (username: string) => {
        try {
            const response = await fetch(`http://localhost:4000/user/profile/${username}`);
            if (!response.ok) throw new Error('Failed to fetch profile');
            const data = await response.json();

            console.log('User profile data:', data);
            setUserInfo(data);
            setUsername(data.username);
            setEmail(data.email);
        } catch (error) {
            console.error('Error fetching user profile:', error);
        }
    };

    // Función para guardar los cambios en el perfil
    const handleSaveChanges = async () => {
        if (!userInfo) return;

        const response = await fetch(`http://localhost:4000/user/profile/${currentUsername}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                newUsername: username,         // El nuevo `username` deseado
                email: email,                  // El email actualizado
            }),
        });

        if (response.ok) {
            const result = await response.json();
            alert('Perfil actualizado correctamente');
            // Redirigir a otro lado si es necesario
        } else {
            const error = await response.json();
            alert(error.error || 'Error al actualizar el perfil');
        }
    };

    // Función para cambiar la contraseña
    const handlePasswordChange = async () => {
        const token = localStorage.getItem('authToken');
        if (!token) {
            alert('No se encuentra el token de autenticación.');
            return;
        }

        try {
            const decodedToken = jwt.decode(token) as { username: string };
            const username = decodedToken.username;

            if (!username) {
                alert('No se pudo obtener el nombre de usuario del token.');
                return;
            }

            const passwordData = {
                currentPassword,
                newPassword,
            };

            // Hacemos la solicitud PUT para cambiar la contraseña, pasando el `username` en la URL
            const response = await fetch(`http://localhost:4000/user/profile/${username}/change-password`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,  // Usamos el token JWT para autorización
                },
                body: JSON.stringify(passwordData),
            });

            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.error || 'Error cambiando la contraseña');
            }

            alert('Contraseña cambiada con éxito');
            router.push('/login');  // Redirige a login o a donde sea necesario
        } catch (error) {
            console.error('Error changing password:', error);
            alert('Error al cambiar la contraseña');
        }
    };

    // Si no se ha cargado la información del perfil, muestra un mensaje de carga
    if (!userInfo) {
        return <div>Loading...</div>;
    }

    return (
        <div className="p-6 max-w-4xl mx-auto">
            <Tabs defaultValue="account" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="account">Cuenta</TabsTrigger>
                    <TabsTrigger value="password">Contraseña</TabsTrigger>
                </TabsList>

                {/* Sección Cuenta */}
                <TabsContent value="account">
                    <Card>
                        <CardHeader>
                            <CardTitle>Cuenta</CardTitle>
                            <CardDescription>
                                Realiza cambios en tu cuenta aquí. Haz clic en guardar cuando termines.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-1">
                                <Label htmlFor="username">Username</Label>
                                <Input
                                    id="username"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                />
                            </div>
                            <div className="space-y-1">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Button onClick={handleSaveChanges}>Guardar Cambios</Button>
                        </CardFooter>
                    </Card>
                </TabsContent>

                {/* Sección Contraseña */}
                <TabsContent value="password">
                    <Card>
                        <CardHeader>
                            <CardTitle>Contraseña</CardTitle>
                            <CardDescription>
                                Cambia tu contraseña aquí. Después de guardar, se cerrará tu sesión.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-1">
                                <Label htmlFor="currentPassword">Contraseña Actual</Label>
                                <Input
                                    id="currentPassword"
                                    type="password"
                                    value={currentPassword}
                                    onChange={(e) => setCurrentPassword(e.target.value)}
                                />
                            </div>
                            <div className="space-y-1">
                                <Label htmlFor="newPassword">Nueva Contraseña</Label>
                                <Input
                                    id="newPassword"
                                    type="password"
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                />
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Button onClick={handlePasswordChange}>Guardar Contraseña</Button>
                        </CardFooter>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
};

export default EditProfilePage;
