import type { Metadata } from "next";

import { Alexandria } from "next/font/google";

import "./globals.css";

import CustomCursor from "@/components/CustomCursor";

const alexandria = Alexandria({
  subsets: ["arabic", "latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-alexandria",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://atooz-redesign.vercel.app"),
  title: "Atooz | للحلول التسويقية والدعاية والإعلان",
  description:
    "حلول متكاملة في التسويق الرقمي، الهويات البصرية، وإدارة الحملات الإعلانية المبتكرة بالسعودية.",
  alternates: {
    canonical: "/",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ar"
      dir="rtl"
      suppressHydrationWarning
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
                            (() => {
                                try {
                                    const savedTheme =
                                        localStorage.getItem("theme");

                                    if (savedTheme === "light") {
                                        document.documentElement.classList.remove(
                                            "dark"
                                        );
                                    } else {
                                        document.documentElement.classList.add(
                                            "dark"
                                        );
                                    }
                                } catch {
                                    document.documentElement.classList.add(
                                        "dark"
                                    );
                                }
                            })();
                        `,
          }}
        />
      </head>

      <body
        className={`${alexandria.variable} bg-white text-[#111827] transition-colors duration-700 dark:bg-[#080a13] dark:text-white`}
      >
        <CustomCursor />
        {children}
      </body>
    </html>
  );
}
