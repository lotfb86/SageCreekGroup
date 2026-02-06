"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowRight } from "lucide-react";

export default function StickyCtaButton() {
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 1500);
    return () => clearTimeout(timer);
  }, []);

  if (pathname === "/contact") return null;

  return (
    <Link
      href="/contact"
      className={`fixed bottom-6 right-6 z-40 inline-flex items-center gap-2 bg-sage-400 text-white px-6 py-3 rounded-full font-sans text-sm font-medium uppercase tracking-[1px] shadow-lg hover:bg-sage-400/90 hover:scale-105 transition-all duration-300 ${
        visible
          ? "translate-y-0 opacity-100"
          : "translate-y-8 opacity-0 pointer-events-none"
      }`}
    >
      <span className="hidden sm:inline">Submit Your Deal</span>
      <span className="sm:hidden">Get Quote</span>
      <ArrowRight size={16} />
    </Link>
  );
}
