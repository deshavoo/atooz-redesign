"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, useReducedMotion } from "motion/react";

import {
    Newspaper,
    Megaphone,
    Fingerprint,
    Share2,
    BarChart3,
    Crown,
    Mic,
    PanelsTopLeft,
    Target,
    Headphones,
    ShieldCheck,
    MessageSquareText,
    Sparkles,
    Award,
    TrendingUp,
    Compass,
    MousePointerClick,
    Video,
    PenLine,
    Palette,
    Handshake,
    type LucideIcon,
} from "lucide-react";

const GIF_1 = "/videos/A2Z-animation-01.gif";
const GIF_2 = "/videos/A2Z-animation-02.gif";

type LocalizedItem = {
    ar: string;
    en: string;
};

type ImpactService = {
    title: LocalizedItem;
    icon: LucideIcon;
};

type ImpactOutcome = {
    title: LocalizedItem;
    text: LocalizedItem;
    icon: LucideIcon;
};

type CreativeSolution = {
    title: LocalizedItem;
    text: LocalizedItem;
    icon: LucideIcon;
};

type ProcessStep = {
    title: LocalizedItem;
    text: LocalizedItem;
};

const impactServices: ImpactService[] = [
    {
        title: {
            ar: "إدارة وتشغيل المراكز الإعلامية",
            en: "Media Center Management & Operations",
        },
        icon: Newspaper,
    },
    {
        title: {
            ar: "تشكيل الرأي العام وتهيئته",
            en: "Shaping and Influencing Public Opinion",
        },
        icon: Megaphone,
    },
    {
        title: {
            ar: "الترميز",
            en: "Brand Coding",
        },
        icon: Fingerprint,
    },
    {
        title: {
            ar: "إدارة منصات التواصل الاجتماعي",
            en: "Social Media Management",
        },
        icon: Share2,
    },
    {
        title: {
            ar: "صياغة المحتوى الاقتصادي",
            en: "Economic Content Development",
        },
        icon: BarChart3,
    },
    {
        title: {
            ar: "الارتقاء بالعلامة التجارية",
            en: "Brand Elevation",
        },
        icon: Crown,
    },
    {
        title: {
            ar: "تنظيم المؤتمرات الصحافية",
            en: "Press Conference Management",
        },
        icon: Mic,
    },
    {
        title: {
            ar: "تصميم وإدارة الهوية الإعلامية المؤسساتية",
            en: "Corporate Media Identity Design & Management",
        },
        icon: PanelsTopLeft,
    },
    {
        title: {
            ar: "الحملات التسويقية",
            en: "Marketing Campaigns",
        },
        icon: Target,
    },
    {
        title: {
            ar: "إنشاء وتشغيل مراكز الاتصال",
            en: "Call Center Setup & Operations",
        },
        icon: Headphones,
    },
];

const impactOutcomes: ImpactOutcome[] = [
    {
        title: {
            ar: "حضور يصنع الثقة",
            en: "A Presence That Builds Trust",
        },
        text: {
            ar: "نبني صورة ذهنية تعكس قيمة الجهة وتدعم مكانتها أمام جمهورها.",
            en: "We build a strong perception that reflects the organization's value and strengthens its position with its audience.",
        },
        icon: ShieldCheck,
    },
    {
        title: {
            ar: "رسائل أكثر وضوحًا",
            en: "Clearer Messages",
        },
        text: {
            ar: "نطوّر لغة اتصال تجعل الرسالة أكثر قوة وفهمًا وتأثيرًا.",
            en: "We develop a communication language that makes every message clearer, stronger, and more impactful.",
        },
        icon: MessageSquareText,
    },
    {
        title: {
            ar: "تأثير يتجاوز الظهور",
            en: "Impact Beyond Visibility",
        },
        text: {
            ar: "لا نركّز على الوصول فقط، بل على صناعة انطباع يدوم.",
            en: "We go beyond visibility to create meaningful impressions that last.",
        },
        icon: Sparkles,
    },
    {
        title: {
            ar: "محتوى يعكس الاحترافية",
            en: "Content That Reflects Professionalism",
        },
        text: {
            ar: "نحوّل الأفكار إلى تجارب إعلامية تدعم الحضور المؤسسي.",
            en: "We turn ideas into media experiences that strengthen institutional presence.",
        },
        icon: Award,
    },
    {
        title: {
            ar: "حضور قابل للنمو",
            en: "A Presence Built to Grow",
        },
        text: {
            ar: "نبني استراتيجيات تساعد الجهات على التوسع بثبات ووضوح.",
            en: "We build strategies that help organizations grow with clarity, consistency, and confidence.",
        },
        icon: TrendingUp,
    },
];

const creativeSolutions: CreativeSolution[] = [
    {
        title: {
            ar: "استراتيجية العلامة التجارية",
            en: "Brand Strategy",
        },
        text: {
            ar: "نبنى استراتيجيات تحديد موقع العلامة وتدعم صورتها داخل السوق",
            en: "We develop brand positioning strategies that strengthen the brand's image and position within the market.",
        },
        icon: Compass,
    },
    {
        title: {
            ar: "التسويق الرقمي",
            en: "Digital Marketing",
        },
        text: {
            ar: "نطور استراتيجيات رقمية تدعم الوصول، وتعزز التأثير، وتقود التفاعل بوعي",
            en: "We develop digital strategies that expand reach, strengthen impact, and drive meaningful engagement.",
        },
        icon: MousePointerClick,
    },
    {
        title: {
            ar: "إنتاج الفيديو",
            en: "Video Production",
        },
        text: {
            ar: "ننتج محتوى مرئيا يعكس هوية الجهة ويعزز حضورها أمام جمهورها",
            en: "We produce visual content that reflects the organization's identity and strengthens its presence with its audience.",
        },
        icon: Video,
    },
    {
        title: {
            ar: "إنشاء المحتوى",
            en: "Content Creation",
        },
        text: {
            ar: "نصنع محتوى يترجم الرسائل إلى تجربة اتصال أكثر وضوحًا وتأثيرًا",
            en: "We create content that transforms messages into clearer and more impactful communication experiences.",
        },
        icon: PenLine,
    },
    {
        title: {
            ar: "التصميم الإبداعي",
            en: "Creative Design",
        },
        text: {
            ar: "نطور تجارب بصرية تعكس شخصية العلامة وتمنحها حضورًا أكثر تميزا",
            en: "We create visual experiences that reflect the brand's personality and give it a more distinctive presence.",
        },
        icon: Palette,
    },
    {
        title: {
            ar: "العلاقات العامة",
            en: "Public Relations",
        },
        text: {
            ar: "ندير الاتصال والعلاقات الإعلامية بما يعزز الثقة ويقوي الحضور المؤسسي",
            en: "We manage communications and media relations to build trust and strengthen institutional presence.",
        },
        icon: Handshake,
    },
];

const processSteps: ProcessStep[] = [
    {
        title: {
            ar: "فهم الجهة والسوق",
            en: "Understanding the Organization & Market",
        },
        text: {
            ar: "ندرس هوية الجهة، وطريقة ظهورها، وعلاقتها بجمهورها لفهم فرص التأثير الحقيقية.",
            en: "We study the organization's identity, visibility, and relationship with its audience to identify real opportunities for impact.",
        },
    },
    {
        title: {
            ar: "بناء الصورة والرسالة",
            en: "Building the Image & Message",
        },
        text: {
            ar: "نطوّر استراتيجية اتصال تعكس قيمة الجهة وتدعم صورتها الذهنية.",
            en: "We develop a communication strategy that reflects the organization's value and strengthens its public image.",
        },
    },
    {
        title: {
            ar: "إدارة الحضور الإعلامي",
            en: "Managing Media Presence",
        },
        text: {
            ar: "نحوّل الاستراتيجية إلى محتوى وتجارب إعلامية تعزز الثقة والانطباع العام.",
            en: "We turn strategy into content and media experiences that build trust and shape public perception.",
        },
    },
    {
        title: {
            ar: "قياس الأثر والتطوير",
            en: "Measuring Impact & Evolving",
        },
        text: {
            ar: "نراقب الأداء ونطوّر الحضور باستمرار لضمان تأثير أكثر وضوحًا واستمرارية.",
            en: "We monitor performance and continuously evolve the presence to ensure clearer and more sustainable impact.",
        },
    },
];

const pad = (n: number) => String(n + 1).padStart(2, "0");

const EASE = [0.22, 1, 0.36, 1] as const;

function useReveal() {
    const reduce = useReducedMotion();

    return (
        delay = 0,
        opts: { y?: number; scale?: number; duration?: number } = {},
    ) => {
        if (reduce) return { initial: false as const };

        const {
            y = 25,
            scale = 1,
            duration = 0.65,
        } = opts;

        return {
            initial: { opacity: 0, y, scale },
            whileInView: {
                opacity: 1,
                y: 0,
                scale: 1,
            },
            viewport: {
                once: true,
                margin: "-60px",
            },
            transition: {
                duration,
                delay,
                ease: EASE,
            },
        };
    };
}

function IconBox({
    icon: Icon,
    size = "md",
}: {
    icon: LucideIcon;
    size?: "md" | "lg";
}) {
    const dim = size === "lg" ? "h-14 w-14" : "h-11 w-11";

    return (
        <span
            className={`${dim} inline-flex shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/3 text-white/60 transition-all duration-400 ease-out group-hover:-translate-x-0.5 group-hover:rotate-[8deg] group-hover:scale-[1.08] group-hover:border-cyan-300/40 group-hover:bg-cyan-300/10 group-hover:text-cyan-300 group-focus-visible:rotate-[8deg] group-focus-visible:scale-[1.08] group-focus-visible:border-cyan-300/40 group-focus-visible:bg-cyan-300/10 group-focus-visible:text-cyan-300 light:border-black/10 light:bg-black/3 light:text-black/45 light:group-hover:border-cyan-600/35 light:group-hover:bg-cyan-600/8 light:group-hover:text-cyan-700 light:group-focus-visible:border-cyan-600/35 light:group-focus-visible:bg-cyan-600/8 light:group-focus-visible:text-cyan-700`}
        >
            <Icon
                className={size === "lg" ? "h-6 w-6" : "h-5 w-5"}
                strokeWidth={1.5}
                aria-hidden
            />
        </span>
    );
}

function AccentLine({
    className = "",
}: {
    className?: string;
}) {
    return (
        <span
            aria-hidden
            className={`block h-px w-5 bg-cyan-300 opacity-40 transition-all duration-400 ease-out group-hover:w-11.25 group-hover:opacity-100 group-focus-visible:w-11.25 group-focus-visible:opacity-100 light:bg-cyan-600 ${className}`}
        />
    );
}

function GifFrame({
    src,
    className = "",
    priority = false,
}: {
    src: string;
    className?: string;
    priority?: boolean;
}) {
    return (
        <div
            className={`relative overflow-hidden border border-white/10 bg-[#10101a] light:border-black/10 light:bg-[#e8ebf0] ${className}`}
            aria-hidden="true"
        >
            <Image
                src={src}
                alt=""
                fill
                priority={priority}
                loading={priority ? "eager" : "lazy"}
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
            />
        </div>
    );
}

const focusRing =
    "outline-none focus-visible:ring-1 focus-visible:ring-cyan-300/60 focus-visible:ring-offset-2 focus-visible:ring-offset-[#080711] light:focus-visible:ring-cyan-600/60 light:focus-visible:ring-offset-[#f5f7fa]";

export default function ImpactSection() {
    const pathname = usePathname();
    const isEnglish = pathname.startsWith("/en");

    const reveal = useReveal();
    const reduce = useReducedMotion();

    const text = <T extends LocalizedItem>(item: T) =>
        isEnglish ? item.en : item.ar;

    return (
        <div
            dir={isEnglish ? "ltr" : "rtl"}
            className="overflow-x-hidden bg-[#080711] font-[Cairo,sans-serif] text-white light:bg-[#f5f7fa] light:text-[#10131a]"
        >
            {/* =====================================================
                SECTION 01 — HOW WE CREATE IMPACT
            ====================================================== */}

            <section
                id="impact"
                className="mx-auto max-w-7xl px-6 py-24 lg:px-10 lg:py-40"
            >
                <div className="grid items-center gap-16 lg:grid-cols-12 lg:gap-10">
                    <div className="lg:col-span-7">
                        <motion.h2
                            {...reveal(0)}
                            className="mb-8 text-sm font-medium text-cyan-300/90 light:text-cyan-700"
                        >
                            {isEnglish
                                ? "How We Create Impact"
                                : "كيف نصنع التأثير"}
                        </motion.h2>

                        <motion.div
                            aria-hidden
                            initial={
                                reduce
                                    ? false
                                    : { scaleX: 0 }
                            }
                            whileInView={{ scaleX: 1 }}
                            viewport={{ once: true }}
                            transition={{
                                duration: 1,
                                ease: EASE,
                                delay: 0.15,
                            }}
                            className={`my-10 h-px w-40 bg-cyan-300/70 light:bg-cyan-600/60 ${isEnglish
                                    ? "origin-left"
                                    : "origin-right"
                                }`}
                        />

                        <motion.h3
                            {...reveal(0.1, {
                                duration: 0.7,
                            })}
                            className="max-w-3xl text-3xl font-bold leading-normal text-white sm:text-4xl lg:text-[3.25rem] lg:leading-[1.45] light:text-[#10131a]"
                        >
                            {isEnglish
                                ? "Media and communication solutions, carefully built to strengthen presence, shape perception, and create long-term impact."
                                : "حلول إعلامية واتصالية تُبنى بعناية لتعزيز الحضور وقيادة الصورة الذهنية لصناعة تأثير طويل المدى."}
                        </motion.h3>
                    </div>

                    <motion.div
                        {...reveal(0.2, {
                            scale: 0.98,
                            duration: 0.7,
                        })}
                        className="lg:col-span-5"
                    >
                        <GifFrame
                            src={GIF_1}
                            priority
                            className={`mx-auto aspect-4/5 max-w-md rounded-4xl rounded-tr-[5rem] ${isEnglish
                                    ? "lg:mr-0 lg:ml-auto"
                                    : "lg:mr-auto lg:ml-0"
                                }`}
                        />
                    </motion.div>
                </div>

                <ul className="mt-24 grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-white/5 bg-white/5 sm:grid-cols-2 lg:mt-32 lg:grid-cols-5 light:border-black/8 light:bg-black/8">
                    {impactServices.map(
                        ({ title, icon }, i) => (
                            <motion.li
                                key={title.en}
                                {...reveal(
                                    i * 0.09,
                                    {
                                        scale: 0.98,
                                        duration: 0.6,
                                    },
                                )}
                                className="bg-[#080711] light:bg-[#f5f7fa]"
                            >
                                <article
                                    tabIndex={0}
                                    className={`group flex h-full min-h-55 flex-col justify-between bg-[#080711] p-6 transition-all duration-400 ease-out hover:-translate-y-1.25 hover:bg-[#10101a] focus-visible:-translate-y-1.25 focus-visible:bg-[#10101a] light:bg-[#f5f7fa] light:hover:bg-[#ffffff] light:focus-visible:bg-[#ffffff] ${focusRing}`}
                                >
                                    <div className="flex items-start justify-between">
                                        <span className="text-sm font-medium tabular-nums text-white/30 transition-colors duration-400 group-hover:text-cyan-300 group-focus-visible:text-cyan-300 light:text-black/30 light:group-hover:text-cyan-700 light:group-focus-visible:text-cyan-700">
                                            {pad(i)}
                                        </span>

                                        <IconBox icon={icon} />
                                    </div>

                                    <div>
                                        <h3 className="mb-5 text-lg font-semibold leading-snug text-white/70 transition-colors duration-400 group-hover:text-white group-focus-visible:text-white light:text-[#10131a]/70 light:group-hover:text-[#10131a] light:group-focus-visible:text-[#10131a]">
                                            {text(title)}
                                        </h3>

                                        <AccentLine />
                                    </div>
                                </article>
                            </motion.li>
                        ),
                    )}
                </ul>
            </section>

            {/* =====================================================
                SECTION 02 — WHAT MAKES OUR IMPACT DIFFERENT
            ====================================================== */}

            <section className="border-t border-white/5 bg-[#10101a]/60 light:border-black/8 light:bg-[#e9ecf1]/70">
                <div className="mx-auto grid max-w-7xl items-center gap-16 px-6 py-24 lg:grid-cols-12 lg:gap-8 lg:px-10 lg:py-44">
                    <div className="lg:col-span-8">
                        <motion.h2
                            {...reveal(0)}
                            className="mb-8 text-sm font-medium text-cyan-300/90 light:text-cyan-700"
                        >
                            {isEnglish
                                ? "What Makes Our Impact Different?"
                                : "ما الذى يجعل تأثيرنا مختلفاً ؟"}
                        </motion.h2>

                        <motion.div
                            aria-hidden
                            initial={
                                reduce
                                    ? false
                                    : { scaleX: 0 }
                            }
                            whileInView={{ scaleX: 1 }}
                            viewport={{ once: true }}
                            transition={{
                                duration: 1,
                                ease: EASE,
                                delay: 0.15,
                            }}
                            className={`my-10 h-px w-40 bg-cyan-300/70 light:bg-cyan-600/60 ${isEnglish
                                    ? "origin-left"
                                    : "origin-right"
                                }`}
                        />

                        <motion.h3
                            {...reveal(0.1, {
                                duration: 0.7,
                            })}
                            className="max-w-3xl text-3xl font-bold leading-normal text-white sm:text-4xl lg:text-[3.25rem] lg:leading-[1.45] light:text-[#10131a]"
                        >
                            {isEnglish
                                ? "We build communication and media strategies around real impact, not visibility alone."
                                : "نبني استراتيجيات اتصال وإعلام ترتبط بالأثر الحقيقي، لا بمجرد الظهور."}
                        </motion.h3>
                    </div>

                    <motion.div
                        {...reveal(0.2, {
                            scale: 0.98,
                            duration: 0.7,
                        })}
                        className="lg:col-span-4"
                    >
                        <GifFrame
                            src={GIF_2}
                            className={`mx-auto aspect-square max-w-sm rounded-tl-[4rem] rounded-br-[4rem] rounded-bl-md rounded-tr-md ${isEnglish
                                    ? "lg:mr-0 lg:ml-auto"
                                    : "lg:mr-0 lg:ml-auto"
                                }`}
                        />
                    </motion.div>
                </div>
            </section>

            {/* =====================================================
                SECTION 03 — OUTCOMES
            ====================================================== */}

            <section className="mx-auto max-w-7xl px-6 py-24 lg:px-10 lg:py-40">
                <div className="grid gap-16 lg:grid-cols-12 lg:gap-12">
                    <div
                        className={`lg:sticky lg:top-28 lg:col-span-5 lg:self-start ${isEnglish
                                ? "lg:pr-8"
                                : "lg:pl-8"
                            }`}
                    >
                        <motion.h2
                            {...reveal(0)}
                            className="mb-6 text-3xl font-bold leading-snug sm:text-4xl light:text-[#10131a]"
                        >
                            {isEnglish
                                ? "What Do We Create Behind Every Successful Presence?"
                                : "ما الذي نصنعه خلف كل حضور ناجح؟"}
                        </motion.h2>

                        <motion.p
                            {...reveal(0.1)}
                            className="max-w-md text-lg leading-loose text-white/50 light:text-[#10131a]/55"
                        >
                            {isEnglish
                                ? "We help organizations and brands build a media presence that strengthens trust, clarifies their message, and creates long-term impact."
                                : "نساعد الجهات والعلامات على بناء حضور إعلامي يعزز الثقة، ويوضح الرسالة، ويصنع تأثيرًا طويل المدى."}
                        </motion.p>
                    </div>

                    <div className="lg:col-span-7">
                        {impactOutcomes.map(
                            ({ title, text: itemText, icon }, i) => (
                                <motion.div
                                    key={title.en}
                                    {...reveal(i * 0.09)}
                                >
                                    <article
                                        tabIndex={0}
                                        className={`group grid grid-cols-[auto_1fr_auto] items-start gap-5 border-t border-white/10 px-2 py-8 transition-all duration-400 ease-out hover:-translate-x-1.25 hover:bg-white/2 focus-visible:-translate-x-1.25 focus-visible:bg-white/2 sm:gap-8 light:border-black/10 light:hover:bg-black/2 light:focus-visible:bg-black/2 ${i ===
                                                impactOutcomes.length - 1
                                                ? "border-b"
                                                : ""
                                            } ${focusRing}`}
                                    >
                                        <span className="pt-1 text-2xl font-light tabular-nums text-white/30 transition-all duration-400 group-hover:-translate-x-1.5 group-hover:text-cyan-300 group-focus-visible:text-cyan-300 light:text-black/30 light:group-hover:text-cyan-700 light:group-focus-visible:text-cyan-700">
                                            {pad(i)}
                                        </span>

                                        <div>
                                            <h3 className="mb-3 text-xl font-semibold text-white/80 transition-colors duration-400 group-hover:text-white group-focus-visible:text-white light:text-[#10131a]/80 light:group-hover:text-[#10131a] light:group-focus-visible:text-[#10131a]">
                                                {text(title)}
                                            </h3>

                                            <p className="mb-5 max-w-lg leading-loose text-white/50 transition-colors duration-400 group-hover:text-white/70 light:text-[#10131a]/50 light:group-hover:text-[#10131a]/70">
                                                {text(itemText)}
                                            </p>

                                            <AccentLine />
                                        </div>

                                        <IconBox icon={icon} />
                                    </article>
                                </motion.div>
                            ),
                        )}
                    </div>
                </div>
            </section>

            {/* =====================================================
                SECTION 04 — CREATIVE SOLUTIONS
            ====================================================== */}

            <section className="border-t border-white/5 bg-[#10101a]/60 light:border-black/8 light:bg-[#e9ecf1]/70">
                <div className="mx-auto max-w-7xl px-6 py-24 lg:px-10 lg:py-40">
                    <div className="mb-16 max-w-3xl lg:mb-24">
                        <motion.h2
                            {...reveal(0)}
                            className="mb-6 text-3xl font-bold leading-snug text-white sm:text-4xl light:text-[#10131a]"
                        >
                            {isEnglish
                                ? "Our Communication & Creative Solutions"
                                : "حلولنا الاتصالية و الإبداعية"}
                        </motion.h2>

                        <motion.p
                            {...reveal(0.1)}
                            className="text-lg leading-loose text-white/50 light:text-[#10131a]/55"
                        >
                            {isEnglish
                                ? "We develop media and creative solutions that strengthen presence and support the public image of organizations and brands."
                                : "نطوّر حلولًا إعلامية وإبداعية تعزز الحضور وتدعم الصورة الذهنية للجهات والعلامات"}
                        </motion.p>
                    </div>

                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
                        {creativeSolutions.map(
                            ({ title, text: itemText, icon }, i) => (
                                <motion.div
                                    key={title.en}
                                    {...reveal(i * 0.09, {
                                        scale: 0.98,
                                        duration: 0.6,
                                    })}
                                >
                                    <article
                                        tabIndex={0}
                                        className={`group relative flex h-full flex-col rounded-3xl border border-white/10 bg-[#171725] p-8 transition-all duration-400 ease-out hover:-translate-y-1.25 hover:border-white/25 hover:bg-[#1c1c2c] focus-visible:-translate-y-1.25 focus-visible:border-white/25 light:border-black/10 light:bg-white light:hover:border-black/15 light:hover:bg-white light:focus-visible:border-black/15 ${focusRing} lg:p-10`}
                                    >
                                        <div className="mb-14 flex items-center justify-between">
                                            <IconBox
                                                icon={icon}
                                                size="lg"
                                            />

                                            <span className="text-sm tabular-nums text-white/30 transition-colors duration-400 group-hover:text-cyan-300 light:text-black/30 light:group-hover:text-cyan-700">
                                                {pad(i)}
                                            </span>
                                        </div>

                                        <h3 className="mb-4 text-xl font-semibold text-white/80 transition-colors duration-400 group-hover:text-white group-focus-visible:text-white light:text-[#10131a]/80 light:group-hover:text-[#10131a] light:group-focus-visible:text-[#10131a]">
                                            {text(title)}
                                        </h3>

                                        <p className="mb-8 leading-loose text-white/50 transition-colors duration-400 group-hover:text-white/70 light:text-[#10131a]/50 light:group-hover:text-[#10131a]/70">
                                            {text(itemText)}
                                        </p>

                                        <AccentLine className="mt-auto" />
                                    </article>
                                </motion.div>
                            ),
                        )}
                    </div>
                </div>
            </section>

            {/* =====================================================
                SECTION 05 — PROCESS
            ====================================================== */}

            <section className="mx-auto max-w-7xl px-6 py-24 lg:px-10 lg:py-40">
                <div className="mb-20 max-w-3xl lg:mb-28">
                    <motion.h2
                        {...reveal(0)}
                        className="mb-6 text-3xl font-bold leading-snug sm:text-4xl light:text-[#10131a]"
                    >
                        {isEnglish
                            ? "How We Build Impact"
                            : "كيف نبني التأثير"}
                    </motion.h2>

                    <motion.p
                        {...reveal(0.1)}
                        className="text-lg leading-loose text-white/50 light:text-[#10131a]/55"
                    >
                        {isEnglish
                            ? "Our methodology starts with understanding the organization and ends with a stronger, more impactful media presence in the market."
                            : "نعمل وفق منهجية تبدأ بفهم الجهة، وتنتهي بحضور إعلامي أكثر قوة وتأثيرًا داخل السوق."}
                    </motion.p>
                </div>

                <div className="relative">
                    <motion.div
                        aria-hidden
                        initial={
                            reduce
                                ? false
                                : { scaleX: 0 }
                        }
                        whileInView={{ scaleX: 1 }}
                        viewport={{
                            once: true,
                            margin: "-80px",
                        }}
                        transition={{
                            duration: 1.6,
                            ease: "easeInOut",
                        }}
                        className={`absolute top-[1.1rem] hidden h-px w-full bg-linear-to-r from-cyan-300/70 via-white/15 to-white/5 light:from-cyan-600/60 light:via-black/10 light:to-black/5 lg:block ${isEnglish
                                ? "left-0 origin-left"
                                : "right-0 origin-right bg-linear-to-l"
                            }`}
                    />

                    <ol className="grid gap-14 lg:grid-cols-4 lg:gap-8">
                        {processSteps.map(
                            ({ title, text: itemText }, i) => (
                                <motion.li
                                    key={title.en}
                                    {...reveal(
                                        0.25 + i * 0.3,
                                        {
                                            duration: 0.7,
                                        },
                                    )}
                                    className="relative"
                                >
                                    <article
                                        tabIndex={0}
                                        className={`group ${focusRing}`}
                                    >
                                        <div className="relative mb-8 flex items-center gap-4">
                                            <span className="relative z-10 flex h-9 items-center bg-[#080711] px-4 text-2xl font-light tabular-nums text-white/40 transition-colors duration-400 group-hover:text-cyan-300 group-focus-visible:text-cyan-300 light:bg-[#f5f7fa] light:text-black/35 light:group-hover:text-cyan-700 light:group-focus-visible:text-cyan-700">
                                                {pad(i)}
                                            </span>

                                            <span
                                                className="h-px flex-1 bg-white/10 light:bg-black/10 lg:hidden"
                                                aria-hidden
                                            />
                                        </div>

                                        <h3 className="mb-4 text-xl font-semibold text-white/80 transition-colors duration-400 group-hover:text-white group-focus-visible:text-white light:text-[#10131a]/80 light:group-hover:text-[#10131a] light:group-focus-visible:text-[#10131a]">
                                            {text(title)}
                                        </h3>

                                        <p className="mb-6 leading-loose text-white/50 transition-colors duration-400 group-hover:text-white/70 light:text-[#10131a]/50 light:group-hover:text-[#10131a]/70">
                                            {text(itemText)}
                                        </p>

                                        <AccentLine />
                                    </article>
                                </motion.li>
                            ),
                        )}
                    </ol>
                </div>
            </section>
        </div>
    );
}
