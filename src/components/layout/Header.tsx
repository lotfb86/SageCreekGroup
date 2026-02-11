"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { NAV_LINKS } from "@/lib/constants";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-white/95 backdrop-blur-md shadow-sm"
            : "bg-transparent"
        }`}
      >
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="flex h-20 items-center justify-between">
            {/* Wordmark */}
            <Link
              href="/"
              className={`relative z-10 font-serif text-xl tracking-wide transition-colors duration-300 ${
                scrolled ? "text-warmgray-heading" : "text-white"
              }`}
            >
              Sage Creek Group
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-8">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-[13px] font-medium uppercase tracking-[2px] transition-colors duration-200 ${
                    scrolled
                      ? "text-warmgray-heading hover:text-sage-500"
                      : "text-white/90 hover:text-white"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/contact"
                className={`text-[13px] font-medium uppercase tracking-[2px] px-6 py-2.5 rounded-sm border transition-all duration-200 ${
                  scrolled
                    ? "border-navy-800 text-navy-800 hover:bg-navy-800 hover:text-white"
                    : "border-white/80 text-white hover:bg-white hover:text-navy-800"
                }`}
              >
                Submit Your Deal
              </Link>
            </nav>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className={`lg:hidden relative z-10 p-2 ${
                scrolled || mobileOpen ? "text-warmgray-heading" : "text-white"
              }`}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-40 bg-white transition-transform duration-300 lg:hidden ${
          mobileOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <nav className="flex flex-col items-center justify-center h-full gap-8">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="font-serif text-2xl text-warmgray-heading hover:text-sage-500 transition-colors"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/contact"
            onClick={() => setMobileOpen(false)}
            className="mt-4 px-8 py-3 border-2 border-navy-800 text-navy-800 font-sans text-sm uppercase tracking-[2px] font-medium hover:bg-navy-800 hover:text-white transition-all"
          >
            Submit Your Deal
          </Link>
        </nav>
      </div>
    </>
  );
}
