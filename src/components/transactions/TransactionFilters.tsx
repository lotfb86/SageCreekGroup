"use client";

import { DEAL_TYPES, PROPERTY_TYPES, DEAL_SIZE_RANGES } from "@/lib/transactions";

interface TransactionFiltersProps {
  dealType: string;
  propertyType: string;
  dealSize: string;
  sortBy: string;
  onDealTypeChange: (value: string) => void;
  onPropertyTypeChange: (value: string) => void;
  onDealSizeChange: (value: string) => void;
  onSortByChange: (value: string) => void;
}

export default function TransactionFilters({
  dealType,
  propertyType,
  dealSize,
  sortBy,
  onDealTypeChange,
  onPropertyTypeChange,
  onDealSizeChange,
  onSortByChange,
}: TransactionFiltersProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <div>
        <label
          htmlFor="dealType"
          className="block text-xs uppercase tracking-[2px] text-warmgray-heading font-medium mb-2"
        >
          Deal Type
        </label>
        <select
          id="dealType"
          value={dealType}
          onChange={(e) => onDealTypeChange(e.target.value)}
          className="w-full px-4 py-2.5 border border-warmgray/20 rounded-sm text-warmgray-heading text-sm focus:outline-none focus:border-sage-400 transition-colors bg-white"
        >
          {DEAL_TYPES.map((dt) => (
            <option key={dt.value} value={dt.value}>
              {dt.label}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label
          htmlFor="propertyType"
          className="block text-xs uppercase tracking-[2px] text-warmgray-heading font-medium mb-2"
        >
          Property Type
        </label>
        <select
          id="propertyType"
          value={propertyType}
          onChange={(e) => onPropertyTypeChange(e.target.value)}
          className="w-full px-4 py-2.5 border border-warmgray/20 rounded-sm text-warmgray-heading text-sm focus:outline-none focus:border-sage-400 transition-colors bg-white"
        >
          {PROPERTY_TYPES.map((pt) => (
            <option key={pt.value} value={pt.value}>
              {pt.label}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label
          htmlFor="dealSize"
          className="block text-xs uppercase tracking-[2px] text-warmgray-heading font-medium mb-2"
        >
          Deal Size
        </label>
        <select
          id="dealSize"
          value={dealSize}
          onChange={(e) => onDealSizeChange(e.target.value)}
          className="w-full px-4 py-2.5 border border-warmgray/20 rounded-sm text-warmgray-heading text-sm focus:outline-none focus:border-sage-400 transition-colors bg-white"
        >
          {DEAL_SIZE_RANGES.map((ds) => (
            <option key={ds.value} value={ds.value}>
              {ds.label}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label
          htmlFor="sortBy"
          className="block text-xs uppercase tracking-[2px] text-warmgray-heading font-medium mb-2"
        >
          Sort By
        </label>
        <select
          id="sortBy"
          value={sortBy}
          onChange={(e) => onSortByChange(e.target.value)}
          className="w-full px-4 py-2.5 border border-warmgray/20 rounded-sm text-warmgray-heading text-sm focus:outline-none focus:border-sage-400 transition-colors bg-white"
        >
          <option value="default">Default</option>
          <option value="amount-desc">Amount: High to Low</option>
          <option value="amount-asc">Amount: Low to High</option>
        </select>
      </div>
    </div>
  );
}
