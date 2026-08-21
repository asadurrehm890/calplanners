"use client";

import Link from "next/link";
import { useState } from "react";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { label: "Services", href: "#services" },
    { label: "Case Studies", href: "#cases" },
    { label: "About", href: "#about" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-xl border-b border-gray-100">
      <div className="container">
        <nav className="flex items-center justify-between h-16 md:h-20">
          <Link href="/" className="text-xl font-bold">
            <span className="text-[#0f172a]">Asad</span>
            <span className="text-[#2563eb]">.</span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-sm font-medium text-[#475569] hover:text-[#2563eb] transition-colors"
              >
                {item.label}
              </a>
            ))}
            <a
              href="#contact"
              className="px-5 py-2.5 bg-[#2563eb] text-white rounded-full text-sm font-semibold hover:bg-[#1d4ed8] transition-all shadow-sm hover:shadow-md"
            >
              Let's Talk
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
          <div className="md:hidden pb-4 space-y-3">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="block text-sm font-medium text-[#475569] hover:text-[#2563eb] transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.label}
              </a>
            ))}
            <a
              href="#contact"
              className="block text-center px-5 py-2.5 bg-[#2563eb] text-white rounded-full text-sm font-semibold hover:bg-[#1d4ed8] transition-all"
              onClick={() => setIsMenuOpen(false)}
            >
              Let's Talk
            </a>
          </div>
        )}
      </div>
    </header>
  );
}