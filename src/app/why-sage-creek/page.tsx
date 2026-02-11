import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, DollarSign } from "lucide-react";
import { PAGE_SEO } from "@/lib/seo";
import HeroSection from "@/components/sections/HeroSection";

export const metadata: Metadata = {
  title: PAGE_SEO.whySageCreek.title,
  description: PAGE_SEO.whySageCreek.description,
};

const COMPARISON_DATA = {
  bank: [
    { label: "Term", value: "5 Years" },
    { label: "Rate", value: "4.25% Fixed" },
    { label: "LTV", value: "65%" },
    { label: "Lender Fee", value: "50 bps" },
    { label: "Annual Debt Service", value: "$651,600" },
  ],
  sageCreek: [
    { label: "Term", value: "5 Years" },
    { label: "Rate", value: "3.65% Fixed", better: true },
    { label: "LTV", value: "68%", better: true },
    { label: "Lender Fee", value: "None", better: true },
    { label: "Annual Debt Service", value: "$618,000", better: true },
  ],
};

export default function WhySageCreekPage() {
  return (
    <>
      <HeroSection
        image="/images/heroes/why-hero.jpg"
        title="We Know Who Will Finance Your Deal"
      />

      {/* The Core Problem */}
      <section className="bg-white py-24 px-6">
        <div className="mx-auto max-w-3xl">
          <div className="text-center">
            <p className="text-xs uppercase tracking-[3px] text-sage-400 font-sans font-medium mb-4">
              The Problem We Solve
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl text-warmgray-heading leading-tight">
              Are You Really Seeing the Full Market?
            </h2>
          </div>
          <div className="mt-8 space-y-6 text-warmgray leading-relaxed text-lg">
            <p>
              Your bank gives you a term sheet. Maybe a second lender does too.
              You compare the two, pick the better one, and move forward. But
              can a couple of lenders really represent the vast, fragmented,
              and constantly shifting capital markets landscape? Of course not.
              What if the best deal for your project is with a lender
              you&rsquo;ve never heard of?
            </p>
            <p>
              That&rsquo;s the gap we fill. We don&rsquo;t replace your banking
              relationships &mdash; we make sure you&rsquo;re not leaving money
              on the table because you stopped looking too early.
            </p>
          </div>
        </div>
      </section>

      {/* SCG's System */}
      <section className="bg-cream py-24 px-6">
        <div className="mx-auto max-w-5xl">
          <div className="text-center mb-16">
            <h2 className="font-serif text-3xl sm:text-4xl text-warmgray-heading">
              Our Process
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                step: "01",
                title: "Deal Analysis",
                desc: "We start by understanding your project inside and out \u2014 the asset, the capital stack, the timeline, and the exit. We identify potential issues up front and suggest solutions so they can be resolved well before they become problems at the closing table.",
              },
              {
                step: "02",
                title: "Packaging the Deal",
                desc: "We prepare a brief, focused report on your project to present to lenders. Lenders are busy \u2014 they don\u2019t care about glossy offering memorandums or filler. They want to see the facts. We give them exactly what they need to spark interest and move fast.",
              },
              {
                step: "03",
                title: "Sourcing the Debt",
                desc: "We know who is likely to finance your project from the outset. We don\u2019t spray and pray \u2014 blasting your loan package to every lender on the planet and hoping something sticks. We take your deal to vetted producers we\u2019ve closed with before \u2014 people who know how to navigate their own credit teams and get deals approved. The people you work with determine whether your deal closes. That\u2019s why we only work with producers who perform.",
              },
              {
                step: "04",
                title: "Closing the Deal",
                desc: "With the lender in place, we live with your deal until it closes. We are your advisors \u2014 helping you clear lender requirements, overcome hurdles, and keep the process moving so you close on your timeline, not theirs.",
              },
            ].map((step) => (
              <div
                key={step.step}
                className="bg-white rounded-sm p-8 shadow-sm"
              >
                <span className="font-serif text-4xl text-sage-400/20">
                  {step.step}
                </span>
                <h3 className="font-serif text-xl text-warmgray-heading mt-2 mb-3">
                  {step.title}
                </h3>
                <p className="text-warmgray text-sm leading-relaxed">
                  {step.desc}
                </p>
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
              Real Results
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl text-warmgray-heading">
              Your Bank vs. Sage Creek
            </h2>
            <p className="mt-4 text-warmgray text-lg">
              A $10M closed transaction — what the borrower&rsquo;s
              relationship bank offered versus what we sourced. This happens
              all the time.
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
              $33,600 saved per year + $50,000 in fees
            </p>
            <p className="text-warmgray text-sm max-w-lg mx-auto">
              60 basis points off the rate, higher leverage, zero lender fee,
              and over $33,000 in annual debt service savings. On a 5-year
              term, that&rsquo;s $218,000 back in the borrower&rsquo;s pocket.
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
