import { NextResponse } from "next/server";
import {
  FRED_SERIES,
  DEFAULT_BENCHMARKS,
  computeCreRates,
  type BenchmarkRates,
  type MarketRatesResponse,
} from "@/lib/market-rates";

// ISR: revalidate every hour (3600s). At most 6 FRED calls per hour.
export const revalidate = 3600;

const FRED_BASE = "https://api.stlouisfed.org/fred/series/observations";

/**
 * Fetch latest observation for a FRED series.
 * Returns the most recent non-"." value.
 */
async function fetchFredSeries(
  seriesId: string,
  apiKey: string
): Promise<number | null> {
  try {
    const url = new URL(FRED_BASE);
    url.searchParams.set("series_id", seriesId);
    url.searchParams.set("api_key", apiKey);
    url.searchParams.set("file_type", "json");
    url.searchParams.set("sort_order", "desc");
    url.searchParams.set("limit", "5"); // last 5 observations to skip holidays

    const res = await fetch(url.toString(), { next: { revalidate: 3600 } });
    if (!res.ok) return null;

    const data = await res.json();
    const observations = data.observations ?? [];

    // FRED returns "." for missing values (weekends/holidays)
    for (const obs of observations) {
      if (obs.value && obs.value !== ".") {
        return parseFloat(obs.value);
      }
    }
    return null;
  } catch {
    return null;
  }
}

export async function GET() {
  const apiKey = process.env.FRED_API_KEY;

  // No API key → return defaults immediately
  if (!apiKey) {
    return NextResponse.json({
      benchmarks: DEFAULT_BENCHMARKS,
      creRates: computeCreRates(DEFAULT_BENCHMARKS),
    } satisfies MarketRatesResponse);
  }

  // Fetch all 6 series in parallel
  const [dgs5, dgs7, dgs10, dgs30, sofr, prime] = await Promise.all([
    fetchFredSeries(FRED_SERIES.DGS5, apiKey),
    fetchFredSeries(FRED_SERIES.DGS7, apiKey),
    fetchFredSeries(FRED_SERIES.DGS10, apiKey),
    fetchFredSeries(FRED_SERIES.DGS30, apiKey),
    fetchFredSeries(FRED_SERIES.SOFR30DAYAVG, apiKey),
    fetchFredSeries(FRED_SERIES.DPRIME, apiKey),
  ]);

  // If we got at least one live value, mark as live
  const anyLive = [dgs5, dgs7, dgs10, dgs30, sofr, prime].some(
    (v) => v !== null
  );

  const benchmarks: BenchmarkRates = {
    treasury5Yr: dgs5 ?? DEFAULT_BENCHMARKS.treasury5Yr,
    treasury7Yr: dgs7 ?? DEFAULT_BENCHMARKS.treasury7Yr,
    treasury10Yr: dgs10 ?? DEFAULT_BENCHMARKS.treasury10Yr,
    treasury30Yr: dgs30 ?? DEFAULT_BENCHMARKS.treasury30Yr,
    sofr30Day: sofr ?? DEFAULT_BENCHMARKS.sofr30Day,
    primeRate: prime ?? DEFAULT_BENCHMARKS.primeRate,
    asOf: new Date().toISOString().slice(0, 10),
    isLive: anyLive,
  };

  return NextResponse.json({
    benchmarks,
    creRates: computeCreRates(benchmarks),
  } satisfies MarketRatesResponse);
}
