"use client";

import { Moon, Sun } from "lucide-react";
import { useState } from "react";

type Theme = "dark" | "light";

export default function ThemeToggle() {
    const [theme, setTheme] = useState<Theme>("dark");

    const isDark = theme === "dark";

    const toggleTheme = () => {
        const nextTheme: Theme =
            theme === "dark" ? "light" : "dark";

        setTheme(nextTheme);

        document.documentElement.classList.toggle(
            "dark",
            nextTheme === "dark",
        );

        localStorage.setItem("theme", nextTheme);
    };

    return (
        <button
            type="button"
            onClick={toggleTheme}
            aria-label={
                isDark
                    ? "تفعيل الوضع الفاتح"
                    : "تفعيل الوضع الداكن"
            }
            title={
                isDark
                    ? "الوضع الفاتح"
                    : "الوضع الداكن"
            }
            className={`group relative flex size-9 shrink-0 items-center justify-center overflow-hidden rounded-full border shadow-sm transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#5b58c6] ${isDark
                    ? "border-black/5 bg-[#29253d] text-white hover:bg-[#5b58c6]"
                    : "border-white/15 bg-[#111118] text-white hover:border-cyan-300/40 hover:bg-[#1b1b25]"
                }`}
        >
            <span
                aria-hidden="true"
                className="absolute inset-0 rounded-full bg-cyan-300/0 transition-colors duration-500 group-hover:bg-cyan-300/10"
            />

            <span
                className={`relative flex items-center justify-center transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${isDark
                        ? "rotate-0 scale-100 opacity-100"
                        : "rotate-90 scale-0 opacity-0"
                    }`}
            >
                <Moon
                    size={16}
                    strokeWidth={1.8}
                />
            </span>

            <span
                className={`absolute flex items-center justify-center transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${isDark
                        ? "-rotate-90 scale-0 opacity-0"
                        : "rotate-0 scale-100 opacity-100"
                    }`}
            >
                <Sun
                    size={17}
                    strokeWidth={1.8}
                />
            </span>
        </button>
    );
}
