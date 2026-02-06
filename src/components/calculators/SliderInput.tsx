"use client";

import NumberInput from "@/components/ui/NumberInput";
import Tooltip from "./Tooltip";

interface SliderInputProps {
  label: string;
  value: number;
  onChange: (v: number) => void;
  min: number;
  max: number;
  step: number;
  prefix?: string;
  suffix?: string;
  tooltip?: string;
  marketHint?: string;
}

/**
 * Combo slider + number input. Slider for quick exploration,
 * number input for precision. Two-way bound.
 */
export default function SliderInput({
  label,
  value,
  onChange,
  min,
  max,
  step,
  prefix,
  suffix,
  tooltip,
  marketHint,
}: SliderInputProps) {
  return (
    <div>
      <div className="flex items-center gap-1.5 mb-1">
        <label className="text-xs text-warmgray">{label}</label>
        {tooltip && <Tooltip content={tooltip} />}
      </div>
      <div className="flex items-center gap-3">
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(parseFloat(e.target.value))}
          className="flex-1 h-1.5 appearance-none bg-warmgray/15 rounded-full cursor-pointer
            [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4
            [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-sage-400 [&::-webkit-slider-thumb]:cursor-pointer
            [&::-webkit-slider-thumb]:shadow-sm
            [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:rounded-full
            [&::-moz-range-thumb]:bg-sage-400 [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:cursor-pointer"
        />
        <div className="w-28 flex-shrink-0">
          <NumberInput
            label=""
            value={value}
            onChange={onChange}
            prefix={prefix}
            suffix={suffix}
            step={step}
          />
        </div>
      </div>
      {marketHint && (
        <p className="text-[11px] text-sage-400/70 mt-1">{marketHint}</p>
      )}
    </div>
  );
}
