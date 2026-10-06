"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import type { KeyboardEvent, PointerEvent } from "react";

const services = {
    ar: [
        {
            title: "صناعة المحتوى",
            description:
                "نصنع محتوى له هدف وصوت واضح، من الفكرة الأولى وحتى الطريقة التي تصل بها الرسالة إلى الجمهور.",
        },
        {
            title: "الهوية الإعلامية",
            description:
                "نبني حضورًا بصريًا واضحًا يعكس شخصية العلامة ويمنحها لغة يمكن للجمهور تمييزها وتذكرها.",
        },
        {
            title: "الحملات الرقمية",
            description:
                "نحوّل الفكرة إلى حملة متكاملة تجمع بين الرسالة والمحتوى والإبداع لصناعة حضور مؤثر.",
        },
    ],
    en: [
        {
            title: "Content Creation",
            description:
                "We create purposeful content with a clear voice, from the first idea to the way the message reaches the audience.",
        },
        {
            title: "Media Identity",
            description:
                "We build a clear visual presence that reflects the brand's personality and gives it a language the audience can recognize and remember.",
        },
        {
            title: "Digital Campaigns",
            description:
                "We turn ideas into integrated campaigns that combine messaging, content, and creativity to create an impactful presence.",
        },
    ],
};

const slides = {
    ar: [
        {
            src: "/images/our-work/work-01.png",
            service: 0,
            alt: "مشروع صناعة المحتوى من أعمال A2Z Media Hub",
        },
        {
            src: "/images/our-work/work-02.png",
            service: 0,
            alt: "عمل إضافي في صناعة المحتوى من أعمال A2Z Media Hub",
        },
        {
            src: "/images/our-work/work-03.png",
            service: 1,
            alt: "مشروع الهوية الإعلامية من أعمال A2Z Media Hub",
        },
        {
            src: "/images/our-work/work-04.png",
            service: 1,
            alt: "عمل إضافي في الهوية الإعلامية من أعمال A2Z Media Hub",
        },
        {
            src: "/images/our-work/work-05.png",
            service: 2,
            alt: "مشروع الحملات الرقمية من أعمال A2Z Media Hub",
        },
        {
            src: "/images/our-work/work-06.png",
            service: 2,
            alt: "عمل إضافي في الحملات الرقمية من أعمال A2Z Media Hub",
        },
    ],
    en: [
        {
            src: "/images/our-work/work-01.png",
            service: 0,
            alt: "Content creation project by A2Z Media Hub",
        },
        {
            src: "/images/our-work/work-02.png",
            service: 0,
            alt: "Additional content creation project by A2Z Media Hub",
        },
        {
            src: "/images/our-work/work-03.png",
            service: 1,
            alt: "Media identity project by A2Z Media Hub",
        },
        {
            src: "/images/our-work/work-04.png",
            service: 1,
            alt: "Additional media identity project by A2Z Media Hub",
        },
        {
            src: "/images/our-work/work-05.png",
            service: 2,
            alt: "Digital campaign project by A2Z Media Hub",
        },
        {
            src: "/images/our-work/work-06.png",
            service: 2,
            alt: "Additional digital campaign project by A2Z Media Hub",
        },
    ],
};

const IMAGE_RATIO = "4 / 3";

const pad = (n: number) => String(n).padStart(2, "0");

export default function OurWorkSection() {
    const pathname = usePathname();
    const isEnglish = pathname.startsWith("/en");

    const lang = isEnglish ? "en" : "ar";

    const currentServices = services[lang];
    const currentSlides = slides[lang];

    const [index, setIndex] = useState(0);
    const startX = useRef<number | null>(null);

    const total = currentSlides.length;
    const active = currentSlides[index];
    const service = currentServices[active.service];

    const go = (next: number) => {
        setIndex((next + total) % total);
    };

    const goToService = (s: number) => {
        const firstSlide = currentSlides.findIndex((x) => x.service === s);

        if (firstSlide !== -1) {
            go(firstSlide);
        }
    };

    useEffect(() => {
        const timer = window.setInterval(() => {
            setIndex((current) => (current + 1) % currentSlides.length);
        }, 2000);

        return () => window.clearInterval(timer);
    }, [currentSlides.length]);

    const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
        if (e.key === "ArrowLeft") {
            go(index + 1);
        }

        if (e.key === "ArrowRight") {
            go(index - 1);
        }
    };

    const onPointerDown = (e: PointerEvent<HTMLDivElement>) => {
        startX.current = e.clientX;
    };

    const onPointerUp = (e: PointerEvent<HTMLDivElement>) => {
        if (startX.current === null) return;

        const dx = e.clientX - startX.current;
        startX.current = null;

        if (Math.abs(dx) < 50) return;

        go(dx < 0 ? index + 1 : index - 1);
    };

    const ctrl =
        "grid h-12 w-12 place-items-center rounded-xl border border-white/10 text-white/70 " +
        "transition duration-300 hover:-translate-y-1 hover:border-[var(--ow-accent)]/50 hover:text-[var(--ow-accent)] " +
        "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--ow-accent)] " +
        "motion-reduce:transition-none motion-reduce:hover:translate-y-0 " +
        "light:border-black/10 light:text-[#10131a]/65 " +
        "light:hover:border-[var(--ow-accent)]/45 light:hover:text-[var(--ow-accent)]";

    return (
        <section
            id="work"
            aria-labelledby="our-work-title"
            dir={isEnglish ? "ltr" : "rtl"}
            className="overflow-x-clip bg-[#080711] px-5 py-20 font-(family-name:--font-cairo) text-white sm:px-8 md:py-28 lg:py-36 light:bg-[#f5f7fa] light:text-[#10131a]"
            style={{ ["--ow-accent" as string]: "#5cc8e0" }}
            onKeyDown={onKeyDown}
        >
            <style>{`
                @keyframes ow-in {
                    from {
                        opacity: 0;
                        transform: translateY(14px);
                    }
                    to {
                        opacity: 1;
                        transform: none;
                    }
                }

                .ow-in {
                    animation: ow-in 600ms cubic-bezier(.2,.7,.2,1) both;
                    animation-delay: var(--d, 0ms);
                }

                @media (prefers-reduced-motion: reduce) {
                    .ow-in {
                        animation: none;
                    }
                }
            `}</style>

            <div className="mx-auto max-w-7xl">
                <h2
                    id="our-work-title"
                    className="ow-in mb-12 max-w-2xl md:mb-20"
                >
                    <span className="mb-4 flex items-center gap-3 text-sm font-semibold text-(--ow-accent)">
                        <span
                            aria-hidden
                            className="h-px w-8 bg-(--ow-accent)"
                        />

                        {isEnglish ? "Our Work" : "أعمالنا"}
                    </span>

                    <span className="block text-3xl font-extrabold leading-tight sm:text-4xl lg:text-5xl">
                        {isEnglish
                            ? "We create presence that is seen and remembered"
                            : "نصنع حضورًا يُرى ويُتذكر"}
                    </span>
                </h2>

                <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-16">
                    <div
                        className="ow-in lg:col-span-7"
                        style={{ ["--d" as string]: "120ms" }}
                        role="group"
                        aria-roledescription="carousel"
                        aria-label={
                            isEnglish
                                ? "Our work gallery"
                                : "معرض أعمالنا"
                        }
                    >
                        <div
                            className="relative touch-pan-y overflow-hidden rounded-3xl border border-white/10 bg-[#10101A] shadow-[0_24px_60px_-24px_rgba(0,0,0,0.7)] light:border-black/10 light:bg-white light:shadow-[0_24px_60px_-24px_rgba(0,0,0,0.16)]"
                            style={{ aspectRatio: IMAGE_RATIO }}
                            onPointerDown={onPointerDown}
                            onPointerUp={onPointerUp}
                        >
                            {currentSlides.map((slide, i) => (
                                <div
                                    key={slide.src}
                                    role="group"
                                    aria-roledescription="slide"
                                    aria-label={
                                        isEnglish
                                            ? `${i + 1} of ${total}`
                                            : `${i + 1} من ${total}`
                                    }
                                    aria-hidden={i !== index}
                                    className={`absolute inset-0 transition duration-500 ease-out motion-reduce:transition-none ${i === index
                                            ? "scale-100 opacity-100"
                                            : "pointer-events-none scale-[0.98] opacity-0"
                                        }`}
                                >
                                    <Image
                                        src={slide.src}
                                        alt={slide.alt}
                                        fill
                                        priority={i === 0}
                                        loading={
                                            i === 0 ? undefined : "lazy"
                                        }
                                        sizes="(min-width: 1024px) 56vw, 100vw"
                                        draggable={false}
                                        className="select-none object-cover"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>

                    <div
                        className="ow-in lg:col-span-5"
                        style={{ ["--d" as string]: "240ms" }}
                    >
                        <div aria-live="polite">
                            <div
                                key={`${active.service}-${index}`}
                                className="ow-in"
                                style={{ ["--d" as string]: "0ms" }}
                            >
                                <p
                                    className="mb-3 text-sm font-semibold text-(--ow-accent)"
                                    dir="ltr"
                                >
                                    {pad(active.service + 1)}
                                </p>

                                <h3 className="mb-4 text-2xl font-bold leading-snug sm:text-3xl">
                                    {service.title}
                                </h3>

                                <p className="max-w-md text-base leading-8 text-white/70 light:text-[#10131a]/65">
                                    {service.description}
                                </p>
                            </div>
                        </div>

                        <div className="mt-8 flex items-center gap-6">
                            <div className="flex items-center gap-2">
                                <button
                                    type="button"
                                    className={ctrl}
                                    aria-label={
                                        isEnglish
                                            ? "Previous project"
                                            : "العمل السابق"
                                    }
                                    onClick={() => go(index - 1)}
                                >
                                    <svg
                                        width="18"
                                        height="18"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="1.75"
                                        aria-hidden
                                    >
                                        <path
                                            d="M4 12h16m-6-6 6 6-6 6"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                    </svg>
                                </button>

                                <button
                                    type="button"
                                    className={ctrl}
                                    aria-label={
                                        isEnglish
                                            ? "Next project"
                                            : "العمل التالي"
                                    }
                                    onClick={() => go(index + 1)}
                                >
                                    <svg
                                        width="18"
                                        height="18"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="1.75"
                                        aria-hidden
                                    >
                                        <path
                                            d="M20 12H4m6-6-6 6 6 6"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                    </svg>
                                </button>
                            </div>

                            <div className="flex-1">
                                <p
                                    className="mb-2 text-sm font-medium text-white/50 light:text-[#10131a]/45"
                                    dir="ltr"
                                >
                                    <span className="text-white light:text-[#10131a]">
                                        {pad(index + 1)}
                                    </span>{" "}
                                    / {pad(total)}
                                </p>

                                <div className="h-px w-full bg-white/10 light:bg-black/10">
                                    <div
                                        className="h-px bg-(--ow-accent) transition-[width] duration-500 motion-reduce:transition-none"
                                        style={{
                                            width: `${((index + 1) / total) * 100
                                                }%`,
                                        }}
                                    />
                                </div>
                            </div>
                        </div>

                        <ul className="mt-10 border-t border-white/10 md:mt-12 light:border-black/10">
                            {currentServices.map((s, i) => {
                                const isActive = i === active.service;

                                return (
                                    <li
                                        key={s.title}
                                        className="ow-in border-b border-white/5 light:border-black/8"
                                        style={{
                                            ["--d" as string]: `${360 + i * 90
                                                }ms`,
                                        }}
                                    >
                                        <button
                                            type="button"
                                            onClick={() => goToService(i)}
                                            aria-current={
                                                isActive ? "true" : undefined
                                            }
                                            className={`group flex w-full items-center gap-5 py-5 text-start transition duration-300 hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--ow-accent) motion-reduce:transition-none motion-reduce:hover:translate-y-0 ${isActive
                                                    ? "translate-x-0 opacity-100 ltr:translate-x-1 rtl:-translate-x-1"
                                                    : "opacity-50 hover:opacity-100 focus-visible:opacity-100"
                                                }`}
                                        >
                                            <span
                                                className={`text-sm font-semibold transition-colors duration-300 ${isActive
                                                        ? "text-(--ow-accent)"
                                                        : "text-white/50 group-hover:text-white light:text-[#10131a]/45 light:group-hover:text-[#10131a]"
                                                    }`}
                                                dir="ltr"
                                            >
                                                {pad(i + 1)}
                                            </span>

                                            <span className="text-lg font-semibold text-white light:text-[#10131a]">
                                                {s.title}
                                            </span>

                                            <span
                                                aria-hidden
                                                className={`h-px bg-(--ow-accent) transition-all duration-300 group-hover:w-12 ${isActive ? "w-10" : "w-0"
                                                    }`}
                                            />
                                        </button>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    );
}
