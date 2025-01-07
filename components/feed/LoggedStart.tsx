"use client";

import { useEffect, useState, useCallback } from "react";

// const useDarkmode = () => {
//     const [isDarkMode, setIsDarkMode] = useState<boolean>(
//         typeof window !== "undefined"
//             ? window.matchMedia("(prefers-color-scheme: dark)").matches
//             : false,
//     );

//     useEffect(() => {
//         const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
//         const handleChange = () => setIsDarkMode(mediaQuery.matches);
//         mediaQuery.addEventListener("change", handleChange);
//         return () => mediaQuery.removeEventListener("change", handleChange);
//     }, []);

//     useEffect(() => {
//         document.documentElement.classList.toggle("dark", isDarkMode);
//     }, [isDarkMode]);

//     const toggleDarkMode = useCallback(
//         () => setIsDarkMode((isDark) => !isDark),
//         [],
//     );
//     const lightMode = useCallback(() => setIsDarkMode(false), []);
//     const darkMode = useCallback(() => setIsDarkMode(true), []);

//     return {
//         isDarkMode,
//         toggleDarkMode,
//         lightMode,
//         darkMode,
//     };
// };
export default function LoggedStart({ user }: { user: any }) {
    
        const [currentColor, setCurrentColor] = useState<string>("#6d6dc7");

    return (
        <div className="flex-1 w-full flex flex-col gap-20 items-center pt-32 pb-16 lg:pt-28 px-4 relative  mx-auto max-w-4xl">
            {/* <div
                className={`
                    absolute h-[45rem] w-full -z-50 from-40 
                    transition-all duration-200 ease-in-out
                `}
                style={{
                    backgroundImage: `linear-gradient(to bottom, ${currentColor}, transparent)`,
                }}
            ></div> */}
            <div className="w-full flex flex-col gap-4 z-20">
                <h1 className="text-2xl font-bold PFRegalTextPro">
                    Olá, {user.full_name}! 👋
                </h1>
            </div>
        </div>
    );
}
