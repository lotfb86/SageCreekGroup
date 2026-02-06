"use client";

import { useState } from "react";
import NumberInput from "@/components/ui/NumberInput";
import SliderInput from "../SliderInput";
import CalculatorCard from "../CalculatorCard";
import ResultBox from "../ResultBox";
import { calculateRefinanceSavings } from "@/lib/calculators";
import { formatCurrency, cn } from "@/lib/utils";
import { CRE_TOOLTIPS } from "@/lib/calculator-tooltips";
import { useMarketRates } from "@/hooks/useMarketRates";
import PdfExportButton from "../PdfExportButton";

export default function RefinanceCalculator() {
  const [currentBalance, setCurrentBalance] = useState(8000000);
  const [currentRate, setCurrentRate] = useState(6.75);
  const [currentRemYears, setCurrentRemYears] = useState(22);

  const [newAmount, setNewAmount] = useState(8000000);
  const [newRate, setNewRate] = useState(5.5);
  const [newAmort, setNewAmort] = useState(30);
  const [closingCosts, setClosingCosts] = useState(80000);

  const { benchmarks } = useMarketRates();

  const result = calculateRefinanceSavings(
    currentBalance,
    currentRate,
    currentRemYears,
    newAmount,
    newRate,
    newAmort,
    closingCosts
  );

  const saves = result.monthlySavings > 0;

  return (
    <CalculatorCard
      title="Refinance Savings Calculator"
      description="Compare your current loan terms against a new loan to see monthly, annual, and lifetime savings. Includes breakeven analysis on closing costs."
      actions={
        <PdfExportButton
          getOptions={() => ({
            title: "Refinance Savings Calculator",
            inputs: [
              { label: "Current Balance", value: formatCurrency(currentBalance) },
              { label: "Current Rate", value: `${currentRate}%` },
              { label: "Remaining Amort", value: `${currentRemYears} years` },
              { label: "New Loan Amount", value: formatCurrency(newAmount) },
              { label: "New Rate", value: `${newRate}%` },
              { label: "New Amortization", value: `${newAmort} years` },
              { label: "Closing Costs", value: formatCurrency(closingCosts) },
            ],
            results: [
              { label: "Current Monthly Payment", value: formatCurrency(result.currentMonthly) },
              { label: "New Monthly Payment", value: formatCurrency(result.newMonthly) },
              { label: "Monthly Savings", value: formatCurrency(result.monthlySavings) },
              { label: "Annual Savings", value: formatCurrency(result.annualSavings) },
              { label: "Lifetime Savings (Net)", value: formatCurrency(result.lifetimeSavings) },
              ...(saves ? [{ label: "Breakeven", value: `${result.breakEvenMonths} months` }] : []),
            ],
          })}
        />
      }
    >
      <div className="space-y-8">
        {/* Two-column: Current vs New */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Current Loan */}
          <div className="space-y-4">
            <p className="text-xs uppercase tracking-[2px] text-warmgray-heading font-medium border-b border-warmgray/10 pb-2">
              Current Loan
            </p>
            <NumberInput
              label="Current Balance"
              value={currentBalance}
              onChange={setCurrentBalance}
              prefix="$"
              step={100000}
            />
            <SliderInput
              label="Current Rate"
              value={currentRate}
              onChange={setCurrentRate}
              min={2}
              max={15}
              step={0.125}
              suffix="%"
            />
            <NumberInput
              label="Remaining Amort (Years)"
              value={currentRemYears}
              onChange={setCurrentRemYears}
              min={1}
            />
          </div>

          {/* New Loan */}
          <div className="space-y-4">
            <p className="text-xs uppercase tracking-[2px] text-warmgray-heading font-medium border-b border-warmgray/10 pb-2">
              New Loan
            </p>
            <NumberInput
              label="New Loan Amount"
              value={newAmount}
              onChange={setNewAmount}
              prefix="$"
              step={100000}
            />
            <SliderInput
              label="New Rate"
              value={newRate}
              onChange={setNewRate}
              min={2}
              max={15}
              step={0.125}
              suffix="%"
              marketHint={`Current 10-Yr Treasury: ${benchmarks.treasury10Yr.toFixed(2)}%`}
            />
            <NumberInput
              label="New Amortization (Years)"
              value={newAmort}
              onChange={setNewAmort}
              min={1}
            />
            <NumberInput
              label="Closing Costs"
              value={closingCosts}
              onChange={setClosingCosts}
              prefix="$"
              step={5000}
            />
          </div>
        </div>

        {/* Results */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-warmgray/5 rounded-sm p-4 text-center">
            <p className="text-warmgray text-[10px] uppercase tracking-[1.5px] mb-1">
              Current Monthly
            </p>
            <p className="font-serif text-lg text-warmgray-heading">
              {formatCurrency(result.currentMonthly)}
            </p>
          </div>
          <div className="bg-warmgray/5 rounded-sm p-4 text-center">
            <p className="text-warmgray text-[10px] uppercase tracking-[1.5px] mb-1">
              New Monthly
            </p>
            <p className="font-serif text-lg text-warmgray-heading">
              {formatCurrency(result.newMonthly)}
            </p>
          </div>
          <div
            className={cn(
              "rounded-sm p-4 text-center",
              saves ? "bg-sage-400/10" : "bg-red-50"
            )}
          >
            <p className="text-warmgray text-[10px] uppercase tracking-[1.5px] mb-1">
              Monthly Savings
            </p>
            <p
              className={cn(
                "font-serif text-lg",
                saves ? "text-sage-400" : "text-red-600"
              )}
            >
              {saves ? "+" : ""}
              {formatCurrency(result.monthlySavings)}
            </p>
          </div>
          <div
            className={cn(
              "rounded-sm p-4 text-center",
              saves ? "bg-sage-400/10" : "bg-red-50"
            )}
          >
            <p className="text-warmgray text-[10px] uppercase tracking-[1.5px] mb-1">
              Annual Savings
            </p>
            <p
              className={cn(
                "font-serif text-lg",
                saves ? "text-sage-400" : "text-red-600"
              )}
            >
              {saves ? "+" : ""}
              {formatCurrency(result.annualSavings)}
            </p>
          </div>
        </div>

        <div className="bg-warmgray/5 rounded-sm p-4 space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-warmgray">Lifetime Savings (Net of Costs)</span>
            <span
              className={cn(
                "font-medium",
                result.lifetimeSavings > 0
                  ? "text-sage-400"
                  : "text-red-600"
              )}
            >
              {formatCurrency(result.lifetimeSavings)}
            </span>
          </div>
          {saves && (
            <div className="flex justify-between text-sm">
              <span className="text-warmgray">
                Breakeven on Closing Costs
              </span>
              <span className="text-warmgray-heading font-medium">
                {result.breakEvenMonths} months
              </span>
            </div>
          )}
        </div>
      </div>
    </CalculatorCard>
  );
}
