"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import HeroStats from "./HeroStats";

type Theme = "dark" | "light";

export default function Hero() {
    const [theme, setTheme] = useState<Theme>("dark");

    useEffect(() => {
        const html = document.documentElement;

        const updateTheme = () => {
            setTheme(
                html.classList.contains("dark")
                    ? "dark"
                    : "light",
            );
        };

        updateTheme();

        const observer = new MutationObserver(() => {
            updateTheme();
        });

        observer.observe(html, {
            attributes: true,
            attributeFilter: ["class"],
        });

        return () => {
            observer.disconnect();
        };
    }, []);

    const isDark = theme === "dark";

    return (
        <div
            className={`transition-colors duration-700 ${isDark
                    ? "bg-[#080a13]"
                    : "bg-[#f5f7fa]"
                }`}
        >
            <section
                aria-labelledby="atooz-hero-title"
                className={`relative isolate flex min-h-svh items-center justify-center overflow-hidden px-5 py-24 text-center transition-colors duration-700 sm:px-8 ${isDark
                        ? "bg-[#080a13] text-white"
                        : "bg-[#f5f7fa] text-[#111827]"
                    }`}
                dir="rtl"
            >
                <Image
                    src={
                        isDark
                            ? "/images/hero/hero.webp"
                            : "/images/hero/Hero-light.webp"
                    }
                    alt=""
                    fill
                    priority
                    sizes="100vw"
                    className="absolute inset-0 -z-20 object-cover object-center"
                />

                <div
                    aria-hidden="true"
                    className={`pointer-events-none absolute inset-0 -z-10 transition-all duration-700 ${isDark
                            ? "bg-[linear-gradient(180deg,rgba(7,9,17,0.4)_0%,rgba(7,9,17,0.52)_48%,rgba(7,9,17,0.72)_100%),linear-gradient(90deg,rgba(7,9,17,0.38)_0%,transparent_50%,rgba(7,9,17,0.38)_100%)]"
                            : "bg-[linear-gradient(180deg,rgba(255,255,255,0.08)_0%,rgba(255,255,255,0.18)_48%,rgba(245,247,250,0.35)_100%),linear-gradient(90deg,rgba(255,255,255,0.12)_0%,transparent_50%,rgba(255,255,255,0.12)_100%)]"
                        }`}
                />

                <div
                    aria-hidden="true"
                    className={`pointer-events-none absolute inset-0 -z-10 transition-opacity duration-700 ${isDark
                            ? "bg-[radial-gradient(ellipse_at_22%_26%,rgba(112,72,180,0.24),transparent_38%),radial-gradient(ellipse_at_82%_68%,rgba(51,159,177,0.17),transparent_34%),radial-gradient(ellipse_at_center,transparent_43%,rgba(2,4,10,0.48)_100%)] opacity-100"
                            : "bg-[radial-gradient(ellipse_at_22%_26%,rgba(112,72,180,0.12),transparent_38%),radial-gradient(ellipse_at_82%_68%,rgba(51,159,177,0.10),transparent_34%),radial-gradient(ellipse_at_center,transparent_43%,rgba(255,255,255,0.16)_100%)] opacity-100"
                        }`}
                />

                <div className="mx-auto flex w-full max-w-5xl flex-col items-center">
                    <p
                        className={`mb-5 text-[0.68rem] font-medium tracking-[0.28em] transition-colors duration-500 sm:mb-7 sm:text-xs sm:tracking-[0.34em] ${isDark
                                ? "text-white/75"
                                : "text-[#344054]/75"
                            }`}
                    >
                        A2Z WITH DESHAVOO
                    </p>

                    <h1
                        id="atooz-hero-title"
                        className={`max-w-4xl text-balance text-[clamp(2.35rem,6.2vw,5.4rem)] font-semibold leading-[1.42] tracking-[-0.045em] transition-colors duration-500 ${isDark
                                ? "text-white drop-shadow-[0_2px_24px_rgba(0,0,0,0.24)]"
                                : "text-[#111827] drop-shadow-[0_2px_24px_rgba(255,255,255,0.35)]"
                            }`}
                    >
                        حلول
                        <br className="hidden sm:block" />
                        <span
                            className={`bg-linear-to-l bg-clip-text ${isDark
                                    ? "text-white"
                                    : "text-[#111827]"
                                }`}
                        >
                            إعلامية اقتصادية
                        </span>
                    </h1>

                    <p
                        className={`mt-5 max-w-2xl text-pretty text-sm leading-8 transition-colors duration-500 sm:mt-6 sm:text-base sm:leading-9 ${isDark
                                ? "text-white/80"
                                : "text-[#344054]/80"
                            }`}
                    >
                        بنصمم ونطوّر تجارب رقمية تصنع حضورًا أقوى للبراندات
                        وتقرّبها من جمهورها.
                    </p>

                    <div className="mt-8 flex w-full flex-col items-stretch justify-center gap-3 sm:mt-9 sm:w-auto sm:flex-row sm:items-center sm:gap-4">
                        <a
                            href="#contact"
                            className="inline-flex min-h-12 items-center justify-center rounded-full border border-white/10 bg-linear-to-l from-[#775bb1] to-[#397f91] px-7 text-sm font-medium text-white shadow-[0_8px_28px_rgba(65,93,139,0.22)] transition duration-200 hover:-translate-y-0.5 hover:brightness-110 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-200 motion-reduce:transform-none motion-reduce:transition-none"
                        >
                            ابدأ مشروعك
                        </a>

                        <a
                            href="#work"
                            className={`inline-flex min-h-12 items-center justify-center rounded-full px-7 text-sm font-medium backdrop-blur-sm transition duration-200 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-200 motion-reduce:transition-none ${isDark
                                    ? "border border-white/30 bg-white/6 text-white/95 hover:border-white/55 hover:bg-white/10"
                                    : "border border-black/10 bg-white/55 text-[#111827] hover:border-black/20 hover:bg-white/75"
                                }`}
                        >
                            شاهد أعمالنا
                        </a>
                    </div>
                </div>

                <span
                    aria-hidden="true"
                    className={`absolute bottom-8 left-1/2 block h-7 w-px -translate-x-1/2 bg-linear-to-b to-transparent transition-colors duration-500 sm:bottom-10 ${isDark
                            ? "from-white/70"
                            : "from-[#111827]/50"
                        }`}
                />
            </section>

            <div className="relative z-10 -mt-8 px-4 sm:-mt-10">
                <HeroStats />
            </div>
        </div>
    );
}
