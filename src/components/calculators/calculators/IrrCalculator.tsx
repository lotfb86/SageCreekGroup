"use client";

import { useState } from "react";
import NumberInput from "@/components/ui/NumberInput";
import CalculatorCard from "../CalculatorCard";
import ResultBox from "../ResultBox";
import { calculateIrrAndEquityMultiple } from "@/lib/calculators";
import { formatCurrency } from "@/lib/utils";
import IrrSensitivityChart from "../charts/IrrSensitivityChart";
import PdfExportButton from "../PdfExportButton";

export default function IrrCalculator() {
  const [investment, setInvestment] = useState(1000000);
  const [holdPeriod, setHoldPeriod] = useState(5);
  const [cashFlows, setCashFlows] = useState<number[]>([80000, 82000, 84000, 86000, 88000]);
  const [exitProceeds, setExitProceeds] = useState(1500000);

  const handleHoldPeriodChange = (newPeriod: number) => {
    const clamped = Math.max(1, Math.min(10, newPeriod));
    setHoldPeriod(clamped);
    const newFlows = [...cashFlows];
    while (newFlows.length < clamped) newFlows.push(80000);
    setCashFlows(newFlows.slice(0, clamped));
  };

  const updateCashFlow = (index: number, value: number) => {
    const updated = [...cashFlows];
    updated[index] = value;
    setCashFlows(updated);
  };

  const result = calculateIrrAndEquityMultiple(investment, cashFlows, exitProceeds);

  return (
    <CalculatorCard
      title="IRR & Equity Multiple"
      description="Internal Rate of Return is the annualized return accounting for the timing of all cash flows. Equity Multiple shows total return as a multiple of invested capital."
      actions={
        <PdfExportButton
          getOptions={() => ({
            title: "IRR & Equity Multiple",
            inputs: [
              { label: "Initial Investment", value: formatCurrency(investment) },
              { label: "Hold Period", value: `${holdPeriod} years` },
              ...cashFlows.map((cf, i) => ({ label: `Year ${i + 1} Cash Flow`, value: formatCurrency(cf) })),
              { label: "Exit Proceeds", value: formatCurrency(exitProceeds) },
            ],
            results: [
              { label: "Internal Rate of Return", value: result.irr !== 0 ? `${(result.irr * 100).toFixed(2)}%` : "N/A" },
              { label: "Equity Multiple", value: `${result.equityMultiple.toFixed(2)}x` },
              { label: "Total Return", value: formatCurrency(cashFlows.reduce((s, c) => s + c, 0) + exitProceeds) },
            ],
          })}
        />
      }
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <NumberInput label="Initial Investment" value={investment} onChange={setInvestment} prefix="$" step={50000} />
          <NumberInput label="Hold Period (Years)" value={holdPeriod} onChange={handleHoldPeriodChange} min={1} />
          <div className="border border-warmgray/10 rounded-sm p-4 space-y-3">
            <p className="text-xs uppercase tracking-[2px] text-warmgray-heading font-medium">Annual Cash Flows</p>
            {cashFlows.map((cf, i) => (
              <NumberInput key={i} label={`Year ${i + 1}`} value={cf} onChange={(v) => updateCashFlow(i, v)} prefix="$" step={5000} />
            ))}
          </div>
          <NumberInput label="Exit Proceeds (Sale/Refi)" value={exitProceeds} onChange={setExitProceeds} prefix="$" step={50000} />
        </div>
        <div className="space-y-4">
          <ResultBox label="Internal Rate of Return" value={result.irr !== 0 ? `${(result.irr * 100).toFixed(2)}%` : "N/A"} />
          <ResultBox label="Equity Multiple" value={`${result.equityMultiple.toFixed(2)}x`} />
          <div className="bg-warmgray/5 rounded-sm p-4 space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-warmgray">Total Cash Flows</span>
              <span className="text-warmgray-heading font-medium">
                {formatCurrency(cashFlows.reduce((s, c) => s + c, 0))}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-warmgray">Exit Proceeds</span>
              <span className="text-warmgray-heading font-medium">{formatCurrency(exitProceeds)}</span>
            </div>
            <div className="flex justify-between text-sm border-t border-warmgray/10 pt-2">
              <span className="text-warmgray">Total Return</span>
              <span className="text-warmgray-heading font-medium">
                {formatCurrency(cashFlows.reduce((s, c) => s + c, 0) + exitProceeds)}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* IRR Sensitivity Chart */}
      <IrrSensitivityChart
        investment={investment}
        cashFlows={cashFlows}
        baseExitProceeds={exitProceeds}
      />
    </CalculatorCard>
  );
}
