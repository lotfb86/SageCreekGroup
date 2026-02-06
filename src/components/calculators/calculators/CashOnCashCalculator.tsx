"use client";

import { useState } from "react";
import NumberInput from "@/components/ui/NumberInput";
import CalculatorCard from "../CalculatorCard";
import { calculateCashOnCash } from "@/lib/calculators";
import { cn, formatCurrency } from "@/lib/utils";
import { CRE_TOOLTIPS } from "@/lib/calculator-tooltips";
import { useMarketRates } from "@/hooks/useMarketRates";
import PdfExportButton from "../PdfExportButton";

export default function CashOnCashCalculator() {
  const [cashFlow, setCashFlow] = useState(80000);
  const [cashInvested, setCashInvested] = useState(1000000);

  const { benchmarks } = useMarketRates();
  const coc = calculateCashOnCash(cashFlow, cashInvested);

  return (
    <CalculatorCard
      title="Cash-on-Cash Return"
      description="Measures the first-year return on actual cash invested. This is the simplest return metric and answers: 'What percentage of my cash investment comes back each year?'"
      actions={
        <PdfExportButton
          getOptions={() => ({
            title: "Cash-on-Cash Return",
            inputs: [
              { label: "Annual Pre-Tax Cash Flow", value: formatCurrency(cashFlow) },
              { label: "Total Cash Invested", value: formatCurrency(cashInvested) },
            ],
            results: [
              { label: "Cash-on-Cash Return", value: `${(coc * 100).toFixed(2)}%` },
            ],
          })}
        />
      }
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <NumberInput
            label="Annual Pre-Tax Cash Flow"
            value={cashFlow}
            onChange={setCashFlow}
            prefix="$"
            step={5000}
            tooltip={CRE_TOOLTIPS.cashOnCash}
          />
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
          <p className="text-[11px] text-warmgray/60 mt-3 text-center">
            Benchmark: 10-Yr Treasury yield is currently {benchmarks.treasury10Yr.toFixed(2)}%
          </p>
        </div>
      </div>
    </CalculatorCard>
  );
}
