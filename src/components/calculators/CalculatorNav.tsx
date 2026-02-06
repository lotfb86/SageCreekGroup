"use client";

import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";

export interface CalculatorNavItem {
  id: string;
  label: string;
  shortLabel: string;
  icon: LucideIcon;
}

interface CalculatorNavProps {
  calculators: readonly CalculatorNavItem[];
  active: string;
  onChange: (id: string) => void;
}

/** Mobile-only horizontal scrolling tab bar. Desktop sidebar lives in the page layout. */
export default function CalculatorNav({
  calculators,
  active,
  onChange,
}: CalculatorNavProps) {
  return (
    <div className="lg:hidden mb-8 -mx-6 px-6 relative">
      {/* Left fade */}
      <div className="absolute left-0 top-0 bottom-2 w-8 bg-gradient-to-r from-cream to-transparent z-10 pointer-events-none" />
      {/* Right fade */}
      <div className="absolute right-0 top-0 bottom-2 w-8 bg-gradient-to-l from-cream to-transparent z-10 pointer-events-none" />
      <div
        className="flex gap-2 overflow-x-auto pb-2"
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
          WebkitOverflowScrolling: "touch",
        }}
      >
        {calculators.map((calc) => (
          <button
            key={calc.id}
            onClick={() => onChange(calc.id)}
            className={cn(
              "flex-shrink-0 px-4 py-2 text-xs uppercase tracking-[1.5px] font-medium rounded-sm whitespace-nowrap transition-colors",
              active === calc.id
                ? "bg-navy-800 text-white"
                : "bg-white text-warmgray-heading hover:bg-warmgray/5"
            )}
          >
            {calc.shortLabel}
          </button>
        ))}
      </div>
    </div>
  );
}
