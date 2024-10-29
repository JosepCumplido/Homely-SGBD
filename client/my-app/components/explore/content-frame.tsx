import React from "react";

export function ContentFrame({children}: { children: React.ReactNode }) {
    return (
        <div className={"w-[90vw] m-auto"}>
            {children}
        </div>
    )
}