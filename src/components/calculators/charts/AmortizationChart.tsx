"use client";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { calculateMonthlyPayment } from "@/lib/calculators";

interface AmortizationChartProps {
  loanAmount: number;
  annualRate: number;
  amortYears: number;
  termYears: number;
}

export default function AmortizationChart({
  loanAmount,
  annualRate,
  amortYears,
  termYears,
}: AmortizationChartProps) {
  const monthlyRate = annualRate / 100 / 12;
  const monthly = calculateMonthlyPayment(loanAmount, annualRate, amortYears);

  // Build yearly data
  const data: { year: number; principal: number; interest: number; balance: number }[] = [];
  let balance = loanAmount;

  const yearsToShow = Math.min(amortYears, 40);
  for (let yr = 1; yr <= yearsToShow; yr++) {
    let yearPrincipal = 0;
    let yearInterest = 0;

    for (let m = 0; m < 12; m++) {
      if (balance <= 0) break;
      const interestPmt = balance * monthlyRate;
      const principalPmt = Math.min(monthly - interestPmt, balance);
      yearInterest += interestPmt;
      yearPrincipal += principalPmt;
      balance -= principalPmt;
    }

    data.push({
      year: yr,
      principal: Math.round(yearPrincipal),
      interest: Math.round(yearInterest),
      balance: Math.round(Math.max(0, balance)),
    });
  }

  const formatK = (v: number) => {
    if (v >= 1_000_000) return `$${(v / 1_000_000).toFixed(1)}M`;
    if (v >= 1_000) return `$${(v / 1_000).toFixed(0)}K`;
    return `$${v}`;
  };

  return (
    <div className="mt-6">
      <p className="text-xs uppercase tracking-[2px] text-warmgray-heading font-medium mb-3">
        Amortization Schedule
      </p>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 5, right: 5, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e5e5" />
            <XAxis
              dataKey="year"
              tick={{ fontSize: 11, fill: "#8a8a8a" }}
              tickLine={false}
            />
            <YAxis
              tickFormatter={formatK}
              tick={{ fontSize: 11, fill: "#8a8a8a" }}
              tickLine={false}
              axisLine={false}
            />
            <Tooltip
              formatter={(value, name) => [
                formatK(Number(value)),
                name === "principal" ? "Principal" : "Interest",
              ]}
              labelFormatter={(label) => `Year ${label}`}
              contentStyle={{
                fontSize: 12,
                borderRadius: 4,
                border: "1px solid #e5e5e5",
              }}
            />
            <Legend
              wrapperStyle={{ fontSize: 11 }}
              formatter={(value) =>
                value === "principal" ? "Principal" : "Interest"
              }
            />
            <Area
              type="monotone"
              dataKey="principal"
              stackId="1"
              stroke="#4a9b8e"
              fill="#4a9b8e"
              fillOpacity={0.6}
            />
            <Area
              type="monotone"
              dataKey="interest"
              stackId="1"
              stroke="#3d5a80"
              fill="#3d5a80"
              fillOpacity={0.4}
            />
            {/* Term maturity line */}
            {termYears < amortYears && (
              <CartesianGrid
                horizontalPoints={[]}
                verticalPoints={[termYears]}
                stroke="#ef4444"
                strokeDasharray="5 5"
              />
            )}
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
