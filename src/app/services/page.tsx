import type { Metadata } from "next";
import Link from "next/link";
import { PAGE_SEO } from "@/lib/seo";
import {
  Landmark,
  BrickWall,
  Building2,
  ArrowLeftRight,
  Shield,
  Briefcase,
  ArrowRight,
} from "lucide-react";
import HeroSection from "@/components/sections/HeroSection";

export const metadata: Metadata = {
  title: PAGE_SEO.services.title,
  description: PAGE_SEO.services.description,
};

const FINANCING_TYPES = [
  {
    icon: Landmark,
    title: "Permanent Financing",
    desc: "Long-term fixed and variable rate loans from life companies, agencies, banks, and CMBS lenders. Terms typically range from 5 to 30 years.",
    terms: ["5–30 year terms", "Up to 75% LTV", "Fixed or floating rate", "Non-recourse available"],
  },
  {
    icon: BrickWall,
    title: "Construction Loans",
    desc: "Ground-up construction financing for multifamily, mixed-use, and commercial developments with competitive rates and flexible draw schedules.",
    terms: ["12–36 month terms", "Up to 65% LTC", "Interest-only during construction", "Recourse typical"],
  },
  {
    icon: Building2,
    title: "Bridge Loans",
    desc: "Short-term bridge financing for transitional assets, value-add opportunities, and properties requiring stabilization before permanent placement.",
    terms: ["6–36 month terms", "Up to 80% LTV", "Interest-only", "Flexible prepayment"],
  },
  {
    icon: ArrowLeftRight,
    title: "Refinance",
    desc: "Refinance existing debt to secure better terms, lower rates, or extract equity for new investments and property improvements.",
    terms: ["5–30 year terms", "Rate & term or cash-out", "Fixed or floating", "Non-recourse available"],
  },
  {
    icon: Shield,
    title: "Mezzanine & Preferred Equity",
    desc: "Subordinate debt and preferred equity structures to fill the capital stack gap between senior debt and sponsor equity.",
    terms: ["2–10 year terms", "Up to 85% LTC", "Interest-only common", "Flexible structures"],
  },
  {
    icon: Briefcase,
    title: "Agency Lending",
    desc: "Fannie Mae, Freddie Mac, and HUD/FHA financing programs for qualifying multifamily and senior housing properties.",
    terms: ["5–35 year terms", "Up to 80% LTV", "Non-recourse", "30-year amortization"],
  },
];

const PROPERTY_TYPES = [
  { label: "Multifamily", slug: "multifamily" },
  { label: "Hotel & Hospitality", slug: "hotel" },
  { label: "Senior Housing", slug: "senior-housing" },
  { label: "Industrial", slug: "industrial" },
  { label: "Retail", slug: "retail" },
  { label: "Office", slug: "office" },
  { label: "Medical Office", slug: "medical-office" },
  { label: "Student Housing", slug: "student-housing" },
  { label: "Land", slug: "land" },
  { label: "Mixed-Use", slug: "mixed-use" },
];

const CAPITAL_SOURCES = [
  { name: "Life Insurance Companies", desc: "Long-term fixed-rate loans for stabilized assets. Competitive rates with conservative underwriting." },
  { name: "Banks & Credit Unions", desc: "Portfolio lenders offering flexible terms, relationship pricing, and local market knowledge." },
  { name: "CMBS Lenders", desc: "Non-recourse securitized loans for stabilized commercial properties of all types." },
  { name: "Agency (Fannie/Freddie/HUD)", desc: "Government-sponsored programs with the most competitive rates for qualifying multifamily." },
  { name: "Debt Funds", desc: "Bridge, mezzanine, and preferred equity from private capital providers with flexible structures." },
  { name: "Private Capital", desc: "High-net-worth and family office capital for unique situations requiring creative solutions." },
];

export default function ServicesPage() {
  return (
    <>
      <HeroSection
        image="/images/heroes/services-hero.jpg"
        title="Debt Placement Services"
        subtitle="Comprehensive Financing Solutions"
      />

      {/* Intro */}
      <section className="bg-white py-24 px-6">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-serif text-3xl sm:text-4xl text-warmgray-heading leading-tight">
            Access to the Full Capital Markets
          </h2>
          <p className="mt-6 text-warmgray leading-relaxed text-lg">
            Sage Creek Group maintains active relationships with hundreds of
            capital sources — from regional and national banks to life insurance
            companies, CMBS lenders, agencies, debt funds, and private capital
            providers. We leverage these relationships to secure the best
            available terms for every engagement.
          </p>
        </div>
      </section>

      {/* Financing Types — enhanced cards with terms */}
      <section className="bg-cream py-24 px-6">
        <div className="mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <p className="text-xs uppercase tracking-[3px] text-sage-400 font-sans font-medium mb-4">
              Financing Types
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl text-warmgray-heading">
              Tailored Capital Solutions
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {FINANCING_TYPES.map((type) => (
              <div
                key={type.title}
                className="bg-white rounded-sm p-8 shadow-sm hover:shadow-md transition-shadow"
              >
                <type.icon
                  size={32}
                  className="text-sage-400 mb-4"
                  strokeWidth={1.5}
                />
                <h3 className="font-serif text-xl text-warmgray-heading mb-3">
                  {type.title}
                </h3>
                <p className="text-warmgray text-sm leading-relaxed mb-4">
                  {type.desc}
                </p>
                <ul className="space-y-1.5">
                  {type.terms.map((term) => (
                    <li key={term} className="flex items-center gap-2 text-xs text-warmgray">
                      <span className="w-1 h-1 rounded-full bg-sage-400 flex-shrink-0" />
                      {term}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Property Types — clickable pills */}
      <section className="bg-white py-24 px-6">
        <div className="mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <p className="text-xs uppercase tracking-[3px] text-sage-400 font-sans font-medium mb-4">
              Property Types
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl text-warmgray-heading">
              Experience Across All Asset Classes
            </h2>
          </div>

          <div className="flex flex-wrap justify-center gap-3">
            {PROPERTY_TYPES.map((pt) => (
              <Link
                key={pt.slug}
                href={`/transactions?propertyType=${pt.slug}`}
                className="px-5 py-2.5 bg-cream text-warmgray-heading text-sm font-medium rounded-sm hover:bg-sage-400 hover:text-white transition-all"
              >
                {pt.label}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Capital Sources */}
      <section className="bg-cream py-24 px-6">
        <div className="mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <p className="text-xs uppercase tracking-[3px] text-sage-400 font-sans font-medium mb-4">
              Our Network
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl text-warmgray-heading">
              Capital Sources We Access
            </h2>
            <p className="mt-4 text-warmgray text-lg max-w-2xl mx-auto">
              We maintain active relationships across the full spectrum of commercial real estate capital providers.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {CAPITAL_SOURCES.map((source) => (
              <div key={source.name} className="bg-white rounded-sm p-6 shadow-sm">
                <h3 className="font-serif text-lg text-warmgray-heading mb-2">
                  {source.name}
                </h3>
                <p className="text-warmgray text-sm leading-relaxed">
                  {source.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-navy-800 py-20 px-6">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-serif text-3xl sm:text-4xl text-white">
            Have a deal to discuss?
          </h2>
          <p className="mt-4 text-white/60 text-lg">
            We&rsquo;ll evaluate your project and provide a clear path to
            financing.
          </p>
          <Link
            href="/contact"
            className="mt-8 inline-flex items-center gap-2 px-8 py-3 bg-sage-400 text-white font-sans text-sm uppercase tracking-[2px] font-medium hover:bg-sage-400/90 transition-all rounded-sm"
          >
            Submit Your Deal <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </>
  );
}
