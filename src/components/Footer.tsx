"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { motion, useReducedMotion } from "motion/react";

import {
  ArrowUpLeft,
  Mail,
  MapPin,
  Phone,
} from "lucide-react";

import {
  FaBehance,
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";

const navLinks = {
  ar: [
    { label: "الرئيسية", href: "/" },
    { label: "كيف نصنع التأثير", href: "#impact" },
    { label: "رؤيتنا", href: "#vision" },
    { label: "شركاؤنا", href: "#partners" },
    { label: "اتصل بنا", href: "#contact" },
  ],
  en: [
    { label: "Home", href: "/en" },
    { label: "How We Create Impact", href: "/en#impact" },
    { label: "Our Vision", href: "/en#vision" },
    { label: "Our Partners", href: "/en#partners" },
    { label: "Contact Us", href: "/en#contact" },
  ],
};

const CONTACT = {
  address: "الرياض - حي الملك فهد - حي العليا",
  addressEn: "Riyadh - King Fahd District - Al Olaya District",
  email: "info@atooz.sa",
  phone: "+201155290421",
  phoneHref: "tel:+201155290421",
};

const socials = [
  {
    label: "Instagram",
    href: "https://www.instagram.com/a2zmediahub/",
    icon: FaInstagram,
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/a2zmediahub/",
    icon: FaLinkedinIn,
  },
  {
    label: "Facebook",
    href: "https://www.facebook.com/a2zmediahub/",
    icon: FaFacebookF,
  },
  {
    label: "Behance",
    href: "https://www.behance.net/a2zmediahub",
    icon: FaBehance,
  },
];

const DEV_URL =
  "https://portfolio-five-gules-41.vercel.app/";

const techStack = [
  "Next.js",
  "React",
  "TypeScript",
  "Tailwind CSS",
  "Motion",
  "Lucide React",
  "Vercel",
];

const EASE = [0.22, 1, 0.36, 1] as const;

const ring =
  "outline-none focus-visible:ring-1 focus-visible:ring-cyan-300/60 focus-visible:ring-offset-2 focus-visible:ring-offset-[#080711] rounded-sm light:focus-visible:ring-cyan-600/60 light:focus-visible:ring-offset-[#f5f7fa]";

export default function Footer() {
  const pathname = usePathname();
  const isEnglish = pathname.startsWith("/en");

  const reduce = useReducedMotion();

  const currentNavLinks = isEnglish
    ? navLinks.en
    : navLinks.ar;

  const reveal = (delay = 0, y = 20) =>
    reduce
      ? { initial: false as const }
      : {
        initial: { opacity: 0, y },
        whileInView: { opacity: 1, y: 0 },
        viewport: {
          once: true,
          margin: "-40px",
        },
        transition: {
          duration: 0.65,
          delay,
          ease: EASE,
        },
      };

  const marqueeGroup = (
    <div className="flex shrink-0 items-center">
      {techStack.map((tech) => (
        <span
          key={tech}
          className="flex shrink-0 items-center"
        >
          <span>{tech}</span>

          <span
            aria-hidden="true"
            className="mx-5 text-cyan-400/30 light:text-cyan-700/25"
          >
            •
          </span>
        </span>
      ))}
    </div>
  );

  return (
    <footer
      dir={isEnglish ? "ltr" : "rtl"}
      className="relative overflow-hidden border-t border-white/10 bg-[#080711] font-[Cairo,sans-serif] text-white light:border-black/8 light:bg-[#f5f7fa] light:text-[#10131a]"
    >
      <style>{`
        @keyframes a2z-marquee {
          0% {
            transform: translate3d(0, 0, 0);
          }

          100% {
            transform: translate3d(-50%, 0, 0);
          }
        }

        .a2z-marquee-track {
          animation: a2z-marquee 35s linear infinite;
          will-change: transform;
        }

        .a2z-marquee-track:hover {
          animation-play-state: paused;
        }

        @media (prefers-reduced-motion: reduce) {
          .a2z-marquee-track {
            animation: none;
            transform: translate3d(0, 0, 0);
          }
        }
      `}</style>

      <span
        aria-hidden="true"
        className="absolute right-6 top-0 h-px w-20 bg-cyan-300/60 light:bg-cyan-600/60 lg:right-10"
      />

      <div className="mx-auto max-w-7xl px-6 pb-5 pt-10 lg:px-10 lg:pb-6 lg:pt-12">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
          {/* Brand */}
          <motion.div
            {...reveal(0)}
            className="lg:col-span-5"
          >
            <Link
              href={isEnglish ? "/en" : "/"}
              aria-label="A2Z Media Hub"
              className={`group inline-flex items-center ${ring}`}
            >
              <div className="flex h-12 w-36 items-center">
                <Image
                  src="/images/logo/logo-01.png"
                  alt="A2Z Media Hub"
                  width={144}
                  height={48}
                  priority
                  className="h-auto w-36 object-contain transition-transform duration-500 group-hover:scale-[1.03]"
                />
              </div>
            </Link>

            <p className="mt-5 max-w-sm text-sm leading-7 text-white/45 sm:text-base light:text-[#10131a]/50">
              {isEnglish
                ? "Media and communication solutions that create lasting impact."
                : "حلول إعلامية واتصالية تصنع تأثيرًا طويل المدى."}
            </p>

            <Link
              href={isEnglish ? "/en#contact" : "#contact"}
              className={`group mt-6 inline-flex items-center gap-3 border-b border-cyan-300/35 pb-2 text-sm font-semibold text-white transition-colors duration-300 hover:border-cyan-300 hover:text-cyan-300 sm:text-base light:border-cyan-600/35 light:text-[#10131a] light:hover:border-cyan-600 light:hover:text-cyan-700 ${ring}`}
            >
              {isEnglish
                ? "Start Your Project"
                : "ابدأ مشروعك معنا"}

              <ArrowUpLeft
                aria-hidden="true"
                strokeWidth={1.7}
                className={`h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1 group-hover:-translate-y-1 ${isEnglish ? "rotate-90" : ""
                  }`}
              />
            </Link>
          </motion.div>

          {/* Navigation */}
          <motion.nav
            {...reveal(0.08)}
            aria-label={
              isEnglish
                ? "Footer navigation"
                : "روابط التذييل"
            }
            className="lg:col-span-3"
          >
            <h2 className="mb-5 text-xs font-medium text-white/25 light:text-[#10131a]/35">
              {isEnglish ? "Explore" : "استكشف"}
            </h2>

            <ul className="grid gap-3">
              {currentNavLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className={`group inline-flex items-center gap-2 text-sm text-white/45 transition-all duration-300 hover:-translate-x-1 hover:text-white focus-visible:-translate-x-1 focus-visible:text-white sm:text-[15px] light:text-[#10131a]/55 light:hover:text-[#10131a] light:focus-visible:text-[#10131a] ${ring}`}
                  >
                    <span className="h-px w-0 bg-cyan-300 transition-all duration-300 group-hover:w-3 light:bg-cyan-600" />

                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.nav>

          {/* Contact */}
          <motion.div
            {...reveal(0.16)}
            className="lg:col-span-4"
          >
            <h2 className="mb-5 text-xs font-medium text-white/25 light:text-[#10131a]/35">
              {isEnglish ? "Get in touch" : "تواصل معنا"}
            </h2>

            <ul className="grid gap-3.5 text-sm text-white/45 light:text-[#10131a]/55">
              {/* Location */}
              <li className="group flex items-start gap-3.5 transition-colors duration-300 hover:text-white light:hover:text-[#10131a]">
                <MapPin
                  aria-hidden="true"
                  strokeWidth={1.5}
                  className="mt-0.5 h-4 w-4 shrink-0 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:text-cyan-300 light:group-hover:text-cyan-700"
                />

                <address className="not-italic">
                  {isEnglish
                    ? CONTACT.addressEn
                    : CONTACT.address}
                </address>
              </li>

              {/* Email */}
              <li className="group flex items-center gap-3.5">
                <Mail
                  aria-hidden="true"
                  strokeWidth={1.5}
                  className="h-4 w-4 shrink-0 transition-all duration-300 group-hover:-translate-x-1 group-hover:text-cyan-300 light:group-hover:text-cyan-700"
                />

                <a
                  href={`mailto:${CONTACT.email}`}
                  dir="ltr"
                  className={`transition-colors duration-300 hover:text-white focus-visible:text-white light:hover:text-[#10131a] light:focus-visible:text-[#10131a] ${ring}`}
                >
                  {CONTACT.email}
                </a>
              </li>

              {/* Phone */}
              <li className="group flex items-center gap-3.5">
                <Phone
                  aria-hidden="true"
                  strokeWidth={1.5}
                  className="h-4 w-4 shrink-0 transition-all duration-300 group-hover:-translate-x-1 group-hover:text-cyan-300 light:group-hover:text-cyan-700"
                />

                <a
                  href={CONTACT.phoneHref}
                  dir="ltr"
                  className={`transition-colors duration-300 hover:text-white focus-visible:text-white light:hover:text-[#10131a] light:focus-visible:text-[#10131a] ${ring}`}
                >
                  {CONTACT.phone}
                </a>
              </li>
            </ul>

            {/* Social links */}
            <div className="mt-6 flex items-center gap-2.5">
              {socials.map(
                ({
                  label,
                  href,
                  icon: Icon,
                }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className={`group/social inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/2 text-white/40 transition-all duration-300 hover:-translate-y-1 hover:border-cyan-300/30 hover:bg-cyan-300/6 hover:text-cyan-300 hover:shadow-[0_8px_25px_rgba(34,211,238,0.08)] focus-visible:-translate-y-1 focus-visible:border-cyan-300/30 focus-visible:text-cyan-300 light:border-black/10 light:bg-black/2.5 light:text-[#10131a]/45 light:hover:border-cyan-600/30 light:hover:bg-cyan-600/8 light:hover:text-cyan-700 light:hover:shadow-[0_8px_25px_rgba(8,145,178,0.08)] light:focus-visible:border-cyan-600/30 light:focus-visible:text-cyan-700 ${ring}`}
                  >
                    <Icon
                      aria-hidden="true"
                      className="h-4 w-4 transition-transform duration-500 group-hover/social:rotate-45 group-focus-visible/social:rotate-45"
                    />
                  </a>
                ),
              )}
            </div>
          </motion.div>
        </div>

        {/* Tech marquee */}
        <motion.div
          {...reveal(0.08, 0)}
          className="mt-8 border-t border-white/5 pt-5 light:border-black/8"
        >
          <div
            dir="ltr"
            className="relative select-none overflow-hidden"
          >
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-linear-to-r from-[#080711] via-[#080711]/80 to-transparent sm:w-28 light:from-[#f5f7fa] light:via-[#f5f7fa]/80"
            />

            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-linear-to-l from-[#080711] via-[#080711]/80 to-transparent sm:w-28 light:from-[#f5f7fa] light:via-[#f5f7fa]/80"
            />

            <div className="overflow-hidden text-[10px] text-white/20 sm:text-xs light:text-[#10131a]/20">
              <div className="a2z-marquee-track flex w-max">
                <div className="flex shrink-0 items-center">
                  {marqueeGroup}
                  {marqueeGroup}
                </div>

                <div
                  className="flex shrink-0 items-center"
                  aria-hidden="true"
                >
                  {marqueeGroup}
                  {marqueeGroup}
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Copyright */}
        <motion.div
          {...reveal(0.12, 0)}
          className="mt-5 flex flex-col gap-2 border-t border-white/5 pt-4 text-[10px] text-white/25 sm:flex-row sm:items-center sm:justify-between sm:text-xs light:border-black/8 light:text-[#10131a]/35"
        >
          <p
            dir="ltr"
            className="text-right"
          >
            © 2026 A2Z Media Hub.{" "}
            {isEnglish
              ? "All rights reserved."
              : "جميع الحقوق محفوظة."}
          </p>

          <p
            dir="ltr"
            className="text-right sm:text-left"
          >
            {isEnglish
              ? "Developed by"
              : "تم التطوير بواسطة"}{" "}

            <a
              href={DEV_URL}
              target="_blank"
              rel="noopener noreferrer"
              className={`underline decoration-transparent underline-offset-4 transition-all duration-300 hover:text-cyan-300 hover:decoration-cyan-300/60 focus-visible:text-cyan-300 light:hover:text-cyan-700 light:hover:decoration-cyan-600/60 light:focus-visible:text-cyan-700 ${ring}`}
            >
              Deshavoo. and alot of coffee ☕
            </a>
          </p>
        </motion.div>
      </div>
    </footer>
  );
}
