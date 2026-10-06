"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

import {
    memo,
    useCallback,
    useEffect,
    useRef,
    useState,
} from "react";

import { ArrowUpLeft, Menu, X } from "lucide-react";

import {
    FaBehance,
    FaFacebookF,
    FaInstagram,
    FaLinkedinIn,
} from "react-icons/fa";

import ThemeToggle from "@/components/ThemeToggle";

interface NavItem {
    readonly label: string;
    readonly href: string;
    readonly sectionId?: string;
}

interface SocialLink {
    readonly label: string;
    readonly href: string;
    readonly Icon: React.ComponentType<{
        className?: string;
        "aria-hidden"?: boolean;
    }>;
}

const NAV_ITEMS_AR: readonly NavItem[] = [
    {
        label: "الرئيسية",
        href: "/",
    },
    {
        label: "كيف نصنع التأثير",
        href: "/#impact",
        sectionId: "impact",
    },
    {
        label: "أعمالنا",
        href: "/#work",
        sectionId: "work",
    },
    {
        label: "من نحن",
        href: "/#about",
        sectionId: "about",
    },
    {
        label: "رؤيتنا",
        href: "/#vision",
        sectionId: "vision",
    },
    {
        label: "اتصل بنا",
        href: "/#contact",
        sectionId: "contact",
    },
];

const NAV_ITEMS_EN: readonly NavItem[] = [
    {
        label: "Home",
        href: "/en",
    },
    {
        label: "How We Create Impact",
        href: "/en#impact",
        sectionId: "impact",
    },
    {
        label: "Our Work",
        href: "/en#work",
        sectionId: "work",
    },
    {
        label: "About Us",
        href: "/en#about",
        sectionId: "about",
    },
    {
        label: "Our Vision",
        href: "/en#vision",
        sectionId: "vision",
    },
    {
        label: "Contact Us",
        href: "/en#contact",
        sectionId: "contact",
    },
];

const SOCIAL_LINKS: readonly SocialLink[] = [
    {
        label: "Behance",
        href: "https://www.behance.net/a2zmediahub",
        Icon: FaBehance,
    },
    {
        label: "Facebook",
        href: "https://www.facebook.com/a2zmediahub/",
        Icon: FaFacebookF,
    },
    {
        label: "LinkedIn",
        href: "https://www.linkedin.com/company/a2zmediahub/",
        Icon: FaLinkedinIn,
    },
    {
        label: "Instagram",
        href: "https://www.instagram.com/a2zmediahub/",
        Icon: FaInstagram,
    },
];

const SCROLL_THRESHOLD = 30;

const DESKTOP_QUERY = "(min-width: 1024px)";

const FOCUS_RING =
    "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#5b58c6]";



const SocialLinks = memo(function SocialLinks() {
    return (
        <ul className="flex items-center gap-1.5">
            {SOCIAL_LINKS.map(
                ({ label, href, Icon }) => (
                    <li key={label}>
                        <a
                            href={href}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`${label} (opens in a new window)`}
                            className={`group flex h-9 w-9 items-center justify-center rounded-full bg-[#17171f] text-white shadow-sm transition-[transform,background-color,color,box-shadow] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-0.5 hover:bg-[#5b58c6] hover:text-white hover:shadow-md dark:bg-white dark:text-[#29253d] motion-reduce:transition-none motion-reduce:hover:translate-y-0 ${FOCUS_RING}`}
                        >
                            <Icon
                                aria-hidden={true}
                                className="text-[14px] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-110 motion-reduce:transition-none"
                            />
                        </a>
                    </li>
                ),
            )}
        </ul>
    );
});

const MobileMenu = memo(function MobileMenu({
    isOpen,
    activeHref,
    onClose,
    onNavigate,
    isEnglish,
    onLanguageToggle,
}: {
    isOpen: boolean;
    activeHref: string;
    onClose: () => void;
    onNavigate: (href: string) => void;
    isEnglish: boolean;
    onLanguageToggle: () => void;
}) {
    const navItems = isEnglish
        ? NAV_ITEMS_EN
        : NAV_ITEMS_AR;

    return (
        <>
            <div
                aria-hidden="true"
                onClick={onClose}
                className={`fixed inset-0 z-0 bg-black/20 backdrop-blur-[2px] transition-[opacity,visibility] duration-300 motion-reduce:transition-none ${isOpen
                    ? "visible opacity-100"
                    : "invisible opacity-0"
                    }`}
            />

            <nav
                id="mobile-menu"
                aria-label={
                    isEnglish
                        ? "Main navigation"
                        : "القائمة الرئيسية للجوال"
                }
                dir={isEnglish ? "ltr" : "rtl"}
                className={`fixed inset-x-4 top-24 z-10 max-h-[calc(100dvh-7rem)] overflow-y-auto overscroll-contain rounded-4xl border border-white/10 bg-[#080711]/95 p-4 text-white shadow-[0_20px_60px_rgba(0,0,0,0.35)] backdrop-blur-2xl transition-[opacity,transform,visibility] duration-300 ease-out motion-reduce:transition-none dark:border-white/40 dark:bg-[#efeffa]/95 dark:text-[#29253d] dark:shadow-[0_20px_60px_rgba(20,15,55,0.22)] sm:inset-x-6 ${isOpen
                    ? "visible translate-y-0 scale-100 opacity-100"
                    : "invisible -translate-y-3 scale-[0.98] opacity-0"
                    }`}
            >
                <ul className="flex flex-col">
                    {navItems.map(
                        ({ label, href }) => {
                            const isActive =
                                activeHref === href;

                            return (
                                <li key={href}>
                                    <Link
                                        href={href}
                                        onClick={() => {
                                            onNavigate(
                                                href,
                                            );
                                            onClose();
                                        }}
                                        aria-current={
                                            isActive
                                                ? "page"
                                                : undefined
                                        }
                                        className={`group flex min-h-12 items-center justify-between rounded-xl px-4 text-[15px] font-semibold text-white transition-colors duration-300 dark:text-[#29253d] ${isActive
                                            ? "bg-white/10 dark:bg-white/65"
                                            : "hover:bg-white/10 dark:hover:bg-white/50"
                                            } ${FOCUS_RING}`}
                                    >
                                        <span>
                                            {label}
                                        </span>

                                        <ArrowUpLeft
                                            aria-hidden="true"
                                            size={17}
                                            className="text-white/35 transition-[transform,color] duration-300 group-hover:-translate-y-0.5 group-hover:text-cyan-300 dark:text-[#29253d]/30 dark:group-hover:text-[#5b58c6] motion-reduce:transition-none"
                                        />
                                    </Link>
                                </li>
                            );
                        },
                    )}
                </ul>

                <hr className="my-3 border-0 border-t border-white/10 dark:border-[#29253d]/10" />

                <div className="flex items-center gap-2">
                    <SocialLinks />

                    <ThemeToggle />

                    <button
                        type="button"
                        lang={
                            isEnglish
                                ? "ar"
                                : "en"
                        }
                        onClick={onLanguageToggle}
                        aria-label={
                            isEnglish
                                ? "تغيير اللغة إلى العربية"
                                : "تغيير اللغة إلى الإنجليزية"
                        }
                        className={`flex h-10 w-11 shrink-0 items-center justify-center rounded-full bg-[#17171f] text-[11px] font-bold text-white shadow-sm transition-colors duration-300 hover:bg-[#5b58c6] hover:text-white dark:bg-white dark:text-[#29253d] dark:hover:bg-[#5b58c6] ${FOCUS_RING}`}
                    >
                        {isEnglish ? "AR" : "EN"}
                    </button>

                    <Link
                        href={
                            isEnglish
                                ? "/en#contact"
                                : "/#contact"
                        }
                        onClick={() => {
                            onNavigate(
                                isEnglish
                                    ? "/en#contact"
                                    : "/#contact",
                            );
                            onClose();
                        }}
                        className={`flex h-10 flex-1 items-center justify-center whitespace-nowrap rounded-full bg-linear-to-r from-[#6874e8] to-[#4fd7d9] px-3 text-[12px] font-bold text-white shadow-[0_8px_25px_rgba(79,215,217,0.2)] transition-transform duration-300 hover:scale-[1.02] motion-reduce:transition-none motion-reduce:hover:scale-100 ${FOCUS_RING}`}
                    >
                        {isEnglish
                            ? "Start Your Project"
                            : "ابدأ مشروعك"}
                    </Link>
                </div>
            </nav>
        </>
    );
});

export default function Navbar() {
    const pathname = usePathname();
    const router = useRouter();

    const isEnglish =
        pathname.startsWith("/en");

    const [isMenuOpen, setIsMenuOpen] =
        useState(false);

    const [isMenuMounted, setIsMenuMounted] =
        useState(false);

    const [isScrolled, setIsScrolled] =
        useState(false);

    const [activeSection, setActiveSection] =
        useState<string | null>(null);

    const [activeHref, setActiveHref] =
        useState(
            isEnglish ? "/en" : "/",
        );

    const toggleButtonRef =
        useRef<HTMLButtonElement>(null);

    const navItems = isEnglish
        ? NAV_ITEMS_EN
        : NAV_ITEMS_AR;

    const closeMenu = useCallback(() => {
        setIsMenuOpen(false);
    }, []);

    const toggleMenu = useCallback(() => {
        setIsMenuMounted(true);
        setIsMenuOpen((prev) => !prev);
    }, []);

    const handleNavigate = useCallback(
        (href: string) => {
            setActiveHref(href);

            const sectionId =
                href.split("#")[1];

            if (sectionId) {
                setActiveSection(sectionId);
            } else {
                setActiveSection(null);
            }
        },
        [],
    );

    const handleLanguageToggle =
        useCallback(() => {
            setIsMenuOpen(false);
            setActiveSection(null);

            if (isEnglish) {
                router.push("/");
            } else {
                router.push("/en");
            }
        }, [isEnglish, router]);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(
                window.scrollY >
                SCROLL_THRESHOLD,
            );
        };

        handleScroll();

        window.addEventListener(
            "scroll",
            handleScroll,
            { passive: true },
        );

        return () => {
            window.removeEventListener(
                "scroll",
                handleScroll,
            );
        };
    }, []);

    /*
     * Detect the section currently visible
     * in the viewport.
     */
    useEffect(() => {
        const sectionIds = navItems
            .map((item) => item.sectionId)
            .filter(
                (
                    id,
                ): id is string =>
                    Boolean(id),
            );

        const sections = sectionIds
            .map((id) =>
                document.getElementById(id),
            )
            .filter(
                (
                    section,
                ): section is HTMLElement =>
                    Boolean(section),
            );

        if (!sections.length) {
            return;
        }

        const observer =
            new IntersectionObserver(
                (entries) => {
                    const visibleEntries =
                        entries
                            .filter(
                                (entry) =>
                                    entry.isIntersecting,
                            )
                            .sort(
                                (a, b) =>
                                    b.intersectionRatio -
                                    a.intersectionRatio,
                            );

                    if (
                        visibleEntries.length
                    ) {
                        const visibleSection =
                            visibleEntries[0]
                                .target
                                .id;

                        setActiveSection(
                            visibleSection,
                        );

                        setActiveHref(
                            isEnglish
                                ? `/en#${visibleSection}`
                                : `/#${visibleSection}`,
                        );
                    }
                },
                {
                    root: null,
                    rootMargin:
                        "-20% 0px -55% 0px",
                    threshold: [
                        0,
                        0.1,
                        0.25,
                        0.5,
                        0.75,
                    ],
                },
            );

        sections.forEach((section) =>
            observer.observe(section),
        );

        return () => {
            observer.disconnect();
        };
    }, [isEnglish, navItems]);

    /*
     * Keep the correct active state when the
     * user loads a page with a hash.
     */
    useEffect(() => {
        const updateFromHash = () => {
            const hash =
                window.location.hash.replace(
                    "#",
                    "",
                );

            if (hash) {
                setActiveSection(hash);

                setActiveHref(
                    isEnglish
                        ? `/en#${hash}`
                        : `/#${hash}`,
                );
            } else {
                setActiveSection(null);

                setActiveHref(
                    isEnglish
                        ? "/en"
                        : "/",
                );
            }
        };

        updateFromHash();

        window.addEventListener(
            "hashchange",
            updateFromHash,
        );

        return () => {
            window.removeEventListener(
                "hashchange",
                updateFromHash,
            );
        };
    }, [isEnglish, pathname]);

    useEffect(() => {
        if (!isMenuOpen) {
            return;
        }

        const handleKeyDown = (
            event: KeyboardEvent,
        ) => {
            if (event.key === "Escape") {
                setIsMenuOpen(false);
                toggleButtonRef.current?.focus();
            }
        };

        const mediaQuery =
            window.matchMedia(
                DESKTOP_QUERY,
            );

        const handleBreakpoint = (
            event: MediaQueryListEvent,
        ) => {
            if (event.matches) {
                setIsMenuOpen(false);
            }
        };

        document.addEventListener(
            "keydown",
            handleKeyDown,
        );

        mediaQuery.addEventListener(
            "change",
            handleBreakpoint,
        );

        return () => {
            document.removeEventListener(
                "keydown",
                handleKeyDown,
            );

            mediaQuery.removeEventListener(
                "change",
                handleBreakpoint,
            );
        };
    }, [isMenuOpen]);

    return (
        <header
            dir={
                isEnglish
                    ? "ltr"
                    : "rtl"
            }
            className={`fixed inset-x-0 top-0 z-50 px-3 transition-[padding] duration-500 motion-reduce:transition-none sm:px-5 lg:px-8 ${isScrolled
                ? "pt-3"
                : "pt-4"
                }`}
        >
            <nav
                aria-label={
                    isEnglish
                        ? "Main navigation"
                        : "التنقل الرئيسي"
                }
                className={`relative z-20 mx-auto flex h-16 max-w-360 items-center gap-3 rounded-2xl border px-3 transition-[background-color,box-shadow,border-color,backdrop-filter,color] duration-500 ease-out motion-reduce:transition-none sm:h-17 sm:px-5 lg:h-19 lg:gap-5 lg:px-6 xl:px-7 ${isScrolled
                    ? "border-white/10 bg-[#080711]/90 text-white shadow-[0_12px_40px_rgba(0,0,0,0.25)] backdrop-blur-xl backdrop-saturate-150 dark:border-white/50 dark:bg-[#e6e5f3]/80 dark:text-[#29253d] dark:shadow-[0_12px_40px_rgba(20,15,55,0.16)]"
                    : "border-white/10 bg-[#080711] text-white shadow-[0_10px_35px_rgba(0,0,0,0.18)] dark:border-black/5 dark:bg-white dark:text-[#29253d] dark:shadow-[0_10px_35px_rgba(20,15,55,0.10)]"
                    }`}
            >
                {/* Logo */}
                <Link
                    href={
                        isEnglish
                            ? "/en"
                            : "/"
                    }
                    aria-label={
                        isEnglish
                            ? "Atooz - Home"
                            : "Atooz - الرئيسية"
                    }
                    onClick={() => {
                        handleNavigate(
                            isEnglish
                                ? "/en"
                                : "/",
                        );

                        closeMenu();
                    }}
                    className={`relative flex h-full w-28 shrink-0 items-center rounded-full sm:w-32 lg:w-40 ${FOCUS_RING}`}
                >
                    {/* Dark Mode Logo */}
                    <Image
                        src="/images/logo/logo-01.png"
                        alt="Atooz - حلول إعلامية واقتصادية"
                        width={1014}
                        height={492}
                        sizes="(min-width: 1280px) 160px, (min-width: 1024px) 140px, (min-width: 640px) 128px, 112px"
                        priority
                        className="h-auto w-full object-contain opacity-100 transition-opacity duration-500 light:opacity-0"
                    />

                    {/* Light Mode Logo */}
                    <Image
                        src="/images/logo/logo-light-v2.png"
                        alt=""
                        width={1014}
                        height={492}
                        sizes="(min-width: 1280px) 160px, (min-width: 1024px) 140px, (min-width: 640px) 128px, 112px"
                        priority
                        aria-hidden="true"
                        className="absolute inset-0 h-full w-full object-contain opacity-0 transition-opacity duration-500 light:opacity-100"
                    />
                </Link>

                {/* Desktop Navigation */}
                <ul className="hidden flex-1 items-center justify-center gap-1 lg:flex">
                    {navItems.map(
                        ({
                            label,
                            href,
                            sectionId,
                        }) => {
                            const isActive =
                                sectionId
                                    ? activeSection ===
                                    sectionId
                                    : !activeSection;

                            return (
                                <li key={href}>
                                    <Link
                                        href={href}
                                        onClick={() =>
                                            handleNavigate(
                                                href,
                                            )
                                        }
                                        aria-current={
                                            isActive
                                                ? "page"
                                                : undefined
                                        }
                                        className={`group relative block rounded-full px-3 py-2.5 text-[13px] font-semibold whitespace-nowrap text-white transition-colors duration-300 dark:text-[#29253d] xl:px-3.5 ${isActive
                                            ? "bg-white/10 shadow-sm dark:bg-white/55"
                                            : "hover:bg-white/10 dark:hover:bg-[#dfe9ff]/80"
                                            } ${FOCUS_RING}`}
                                    >
                                        {label}

                                        <span
                                            aria-hidden="true"
                                            className={`absolute bottom-1 left-1/2 h-0.5 -translate-x-1/2 rounded-full bg-linear-to-r from-[#4fd7d9] via-[#6388ed] to-[#6874e8] transition-[width,opacity] duration-300 motion-reduce:transition-none ${isActive
                                                ? "w-5 opacity-100"
                                                : "w-0 opacity-0 group-hover:w-5 group-hover:opacity-100 group-focus-visible:w-5 group-focus-visible:opacity-100"
                                                }`}
                                        />
                                    </Link>
                                </li>
                            );
                        },
                    )}
                </ul>

                {/* Desktop Actions */}
                <div className="hidden shrink-0 items-center gap-2 lg:flex">
                    <SocialLinks />

                    <ThemeToggle />

                    <button
                        type="button"
                        lang={
                            isEnglish
                                ? "ar"
                                : "en"
                        }
                        onClick={
                            handleLanguageToggle
                        }
                        aria-label={
                            isEnglish
                                ? "تغيير اللغة إلى العربية"
                                : "تغيير اللغة إلى الإنجليزية"
                        }
                        className={`flex h-9 min-w-9 items-center justify-center rounded-full bg-[#17171f] px-3 text-[11px] font-bold text-white shadow-sm transition-colors duration-300 hover:bg-[#5b58c6] hover:text-white dark:bg-white dark:text-[#29253d] dark:hover:bg-[#5b58c6] ${FOCUS_RING}`}
                    >
                        {isEnglish
                            ? "AR"
                            : "EN"}
                    </button>
                </div>

                {/* Mobile Menu Button */}
                <button
                    ref={toggleButtonRef}
                    type="button"
                    onClick={toggleMenu}
                    aria-label={
                        isMenuOpen
                            ? isEnglish
                                ? "Close menu"
                                : "إغلاق القائمة"
                            : isEnglish
                                ? "Open menu"
                                : "فتح القائمة"
                    }
                    aria-expanded={
                        isMenuOpen
                    }
                    aria-controls="mobile-menu"
                    className={`ms-auto flex h-10 w-10 items-center justify-center rounded-full bg-[#17171f] text-white shadow-sm transition-transform duration-300 hover:scale-105 hover:bg-[#5b58c6] active:scale-95 motion-reduce:transition-none motion-reduce:hover:scale-100 dark:bg-white dark:text-[#29253d] dark:hover:bg-[#5b58c6] lg:hidden ${FOCUS_RING}`}
                >
                    {isMenuOpen ? (
                        <X
                            aria-hidden="true"
                            size={19}
                            strokeWidth={2}
                        />
                    ) : (
                        <Menu
                            aria-hidden="true"
                            size={19}
                            strokeWidth={2}
                        />
                    )}
                </button>
            </nav>

            {isMenuMounted && (
                <MobileMenu
                    isOpen={isMenuOpen}
                    activeHref={
                        activeHref
                    }
                    onClose={closeMenu}
                    onNavigate={
                        handleNavigate
                    }
                    isEnglish={
                        isEnglish
                    }
                    onLanguageToggle={
                        handleLanguageToggle
                    }
                />
            )}
        </header>
    );
}
