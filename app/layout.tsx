import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";  // ← This is the missing import
import "./globals.css";
import Header from "./components/header";
import Footer from "./components/footer";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  // 1. TITLE: This is crucial for SEO
  title: {
    // The 'default' title is used for the homepage
    default: 'Free Business & Crafting Cost Calculators | CalPlanners',
    // The 'template' automatically appends your brand name to every other page's title
    template: '%s | CalPlanners',
  },
  // 2. DESCRIPTION: The summary shown in search results
  description: 'A collection of free, easy-to-use calculators to help you price handmade crafts, tie flies, plan meetings, and manage business costs.',
  // 3. ICONS: Your favicon (optional, but good for branding)
  icons: {
    icon: '/favicon.ico',
  },
  // 4. ROBOTS: Tells search engines what to index
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  // 5. OPEN GRAPH: For social media sharing (Facebook, LinkedIn, etc.)
  openGraph: {
    title: 'Free Business & Crafting Cost Calculators',
    description: 'Calculate costs, plan projects, and make smart decisions with our free tools.',
    url: 'https://calplanners.online',
    siteName: 'CalPlanners',
    images: [
      {
        url: 'https://calplanners.online/og-image.png', // You'll need to create this image
        width: 1200,
        height: 630,
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  // 6. TWITTER: For Twitter card optimization
  twitter: {
    card: 'summary_large_image',
    title: 'Free Business & Crafting Cost Calculators',
    description: 'Calculate costs, plan projects, and make smart decisions with our free tools.',
    images: ['https://calplanners.online/og-image.png'],
  },
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        {/* Google Analytics Script */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-XJL4T4L5EG"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-XJL4T4L5EG');
          `}
        </Script>
       
      </head>
      <body className="min-h-full flex flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}