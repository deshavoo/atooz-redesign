"use client";

import { motion, useReducedMotion, type Variants } from "motion/react";
import { Lightbulb, Orbit, Sparkles, TrendingUp } from "lucide-react";

const VALUES = [
  {
    number: "01",
    title: "الابتكار",
    description: "الريادة بحلول متطورة ونهج إبداعية",
    Icon: Lightbulb,
    tilt: "group-hover:rotate-12 group-focus-visible:rotate-12",
  },
  {
    number: "02",
    title: "التميز",
    description: "الحفاظ على أعلى المعايير في كل ما نقوم به",
    Icon: Sparkles,
    tilt: "group-hover:-rotate-12 group-focus-visible:-rotate-12",
  },
  {
    number: "03",
    title: "النمو",
    description: "دفع النمو المستدام لعملائنا وشركائنا",
    Icon: TrendingUp,
    tilt: "group-hover:rotate-12 group-focus-visible:rotate-12",
  },
  {
    number: "04",
    title: "التأثير",
    description: "خلق تغيير ذي معنى وقيمة دائمة",
    Icon: Orbit,
    tilt: "group-hover:-rotate-12 group-focus-visible:-rotate-12",
  },
];

const GOALS = [
  {
    number: "01",
    title: "التوسع",
    text: "نحن ملتزمون بتوسيع نطاقنا وقدراتنا، وجلب حلول مبتكرة لمزيد من الشركات في جميع أنحاء المنطقة. هدفنا هو أن نصبح الشريك المفضل للشركات التي تتطلع إلى تحويل استراتيجيات التواصل الخاصة بها.",
  },
  {
    number: "02",
    title: "الابتكار",
    text: "نستثمر في التقنيات الجديدة والمواهب والشراكات التي ستمكننا من تقديم أكبر قيمة لعملائنا. نبني مستقبلًا يعمل فيه الإعلام والتواصل الاستراتيجي بسلاسة معًا لدفع نجاح الأعمال.",
  },
  {
    number: "03",
    title: "التأثير",
    text: "من خلال الابتكار المستمر والالتزام بالتميز، نشكّل مستقبل تواصل الشركات واتصالاتها ونموها في عالم رقمي متزايد.",
  },
];

const EASE = [0.22, 1, 0.36, 1] as const;

export default function VisionSection() {
  const reduce = useReducedMotion();

  const dy = reduce ? 0 : 20;
  const dx = reduce ? 0 : 14;

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
      y: dy,
      x: dx,
    },
    show: {
      opacity: 1,
      y: 0,
      x: 0,
      transition: {
        duration: 0.6,
        ease: EASE,
      },
    },
  };

  const fadeUp = (delay = 0) => ({
    initial: {
      opacity: 0,
      y: dy,
    },
    whileInView: {
      opacity: 1,
      y: 0,
    },
    viewport: {
      once: true,
      amount: 0.3,
    },
    transition: {
      duration: 0.7,
      ease: EASE,
      delay: reduce ? 0 : delay,
    },
  });

  return (
    <section
      id="vision"
      aria-labelledby="vision-heading"
      className="bg-[#080711] py-24 text-white lg:py-36"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <motion.header {...fadeUp()}>
          <p className="text-sm font-medium text-cyan-300">رؤيتنا</p>

          <h2
            id="vision-heading"
            className="mt-4 text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl"
          >
            بيان رؤيتنا
          </h2>
        </motion.header>

        <motion.div
          {...fadeUp(0.12)}
          className="mt-10 max-w-5xl lg:mt-14"
        >
          <p className="text-2xl font-bold leading-[1.8] tracking-tight text-white sm:text-4xl sm:leading-[1.8] lg:text-5xl lg:leading-[1.7]">
            أن نكون الشركة{" "}
            <strong className="font-bold text-white">الرائدة</strong> في
            الاستراتيجية والإعلام والاقتصاد والعلامات التجارية في المنطقة،
            معترفًا بها{" "}
            <strong className="font-bold text-white">للابتكار</strong>{" "}
            والتميز{" "}
            <strong className="font-bold text-white">والتأثير</strong>{" "}
            التحويلي.
          </p>

          <p className="mt-8 max-w-3xl text-lg leading-9 text-white sm:text-xl sm:leading-10">
            نتخيل مستقبلًا تتواصل فيه الشركات بوضوح وإبداع وهدف، وتُبنى فيه
            روابط ذات معنى تدفع{" "}
            <strong className="font-semibold text-cyan-200">النمو</strong>{" "}
            والنجاح.
          </p>
        </motion.div>

        <motion.div
          variants={list}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
          className="mt-16 border-t border-white/15 lg:mt-24"
        >
          {VALUES.map(({ number, title, description, Icon, tilt }) => (
            <motion.article
              key={title}
              variants={row}
              tabIndex={0}
              className="group relative border-b border-white/15 outline-none"
            >
              <div className="-mx-4 grid grid-cols-[auto_1fr_auto] items-center gap-4 rounded-2xl px-4 py-8 transition-[transform,background-color,box-shadow] duration-500 group-hover:-translate-y-0.5 group-hover:bg-white/[0.035] group-hover:shadow-[0_12px_40px_rgba(0,0,0,0.12)] group-focus-visible:-translate-y-0.5 group-focus-visible:bg-white/[0.035] group-focus-visible:shadow-[0_12px_40px_rgba(0,0,0,0.12)] group-focus-visible:ring-1 group-focus-visible:ring-cyan-300/40 motion-reduce:transition-none motion-reduce:group-hover:translate-y-0 sm:gap-8 lg:-mx-6 lg:px-6 lg:py-10">
                <span className="w-8 text-base font-semibold tabular-nums text-white/60 transition-colors duration-500 group-hover:text-cyan-300 group-focus-visible:text-cyan-300 sm:w-12 sm:text-xl">
                  {number}
                </span>

                <div>
                  <h3 className="text-3xl font-bold tracking-tight text-white transition-colors duration-500 group-hover:text-white group-focus-visible:text-white sm:text-4xl lg:text-5xl">
                    {title}
                  </h3>

                  <p className="mt-3 max-w-md text-base leading-7 text-white/60 transition-colors duration-500 group-hover:text-white/80 group-focus-visible:text-white/80">
                    {description}
                  </p>
                </div>

                <div
                  className={`flex size-12 items-center justify-center rounded-xl border border-white/15 text-white/70 transition-[transform,background-color,border-color,color] duration-500 group-hover:scale-105 group-hover:border-cyan-300/40 group-hover:bg-cyan-300/10 group-hover:text-cyan-300 group-focus-visible:scale-105 group-focus-visible:border-cyan-300/40 group-focus-visible:bg-cyan-300/10 group-focus-visible:text-cyan-300 motion-reduce:transition-colors motion-reduce:group-hover:scale-100 motion-reduce:group-hover:rotate-0 sm:size-14 ${tilt}`}
                >
                  <Icon
                    aria-hidden="true"
                    className="size-6 sm:size-7"
                    strokeWidth={1.5}
                  />
                </div>
              </div>

              <span className="absolute inset-s-0 -bottom-px block h-px w-0 bg-cyan-300 transition-[width] duration-700 ease-out group-hover:w-24 group-focus-visible:w-24 motion-reduce:transition-none" />
            </motion.article>
          ))}
        </motion.div>

        <section
          aria-labelledby="goals-heading"
          className="mt-24 grid gap-10 lg:mt-36 lg:grid-cols-12 lg:gap-x-12"
        >
          <motion.h3
            {...fadeUp()}
            id="goals-heading"
            className="text-3xl font-bold leading-tight tracking-tight sm:text-4xl lg:col-span-4"
          >
            أهدافنا المستقبلية
          </motion.h3>

          <div className="space-y-12 border-s border-white/15 ps-6 lg:col-span-8 lg:space-y-16 lg:ps-10">
            {GOALS.map(({ number, title, text }, i) => (
              <motion.article
                key={title}
                {...fadeUp(i * 0.08)}
                className="max-w-2xl"
              >
                <p className="text-sm font-semibold tabular-nums text-cyan-300">
                  {number}
                </p>

                <h4 className="mt-2 text-2xl font-bold tracking-tight">
                  {title}
                </h4>

                <p className="mt-4 text-lg leading-9 text-white/80">{text}</p>
              </motion.article>
            ))}
          </div>
        </section>
      </div>
    </section>
  );
}
