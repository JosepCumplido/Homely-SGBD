'use client'
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import React, {useCallback, useEffect, useState} from "react";
import {z} from "zod";
import {Label} from "@/components/ui/label";
import PasswordInput from "@/components/ui/password-input";
import {useAuth} from "@/context/authContext";
import {useRouter} from "next/navigation";
import {SignupRequest} from "shared/data/signupRequest";

const SignupSchema = z.object({
    name: z.string(),
    surname: z.string(),
    username: z.string(),
    email: z.string().email("Invalid email address"),
    password: z.string(),
});

type SignupFormData = z.infer<typeof SignupSchema>;

const SignupPage = () => {
    const {saveToken, isAuthenticated} = useAuth();
    const router = useRouter();

    const [message, setMessage] = useState('');
    const [errors, setErrors] = useState<Partial<Record<keyof SignupFormData, string[]>>>({});
    const [password, setPassword] = useState('');

    useEffect(() => {
        if (isAuthenticated && typeof window !== "undefined") {
            router.push("/");
        }
    }, [isAuthenticated, router]);

    const onPasswordChange = useCallback((password: string) => {
        setPassword(password);
    }, [])

    const handleSignup = async (formData: any) => {
        const data = Object.fromEntries(formData) as SignupFormData;
        const validation = SignupSchema.safeParse(data);

        if (!validation.success) {
            const fieldErrors = validation.error.flatten().fieldErrors;
            setErrors(fieldErrors);
            console.log("Errors: " + JSON.stringify(fieldErrors));

            return;
        }

        setErrors({});
        try {
            console.log("Username " + data.username)
            const request = new SignupRequest(data.name, data.surname, data.username, data.email, data.password);
            const response = await fetch('http://localhost:4000/user/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(request),
            });

            if (response.ok) {
                const result = await response.json();
                saveToken(result.token)
                setMessage('Signup successful!');
            } else {
                const errorData = await response.json();
                setMessage(errorData.error || 'Creating account failed.');
            }

        } catch (e) {
            setMessage('Something went wrong. Please try again later.');
        }
    };

    const handleLogin = () => {
        router.push("/login");
    };

    return (
        <div>
            <h1 className="text-4xl font-bold text-center mb-10">Create an account</h1>
            <form
                className="space-y-4"
                onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
                    e.preventDefault();
                    const formData = new FormData(e.currentTarget);
                    formData.append("password", password);
                    handleSignup(formData);
                }}
            >
                <div className={"flex flex-row gap-4"}>
                    <div className="space-y-1 w-full">
                        <Label htmlFor="name">Name</Label>
                        <Input type="text" id="name" name="name" placeholder="James"/>
                        {errors.name && <p className="text-red-500">{errors.name[0]}</p>}
                    </div>
                    <div className="space-y-1 w-full">
                        <Label htmlFor="surname">Surname</Label>
                        <Input type="text" id="surname" name="surname" placeholder="Bond"/>
                        {errors.surname && <p className="text-red-500">{errors.surname[0]}</p>}
                    </div>
                </div>

                <div className="space-y-1 w-full">
                    <Label htmlFor="username">Username</Label>
                    <Input type="text" id="username" name="username" placeholder="bond007"/>
                    {errors.username && <p className="text-red-500">{errors.username[0]}</p>}
                </div>

                <div className="space-y-1 w-full">
                    <Label htmlFor="email">Email</Label>
                    <Input type="email" id="email" name="email" placeholder="hello@email.com"/>
                    {errors.email && <p className="text-red-500">{errors.email[0]}</p>}
                </div>

                <PasswordInput onPasswordChange={onPasswordChange}/>
                {message && <p className="text-green-500">{message}</p>}

                <Button type="submit" className={"!mt-8 w-full"}>Create account</Button>
                <p className={"w-full text-sm text-center text-gray-500 my-4"}>Already have an account?</p>
                <Button variant={"secondary"} onClick={handleLogin} className={"w-full"}>Log in</Button>
            </form>
        </div>
    )
};

export default SignupPage;
