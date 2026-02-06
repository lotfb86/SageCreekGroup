import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Phone, Mail } from "lucide-react";

interface TeamMember {
  name: string;
  title: string;
  slug: string;
  image: string | null;
  phone: string;
  email: string;
  bio: string[];
}

const TEAM_DATA: TeamMember[] = [
  {
    name: "Tim Van Valin",
    title: "Managing Director",
    slug: "tim-van-valin",
    image: "/images/team/tim-van-valin.jpg",
    phone: "(208) 755-4809",
    email: "Tim@SageCreekGroup.com",
    bio: [
      "Tim Van Valin is the Managing Director and founder of Sage Creek Group LLC, a boutique commercial real estate finance advisory firm he established in 2014.",
      "With decades of experience in commercial real estate lending, Tim has built a reputation for delivering exceptional financing outcomes for borrowers across the Pacific Northwest and nationwide. His career spans roles in commercial banking, mortgage banking, and advisory services, giving him a comprehensive understanding of the capital markets from every angle.",
      "Tim's approach is rooted in relationship-driven service and deep market knowledge. He maintains active relationships with hundreds of capital sources — from national banks and life insurance companies to CMBS lenders, agencies, debt funds, and private capital providers. This extensive network, combined with his expertise in deal structuring, allows him to consistently identify and secure the most competitive financing terms available.",
      "Throughout his career, Tim has been involved in more than $500 million in commercial real estate debt transactions, spanning multifamily, industrial, office, retail, hospitality, senior housing, and mixed-use properties. He is known for his integrity, responsiveness, and commitment to achieving the best possible outcome for every client.",
      "Tim is based in Idaho and serves clients throughout the Pacific Northwest and across the country.",
    ],
  },
  {
    name: "Pat McClatchey",
    title: "Senior Vice President",
    slug: "pat-mcclatchey",
    image: "/images/team/pat-mcclatchey.jpg",
    phone: "(541) 658-9011",
    email: "Pat@SageCreekGroup.com",
    bio: [
      "Pat McClatchey serves as Senior Vice President at Sage Creek Group LLC, bringing decades of commercial banking and real estate finance experience to the firm.",
      "Pat's career in commercial lending has given him deep expertise in credit analysis, loan structuring, and risk assessment. He has worked with borrowers and lenders across a wide range of property types and deal structures, from straightforward permanent financings to complex construction and bridge loan transactions.",
      "At Sage Creek Group, Pat plays a key role in deal origination, lender relationship management, and transaction execution. His banking background provides clients with valuable insight into lender decision-making processes and credit requirements, helping to position deals for optimal results.",
      "Pat is particularly skilled at navigating complex transactions that require creative structuring or multiple capital sources. His methodical approach to underwriting and his strong relationships with lenders across the country make him an invaluable resource for borrowers seeking competitive financing.",
      "Pat is based in Oregon and serves clients throughout the Pacific Northwest.",
    ],
  },
  {
    name: "Jeff Verble",
    title: "Vice President",
    slug: "jeff-verble",
    image: "/images/team/jeff-verble.jpg",
    phone: "",
    email: "",
    bio: [
      "Jeff Verble serves as Vice President at Sage Creek Group LLC, supporting the firm's deal origination and execution activities.",
      "Jeff brings a strong analytical background to Sage Creek Group, with experience in financial modeling, market research, and transaction management. He works closely with Tim and Pat to prepare comprehensive loan packages, coordinate with lenders during the underwriting process, and manage deals through closing.",
      "In his role, Jeff handles deal flow management, prepares detailed property and market analyses, and maintains the firm's pipeline tracking and reporting. His attention to detail and organizational skills help ensure that every transaction moves efficiently from initial engagement through closing.",
      "Jeff is dedicated to client service and plays a key role in maintaining the high level of communication and responsiveness that Sage Creek Group is known for.",
    ],
  },
];

export function generateStaticParams() {
  return TEAM_DATA.map((member) => ({ slug: member.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const member = TEAM_DATA.find((m) => m.slug === slug);
  if (!member) return {};
  return {
    title: `${member.name} — ${member.title}`,
    description: member.bio[0],
  };
}

export default async function TeamMemberPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const member = TEAM_DATA.find((m) => m.slug === slug);
  if (!member) notFound();

  return (
    <>
      {/* Spacer for fixed header */}
      <div className="h-20" />

      <section className="bg-white py-16 px-6">
        <div className="mx-auto max-w-4xl">
          <Link
            href="/about"
            className="inline-flex items-center gap-2 text-navy-500 text-sm uppercase tracking-[2px] font-medium hover:text-sage-400 transition-colors mb-8"
          >
            <ArrowLeft size={16} /> Back to Team
          </Link>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {/* Photo + Contact */}
            <div>
              <div className="relative aspect-[3/4] rounded-sm overflow-hidden bg-navy-800/5 mb-6">
                {member.image ? (
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover object-top"
                    sizes="(max-width: 768px) 100vw, 33vw"
                    priority
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <span className="font-serif text-7xl text-navy-500/20">
                      {member.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </span>
                  </div>
                )}
              </div>

              {(member.phone || member.email) && (
                <div className="space-y-2">
                  {member.phone && (
                    <a
                      href={`tel:${member.phone}`}
                      className="flex items-center gap-2 text-warmgray text-sm hover:text-sage-400 transition-colors"
                    >
                      <Phone size={14} /> {member.phone}
                    </a>
                  )}
                  {member.email && (
                    <a
                      href={`mailto:${member.email}`}
                      className="flex items-center gap-2 text-warmgray text-sm hover:text-sage-400 transition-colors"
                    >
                      <Mail size={14} /> {member.email}
                    </a>
                  )}
                </div>
              )}
            </div>

            {/* Bio */}
            <div className="md:col-span-2">
              <p className="text-sage-400 text-xs uppercase tracking-[2px] font-medium mb-2">
                {member.title}
              </p>
              <h1 className="font-serif text-3xl sm:text-4xl text-warmgray-heading mb-8">
                {member.name}
              </h1>
              <div className="space-y-5 text-warmgray leading-relaxed">
                {member.bio.map((paragraph, i) => (
                  <p key={i}>{paragraph}</p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
