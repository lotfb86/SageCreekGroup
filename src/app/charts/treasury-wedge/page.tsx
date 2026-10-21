import type { Metadata } from "next";
import TreasuryWedgeChart from "./TreasuryWedgeChart";

export const metadata: Metadata = {
  title: "10-Year Treasury Yield — Converging Wedge — Sage Creek Group",
  description:
    "Weekly 10-Year Treasury yield analysis from January 2022 to March 2026, showing converging wedge pattern with yield testing upper resistance.",
  robots: { index: false, follow: false },
};

export default function TreasuryWedgePage() {
  return (
    <>
      {/* Dark banner so site nav is visible */}
      <div className="bg-navy-800 pt-28 pb-10">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-serif text-4xl font-bold text-white mb-2">
            Sage Creek Group
          </h1>
          <p className="text-white/70 max-w-2xl mx-auto">
            <strong className="text-white/90">The Sage Creek Group</strong> is a
            boutique commercial real estate finance intermediary with a proven
            track record of securing both traditional and non-bank financing for
            almost any commercial real estate asset and scenario.
          </p>
        </div>
      </div>

      <section className="bg-cream min-h-screen py-10">
        <div className="mx-auto max-w-[1040px] px-4 sm:px-6 lg:px-8">
          <TreasuryWedgeChart />
        </div>
      </section>
    </>
  );
}
