"use client";

import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";

interface PaymentDonutProps {
  principal: number;
  interest: number;
}

const COLORS = ["#4a9b8e", "#3d5a80"];

export default function PaymentDonut({ principal, interest }: PaymentDonutProps) {
  const data = [
    { name: "Principal", value: Math.round(principal) },
    { name: "Interest", value: Math.round(interest) },
  ];

  const total = principal + interest;

  const formatK = (v: number) => {
    if (v >= 1_000_000) return `$${(v / 1_000_000).toFixed(1)}M`;
    if (v >= 1_000) return `$${(v / 1_000).toFixed(0)}K`;
    return `$${v}`;
  };

  return (
    <div className="mt-4">
      <p className="text-xs uppercase tracking-[2px] text-warmgray-heading font-medium mb-3">
        Payment Breakdown (Full Amort)
      </p>
      <div className="h-48">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={50}
              outerRadius={75}
              paddingAngle={2}
              dataKey="value"
              label={({ name, percent }) =>
                `${name} ${((percent ?? 0) * 100).toFixed(0)}%`
              }
              labelLine={false}
            >
              {data.map((_, index) => (
                <Cell key={index} fill={COLORS[index]} />
              ))}
            </Pie>
            <Tooltip
              formatter={(value) => formatK(Number(value))}
              contentStyle={{
                fontSize: 12,
                borderRadius: 4,
                border: "1px solid #e5e5e5",
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
