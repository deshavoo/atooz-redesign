import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Atooz | Marketing & Advertising Solutions",
    description:
        "Integrated marketing, visual identity, and innovative advertising campaign solutions in Saudi Arabia.",
    alternates: {
        canonical: "/en",
    },
};

export default function EnglishLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div lang="en" dir="ltr">
            {children}
        </div>
    );
}