import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Check, DollarSign } from "lucide-react";
import { PAGE_SEO } from "@/lib/seo";
import HeroSection from "@/components/sections/HeroSection";

export const metadata: Metadata = {
  title: PAGE_SEO.whySageCreek.title,
  description: PAGE_SEO.whySageCreek.description,
};

const COMPARISON_DATA = {
  bank: [
    { label: "Rate", value: "5.75%" },
    { label: "Term", value: "5 Years" },
    { label: "Amortization", value: "25 Years" },
    { label: "LTV", value: "65%" },
    { label: "Recourse", value: "Full Recourse" },
    { label: "Prepayment", value: "2-1-0" },
    { label: "Annual Debt Service", value: "$710,400" },
  ],
  sageCreek: [
    { label: "Rate", value: "4.45%", better: true },
    { label: "Term", value: "10 Years", better: true },
    { label: "Amortization", value: "30 Years", better: true },
    { label: "LTV", value: "72%", better: true },
    { label: "Recourse", value: "Non-Recourse", better: true },
    { label: "Prepayment", value: "Yield Maintenance" },
    { label: "Annual Debt Service", value: "$580,200", better: true },
  ],
};

export default function WhySageCreekPage() {
  return (
    <>
      <HeroSection
        image="/images/heroes/why-hero.jpg"
        title="Why Sage Creek?"
        subtitle="Your Advocate in the Capital Markets"
      />

      {/* Insurance Broker Analogy */}
      <section className="bg-white py-24 px-6">
        <div className="mx-auto max-w-3xl">
          <p className="text-xs uppercase tracking-[3px] text-sage-400 font-sans font-medium mb-4 text-center">
            Our Value Proposition
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl text-warmgray-heading leading-tight text-center">
            Think of us as your insurance broker&nbsp;&mdash; but for debt.
          </h2>
          <div className="mt-8 space-y-6 text-warmgray leading-relaxed text-lg">
            <p>
              When you need insurance, you don&rsquo;t call every carrier in the
              country. You call a broker who knows the market, understands your
              needs, and can quickly identify the best policy at the best price.
            </p>
            <p>
              <strong className="text-warmgray-heading">
                Sage Creek Group works the same way for commercial real estate
                debt.
              </strong>{" "}
              We maintain active relationships with hundreds of capital sources
              — from national banks and life companies to CMBS lenders, agencies,
              debt funds, and private capital providers. When you engage us, we
              go to market on your behalf, presenting your deal to the sources
              most likely to offer the best terms.
            </p>
            <p>
              The result? You get multiple competitive quotes, better terms, and
              a clear understanding of your options — all without the time and
              effort of approaching each lender individually.
            </p>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="bg-cream py-24 px-6">
        <div className="mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <p className="text-xs uppercase tracking-[3px] text-sage-400 font-sans font-medium mb-4">
              The Sage Creek Advantage
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl text-warmgray-heading">
              What Sets Us Apart
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                title: "Broad Market Access",
                desc: "We cast a wide net across the capital markets, ensuring you see the full range of options available for your specific deal profile.",
              },
              {
                title: "Competitive Tension",
                desc: "By soliciting multiple quotes simultaneously, we create competitive tension among lenders — driving better rates and terms for you.",
              },
              {
                title: "Deep Relationships",
                desc: "Our long-standing relationships with lenders give us insight into their current appetites, pricing, and decision-making processes.",
              },
              {
                title: "Deal Structuring Expertise",
                desc: "We help position your deal to match lender preferences, maximizing your chances of approval and favorable terms.",
              },
              {
                title: "Time Savings",
                desc: "Instead of approaching dozens of lenders yourself, you make one call to us and we handle the entire process from application through closing.",
              },
              {
                title: "Transparent Process",
                desc: "You receive clear, side-by-side comparisons of all quotes so you can make an informed decision with complete confidence.",
              },
            ].map((benefit) => (
              <div
                key={benefit.title}
                className="flex gap-4 bg-white rounded-sm p-6 shadow-sm"
              >
                <div className="flex-shrink-0 mt-1">
                  <div className="w-6 h-6 rounded-full bg-sage-400/10 flex items-center justify-center">
                    <Check size={14} className="text-sage-400" />
                  </div>
                </div>
                <div>
                  <h3 className="font-serif text-lg text-warmgray-heading mb-2">
                    {benefit.title}
                  </h3>
                  <p className="text-warmgray text-sm leading-relaxed">
                    {benefit.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Case Study Comparison */}
      <section className="bg-white py-24 px-6">
        <div className="mx-auto max-w-5xl">
          <div className="text-center mb-16">
            <p className="text-xs uppercase tracking-[3px] text-sage-400 font-sans font-medium mb-4">
              Case Study
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl text-warmgray-heading">
              Real Results: Side-by-Side Comparison
            </h2>
            <p className="mt-4 text-warmgray text-lg">
              A recent $10M multifamily refinance — comparing what the
              borrower&rsquo;s relationship bank offered versus what Sage Creek
              sourced.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Relationship Bank */}
            <div className="border border-warmgray/20 rounded-sm p-8">
              <h3 className="font-serif text-xl text-warmgray-heading mb-6 text-center">
                Relationship Bank
              </h3>
              <div className="space-y-4">
                {COMPARISON_DATA.bank.map((row) => (
                  <div
                    key={row.label}
                    className="flex justify-between py-2 border-b border-warmgray/10"
                  >
                    <span className="text-warmgray text-sm">{row.label}</span>
                    <span className="text-warmgray-heading font-medium text-sm">
                      {row.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Sage Creek */}
            <div className="border-2 border-sage-400 rounded-sm p-8 relative">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-sage-400 text-white text-xs uppercase tracking-[2px] font-medium px-4 py-1 rounded-sm">
                Sage Creek
              </div>
              <h3 className="font-serif text-xl text-warmgray-heading mb-6 text-center">
                Sage Creek Result
              </h3>
              <div className="space-y-4">
                {COMPARISON_DATA.sageCreek.map((row) => (
                  <div
                    key={row.label}
                    className="flex justify-between py-2 border-b border-warmgray/10"
                  >
                    <span className="text-warmgray text-sm">{row.label}</span>
                    <span
                      className={`font-medium text-sm ${row.better ? "text-sage-400" : "text-warmgray-heading"}`}
                    >
                      {row.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Dollar Math Callout */}
          <div className="mt-10 bg-sage-400/5 border border-sage-400/20 rounded-sm p-8 text-center">
            <div className="w-12 h-12 rounded-full bg-sage-400/10 flex items-center justify-center mx-auto mb-4">
              <DollarSign size={24} className="text-sage-400" />
            </div>
            <p className="font-serif text-3xl text-warmgray-heading mb-2">
              $130,200 saved per year
            </p>
            <p className="text-warmgray text-sm max-w-lg mx-auto">
              The Sage Creek result saved the borrower over $130,000 annually in
              debt service while providing better terms across every metric —
              including non-recourse, a longer term, and higher leverage.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-navy-800 py-20 px-6">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-serif text-3xl sm:text-4xl text-white">
            See what Sage Creek can do for your deal.
          </h2>
          <p className="mt-4 text-white/60 text-lg">
            Let us show you what&rsquo;s available in the market today.
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
