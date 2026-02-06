"use client";

import { useState } from "react";
import {
  Percent,
  BarChart3,
  Layers,
  DollarSign,
  TrendingUp,
  GitBranch,
  Users,
  Building,
  CreditCard,
  ArrowRight,
  Plus,
  Minus,
  Calculator,
} from "lucide-react";
import Link from "next/link";
import NumberInput from "@/components/ui/NumberInput";
import { formatCurrency, cn } from "@/lib/utils";
import {
  calculateMonthlyPayment,
  calculateDSCR,
  calculateMaxLoanAmount,
  calculateCapRate,
  calculatePropertyValueFromCapRate,
  calculateBlendedRate,
  calculateCashOnCash,
  calculateIrrAndEquityMultiple,
  calculateEquityWaterfall,
  calculatePartnerEquitySplit,
  calculateBalloonBalance,
} from "@/lib/calculators";
import type {
  LoanTranche,
  WaterfallTier,
  Partner,
} from "@/lib/calculators";

// Calculator navigation config
const CALCULATORS = [
  { id: "cap-rate", label: "Cap Rate", shortLabel: "Cap Rate", icon: Percent },
  { id: "dscr", label: "DSCR Calculator", shortLabel: "DSCR", icon: BarChart3 },
  { id: "blended-rate", label: "Blended Rate", shortLabel: "Blended", icon: Layers },
  { id: "cash-on-cash", label: "Cash-on-Cash", shortLabel: "Cash/Cash", icon: DollarSign },
  { id: "irr", label: "IRR & Equity Multiple", shortLabel: "IRR", icon: TrendingUp },
  { id: "waterfall", label: "Equity Waterfall", shortLabel: "Waterfall", icon: GitBranch },
  { id: "partner-split", label: "Partner Split", shortLabel: "Partners", icon: Users },
  { id: "max-loan", label: "Max Loan from DSCR", shortLabel: "Max Loan", icon: Building },
  { id: "property-value", label: "Property Valuation", shortLabel: "Valuation", icon: Calculator },
  { id: "loan-payment", label: "Loan Payment", shortLabel: "Payment", icon: CreditCard },
] as const;

// ===== CALCULATOR COMPONENTS =====

function CapRateCalculator() {
  const [noi, setNoi] = useState(500000);
  const [propertyValue, setPropertyValue] = useState(7500000);

  const capRate = calculateCapRate(noi, propertyValue);

  return (
    <CalculatorCard
      title="Cap Rate Calculator"
      description="Calculate the capitalization rate for a property based on its Net Operating Income and value. Cap rate is one of the most fundamental metrics in CRE investing."
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <NumberInput label="Net Operating Income (NOI)" value={noi} onChange={setNoi} prefix="$" step={10000} />
          <NumberInput label="Property Value" value={propertyValue} onChange={setPropertyValue} prefix="$" step={100000} />
        </div>
        <div>
          <ResultBox label="Cap Rate" value={`${(capRate * 100).toFixed(2)}%`} />
          <p className="text-warmgray text-xs mt-3 text-center">
            A property generating {formatCurrency(noi)} NOI at a {(capRate * 100).toFixed(2)}% cap rate
            is valued at {formatCurrency(propertyValue)}.
          </p>
        </div>
      </div>
    </CalculatorCard>
  );
}

function EnhancedDSCRCalculator() {
  const [noi, setNoi] = useState(750000);
  const [loanAmount, setLoanAmount] = useState(10000000);
  const [rate, setRate] = useState(5.5);
  const [amort, setAmort] = useState(30);

  const monthlyPayment = calculateMonthlyPayment(loanAmount, rate, amort);
  const annualDebtService = monthlyPayment * 12;
  const dscr = calculateDSCR(noi, annualDebtService);

  return (
    <CalculatorCard
      title="DSCR Calculator"
      description="Debt Service Coverage Ratio measures a property's ability to cover its debt obligations. Most lenders require a minimum DSCR of 1.25x."
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <NumberInput label="Net Operating Income (NOI)" value={noi} onChange={setNoi} prefix="$" step={10000} />
          <NumberInput label="Loan Amount" value={loanAmount} onChange={setLoanAmount} prefix="$" step={100000} />
          <NumberInput label="Interest Rate" value={rate} onChange={setRate} suffix="%" step={0.125} />
          <NumberInput label="Amortization (Years)" value={amort} onChange={setAmort} min={1} />
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

function BlendedRateCalculator() {
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

function CashOnCashCalculator() {
  const [cashFlow, setCashFlow] = useState(80000);
  const [cashInvested, setCashInvested] = useState(1000000);

  const coc = calculateCashOnCash(cashFlow, cashInvested);

  return (
    <CalculatorCard
      title="Cash-on-Cash Return"
      description="Measures the first-year return on actual cash invested. This is the simplest return metric and answers: 'What percentage of my cash investment comes back each year?'"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <NumberInput label="Annual Pre-Tax Cash Flow" value={cashFlow} onChange={setCashFlow} prefix="$" step={5000} />
          <NumberInput label="Total Cash Invested" value={cashInvested} onChange={setCashInvested} prefix="$" step={50000} />
        </div>
        <div>
          <div className={cn(
            "rounded-sm p-6 text-center",
            coc >= 0.08 ? "bg-sage-400/10" : coc >= 0.05 ? "bg-yellow-50" : "bg-red-50"
          )}>
            <p className="text-warmgray text-xs uppercase tracking-[2px] mb-1">Cash-on-Cash Return</p>
            <p className={cn(
              "font-serif text-3xl",
              coc >= 0.08 ? "text-sage-400" : coc >= 0.05 ? "text-yellow-600" : "text-red-600"
            )}>
              {(coc * 100).toFixed(2)}%
            </p>
            <p className="text-warmgray/60 text-xs mt-2">
              {coc >= 0.08 ? "Strong cash yield" : coc >= 0.05 ? "Moderate — typical for stabilized assets" : "Below typical thresholds"}
            </p>
          </div>
        </div>
      </div>
    </CalculatorCard>
  );
}

function IrrCalculator() {
  const [investment, setInvestment] = useState(1000000);
  const [holdPeriod, setHoldPeriod] = useState(5);
  const [cashFlows, setCashFlows] = useState<number[]>([80000, 82000, 84000, 86000, 88000]);
  const [exitProceeds, setExitProceeds] = useState(1500000);

  // Resize cash flows when hold period changes
  const handleHoldPeriodChange = (newPeriod: number) => {
    const clamped = Math.max(1, Math.min(10, newPeriod));
    setHoldPeriod(clamped);
    const newFlows = [...cashFlows];
    while (newFlows.length < clamped) newFlows.push(80000);
    setCashFlows(newFlows.slice(0, clamped));
  };

  const updateCashFlow = (index: number, value: number) => {
    const updated = [...cashFlows];
    updated[index] = value;
    setCashFlows(updated);
  };

  const result = calculateIrrAndEquityMultiple(investment, cashFlows, exitProceeds);

  return (
    <CalculatorCard
      title="IRR & Equity Multiple"
      description="Internal Rate of Return is the annualized return accounting for the timing of all cash flows. Equity Multiple shows total return as a multiple of invested capital."
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <NumberInput label="Initial Investment" value={investment} onChange={setInvestment} prefix="$" step={50000} />
          <NumberInput label="Hold Period (Years)" value={holdPeriod} onChange={handleHoldPeriodChange} min={1} />
          <div className="border border-warmgray/10 rounded-sm p-4 space-y-3">
            <p className="text-xs uppercase tracking-[2px] text-warmgray-heading font-medium">Annual Cash Flows</p>
            {cashFlows.map((cf, i) => (
              <NumberInput key={i} label={`Year ${i + 1}`} value={cf} onChange={(v) => updateCashFlow(i, v)} prefix="$" step={5000} />
            ))}
          </div>
          <NumberInput label="Exit Proceeds (Sale/Refi)" value={exitProceeds} onChange={setExitProceeds} prefix="$" step={50000} />
        </div>
        <div className="space-y-4">
          <ResultBox label="Internal Rate of Return" value={result.irr !== 0 ? `${(result.irr * 100).toFixed(2)}%` : "N/A"} />
          <ResultBox label="Equity Multiple" value={`${result.equityMultiple.toFixed(2)}x`} />
          <div className="bg-warmgray/5 rounded-sm p-4 space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-warmgray">Total Cash Flows</span>
              <span className="text-warmgray-heading font-medium">
                {formatCurrency(cashFlows.reduce((s, c) => s + c, 0))}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-warmgray">Exit Proceeds</span>
              <span className="text-warmgray-heading font-medium">{formatCurrency(exitProceeds)}</span>
            </div>
            <div className="flex justify-between text-sm border-t border-warmgray/10 pt-2">
              <span className="text-warmgray">Total Return</span>
              <span className="text-warmgray-heading font-medium">
                {formatCurrency(cashFlows.reduce((s, c) => s + c, 0) + exitProceeds)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </CalculatorCard>
  );
}

function EquityWaterfallCalculator() {
  const [totalDist, setTotalDist] = useState(2000000);
  const [lpEquity, setLpEquity] = useState(900000);
  const [gpEquity, setGpEquity] = useState(100000);
  const [tiers, setTiers] = useState<WaterfallTier[]>([
    { label: "8% Preferred Return", hurdleRate: 0.08, lpSplit: 0.80, gpSplit: 0.20 },
    { label: "12% IRR Hurdle", hurdleRate: 0.12, lpSplit: 0.70, gpSplit: 0.30 },
  ]);

  const updateTier = (index: number, field: keyof WaterfallTier, value: string | number) => {
    const updated = [...tiers];
    updated[index] = { ...updated[index], [field]: value };
    setTiers(updated);
  };

  const result = calculateEquityWaterfall(totalDist, lpEquity, gpEquity, tiers);

  return (
    <CalculatorCard
      title="Equity Waterfall"
      description="Model the distribution of profits between General Partners (GP) and Limited Partners (LP) through multiple tiers with hurdle rates and promote structures."
    >
      <div className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <NumberInput label="Total Distributable" value={totalDist} onChange={setTotalDist} prefix="$" step={100000} />
          <NumberInput label="LP Equity" value={lpEquity} onChange={setLpEquity} prefix="$" step={50000} />
          <NumberInput label="GP Equity" value={gpEquity} onChange={setGpEquity} prefix="$" step={10000} />
        </div>

        <div className="border border-warmgray/10 rounded-sm p-4 space-y-4">
          <p className="text-xs uppercase tracking-[2px] text-warmgray-heading font-medium">Distribution Tiers</p>
          {tiers.map((tier, i) => (
            <div key={i} className="grid grid-cols-1 sm:grid-cols-4 gap-3 items-end">
              <div>
                <label className="block text-xs text-warmgray mb-1">Tier Label</label>
                <input
                  type="text"
                  value={tier.label}
                  onChange={(e) => updateTier(i, "label", e.target.value)}
                  className="w-full py-2 px-3 border border-warmgray/20 rounded-sm text-sm text-warmgray-heading focus:outline-none focus:border-sage-400 bg-white"
                />
              </div>
              <NumberInput label="Hurdle Rate" value={tier.hurdleRate * 100} onChange={(v) => updateTier(i, "hurdleRate", v / 100)} suffix="%" step={1} />
              <NumberInput label="LP Split" value={tier.lpSplit * 100} onChange={(v) => { updateTier(i, "lpSplit", v / 100); updateTier(i, "gpSplit", 1 - v / 100); }} suffix="%" step={5} />
              {tiers.length > 1 && (
                <button
                  onClick={() => setTiers(tiers.filter((_, idx) => idx !== i))}
                  className="p-2 text-warmgray/40 hover:text-red-500 transition-colors self-end mb-1"
                >
                  <Minus size={16} />
                </button>
              )}
            </div>
          ))}
          {tiers.length < 4 && (
            <button
              onClick={() => setTiers([...tiers, { label: `Tier ${tiers.length + 1}`, hurdleRate: 0.15, lpSplit: 0.60, gpSplit: 0.40 }])}
              className="flex items-center gap-2 text-sage-400 text-sm font-medium hover:text-sage-400/80 transition-colors"
            >
              <Plus size={16} /> Add Tier
            </button>
          )}
        </div>

        {/* Results Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-warmgray/20">
                <th className="text-left py-3 text-xs uppercase tracking-[2px] text-warmgray-heading font-medium">Tier</th>
                <th className="text-right py-3 text-xs uppercase tracking-[2px] text-warmgray-heading font-medium">LP</th>
                <th className="text-right py-3 text-xs uppercase tracking-[2px] text-warmgray-heading font-medium">GP</th>
              </tr>
            </thead>
            <tbody>
              {result.tiers.map((tier, i) => (
                <tr key={i} className="border-b border-warmgray/10">
                  <td className="py-2 text-warmgray">{tier.tierLabel}</td>
                  <td className="py-2 text-right text-warmgray-heading font-medium">{formatCurrency(tier.lpAmount)}</td>
                  <td className="py-2 text-right text-warmgray-heading font-medium">{formatCurrency(tier.gpAmount)}</td>
                </tr>
              ))}
              <tr className="border-t-2 border-warmgray/30 font-medium">
                <td className="py-3 text-warmgray-heading">Total</td>
                <td className="py-3 text-right text-sage-400">{formatCurrency(result.totalToLP)}</td>
                <td className="py-3 text-right text-sage-400">{formatCurrency(result.totalToGP)}</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Visual Split Bar */}
        <div>
          <div className="flex h-4 rounded-sm overflow-hidden">
            <div
              className="bg-sage-400 transition-all"
              style={{ width: `${totalDist > 0 ? (result.totalToLP / totalDist) * 100 : 50}%` }}
            />
            <div className="bg-navy-800 flex-1" />
          </div>
          <div className="flex justify-between text-xs mt-1">
            <span className="text-sage-400 font-medium">
              LP: {totalDist > 0 ? ((result.totalToLP / totalDist) * 100).toFixed(1) : 0}%
            </span>
            <span className="text-navy-800 font-medium">
              GP: {totalDist > 0 ? ((result.totalToGP / totalDist) * 100).toFixed(1) : 0}%
            </span>
          </div>
        </div>
      </div>
    </CalculatorCard>
  );
}

function PartnerSplitCalculator() {
  const [partners, setPartners] = useState<Partner[]>([
    { name: "Partner A", contribution: 600000 },
    { name: "Partner B", contribution: 400000 },
  ]);
  const [totalDist, setTotalDist] = useState(500000);

  const updatePartner = (index: number, field: keyof Partner, value: string | number) => {
    const updated = [...partners];
    updated[index] = { ...updated[index], [field]: value };
    setPartners(updated);
  };

  const result = calculatePartnerEquitySplit(partners, totalDist);

  return (
    <CalculatorCard
      title="Partner Equity Split"
      description="Calculate pro-rata distributions among multiple partners based on their capital contributions. Add up to 6 partners."
    >
      <div className="space-y-6">
        <NumberInput label="Total Distribution Amount" value={totalDist} onChange={setTotalDist} prefix="$" step={10000} />

        <div className="border border-warmgray/10 rounded-sm p-4 space-y-4">
          <p className="text-xs uppercase tracking-[2px] text-warmgray-heading font-medium">Partners</p>
          {partners.map((p, i) => (
            <div key={i} className="flex items-end gap-4">
              <div className="flex-1">
                <label className="block text-xs text-warmgray mb-1">Name</label>
                <input
                  type="text"
                  value={p.name}
                  onChange={(e) => updatePartner(i, "name", e.target.value)}
                  className="w-full py-2 px-3 border border-warmgray/20 rounded-sm text-sm text-warmgray-heading focus:outline-none focus:border-sage-400 bg-white"
                />
              </div>
              <div className="flex-1">
                <NumberInput label="Contribution" value={p.contribution} onChange={(v) => updatePartner(i, "contribution", v)} prefix="$" step={10000} />
              </div>
              {partners.length > 2 && (
                <button
                  onClick={() => setPartners(partners.filter((_, idx) => idx !== i))}
                  className="mb-1 p-2 text-warmgray/40 hover:text-red-500 transition-colors"
                >
                  <Minus size={16} />
                </button>
              )}
            </div>
          ))}
          {partners.length < 6 && (
            <button
              onClick={() => setPartners([...partners, { name: `Partner ${String.fromCharCode(65 + partners.length)}`, contribution: 0 }])}
              className="flex items-center gap-2 text-sage-400 text-sm font-medium hover:text-sage-400/80 transition-colors"
            >
              <Plus size={16} /> Add Partner
            </button>
          )}
        </div>

        {/* Results Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-warmgray/20">
                <th className="text-left py-3 text-xs uppercase tracking-[2px] text-warmgray-heading font-medium">Partner</th>
                <th className="text-right py-3 text-xs uppercase tracking-[2px] text-warmgray-heading font-medium">Contribution</th>
                <th className="text-right py-3 text-xs uppercase tracking-[2px] text-warmgray-heading font-medium">Ownership</th>
                <th className="text-right py-3 text-xs uppercase tracking-[2px] text-warmgray-heading font-medium">Distribution</th>
              </tr>
            </thead>
            <tbody>
              {result.partners.map((p, i) => (
                <tr key={i} className="border-b border-warmgray/10">
                  <td className="py-2 text-warmgray-heading">{p.name}</td>
                  <td className="py-2 text-right text-warmgray">{formatCurrency(p.contribution)}</td>
                  <td className="py-2 text-right text-warmgray">{(p.ownershipPct * 100).toFixed(1)}%</td>
                  <td className="py-2 text-right text-warmgray-heading font-medium">{formatCurrency(p.distribution)}</td>
                </tr>
              ))}
              <tr className="border-t-2 border-warmgray/30 font-medium">
                <td className="py-3 text-warmgray-heading">Total</td>
                <td className="py-3 text-right text-warmgray">{formatCurrency(result.totalContributed)}</td>
                <td className="py-3 text-right text-warmgray">100%</td>
                <td className="py-3 text-right text-sage-400">{formatCurrency(result.totalDistributed)}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </CalculatorCard>
  );
}

function MaxLoanDSCRCalculator() {
  const [noi, setNoi] = useState(750000);
  const [rate, setRate] = useState(5.5);
  const [amort, setAmort] = useState(30);
  const [targetDSCR, setTargetDSCR] = useState(1.25);

  const maxLoan = calculateMaxLoanAmount(noi, rate, amort, targetDSCR);
  const monthlyPayment = calculateMonthlyPayment(maxLoan, rate, amort);

  return (
    <CalculatorCard
      title="Max Loan from DSCR"
      description="Reverse-calculate the maximum loan amount a property can support based on its NOI and a lender's required DSCR. Essential for understanding borrowing capacity."
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <NumberInput label="Net Operating Income (NOI)" value={noi} onChange={setNoi} prefix="$" step={10000} />
          <NumberInput label="Interest Rate" value={rate} onChange={setRate} suffix="%" step={0.125} />
          <NumberInput label="Amortization (Years)" value={amort} onChange={setAmort} min={1} />
          <NumberInput label="Target DSCR" value={targetDSCR} onChange={setTargetDSCR} step={0.05} min={1} />
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

function PropertyValuationCalculator() {
  const [noi, setNoi] = useState(500000);
  const [capRate, setCapRate] = useState(6.5);

  const propertyValue = calculatePropertyValueFromCapRate(noi, capRate / 100);

  return (
    <CalculatorCard
      title="Property Valuation"
      description="Determine a property's estimated value based on its Net Operating Income and the market cap rate. This is the inverse of the cap rate calculation."
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <NumberInput label="Net Operating Income (NOI)" value={noi} onChange={setNoi} prefix="$" step={10000} />
          <NumberInput label="Market Cap Rate" value={capRate} onChange={setCapRate} suffix="%" step={0.25} />
        </div>
        <div>
          <ResultBox label="Estimated Property Value" value={formatCurrency(propertyValue)} />
          <p className="text-warmgray text-xs mt-3 text-center">
            Price per dollar of NOI: {noi > 0 ? `${(propertyValue / noi).toFixed(1)}x` : "—"}
          </p>
        </div>
      </div>
    </CalculatorCard>
  );
}

function EnhancedLoanPaymentCalculator() {
  const [loanAmount, setLoanAmount] = useState(10000000);
  const [rate, setRate] = useState(5.5);
  const [amort, setAmort] = useState(30);
  const [term, setTerm] = useState(10);

  const monthly = calculateMonthlyPayment(loanAmount, rate, amort);
  const annual = monthly * 12;
  const totalInterest = monthly * amort * 12 - loanAmount;
  const balloon = calculateBalloonBalance(loanAmount, rate, amort, term);

  return (
    <CalculatorCard
      title="Loan Payment Calculator"
      description="Calculate monthly payments, total interest, and balloon balance at maturity. Set the loan term shorter than the amortization period to see the balloon payment due at maturity."
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <NumberInput label="Loan Amount" value={loanAmount} onChange={setLoanAmount} prefix="$" step={100000} />
          <NumberInput label="Interest Rate" value={rate} onChange={setRate} suffix="%" step={0.125} />
          <NumberInput label="Amortization (Years)" value={amort} onChange={setAmort} min={1} />
          <NumberInput label="Loan Term (Years)" value={term} onChange={setTerm} min={1} />
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
        </div>
      </div>
    </CalculatorCard>
  );
}

// ===== SHARED UI COMPONENTS =====

function CalculatorCard({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-white rounded-sm p-8 shadow-sm">
      <div className="flex items-center gap-3 mb-2">
        <Calculator size={24} className="text-sage-400" />
        <h2 className="font-serif text-2xl text-warmgray-heading">{title}</h2>
      </div>
      <p className="text-warmgray text-sm mb-8 leading-relaxed max-w-2xl">
        {description}
      </p>
      {children}
    </div>
  );
}

function ResultBox({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-navy-800 rounded-sm p-6 text-center">
      <p className="text-white/60 text-xs uppercase tracking-[2px] mb-1">{label}</p>
      <p className="font-serif text-3xl text-white">{value}</p>
    </div>
  );
}

// ===== MAIN PAGE =====

export default function MortgageCalculatorPage() {
  const [activeCalculator, setActiveCalculator] = useState("cap-rate");

  return (
    <>
      {/* Hero */}
      <section className="bg-navy-800 py-20 px-6">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs uppercase tracking-[3px] text-sage-400 font-sans font-medium mb-4">
            CRE Analysis Suite
          </p>
          <h1 className="font-serif text-4xl sm:text-5xl text-white leading-tight">
            Mortgage Calculator
          </h1>
          <p className="mt-4 text-white/60 text-lg">
            Professional-grade calculators for cap rates, DSCR, IRR, equity
            waterfalls, and more — everything you need to underwrite a deal.
          </p>
        </div>
      </section>

      {/* Calculator Suite */}
      <section className="bg-cream py-16 px-6">
        <div className="mx-auto max-w-7xl">
          {/* Mobile: horizontal scroll tab bar */}
          <div className="lg:hidden mb-8 -mx-6 px-6">
            <div className="flex gap-2 overflow-x-auto pb-2" style={{ scrollbarWidth: "none", msOverflowStyle: "none", WebkitOverflowScrolling: "touch" }}>
              {CALCULATORS.map((calc) => (
                <button
                  key={calc.id}
                  onClick={() => setActiveCalculator(calc.id)}
                  className={cn(
                    "flex-shrink-0 px-4 py-2 text-xs uppercase tracking-[1.5px] font-medium rounded-sm whitespace-nowrap transition-colors",
                    activeCalculator === calc.id
                      ? "bg-navy-800 text-white"
                      : "bg-white text-warmgray-heading hover:bg-warmgray/5"
                  )}
                >
                  {calc.shortLabel}
                </button>
              ))}
            </div>
          </div>

          <div className="flex gap-8">
            {/* Desktop sidebar */}
            <nav className="hidden lg:block w-[280px] flex-shrink-0">
              <div className="sticky top-28">
                <p className="text-xs uppercase tracking-[2px] text-warmgray-heading font-medium mb-4">
                  Calculators
                </p>
                <div className="space-y-1">
                  {CALCULATORS.map((calc) => {
                    const Icon = calc.icon;
                    return (
                      <button
                        key={calc.id}
                        onClick={() => setActiveCalculator(calc.id)}
                        className={cn(
                          "w-full text-left px-4 py-3 text-sm rounded-sm transition-colors flex items-center gap-3",
                          activeCalculator === calc.id
                            ? "bg-white shadow-sm text-warmgray-heading font-medium"
                            : "text-warmgray hover:text-warmgray-heading hover:bg-white/50"
                        )}
                      >
                        <Icon
                          size={18}
                          className={
                            activeCalculator === calc.id
                              ? "text-sage-400"
                              : "text-warmgray/40"
                          }
                        />
                        {calc.label}
                      </button>
                    );
                  })}
                </div>
              </div>
            </nav>

            {/* Calculator content */}
            <div className="flex-1 min-w-0">
              {activeCalculator === "cap-rate" && <CapRateCalculator />}
              {activeCalculator === "dscr" && <EnhancedDSCRCalculator />}
              {activeCalculator === "blended-rate" && <BlendedRateCalculator />}
              {activeCalculator === "cash-on-cash" && <CashOnCashCalculator />}
              {activeCalculator === "irr" && <IrrCalculator />}
              {activeCalculator === "waterfall" && <EquityWaterfallCalculator />}
              {activeCalculator === "partner-split" && <PartnerSplitCalculator />}
              {activeCalculator === "max-loan" && <MaxLoanDSCRCalculator />}
              {activeCalculator === "property-value" && <PropertyValuationCalculator />}
              {activeCalculator === "loan-payment" && <EnhancedLoanPaymentCalculator />}
            </div>
          </div>

          {/* CTA */}
          <div className="mt-16 text-center">
            <p className="text-warmgray text-sm mb-4">
              These calculators provide estimates for educational purposes only.
              Actual terms vary based on property type, location, borrower
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
