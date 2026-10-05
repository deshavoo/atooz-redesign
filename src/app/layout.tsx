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
  title: "Atooz | للحلول التسويقية والدعاية والإعلان",
  description:
    "حلول متكاملة في التسويق الرقمي، الهويات البصرية، وإدارة الحملات الإعلانية المبتكرة بالسعودية.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl">
      <body className={`${alexandria.variable}`}>{children}
        <CustomCursor />
      </body>
    </html>
  );
}