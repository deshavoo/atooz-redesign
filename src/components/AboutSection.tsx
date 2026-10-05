"use client";

import { useEffect, useRef, useState } from "react";

export default function AboutSection() {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;

    if (!el) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { threshold: 0.1 },
    );

    io.observe(el);

    return () => io.disconnect();
  }, []);

  const reveal = (hidden: string, delay: string) =>
    `transition-[opacity,transform] duration-700 ease-out ${delay} motion-reduce:translate-y-0 motion-reduce:opacity-100 motion-reduce:transition-none ${visible ? "translate-y-0 opacity-100" : `${hidden} opacity-0`
    }`;

  return (
    <section
      ref={ref}
      id="about"
      aria-labelledby="about-heading"
      className="bg-[#080711] py-24 text-white lg:py-36"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-10">

        <header
          className={`border-b border-white/10 pb-10 lg:pb-14 ${reveal(
            "translate-y-3",
            "delay-0",
          )}`}
        >
          <p className="text-sm font-medium text-cyan-300">من نحن</p>

          <h2
            id="about-heading"
            className="mt-4 text-5xl font-bold leading-tight tracking-tight sm:text-6xl lg:text-7xl"
          >
            قصتنا
          </h2>
        </header>

        <div className="mt-12 grid gap-10 lg:mt-20 lg:grid-cols-12 lg:gap-x-12">
          <aside
            className={`group lg:col-span-4 ${reveal(
              "translate-y-4",
              "delay-150",
            )}`}
          >
            <p className="text-sm text-white/50">الإعلام × الاقتصاد</p>

            <span className="mt-4 block h-px w-10 bg-cyan-300 transition-[width] duration-700 ease-out group-hover:w-20 motion-reduce:transition-none" />
          </aside>

          <div
            className={`max-w-2xl space-y-8 text-lg leading-9 text-white/70 lg:col-span-8 ${reveal(
              "translate-y-4",
              "delay-150",
            )}`}
          >
            <p className="text-xl leading-10 text-white sm:text-2xl sm:leading-[2.6rem]">
              تأسست A2Z لتكون إحدى الشركات الرائدة في مجال الخدمات الإعلامية
              المختصة في الاقتصاد في المملكة ودول الخليج العربي والشرق الأوسط،
              وتقدم خدماتها من خلال منظومة متكاملة من الخدمات الإعلامية وإدارة
              الهوية المؤسسية وإنشاء وإدارة المحتوى الإعلامي بصورة استراتيجية،
              خصوصًا المحتوى الاقتصادي.
            </p>

            <p>
              كما تقدم الشركة حلولًا إعلامية في تحسين الصورة الذهنية للمنظمات
              الحكومية وكيانات القطاع الخاص، وإدارة وسائل التواصل الاجتماعي،
              وتقديم الخطط الإعلامية المستقبلية وإدارة الأزمات الإعلامية، كما
              نعمل على تطوير فرق العمل لتكون أكثر كفاءة ومرونة مع المتغيرات
              الإعلامية المتسارعة.
            </p>

            <p>
              نتميز بقدرتنا على انتقاء المنهجيات الأكثر ملاءمة لوضع الصورة
              المؤسسية للعميل وعلامته التجارية وجعلها في صدارة المشهد الإعلامي،
              من خلال اختيار الوقت المناسب لإطلاق الرسالة الأكثر فعالية من
              منظور الجمهور المستهدف.
            </p>

            <blockquote className="my-4 border-s border-cyan-300 ps-6 text-2xl font-bold leading-[1.9] tracking-tight text-white sm:text-3xl sm:leading-[1.9] lg:ps-8">
              العلاقات العامة ومنصات التواصل الاجتماعي لا تركز على الرسالة التي
              تطلقها أنت بقدر تركيزها على التصور الذي يردده الآخرون عنك.
            </blockquote>

            <p>
              ولذلك يُعدّ اختيار الشريك الإعلامي المناسب لمؤسستك مسألة بالغة
              الأهمية لنجاح أعمالك.
            </p>

            <p className="border-t border-white/10 pt-8 text-xl font-semibold leading-10 text-white sm:text-2xl">
              تأسست A2Z برؤية لسد الفجوة بين الإعلام والاقتصاد.
            </p>

            <p>
              وبنينا سمعة في الابتكار والجودة ونجاح العملاء. يجمع فريقنا من
              الخبراء مهارات ووجهات نظر متنوعة لإنشاء عمل متميز.
            </p>

            <p>
              نعمل مع العلامات التجارية الرائدة والشركات الناشئة والمنظمات عبر
              مختلف الصناعات، لمساعدتها على بناء حضورها وإشراك جماهيرها وتحقيق
              أهدافها من خلال حلول إعلامية وتواصلية متكاملة.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
