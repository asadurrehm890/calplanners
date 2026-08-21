import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import Header from "@/app/components/header";
import Footer from "@/app/components/footer";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: {
    default: "Asad ur Rehman | Shopify App Developer - Custom Shopify Apps",
    template: "%s | Asad ur Rehman",
  },
  description:
    "Custom Shopify app development by Asad ur Rehman. 8+ years experience building live selling, 3D try-on, warranty apps. Expert in React, Node.js, GraphQL.",
  keywords:
    "Shopify developer, Shopify app development, custom Shopify apps, full-stack developer, React, Node.js, GraphQL, Shopify Plus, e-commerce development",
  openGraph: {
    title: "Asad ur Rehman | Shopify App Developer",
    description:
      "Custom Shopify app development with 8+ years expertise. Live selling, 3D try-on, product importers, warranty apps.",
    type: "website",
    url: "https://calplanners.online",
    siteName: "Asad ur Rehman",
    images: [
      {
        url: "https://calplanners.online/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Asad ur Rehman - Shopify Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Asad ur Rehman | Shopify App Developer",
    description:
      "Custom Shopify app development with 8+ years expertise. Live selling, 3D try-on, product importers.",
    images: ["https://calplanners.online/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://calplanners.online",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="font-sans bg-[#fafafa] text-[#0a0a0f] antialiased min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}