"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

export default function AboutSection() {
  const pathname = usePathname();
  const isEnglish = pathname.startsWith("/en");

  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;

    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -60px 0px",
      },
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, []);

  const reveal = (hidden: string, delay = "") =>
    `transition-[opacity,transform,filter] duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)] ${delay} motion-reduce:translate-y-0 motion-reduce:opacity-100 motion-reduce:blur-0 motion-reduce:transition-none ${visible
      ? "translate-y-0 opacity-100 blur-0"
      : `${hidden} opacity-0 blur-[4px]`
    }`;

  return (
    <section
      ref={ref}
      id="about"
      aria-labelledby="about-heading"
      dir={isEnglish ? "ltr" : "rtl"}
      className="relative isolate overflow-hidden bg-[#080711] py-28 text-white sm:py-32 lg:py-40 light:bg-[#f5f7fa] light:text-[#10131a]"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
      >
        <div className="absolute left-1/2 top-[8%] h-105 w-105 -translate-x-1/2 rounded-full bg-cyan-400/[0.035] blur-[140px] light:bg-cyan-500/6" />

        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.018)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.018)_1px,transparent_1px)] bg-size-[80px_80px] opacity-40 mask-[linear-gradient(to_bottom,black,transparent_75%)] light:bg-[linear-gradient(to_right,rgba(16,19,26,0.035)_1px,transparent_1px),linear-gradient(to_bottom,rgba(16,19,26,0.035)_1px,transparent_1px)] light:opacity-60" />
      </div>

      <div className="mx-auto max-w-6xl px-6 lg:px-10">
        <header
          className={`text-center ${reveal("translate-y-6")}`}
        >
          <div className="mb-7 flex items-center justify-center gap-4">
            <span
              aria-hidden="true"
              className="h-px w-10 bg-cyan-300/70 light:bg-cyan-600/65"
            />

            <p className="text-sm font-medium tracking-[0.22em] text-cyan-300 light:text-cyan-700">
              {isEnglish ? "ABOUT US" : "من نحن"}
            </p>

            <span
              aria-hidden="true"
              className="h-px w-10 bg-cyan-300/70 light:bg-cyan-600/65"
            />
          </div>

          <h2
            id="about-heading"
            className="text-6xl font-bold leading-none tracking-tighter sm:text-7xl md:text-8xl lg:text-[9rem]"
          >
            {isEnglish ? "Our Story" : "قصتنا"}
          </h2>

          <div className="mx-auto mt-9 flex items-center justify-center gap-3">
            <span className="h-1 w-1 rounded-full bg-cyan-300 shadow-[0_0_12px_rgba(103,232,249,0.8)] light:bg-cyan-600 light:shadow-[0_0_12px_rgba(8,145,178,0.35)]" />

            <span className="h-px w-16 bg-linear-to-r from-cyan-300/70 to-transparent light:from-cyan-600/60" />

            <span className="h-1 w-1 rounded-full bg-cyan-300 shadow-[0_0_12px_rgba(103,232,249,0.8)] light:bg-cyan-600 light:shadow-[0_0_12px_rgba(8,145,178,0.35)]" />

            <span className="h-px w-16 bg-linear-to-l from-cyan-300/70 to-transparent light:from-cyan-600/60" />

            <span className="h-1 w-1 rounded-full bg-cyan-300 shadow-[0_0_12px_rgba(103,232,249,0.8)] light:bg-cyan-600 light:shadow-[0_0_12px_rgba(8,145,178,0.35)]" />
          </div>
        </header>

        <article
          className={`mx-auto mt-20 max-w-4xl sm:mt-24 ${reveal(
            "translate-y-8",
            "delay-200",
          )}`}
        >
          <div className="space-y-8 text-lg leading-[2.15] text-white/65 sm:text-xl sm:leading-[2.2] light:text-[#10131a]/65">
            {isEnglish ? (
              <p>
                A2Z was founded to become one of the leading
                companies specializing in economic media
                services across the Kingdom of Saudi Arabia,
                the Gulf region, and the Middle East. We provide
                our services through an integrated ecosystem
                of media solutions, corporate identity
                management, and strategic media content
                creation and management, with a particular
                focus on economic content.
                <br />
                <br />
                We also provide media solutions focused on
                improving the public image of government
                organizations and private-sector entities,
                managing social media platforms, developing
                future media strategies, and managing media
                crises. We also work on developing teams to
                become more efficient and adaptable to the
                rapidly changing media landscape.
                <br />
                <br />
                We stand out through our ability to select the
                most suitable methodologies for shaping the
                corporate image of our clients and their
                brands, placing them at the forefront of the
                media landscape by choosing the right moment
                to deliver the most effective message from the
                perspective of the target audience.
                <br />
                <br />
                Public relations and social media platforms
                are not focused solely on the message you
                communicate, but rather on the perception that
                others have and share about you.
                <br />
                <br />
                That is why choosing the right media partner
                for your organization is critically important
                to the success of your business.
                <br />
                <br />
                A2Z was founded with a vision to bridge the gap
                between media and economics. We have built a
                reputation for innovation, quality, and client
                success. Our team of experts brings together
                diverse skills and perspectives to create
                outstanding work.
                <br />
                <br />
                We work with leading brands, startups, and
                organizations across different industries,
                helping them build their presence, engage their
                audiences, and achieve their goals through
                integrated media and communication solutions.
              </p>
            ) : (
              <p>
                تأسست A2Z لتكون إحدى الشركات الرائدة في مجال
                الخدمات الإعلامية المختصة في الاقتصاد في المملكة
                ودول الخليج العربي والشرق الأوسط، وتقدم خدماتها من
                خلال منظومة متكاملة من الخدمات الإعلامية وإدارة
                الهوية المؤسسية وإنشاء وإدارة المحتوى الإعلامي
                بصورة استراتيجية، خصوصًا المحتوى الاقتصادي.
                <br />
                <br />
                كما تقدم الشركة حلولًا إعلامية في تحسين الصورة
                الذهنية للمنظمات الحكومية وكيانات القطاع الخاص،
                وإدارة وسائل التواصل الاجتماعي، وتقديم الخطط
                الإعلامية المستقبلية وإدارة الأزمات الإعلامية،
                كما نعمل على تطوير فرق العمل لتكون أكثر كفاءة
                ومرونة مع المتغيرات الإعلامية المتسارعة.
                <br />
                <br />
                نتميز بقدرتنا على انتقاء المنهجيات الأكثر ملاءمة
                لوضع الصورة المؤسسية للعميل وعلامته التجارية
                وجعلها في صدارة المشهد الإعلامي، من خلال اختيار
                الوقت المناسب لإطلاق الرسالة الأكثر فعالية من
                منظور الجمهور المستهدف.
                <br />
                <br />
                العلاقات العامة ومنصات التواصل الاجتماعي لا
                تركز على الرسالة التي تطلقها أنت بقدر تركيزها
                على التصور الذي يردده الآخرون عنك.
                <br />
                <br />
                ولذلك يُعدّ اختيار الشريك الإعلامي المناسب لمؤسستك
                مسألة بالغة الأهمية لنجاح أعمالك.
                <br />
                <br />
                تأسست A2Z برؤية لسد الفجوة بين الإعلام والاقتصاد.
                وبنينا سمعة في الابتكار والجودة ونجاح العملاء.
                يجمع فريقنا من الخبراء مهارات ووجهات نظر متنوعة
                لإنشاء عمل متميز.
                <br />
                <br />
                نعمل مع العلامات التجارية الرائدة والشركات الناشئة
                والمنظمات عبر مختلف الصناعات، لمساعدتها على بناء
                حضورها وإشراك جماهيرها وتحقيق أهدافها من خلال حلول
                إعلامية وتواصلية متكاملة.
              </p>
            )}
          </div>
        </article>
      </div>
    </section>
  );
}
