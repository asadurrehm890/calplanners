"use client";

import Link from "next/link";
import { useState } from "react";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { href: "#services", label: "Services" },
    { href: "#cases", label: "Case Studies" },
    { href: "#process", label: "Process" },
    { href: "#blog", label: "Blog" },
  ];

  return (
    <header className="bg-white/80 backdrop-blur-sm border-b border-gray-100 sticky top-0 z-50">
      <div className="container">
        <nav className="flex items-center justify-between py-4">
          {/* Logo */}
          <Link href="/" className="text-2xl font-extrabold">
            <span className="logo-gradient">Asad</span>
            <span className="text-secondary">Dev</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8 font-semibold">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-[#1e293b] hover:text-secondary transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="#contact"
              className="border-2 border-[#1e293b] px-5 py-2 rounded-full font-semibold hover:bg-[#1e293b] hover:text-white transition-all"
            >
              Contact
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-2xl"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? "✕" : "☰"}
          </button>
        </nav>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden pb-4 space-y-3 font-semibold">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block text-[#1e293b] hover:text-secondary transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="#contact"
              className="block border-2 border-[#1e293b] px-5 py-2 rounded-full text-center hover:bg-[#1e293b] hover:text-white transition-all"
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}