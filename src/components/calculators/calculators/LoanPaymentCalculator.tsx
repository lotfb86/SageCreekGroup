"use client";

import { useState } from "react";
import NumberInput from "@/components/ui/NumberInput";
import SliderInput from "../SliderInput";
import CalculatorCard from "../CalculatorCard";
import ResultBox from "../ResultBox";
import { calculateMonthlyPayment, calculateBalloonBalance } from "@/lib/calculators";
import { formatCurrency } from "@/lib/utils";
import { CRE_TOOLTIPS } from "@/lib/calculator-tooltips";
import { useMarketRates } from "@/hooks/useMarketRates";
import AmortizationChart from "../charts/AmortizationChart";
import PaymentDonut from "../charts/PaymentDonut";
import PdfExportButton from "../PdfExportButton";

export default function LoanPaymentCalculator() {
  const [loanAmount, setLoanAmount] = useState(10000000);
  const [rate, setRate] = useState(5.5);
  const [amort, setAmort] = useState(30);
  const [term, setTerm] = useState(10);

  const { benchmarks } = useMarketRates();

  const monthly = calculateMonthlyPayment(loanAmount, rate, amort);
  const annual = monthly * 12;
  const totalInterest = monthly * amort * 12 - loanAmount;
  const balloon = calculateBalloonBalance(loanAmount, rate, amort, term);

  return (
    <CalculatorCard
      title="Loan Payment Calculator"
      description="Calculate monthly payments, total interest, and balloon balance at maturity. Set the loan term shorter than the amortization period to see the balloon payment due at maturity."
      actions={
        <PdfExportButton
          getOptions={() => ({
            title: "Loan Payment Calculator",
            inputs: [
              { label: "Loan Amount", value: formatCurrency(loanAmount) },
              { label: "Interest Rate", value: `${rate}%` },
              { label: "Amortization", value: `${amort} years` },
              { label: "Loan Term", value: `${term} years` },
            ],
            results: [
              { label: "Monthly Payment", value: formatCurrency(monthly) },
              { label: "Annual Payment", value: formatCurrency(annual) },
              { label: "Total Interest (Full Amort)", value: formatCurrency(totalInterest) },
              ...(term < amort ? [{ label: `Balloon at Year ${term}`, value: formatCurrency(balloon) }] : []),
            ],
          })}
        />
      }
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-4">
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
          <NumberInput
            label="Loan Term (Years)"
            value={term}
            onChange={setTerm}
            min={1}
            tooltip={CRE_TOOLTIPS.loanTerm}
          />
        </div>
        <div className="space-y-4">
          <ResultBox label="Monthly Payment" value={formatCurrency(monthly)} />
          <div className="bg-warmgray/5 rounded-sm p-4 space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-warmgray">Annual Payment</span>
              <span className="text-warmgray-heading font-medium">{formatCurrency(annual)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-warmgray">Total Interest (Full Amort)</span>
              <span className="text-warmgray-heading font-medium">{formatCurrency(totalInterest)}</span>
            </div>
            {term < amort && (
              <div className="flex justify-between text-sm border-t border-warmgray/10 pt-2">
                <span className="text-warmgray">Balloon at Year {term}</span>
                <span className="text-warmgray-heading font-medium">{formatCurrency(balloon)}</span>
              </div>
            )}
          </div>
          <PaymentDonut principal={loanAmount} interest={totalInterest} />
        </div>
      </div>

      {/* Amortization Chart */}
      <AmortizationChart
        loanAmount={loanAmount}
        annualRate={rate}
        amortYears={amort}
        termYears={term}
      />
    </CalculatorCard>
  );
}
