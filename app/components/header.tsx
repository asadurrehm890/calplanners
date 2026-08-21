"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { label: "Services", href: "#services" },
    { label: "Work", href: "#work" },
    { label: "About", href: "#about" },
    { label: "Blog", href: "#blog" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/95 backdrop-blur-xl shadow-sm border-b border-gray-100"
          : "bg-transparent backdrop-blur-none border-transparent"
      }`}
    >
      <div className="container">
        <div className="flex items-center justify-between h-16 md:h-20">
          <Link
            href="/"
            className="text-2xl font-bold tracking-tight transition-colors"
          >
            <span className="text-[#0a0a0f]">Asad</span>
            <span className="text-[#2563eb]">.</span>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
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
              className="btn-primary text-sm py-2.5 px-6 min-h-0"
            >
              Let's Talk
            </a>
          </nav>

          <button
            className="md:hidden text-2xl text-[#0a0a0f]"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? "✕" : "☰"}
          </button>
        </div>

        {isMenuOpen && (
          <div className="md:hidden pb-6 space-y-4 bg-white/95 backdrop-blur-xl rounded-2xl p-6 shadow-lg">
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
              className="block text-center btn-primary text-sm py-2.5"
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