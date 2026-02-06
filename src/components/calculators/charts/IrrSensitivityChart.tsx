"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts";
import { calculateIrrAndEquityMultiple } from "@/lib/calculators";

interface IrrSensitivityChartProps {
  investment: number;
  cashFlows: number[];
  baseExitProceeds: number;
}

export default function IrrSensitivityChart({
  investment,
  cashFlows,
  baseExitProceeds,
}: IrrSensitivityChartProps) {
  // Vary exit proceeds from 50% to 200% of base to show IRR sensitivity
  const data: { exit: string; irr: number; equityMultiple: number }[] = [];
  const steps = [0.5, 0.6, 0.7, 0.8, 0.9, 1.0, 1.1, 1.2, 1.3, 1.4, 1.5, 1.75, 2.0];

  for (const mult of steps) {
    const exitProceeds = baseExitProceeds * mult;
    const result = calculateIrrAndEquityMultiple(investment, cashFlows, exitProceeds);
    data.push({
      exit: `${(mult * 100).toFixed(0)}%`,
      irr: parseFloat((result.irr * 100).toFixed(2)),
      equityMultiple: parseFloat(result.equityMultiple.toFixed(2)),
    });
  }

  return (
    <div className="mt-6">
      <p className="text-xs uppercase tracking-[2px] text-warmgray-heading font-medium mb-1">
        IRR Sensitivity (Varying Exit Proceeds)
      </p>
      <p className="text-[11px] text-warmgray/60 mb-3">
        Shows how IRR changes as exit proceeds move from 50% to 200% of your base exit assumption.
      </p>
      <div className="h-56">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 5, right: 5, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e5e5" />
            <XAxis
              dataKey="exit"
              tick={{ fontSize: 10, fill: "#8a8a8a" }}
              tickLine={false}
              label={{
                value: "Exit Proceeds (% of Base)",
                position: "insideBottom",
                offset: -2,
                style: { fontSize: 10, fill: "#8a8a8a" },
              }}
            />
            <YAxis
              tickFormatter={(v) => `${v}%`}
              tick={{ fontSize: 11, fill: "#8a8a8a" }}
              tickLine={false}
              axisLine={false}
            />
            <Tooltip
              formatter={(value) => [`${value}%`, "IRR"]}
              contentStyle={{
                fontSize: 12,
                borderRadius: 4,
                border: "1px solid #e5e5e5",
              }}
            />
            <ReferenceLine
              x="100%"
              stroke="#8a8a8a"
              strokeDasharray="3 3"
              label={{ value: "Base", position: "top", style: { fontSize: 10, fill: "#8a8a8a" } }}
            />
            <Line
              type="monotone"
              dataKey="irr"
              stroke="#4a9b8e"
              strokeWidth={2}
              dot={{ fill: "#4a9b8e", r: 3 }}
              activeDot={{ r: 5 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
