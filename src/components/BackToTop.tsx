"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";

export default function BackToTop() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsVisible(window.scrollY > 500);
        };

        window.addEventListener("scroll", handleScroll, { passive: true });

        handleScroll();

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.button
                    type="button"
                    onClick={scrollToTop}
                    aria-label="العودة إلى أعلى الصفحة"
                    title="العودة إلى الأعلى"
                    initial={{ opacity: 0, y: 20, scale: 0.8 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 20, scale: 0.8 }}
                    transition={{
                        duration: 0.3,
                        ease: [0.22, 1, 0.36, 1],
                    }}
                    whileHover={{
                        y: -4,
                        scale: 1.06,
                    }}
                    whileTap={{
                        scale: 0.94,
                    }}
                    className="group fixed bottom-6 left-6 z-80 flex h-12 w-12 items-center justify-center overflow-hidden rounded-full border border-black/10 bg-white/75 text-[#111827] shadow-[0_12px_40px_rgba(0,0,0,0.12)] backdrop-blur-xl transition-all duration-300 hover:border-cyan-400/40 hover:shadow-[0_14px_45px_rgba(34,211,238,0.18)] dark:border-white/15 dark:bg-[#080a13]/75 dark:text-white dark:shadow-[0_12px_40px_rgba(0,0,0,0.3)] dark:hover:border-cyan-400/30 dark:hover:shadow-[0_14px_45px_rgba(34,211,238,0.12)]"
                >
                    <span className="absolute inset-0 -z-10 bg-linear-to-br from-cyan-400/10 via-transparent to-purple-500/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                    <motion.span
                        animate={{ y: [0, -2, 0] }}
                        transition={{
                            duration: 1.8,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                    >
                        <ArrowUp
                            size={18}
                            strokeWidth={1.8}
                            className="transition-colors duration-300 group-hover:text-cyan-500 dark:group-hover:text-cyan-300"
                        />
                    </motion.span>
                </motion.button>
            )}
        </AnimatePresence>
    );
}
