import type { Metadata, Viewport } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";

const grotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-grotesk",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const siteUrl = "https://sumant-saini.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Sumant Saini — Data Science & AI @ IIT Guwahati",
    template: "%s · Sumant Saini",
  },
  description:
    "Portfolio of Sumant Saini — Data Science & AI undergraduate at IIT Guwahati building retrieval-augmented systems, deep learning models, and full-stack ML products.",
  keywords: [
    "Sumant Saini",
    "Data Science",
    "Artificial Intelligence",
    "IIT Guwahati",
    "RAG",
    "Machine Learning",
    "Deep Learning",
    "Portfolio",
  ],
  authors: [{ name: "Sumant Saini" }],
  openGraph: {
    type: "website",
    url: siteUrl,
    title: "Sumant Saini — Data Science & AI @ IIT Guwahati",
    description:
      "Retrieval-augmented systems, deep learning models, and full-stack ML products by Sumant Saini.",
    siteName: "Sumant Saini",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sumant Saini — Data Science & AI @ IIT Guwahati",
    description:
      "Retrieval-augmented systems, deep learning models, and full-stack ML products by Sumant Saini.",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#0a0a0f",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${grotesk.variable} ${inter.variable}`}>
      <body className="grain relative min-h-screen bg-void text-ink antialiased">
        <a
          href="#hero"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-elevated focus:px-5 focus:py-2 focus:text-sm focus:text-ink"
        >
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
