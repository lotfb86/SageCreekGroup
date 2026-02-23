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
  ReferenceLine,
} from "recharts";
import { calculateMonthlyPayment } from "@/lib/calculators";

interface AmortizationChartProps {
  loanAmount: number;
  annualRate: number;
  amortYears: number;
  termYears: number;
  ioYears?: number;
}

export default function AmortizationChart({
  loanAmount,
  annualRate,
  amortYears,
  termYears,
  ioYears = 0,
}: AmortizationChartProps) {
  const monthlyRate = annualRate / 100 / 12;
  const amortMonthly = calculateMonthlyPayment(loanAmount, annualRate, amortYears);

  // Build yearly data (IO-aware)
  const data: { year: number; principal: number; interest: number; balance: number }[] = [];
  let balance = loanAmount;
  let currentMonth = 0;
  const ioMonths = ioYears * 12;

  const yearsToShow = Math.min(ioYears + amortYears, 40);
  for (let yr = 1; yr <= yearsToShow; yr++) {
    let yearPrincipal = 0;
    let yearInterest = 0;

    for (let m = 0; m < 12; m++) {
      currentMonth++;
      if (balance <= 0) break;

      if (currentMonth <= ioMonths) {
        // IO period: interest only, no principal reduction
        const interestPmt = balance * monthlyRate;
        yearInterest += interestPmt;
      } else {
        // Amortizing period
        const interestPmt = balance * monthlyRate;
        const principalPmt = Math.min(amortMonthly - interestPmt, balance);
        yearInterest += interestPmt;
        yearPrincipal += principalPmt;
        balance -= principalPmt;
      }
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
            {/* IO boundary line */}
            {ioYears > 0 && (
              <ReferenceLine
                x={ioYears}
                stroke="#f59e0b"
                strokeDasharray="5 5"
                label={{
                  value: "IO Ends",
                  position: "top",
                  style: { fontSize: 10, fill: "#f59e0b" },
                }}
              />
            )}
            {/* Term maturity line */}
            {termYears < (ioYears + amortYears) && (
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
