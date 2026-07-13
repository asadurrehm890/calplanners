"use client";

import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import Script from "next/script";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCalculatorsOpen, setIsCalculatorsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsCalculatorsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Calculators list
  const calculators = [
    { href: "/candle-calculator", label: "🕯️ Candle Calculator" },
    { href: "/fly-tying-estimator", label: "🎣 Fly Tying Estimator" },
    { href: "/turtle-tank-calculator", label: "🐢 Turtle Tank Calculator" },
    { href: "/fursuit-fur-calculator", label: "🦊 Fursuit Fur Calculator" },
    { href: "/calligraphy-ink-calculator", label: "✒️ Calligraphy Ink Estimator" },
    { href: "/equipment-roi-calculator", label: "📊 Equipment ROI Calculator" },
    { href: "/meeting-cost-calculator", label: "💰 Meeting Cost Calculator" },
    { href: "/protein-calculator", label: "💪 Protein Intake Calculator" },
    { href: "/weight-loss-timeline", label: "🎯 Weight Loss Timeline" },
  ];

  return (
    <header className="bg-white dark:bg-black border-b border-zinc-200 dark:border-zinc-800">
     

      {/* Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="text-xl font-bold text-black dark:text-white">
              CalPlanners
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-zinc-700 hover:text-black dark:text-zinc-300 dark:hover:text-white transition-colors">
              Home
            </Link>
            {/* <Link href="/about" className="text-zinc-700 hover:text-black dark:text-zinc-300 dark:hover:text-white transition-colors">
              About
            </Link>
            <Link href="/contact" className="text-zinc-700 hover:text-black dark:text-zinc-300 dark:hover:text-white transition-colors">
              Contact
            </Link> */}

            {/* Calculators Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setIsCalculatorsOpen(!isCalculatorsOpen)}
                className="flex items-center gap-1 text-zinc-700 hover:text-black dark:text-zinc-300 dark:hover:text-white transition-colors font-medium"
              >
                Calculators
                <svg
                  className={`w-4 h-4 transition-transform ${isCalculatorsOpen ? 'rotate-180' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {isCalculatorsOpen && (
                <div className="absolute top-full left-0 mt-2 w-64 bg-white dark:bg-zinc-900 rounded-lg shadow-lg border border-zinc-200 dark:border-zinc-700 py-2 z-50">
                  {calculators.map((calc) => (
                    <Link
                      key={calc.href}
                      href={calc.href}
                      onClick={() => setIsCalculatorsOpen(false)}
                      className="block px-4 py-2 text-sm text-zinc-700 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-800 transition-colors"
                    >
                      {calc.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </nav>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-zinc-700 hover:text-black dark:text-zinc-300 dark:hover:text-white focus:outline-none"
              aria-label="Toggle menu"
            >
              <svg className="h-6 w-6" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                {isMenuOpen ? (
                  <path d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-zinc-200 dark:border-zinc-800">
            <nav className="flex flex-col space-y-4">
              <Link href="/" className="text-zinc-700 hover:text-black dark:text-zinc-300 dark:hover:text-white transition-colors" onClick={() => setIsMenuOpen(false)}>
                Home
              </Link>
              {/* <Link href="/about" className="text-zinc-700 hover:text-black dark:text-zinc-300 dark:hover:text-white transition-colors" onClick={() => setIsMenuOpen(false)}>
                About
              </Link>
              <Link href="/contact" className="text-zinc-700 hover:text-black dark:text-zinc-300 dark:hover:text-white transition-colors" onClick={() => setIsMenuOpen(false)}>
                Contact
              </Link> */}

              {/* Mobile Calculators Section */}
              <div className="pt-2 border-t border-zinc-200 dark:border-zinc-700">
                <p className="text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-2">
                  Calculators
                </p>
                <div className="space-y-2">
                  {calculators.map((calc) => (
                    <Link
                      key={calc.href}
                      href={calc.href}
                      onClick={() => setIsMenuOpen(false)}
                      className="block text-sm text-zinc-700 hover:text-black dark:text-zinc-300 dark:hover:text-white transition-colors pl-2"
                    >
                      {calc.label}
                    </Link>
                  ))}
                </div>
              </div>
            </nav>
          </div>
        )}
      </div>

       {/* Ad Banner - Above Navbar */}
      <div className="bg-gray-50 dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center py-2">
            <div className="ad-banner">
              <Script
                id="adsterra-banner-header"
                strategy="afterInteractive"
                dangerouslySetInnerHTML={{
                  __html: `
                    atOptions = {
                      'key' : 'dacf6ccd7e48e8970aee47b8deee9514',
                      'format' : 'iframe',
                      'height' : 90,
                      'width' : 728,
                      'params' : {}
                    };
                  `,
                }}
              />
              <Script
                src="https://www.highperformanceformat.com/dacf6ccd7e48e8970aee47b8deee9514/invoke.js"
                strategy="afterInteractive"
                async
              />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}