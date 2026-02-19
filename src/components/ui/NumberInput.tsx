"use client";

import { useState, useEffect, useRef } from "react";
import Tooltip from "@/components/calculators/Tooltip";

/** Add commas to a number string (e.g., 9800000 → "9,800,000") */
function formatWithCommas(value: number | string): string {
  const str = String(value);
  if (str === "" || str === "-") return str;
  // Split on decimal point, format integer part only
  const parts = str.split(".");
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return parts.join(".");
}

/** Remove commas from a string (e.g., "9,800,000" → "9800000") */
function stripCommas(value: string): string {
  return value.replace(/,/g, "");
}

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
  const isCurrency = prefix === "$";

  // Track what the user sees in the field — allows empty state while typing
  const [displayValue, setDisplayValue] = useState<string>(
    isCurrency ? formatWithCommas(value) : String(value)
  );
  const isFocused = useRef(false);

  // Sync display when value changes from outside (e.g., reset, slider)
  useEffect(() => {
    // Don't overwrite while the user is actively typing
    if (!isFocused.current) {
      setDisplayValue(isCurrency ? formatWithCommas(value) : String(value));
    }
  }, [value, isCurrency]);

  // --- Currency field handlers (type="text" with comma formatting) ---
  const handleCurrencyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value;
    // Allow only digits, commas, decimal points, and empty
    const cleaned = raw.replace(/[^0-9.,]/g, "");
    setDisplayValue(cleaned);
    const stripped = stripCommas(cleaned);
    const num = Number(stripped);
    onChange(stripped === "" || isNaN(num) ? 0 : num);
  };

  const handleCurrencyFocus = () => {
    isFocused.current = true;
    // Remove commas on focus so the user can edit freely
    setDisplayValue(stripCommas(displayValue));
  };

  const handleCurrencyBlur = () => {
    isFocused.current = false;
    const stripped = stripCommas(displayValue);
    if (stripped === "" || isNaN(Number(stripped))) {
      setDisplayValue("0");
    } else {
      // Re-add commas on blur
      setDisplayValue(formatWithCommas(stripped));
    }
  };

  // --- Standard number field handlers ---
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value;
    setDisplayValue(raw);
    const num = Number(raw);
    onChange(raw === "" || isNaN(num) ? 0 : num);
  };

  const handleBlur = () => {
    if (displayValue === "" || isNaN(Number(displayValue))) {
      setDisplayValue("0");
    }
  };

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
        {isCurrency ? (
          <input
            type="text"
            inputMode="decimal"
            value={displayValue}
            onChange={handleCurrencyChange}
            onFocus={handleCurrencyFocus}
            onBlur={handleCurrencyBlur}
            className={`w-full py-3 border border-warmgray/20 rounded-sm text-warmgray-heading focus:outline-none focus:border-sage-400 transition-colors bg-white ${prefix ? "pl-8 pr-4" : suffix ? "pl-4 pr-8" : "px-4"}`}
          />
        ) : (
          <input
            type="number"
            value={displayValue}
            onChange={handleChange}
            onBlur={handleBlur}
            step={step || 1}
            min={min ?? 0}
            className={`w-full py-3 border border-warmgray/20 rounded-sm text-warmgray-heading focus:outline-none focus:border-sage-400 transition-colors bg-white ${prefix ? "pl-8 pr-4" : suffix ? "pl-4 pr-8" : "px-4"}`}
          />
        )}
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
