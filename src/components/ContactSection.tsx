"use client";

import { useState, type ChangeEvent, type FormEvent } from "react";

import { motion, useReducedMotion } from "motion/react";

import {
  MapPin,
  Mail,
  Phone,
  CheckCircle2,
  AlertCircle,
  ArrowUpLeft,
} from "lucide-react";

const CONTACT = {
  address: "الرياض - حي الملك فهد - حي العليا",
  email: "info@atooz.sa",
  phone: "+201155290421",
  phoneHref: "tel:+201155290421",
};

type FormValues = {
  name: string;
  email: string;
  phone: string;
  company: string;
  message: string;
  website: string;
  service: string;
};

const initialValues: FormValues = {
  name: "",
  email: "",
  phone: "",
  company: "",
  message: "",
  website: "",
  service: "",
};

type FormErrors = Partial<Record<keyof FormValues, string>>;

const services = [
  "استراتيجية العلامة التجارية",
  "التسويق الرقمي",
  "إنتاج الفيديو",
  "إنشاء المحتوى",
  "التصميم الإبداعي",
  "العلاقات العامة",
];

const fields = [
  {
    name: "name",
    label: "الاسم",
    placeholder: "الاسم بالكامل",
    type: "text",
    autoComplete: "name",
    required: true,
  },
  {
    name: "email",
    label: "البريد الإلكتروني",
    placeholder: "name@example.com",
    type: "email",
    autoComplete: "email",
    required: true,
  },
  {
    name: "phone",
    label: "رقم الهاتف",
    placeholder: "رقم الهاتف",
    type: "tel",
    autoComplete: "tel",
    required: true,
  },
  {
    name: "company",
    label: "الشركة",
    placeholder: "اسم الشركة",
    type: "text",
    autoComplete: "organization",
    required: false,
  },
] as const;

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const phoneRegex = /^[+\d\s()-]{7,20}$/;

const MAX_MESSAGE = 3000;

const EASE = [0.22, 1, 0.36, 1] as const;

const inputClass =
  "w-full border-b border-white/10 bg-transparent px-0 py-3 text-base text-white outline-none transition-colors duration-200 placeholder:text-white/25 focus:border-cyan-300/60 aria-[invalid=true]:border-rose-300/50 light:border-black/10 light:text-[#10131a] light:placeholder:text-[#10131a]/30 light:focus:border-cyan-600/60 light:aria-[invalid=true]:border-rose-500/50";

function validate(values: FormValues): FormErrors {
  const errors: FormErrors = {};

  if (!values.name.trim()) {
    errors.name = "الاسم مطلوب";
  }

  if (!values.service) {
    errors.service = "اختر الخدمة التي تحتاجها";
  }

  if (!values.email.trim()) {
    errors.email = "البريد الإلكتروني مطلوب";
  } else if (!emailRegex.test(values.email.trim())) {
    errors.email = "أدخل بريدًا إلكترونيًا صحيحًا";
  }

  if (!values.phone.trim()) {
    errors.phone = "رقم الهاتف مطلوب";
  } else if (!phoneRegex.test(values.phone.trim())) {
    errors.phone = "أدخل رقم هاتف صحيحًا";
  }

  if (!values.message.trim()) {
    errors.message = "الرسالة مطلوبة";
  } else if (values.message.length > MAX_MESSAGE) {
    errors.message = "الرسالة طويلة جدًا";
  }

  return errors;
}

export default function ContactSection() {
  const reduceMotion = useReducedMotion();

  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<
    "idle" | "sending" | "success" | "error"
  >("idle");

  const reveal = (delay = 0, y = 24) => ({
    initial: {
      opacity: 0,
      y,
    },
    whileInView: {
      opacity: 1,
      y: 0,
    },
    viewport: {
      once: true,
      amount: 0.2,
    },
    transition: {
      duration: 0.7,
      delay,
      ease: EASE,
    },
  });

  function handleChange(
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) {
    const { name, value } = e.target;

    setValues((current) => ({
      ...current,
      [name]: value,
    }));

    if (errors[name as keyof FormValues]) {
      setErrors((current) => ({
        ...current,
        [name]: undefined,
      }));
    }
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (status === "sending") return;

    const formErrors = validate(values);

    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);

      const firstError = Object.keys(formErrors)[0];

      document
        .getElementById(`contact-${firstError}`)
        ?.focus();

      return;
    }

    setErrors({});
    setStatus("sending");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (response.status === 400) {
        const data = await response.json().catch(() => ({}));

        if (data?.errors) {
          setErrors(data.errors);
        }

        setStatus("idle");
        return;
      }

      if (!response.ok) {
        throw new Error("Failed to send message");
      }

      setValues(initialValues);
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  return (
    <section
      id="contact"
      dir="rtl"
      className="border-t border-white/5 bg-[#0b0b14] font-[Cairo,sans-serif] text-white light:border-black/8 light:bg-[#f5f7fa] light:text-[#10131a]"
    >
      <div className="mx-auto max-w-7xl px-6 py-24 lg:px-10 lg:py-40">
        <div className="grid items-stretch gap-6 lg:grid-cols-2 lg:gap-8">
          {/* Contact information */}
          <motion.div
            {...reveal()}
            className="group flex h-full flex-col rounded-3xl border border-white/10 bg-white/2.5 p-7 transition-all duration-500 hover:-translate-y-1 hover:border-cyan-300/20 hover:bg-white/[0.035] hover:shadow-[0_20px_70px_rgba(34,211,238,0.06)] sm:p-9 lg:p-10 light:border-black/10 light:bg-white/65 light:hover:border-cyan-600/20 light:hover:bg-white light:hover:shadow-[0_20px_70px_rgba(16,19,26,0.10)]"
          >
            <div>
              <p className="mb-6 text-sm font-medium text-cyan-300/90 light:text-cyan-700">
                لنبدأ شيئًا مؤثرًا
              </p>

              <h2 className="mb-6 text-2xl font-semibold text-white/50 transition-colors duration-500 group-hover:text-white/70 sm:text-3xl light:text-[#10131a]/50 light:group-hover:text-[#10131a]/70">
                اتصل بنا
              </h2>

              <h3 className="mb-8 max-w-xl text-4xl font-bold leading-[1.45] sm:text-5xl lg:text-[3.5rem]">
                جاهزون لتحويل فكرتك إلى تأثير حقيقي.
              </h3>

              <p className="max-w-md text-lg leading-loose text-white/50 transition-colors duration-500 group-hover:text-white/60 light:text-[#10131a]/50 light:group-hover:text-[#10131a]/65">
                شاركنا فكرتك، ودعنا نبدأ من حيث يبدأ التأثير.
              </p>
            </div>

            <motion.div
              {...reveal(0.1)}
              className="mt-14 border-t border-white/10 light:border-black/10"
            >
              {/* Location */}
              <div className="group/item border-b border-white/10 py-6 transition-colors duration-300 hover:border-cyan-300/20 light:border-black/10 light:hover:border-cyan-600/20">
                <div className="flex items-start gap-5">
                  <MapPin
                    aria-hidden="true"
                    strokeWidth={1.5}
                    className="mt-1 h-5 w-5 shrink-0 text-white/30 transition-all duration-300 group-hover/item:text-cyan-300 group-hover/item:drop-shadow-[0_0_8px_rgba(103,232,249,0.4)] light:text-[#10131a]/30 light:group-hover/item:text-cyan-700 light:group-hover/item:drop-shadow-[0_0_8px_rgba(8,145,178,0.25)]"
                  />

                  <div>
                    <p className="mb-1 text-sm text-white/30 transition-colors duration-300 group-hover/item:text-cyan-300/60 light:text-[#10131a]/35 light:group-hover/item:text-cyan-700/70">
                      الموقع
                    </p>

                    <address className="not-italic text-lg leading-relaxed text-white/70 transition-colors duration-300 group-hover/item:text-white light:text-[#10131a]/70 light:group-hover/item:text-[#10131a]">
                      {CONTACT.address}
                    </address>
                  </div>
                </div>
              </div>

              {/* Email */}
              <div className="group/item border-b border-white/10 py-6 transition-colors duration-300 hover:border-cyan-300/20 light:border-black/10 light:hover:border-cyan-600/20">
                <div className="flex items-start gap-5">
                  <Mail
                    aria-hidden="true"
                    strokeWidth={1.5}
                    className="mt-1 h-5 w-5 shrink-0 text-white/30 transition-all duration-300 group-hover/item:text-cyan-300 group-hover/item:drop-shadow-[0_0_8px_rgba(103,232,249,0.4)] light:text-[#10131a]/30 light:group-hover/item:text-cyan-700 light:group-hover/item:drop-shadow-[0_0_8px_rgba(8,145,178,0.25)]"
                  />

                  <div>
                    <p className="mb-1 text-sm text-white/30 transition-colors duration-300 group-hover/item:text-cyan-300/60 light:text-[#10131a]/35 light:group-hover/item:text-cyan-700/70">
                      البريد الإلكتروني
                    </p>

                    <a
                      href={`mailto:${CONTACT.email}`}
                      dir="ltr"
                      className="text-lg text-white/70 transition-colors duration-300 hover:text-white focus:text-white focus:outline-none light:text-[#10131a]/70 light:hover:text-[#10131a] light:focus:text-[#10131a]"
                    >
                      {CONTACT.email}
                    </a>
                  </div>
                </div>
              </div>

              {/* Phone */}
              <div className="group/item border-b border-white/10 py-6 transition-colors duration-300 hover:border-cyan-300/20 light:border-black/10 light:hover:border-cyan-600/20">
                <div className="flex items-start gap-5">
                  <Phone
                    aria-hidden="true"
                    strokeWidth={1.5}
                    className="mt-1 h-5 w-5 shrink-0 text-white/30 transition-all duration-300 group-hover/item:text-cyan-300 group-hover/item:drop-shadow-[0_0_8px_rgba(103,232,249,0.4)] light:text-[#10131a]/30 light:group-hover/item:text-cyan-700 light:group-hover/item:drop-shadow-[0_0_8px_rgba(8,145,178,0.25)]"
                  />

                  <div>
                    <p className="mb-1 text-sm text-white/30 transition-colors duration-300 group-hover/item:text-cyan-300/60 light:text-[#10131a]/35 light:group-hover/item:text-cyan-700/70">
                      الهاتف
                    </p>

                    <a
                      href={CONTACT.phoneHref}
                      dir="ltr"
                      className="text-lg text-white/70 transition-colors duration-300 hover:text-white focus:text-white focus:outline-none light:text-[#10131a]/70 light:hover:text-[#10131a] light:focus:text-[#10131a]"
                    >
                      {CONTACT.phone}
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Form */}
          <motion.div
            {...reveal(0.15)}
            className="flex h-full flex-col rounded-3xl border border-white/10 bg-white/2.5 p-5 transition-all duration-500 hover:-translate-y-1 hover:border-cyan-300/15 hover:bg-white/3 sm:p-7 lg:p-9 light:border-black/10 light:bg-white/65 light:hover:border-cyan-600/15 light:hover:bg-white light:hover:shadow-[0_20px_70px_rgba(16,19,26,0.08)]"
          >
            {status === "success" ? (
              <motion.div
                role="status"
                initial={
                  reduceMotion
                    ? false
                    : { opacity: 0, scale: 0.96 }
                }
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  duration: 0.5,
                  ease: EASE,
                }}
                className="flex h-full min-h-105 flex-col items-start justify-center px-2"
              >
                <CheckCircle2
                  aria-hidden="true"
                  strokeWidth={1.25}
                  className="mb-6 h-12 w-12 text-cyan-300 light:text-cyan-700"
                />

                <p className="max-w-md text-2xl font-semibold leading-relaxed sm:text-3xl">
                  تم إرسال رسالتك بنجاح. سنتواصل معك قريبًا.
                </p>
              </motion.div>
            ) : (
              <form
                onSubmit={handleSubmit}
                noValidate
                className="flex h-full flex-col"
              >
                {/* Honeypot */}
                <div
                  aria-hidden="true"
                  className="absolute left-[-9999px] h-0 w-0 overflow-hidden"
                >
                  <label>
                    Website

                    <input
                      type="text"
                      name="website"
                      tabIndex={-1}
                      autoComplete="off"
                      value={values.website}
                      onChange={handleChange}
                    />
                  </label>
                </div>

                {/* Form header */}
                <div className="mb-8 px-2">
                  <div className="mb-4 flex items-center gap-3">
                    <span className="h-px w-8 bg-cyan-300 light:bg-cyan-600" />

                    <span className="text-xs font-medium text-cyan-300/80 light:text-cyan-700/80">
                      تواصل معنا
                    </span>
                  </div>

                  <h3 className="text-2xl font-bold text-white sm:text-3xl light:text-[#10131a]">
                    أخبرنا عن مشروعك
                  </h3>

                  <p className="mt-3 max-w-lg text-sm leading-7 text-white/40 light:text-[#10131a]/50">
                    أخبرنا بما تحتاجه وسنساعدك في تحديد الحل المناسب لمشروعك.
                  </p>
                </div>

                {/* Service selection */}
                <div className="mb-8 rounded-2xl border border-white/10 bg-[#10101a] p-5 sm:p-6 light:border-black/10 light:bg-white">
                  <div className="mb-5 flex items-end justify-between gap-4">
                    <div>
                      <p className="text-sm font-semibold text-white light:text-[#10131a]">
                        ما الخدمة التي تحتاجها؟
                      </p>

                      <p className="mt-1 text-xs text-white/35 light:text-[#10131a]/45">
                        اختر الخدمة الأقرب لاحتياج مشروعك
                      </p>
                    </div>

                    <span className="text-xs text-cyan-300/60 light:text-cyan-700/70">
                      مطلوب
                    </span>
                  </div>

                  <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                    {services.map((service) => {
                      const selected =
                        values.service === service;

                      return (
                        <button
                          key={service}
                          type="button"
                          onClick={() => {
                            setValues((current) => ({
                              ...current,
                              service,
                            }));

                            if (errors.service) {
                              setErrors(
                                (current) => ({
                                  ...current,
                                  service:
                                    undefined,
                                }),
                              );
                            }
                          }}
                          className={`group flex min-h-12 items-center justify-between rounded-xl border px-4 text-right text-sm transition-all duration-300 ${selected
                            ? "border-cyan-300/50 bg-cyan-300/8 text-white light:border-cyan-600/45 light:bg-cyan-600/8 light:text-[#10131a]"
                            : "border-white/8 bg-white/2 text-white/50 hover:border-white/20 hover:bg-white/4 hover:text-white light:border-black/8 light:bg-black/2 light:text-[#10131a]/55 light:hover:border-black/15 light:hover:bg-black/[0.035] light:hover:text-[#10131a]"
                            }`}
                        >
                          <span>{service}</span>

                          <span
                            className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border transition-all duration-300 ${selected
                              ? "border-cyan-300 bg-cyan-300 text-[#080711] light:border-cyan-600 light:bg-cyan-600 light:text-white"
                              : "border-white/15 text-transparent light:border-black/15"
                              }`}
                          >
                            {selected && (
                              <CheckCircle2
                                aria-hidden="true"
                                className="h-4 w-4"
                                strokeWidth={2}
                              />
                            )}
                          </span>
                        </button>
                      );
                    })}
                  </div>

                  {errors.service && (
                    <p className="mt-3 text-xs text-rose-300/90 light:text-rose-600">
                      {errors.service}
                    </p>
                  )}
                </div>

                {/* Personal information */}
                <div className="rounded-2xl border border-white/10 bg-[#10101a] p-5 sm:p-6 light:border-black/10 light:bg-white">
                  <div className="mb-6">
                    <p className="text-sm font-semibold text-white light:text-[#10131a]">
                      بيانات التواصل
                    </p>

                    <p className="mt-1 text-xs text-white/35 light:text-[#10131a]/45">
                      نحتاج بعض البيانات حتى نتمكن من التواصل معك
                    </p>
                  </div>

                  <div className="grid grid-cols-1 gap-x-10 md:grid-cols-2">
                    {fields.map((field, index) => {
                      const error = errors[field.name];

                      return (
                        <motion.div
                          key={field.name}
                          {...reveal(
                            0.2 + index * 0.05,
                          )}
                          className="group mb-8"
                        >
                          <label
                            htmlFor={`contact-${field.name}`}
                            className="mb-2 block text-sm text-white/45 transition-colors group-focus-within:text-cyan-300/80 light:text-[#10131a]/50 light:group-focus-within:text-cyan-700/80"
                          >
                            {field.label}

                            {!field.required && (
                              <span className="mr-2 text-xs text-white/25 light:text-[#10131a]/30">
                                اختياري
                              </span>
                            )}
                          </label>

                          <input
                            id={`contact-${field.name}`}
                            name={field.name}
                            type={field.type}
                            autoComplete={
                              field.autoComplete
                            }
                            placeholder={
                              field.placeholder
                            }
                            value={
                              values[field.name]
                            }
                            onChange={handleChange}
                            required={
                              field.required
                            }
                            maxLength={
                              field.name ===
                                "email"
                                ? 254
                                : 120
                            }
                            aria-invalid={
                              error
                                ? true
                                : undefined
                            }
                            aria-describedby={
                              error
                                ? `contact-${field.name}-error`
                                : undefined
                            }
                            className={`${inputClass} transition-all duration-300 focus:shadow-[0_4px_18px_rgba(34,211,238,0.06)] light:focus:shadow-[0_4px_18px_rgba(8,145,178,0.08)]`}
                          />

                          {error && (
                            <p
                              id={`contact-${field.name}-error`}
                              className="mt-2 text-sm text-rose-300/90 light:text-rose-600"
                            >
                              {error}
                            </p>
                          )}
                        </motion.div>
                      );
                    })}
                  </div>

                  {/* Message */}
                  <motion.div
                    {...reveal(0.4)}
                    className="group"
                  >
                    <label
                      htmlFor="contact-message"
                      className="mb-2 block text-sm text-white/45 transition-colors group-focus-within:text-cyan-300/80 light:text-[#10131a]/50 light:group-focus-within:text-cyan-700/80"
                    >
                      الرسالة
                    </label>

                    <textarea
                      id="contact-message"
                      name="message"
                      placeholder="حدثنا عن مشروعك أو فكرتك..."
                      value={values.message}
                      onChange={handleChange}
                      required
                      maxLength={MAX_MESSAGE}
                      aria-invalid={
                        errors.message
                          ? true
                          : undefined
                      }
                      aria-describedby={
                        errors.message
                          ? "contact-message-error"
                          : undefined
                      }
                      className={`${inputClass} min-h-32 resize-y transition-all duration-300 focus:shadow-[0_4px_18px_rgba(34,211,238,0.06)] light:focus:shadow-[0_4px_18px_rgba(8,145,178,0.08)]`}
                    />

                    {errors.message && (
                      <p
                        id="contact-message-error"
                        className="mt-2 text-sm text-rose-300/90 light:text-rose-600"
                      >
                        {errors.message}
                      </p>
                    )}
                  </motion.div>
                </div>

                {/* Error */}
                {status === "error" && (
                  <p
                    role="alert"
                    className="mt-5 flex items-center gap-3 text-sm text-rose-300/90 light:text-rose-600"
                  >
                    <AlertCircle
                      aria-hidden="true"
                      className="h-5 w-5 shrink-0"
                      strokeWidth={1.5}
                    />

                    حدث خطأ أثناء إرسال الرسالة. حاول مرة أخرى.
                  </p>
                )}

                {/* Submit */}
                <motion.div
                  {...reveal(0.5)}
                  className="mt-6"
                >
                  <button
                    type="submit"
                    disabled={status === "sending"}
                    className="group flex min-h-14 w-full items-center justify-center gap-3 rounded-xl bg-cyan-300 px-9 text-base font-bold text-[#080711] outline-none transition-all duration-300 hover:-translate-y-0.5 hover:bg-cyan-200 hover:shadow-[0_12px_35px_rgba(103,232,249,0.18)] focus-visible:ring-2 focus-visible:ring-cyan-200 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0b0b14] disabled:cursor-not-allowed disabled:opacity-60 light:bg-cyan-600 light:text-white light:hover:bg-cyan-500 light:hover:shadow-[0_12px_35px_rgba(8,145,178,0.18)] light:focus-visible:ring-cyan-600 light:focus-visible:ring-offset-[#f5f7fa]"
                  >
                    {status === "sending"
                      ? "جاري إرسال طلبك..."
                      : "إرسال طلب المشروع"}

                    <ArrowUpLeft
                      aria-hidden="true"
                      strokeWidth={2}
                      className="h-5 w-5 transition-transform duration-300 group-hover:-translate-x-1 group-hover:-translate-y-1"
                    />
                  </button>

                  <p className="mt-3 text-center text-[11px] text-white/25 light:text-[#10131a]/35">
                    بالضغط على الإرسال، سيتم إرسال بياناتك إلى فريق Atooz.
                  </p>
                </motion.div>
              </form>
            )}
          </motion.div>
        </div>

        <motion.div
          {...reveal(0, 15)}
          className="mt-24 border-t border-white/10 pt-8 lg:mt-32 light:border-black/10"
        >
          <p className="text-lg text-white/50 light:text-[#10131a]/50">
            نحن هنا لنسمع فكرتك.
          </p>
        </motion.div>
      </div>
    </section>
  );
}