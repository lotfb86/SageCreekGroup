"use client";

import { useMarketRates } from "@/hooks/useMarketRates";

export default function MarketRateBanner() {
  const { benchmarks, loading } = useMarketRates();

  const rates = [
    { label: "5-Yr Treasury", value: benchmarks.treasury5Yr },
    { label: "10-Yr Treasury", value: benchmarks.treasury10Yr },
    { label: "SOFR (30-Day)", value: benchmarks.sofr30Day },
    { label: "Prime Rate", value: benchmarks.primeRate },
  ];

  return (
    <section className="bg-navy-800 border-t border-white/10">
      <div className="mx-auto max-w-7xl px-6 py-4">
        <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-2">
          {rates.map((r) => (
            <div key={r.label} className="flex items-center gap-2 text-sm">
              <span className="text-white/50">{r.label}:</span>
              <span className={`font-medium ${loading ? "text-white/30 animate-pulse" : "text-white"}`}>
                {r.value.toFixed(2)}%
              </span>
            </div>
          ))}
        </div>
        <p className="text-center text-[11px] text-white/30 mt-1.5">
          {benchmarks.isLive ? (
            <>As of {benchmarks.asOf} · Source: Federal Reserve (FRED)</>
          ) : (
            <>Estimated rates · Live data updates automatically</>
          )}
        </p>
      </div>
    </section>
  );
}
