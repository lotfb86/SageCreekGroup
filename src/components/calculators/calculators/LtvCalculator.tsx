"use client";

import { useState } from "react";
import NumberInput from "@/components/ui/NumberInput";
import SliderInput from "../SliderInput";
import CalculatorCard from "../CalculatorCard";
import ResultBox from "../ResultBox";
import { calculateLTV } from "@/lib/calculators";
import { formatCurrency, cn } from "@/lib/utils";
import { CRE_TOOLTIPS } from "@/lib/calculator-tooltips";
import PdfExportButton from "../PdfExportButton";

export default function LtvCalculator() {
  const [loanAmount, setLoanAmount] = useState(7500000);
  const [propertyValue, setPropertyValue] = useState(10000000);

  const ltv = calculateLTV(loanAmount, propertyValue);
  const equity = propertyValue - loanAmount;

  return (
    <CalculatorCard
      title="LTV Calculator"
      description="Loan-to-Value measures leverage — the loan amount as a percentage of property value. Higher LTV means less equity required but more risk. Max LTV varies by loan type."
      actions={
        <PdfExportButton
          getOptions={() => ({
            title: "LTV Calculator",
            inputs: [
              { label: "Loan Amount", value: formatCurrency(loanAmount) },
              { label: "Property Value", value: formatCurrency(propertyValue) },
            ],
            results: [
              { label: "Loan-to-Value", value: `${(ltv * 100).toFixed(1)}%` },
              { label: "Equity Required", value: `${formatCurrency(Math.max(0, equity))} (${((1 - ltv) * 100).toFixed(1)}%)` },
            ],
          })}
        />
      }
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <NumberInput
            label="Loan Amount"
            value={loanAmount}
            onChange={setLoanAmount}
            prefix="$"
            step={100000}
          />
          <NumberInput
            label="Property Value"
            value={propertyValue}
            onChange={setPropertyValue}
            prefix="$"
            step={100000}
          />
        </div>
        <div className="space-y-4">
          <div
            className={cn(
              "rounded-sm p-6 text-center",
              ltv <= 0.65
                ? "bg-sage-400/10"
                : ltv <= 0.75
                ? "bg-yellow-50"
                : "bg-red-50"
            )}
          >
            <p className="text-warmgray text-xs uppercase tracking-[2px] mb-1">
              Loan-to-Value
            </p>
            <p
              className={cn(
                "font-serif text-3xl",
                ltv <= 0.65
                  ? "text-sage-400"
                  : ltv <= 0.75
                  ? "text-yellow-600"
                  : "text-red-600"
              )}
            >
              {(ltv * 100).toFixed(1)}%
            </p>
            <p className="text-warmgray/60 text-xs mt-2">
              Equity required: {formatCurrency(Math.max(0, equity))} (
              {((1 - ltv) * 100).toFixed(1)}%)
            </p>
          </div>

          {/* LTV visual bar */}
          <div>
            <div className="flex h-4 rounded-sm overflow-hidden">
              <div
                className={cn(
                  "transition-all",
                  ltv <= 0.65
                    ? "bg-sage-400"
                    : ltv <= 0.75
                    ? "bg-yellow-500"
                    : "bg-red-500"
                )}
                style={{
                  width: `${Math.min(ltv * 100, 100)}%`,
                }}
              />
              <div className="bg-navy-800/20 flex-1" />
            </div>
            <div className="flex justify-between text-xs mt-1">
              <span className="text-warmgray">
                Debt: {(ltv * 100).toFixed(1)}%
              </span>
              <span className="text-warmgray">
                Equity: {((1 - ltv) * 100).toFixed(1)}%
              </span>
            </div>
          </div>

          <div className="bg-warmgray/5 rounded-sm p-4">
            <p className="text-xs uppercase tracking-[2px] text-warmgray-heading font-medium mb-3">
              Max LTV by Loan Type
            </p>
            <div className="space-y-1.5 text-xs">
              {[
                { type: "Agency Multifamily", range: "75–80%" },
                { type: "CMBS", range: "65–75%" },
                { type: "Bridge", range: "70–80%" },
                { type: "Bank Permanent", range: "65–75%" },
                { type: "Construction", range: "60–70%" },
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
