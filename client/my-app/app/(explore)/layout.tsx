'use client'
import localFont from "next/font/local";
import "../globals.css";
import {NextUIProvider} from "@nextui-org/react";
import {UserAvatar} from "@/components/explore/userAvatar";
import {Button} from "@/components/ui/button";
import Link from "next/link";
import React from "react";
import {AuthProvider, useAuth} from "@/context/authContext";

const geistSans = localFont({
    src: "../fonts/GeistVF.woff",
    variable: "--font-geist-sans",
    weight: "100 900",
});

const geistMono = localFont({
    src: "../fonts/GeistMonoVF.woff",
    variable: "--font-geist-mono",
    weight: "100 900",
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
        <body className={`${geistSans.variable} ${geistMono.variable} w-full h-full relative antialiased`}>
        <NextUIProvider>
            <AuthProvider>
                <MainLayout>{children}</MainLayout>
            </AuthProvider>
        </NextUIProvider>
        </body>
        </html>
    );
}

function MainLayout({ children }: { children: React.ReactNode }) {
    const { user, logout, isAuthenticated } = useAuth();
        return (
        <>
            <section
                className="h-6 flex flex-row justify-between items-center py-8 absolute top-0 w-[90vw] left-1/2 -translate-x-1/2 z-10">
                <h1 className="text-2xl font-bold text-white">
                    <Link href="/">Homely</Link>
                </h1>
                <div className="flex flex-row gap-6 items-center">
                    <Link href={"/host"} className={"font-bold text-white hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2 rounded-md text-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0"}>Homely your home</Link>
                    <UserAvatar
                        user={user}
                        onLogout={logout}
                        isAuthenticated={isAuthenticated}
                    />
                </div>
            </section>
            {children}
        </>
    );
}