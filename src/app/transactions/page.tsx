"use client";

import { Suspense, useState, useMemo, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import HeroSection from "@/components/sections/HeroSection";
import TransactionCard from "@/components/transactions/TransactionCard";
import TransactionFilters from "@/components/transactions/TransactionFilters";
import { getAllTransactions, DEAL_SIZE_RANGES } from "@/lib/transactions";

function TransactionsContent() {
  const searchParams = useSearchParams();
  const allTransactions = getAllTransactions();
  const [dealType, setDealType] = useState("all");
  const [propertyType, setPropertyType] = useState("all");
  const [dealSize, setDealSize] = useState("all");
  const [sortBy, setSortBy] = useState("default");

  // Read URL params on mount
  useEffect(() => {
    const dt = searchParams.get("dealType");
    const pt = searchParams.get("propertyType");
    if (dt) setDealType(dt);
    if (pt) setPropertyType(pt);
  }, [searchParams]);

  const filtered = useMemo(() => {
    let result = allTransactions.filter((tx) => {
      if (dealType !== "all" && tx.dealType !== dealType) return false;
      if (propertyType !== "all" && tx.propertyType !== propertyType) return false;
      if (dealSize !== "all") {
        const range = DEAL_SIZE_RANGES.find((r) => r.value === dealSize);
        if (range && "min" in range) {
          const amount = tx.amount || 0;
          if (amount < range.min || amount >= range.max) return false;
        }
      }
      return true;
    });

    if (sortBy === "amount-desc") {
      result = [...result].sort((a, b) => (b.amount || 0) - (a.amount || 0));
    } else if (sortBy === "amount-asc") {
      result = [...result].sort((a, b) => (a.amount || 0) - (b.amount || 0));
    }

    return result;
  }, [allTransactions, dealType, propertyType, dealSize, sortBy]);

  return (
    <>
      <HeroSection
        image="/images/heroes/transactions-hero.jpg"
        title="Transactions"
        subtitle="A Proven Track Record"
      />

      <section className="bg-white py-24 px-6">
        <div className="mx-auto max-w-6xl">
          {/* Filters */}
          <div className="mb-10">
            <TransactionFilters
              dealType={dealType}
              propertyType={propertyType}
              dealSize={dealSize}
              sortBy={sortBy}
              onDealTypeChange={setDealType}
              onPropertyTypeChange={setPropertyType}
              onDealSizeChange={setDealSize}
              onSortByChange={setSortBy}
            />
          </div>

          {/* Results Count */}
          <p className="text-warmgray text-sm mb-6">
            Showing {filtered.length} of {allTransactions.length} transactions
          </p>

          {/* Grid */}
          {filtered.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filtered.map((tx) => (
                <TransactionCard key={tx.id} tx={tx} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-warmgray text-lg">
                No transactions match the selected filters.
              </p>
              <button
                onClick={() => {
                  setDealType("all");
                  setPropertyType("all");
                  setDealSize("all");
                  setSortBy("default");
                }}
                className="mt-4 text-sage-400 font-medium text-sm underline"
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </section>
    </>
  );
}

export default function TransactionsPage() {
  return (
    <Suspense>
      <TransactionsContent />
    </Suspense>
  );
}
