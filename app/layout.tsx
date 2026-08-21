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
    default: "Asad ur Rehman | Full-Stack Shopify Developer",
    template: "%s | Asad ur Rehman",
  },
  description:
    "Full-stack Shopify developer with 8+ years experience. Custom Shopify apps, live selling, 3D try-on, product importers. Expert in React, Node, GraphQL.",
  keywords:
    "Shopify developer, Shopify app development, custom Shopify apps, full-stack developer, React, Node.js, GraphQL, WordPress developer",
  openGraph: {
    title: "Asad ur Rehman | Full-Stack Shopify Developer",
    description:
      "Custom Shopify app development with 8+ years expertise. Live selling, 3D try-on, product importers, warranty apps.",
    type: "website",
    url: "https://calplanners.online",
    siteName: "Asad ur Rehman",
  },
  twitter: {
    card: "summary_large_image",
    title: "Asad ur Rehman | Full-Stack Shopify Developer",
    description:
      "Custom Shopify app development with 8+ years expertise. Live selling, 3D try-on, product importers.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="font-sans bg-[#f8fafc] text-[#0f172a] antialiased min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}