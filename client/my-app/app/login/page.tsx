"use client";

import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import {LoginRequest} from 'shared/data/loginRequest';

import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {useState} from "react";

const formSchema = z.object({
    username: z.string().min(2, {
        message: "Username must be at least 2 characters.",
    }).max(50, {message: "username cannot exceed 50 characters."}),

    password: z.string()
})

const LoginPage = () => {
    const router = useRouter();
    const [errorMessage, setErrorMessage] = useState("")

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: "",
            password: "",
        },
    })

    const onSubmit = async (data: { username: string; password: string }) => {
        try {
            const request = new LoginRequest(data.username, data.password)
            const response = await fetch('http://localhost:4000/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(request)
            });

            if (response.status === 200) router.push("/");
            else setErrorMessage("Error")
        } catch (error) {
            setErrorMessage("Error")
            alert("Error: " + error);
        }
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                    control={form.control}
                    name="username"
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
                            <FormDescription>
                                Password must be at least 6 characters long.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <p className={"text-red-600 font-bold"}>{errorMessage}</p>
                <Button type="submit">Submit</Button>
            </form>
        </Form>
    )
};

export default LoginPage;
