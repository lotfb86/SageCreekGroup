"use client";

import { Calculator } from "lucide-react";

interface CalculatorCardProps {
  title: string;
  description: string;
  actions?: React.ReactNode;
  children: React.ReactNode;
}

export default function CalculatorCard({
  title,
  description,
  actions,
  children,
}: CalculatorCardProps) {
  return (
    <div className="bg-white rounded-sm p-8 shadow-sm">
      <div className="flex items-start justify-between gap-4 mb-2">
        <div className="flex items-center gap-3">
          <Calculator size={24} className="text-sage-400" />
          <h2 className="font-serif text-2xl text-warmgray-heading">{title}</h2>
        </div>
        {actions && <div className="flex-shrink-0">{actions}</div>}
      </div>
      <p className="text-warmgray text-sm mb-8 leading-relaxed max-w-2xl">
        {description}
      </p>
      {children}
    </div>
  );
}
