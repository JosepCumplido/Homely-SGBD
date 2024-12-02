import React from "react";
import {AuthProvider} from "@/context/authContext";
import AuthGuard from "@/components/auth/authGuard";

const LoginLayout = ({children}: { children: React.ReactNode }) => {
    return (
        <>
            <AuthProvider>
                <AuthGuard>
                    {children}
                </AuthGuard>
            </AuthProvider>
        </>
    );
};

export default LoginLayout;
