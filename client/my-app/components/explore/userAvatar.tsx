import {Avatar, AvatarIcon} from "@nextui-org/react";
import {
    DropdownMenu,
    DropdownMenuContent, DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";

export function UserAvatar({userAvatarUrl}: {userAvatarUrl: string}) {
    const isLoggedIn = true
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
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator/>
                {!isLoggedIn ? (
                    <>
                        <DropdownMenuItem>Log in</DropdownMenuItem>
                        <DropdownMenuItem>Sign up</DropdownMenuItem>
                    </>
                ) : (
                    <>
                        <DropdownMenuItem>Profile</DropdownMenuItem>
                        <DropdownMenuItem>Messages</DropdownMenuItem>
                        <DropdownMenuItem>Reservations</DropdownMenuItem>
                        <DropdownMenuItem>Settings</DropdownMenuItem>
                    </>
                )}
            </DropdownMenuContent>
        </DropdownMenu>

    );
}