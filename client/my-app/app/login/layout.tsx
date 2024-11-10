import React from "react";

const LoginLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="w-full max-w-md p-8 space-y-4 bg-white rounded-md shadow-md">
                {children}
            </div>
        </div>
    );
};

export default LoginLayout;
