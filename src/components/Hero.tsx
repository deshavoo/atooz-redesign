import Image from "next/image";
import HeroStats from "./HeroStats";

export default function Hero() {
    return (
        <>
            <section
                aria-labelledby="atooz-hero-title"
                className="relative isolate flex min-h-svh items-center justify-center overflow-hidden bg-[#080a13] px-5 py-24 text-center text-white sm:px-8"
                dir="rtl"
            >
                <Image
                    src="/images/hero.webp"
                    alt=""
                    fill
                    priority
                    sizes="100vw"
                    className="-z-20 object-cover object-center"
                />

                <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(7,9,17,0.4)_0%,rgba(7,9,17,0.52)_48%,rgba(7,9,17,0.72)_100%),linear-gradient(90deg,rgba(7,9,17,0.38)_0%,transparent_50%,rgba(7,9,17,0.38)_100%)]"
                />
                <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_22%_26%,rgba(112,72,180,0.24),transparent_38%),radial-gradient(ellipse_at_82%_68%,rgba(51,159,177,0.17),transparent_34%),radial-gradient(ellipse_at_center,transparent_43%,rgba(2,4,10,0.48)_100%)]"
                />

                <div className="mx-auto flex w-full max-w-5xl flex-col items-center">
                    <p className="mb-5 text-[0.68rem] font-medium tracking-[0.28em] text-white/75 sm:mb-7 sm:text-xs sm:tracking-[0.34em]">
                        A2Z WITH DESHAVOO
                    </p>

                    <h1
                        id="atooz-hero-title"
                        className="max-w-4xl text-balance text-[clamp(2.35rem,6.2vw,5.4rem)] font-semibold leading-[1.42] tracking-[-0.045em] text-white drop-shadow-[0_2px_24px_rgba(0,0,0,0.24)]"
                    >
                        حلول
                        <br className="hidden sm:block" />
                        <span className="bg-linear-to-l text-white bg-clip-text">

                            إعلامية اقتصادية
                        </span>
                    </h1>

                    <p className="mt-5 max-w-2xl text-pretty text-sm leading-8 text-white/80 sm:mt-6 sm:text-base sm:leading-9">
                        بنصمم ونطوّر تجارب رقمية تصنع حضورًا أقوى للبراندات وتقرّبها من جمهورها.
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
                            className="inline-flex min-h-12 items-center justify-center rounded-full border border-white/30 bg-white/6 px-7 text-sm font-medium text-white/95 backdrop-blur-sm transition duration-200 hover:border-white/55 hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-200 motion-reduce:transition-none"
                        >
                            شاهد أعمالنا
                        </a>
                    </div>
                </div>

                <span
                    aria-hidden="true"
                    className="absolute bottom-8 left-1/2 block h-7 w-px -translate-x-1/2 bg-linear-to-b from-white/70 to-transparent sm:bottom-10"
                />
            </section>


            <div className="relative z-10 -mt-8 mb-12 px-4 sm:-mt-10 sm:mb-16">
                <HeroStats />
            </div>
        </>
    );
}