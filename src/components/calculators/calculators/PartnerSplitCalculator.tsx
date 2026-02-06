"use client";

import { useState } from "react";
import NumberInput from "@/components/ui/NumberInput";
import CalculatorCard from "../CalculatorCard";
import { calculatePartnerEquitySplit } from "@/lib/calculators";
import type { Partner } from "@/lib/calculators";
import { formatCurrency } from "@/lib/utils";
import { Plus, Minus } from "lucide-react";
import PdfExportButton from "../PdfExportButton";

export default function PartnerSplitCalculator() {
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
      actions={
        <PdfExportButton
          getOptions={() => ({
            title: "Partner Equity Split",
            inputs: [
              { label: "Total Distribution", value: formatCurrency(totalDist) },
              ...partners.map((p) => ({ label: p.name, value: formatCurrency(p.contribution) })),
            ],
            results: result.partners.map((p) => ({
              label: `${p.name} (${(p.ownershipPct * 100).toFixed(1)}%)`,
              value: formatCurrency(p.distribution),
            })),
          })}
        />
      }
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
