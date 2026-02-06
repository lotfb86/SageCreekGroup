import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { PAGE_SEO } from "@/lib/seo";
import HeroSection from "@/components/sections/HeroSection";

export const metadata: Metadata = {
  title: PAGE_SEO.about.title,
  description: PAGE_SEO.about.description,
};

const TEAM = [
  {
    name: "Tim Van Valin",
    title: "Managing Director",
    slug: "tim-van-valin",
    image: "/images/team/tim-van-valin.jpg",
    bio: "Tim founded Sage Creek Group in 2014 with a mission to bring institutional-quality debt advisory services to borrowers in the Pacific Northwest and beyond.",
  },
  {
    name: "Pat McClatchey",
    title: "Senior Vice President",
    slug: "pat-mcclatchey",
    image: "/images/team/pat-mcclatchey.jpg",
    bio: "Pat brings decades of commercial banking experience to Sage Creek Group, with deep expertise in credit analysis, loan structuring, and lender relationships.",
  },
  {
    name: "Jeff Verble",
    title: "Vice President",
    slug: "jeff-verble",
    image: "/images/team/jeff-verble.jpg",
    bio: "Jeff supports Sage Creek's deal origination and execution, with a focus on transaction management, market research, and client service.",
  },
];

const PROCESS_STEPS = [
  {
    step: "01",
    title: "Initial Consultation",
    desc: "We learn about your property, business plan, and financing objectives to determine the best approach.",
  },
  {
    step: "02",
    title: "Market Analysis",
    desc: "We identify the capital sources best suited for your deal profile and prepare a comprehensive loan package.",
  },
  {
    step: "03",
    title: "Competitive Bidding",
    desc: "Your deal is presented to multiple lenders simultaneously, creating competitive tension that drives better terms.",
  },
  {
    step: "04",
    title: "Execution & Closing",
    desc: "We manage the process from term sheet through closing, coordinating with lenders, attorneys, and third parties.",
  },
];

export default function AboutPage() {
  return (
    <>
      <HeroSection
        image="/images/heroes/about-hero.jpg"
        title="About Sage Creek Group"
        subtitle="Experienced. Independent. Results-Driven."
      />

      {/* Company Story */}
      <section className="bg-white py-24 px-6">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-serif text-3xl sm:text-4xl text-warmgray-heading leading-tight">
            Boutique Advisory, Institutional Results
          </h2>
          <div className="mt-8 space-y-6 text-warmgray leading-relaxed text-lg text-left">
            <p>
              Sage Creek Group LLC is a boutique commercial real estate finance
              advisory firm specializing in debt placement for properties
              ranging from $3&nbsp;million to $40&nbsp;million and above. Founded
              in 2014, we serve borrowers nationwide with a particular focus on
              the Pacific Northwest.
            </p>
            <p>
              As independent advisors, we are not affiliated with any single
              lender or capital source. This independence allows us to
              objectively evaluate every option in the market and recommend the
              best solution for each client&rsquo;s unique situation.
            </p>
          </div>
        </div>
      </section>

      {/* Team — moved BEFORE process */}
      <section className="bg-cream py-24 px-6">
        <div className="mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <p className="text-xs uppercase tracking-[3px] text-sage-400 font-sans font-medium mb-4">
              Our Team
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl text-warmgray-heading">
              Meet the Partners
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {TEAM.map((member) => (
              <Link
                key={member.slug}
                href={`/about/${member.slug}`}
                className="group block bg-white rounded-sm overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className="relative h-72 overflow-hidden bg-navy-800/5">
                  {member.image ? (
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <span className="font-serif text-6xl text-navy-500/20">
                        {member.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </span>
                    </div>
                  )}
                </div>
                <div className="p-6">
                  <h3 className="font-serif text-xl text-warmgray-heading">
                    {member.name}
                  </h3>
                  <p className="text-sage-400 text-sm font-medium mt-1">
                    {member.title}
                  </p>
                  <p className="text-warmgray text-sm mt-3 leading-relaxed">
                    {member.bio}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-1 text-navy-500 text-xs uppercase tracking-[2px] font-medium group-hover:text-sage-400 transition-colors">
                    Read Bio <ArrowRight size={12} />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Our Process — now AFTER team */}
      <section className="bg-white py-24 px-6">
        <div className="mx-auto max-w-5xl">
          <div className="text-center mb-16">
            <p className="text-xs uppercase tracking-[3px] text-sage-400 font-sans font-medium mb-4">
              How We Work
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl text-warmgray-heading">
              Our Process
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {PROCESS_STEPS.map((step, i) => (
              <div key={step.step} className="relative text-center">
                <span className="font-serif text-5xl text-sage-400/20">
                  {step.step}
                </span>
                <h3 className="font-serif text-lg text-warmgray-heading mt-2 mb-2">
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
    </>
  );
}
