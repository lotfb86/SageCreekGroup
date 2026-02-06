"use client";

import { useState } from "react";
import NumberInput from "@/components/ui/NumberInput";
import SliderInput from "../SliderInput";
import CalculatorCard from "../CalculatorCard";
import ResultBox from "../ResultBox";
import { calculatePropertyValueFromCapRate } from "@/lib/calculators";
import { formatCurrency } from "@/lib/utils";
import { CRE_TOOLTIPS } from "@/lib/calculator-tooltips";
import PdfExportButton from "../PdfExportButton";

export default function PropertyValueCalculator() {
  const [noi, setNoi] = useState(500000);
  const [capRate, setCapRate] = useState(6.5);

  const propertyValue = calculatePropertyValueFromCapRate(noi, capRate / 100);

  return (
    <CalculatorCard
      title="Property Valuation"
      description="Determine a property's estimated value based on its Net Operating Income and the market cap rate. This is the inverse of the cap rate calculation."
      actions={
        <PdfExportButton
          getOptions={() => ({
            title: "Property Valuation",
            inputs: [
              { label: "Net Operating Income", value: formatCurrency(noi) },
              { label: "Market Cap Rate", value: `${capRate}%` },
            ],
            results: [
              { label: "Estimated Property Value", value: formatCurrency(propertyValue) },
              { label: "Price per Dollar of NOI", value: noi > 0 ? `${(propertyValue / noi).toFixed(1)}x` : "—" },
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
          <SliderInput
            label="Market Cap Rate"
            value={capRate}
            onChange={setCapRate}
            min={3}
            max={12}
            step={0.25}
            suffix="%"
            tooltip={CRE_TOOLTIPS.capRate}
          />
        </div>
        <div>
          <ResultBox label="Estimated Property Value" value={formatCurrency(propertyValue)} />
          <p className="text-warmgray text-xs mt-3 text-center">
            Price per dollar of NOI: {noi > 0 ? `${(propertyValue / noi).toFixed(1)}x` : "—"}
          </p>
        </div>
      </div>
    </CalculatorCard>
  );
}
