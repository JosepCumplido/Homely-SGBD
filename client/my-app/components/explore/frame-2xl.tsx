import React from "react";

export function Frame2xl({children}: { children: React.ReactNode }) {
    return (
        <div className={"max-w-screen-2xl m-auto"}>
            {children}
        </div>
    )
}