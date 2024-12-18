"use client";

import {useRouter} from "next/navigation";
import {z} from "zod";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import React, {useEffect, useState} from "react";
import {useAuth} from "@/context/authContext";
import {Label} from "@/components/ui/label";
import { LoginRequest } from 'shared/data/loginRequest';
import Link from "next/link";

const LoginSchema = z.object({
    username: z.string(),
    password: z.string(),
});

type LoginFormData = z.infer<typeof LoginSchema>;

const LoginPage = () => {
    const {saveToken, isAuthenticated} = useAuth();
    const router = useRouter();

    const [message, setMessage] = useState('');
    const [errors, setErrors] = useState<Partial<Record<keyof LoginFormData, string[]>>>({});

    useEffect(() => {
        if (isAuthenticated && typeof window !== "undefined") {
            router.push("/");
        }
    }, [isAuthenticated, router]);

    const handleLogin = async (formData: any) => {
        const data = Object.fromEntries(formData) as LoginFormData;
        const validation = LoginSchema.safeParse(data);

        if (!validation.success) {
            const fieldErrors = validation.error.flatten().fieldErrors;
            setErrors(fieldErrors);
            return;
        }

        setErrors({});
        try {
            const request = new LoginRequest(data.username, data.password);
            const response = await fetch('http://88.223.95.53:4000/user/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(request),
            });

            if (response.ok) {
                const result = await response.json();
                saveToken(result.token)
                setMessage('Login successful!');
            } else {
                const errorData = await response.json();
                setErrors(errorData.error || 'Login failed.');
            }
        } catch (e) {
            setMessage('Something went wrong. Please try again later.');
        }
    };

    return (
        <div>
            <h1 className="text-4xl font-bold text-center mb-10">Log in</h1>
            <form
                className="space-y-4"
                onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
                    e.preventDefault();
                    const formData = new FormData(e.currentTarget);
                    handleLogin(formData);
                }}
            >
                <div className="space-y-1 w-full">
                    <Label htmlFor="username">Username</Label>
                    <Input type="text" id="username" name="username" placeholder=""/>
                    {errors.username && <p className="text-red-500">{errors.username[0]}</p>}
                </div>
                <div className="space-y-1 w-full">
                    <Label htmlFor="password">Password</Label>
                    <Input type="password" id="password" name="password" placeholder=""/>
                    {errors.password && <p className="text-red-500">{errors.password[0]}</p>}
                </div>
                <Button type="submit" className={"!mt-6 w-full"}>Log in</Button>
                <p className={"w-full text-sm text-center text-gray-500 my-4"}>Not a member yet?</p>
                <Link href={"/signup"} className={"block"}>
                    <Button variant={"secondary"} className={"w-full"}>Create account</Button>
                </Link>
                {message && <p className="text-green-500">{message}</p>}
            </form>
        </div>
    );
};

export default LoginPage;
