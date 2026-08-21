import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";


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
      <head>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/7.3.1/css/all.min.css" />
      </head>  
      <body className="font-sans bg-[#f9fafc] text-[#1e293b] antialiased">
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}