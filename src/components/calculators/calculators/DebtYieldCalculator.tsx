"use client";

import { useState } from "react";
import NumberInput from "@/components/ui/NumberInput";
import CalculatorCard from "../CalculatorCard";
import { calculateDebtYield } from "@/lib/calculators";
import { formatCurrency, cn } from "@/lib/utils";
import { CRE_TOOLTIPS } from "@/lib/calculator-tooltips";
import PdfExportButton from "../PdfExportButton";

export default function DebtYieldCalculator() {
  const [noi, setNoi] = useState(750000);
  const [loanAmount, setLoanAmount] = useState(8000000);

  const debtYield = calculateDebtYield(noi, loanAmount);

  return (
    <CalculatorCard
      title="Debt Yield Calculator"
      description="Debt yield is NOI divided by loan amount — a lender-focused metric that's independent of interest rate and amortization. CMBS lenders typically require 8–10%+ debt yield."
      actions={
        <PdfExportButton
          getOptions={() => ({
            title: "Debt Yield Calculator",
            inputs: [
              { label: "Net Operating Income", value: formatCurrency(noi) },
              { label: "Loan Amount", value: formatCurrency(loanAmount) },
            ],
            results: [
              { label: "Debt Yield", value: `${(debtYield * 100).toFixed(2)}%` },
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
            label="Loan Amount"
            value={loanAmount}
            onChange={setLoanAmount}
            prefix="$"
            step={100000}
          />
        </div>
        <div className="space-y-4">
          <div
            className={cn(
              "rounded-sm p-6 text-center",
              debtYield >= 0.1
                ? "bg-sage-400/10"
                : debtYield >= 0.08
                ? "bg-yellow-50"
                : "bg-red-50"
            )}
          >
            <p className="text-warmgray text-xs uppercase tracking-[2px] mb-1">
              Debt Yield
            </p>
            <p
              className={cn(
                "font-serif text-3xl",
                debtYield >= 0.1
                  ? "text-sage-400"
                  : debtYield >= 0.08
                  ? "text-yellow-600"
                  : "text-red-600"
              )}
            >
              {(debtYield * 100).toFixed(2)}%
            </p>
            <p className="text-warmgray/60 text-xs mt-2">
              {debtYield >= 0.1
                ? "Strong — meets most CMBS requirements"
                : debtYield >= 0.08
                ? "Marginal — may limit CMBS options"
                : "Below typical CMBS minimum (8%)"}
            </p>
          </div>

          <div className="bg-warmgray/5 rounded-sm p-4">
            <p className="text-xs uppercase tracking-[2px] text-warmgray-heading font-medium mb-3">
              Typical Debt Yield Requirements
            </p>
            <div className="space-y-1.5 text-xs">
              {[
                { type: "CMBS", range: "8.0–10.0%" },
                { type: "Agency Multifamily", range: "7.0–9.0%" },
                { type: "Bank / Life Co.", range: "7.5–9.5%" },
                { type: "Bridge", range: "6.0–8.0%" },
              ].map((r) => (
                <div key={r.type} className="flex justify-between">
                  <span className="text-warmgray">{r.type}</span>
                  <span className="text-warmgray-heading font-medium">
                    {r.range}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </CalculatorCard>
  );
}
