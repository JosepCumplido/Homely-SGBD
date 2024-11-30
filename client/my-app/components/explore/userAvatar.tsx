"use client"

import {useEffect, useState} from 'react';
import {TokenPayload} from 'shared/models/tokenPayload'
import {Avatar, AvatarIcon} from "@nextui-org/react";
import {
    DropdownMenu,
    DropdownMenuContent, DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import {router} from "next/client";
import SessionManager from "@/lib/sessionManager";
import {fetchUser} from "@/lib/data";
import {User} from "shared/models/user";
import {useAuth} from "@/hooks/useAuth";

export function UserAvatar({userAvatarUrl}: { userAvatarUrl: string }) {

    const {isAuthenticated, setIsAuthenticated} = useAuth();
    const [userName, setUserName] = useState<string|null>(null)
    const handleLogout = () => { SessionManager.removeToken(); setIsAuthenticated(false) };

    useEffect(() => {
        const fetchData = async () => {
            const token = SessionManager.getToken();
            if (token !== null) {
                try {
                    const decodedToken: TokenPayload = SessionManager.decodeToken(token);
                    const user: User | null = await fetchUser(decodedToken.username);
                    if(user !== null) {
                        setUserName(user.name)
                        console.log(user.name)
                        setIsAuthenticated(true)
                    } else {
                        await router.push("/login");
                    }
                } catch (error) {
                    console.error('Error decoding the token or fetching the user:', error);
                }
            } else {
                await router.push("/login");
            }
        };

        fetchData();
    }, [isAuthenticated]);

    return (
        <DropdownMenu>
            <DropdownMenuTrigger>
                <div className="flex items-center transition-transform duration-200 hover:scale-105 active:scale-90">
                    <Avatar
                        src={userAvatarUrl}
                        icon={<AvatarIcon/>}
                        classNames={{
                            base: "bg-gradient-to-br from-[#FFB457] to-[#FF705B] shadow-lg",
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