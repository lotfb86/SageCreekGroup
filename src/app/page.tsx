import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Calculator, BarChart3, ArrowLeftRight } from "lucide-react";
import HeroSection from "@/components/sections/HeroSection";
import { getFeaturedTransactions } from "@/lib/transactions";

export default function HomePage() {
  const featured = getFeaturedTransactions();

  return (
    <>
      {/* Hero — The Tagline */}
      <HeroSection
        image="/images/heroes/services-hero.jpg"
        title="The Best Deal is the One That Closes"
        subtitle="Sage Creek Group LLC"
        height="full"
        ctaText="Submit Your Deal"
        ctaHref="/contact"
      />

      {/* The Problem / The Promise */}
      <section className="bg-white py-24 px-6">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs uppercase tracking-[3px] text-sage-400 font-sans font-medium mb-4">
            Why We Exist
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-warmgray-heading leading-tight">
            Finding capital isn&rsquo;t the hard part.
            <br />
            <em className="italic">Closing the deal is.</em>
          </h2>
          <p className="mt-8 text-warmgray leading-relaxed text-lg">
            Any lender can issue a term sheet. But can they deliver on what
            it says? We&rsquo;ve been making sure they do since 2014.
          </p>
          <p className="mt-4 text-warmgray leading-relaxed text-lg">
            We clear the market, deliver the best pricing available, and stay
            with your deal until it funds.{" "}
            <strong className="text-warmgray-heading">
              Execution is what separates a term sheet from a closing.
            </strong>
          </p>
        </div>
      </section>


      {/* Our Process — 4 steps */}
      <section className="bg-cream py-24 px-6">
        <div className="mx-auto max-w-5xl">
          <div className="text-center mb-16">
            <p className="text-xs uppercase tracking-[3px] text-sage-400 font-sans font-medium mb-4">
              How We Work
            </p>
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
                desc: "We know who is likely to finance your project from the outset. We don\u2019t spray and pray \u2014 blasting your loan package to every lender on the planet and hoping something sticks. We take your deal to vetted producers we\u2019ve closed with before \u2014 people who know how to navigate their own credit teams and get deals approved.",
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

      {/* Featured Transactions */}
      <section className="bg-white py-24 px-6">
        <div className="mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <p className="text-xs uppercase tracking-[3px] text-sage-400 font-sans font-medium mb-4">
              Track Record
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl text-warmgray-heading">
              Deals We&rsquo;ve Closed
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featured.map((tx) => (
              <Link
                key={tx.id}
                href={`/transactions/${tx.slug}`}
                className="group block bg-cream rounded-sm overflow-hidden hover:shadow-lg transition-shadow"
              >
                {tx.image && (
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={tx.image}
                      alt={tx.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  </div>
                )}
                <div className="p-6">
                  <p className="text-sage-400 font-sans text-xs uppercase tracking-[2px] font-medium">
                    {tx.dealType} — {tx.propertyType}
                  </p>
                  <h3 className="font-serif text-xl text-warmgray-heading mt-2">
                    {tx.amountDisplay}
                  </h3>
                  <p className="text-warmgray text-sm mt-1">{tx.title}</p>
                  {(tx.city || tx.state) && (
                    <p className="text-warmgray/60 text-xs mt-1">
                      {[tx.city, tx.state].filter(Boolean).join(", ")}
                    </p>
                  )}
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              href="/transactions"
              className="inline-flex items-center gap-2 px-8 py-3 border-2 border-navy-800 text-navy-800 font-sans text-sm uppercase tracking-[2px] font-medium hover:bg-navy-800 hover:text-white transition-all rounded-sm"
            >
              View All Transactions <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* Tools Promotion */}
      <section className="bg-cream py-24 px-6">
        <div className="mx-auto max-w-5xl">
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl sm:text-4xl text-warmgray-heading">
              Run the Numbers
            </h2>
            <p className="mt-4 text-warmgray text-lg max-w-2xl mx-auto">
              Professional-grade CRE calculators — loan payments, DSCR, max
              loan amount, cap rate, IRR, equity waterfalls, and more.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
            {[
              {
                icon: Calculator,
                title: "Loan Payment",
                desc: "Monthly & annual debt service at any rate and amortization.",
              },
              {
                icon: BarChart3,
                title: "DSCR & Max Loan",
                desc: "Know your coverage ratio and how much a lender will approve.",
              },
              {
                icon: ArrowLeftRight,
                title: "Refinance Savings",
                desc: "See exactly what a rate reduction puts back in your pocket.",
              },
            ].map((tool) => (
              <div
                key={tool.title}
                className="bg-white rounded-sm p-6 shadow-sm text-center"
              >
                <tool.icon
                  size={28}
                  className="text-sage-400 mx-auto mb-3"
                  strokeWidth={1.5}
                />
                <h3 className="font-serif text-lg text-warmgray-heading mb-2">
                  {tool.title}
                </h3>
                <p className="text-warmgray text-sm leading-relaxed">
                  {tool.desc}
                </p>
              </div>
            ))}
          </div>

          <div className="text-center">
            <Link
              href="/tools/mortgage-calculator"
              className="inline-flex items-center gap-2 px-8 py-3 border-2 border-navy-800 text-navy-800 font-sans text-sm uppercase tracking-[2px] font-medium hover:bg-navy-800 hover:text-white transition-all rounded-sm"
            >
              Open Calculator Suite <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-32 px-6 overflow-hidden">
        <Image
          src="/images/heroes/contact-hero.jpg"
          alt=""
          fill
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-navy-800/80" />
        <div className="relative z-10 mx-auto max-w-3xl text-center">
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-10 py-4 bg-sage-400 text-white font-sans text-sm uppercase tracking-[2px] font-medium hover:bg-sage-400/90 transition-all rounded-sm"
          >
            Submit Your Deal <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </>
  );
}
