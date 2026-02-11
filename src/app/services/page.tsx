import type { Metadata } from "next";
import Link from "next/link";
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
import { PAGE_SEO } from "@/lib/seo";

export const metadata: Metadata = {
  title: PAGE_SEO.services.title,
  description: PAGE_SEO.services.description,
};

const FINANCING_TYPES = [
  {
    icon: Landmark,
    title: "Permanent Financing",
    scenario:
      "Your asset is stabilized and performing. Now you need the debt to match \u2014 the rate, the term, the structure that lets you put this one on the shelf, collect the checks, and move on to the next deal.",
    proof: "We placed a $32M perm loan on a 204-unit Class A apartment at 5.87% with 2 years of interest-only.",
    txSlug: "perm-loan-204-unit-class-a-western-or",
  },
  {
    icon: BrickWall,
    title: "Construction Loans",
    scenario:
      "Ground-up projects live and die on how the debt is structured. We structure construction loans that help protect you when things don\u2019t go as planned \u2014 because they never do.",
    proof: "We closed an $36M all-in-one construction loan for an 83-unit subdivision in 30 days, origination to closing.",
    txSlug: "construction-loan-83-unit-subdivision-salem-or",
  },
  {
    icon: Building2,
    title: "Bridge Lending",
    scenario:
      "Your bank won\u2019t renew. You\u2019re mid-lease-up, and out of runway. Or maybe bridge is the plan from day one. Either way, you need speed, certainty, and a broker with a deep Rolodex. We know the bridge market cold and we close fast.",
    proof: "We closed a $2.1M bridge loan for a 50%-vacant Class A office in 14 days when the bank refused to extend.",
    txSlug: "senior-bridge-class-a-office",
  },
  {
    icon: ArrowLeftRight,
    title: "Refinance",
    scenario:
      "Your rate is too high, your term is too short, or you\u2019re sitting on equity that should be working. We don\u2019t refinance for the sake of it \u2014 if it doesn\u2019t meaningfully improve your position, we\u2019ll tell you to stay put.",
    scenarioLink: { href: "/tools/mortgage-calculator#refinance", label: "Run the Numbers" },
    proof: "We refinanced a 160-unit Class A apartment at 5.99% fixed before the property was even stabilized \u2014 lender only required 75% occupancy.",
    txSlug: "perm-loan-160-unit-breckenridge-nampa-id",
  },
  {
    icon: Shield,
    title: "Agency Lending",
    scenario:
      "Agency and HUD programs rule the long-term multifamily lending market. But not every originator is upfront about what\u2019s baked into the spread. We show you exactly what makes up your rate \u2014 lender margin, servicing, and fees \u2014 full transparency, no shenanigans.",
    proof: "We placed a non-recourse agency loan on a 28-unit apartment 100 miles from the nearest MSA at 3.95% with 5 years of interest-only.",
    txSlug: "perm-financing-28-unit-apartment-or",
  },
  {
    icon: Briefcase,
    title: "Specialty & Creative Structures",
    scenario:
      "PACE financing, sub-debt, recourse burn-offs, bridge-to-HUD, high-leverage structures \u2014 when your deal doesn\u2019t fit a box, that\u2019s where we add the most value. We\u2019ve structured it before and we know who will fund it.",
    proof: "We structured a $7M mini-perm for an assisted living facility with a subordinate EB5 note and 50% recourse burn-off at DSCR thresholds.",
    txSlug: "alf-mini-perm-pacific-northwest",
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

export default function ServicesPage() {
  return (
    <>
      <HeroSection
        image="/images/heroes/contact-hero.jpg"
        title="Debt Placement Services"
        subtitle="We Know Who Will Finance Your Deal"
        imagePosition="center 70%"
      />

      {/* Intro — condensed */}
      <section className="bg-white py-24 px-6">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-serif text-3xl sm:text-4xl text-warmgray-heading leading-tight">
            You don&rsquo;t need a stack of term sheets.
            <br />
            <em className="italic">You need the right one.</em>
          </h2>
          <p className="mt-6 text-warmgray leading-relaxed text-lg">
            We maintain relationships with hundreds of capital sources — banks,
            life companies, CMBS, agencies, debt funds, and private capital. We
            don&rsquo;t spray and pray. We take your deal to vetted producers
            we&rsquo;ve closed with before — the ones who know how to get their
            credit teams to say yes.
          </p>
          <p className="mt-4 text-warmgray leading-relaxed text-lg">
            <strong className="text-warmgray-heading">
              Execution is what separates a term sheet from a closing.
            </strong>{" "}
            We deliver the best pricing available, then we stay with your deal
            until it funds.
          </p>
        </div>
      </section>

      {/* Financing Types — scenario-driven with proof */}
      <section className="bg-cream py-24 px-6">
        <div className="mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <p className="text-xs uppercase tracking-[3px] text-sage-400 font-sans font-medium mb-4">
              What We Finance
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl text-warmgray-heading">
              Every Scenario. One Goal: Close.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {FINANCING_TYPES.map((type) => (
              <div
                key={type.title}
                className="bg-white rounded-sm p-8 shadow-sm hover:shadow-md transition-shadow flex flex-col"
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
                  {type.scenario}
                  {type.scenarioLink && (
                    <>
                      {" "}
                      <Link
                        href={type.scenarioLink.href}
                        className="inline-flex items-center gap-1 text-sage-400 font-medium hover:text-navy-500 transition-colors"
                      >
                        {type.scenarioLink.label} <ArrowRight size={12} />
                      </Link>
                    </>
                  )}
                </p>
                <div className="mt-auto pt-4 border-t border-warmgray/10">
                  <p className="text-warmgray/80 text-xs leading-relaxed italic mb-3">
                    {type.proof}
                  </p>
                  <Link
                    href={`/transactions/${type.txSlug}`}
                    className="inline-flex items-center gap-1 text-navy-500 text-xs uppercase tracking-[2px] font-medium hover:text-sage-400 transition-colors"
                  >
                    View Deal <ArrowRight size={12} />
                  </Link>
                </div>
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
                className="group inline-flex items-center gap-1.5 px-5 py-2.5 bg-cream border border-warmgray/10 text-warmgray-heading text-sm font-medium rounded-sm hover:bg-sage-400 hover:border-sage-400 hover:text-white transition-all"
              >
                {pt.label}
                <ArrowRight size={12} className="opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
              </Link>
            ))}
          </div>
          <p className="text-center mt-6 text-warmgray/60 text-sm">
            Click any property type to see our closed transactions.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-navy-800 py-20 px-6">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-serif text-3xl sm:text-4xl text-white">
            Have a deal to discuss?
          </h2>
          <p className="mt-4 text-white/60 text-lg">
            Tell us about your project. We&rsquo;ll tell you who will finance
            it.
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
