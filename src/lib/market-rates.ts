// ─── FRED Series IDs ───────────────────────────────────────────────
export const FRED_SERIES = {
  DGS5: "DGS5", // 5-Year Treasury Constant Maturity Rate
  DGS7: "DGS7", // 7-Year Treasury Constant Maturity Rate
  DGS10: "DGS10", // 10-Year Treasury Constant Maturity Rate
  DGS30: "DGS30", // 30-Year Treasury Constant Maturity Rate
  SOFR30DAYAVG: "SOFR30DAYAVG", // 30-Day Average SOFR
  DPRIME: "DPRIME", // Prime Rate
} as const;

export type FredSeriesId = keyof typeof FRED_SERIES;

// ─── Benchmark Rates (what FRED gives us) ──────────────────────────
export interface BenchmarkRates {
  treasury5Yr: number;
  treasury7Yr: number;
  treasury10Yr: number;
  treasury30Yr: number;
  sofr30Day: number;
  primeRate: number;
  asOf: string; // ISO date string
  isLive: boolean; // false = using hardcoded defaults
}

// ─── CRE Rate Estimates (benchmark + typical spread) ───────────────
export interface CreRateEstimate {
  label: string;
  benchmark: string;
  spreadLow: number; // bps
  spreadHigh: number; // bps
  estimatedLow: number; // percentage
  estimatedHigh: number; // percentage
}

export interface MarketRatesResponse {
  benchmarks: BenchmarkRates;
  creRates: CreRateEstimate[];
}

// ─── Hardcoded Defaults (shown when FRED is unavailable) ──────────
export const DEFAULT_BENCHMARKS: BenchmarkRates = {
  treasury5Yr: 4.25,
  treasury7Yr: 4.35,
  treasury10Yr: 4.50,
  treasury30Yr: 4.75,
  sofr30Day: 4.33,
  primeRate: 7.5,
  asOf: new Date().toISOString().slice(0, 10),
  isLive: false,
};

// ─── Typical CRE Spreads Over Benchmarks ──────────────────────────
// These are typical ranges — actual spreads vary by deal quality, LTV,
// borrower experience, property type, and market conditions.
export const CRE_SPREAD_CONFIG = [
  {
    label: "Agency Multifamily",
    benchmarkKey: "treasury10Yr" as keyof BenchmarkRates,
    benchmarkLabel: "10-Yr Treasury",
    spreadLow: 125, // bps
    spreadHigh: 175,
  },
  {
    label: "CMBS",
    benchmarkKey: "treasury10Yr" as keyof BenchmarkRates,
    benchmarkLabel: "10-Yr Treasury",
    spreadLow: 175,
    spreadHigh: 250,
  },
  {
    label: "Bank Permanent",
    benchmarkKey: "treasury5Yr" as keyof BenchmarkRates,
    benchmarkLabel: "5-Yr Treasury",
    spreadLow: 175,
    spreadHigh: 250,
  },
  {
    label: "Bridge",
    benchmarkKey: "sofr30Day" as keyof BenchmarkRates,
    benchmarkLabel: "SOFR 30-Day",
    spreadLow: 300,
    spreadHigh: 500,
  },
  {
    label: "Construction",
    benchmarkKey: "primeRate" as keyof BenchmarkRates,
    benchmarkLabel: "Prime Rate",
    spreadLow: -50,
    spreadHigh: 100,
  },
] as const;

// ─── Compute CRE rate estimates from benchmarks ───────────────────
export function computeCreRates(benchmarks: BenchmarkRates): CreRateEstimate[] {
  return CRE_SPREAD_CONFIG.map((config) => {
    const benchmarkRate = benchmarks[config.benchmarkKey] as number;
    return {
      label: config.label,
      benchmark: config.benchmarkLabel,
      spreadLow: config.spreadLow,
      spreadHigh: config.spreadHigh,
      estimatedLow: benchmarkRate + config.spreadLow / 100,
      estimatedHigh: benchmarkRate + config.spreadHigh / 100,
    };
  });
}
