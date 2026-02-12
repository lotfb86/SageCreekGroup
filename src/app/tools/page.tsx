"use client";

import { useState } from "react";
import { Calculator, ArrowRight } from "lucide-react";
import Link from "next/link";
import {
  calculateMonthlyPayment,
  calculateDSCR,
  calculateMaxLoanAmount,
} from "@/lib/calculators";
import { formatCurrency } from "@/lib/utils";
import NumberInput from "@/components/ui/NumberInput";

function PaymentCalculator() {
  const [loanAmount, setLoanAmount] = useState(10000000);
  const [rate, setRate] = useState(5.5);
  const [amort, setAmort] = useState(30);

  const monthly = calculateMonthlyPayment(loanAmount, rate, amort);
  const annual = monthly * 12;

  return (
    <div className="bg-white rounded-sm p-8 shadow-sm">
      <div className="flex items-center gap-3 mb-6">
        <Calculator size={24} className="text-sage-400" />
        <h3 className="font-serif text-xl text-warmgray-heading">
          Loan Payment Calculator
        </h3>
      </div>
      <div className="space-y-4 mb-6">
        <NumberInput label="Loan Amount" value={loanAmount} onChange={setLoanAmount} prefix="$" step={100000} />
        <NumberInput label="Interest Rate" value={rate} onChange={setRate} suffix="%" step={0.125} />
        <NumberInput label="Amortization (Years)" value={amort} onChange={setAmort} min={1} />
      </div>
      <div className="bg-navy-800 rounded-sm p-6 text-center">
        <p className="text-white/60 text-xs uppercase tracking-[2px] mb-1">Monthly Payment</p>
        <p className="font-serif text-3xl text-white">{formatCurrency(monthly)}</p>
        <p className="text-white/40 text-xs mt-2">Annual: {formatCurrency(annual)}</p>
      </div>
    </div>
  );
}

function DSCRCalculator() {
  const [noi, setNoi] = useState(750000);
  const [debtService, setDebtService] = useState(550000);

  const dscr = calculateDSCR(noi, debtService);

  return (
    <div className="bg-white rounded-sm p-8 shadow-sm">
      <div className="flex items-center gap-3 mb-6">
        <Calculator size={24} className="text-sage-400" />
        <h3 className="font-serif text-xl text-warmgray-heading">
          DSCR Calculator
        </h3>
      </div>
      <div className="space-y-4 mb-6">
        <NumberInput label="Net Operating Income (NOI)" value={noi} onChange={setNoi} prefix="$" step={10000} />
        <NumberInput label="Annual Debt Service" value={debtService} onChange={setDebtService} prefix="$" step={10000} />
      </div>
      <div className={`rounded-sm p-6 text-center ${dscr >= 1.25 ? "bg-sage-400/10" : dscr >= 1.0 ? "bg-yellow-50" : "bg-red-50"}`}>
        <p className="text-warmgray text-xs uppercase tracking-[2px] mb-1">DSCR Ratio</p>
        <p className={`font-serif text-3xl ${dscr >= 1.25 ? "text-sage-400" : dscr >= 1.0 ? "text-yellow-600" : "text-red-600"}`}>
          {dscr.toFixed(2)}x
        </p>
        <p className="text-warmgray/60 text-xs mt-2">
          {dscr >= 1.25 ? "Strong — meets most lender requirements" : dscr >= 1.0 ? "Marginal — may limit options" : "Below breakeven"}
        </p>
      </div>
    </div>
  );
}

function MaxLoanCalculator() {
  const [noi, setNoi] = useState(750000);
  const [rate, setRate] = useState(5.5);
  const [amort, setAmort] = useState(30);
  const [targetDSCR, setTargetDSCR] = useState(1.25);

  const maxLoan = calculateMaxLoanAmount(noi, rate, amort, targetDSCR);
  const monthlyPayment = calculateMonthlyPayment(maxLoan, rate, amort);

  return (
    <div className="bg-white rounded-sm p-8 shadow-sm">
      <div className="flex items-center gap-3 mb-6">
        <Calculator size={24} className="text-sage-400" />
        <h3 className="font-serif text-xl text-warmgray-heading">
          Max Loan Amount
        </h3>
      </div>
      <div className="space-y-4 mb-6">
        <NumberInput label="Net Operating Income (NOI)" value={noi} onChange={setNoi} prefix="$" step={10000} />
        <NumberInput label="Interest Rate" value={rate} onChange={setRate} suffix="%" step={0.125} />
        <NumberInput label="Amortization (Years)" value={amort} onChange={setAmort} min={1} />
        <NumberInput label="Target DSCR" value={targetDSCR} onChange={setTargetDSCR} step={0.05} min={1} />
      </div>
      <div className="bg-navy-800 rounded-sm p-6 text-center">
        <p className="text-white/60 text-xs uppercase tracking-[2px] mb-1">Maximum Loan Amount</p>
        <p className="font-serif text-3xl text-white">{formatCurrency(maxLoan)}</p>
        <p className="text-white/40 text-xs mt-2">Monthly Payment: {formatCurrency(monthlyPayment)}</p>
      </div>
    </div>
  );
}

export default function ToolsPage() {
  return (
    <>
      {/* Hero-style header */}
      <section className="bg-navy-800 py-20 px-6">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="font-serif text-4xl sm:text-5xl text-white leading-tight">
            CRE Loan Calculators
          </h1>
          <p className="mt-4 text-white/60 text-lg">
            Estimate monthly payments, analyze DSCR ratios, and determine
            maximum loan amounts for your next investment.
          </p>
        </div>
      </section>

      {/* Calculators */}
      <section className="bg-cream py-24 px-6">
        <div className="mx-auto max-w-6xl">
          {/* Featured Tool Banner */}
          <Link
            href="/tools/mortgage-calculator"
            className="block bg-white rounded-sm p-8 shadow-sm hover:shadow-md transition-shadow group mb-12"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs uppercase tracking-[3px] text-sage-400 font-sans font-medium mb-2">
                  New Tool
                </p>
                <h2 className="font-serif text-2xl text-warmgray-heading mb-2">
                  CRE Mortgage Calculator Suite
                </h2>
                <p className="text-warmgray text-sm">
                  14 professional-grade calculators: Cap Rate, DSCR, IRR, Equity
                  Waterfall, Blended Rate, Cash-on-Cash Return, Construction Interest, Refinance Savings, and more.
                </p>
              </div>
              <ArrowRight
                size={24}
                className="text-sage-400 group-hover:translate-x-1 transition-transform flex-shrink-0 ml-4"
              />
            </div>
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <PaymentCalculator />
            <DSCRCalculator />
            <MaxLoanCalculator />
          </div>

          <div className="mt-16 text-center">
            <p className="text-warmgray text-sm mb-4">
              These calculators provide estimates for educational purposes only.
              Actual terms will vary based on property type, location, borrower
              experience, and market conditions.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-3 bg-sage-400 text-white font-sans text-sm uppercase tracking-[2px] font-medium hover:bg-sage-400/90 transition-all rounded-sm"
            >
              Get a Real Quote <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
