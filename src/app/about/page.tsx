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
    bio: "Tim serves as Managing Director of Sage Creek Group LLC. He began his career with six years as a stock broker at Pennaluna & Company in Coeur d\u2019Alene, Idaho, a boutique firm specializing in Canadian TSX exchange trading and capital raising for small-cap resource companies. He then transitioned to proprietary trading on major U.S. exchanges before moving into commercial real estate finance. Tim held a vice president position at a private commercial real estate fund before establishing SCG in fall 2014. He participates in every aspect of the firm\u2019s operations from origination to closing and serves as the primary contact for all capital providers.",
    education:
      "Bachelor\u2019s degree in International Business from Whitworth University, Spokane, WA.",
    personal:
      "Tim resides near Coeur d\u2019Alene, Idaho with his wife Annie and two sons, Porter and Jase. He is an avid outdoorsman who enjoys fishing Idaho panhandle lakes and rivers and bow hunting for elk in the Rockies.",
    email: "Tim@Sagecreekgroup.com",
    phone: "(208) 755-4809",
  },
  {
    name: "Pat McClatchey",
    title: "Senior Vice President",
    slug: "pat-mcclatchey",
    image: "/images/team/pat-mcclatchey.jpg",
    bio: "Pat joined Sage Creek Group in summer 2016 after a 30-year commercial real estate banking career. He manages originations and client relations in the Oregon market. Pat served as Senior Vice President for Umpqua Bank\u2019s commercial real estate division in Eugene, Oregon for 18 years, where he managed a team of 15 commercial loan officers and support staff. He created and managed the bank\u2019s Capital Markets Division, responsible for selling CRE loans to the secondary market, and structured and negotiated loan participations with banks in Oregon, Washington, and California. He also oversaw the bank\u2019s appraisal division and reviewed all CRE appraisals bank-wide.",
    education:
      "Attended Eastern Washington University. Graduate of the ABA\u2019s Stonier Graduate School of Banking in Delaware.",
    personal:
      "Pat is very active in his community, holding numerous board and service positions for sports teams, rotary clubs, and nonprofits in Eugene, Oregon.",
    email: "Pat@Sagecreekgroup.com",
    phone: "(541) 658-9011",
  },
  {
    name: "Jeff Verble",
    title: "Senior Vice President",
    slug: "jeff-verble",
    image: "/images/team/jeff-verble.jpg",
    bio: "Jeff began his real estate lending career over 30 years ago and has worked for several regional banks and credit unions in the Inland Northwest. He brings a wealth of knowledge and expertise to Sage Creek having navigated numerous economic cycles and shifts in the commercial real estate lending landscape. Jeff possesses a deep understanding of underwriting and leans heavily into relationships with his clients, many of whom he\u2019s worked with for decades. His commitment to providing informed guidance and personalized service fulfills Sage Creek\u2019s mantra: the best deal is the one that closes. Decades of experience in multifamily, construction and development, retail, and office allow Jeff to match the right loan product to the right deal.",
    education:
      "Bachelor\u2019s degree in Industrial Technology from Eastern Washington University.",
    personal:
      "When Jeff is not closing loans, he\u2019s either boating or enjoying time with his wife \u2014 on the boat.",
    email: "Jeff@Sagecreekgroup.com",
    phone: "(509) 991-8321",
  },
];

export default function AboutPage() {
  return (
    <>
      <HeroSection
        image="/images/heroes/about-hero.jpg"
        title="About Sage Creek Group"
        subtitle="Service-Driven. Results-Focused."
      />

      {/* Company Story */}
      <section className="bg-white py-24 px-6">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-serif text-3xl sm:text-4xl text-warmgray-heading leading-tight">
            A boutique firm built around one idea:
            <br />
            <em className="italic">get the deal closed.</em>
          </h2>
          <div className="mt-8 space-y-6 text-warmgray leading-relaxed text-lg text-left">
            <p>
              Sage Creek Group LLC is a commercial real estate finance advisory
              firm with a proven track record of sourcing both traditional and
              non-bank debt for almost any commercial real estate asset and
              scenario, nationwide. We provide our clients fast, reliable access
              to capital through a large suite of conventional, institutional,
              and non-bank financing products.
            </p>
            <p>
              As independent advisors, we are not affiliated with any single
              lender or capital source. This independence means we work for you
              — not a bank, not a fund, not a quota. We evaluate every option
              in the market and recommend the best solution for your deal.
            </p>
          </div>
        </div>
      </section>

      {/* Team — full bios */}
      <section className="bg-cream py-24 px-6">
        <div className="mx-auto max-w-5xl">
          <div className="text-center mb-16">
            <p className="text-xs uppercase tracking-[3px] text-sage-400 font-sans font-medium mb-4">
              Our Team
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl text-warmgray-heading">
              Meet the Team
            </h2>
          </div>

          <div className="space-y-16">
            {TEAM.map((member, i) => (
              <div
                key={member.slug}
                className={`flex flex-col ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"} gap-8 md:gap-12 items-start`}
              >
                {/* Photo */}
                <div className="w-full md:w-72 flex-shrink-0">
                  <div className="relative aspect-[3/4] rounded-sm overflow-hidden bg-navy-800/5">
                    {member.image ? (
                      <Image
                        src={member.image}
                        alt={member.name}
                        fill
                        className="object-cover object-top"
                        sizes="(max-width: 768px) 100vw, 288px"
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
                </div>

                {/* Bio */}
                <div className="flex-1">
                  <h3 className="font-serif text-2xl text-warmgray-heading">
                    {member.name}
                  </h3>
                  <p className="text-sage-400 text-sm font-medium mt-1 uppercase tracking-[2px]">
                    {member.title}
                  </p>

                  <p className="text-warmgray text-sm leading-relaxed mt-4">
                    {member.bio}
                  </p>

                  <p className="text-warmgray/80 text-sm leading-relaxed mt-3 italic">
                    {member.education}
                  </p>

                  <p className="text-warmgray/80 text-sm leading-relaxed mt-2 italic">
                    {member.personal}
                  </p>

                  {(member.email || member.phone) && (
                    <div className="flex flex-wrap items-center gap-4 mt-4 pt-4 border-t border-warmgray/10">
                      {member.email && (
                        <a
                          href={`mailto:${member.email}`}
                          className="text-navy-500 text-sm hover:text-sage-400 transition-colors"
                        >
                          {member.email}
                        </a>
                      )}
                      {member.phone && (
                        <a
                          href={`tel:${member.phone.replace(/[^+\d]/g, "")}`}
                          className="text-navy-500 text-sm hover:text-sage-400 transition-colors"
                        >
                          {member.phone}
                        </a>
                      )}
                      <Link
                        href="/contact"
                        className="inline-flex items-center gap-1 text-sage-400 text-sm font-medium hover:text-navy-500 transition-colors ml-auto"
                      >
                        Discuss a Deal <ArrowRight size={14} />
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-navy-800 py-20 px-6">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-serif text-3xl sm:text-4xl text-white">
            Ready to get your deal closed?
          </h2>
          <p className="mt-4 text-white/60 text-lg">
            Tell us about your project and we&rsquo;ll get to work.
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
