"use client";

import Tooltip from "@/components/calculators/Tooltip";

interface NumberInputProps {
  label: string;
  value: number;
  onChange: (v: number) => void;
  prefix?: string;
  suffix?: string;
  step?: number;
  min?: number;
  tooltip?: string;
  marketHint?: string;
}

export default function NumberInput({
  label,
  value,
  onChange,
  prefix,
  suffix,
  step,
  min,
  tooltip,
  marketHint,
}: NumberInputProps) {
  return (
    <div>
      {label && (
        <div className="flex items-center gap-1.5 mb-2">
          <label className="text-xs uppercase tracking-[2px] text-warmgray-heading font-medium">
            {label}
          </label>
          {tooltip && <Tooltip content={tooltip} />}
        </div>
      )}
      <div className="relative">
        {prefix && (
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-warmgray text-sm">
            {prefix}
          </span>
        )}
        <input
          type="number"
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          step={step || 1}
          min={min ?? 0}
          className={`w-full py-3 border border-warmgray/20 rounded-sm text-warmgray-heading focus:outline-none focus:border-sage-400 transition-colors bg-white ${prefix ? "pl-8 pr-4" : suffix ? "pl-4 pr-8" : "px-4"}`}
        />
        {suffix && (
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-warmgray text-sm">
            {suffix}
          </span>
        )}
      </div>
      {marketHint && (
        <p className="text-[11px] text-sage-400/70 mt-1">{marketHint}</p>
      )}
    </div>
  );
}
