// Wrapper d'autenticacio

'use client'
import React from "react";
import { useAuth } from "@/context/authContext";
import { useRouter } from "next/navigation";

const AuthGuard: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { isAuthenticated } = useAuth();
    const router = useRouter();

    if (!isAuthenticated) {
        return (
            <div style={{ textAlign: "center", marginTop: "20px" }}>
                <p>No estás autenticado.</p>
                <button
                    onClick={() => router.push("/login")}
                    style={{
                        padding: "10px 20px",
                        backgroundColor: "#0070f3",
                        color: "#fff",
                        border: "none",
                        borderRadius: "5px",
                        cursor: "pointer",
                    }}
                >
                    Ir a Login
                </button>
            </div>
        );
    }

    return <>{children}</>;
};

export default AuthGuard;
