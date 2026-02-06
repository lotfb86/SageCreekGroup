"use client";

import { useState } from "react";
import NumberInput from "@/components/ui/NumberInput";
import CalculatorCard from "../CalculatorCard";
import ResultBox from "../ResultBox";
import { calculateCapRate } from "@/lib/calculators";
import { formatCurrency } from "@/lib/utils";
import { CRE_TOOLTIPS } from "@/lib/calculator-tooltips";
import PdfExportButton from "../PdfExportButton";

export default function CapRateCalculator() {
  const [noi, setNoi] = useState(500000);
  const [propertyValue, setPropertyValue] = useState(7500000);

  const capRate = calculateCapRate(noi, propertyValue);

  return (
    <CalculatorCard
      title="Cap Rate Calculator"
      description="Calculate the capitalization rate for a property based on its Net Operating Income and value. Cap rate is one of the most fundamental metrics in CRE investing."
      actions={
        <PdfExportButton
          getOptions={() => ({
            title: "Cap Rate Calculator",
            inputs: [
              { label: "Net Operating Income", value: formatCurrency(noi) },
              { label: "Property Value", value: formatCurrency(propertyValue) },
            ],
            results: [
              { label: "Cap Rate", value: `${(capRate * 100).toFixed(2)}%` },
            ],
          })}
        />
      }
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <NumberInput
            label="Net Operating Income (NOI)"
            value={noi}
            onChange={setNoi}
            prefix="$"
            step={10000}
            tooltip={CRE_TOOLTIPS.noi}
          />
          <NumberInput
            label="Property Value"
            value={propertyValue}
            onChange={setPropertyValue}
            prefix="$"
            step={100000}
          />
        </div>
        <div>
          <ResultBox label="Cap Rate" value={`${(capRate * 100).toFixed(2)}%`} />
          <p className="text-warmgray text-xs mt-3 text-center">
            A property generating {formatCurrency(noi)} NOI at a {(capRate * 100).toFixed(2)}% cap rate
            is valued at {formatCurrency(propertyValue)}.
          </p>

          {/* Market cap rate ranges by property type */}
          <div className="mt-4 bg-warmgray/5 rounded-sm p-4">
            <p className="text-xs uppercase tracking-[2px] text-warmgray-heading font-medium mb-3">
              Typical Cap Rate Ranges
            </p>
            <div className="space-y-1.5 text-xs">
              {[
                { type: "Multifamily (Class A)", range: "4.0–5.5%" },
                { type: "Multifamily (Class B/C)", range: "5.0–7.0%" },
                { type: "Industrial / Warehouse", range: "5.0–7.0%" },
                { type: "Office (Suburban)", range: "6.5–8.5%" },
                { type: "Retail (NNN)", range: "5.5–7.5%" },
              ].map((r) => (
                <div key={r.type} className="flex justify-between">
                  <span className="text-warmgray">{r.type}</span>
                  <span className="text-warmgray-heading font-medium">{r.range}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </CalculatorCard>
  );
}
