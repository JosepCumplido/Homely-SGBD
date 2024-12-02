"use client";

import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { LoginRequest } from 'shared/data/loginRequest';

import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import React, {useEffect, useState} from "react";
import {useAuth} from "@/context/authContext";

const formSchema = z.object({
    loggedUsername: z.string().min(2, {
        message: "Username must be at least 2 characters.",
    }).max(50, { message: "username cannot exceed 50 characters." }),

    password: z.string()
});

const LoginPage = () => {
    const { login, isAuthenticated } = useAuth();
    const router = useRouter();
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        if (isAuthenticated && typeof window !== "undefined") {
            router.push("/");
        }
    }, [isAuthenticated, router]);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            loggedUsername: "",
            password: "",
        },
    });

    const handleSubmit = async (data: { loggedUsername: string; password: string }) => {
        setErrorMessage("");

        try {
            const request = new LoginRequest(data.loggedUsername, data.password);
            const response = await fetch('http://localhost:4000/user/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(request),
            });

            if (response.ok) {
                const result = await response.json();
                login(result.token)
                router.push("/")

            } else {
                const errorData = await response.json();
                setErrorMessage(errorData.message || "Error en el inicio de sesión");
            }
        } catch (error) {
            setErrorMessage("Error en el servidor. Intente nuevamente.");
            console.error("Error:", error);
        }
    };

    return (
        <div>
            <h1 className="text-2xl font-bold text-center mb-6">Homely</h1>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
                    <FormField
                        control={form.control}
                        name="loggedUsername"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Username</FormLabel>
                                <FormControl>
                                    <Input placeholder="Enter your username" {...field} />
                                </FormControl>
                                <FormDescription>
                                    This is your public display name.
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Password</FormLabel>
                                <FormControl>
                                    <Input type="password" placeholder="Enter your password" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <p className="text-red-600 font-bold">{errorMessage}</p>
                    <Button type="submit">Submit</Button>
                </form>
            </Form>
        </div>
    );
};

export default LoginPage;
