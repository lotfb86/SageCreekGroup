import type { Metadata } from "next";
import { PAGE_SEO } from "@/lib/seo";

export const metadata: Metadata = {
  title: PAGE_SEO.mortgageCalculator.title,
  description: PAGE_SEO.mortgageCalculator.description,
};

export default function MortgageCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
