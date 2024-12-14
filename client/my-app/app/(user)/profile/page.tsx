'use client';

import React, {useState, useEffect, useCallback} from 'react';
import {useRouter} from 'next/navigation';
import {Button} from "@/components/ui/button"
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import {Input} from "@/components/ui/input"
import {Label} from "@/components/ui/label"
import PasswordInput from "@/components/ui/password-input";
import {User} from "shared/models/user";
import {useAuth} from "@/context/authContext";
import {z} from "zod";
import {UpdateProfileRequest, UpdateProfileResponse} from 'shared/data/udpateProfileRequest';
import SuccessAlert from "@/components/originui/successSooner";
import SuccessSooner from "@/components/originui/successSooner";
import { useToast } from "@/hooks/use-toast"


const ProfileSchema = z.object({
    name: z.string(),
    surname: z.string(),
    email: z.string(),
    currentPassword: z.string(),
    password: z.string(),
})

type ProfileFormData = z.infer<typeof ProfileSchema>;

const ProfilePage = () => {
    const {token, user, login, isAuthenticated} = useAuth();
    const router = useRouter();
    console.log(`User: ${JSON.stringify(user)}`)

    const { toast } = useToast()
    const [message, setMessage] = useState('');
    const [errors, setErrors] = useState<Partial<Record<keyof ProfileFormData, string[]>>>({});

    const [currentPassword, setCurrentPassword] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        if (!isAuthenticated) {
            router.push("/login");
        }
    }, [isAuthenticated, router]);

    const onCurrentPasswordChange = useCallback((currentPassword: string) => {
        setCurrentPassword(currentPassword);
    }, [])

    const onPasswordChange = useCallback((password: string) => {
        setPassword(password);
    }, [])

    const handleModifyProfile = async (formData: any) => {
        const data = Object.fromEntries(formData) as ProfileFormData;

        setErrors({});
        try {
            if (user != null) {
                /*console.log(`User password: ${user.password}`)
                console.log(`Current password: ${data.currentPassword}`)
                console.log(`New password: ${data.password}`)*/

                if (data.password !== "" && data.currentPassword !== user.password) {
                    console.log("passwords don't match")
                    throw new Error("passwords don't match");
                }

                const request = new UpdateProfileRequest(user.username, data.name, data.surname, data.email, data.password)
                const response = await fetch(`http://localhost:4000/user/${user.username}`, {
                    method: 'PUT',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(request),
                });

                if (response.ok) {
                    const result: UpdateProfileResponse = await response.json();
                    setMessage('Profile updated successfully.');

                    if (data.password !== "") login(user.username, data.password)
                    else login(user.username, user.password)

                    toast({
                        title: "Scheduled: Catch up",
                        description: "Friday, February 10, 2023 at 5:57 PM",
                    })
                } else {
                    const errorData = await response.json();
                    setErrors(errorData.error || 'Could not update profile');
                }
            }
        } catch (e) {
            console.log(`Error: ${e}`)
            setMessage('Something went wrong. Please try again later.');
        }
    }

    return (
        <div className="w-[50vw] m-auto flex-1 lg:max-w-2xl overflow-y-scroll h-full pb-10 px-4">
            <form
                id="form"
                className="space-y-8"
                onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
                    e.preventDefault();
                    const formData = new FormData(e.currentTarget);
                    formData.append("currentPassword", currentPassword);
                    formData.append("password", password);
                    handleModifyProfile(formData);
                }}
            >
                <div>
                    <h3 className="text-lg font-medium">Hi, {user?.name}!</h3>
                    <p className="text-sm text-muted-foreground">
                        This is how others will see you on the site.
                    </p>
                </div>
                <div className={"flex flex-row gap-16 w-full"}>
                    <div className={"flex flex-col space-y-2"}>
                        <Avatar className="w-28 h-28">
                            <AvatarImage src={user?.avatarUrl || "default-avatar.png"} alt="User Avatar"/>
                            <AvatarFallback>{user?.username ? user.username[0].toUpperCase() : 'U'}</AvatarFallback>
                        </Avatar>
                        <Button variant={"ghost"}>Upload image</Button>
                    </div>
                    <div className="space-y-2 w-full">
                        <Label htmlFor="username">Username</Label>
                        <Input disabled type="text" id="username" name="username" defaultValue={user?.username}/>
                    </div>
                </div>

                <div className={"flex flex-row gap-6"}>
                    <div className="space-y-2 w-full">
                        <Label htmlFor="name">Name</Label>
                        <Input type="text" id="name" name="name" defaultValue={user?.name}/>
                    </div>
                    <div className="space-y-2 w-full">
                        <Label htmlFor="surname">Surname</Label>
                        <Input type="text" id="surname" name="surname" defaultValue={user?.surname}/>
                    </div>
                </div>

                <div className="space-y-2 w-full">
                    <Label htmlFor="email">Email</Label>
                    <Input type="email" id="email" name="email" defaultValue={user?.email}/>
                </div>

                <div className={"flex flex-row gap-4"}>
                    <Button type="submit" form={"form"}>Save changes</Button>
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button variant="outline">Change password</Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px]">
                            <DialogHeader>
                                <DialogTitle>Create new password</DialogTitle>
                                <DialogDescription>
                                    Type new password. Click save when you&#39;re done.
                                </DialogDescription>
                            </DialogHeader>
                            <div className="grid gap-4 py-4">
                                <div className="space-y-2 w-full">
                                    <Label htmlFor="currentPassword">Current password</Label>
                                    <Input id="currentPassword" name="currentPassword" placeholder={"Your current password"} onChange={(e) => onCurrentPasswordChange(e.target.value)}/>
                                </div>
                                <div className="space-y-2 w-full">
                                    <PasswordInput onPasswordChange={onPasswordChange}/>
                                </div>
                            </div>
                            <DialogFooter>
                                <Button type="submit" form="form">Change password</Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                </div>
            </form>
        </div>
    )
};

export default ProfilePage;
