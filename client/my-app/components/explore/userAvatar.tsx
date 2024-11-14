import {Avatar, AvatarIcon} from "@nextui-org/react";

export function UserAvatar({userAvatarUrl}: {userAvatarUrl: string}) {
    return (
        <div className="flex items-center">
            <Avatar
                src={userAvatarUrl}
                icon={<AvatarIcon />}
                classNames={{
                    base: "bg-gradient-to-br from-[#FFB457] to-[#FF705B]",
                    icon: "text-black/80",
                }}
            />
        </div>
    );
}