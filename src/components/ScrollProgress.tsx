"use client";

import { useEffect, useState } from "react";

export default function ScrollProgress() {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        let ticking = false;

        const updateProgress = () => {
            const scrollTop = window.scrollY;
            const documentHeight =
                document.documentElement.scrollHeight -
                window.innerHeight;

            const nextProgress =
                documentHeight > 0
                    ? (scrollTop / documentHeight) * 100
                    : 0;

            setProgress(
                Math.min(100, Math.max(0, nextProgress)),
            );

            ticking = false;
        };

        const handleScroll = () => {
            if (!ticking) {
                window.requestAnimationFrame(
                    updateProgress,
                );

                ticking = true;
            }
        };

        updateProgress();

        window.addEventListener(
            "scroll",
            handleScroll,
            { passive: true },
        );

        window.addEventListener(
            "resize",
            updateProgress,
        );

        return () => {
            window.removeEventListener(
                "scroll",
                handleScroll,
            );

            window.removeEventListener(
                "resize",
                updateProgress,
            );
        };
    }, []);

    return (
        <div
            aria-hidden="true"
            className="pointer-events-none fixed inset-x-0 top-0 z-100 h-0.5"
        >
            <div
                className="h-full origin-left bg-linear-to-r from-[#4fd7d9] via-[#6388ed] to-[#6874e8] shadow-[0_0_12px_rgba(79,215,217,0.45)] transition-[width] duration-100 ease-out"
                style={{
                    width: `${progress}%`,
                }}
            />
        </div>
    );
}
