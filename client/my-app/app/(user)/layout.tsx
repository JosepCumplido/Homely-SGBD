'use client'
import localFont from "next/font/local";
import "../globals.css";
import {NextUIProvider} from "@nextui-org/react";
import {UserAvatar} from "@/components/explore/userAvatar";
import Link from "next/link";
import React from "react";
import {AuthProvider, useAuth} from "@/context/authContext";
import {ToastProvider} from "@/components/ui/toast";
import {Toaster} from "@/components/ui/toaster";

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
                className={"h-6 flex flex-row justify-between items-center py-8 w-[90vw] m-auto"}>
                <h1 className={"text-2xl font-bold text-black"}><Link href={"/"}>Homely</Link></h1>
                <div className={"flex flex-row gap-6 items-center"}>
                    <Link href={"/travel"}
                          className={"font-bold hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2 rounded-md text-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0"}>Your
                        reservations</Link>
                    <UserAvatar
                        user={user}
                        onLogout={logout}
                        isAuthenticated={isAuthenticated}
                    />
                </div>
            </section>
            {/* body */}
            {children}
            <Toaster/>
        </>
    );
}
