"use client";

import { useState } from "react";
import NumberInput from "@/components/ui/NumberInput";
import CalculatorCard from "../CalculatorCard";
import { calculateEquityWaterfall } from "@/lib/calculators";
import type { WaterfallTier } from "@/lib/calculators";
import { formatCurrency } from "@/lib/utils";
import { Plus, Minus } from "lucide-react";
import WaterfallBarChart from "../charts/WaterfallBarChart";
import PdfExportButton from "../PdfExportButton";

export default function WaterfallCalculator() {
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
      actions={
        <PdfExportButton
          getOptions={() => ({
            title: "Equity Waterfall",
            inputs: [
              { label: "Total Distributable", value: formatCurrency(totalDist) },
              { label: "LP Equity", value: formatCurrency(lpEquity) },
              { label: "GP Equity", value: formatCurrency(gpEquity) },
            ],
            results: [
              { label: "Total to LP", value: formatCurrency(result.totalToLP) },
              { label: "Total to GP", value: formatCurrency(result.totalToGP) },
            ],
            details: result.tiers.map((t) => ({
              label: t.tierLabel,
              value: `LP: ${formatCurrency(t.lpAmount)} | GP: ${formatCurrency(t.gpAmount)}`,
            })),
            detailsTitle: "Tier Breakdown",
          })}
        />
      }
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

        {/* Stacked Bar Chart */}
        <WaterfallBarChart tiers={result.tiers} />

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
