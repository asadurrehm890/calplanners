"use client";

import Link from "next/link";
import { useState } from "react";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white/80 backdrop-blur-sm border-b border-gray-100 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <nav className="flex items-center justify-between py-4">
          <Link href="/" className="text-2xl font-extrabold">
            <span className="logo-gradient">Asad</span>
            <span className="text-secondary">Dev</span>
          </Link>

          <div className="hidden md:flex items-center gap-8 font-semibold">
            <a href="#services" className="hover:text-secondary transition-colors">
              Services
            </a>
            <a href="#cases" className="hover:text-secondary transition-colors">
              Case Studies
            </a>
            <a href="#process" className="hover:text-secondary transition-colors">
              Process
            </a>
            <a href="#blog" className="hover:text-secondary transition-colors">
              Blog
            </a>
            <a
              href="#contact"
              className="border-2 border-primary px-5 py-2 rounded-full font-semibold hover:bg-primary hover:text-white transition-all"
            >
              Contact
            </a>
          </div>

          <button
            className="md:hidden text-2xl"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? "✕" : "☰"}
          </button>
        </nav>

        {isMenuOpen && (
          <div className="md:hidden pb-4 space-y-3 font-semibold">
            <a href="#services" className="block hover:text-secondary transition-colors">
              Services
            </a>
            <a href="#cases" className="block hover:text-secondary transition-colors">
              Case Studies
            </a>
            <a href="#process" className="block hover:text-secondary transition-colors">
              Process
            </a>
            <a href="#blog" className="block hover:text-secondary transition-colors">
              Blog
            </a>
            <a
              href="#contact"
              className="block border-2 border-primary px-5 py-2 rounded-full text-center hover:bg-primary hover:text-white transition-all"
            >
              Contact
            </a>
          </div>
        )}
      </div>
    </header>
  );
}