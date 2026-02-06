"use client";

import { useState } from "react";
import NumberInput from "@/components/ui/NumberInput";
import CalculatorCard from "../CalculatorCard";
import ResultBox from "../ResultBox";
import { calculateBlendedRate } from "@/lib/calculators";
import type { LoanTranche } from "@/lib/calculators";
import { formatCurrency } from "@/lib/utils";
import { Plus, Minus } from "lucide-react";
import PdfExportButton from "../PdfExportButton";

export default function BlendedRateCalculator() {
  const [tranches, setTranches] = useState<LoanTranche[]>([
    { amount: 8000000, rate: 5.25 },
    { amount: 2000000, rate: 8.5 },
  ]);

  const blendedRate = calculateBlendedRate(tranches);
  const totalAmount = tranches.reduce((s, t) => s + t.amount, 0);

  const updateTranche = (index: number, field: keyof LoanTranche, value: number) => {
    const updated = [...tranches];
    updated[index] = { ...updated[index], [field]: value };
    setTranches(updated);
  };

  return (
    <CalculatorCard
      title="Blended Mortgage Rate"
      description="Calculate the weighted average interest rate when a property has multiple loans (e.g., senior debt + mezzanine). Add up to 5 loan tranches."
      actions={
        <PdfExportButton
          getOptions={() => ({
            title: "Blended Mortgage Rate",
            inputs: tranches.map((t, i) => ({
              label: `Tranche ${i + 1}`,
              value: `${formatCurrency(t.amount)} at ${t.rate}%`,
            })),
            results: [
              { label: "Blended Rate", value: `${blendedRate.toFixed(3)}%` },
              { label: "Total Loan Amount", value: formatCurrency(totalAmount) },
            ],
          })}
        />
      }
    >
      <div className="space-y-6">
        {tranches.map((tranche, i) => (
          <div key={i} className="flex items-end gap-4">
            <div className="flex-1">
              <NumberInput
                label={`Tranche ${i + 1} — Amount`}
                value={tranche.amount}
                onChange={(v) => updateTranche(i, "amount", v)}
                prefix="$"
                step={100000}
              />
            </div>
            <div className="w-32">
              <NumberInput
                label="Rate"
                value={tranche.rate}
                onChange={(v) => updateTranche(i, "rate", v)}
                suffix="%"
                step={0.125}
              />
            </div>
            {tranches.length > 2 && (
              <button
                onClick={() => setTranches(tranches.filter((_, idx) => idx !== i))}
                className="mb-1 p-2 text-warmgray/40 hover:text-red-500 transition-colors"
              >
                <Minus size={16} />
              </button>
            )}
          </div>
        ))}

        {tranches.length < 5 && (
          <button
            onClick={() => setTranches([...tranches, { amount: 0, rate: 0 }])}
            className="flex items-center gap-2 text-sage-400 text-sm font-medium hover:text-sage-400/80 transition-colors"
          >
            <Plus size={16} /> Add Tranche
          </button>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
          <ResultBox label="Blended Rate" value={`${blendedRate.toFixed(3)}%`} />
          <ResultBox label="Total Loan Amount" value={formatCurrency(totalAmount)} />
        </div>

        <div className="bg-warmgray/5 rounded-sm p-4">
          <p className="text-xs uppercase tracking-[2px] text-warmgray-heading font-medium mb-3">Tranche Weights</p>
          {tranches.map((t, i) => (
            <div key={i} className="flex justify-between text-sm mb-1">
              <span className="text-warmgray">Tranche {i + 1} ({t.rate}%)</span>
              <span className="text-warmgray-heading font-medium">
                {totalAmount > 0 ? ((t.amount / totalAmount) * 100).toFixed(1) : 0}%
              </span>
            </div>
          ))}
        </div>
      </div>
    </CalculatorCard>
  );
}
