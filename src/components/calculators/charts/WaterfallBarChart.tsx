"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import type { WaterfallTierResult } from "@/lib/calculators";

interface WaterfallBarChartProps {
  tiers: WaterfallTierResult[];
}

export default function WaterfallBarChart({ tiers }: WaterfallBarChartProps) {
  const data = tiers.map((t) => ({
    name: t.tierLabel.length > 18 ? t.tierLabel.slice(0, 18) + "…" : t.tierLabel,
    LP: Math.round(t.lpAmount),
    GP: Math.round(t.gpAmount),
  }));

  const formatK = (v: number) => {
    if (v >= 1_000_000) return `$${(v / 1_000_000).toFixed(1)}M`;
    if (v >= 1_000) return `$${(v / 1_000).toFixed(0)}K`;
    return `$${v}`;
  };

  return (
    <div className="mt-6">
      <p className="text-xs uppercase tracking-[2px] text-warmgray-heading font-medium mb-3">
        Distribution by Tier
      </p>
      <div className="h-56">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 5, right: 5, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e5e5" />
            <XAxis
              dataKey="name"
              tick={{ fontSize: 10, fill: "#8a8a8a" }}
              tickLine={false}
            />
            <YAxis
              tickFormatter={formatK}
              tick={{ fontSize: 11, fill: "#8a8a8a" }}
              tickLine={false}
              axisLine={false}
            />
            <Tooltip
              formatter={(value, name) => [formatK(Number(value)), name]}
              contentStyle={{
                fontSize: 12,
                borderRadius: 4,
                border: "1px solid #e5e5e5",
              }}
            />
            <Legend wrapperStyle={{ fontSize: 11 }} />
            <Bar dataKey="LP" stackId="a" fill="#4a9b8e" radius={[0, 0, 0, 0]} />
            <Bar dataKey="GP" stackId="a" fill="#3d5a80" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
