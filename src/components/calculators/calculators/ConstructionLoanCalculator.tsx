"use client";

import { useState } from "react";
import NumberInput from "@/components/ui/NumberInput";
import SliderInput from "../SliderInput";
import CalculatorCard from "../CalculatorCard";
import ResultBox from "../ResultBox";
import { calculateConstructionInterestReserve } from "@/lib/calculators";
import { formatCurrency } from "@/lib/utils";
import { CRE_TOOLTIPS } from "@/lib/calculator-tooltips";
import { useMarketRates } from "@/hooks/useMarketRates";
import PdfExportButton from "../PdfExportButton";

export default function ConstructionLoanCalculator() {
  const [totalBudget, setTotalBudget] = useState(15000000);
  const [drawPeriod, setDrawPeriod] = useState(18);
  const [leaseUp, setLeaseUp] = useState(6);
  const [rate, setRate] = useState(8.0);
  const [cashFlowOffset, setCashFlowOffset] = useState(0);

  const { benchmarks } = useMarketRates();

  const result = calculateConstructionInterestReserve(
    totalBudget,
    drawPeriod,
    leaseUp,
    rate,
    cashFlowOffset
  );

  return (
    <CalculatorCard
      title="Construction Loan Interest Reserve"
      description="Model the interest carry during construction and lease-up. Funds are drawn monthly over the construction period, then the full balance accrues interest during lease-up until permanent financing."
      actions={
        <PdfExportButton
          getOptions={() => ({
            title: "Construction Loan Interest Reserve",
            inputs: [
              { label: "Total Construction Budget", value: formatCurrency(totalBudget) },
              { label: "Draw Period", value: `${drawPeriod} months` },
              { label: "Lease-Up Period", value: `${leaseUp} months` },
              { label: "Interest Rate", value: `${rate}%` },
              { label: "Lease-Up Cash Flow Offset", value: `${cashFlowOffset}%` },
            ],
            results: [
              { label: "Total Interest Reserve", value: formatCurrency(result.totalReserve) },
              { label: "Avg. Outstanding Balance", value: formatCurrency(result.avgOutstandingBalance) },
              { label: "Reserve as % of Budget", value: totalBudget > 0 ? `${((result.totalReserve / totalBudget) * 100).toFixed(1)}%` : "0%" },
            ],
          })}
        />
      }
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <NumberInput
            label="Total Construction Budget"
            value={totalBudget}
            onChange={setTotalBudget}
            prefix="$"
            step={500000}
          />
          <NumberInput
            label="Draw Period (Months)"
            value={drawPeriod}
            onChange={(v) => setDrawPeriod(Math.max(1, Math.min(36, v)))}
            min={1}
          />
          <NumberInput
            label="Lease-Up Period (Months)"
            value={leaseUp}
            onChange={(v) => setLeaseUp(Math.max(0, Math.min(24, v)))}
            min={0}
          />
          <SliderInput
            label="Interest Rate"
            value={rate}
            onChange={setRate}
            min={4}
            max={15}
            step={0.25}
            suffix="%"
            tooltip={CRE_TOOLTIPS.interestReserve}
            marketHint={`Current Prime Rate: ${benchmarks.primeRate.toFixed(2)}%`}
          />
          <SliderInput
            label="Lease-Up Cash Flow Offset"
            value={cashFlowOffset}
            onChange={setCashFlowOffset}
            min={0}
            max={100}
            step={5}
            suffix="%"
            tooltip="Estimated percentage of monthly interest covered by property cash flow during lease-up. 0% = no income (full reserve needed). 50% = property covers half the interest. Adjust based on pre-leasing or expected occupancy ramp."
          />
        </div>
        <div className="space-y-4">
          <ResultBox
            label="Total Interest Reserve"
            value={formatCurrency(result.totalReserve)}
          />
          <div className="bg-warmgray/5 rounded-sm p-4 space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-warmgray">Total Project Period</span>
              <span className="text-warmgray-heading font-medium">
                {drawPeriod + leaseUp} months
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-warmgray">Monthly Draw</span>
              <span className="text-warmgray-heading font-medium">
                {formatCurrency(drawPeriod > 0 ? totalBudget / drawPeriod : 0)}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-warmgray">Avg. Outstanding Balance</span>
              <span className="text-warmgray-heading font-medium">
                {formatCurrency(result.avgOutstandingBalance)}
              </span>
            </div>
            <div className="flex justify-between text-sm border-t border-warmgray/10 pt-2">
              <span className="text-warmgray">Reserve as % of Budget</span>
              <span className="text-warmgray-heading font-medium">
                {totalBudget > 0
                  ? ((result.totalReserve / totalBudget) * 100).toFixed(1)
                  : 0}
                %
              </span>
            </div>
          </div>

          {/* Monthly breakdown (first/last 3) */}
          {result.monthlyBreakdown.length > 0 && (
            <div className="bg-warmgray/5 rounded-sm p-4">
              <p className="text-xs uppercase tracking-[2px] text-warmgray-heading font-medium mb-3">
                Monthly Interest
              </p>
              <div className="space-y-1 text-xs">
                {result.monthlyBreakdown.slice(0, 3).map((m) => (
                  <div key={m.month} className="flex justify-between">
                    <span className="text-warmgray">
                      Month {m.month}{" "}
                      {m.month <= drawPeriod ? "(Draw)" : cashFlowOffset > 0 ? `(Lease-Up, ${cashFlowOffset}% offset)` : "(Lease-Up)"}
                    </span>
                    <span className="text-warmgray-heading font-medium">
                      {formatCurrency(m.interestPayment)}
                    </span>
                  </div>
                ))}
                {result.monthlyBreakdown.length > 6 && (
                  <p className="text-warmgray/50 text-center py-1">···</p>
                )}
                {result.monthlyBreakdown.length > 3 &&
                  result.monthlyBreakdown.slice(-3).map((m) => (
                    <div key={m.month} className="flex justify-between">
                      <span className="text-warmgray">
                        Month {m.month}{" "}
                        {m.month <= drawPeriod ? "(Draw)" : cashFlowOffset > 0 ? `(Lease-Up, ${cashFlowOffset}% offset)` : "(Lease-Up)"}
                      </span>
                      <span className="text-warmgray-heading font-medium">
                        {formatCurrency(m.interestPayment)}
                      </span>
                    </div>
                  ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </CalculatorCard>
  );
}
