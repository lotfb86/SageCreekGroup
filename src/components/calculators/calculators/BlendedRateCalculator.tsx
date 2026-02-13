"use client";

import { useState } from "react";
import NumberInput from "@/components/ui/NumberInput";
import CalculatorCard from "../CalculatorCard";
import ResultBox from "../ResultBox";
import {
  calculateBlendedRate,
  calculateBlendedEffectiveRate,
  calculateEffectiveRateWithPoints,
} from "@/lib/calculators";
import type { LoanTranche } from "@/lib/calculators";
import { formatCurrency } from "@/lib/utils";
import { Plus, Minus } from "lucide-react";
import PdfExportButton from "../PdfExportButton";

const TRANCHE_LABELS = [
  "1st Mortgage",
  "Mezzanine Loan",
  "Pref Equity",
  "Tranche 4",
  "Tranche 5",
];

export default function BlendedRateCalculator() {
  const [termMonths, setTermMonths] = useState(60);
  const [tranches, setTranches] = useState<LoanTranche[]>([
    { amount: 8000000, rate: 5.25, points: 0.5 },
    { amount: 2000000, rate: 8.5, points: 1.0 },
  ]);

  const blendedRate = calculateBlendedRate(tranches);
  const blendedEffectiveRate = calculateBlendedEffectiveRate(tranches, termMonths);
  const totalAmount = tranches.reduce((s, t) => s + t.amount, 0);
  const totalPoints = totalAmount > 0
    ? tranches.reduce((s, t) => s + t.amount * (t.points ?? 0), 0) / totalAmount
    : 0;
  const totalPointsDollars = tranches.reduce(
    (s, t) => s + (t.amount * (t.points ?? 0)) / 100,
    0
  );

  const updateTranche = (
    index: number,
    field: keyof LoanTranche,
    value: number
  ) => {
    const updated = [...tranches];
    updated[index] = { ...updated[index], [field]: value };
    setTranches(updated);
  };

  return (
    <CalculatorCard
      title="Blended Mortgage Rate"
      description="Calculate the weighted average interest rate when a property has multiple loans (e.g., senior debt + mezzanine). Add up to 5 loan tranches. Points are amortized over the loan term to show the true all-in cost."
      actions={
        <PdfExportButton
          getOptions={() => ({
            title: "Blended Mortgage Rate",
            inputs: [
              { label: "Term", value: `${termMonths} months` },
              ...tranches.map((t, i) => ({
                label: TRANCHE_LABELS[i],
                value: `${formatCurrency(t.amount)} at ${t.rate}% + ${t.points ?? 0} pts`,
              })),
            ],
            results: [
              { label: "Blended Rate (Base)", value: `${blendedRate.toFixed(3)}%` },
              {
                label: "Blended Effective Rate (w/ Points)",
                value: `${blendedEffectiveRate.toFixed(3)}%`,
              },
              { label: "Total Loan Amount", value: formatCurrency(totalAmount) },
              {
                label: "Blended Points",
                value: `${totalPoints.toFixed(2)}% (${formatCurrency(totalPointsDollars)})`,
              },
            ],
            details: tranches.map((t, i) => ({
              label: TRANCHE_LABELS[i],
              value: `${t.rate}% base → ${calculateEffectiveRateWithPoints(t.rate, t.points ?? 0, termMonths).toFixed(3)}% effective`,
            })),
            detailsTitle: "Per-Tranche Effective Rates",
          })}
        />
      }
    >
      <div className="space-y-6">
        {/* Term Input */}
        <div className="max-w-xs">
          <NumberInput
            label="Term (Months)"
            value={termMonths}
            onChange={setTermMonths}
            step={1}
            min={1}
          />
        </div>

        <hr className="border-warmgray/10" />

        {/* Tranches */}
        {tranches.map((tranche, i) => (
          <div key={i}>
            <div className="flex items-center justify-between mb-2">
              <p className="text-xs uppercase tracking-[2px] text-warmgray-heading font-medium">
                {TRANCHE_LABELS[i]}
              </p>
              {tranches.length > 2 && (
                <button
                  onClick={() =>
                    setTranches(tranches.filter((_, idx) => idx !== i))
                  }
                  className="p-1 text-warmgray/40 hover:text-red-500 transition-colors"
                  title="Remove tranche"
                >
                  <Minus size={14} />
                </button>
              )}
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <NumberInput
                  label="Loan Amount"
                  value={tranche.amount}
                  onChange={(v) => updateTranche(i, "amount", v)}
                  prefix="$"
                  step={100000}
                />
              </div>
              <div>
                <NumberInput
                  label="Interest Rate"
                  value={tranche.rate}
                  onChange={(v) => updateTranche(i, "rate", v)}
                  suffix="%"
                  step={0.125}
                />
              </div>
              <div>
                <NumberInput
                  label="Points"
                  value={tranche.points ?? 0}
                  onChange={(v) => updateTranche(i, "points", v)}
                  step={0.25}
                  min={0}
                />
              </div>
            </div>
            {/* Effective rate per tranche */}
            <p className="text-xs text-warmgray mt-2">
              Effective Rate w/ Points:{" "}
              <span className="text-warmgray-heading font-medium">
                {calculateEffectiveRateWithPoints(
                  tranche.rate,
                  tranche.points ?? 0,
                  termMonths
                ).toFixed(3)}
                %
              </span>
            </p>
          </div>
        ))}

        {tranches.length < 5 && (
          <button
            onClick={() =>
              setTranches([...tranches, { amount: 0, rate: 0, points: 0 }])
            }
            className="flex items-center gap-2 text-sage-400 text-sm font-medium hover:text-sage-400/80 transition-colors"
          >
            <Plus size={16} /> Add Tranche
          </button>
        )}

        {/* Results */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
          <ResultBox
            label="Blended Rate (Base)"
            value={`${blendedRate.toFixed(3)}%`}
          />
          <ResultBox
            label="Blended Rate w/ Points"
            value={`${blendedEffectiveRate.toFixed(3)}%`}
            highlight
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <ResultBox
            label="Total Loan Amount"
            value={formatCurrency(totalAmount)}
          />
          <ResultBox
            label="Blended Points"
            value={`${totalPoints.toFixed(2)}% (${formatCurrency(totalPointsDollars)})`}
          />
        </div>

        {/* Tranche Weights */}
        <div className="bg-warmgray/5 rounded-sm p-4">
          <p className="text-xs uppercase tracking-[2px] text-warmgray-heading font-medium mb-3">
            Tranche Breakdown
          </p>
          {tranches.map((t, i) => (
            <div key={i} className="flex justify-between text-sm mb-2">
              <span className="text-warmgray">
                {TRANCHE_LABELS[i]} ({t.rate}% + {t.points ?? 0} pts)
              </span>
              <div className="text-right">
                <span className="text-warmgray-heading font-medium">
                  {totalAmount > 0
                    ? ((t.amount / totalAmount) * 100).toFixed(1)
                    : 0}
                  %
                </span>
                <span className="text-warmgray text-xs ml-2">
                  →{" "}
                  {calculateEffectiveRateWithPoints(
                    t.rate,
                    t.points ?? 0,
                    termMonths
                  ).toFixed(3)}
                  % eff.
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </CalculatorCard>
  );
}
