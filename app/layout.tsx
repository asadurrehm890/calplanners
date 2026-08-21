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
    default: "Custom Shopify App Development | Full-Stack Expert",
    template: "%s | AsadDev",
  },
  description:
    "Custom Shopify app development with 8+ years expertise. Warranty, live selling, 3D try-on, product importers. Full-stack Shopify & WordPress developer.",
  keywords:
    "Shopify app development, custom Shopify apps, Shopify Plus, live selling app, warranty app, 3D glasses viewer, product importer, Shopify REST API, GraphQL, React, Shopify developer",
  openGraph: {
    title: "Custom Shopify App Development – 8+ Years Full-Stack Expert",
    description:
      "Tailored Shopify apps: warranty, live selling, 3D try-on, bulk importers. Built with React, Node, Shopify APIs.",
    type: "website",
    url: "https://calplanners.online",
    siteName: "AsadDev",
  },
  twitter: {
    card: "summary_large_image",
    title: "Custom Shopify App Development – 8+ Years Full-Stack Expert",
    description:
      "Tailored Shopify apps: warranty, live selling, 3D try-on, bulk importers. Built with React, Node, Shopify APIs.",
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
      <body className="font-sans bg-[#f9fafc] text-[#1e293b] antialiased min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}