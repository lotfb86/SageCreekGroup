import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Quote } from "lucide-react";
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
            it says? Our job is to make sure they do.
          </p>
          <Link
            href="/why-sage-creek"
            className="mt-8 inline-flex items-center gap-2 text-navy-500 font-medium text-sm uppercase tracking-[2px] hover:text-sage-400 transition-colors"
          >
            How We Get Deals Closed <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="bg-navy-800 py-16 px-6">
        <div className="mx-auto max-w-6xl grid grid-cols-2 sm:grid-cols-4 gap-8 text-center">
          {[
            { value: "$300M+", label: "Closed" },
            { value: "37+", label: "Transactions" },
            { value: "10+", label: "Property Types" },
            { value: "Since 2014", label: "Established" },
          ].map((stat) => (
            <div key={stat.label}>
              <p className="font-serif text-3xl md:text-5xl text-white">
                {stat.value}
              </p>
              <p className="mt-2 text-white/60 text-sm uppercase tracking-[2px] font-sans">
                {stat.label}
              </p>
            </div>
          ))}
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
                title: "Initial Project Analysis",
                desc: "We immediately identify lenders we know will be interested in your project. We go through all of the potential issues that may arise up front and suggest solutions so they can be resolved in the time necessary to close your transaction.",
              },
              {
                step: "02",
                title: "Presentation",
                desc: "We prepare a brief report on your project to present to lenders. Lenders are busy. They don\u2019t have time to read extensive loan proposals or market analyses. They simply want to see the facts and we want to spark their interest.",
              },
              {
                step: "03",
                title: "Sourcing the Debt",
                desc: "We know who is likely to finance your project from the outset and we have strong working relationships with them. We don\u2019t shop your deal around. We simply take it to the decision-makers at carefully selected companies and get quick feedback.",
              },
              {
                step: "04",
                title: "Working Together",
                desc: "With the lender in place, we live with your deal until it closes. We are your advisors, helping you overcome hurdles and lender requirements so you close the deal as quickly as possible.",
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

      {/* Testimonials Placeholder */}
      <section className="bg-cream py-24 px-6">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs uppercase tracking-[3px] text-sage-400 font-sans font-medium mb-4">
            Client Testimonials
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl text-warmgray-heading mb-8">
            What Our Clients Say
          </h2>
          <div className="bg-white rounded-sm p-12 shadow-sm">
            <Quote size={40} className="text-sage-400/20 mx-auto mb-4" strokeWidth={1.5} />
            <p className="text-warmgray italic text-lg">
              Client testimonials coming soon.
            </p>
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
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-white leading-tight">
            You have a deal. We&rsquo;ll get it closed.
          </h2>
          <p className="mt-4 text-white/70 text-lg">
            Tell us about your property and timeline. We&rsquo;ll come back
            with options, not a pitch.
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
