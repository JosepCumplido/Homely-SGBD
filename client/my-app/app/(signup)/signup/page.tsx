'use client'
import {Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import React, {ChangeEvent, useEffect, useState} from "react";
import {z} from "zod";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {Label} from "@/components/ui/label";
import {Textarea} from "@/components/ui/textarea";
import {
    Dialog,
    DialogContent,
    DialogDescription, DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog";
import PasswordInput from "@/components/ui/password-input";
import {User} from "shared/models/user";
import {useAuth} from "@/context/authContext";
import {useRouter} from "next/navigation";

type SignupForm = {
    name: string,
    surname: string,
    username: string,
    email: string,
    password: string,
    repeatPassword: string,
}

const initialSignupForm: SignupForm =  {
    name: '',
    surname: '',
    username: '',
    email: '',
    password: '',
    repeatPassword: '',
};

const SignupPage = () => {

    const {user, isAuthenticated} = useAuth();
    const router = useRouter();

    const [signupForm, setSignupForm] = useState<SignupForm>(initialSignupForm);

    const handleUserChange = (e: ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;

        setSignupForm((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    useEffect(() => {
        if (isAuthenticated) {
            router.push("/");
        }
    }, [isAuthenticated, router]);

    return (
        <div>
            <h1 className="text-2xl font-bold text-center mb-6">Homely</h1>
            <form className="space-y-8">
                <div className={"flex flex-row gap-6"}>
                    <div className="space-y-2 w-full">
                        <Label htmlFor="name">Name</Label>
                        <Input type="text" id="name" name="name" value={signupForm.name}
                               onChange={handleUserChange}/>
                    </div>
                    <div className="space-y-2 w-full">
                        <Label htmlFor="surname">Surname</Label>
                        <Input type="text" id="surname" name="surname" value={signupForm.surname ?? ""}
                               onChange={handleUserChange}/>
                    </div>
                </div>

                <div className="space-y-2 w-full">
                    <Label htmlFor="username">Username</Label>
                    <Input type="username" id="username" name="username" value={signupForm.username ?? ""}
                           onChange={handleUserChange}/>
                </div>

                <div className="space-y-2 w-full">
                    <Label htmlFor="email">Email</Label>
                    <Input type="email" id="email" name="email" value={signupForm.email ?? ""}
                           onChange={handleUserChange}/>
                </div>
                <div className="space-y-2">
                    <Label htmlFor="bio">Bio</Label>
                    <Textarea
                        id="bio"
                        defaultValue="Hi!"
                        className="resize-none"
                    />
                    <p className="text-sm text-muted-foreground">
                        You can @mention other users and organizations to link to them.
                    </p>
                </div>
                <div className={"flex flex-row gap-4"}>
                    <Button type="submit">Save changes</Button>
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button variant="outline">Change password</Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px]">
                            <DialogHeader>
                                <DialogTitle>Create new password</DialogTitle>
                                <DialogDescription>
                                    Input new password. Click save when you&#39;re done.
                                </DialogDescription>
                            </DialogHeader>
                            <div className="grid gap-4 py-4">
                                <div className="space-y-2 w-full">
                                    <Label htmlFor="password">Current password</Label>
                                    <Input id="password" placeholder={"Your current password"}/>
                                </div>
                                <div className="space-y-2 w-full">
                                    <PasswordInput/>
                                </div>
                            </div>
                            <DialogFooter>
                                <Button type="submit">Change password</Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                </div>
            </form>
        </div>
    )
};

export default SignupPage;
