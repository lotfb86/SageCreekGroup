"use client";

import { useState } from "react";
import NumberInput from "@/components/ui/NumberInput";
import SliderInput from "../SliderInput";
import CalculatorCard from "../CalculatorCard";
import { calculateMonthlyPayment, calculateDSCR } from "@/lib/calculators";
import { formatCurrency, cn } from "@/lib/utils";
import { CRE_TOOLTIPS } from "@/lib/calculator-tooltips";
import { useMarketRates } from "@/hooks/useMarketRates";
import PdfExportButton from "../PdfExportButton";

export default function DscrCalculator() {
  const [noi, setNoi] = useState(750000);
  const [loanAmount, setLoanAmount] = useState(10000000);
  const [rate, setRate] = useState(5.5);
  const [amort, setAmort] = useState(30);

  const { benchmarks } = useMarketRates();

  const monthlyPayment = calculateMonthlyPayment(loanAmount, rate, amort);
  const annualDebtService = monthlyPayment * 12;
  const dscr = calculateDSCR(noi, annualDebtService);

  return (
    <CalculatorCard
      title="DSCR Calculator"
      description="Debt Service Coverage Ratio measures a property's ability to cover its debt obligations. Most lenders require a minimum DSCR of 1.25x."
      actions={
        <PdfExportButton
          getOptions={() => ({
            title: "DSCR Calculator",
            inputs: [
              { label: "NOI", value: formatCurrency(noi) },
              { label: "Loan Amount", value: formatCurrency(loanAmount) },
              { label: "Interest Rate", value: `${rate}%` },
              { label: "Amortization", value: `${amort} years` },
            ],
            results: [
              { label: "DSCR Ratio", value: `${dscr.toFixed(2)}x` },
              { label: "Monthly Payment", value: formatCurrency(monthlyPayment) },
              { label: "Annual Debt Service", value: formatCurrency(annualDebtService) },
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
          <NumberInput label="Loan Amount" value={loanAmount} onChange={setLoanAmount} prefix="$" step={100000} />
          <SliderInput
            label="Interest Rate"
            value={rate}
            onChange={setRate}
            min={2}
            max={15}
            step={0.125}
            suffix="%"
            tooltip={CRE_TOOLTIPS.treasury}
            marketHint={`Current 10-Yr Treasury: ${benchmarks.treasury10Yr.toFixed(2)}%`}
          />
          <NumberInput
            label="Amortization (Years)"
            value={amort}
            onChange={setAmort}
            min={1}
            tooltip={CRE_TOOLTIPS.amortization}
          />
        </div>
        <div className="space-y-4">
          <div className={cn(
            "rounded-sm p-6 text-center",
            dscr >= 1.25 ? "bg-sage-400/10" : dscr >= 1.0 ? "bg-yellow-50" : "bg-red-50"
          )}>
            <p className="text-warmgray text-xs uppercase tracking-[2px] mb-1">DSCR Ratio</p>
            <p className={cn(
              "font-serif text-3xl",
              dscr >= 1.25 ? "text-sage-400" : dscr >= 1.0 ? "text-yellow-600" : "text-red-600"
            )}>
              {dscr.toFixed(2)}x
            </p>
            <p className="text-warmgray/60 text-xs mt-2">
              {dscr >= 1.25 ? "Strong — meets most lender requirements" : dscr >= 1.0 ? "Marginal — may limit options" : "Below breakeven"}
            </p>
          </div>
          <div className="bg-warmgray/5 rounded-sm p-4 space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-warmgray">Monthly Payment</span>
              <span className="text-warmgray-heading font-medium">{formatCurrency(monthlyPayment)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-warmgray">Annual Debt Service</span>
              <span className="text-warmgray-heading font-medium">{formatCurrency(annualDebtService)}</span>
            </div>
          </div>
        </div>
      </div>
    </CalculatorCard>
  );
}
