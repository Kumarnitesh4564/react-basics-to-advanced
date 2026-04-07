import React from "react";

export default function Button({
    children,
    type = "button",
    bgColor = "bg-blue-600",
    textColor = "text-white",
    className = "",
    ...props
}) {
    return (
        <button
        type={type}
        className={`px-4 py-2 rounded-lg font-medium transition duration-200 hover:shadow-lg active:scale-95 ${bgColor} ${textColor} ${className}`} {...props}>
            {children}
        </button>
    );
}