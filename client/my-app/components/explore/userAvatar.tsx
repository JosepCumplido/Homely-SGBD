"use client"

import {Avatar, AvatarIcon} from "@nextui-org/react";
import {
    DropdownMenu,
    DropdownMenuContent, DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import {useRouter} from "next/navigation";
import {User} from "shared/models/user";

/*import {useAuth} from "@/hooks/useAuth";*/

export function UserAvatar({ user, onLogout, isAuthenticated}: {
    user: User | null;
    onLogout: () => void;
    isAuthenticated: boolean;
}) {

    const router = useRouter();
    const handleLogout = () => {
        onLogout()
        console.log("logout")
        router.refresh()
    };

    console.log("Authenticated: " + isAuthenticated)
    console.log("User: " + user)

    return (
        <DropdownMenu>
            <DropdownMenuTrigger>
                <div
                    className="flex items-center transition-transform duration-200 hover:scale-105 active:scale-90">
                    <Avatar
                        src={user?.avatarUrl || "/default-avatar.png"}
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
                        <DropdownMenuItem>
                            <Link href="/signup" className={"font-bold"}>Sign up</Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <Link href="/login">Log in</Link>
                        </DropdownMenuItem>
                    </>
                ) : (
                    <>
                        <DropdownMenuLabel>Hi, {user?.name ||"guest"}!</DropdownMenuLabel>
                        <DropdownMenuSeparator/>
                        <DropdownMenuItem>
                            <Link href="/profile">Profile</Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem>Messages</DropdownMenuItem>
                        <DropdownMenuItem>Reservations</DropdownMenuItem>
                        <DropdownMenuItem>Settings</DropdownMenuItem>
                        <DropdownMenuSeparator/>
                        <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>
                    </>
                )}
            </DropdownMenuContent>
        </DropdownMenu>

    );
}