"use client";

import { useState } from "react";
import { Copy, X } from "lucide-react";

interface ScenarioComparisonProps {
  children: React.ReactNode;
  /** The calculator component to duplicate for scenario B */
  CalculatorComponent: React.ComponentType;
}

/**
 * Wraps a calculator with a "Compare Scenarios" toggle.
 * When active, renders two instances side-by-side (desktop) or stacked (mobile).
 * Each manages its own state independently.
 */
export default function ScenarioComparison({
  children,
  CalculatorComponent,
}: ScenarioComparisonProps) {
  const [comparing, setComparing] = useState(false);

  return (
    <div>
      {/* Toggle */}
      <div className="flex justify-end mb-3">
        <button
          onClick={() => setComparing(!comparing)}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs uppercase tracking-[1.5px] font-medium text-warmgray hover:text-warmgray-heading border border-warmgray/20 hover:border-warmgray/40 rounded-sm transition-colors"
        >
          {comparing ? (
            <>
              <X size={14} /> Close Comparison
            </>
          ) : (
            <>
              <Copy size={14} /> Compare Scenarios
            </>
          )}
        </button>
      </div>

      {comparing ? (
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          <div>
            <p className="text-xs uppercase tracking-[2px] text-sage-400 font-medium mb-2 text-center">
              Scenario A
            </p>
            {children}
          </div>
          <div>
            <p className="text-xs uppercase tracking-[2px] text-navy-800 font-medium mb-2 text-center">
              Scenario B
            </p>
            <CalculatorComponent />
          </div>
        </div>
      ) : (
        children
      )}
    </div>
  );
}
