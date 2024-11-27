"use client"
import {useEffect, useState} from 'react';
import {useRouter} from 'next/navigation';
import {Avatar, AvatarIcon} from "@nextui-org/react";
import {
    DropdownMenu,
    DropdownMenuContent, DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {useAuth} from "@/hooks/useAuth";
import Link from "next/link";
import {router} from "next/client";
import jwt from "jsonwebtoken";

export function UserAvatar({userAvatarUrl}: { userAvatarUrl: string }) {

    const {isAuthenticated, setIsAuthenticated} = useAuth();
    const [userName, setUserName] = useState<string>("")
    const handleLogout = () => { localStorage.removeItem('authToken'); setIsAuthenticated(false) };

    useEffect(() => {
        try {
            const token = localStorage.getItem('authToken');
            const decodedToken = jwt.decode(token) as { username: string };
            console.log("Decoded username:", decodedToken.username);
            fetchUser(decodedToken.username);  // Usar el username del token para obtener el perfil
        } catch (error) {
            setIsAuthenticated(false)
            console.error("Error al decodificar el token:", error);
        }
    }, [isAuthenticated, router]);

    // Función para obtener los datos del perfil del usuario
    const fetchUser = async (username: string) => {
        try {
            const response = await fetch(`http://localhost:4000/userByUsername/${username}`);
            if (!response.ok) throw new Error('Failed to fetch profile');
            const data = await response.json();
            console.log(data)
            setIsAuthenticated(true)
            setUserName(data.name)
        } catch (error) {
            console.error('Error fetching user profile:', error);
        }
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger>
                <div className="flex items-center transition-transform duration-200 hover:scale-105 active:scale-90">
                    <Avatar
                        src={userAvatarUrl}
                        icon={<AvatarIcon/>}
                        classNames={{
                            base: "bg-gradient-to-br from-[#FFB457] to-[#FF705B]",
                            icon: "text-black/80",
                        }}
                    />
                </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                {!isAuthenticated ? (
                    <>
                        <DropdownMenuLabel>Welcome!</DropdownMenuLabel>
                        <DropdownMenuSeparator/>
                        <DropdownMenuItem><Link href="/login">Log in</Link></DropdownMenuItem>
                        <DropdownMenuItem>Sign up</DropdownMenuItem>
                    </>
                ) : (
                    <>
                        <DropdownMenuLabel>Hi, {userName}!</DropdownMenuLabel>
                        <DropdownMenuSeparator/>
                        <DropdownMenuItem><Link href="/profile">Profile</Link></DropdownMenuItem>
                        <DropdownMenuItem>Messages</DropdownMenuItem>
                        <DropdownMenuItem>Reservations</DropdownMenuItem>
                        <DropdownMenuItem>Settings</DropdownMenuItem>
                        <DropdownMenuSeparator/>
                        <DropdownMenuItem><Link href="/" onClick={handleLogout}>Logout</Link></DropdownMenuItem>
                    </>
                )}
            </DropdownMenuContent>
        </DropdownMenu>

    );
}