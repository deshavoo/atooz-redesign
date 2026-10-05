"use client";

import { motion, useReducedMotion, type Variants } from "motion/react";
import {
  Lightbulb,
  Orbit,
  Sparkles,
  TrendingUp,
} from "lucide-react";

const VALUES = [
  {
    number: "01",
    title: "الابتكار",
    description: "الريادة بحلول متطورة ونهج إبداعية",
    Icon: Lightbulb,
    tilt: "group-hover:rotate-6 group-focus-visible:rotate-6",
  },
  {
    number: "02",
    title: "التميز",
    description: "الحفاظ على أعلى المعايير في كل ما نقوم به",
    Icon: Sparkles,
    tilt: "group-hover:-rotate-6 group-focus-visible:-rotate-6",
  },
  {
    number: "03",
    title: "النمو",
    description: "دفع النمو المستدام لعملائنا وشركائنا",
    Icon: TrendingUp,
    tilt: "group-hover:rotate-6 group-focus-visible:rotate-6",
  },
  {
    number: "04",
    title: "التأثير",
    description: "خلق تغيير ذي معنى وقيمة دائمة",
    Icon: Orbit,
    tilt: "group-hover:-rotate-6 group-focus-visible:-rotate-6",
  },
];

const GOALS = [
  {

    title: "التوسع",
    text: "نحن ملتزمون بتوسيع نطاقنا وقدراتنا، وجلب حلول مبتكرة لمزيد من الشركات في جميع أنحاء المنطقة. هدفنا هو أن نصبح الشريك المفضل للشركات التي تتطلع إلى تحويل استراتيجيات التواصل الخاصة بها.",
  },
  {

    title: "الابتكار",
    text: "نستثمر في التقنيات الجديدة والمواهب والشراكات التي ستمكننا من تقديم أكبر قيمة لعملائنا. نبني مستقبلًا يعمل فيه الإعلام والتواصل الاستراتيجي بسلاسة معًا لدفع نجاح الأعمال.",
  },
  {
    number: "",
    title: "التأثير",
    text: "من خلال الابتكار المستمر والالتزام بالتميز، نشكّل مستقبل تواصل الشركات واتصالاتها ونموها في عالم رقمي متزايد.",
  },
];

const EASE = [0.22, 1, 0.36, 1] as const;

export default function VisionSection() {
  const reduce = useReducedMotion();

  const fadeUp = (delay = 0) => ({
    initial: {
      opacity: 0,
      y: reduce ? 0 : 24,
    },
    whileInView: {
      opacity: 1,
      y: 0,
    },
    viewport: {
      once: true,
      amount: 0.25,
    },
    transition: {
      duration: 0.8,
      ease: EASE,
      delay: reduce ? 0 : delay,
    },
  });

  const list: Variants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: reduce ? 0 : 0.1,
      },
    },
  };

  const row: Variants = {
    hidden: {
      opacity: 0,
      y: reduce ? 0 : 24,
    },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        ease: EASE,
      },
    },
  };

  return (
    <section
      id="vision"
      aria-labelledby="vision-heading"
      className="relative isolate overflow-hidden bg-[#080711] py-28 text-white sm:py-32 lg:py-40"
    >

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
      >
        <div className="absolute left-1/2 top-[5%] h-125 w-125 -translate-x-1/2 rounded-full bg-cyan-400/[0.035] blur-[150px]" />
        <div className="absolute bottom-[10%] right-[-10%] h-100 w-100 rounded-full bg-blue-500/2.5 blur-[140px]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.018)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.018)_1px,transparent_1px)] bg-size-[80px_80px] opacity-40 mask-[linear-gradient(to_bottom,black,transparent_80%)]" />
      </div>

      <div className="mx-auto max-w-7xl px-6 lg:px-10">


        <header
          className="mx-auto max-w-5xl text-center"
        >
          <motion.div {...fadeUp()}>
            <div className="mb-7 flex items-center justify-center gap-4">
              <span
                aria-hidden="true"
                className="h-px w-10 bg-cyan-300/70"
              />

              <p className="text-sm font-medium tracking-[0.22em] text-cyan-300">
                رؤيتنا
              </p>

              <span
                aria-hidden="true"
                className="h-px w-10 bg-cyan-300/70"
              />
            </div>

            <h2
              id="vision-heading"
              className="text-6xl font-bold leading-none tracking-tighter sm:text-7xl md:text-8xl lg:text-[8rem]"
            >
              بيان رؤيتنا
            </h2>

            <p className="mx-auto mt-7 max-w-2xl text-base font-medium leading-8 text-white/40 sm:text-lg">
              تشكيل مستقبل الإعلام والتواصل الاستراتيجي
            </p>

            <div className="mx-auto mt-9 flex items-center justify-center gap-3">
              <span className="h-1 w-1 rounded-full bg-cyan-300 shadow-[0_0_12px_rgba(103,232,249,0.8)]" />
              <span className="h-px w-16 bg-linear-to-r from-cyan-300/70 to-transparent" />
              <span className="h-1 w-1 rounded-full bg-cyan-300 shadow-[0_0_12px_rgba(103,232,249,0.8)]" />
              <span className="h-px w-16 bg-linear-to-l from-cyan-300/70 to-transparent" />
              <span className="h-1 w-1 rounded-full bg-cyan-300 shadow-[0_0_12px_rgba(103,232,249,0.8)]" />
            </div>
          </motion.div>
        </header>


        <motion.div
          {...fadeUp(0.15)}
          className="mx-auto mt-24 max-w-4xl text-center sm:mt-28"
        >
          <p className="mx-auto mt-8 max-w-4xl text-xl font-medium leading-loose text-white/80 sm:text-2xl sm:leading-[2.05] lg:text-3xl lg:leading-[2.05]">
            أن نكون الشركة{" "}
            <strong className="font-bold text-white">
              الرائدة
            </strong>{" "}
            في الاستراتيجية والإعلام والاقتصاد والعلامات التجارية في المنطقة،
            معترف بها{" "}
            <strong className="font-semibold text-cyan-200">
              للابتكار
            </strong>{" "}
            والتميز{" "}
            <strong className="font-semibold text-cyan-200">
              والتأثير التحويلي
            </strong>
            .
          </p>

          <p className="mx-auto mt-8 max-w-3xl text-lg leading-[2.1] text-white/45 sm:text-xl sm:leading-[2.15]">
            نتخيل مستقبلًا حيث تتواصل الشركات بوضوح وإبداع وهدف، وبناء روابط ذات
            معنى تدفع{" "}
            <strong className="font-semibold text-cyan-200">
              النمو
            </strong>{" "}
            والنجاح.
          </p>

          <div
            aria-hidden="true"
            className="mx-auto mt-10 h-px w-20 bg-linear-to-r from-transparent via-cyan-300/60 to-transparent"
          />
        </motion.div>



        <motion.div
          variants={list}
          initial="hidden"
          whileInView="show"
          viewport={{
            once: true,
            amount: 0.20,
          }}
          className="mt-24 grid gap-4 sm:grid-cols-2 lg:mt-32 lg:grid-cols-4"
        >
          {VALUES.map(
            ({
              number,
              title,
              description,
              Icon,
              tilt,
            }) => (
              <motion.article
                key={title}
                variants={row}
                tabIndex={0}
                className="group relative overflow-hidden rounded-2xl border border-white/8 bg-white/2.5 p-6 outline-none transition-[transform,background-color,border-color,box-shadow] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] will-change-transform hover:-translate-y-0.5 hover:border-cyan-300/20 hover:bg-white/4.5 hover:shadow-[0_24px_70px_rgba(0,0,0,0.22)] focus-visible:-translate-y-0.5 focus-visible:border-cyan-300/30 focus-visible:bg-white/4.5 focus-visible:ring-1 focus-visible:ring-cyan-300/30 motion-reduce:transition-none motion-reduce:hover:translate-y-0 motion-reduce:focus-visible:translate-y-0"
              >
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute -right-20 -top-20 h-40 w-40 rounded-full bg-cyan-300/5 blur-3xl opacity-70 transition-[transform,opacity] duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-150 group-hover:opacity-100"
                />

                <div className="relative flex items-center justify-between">
                  <span className="text-xs font-semibold tabular-nums tracking-[0.2em] text-white/30 transition-colors duration-700 ease-out group-hover:text-cyan-300">
                    {number}
                  </span>

                  <div
                    className={`flex size-12 items-center justify-center rounded-xl border border-white/10 bg-white/2 text-white/60 transition-[transform,background-color,border-color,color] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] will-change-transform group-hover:border-cyan-300/30 group-hover:bg-cyan-300/10 group-hover:text-cyan-300 group-focus-visible:border-cyan-300/30 group-focus-visible:bg-cyan-300/10 group-focus-visible:text-cyan-300 motion-reduce:transition-colors ${tilt}`}
                  >
                    <Icon
                      aria-hidden="true"
                      className="size-6 transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
                      strokeWidth={1.5}
                    />
                  </div>
                </div>

                <div className="relative mt-12">
                  <h3 className="text-3xl font-bold tracking-tight text-white transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-0.5">
                    {title}
                  </h3>

                  <p className="mt-4 text-base leading-8 text-white/50 transition-colors duration-700 ease-out group-hover:text-white/70">
                    {description}
                  </p>
                </div>

                <span
                  aria-hidden="true"
                  className="absolute inset-x-6 bottom-0 h-px origin-right scale-x-0 bg-cyan-300 transition-transform duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-x-100 group-focus-visible:scale-x-100 motion-reduce:transition-none"
                />
              </motion.article>
            ),
          )}
        </motion.div>


        <section
          aria-labelledby="goals-heading"
          className="mt-28 lg:mt-40"
        >
          <motion.header
            {...fadeUp()}
            className="text-center"
          >
            <p className="text-xs font-medium tracking-[0.25em] text-cyan-300">
              إلى أين نتجه
            </p>

            <h3
              id="goals-heading"
              className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl"
            >
              أهدافنا المستقبلية
            </h3>
          </motion.header>

          <div className="mx-auto mt-16 max-w-5xl">
            <div className="space-y-0">
              {GOALS.map(({ number, title, text }, index) => (
                <motion.article
                  key={title}
                  {...fadeUp(index * 0.08)}
                  className="group relative grid gap-6 border-t border-white/8 py-8 transition-[background-color,border-color,transform] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] sm:grid-cols-[80px_180px_1fr] sm:items-start sm:py-10 hover:border-cyan-300/20 hover:bg-white/1.5 motion-reduce:transition-none"
                >
                  {/* Hover glow */}
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-y-0 left-0 w-px origin-top scale-y-0 bg-cyan-300/70 opacity-0 transition-[transform,opacity] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-y-100 group-hover:opacity-100 motion-reduce:transition-none"
                  />

                  {/* Soft ambient glow */}
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute -left-10 top-1/2 h-24 w-24 -translate-y-1/2 rounded-full bg-cyan-300/[0.035] opacity-0 blur-3xl transition-opacity duration-1000 ease-out group-hover:opacity-100"
                  />

                  {/* Number */}
                  <span className="relative text-sm font-semibold tabular-nums text-cyan-300/50 transition-[color,transform] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-1 group-hover:text-cyan-300">
                    {number}
                  </span>

                  {/* Title */}
                  <h4 className="relative text-2xl font-bold tracking-tight text-white transition-[transform,color] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-1 sm:text-3xl">
                    {title}
                  </h4>

                  {/* Description */}
                  <p className="relative text-base leading-8 text-white/50 transition-[color,transform] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-0.5 group-hover:text-white/70 sm:text-lg">
                    {text}
                  </p>

                  {/* Bottom micro line */}
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute bottom-0 left-0 h-px w-0 bg-linear-to-r from-cyan-300/60 to-transparent transition-[width] duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:w-24 motion-reduce:transition-none"
                  />
                </motion.article>
              ))}
            </div>
          </div>
        </section>
      </div>
    </section>
  );
}
