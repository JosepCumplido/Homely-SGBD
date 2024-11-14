import React from "react";

interface ContentFrameProps {
    className?: string;
    children: React.ReactNode;
}

const ContentFrame: React.FC<ContentFrameProps> = ({ className, children }) => {
    return (
        <div className={`w-[90vw] m-auto ${className || ""}`}>
            {children}
        </div>
    )
}

export default ContentFrame