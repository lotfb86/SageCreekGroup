"use client";

import { useState, useEffect } from "react";
import NumberInput from "@/components/ui/NumberInput";
import SliderInput from "../SliderInput";
import CalculatorCard from "../CalculatorCard";
import ResultBox from "../ResultBox";
import {
  calculateMonthlyPayment,
  calculateInterestOnlyPayment,
  calculateBalloonBalanceWithIO,
} from "@/lib/calculators";
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
  const [ioYears, setIoYears] = useState(0);

  const { benchmarks } = useMarketRates();

  // Clamp IO to not exceed term
  useEffect(() => {
    if (ioYears > term) setIoYears(term);
  }, [term, ioYears]);

  // P&I payment (amortizing period)
  const monthly = calculateMonthlyPayment(loanAmount, rate, amort);
  const annual = monthly * 12;

  // IO payment
  const ioMonthly = calculateInterestOnlyPayment(loanAmount, rate);
  const ioAnnual = ioMonthly * 12;

  // Total interest: IO period interest + full amortization interest
  const ioInterest = ioMonthly * ioYears * 12;
  const amortInterest = monthly * amort * 12 - loanAmount;
  const totalInterest = ioInterest + amortInterest;

  // Balloon balance accounting for IO period
  const balloon = calculateBalloonBalanceWithIO(loanAmount, rate, amort, term, ioYears);

  const effectiveIO = Math.min(ioYears, term);

  return (
    <CalculatorCard
      title="Loan Payment Calculator"
      description="Calculate monthly payments, total interest, and balloon balance at maturity. Set an interest-only period to see IO vs. amortizing payments side by side."
      actions={
        <PdfExportButton
          getOptions={() => ({
            title: "Loan Payment Calculator",
            inputs: [
              { label: "Loan Amount", value: formatCurrency(loanAmount) },
              { label: "Interest Rate", value: `${rate}%` },
              { label: "Amortization", value: `${amort} years` },
              { label: "Loan Term", value: `${term} years` },
              ...(ioYears > 0
                ? [{ label: "Interest-Only Period", value: `${ioYears} years` }]
                : []),
            ],
            results: [
              ...(ioYears > 0
                ? [
                    { label: "IO Monthly Payment", value: formatCurrency(ioMonthly) },
                    { label: "IO Annual Payment", value: formatCurrency(ioAnnual) },
                  ]
                : []),
              { label: "Amortizing Monthly Payment (P&I)", value: formatCurrency(monthly) },
              { label: "Annual Payment (P&I)", value: formatCurrency(annual) },
              {
                label: `Total Interest (${ioYears > 0 ? "IO + Full Amort" : "Full Amort"})`,
                value: formatCurrency(totalInterest),
              },
              ...(term < amort + ioYears
                ? [{ label: `Balloon at Year ${term}`, value: formatCurrency(balloon) }]
                : []),
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
          <NumberInput
            label="Interest-Only Period (Years)"
            value={ioYears}
            onChange={(v) => setIoYears(Math.max(0, Math.min(term, v)))}
            min={0}
            tooltip={CRE_TOOLTIPS.interestOnly}
          />
        </div>
        <div className="space-y-4">
          {/* IO payment — only shown when IO > 0 */}
          {ioYears > 0 && (
            <ResultBox label="IO Monthly Payment" value={formatCurrency(ioMonthly)} highlight />
          )}

          {/* P&I payment */}
          <ResultBox
            label={ioYears > 0 ? "Amortizing Monthly (P&I)" : "Monthly Payment"}
            value={formatCurrency(monthly)}
          />

          {/* Secondary results */}
          <div className="bg-warmgray/5 rounded-sm p-4 space-y-2">
            {ioYears > 0 && (
              <>
                <div className="flex justify-between text-sm">
                  <span className="text-warmgray">IO Annual Payment</span>
                  <span className="text-warmgray-heading font-medium">{formatCurrency(ioAnnual)}</span>
                </div>
                <div className="flex justify-between text-sm border-b border-warmgray/10 pb-2">
                  <span className="text-warmgray">IO Period</span>
                  <span className="text-warmgray-heading font-medium">
                    {effectiveIO} {effectiveIO === 1 ? "year" : "years"}
                  </span>
                </div>
              </>
            )}
            <div className="flex justify-between text-sm">
              <span className="text-warmgray">Annual Payment (P&I)</span>
              <span className="text-warmgray-heading font-medium">{formatCurrency(annual)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-warmgray">
                Total Interest ({ioYears > 0 ? "IO + Full Amort" : "Full Amort"})
              </span>
              <span className="text-warmgray-heading font-medium">{formatCurrency(totalInterest)}</span>
            </div>
            {term < amort + ioYears && (
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
        ioYears={ioYears}
      />
    </CalculatorCard>
  );
}
