"use client";

import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import Script from "next/script";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCalculatorsOpen, setIsCalculatorsOpen] = useState(false);
  const [isCrytoOpen, setIsCryptoOpen] = useState(false);
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
  { href: "/gpa-calculator", label: "📚 GPA Calculator" },
  { href: "/word-counter", label: "📝 Word Counter" },
  { href: "/color-converter", label: "🎨 Color Converter" },
];

const crypto=[
  {href:"/crypto-exchange-rate", label:"📊 Crypto Exchange Rate"},
  { href: "/crypto-profit-loss", label: "📊 Crypto P/L Calculator" },
]

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

            
            </nav>
          </div>
        )}
      </div>

       

    </header>
  );
}