"use client";

import Image from "next/image";
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

const impactServices: { title: string; icon: LucideIcon }[] = [
    { title: "إدارة وتشغيل المراكز الإعلامية", icon: Newspaper },
    { title: "تشكيل الرأي العام وتهيئته", icon: Megaphone },
    { title: "الترميز", icon: Fingerprint },
    { title: "إدارة منصات التواصل الاجتماعي", icon: Share2 },
    { title: "صياغة المحتوى الاقتصادي", icon: BarChart3 },
    { title: "الارتقاء بالعلامة التجارية", icon: Crown },
    { title: "تنظيم المؤتمرات الصحافية", icon: Mic },
    {
        title: "تصميم وإدارة الهوية الإعلامية المؤسساتية",
        icon: PanelsTopLeft,
    },
    { title: "الحملات التسويقية", icon: Target },
    { title: "إنشاء وتشغيل مراكز الاتصال", icon: Headphones },
];

const impactOutcomes: {
    title: string;
    text: string;
    icon: LucideIcon;
}[] = [
        {
            title: "حضور يصنع الثقة",
            text: "نبني صورة ذهنية تعكس قيمة الجهة وتدعم مكانتها أمام جمهورها.",
            icon: ShieldCheck,
        },
        {
            title: "رسائل أكثر وضوحًا",
            text: "نطوّر لغة اتصال تجعل الرسالة أكثر قوة وفهمًا وتأثيرًا.",
            icon: MessageSquareText,
        },
        {
            title: "تأثير يتجاوز الظهور",
            text: "لا نركّز على الوصول فقط، بل على صناعة انطباع يدوم.",
            icon: Sparkles,
        },
        {
            title: "محتوى يعكس الاحترافية",
            text: "نحوّل الأفكار إلى تجارب إعلامية تدعم الحضور المؤسسي.",
            icon: Award,
        },
        {
            title: "حضور قابل للنمو",
            text: "نبني استراتيجيات تساعد الجهات على التوسع بثبات ووضوح.",
            icon: TrendingUp,
        },
    ];

const creativeSolutions: {
    title: string;
    text: string;
    icon: LucideIcon;
}[] = [
        {
            title: "استراتيجية العلامة التجارية",
            text: "نبنى استراتيجيات تحديد موقع العلامة وتدعم صورتها داخل السوق",
            icon: Compass,
        },
        {
            title: "التسويق الرقمي",
            text: "نطور استراتيجيات رقمية تدعم الوصول، وتعزز التأثير، وتقود التفاعل بوعي",
            icon: MousePointerClick,
        },
        {
            title: "إنتاج الفيديو",
            text: "ننتج محتوى مرئيا يعكس هوية الجهة ويعزز حضورها أمام جمهورها",
            icon: Video,
        },
        {
            title: "إنشاء المحتوى",
            text: "نصنع محتوى يترجم الرسائل إلى تجربة اتصال أكثر وضوحًا وتأثيرًا",
            icon: PenLine,
        },
        {
            title: "التصميم الإبداعي",
            text: "نطور تجارب بصرية تعكس شخصية العلامة وتمنحها حضورًا أكثر تميزا",
            icon: Palette,
        },
        {
            title: "العلاقات العامة",
            text: "ندير الاتصال والعلاقات الإعلامية بما يعزز الثقة ويقوي الحضور المؤسسي",
            icon: Handshake,
        },
    ];

const processSteps = [
    {
        title: "فهم الجهة والسوق",
        text: "ندرس هوية الجهة، وطريقة ظهورها، وعلاقتها بجمهورها لفهم فرص التأثير الحقيقية.",
    },
    {
        title: "بناء الصورة والرسالة",
        text: "نطوّر استراتيجية اتصال تعكس قيمة الجهة وتدعم صورتها الذهنية.",
    },
    {
        title: "إدارة الحضور الإعلامي",
        text: "نحوّل الاستراتيجية إلى محتوى وتجارب إعلامية تعزز الثقة والانطباع العام.",
    },
    {
        title: "قياس الأثر والتطوير",
        text: "نراقب الأداء ونطوّر الحضور باستمرار لضمان تأثير أكثر وضوحًا واستمرارية.",
    },
];

const pad = (n: number) => String(n + 1).padStart(2, "0");
const EASE = [0.22, 1, 0.36, 1] as const;

function useReveal() {
    const reduce = useReducedMotion();

    return (
        delay = 0,
        opts: { y?: number; scale?: number; duration?: number } = {}
    ) => {
        if (reduce) return { initial: false as const };

        const { y = 25, scale = 1, duration = 0.65 } = opts;

        return {
            initial: { opacity: 0, y, scale },
            whileInView: { opacity: 1, y: 0, scale: 1 },
            viewport: { once: true, margin: "-60px" },
            transition: { duration, delay, ease: EASE },
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
            className={`${dim} inline-flex shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/3 text-white/60
      transition-all duration-400 ease-out
      group-hover:-translate-x-0.5 group-hover:rotate-[8deg] group-hover:scale-[1.08] group-hover:border-cyan-300/40 group-hover:bg-cyan-300/10 group-hover:text-cyan-300
      group-focus-visible:rotate-[8deg] group-focus-visible:scale-[1.08] group-focus-visible:border-cyan-300/40 group-focus-visible:bg-cyan-300/10 group-focus-visible:text-cyan-300`}
        >
            <Icon
                className={size === "lg" ? "h-6 w-6" : "h-5 w-5"}
                strokeWidth={1.5}
                aria-hidden
            />
        </span>
    );
}

function AccentLine({ className = "" }: { className?: string }) {
    return (
        <span
            aria-hidden
            className={`block h-px w-5 bg-cyan-300 opacity-40 transition-all duration-400 ease-out group-hover:w-11.25 group-hover:opacity-100 group-focus-visible:w-11.25 group-focus-visible:opacity-100 ${className}`}
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
            className={`relative overflow-hidden border border-white/10 bg-[#10101a] ${className}`}
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
    "outline-none focus-visible:ring-1 focus-visible:ring-cyan-300/60 focus-visible:ring-offset-2 focus-visible:ring-offset-[#080711]";

export default function ImpactSection() {
    const reveal = useReveal();
    const reduce = useReducedMotion();

    return (
        <div
            dir="rtl"
            className="overflow-x-hidden bg-[#080711] font-[Cairo,sans-serif] text-white"
        >
            <section
                id="impact"
                className="mx-auto max-w-7xl px-6 py-24 lg:px-10 lg:py-40"
            >
                <div className="grid items-center gap-16 lg:grid-cols-12 lg:gap-10">
                    <div className="lg:col-span-7">
                        <motion.h2
                            {...reveal(0)}
                            className="mb-8 text-sm font-medium text-cyan-300/90"
                        >
                            كيف نصنع التأثير
                        </motion.h2>
                        <motion.div
                            aria-hidden
                            initial={reduce ? false : { scaleX: 0 }}
                            whileInView={{ scaleX: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 1, ease: EASE, delay: 0.15 }}
                            className="my-10 h-px w-40 origin-right bg-cyan-300/70"
                        />

                        <motion.h3
                            {...reveal(0.1, { duration: 0.7 })}
                            className="max-w-3xl text-3xl font-bold leading-normal text-white sm:text-4xl lg:text-[3.25rem] lg:leading-[1.45]"
                        >
                            حلول إعلامية واتصالية تُبنى بعناية لتعزيز الحضور وقيادة الصورة الذهنية لصناعة تأثير طويل المدى.
                        </motion.h3>
                    </div>

                    <motion.div
                        {...reveal(0.2, { scale: 0.98, duration: 0.7 })}
                        className="lg:col-span-5"
                    >
                        <GifFrame
                            src={GIF_1}
                            priority
                            className="mx-auto aspect-4/5 max-w-md rounded-4xl rounded-tr-[5rem] lg:mr-auto lg:ml-0"
                        />
                    </motion.div>
                </div>

                <ul className="mt-24 grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-white/5 bg-white/5 sm:grid-cols-2 lg:mt-32 lg:grid-cols-5">
                    {impactServices.map(({ title, icon }, i) => (
                        <motion.li
                            key={title}
                            {...reveal(i * 0.09, { scale: 0.98, duration: 0.6 })}
                            className="bg-[#080711]"
                        >
                            <article
                                tabIndex={0}
                                className={`group flex h-full min-h-55 flex-col justify-between bg-[#080711] p-6 transition-all duration-400 ease-out hover:-translate-y-1.25 hover:bg-[#10101a] focus-visible:-translate-y-1.25 focus-visible:bg-[#10101a] ${focusRing}`}
                            >
                                <div className="flex items-start justify-between">
                                    <span className="text-sm font-medium tabular-nums text-white/30 transition-colors duration-400 group-hover:text-cyan-300 group-focus-visible:text-cyan-300">
                                        {pad(i)}
                                    </span>

                                    <IconBox icon={icon} />
                                </div>

                                <div>
                                    <h3 className="mb-5 text-lg font-semibold leading-snug text-white/70 transition-colors duration-400 group-hover:text-white group-focus-visible:text-white">
                                        {title}
                                    </h3>

                                    <AccentLine />
                                </div>
                            </article>
                        </motion.li>
                    ))}
                </ul>
            </section>

            <section className="border-t border-white/5 bg-[#10101a]/60">
                <div className="mx-auto grid max-w-7xl items-center gap-16 px-6 py-24 lg:grid-cols-12 lg:gap-8 lg:px-10 lg:py-44">
                    <div className="lg:col-span-8">
                        <motion.h2
                            {...reveal(0)}
                            className="mb-8 text-sm font-medium text-cyan-300/90"
                        >
                            ما الذى يجعل تأثيرنا مختلفاً ؟
                        </motion.h2>

                        <motion.div
                            aria-hidden
                            initial={reduce ? false : { scaleX: 0 }}
                            whileInView={{ scaleX: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 1, ease: EASE, delay: 0.15 }}
                            className="my-10 h-px w-40 origin-right bg-cyan-300/70"
                        />

                        <motion.h3
                            {...reveal(0.1, { duration: 0.7 })}
                            className="max-w-3xl text-3xl font-bold leading-normal text-white sm:text-4xl lg:text-[3.25rem] lg:leading-[1.45]"
                        >
                            نبني استراتيجيات اتصال وإعلام ترتبط بالأثر الحقيقي، لا بمجرد الظهور.
                        </motion.h3>
                    </div>

                    <motion.div
                        {...reveal(0.2, { scale: 0.98, duration: 0.7 })}
                        className="lg:col-span-4"
                    >
                        <GifFrame
                            src={GIF_2}
                            className="mx-auto aspect-square max-w-sm rounded-tl-[4rem] rounded-br-[4rem] rounded-bl-md rounded-tr-md lg:mr-0 lg:ml-auto"
                        />
                    </motion.div>
                </div>
            </section>

            <section className="mx-auto max-w-7xl px-6 py-24 lg:px-10 lg:py-40">
                <div className="grid gap-16 lg:grid-cols-12 lg:gap-12">
                    <div className="lg:sticky lg:top-28 lg:col-span-5 lg:self-start">
                        <motion.h2
                            {...reveal(0)}
                            className="mb-6 text-3xl font-bold leading-snug sm:text-4xl"
                        >
                            ما الذي نصنعه خلف كل حضور ناجح؟
                        </motion.h2>

                        <motion.p
                            {...reveal(0.1)}
                            className="max-w-md text-lg leading-loose text-white/50"
                        >
                            نساعد الجهات والعلامات على بناء حضور إعلامي يعزز الثقة، ويوضح
                            الرسالة، ويصنع تأثيرًا طويل المدى.
                        </motion.p>
                    </div>

                    <div className="lg:col-span-7">
                        {impactOutcomes.map(({ title, text, icon }, i) => (
                            <motion.div key={title} {...reveal(i * 0.09)}>
                                <article
                                    tabIndex={0}
                                    className={`group grid grid-cols-[auto_1fr_auto] items-start gap-5 border-t border-white/10 px-2 py-8 transition-all duration-400 ease-out
                  hover:-translate-x-1.25 hover:bg-white/2 focus-visible:-translate-x-1.25 focus-visible:bg-white/2 sm:gap-8 ${focusRing} ${i === impactOutcomes.length - 1 ? "border-b" : ""
                                        }`}
                                >
                                    <span className="pt-1 text-2xl font-light tabular-nums text-white/30 transition-all duration-400 group-hover:-translate-x-1.5 group-hover:text-cyan-300 group-focus-visible:text-cyan-300">
                                        {pad(i)}
                                    </span>

                                    <div>
                                        <h3 className="mb-3 text-xl font-semibold text-white/80 transition-colors duration-400 group-hover:text-white group-focus-visible:text-white">
                                            {title}
                                        </h3>

                                        <p className="mb-5 max-w-lg leading-loose text-white/50 transition-colors duration-400 group-hover:text-white/70">
                                            {text}
                                        </p>

                                        <AccentLine />
                                    </div>

                                    <IconBox icon={icon} />
                                </article>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="border-t border-white/5 bg-[#10101a]/60">
                <div className="mx-auto max-w-7xl px-6 py-24 lg:px-10 lg:py-40">
                    <div className="mb-16 max-w-3xl lg:mb-24">
                        <motion.h2
                            {...reveal(0)}
                            className="mb-6 text-3xl font-bold leading-snug sm:text-4xl"
                        >
                            حلولنا الاتصالية و الإبداعية
                        </motion.h2>

                        <motion.p
                            {...reveal(0.1)}
                            className="text-lg leading-loose text-white/50"
                        >
                            نطوّر حلولًا إعلامية وإبداعية تعزز الحضور وتدعم الصورة الذهنية
                            للجهات والعلامات
                        </motion.p>
                    </div>

                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
                        {creativeSolutions.map(({ title, text, icon }, i) => (
                            <motion.div
                                key={title}
                                {...reveal(i * 0.09, { scale: 0.98, duration: 0.6 })}
                            >
                                <article
                                    tabIndex={0}
                                    className={`group relative flex h-full flex-col rounded-3xl border border-white/10 bg-[#171725] p-8 transition-all duration-400 ease-out
                  hover:-translate-y-1.25 hover:border-white/25 hover:bg-[#1c1c2c] focus-visible:-translate-y-1.25 focus-visible:border-white/25 ${focusRing} lg:p-10`}
                                >
                                    <div className="mb-14 flex items-center justify-between">
                                        <IconBox icon={icon} size="lg" />

                                        <span className="text-sm tabular-nums text-white/30 transition-colors duration-400 group-hover:text-cyan-300">
                                            {pad(i)}
                                        </span>
                                    </div>

                                    <h3 className="mb-4 text-xl font-semibold text-white/80 transition-colors duration-400 group-hover:text-white group-focus-visible:text-white">
                                        {title}
                                    </h3>

                                    <p className="mb-8 leading-loose text-white/50 transition-colors duration-400 group-hover:text-white/70">
                                        {text}
                                    </p>

                                    <AccentLine className="mt-auto" />
                                </article>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="mx-auto max-w-7xl px-6 py-24 lg:px-10 lg:py-40">
                <div className="mb-20 max-w-3xl lg:mb-28">
                    <motion.h2
                        {...reveal(0)}
                        className="mb-6 text-3xl font-bold leading-snug sm:text-4xl"
                    >
                        كيف نبني التأثير
                    </motion.h2>

                    <motion.p
                        {...reveal(0.1)}
                        className="text-lg leading-loose text-white/50"
                    >
                        نعمل وفق منهجية تبدأ بفهم الجهة، وتنتهي بحضور إعلامي أكثر قوة
                        وتأثيرًا داخل السوق.
                    </motion.p>
                </div>

                <div className="relative">
                    <motion.div
                        aria-hidden
                        initial={reduce ? false : { scaleX: 0 }}
                        whileInView={{ scaleX: 1 }}
                        viewport={{ once: true, margin: "-80px" }}
                        transition={{ duration: 1.6, ease: "easeInOut" }}
                        className="absolute right-0 top-[1.1rem] hidden h-px w-full origin-right bg-linear-to-l from-cyan-300/70 via-white/15 to-white/5 lg:block"
                    />

                    <ol className="grid gap-14 lg:grid-cols-4 lg:gap-8">
                        {processSteps.map(({ title, text }, i) => (
                            <motion.li
                                key={title}
                                {...reveal(0.25 + i * 0.3, { duration: 0.7 })}
                                className="relative"
                            >
                                <article tabIndex={0} className={`group ${focusRing}`}>
                                    <div className="relative mb-8 flex items-center gap-4">
                                        <span className="relative z-10 flex h-9 items-center bg-[#080711] pl-4 text-2xl font-light tabular-nums text-white/40 transition-colors duration-400 group-hover:text-cyan-300 group-focus-visible:text-cyan-300">
                                            {pad(i)}
                                        </span>

                                        <span
                                            className="h-px flex-1 bg-white/10 lg:hidden"
                                            aria-hidden
                                        />
                                    </div>

                                    <h3 className="mb-4 text-xl font-semibold text-white/80 transition-colors duration-400 group-hover:text-white group-focus-visible:text-white">
                                        {title}
                                    </h3>

                                    <p className="mb-6 leading-loose text-white/50 transition-colors duration-400 group-hover:text-white/70">
                                        {text}
                                    </p>

                                    <AccentLine />
                                </article>
                            </motion.li>
                        ))}
                    </ol>
                </div>
            </section>
        </div>
    );
}