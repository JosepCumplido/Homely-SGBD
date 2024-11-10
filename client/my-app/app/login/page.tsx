"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { Input } from "@shadcn/ui";
import axios from "axios";
import { useRouter } from "next/navigation";

const LoginPage = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const router = useRouter();

    const onSubmit = async (data: { username: string; password: string }) => {
        try {
            // Hacer la petición al backend
            const response = await axios.post("http://localhost:4000/login", {
                username: data.username,
                password: data.password,
            });

            if (response.status === 200) {
                // Si el login es exitoso, redirigir a la página principal
                router.push("/dashboard");
            }
        } catch (error) {
            alert("Error: Usuario o contraseña incorrectos.");
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-4">
                <div>
                    <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                        Usuario
                    </label>
                    <Input
                        id="username"
                        type="text"
                        {...register("username", { required: "El nombre de usuario es requerido" })}
                        className="mt-2 p-2 border border-gray-300 rounded-md w-full"
                    />
                    {errors.username && <p className="text-red-500 text-sm">{errors.username.message}</p>}
                </div>

                <div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                        Contraseña
                    </label>
                    <Input
                        id="password"
                        type="password"
                        {...register("password", { required: "La contraseña es requerida" })}
                        className="mt-2 p-2 border border-gray-300 rounded-md w-full"
                    />
                    {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
                </div>

                <button
                    type="submit"
                    className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none"
                >
                    Iniciar sesión
                </button>
            </div>
        </form>
    );
};

export default LoginPage;
