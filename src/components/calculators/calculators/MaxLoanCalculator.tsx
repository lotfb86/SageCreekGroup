"use client";

import { useState } from "react";
import NumberInput from "@/components/ui/NumberInput";
import SliderInput from "../SliderInput";
import CalculatorCard from "../CalculatorCard";
import ResultBox from "../ResultBox";
import { calculateMaxLoanAmount, calculateMonthlyPayment } from "@/lib/calculators";
import { formatCurrency } from "@/lib/utils";
import { CRE_TOOLTIPS } from "@/lib/calculator-tooltips";
import { useMarketRates } from "@/hooks/useMarketRates";
import PdfExportButton from "../PdfExportButton";

export default function MaxLoanCalculator() {
  const [noi, setNoi] = useState(750000);
  const [rate, setRate] = useState(5.5);
  const [amort, setAmort] = useState(30);
  const [targetDSCR, setTargetDSCR] = useState(1.25);

  const { benchmarks } = useMarketRates();

  const maxLoan = calculateMaxLoanAmount(noi, rate, amort, targetDSCR);
  const monthlyPayment = calculateMonthlyPayment(maxLoan, rate, amort);

  return (
    <CalculatorCard
      title="Max Loan from DSCR"
      description="Reverse-calculate the maximum loan amount a property can support based on its NOI and a lender's required DSCR. Essential for understanding borrowing capacity."
      actions={
        <PdfExportButton
          getOptions={() => ({
            title: "Max Loan from DSCR",
            inputs: [
              { label: "Net Operating Income", value: formatCurrency(noi) },
              { label: "Interest Rate", value: `${rate}%` },
              { label: "Amortization", value: `${amort} years` },
              { label: "Target DSCR", value: `${targetDSCR.toFixed(2)}x` },
            ],
            results: [
              { label: "Maximum Loan Amount", value: formatCurrency(maxLoan) },
              { label: "Monthly Payment", value: formatCurrency(monthlyPayment) },
              { label: "Annual Debt Service", value: formatCurrency(monthlyPayment * 12) },
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
          <SliderInput
            label="Target DSCR"
            value={targetDSCR}
            onChange={setTargetDSCR}
            min={1.0}
            max={2.0}
            step={0.05}
            tooltip={CRE_TOOLTIPS.dscr}
          />
        </div>
        <div className="space-y-4">
          <ResultBox label="Maximum Loan Amount" value={formatCurrency(maxLoan)} />
          <div className="bg-warmgray/5 rounded-sm p-4 space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-warmgray">Monthly Payment</span>
              <span className="text-warmgray-heading font-medium">{formatCurrency(monthlyPayment)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-warmgray">Annual Debt Service</span>
              <span className="text-warmgray-heading font-medium">{formatCurrency(monthlyPayment * 12)}</span>
            </div>
          </div>
        </div>
      </div>
    </CalculatorCard>
  );
}
