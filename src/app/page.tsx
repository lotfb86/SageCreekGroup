import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Building2, Landmark, BrickWall, Shield, Quote } from "lucide-react";
import HeroSection from "@/components/sections/HeroSection";
import { getFeaturedTransactions } from "@/lib/transactions";
import { formatCurrency } from "@/lib/utils";

export default function HomePage() {
  const featured = getFeaturedTransactions();

  return (
    <>
      {/* Hero */}
      <HeroSection
        image="/images/heroes/home-hero.jpg"
        title="Financing Solutions for Commercial Real Estate"
        subtitle="Boutique Advisory — Pacific Northwest & Nationwide"
        height="full"
        ctaText="Submit Your Deal"
        ctaHref="/contact"
      />

      {/* Intro */}
      <section className="bg-white py-24 px-6">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs uppercase tracking-[3px] text-sage-400 font-sans font-medium mb-4">
            Our Approach
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-warmgray-heading leading-tight">
            Not just loans.&nbsp;
            <em className="italic">Solutions.</em>
          </h2>
          <p className="mt-6 text-warmgray leading-relaxed text-lg">
            Sage Creek Group acts as your advocate in the capital markets,
            leveraging decades of lending relationships to source the best
            available debt for your project — whether it&rsquo;s a $3&nbsp;million
            townhome community or a $40&nbsp;million mixed-use development.
          </p>
          <Link
            href="/why-sage-creek"
            className="mt-8 inline-flex items-center gap-2 text-navy-500 font-medium text-sm uppercase tracking-[2px] hover:text-sage-400 transition-colors"
          >
            Learn Why Sage Creek <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      {/* Stats Bar — 4 stats */}
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

      {/* Services Preview — 4 cards */}
      <section className="bg-cream py-24 px-6">
        <div className="mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <p className="text-xs uppercase tracking-[3px] text-sage-400 font-sans font-medium mb-4">
              What We Do
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl text-warmgray-heading">
              Debt Placement Services
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Landmark,
                title: "Permanent Financing",
                desc: "Long-term fixed and variable rate loans from life companies, agencies, banks, and CMBS lenders.",
              },
              {
                icon: BrickWall,
                title: "Construction Loans",
                desc: "Ground-up construction financing for multifamily, mixed-use, and commercial developments.",
              },
              {
                icon: Building2,
                title: "Bridge & Mezzanine",
                desc: "Short-term bridge loans, mezzanine debt, and preferred equity for transitional assets.",
              },
              {
                icon: Shield,
                title: "Agency Lending",
                desc: "Fannie Mae, Freddie Mac, and HUD/FHA programs for qualifying multifamily properties.",
              },
            ].map((service) => (
              <div
                key={service.title}
                className="bg-white rounded-sm p-8 shadow-sm hover:shadow-md transition-shadow"
              >
                <service.icon
                  size={32}
                  className="text-sage-400 mb-4"
                  strokeWidth={1.5}
                />
                <h3 className="font-serif text-xl text-warmgray-heading mb-3">
                  {service.title}
                </h3>
                <p className="text-warmgray text-sm leading-relaxed mb-4">
                  {service.desc}
                </p>
                <Link
                  href="/services"
                  className="inline-flex items-center gap-1 text-navy-500 text-xs uppercase tracking-[2px] font-medium hover:text-sage-400 transition-colors"
                >
                  Learn More <ArrowRight size={12} />
                </Link>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              href="/services"
              className="inline-flex items-center gap-2 text-navy-500 font-medium text-sm uppercase tracking-[2px] hover:text-sage-400 transition-colors"
            >
              View All Services <ArrowRight size={16} />
            </Link>
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
              Featured Transactions
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
                  <p className="text-warmgray/60 text-xs mt-1">
                    {tx.city}, {tx.state}
                  </p>
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
            Ready to discuss your next project?
          </h2>
          <p className="mt-4 text-white/70 text-lg">
            Let our team source the best available financing for your commercial
            real estate investment.
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
