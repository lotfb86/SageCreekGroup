"use client";

import { useState, useEffect } from "react";
import {
  DEFAULT_BENCHMARKS,
  computeCreRates,
  type MarketRatesResponse,
} from "@/lib/market-rates";

const DEFAULT_RESPONSE: MarketRatesResponse = {
  benchmarks: DEFAULT_BENCHMARKS,
  creRates: computeCreRates(DEFAULT_BENCHMARKS),
};

/**
 * Client hook that fetches live market rates from /api/market-rates.
 * Falls back to hardcoded defaults on error or while loading.
 */
export function useMarketRates() {
  const [data, setData] = useState<MarketRatesResponse>(DEFAULT_RESPONSE);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function fetchRates() {
      try {
        const res = await fetch("/api/market-rates");
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const json: MarketRatesResponse = await res.json();
        if (!cancelled) {
          setData(json);
          setError(null);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : "Failed to fetch rates");
          // Keep defaults
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    fetchRates();
    return () => {
      cancelled = true;
    };
  }, []);

  return { ...data, loading, error };
}
