'use client'
import localFont from "next/font/local";
import "../globals.css";
import {NextUIProvider} from "@nextui-org/react";
import {UserAvatar} from "@/components/explore/userAvatar";
import {Button} from "@/components/ui/button";
import Link from "next/link";
import React from "react";
import {AuthProvider, useAuth} from "@/context/authContext";
import Image from "next/image";

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

export default function RootLayout({children}: { children: React.ReactNode }) {
    return (
        <html lang="en">
        <body className={`${geistSans.variable} ${geistMono.variable} w-full h-full antialiased`}>
        <NextUIProvider>
            <AuthProvider>
                <MainLayout>{children}</MainLayout>
            </AuthProvider>
        </NextUIProvider>
        </body>
        </html>
    );
}

function MainLayout({children}: { children: React.ReactNode }) {
    const {user, logout, isAuthenticated} = useAuth();
    console.log("layout login")

    return (
        <>
            {/* header */}
            <section
                className={"h-6 flex flex-row justify-between items-center py-8 absolute top-0 w-[90vw] left-1/2 -translate-x-1/2 z-10"}>
                <h1 className={"text-2xl font-bold text-black"}><Link href={"/"}>Homely</Link></h1>
                {/*<div className={"flex flex-row gap-6 items-center"}>
            <Button variant={"ghost"} className={"font-bold text-black"}>Your reservations</Button>
            <UserAvatar
                user={user}
                onLogout={logout}
                isAuthenticated={isAuthenticated}
            />
          </div>*/}
            </section>
            {/* body */}
            <main className={"flex flex-row items-center h-[100vh]"}>
                <section className={"flex-1 h-full"}>
                    <Image
                        src="/explore/background/background.jpg"
                        width={1802}
                        height={1200}
                        alt={"Background image showing a big house"}
                        quality={100}
                        className={"h-full w-full"}
                        style={{objectFit: 'cover'}}
                    />
                </section>
                <section className={"flex-1 p-20"}>
                    {children}
                </section>
            </main>
        </>
    );
}
