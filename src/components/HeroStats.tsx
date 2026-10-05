"use client";

import { useEffect, useRef, useState } from "react";

const stats = [
    { value: 120, label: "عميل" },
    { value: 340, label: "مشروع" },
    { value: 12, label: "دولة" },
] as const;

const duration = 1800;

export default function HeroStats() {
    const [values, setValues] = useState<number[]>(() =>
        stats.map(() => 0),
    );

    const containerRef = useRef<HTMLUListElement>(null);

    useEffect(() => {
        const container = containerRef.current;

        if (!container) return;

        const reduceMotion = window.matchMedia(
            "(prefers-reduced-motion: reduce)",
        );

        const showFinalValues = () => {
            setValues(stats.map(({ value }) => value));
        };

        if (reduceMotion.matches) {
            showFinalValues();
            return;
        }

        let frameId = 0;
        let startedAt: number | null = null;
        let hasStarted = false;

        const animate = (now: number) => {
            if (startedAt === null) {
                startedAt = now;
            }

            const progress = Math.min(
                (now - startedAt) / duration,
                1,
            );

            const eased = 1 - Math.pow(1 - progress, 4);

            setValues(
                stats.map(({ value }) =>
                    Math.round(value * eased),
                ),
            );

            if (progress < 1) {
                frameId =
                    window.requestAnimationFrame(animate);
            } else {
                setValues(
                    stats.map(({ value }) => value),
                );
            }
        };

        const startAnimation = () => {
            if (hasStarted) return;

            hasStarted = true;
            startedAt = null;

            frameId =
                window.requestAnimationFrame(animate);
        };

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    startAnimation();
                    observer.disconnect();
                }
            },
            {
                threshold: 0.35,
                rootMargin: "0px 0px -50px 0px",
            },
        );

        observer.observe(container);

        const handleMotionPreference = (
            event: MediaQueryListEvent,
        ) => {
            if (event.matches) {
                window.cancelAnimationFrame(frameId);
                showFinalValues();
                observer.disconnect();
            }
        };

        reduceMotion.addEventListener(
            "change",
            handleMotionPreference,
        );

        return () => {
            observer.disconnect();

            reduceMotion.removeEventListener(
                "change",
                handleMotionPreference,
            );

            window.cancelAnimationFrame(frameId);
        };
    }, []);

    return (
        <ul
            ref={containerRef}
            aria-label="أرقام Atooz Media Hub"
            dir="rtl"
            className="mx-auto grid w-full max-w-3xl grid-cols-3 gap-3 rounded-2xl border border-[#10131a]/10 bg-white/65 p-3 shadow-[0_18px_50px_rgba(16,19,26,0.1)] backdrop-blur-xl transition-colors duration-700 dark:border-white/20 dark:bg-white/10 dark:shadow-[0_18px_50px_rgba(0,0,0,0.18)] sm:gap-4 sm:p-4"
        >
            {stats.map(({ value, label }, index) => (
                <li key={label}>
                    <div className="group flex min-h-24 flex-col items-center justify-center rounded-xl border border-[#10131a]/10 bg-white/90 px-3 py-5 text-center shadow-[0_8px_25px_rgba(16,19,26,0.08)] backdrop-blur-md transition-all duration-300 ease-out hover:-translate-y-1 hover:border-purple-200 hover:bg-white hover:shadow-[0_14px_35px_rgba(119,91,177,0.16)] dark:border-white/70 dark:bg-white/90 dark:shadow-[0_8px_25px_rgba(0,0,0,0.08)] dark:hover:border-purple-200 dark:hover:bg-white dark:hover:shadow-[0_14px_35px_rgba(119,91,177,0.16)] sm:min-h-28 sm:px-5 sm:py-6">
                        <span
                            aria-label={`+${value}`}
                            className="bg-linear-to-r from-[#775bb1] to-[#397f91] bg-clip-text text-2xl font-semibold leading-none tracking-tight text-transparent tabular-nums sm:text-3xl"
                        >
                            <span aria-hidden="true">
                                +{values[index]}
                            </span>
                        </span>

                        <span className="mt-2 bg-linear-to-r from-[#775bb1] to-[#397f91] bg-clip-text text-xs font-medium text-transparent sm:text-sm">
                            {label}
                        </span>
                    </div>
                </li>
            ))}
        </ul>
    );
}