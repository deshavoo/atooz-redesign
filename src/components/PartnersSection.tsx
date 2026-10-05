"use client";

import Image from "next/image";

interface Partner {
  id: number;
  name: string;
  logoUrl: string;
}

const PARTNERS: Partner[] = Array.from({ length: 31 }, (_, i) => ({
  id: i + 1,
  name: `شركة ${i + 1}`,
  logoUrl: `/images/partners/partner${i + 1}.png`,
}));

function PartnerCard({
  partner,
  duplicate = false,
}: {
  partner: Partner;
  duplicate?: boolean;
}) {
  return (<div
    className="group flex h-24 w-44 shrink-0 items-center justify-center rounded-2xl border border-white/20 bg-white/90 px-5 shadow-[0_8px_30px_rgba(0,0,0,0.16)] transition-[transform,background-color,border-color,box-shadow] duration-300 hover:-translate-y-1 hover:border-white/40 hover:bg-white hover:shadow-[0_14px_36px_rgba(0,0,0,0.22)] sm:h-28 sm:w-52 lg:h-32 lg:w-60"
    aria-hidden={duplicate}
  > <div className="relative h-18 w-full max-w-55 sm:h-20 sm:max-w-60 lg:h-22 lg:max-w-65">
      <Image
        src={partner.logoUrl}
        alt={duplicate ? "" : `${partner.name} logo`}
        fill
        unoptimized
        sizes="(max-width: 640px) 176px, (max-width: 1024px) 208px, 240px"
        loading="lazy"
        className="scale-[1.12] object-contain opacity-95 transition-transform duration-300 group-hover:scale-[1.16]"
      /> </div> </div>
  );
}


function PartnersRow({ reverse = false }: { reverse?: boolean }) {
  return (<div className="partners-row relative w-full">
    <div
      className={`partners-track ${reverse ? "partners-track-reverse" : "partners-track-forward"
        }`}
    > <div className="partners-group">
        {PARTNERS.map((partner) => (
          <PartnerCard key={`first-${partner.id}`} partner={partner} />
        ))} </div>

      ```
      <div className="partners-group" aria-hidden="true">
        {PARTNERS.map((partner) => (
          <PartnerCard
            key={`duplicate-${partner.id}`}
            partner={partner}
            duplicate
          />
        ))}
      </div>
    </div>
  </div>


  );
}

export default function PartnersSection() {
  return (<section
    id="partners"
    aria-labelledby="partners-heading"
    dir="ltr"
    className="relative overflow-hidden bg-[#080711] py-24 sm:py-28 lg:py-32"
  > <style jsx global>{`
@keyframes partners-left {
from {
transform: translate3d(0, 0, 0);
}


      to {
        transform: translate3d(-50%, 0, 0);
      }
    }

    @keyframes partners-right {
      from {
        transform: translate3d(-50%, 0, 0);
      }

      to {
        transform: translate3d(0, 0, 0);
      }
    }

    .partners-row {
      width: 100%;
      overflow: visible;
    }

    .partners-track {
      display: flex;
      width: max-content;
      flex-shrink: 0;
      will-change: transform;
    }

    .partners-group {
      display: flex;
      flex-shrink: 0;
      align-items: center;
      gap: 18px;
      padding-inline: 9px;
    }

    .partners-track-forward {
      animation: partners-left 60s linear infinite;
    }

    .partners-track-reverse {
      animation: partners-right 60s linear infinite;
    }

    .partners-row:hover .partners-track {
      animation-play-state: paused;
    }

    @media (min-width: 640px) {
      .partners-group {
        gap: 24px;
        padding-inline: 12px;
      }
    }

    @media (min-width: 1024px) {
      .partners-group {
        gap: 28px;
        padding-inline: 14px;
      }
    }

    @media (prefers-reduced-motion: reduce) {
      .partners-track-forward,
      .partners-track-reverse {
        animation-play-state: paused;
      }
    }
  `}</style>

    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0"
    >
      <div className="absolute left-1/2 top-0 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#775bb1]/5 blur-[140px]" />

      <div className="absolute bottom-0 right-1/4 h-80 w-80 rounded-full bg-[#397f91]/4 blur-[140px]" />
    </div>

    <div className="relative w-full">
      <div
        dir="rtl"
        className="mx-auto mb-14 max-w-2xl px-5 text-center sm:mb-18 sm:px-8 lg:mb-20"
      >
        <span className="text-sm font-medium tracking-wide text-white/35">
          شركاء النجاح
        </span>

        <h2
          id="partners-heading"
          className="mt-3 text-3xl font-semibold tracking-tight text-white sm:text-4xl lg:text-5xl"
        >
          نكبر بثقة{" "}
          <span className="bg-linear-to-l from-[#775bb1] to-[#397f91] bg-clip-text text-transparent">
            شركائنا
          </span>
        </h2>

        <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-white/45 sm:text-base">
          نعتز بالثقة التي منحنا إياها شركاؤنا لصناعة تأثير يتجاوز التوقعات.
        </p>
      </div>

      <div className="relative w-full overflow-hidden py-2">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 left-0 z-20 w-20 bg-linear-to-r from-[#080711] via-[#080711]/90 to-transparent sm:w-32 lg:w-48"
        />

        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 right-0 z-20 w-20 bg-linear-to-l from-[#080711] via-[#080711]/90 to-transparent sm:w-32 lg:w-48"
        />

        <PartnersRow />

        <div className="h-5 sm:h-6 lg:h-7" />

        <PartnersRow reverse />
      </div>

      <div className="mx-auto mt-14 flex max-w-md items-center justify-center gap-4 px-5 sm:mt-18">
        <span className="h-px flex-1 bg-linear-to-r from-transparent to-white/10" />

        <span className="text-[10px] font-medium tracking-[0.2em] text-white/20">
          TRUSTED PARTNERS
        </span>

        <span className="h-px flex-1 bg-linear-to-l from-transparent to-white/10" />
      </div>
    </div>
  </section>


  );
}
