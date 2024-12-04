"use client"
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

export function UserAvatar({userAvatarUrl}: { userAvatarUrl: string }) {
    const {isAuthenticated} = useAuth();

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
            <DropdownMenuContent className={"test"}>
                {!isAuthenticated ? (
                    <>
                        <DropdownMenuLabel>Welcome!</DropdownMenuLabel>
                        <DropdownMenuSeparator/>
                        <DropdownMenuItem className={"font-medium"}>Sign up</DropdownMenuItem>
                        <DropdownMenuItem>Log in</DropdownMenuItem>
                    </>
                ) : (
                    <>
                        <DropdownMenuLabel>Hi, Josep!</DropdownMenuLabel>
                        <DropdownMenuSeparator/>
                        <DropdownMenuItem><Link href="/profile">Profile</Link></DropdownMenuItem>
                        <DropdownMenuItem>Messages</DropdownMenuItem>
                        <DropdownMenuItem>Reservations</DropdownMenuItem>
                        <DropdownMenuItem>Settings</DropdownMenuItem>
                        <DropdownMenuSeparator/>
                        <DropdownMenuItem>Logout</DropdownMenuItem>
                    </>
                )}
            </DropdownMenuContent>
        </DropdownMenu>

    );
}