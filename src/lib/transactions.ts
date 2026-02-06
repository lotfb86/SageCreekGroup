import transactionsData from "@/../content/transactions/transactions.json";

export interface Transaction {
  id: number;
  slug: string;
  amount: number | null;
  amountDisplay: string;
  title: string;
  subtitle: string;
  dealType: string;
  propertyType: string;
  city: string;
  state: string;
  terms: Record<string, string>;
  description: string;
  image?: string;
  featured?: boolean;
  sortOrder: number;
}

const transactions = transactionsData as unknown as Transaction[];

export function getAllTransactions(): Transaction[] {
  return [...transactions].sort(
    (a, b) => a.sortOrder - b.sortOrder
  );
}

export function getTransactionBySlug(slug: string): Transaction | undefined {
  return transactions.find((t) => t.slug === slug);
}

export function getFeaturedTransactions(): Transaction[] {
  return transactions
    .filter((t) => t.featured)
    .sort((a, b) => a.sortOrder - b.sortOrder);
}

export function getRelatedTransactions(
  current: Transaction,
  limit = 3
): Transaction[] {
  return transactions
    .filter(
      (t) =>
        t.id !== current.id &&
        (t.propertyType === current.propertyType ||
          t.dealType === current.dealType)
    )
    .slice(0, limit);
}

export const DEAL_TYPES = [
  { value: "all", label: "All Types" },
  { value: "permanent", label: "Permanent" },
  { value: "construction", label: "Construction" },
  { value: "bridge", label: "Bridge" },
  { value: "refinance", label: "Refinance" },
  { value: "acquisition", label: "Acquisition" },
  { value: "mini-perm", label: "Mini-Perm" },
  { value: "credit-line", label: "Credit Line" },
] as const;

export const PROPERTY_TYPES = [
  { value: "all", label: "All Properties" },
  { value: "multifamily", label: "Multifamily" },
  { value: "single-family", label: "Single Family" },
  { value: "retail", label: "Retail" },
  { value: "industrial", label: "Industrial" },
  { value: "hotel", label: "Hotel" },
  { value: "mixed-use", label: "Mixed Use" },
  { value: "office", label: "Office" },
  { value: "land", label: "Land" },
  { value: "senior-housing", label: "Senior Housing" },
  { value: "medical-office", label: "Medical Office" },
  { value: "student-housing", label: "Student Housing" },
] as const;

export const DEAL_SIZE_RANGES = [
  { value: "all", label: "All Sizes" },
  { value: "under-5m", label: "Under $5M", min: 0, max: 5000000 },
  { value: "5m-10m", label: "$5M – $10M", min: 5000000, max: 10000000 },
  { value: "10m-25m", label: "$10M – $25M", min: 10000000, max: 25000000 },
  { value: "25m-plus", label: "$25M+", min: 25000000, max: Infinity },
] as const;

export function getTransactionStats() {
  const all = getAllTransactions();
  const totalVolume = all.reduce((sum, t) => sum + (t.amount || 0), 0);
  const propertyTypes = new Set(all.map((t) => t.propertyType));
  const states = new Set(all.map((t) => t.state));
  return {
    count: all.length,
    totalVolume,
    propertyTypeCount: propertyTypes.size,
    stateCount: states.size,
  };
}
