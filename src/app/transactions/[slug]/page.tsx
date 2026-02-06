import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import {
  getAllTransactions,
  getTransactionBySlug,
  getRelatedTransactions,
} from "@/lib/transactions";
import TransactionCard from "@/components/transactions/TransactionCard";

export function generateStaticParams() {
  return getAllTransactions().map((tx) => ({ slug: tx.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const tx = getTransactionBySlug(slug);
  if (!tx) return {};
  return {
    title: `${tx.amountDisplay} ${tx.dealType} — ${tx.title}`,
    description: tx.description,
  };
}

export default async function TransactionDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const tx = getTransactionBySlug(slug);
  if (!tx) notFound();

  const related = getRelatedTransactions(tx, 3);

  return (
    <>
      {/* Spacer for fixed header */}
      <div className="h-20" />

      <section className="bg-white py-16 px-6">
        <div className="mx-auto max-w-5xl">
          <Link
            href="/transactions"
            className="inline-flex items-center gap-2 text-navy-500 text-sm uppercase tracking-[2px] font-medium hover:text-sage-400 transition-colors mb-8"
          >
            <ArrowLeft size={16} /> All Transactions
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-3">
              {tx.image && (
                <div className="relative h-64 sm:h-80 rounded-sm overflow-hidden mb-8">
                  <Image
                    src={tx.image}
                    alt={tx.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 60vw"
                    priority
                  />
                </div>
              )}

              <div className="flex items-center gap-2 mb-4">
                <span className="text-[10px] uppercase tracking-[2px] font-medium text-sage-400 bg-sage-400/10 px-2 py-0.5 rounded-sm">
                  {tx.dealType}
                </span>
                <span className="text-[10px] uppercase tracking-[2px] font-medium text-navy-500 bg-navy-500/10 px-2 py-0.5 rounded-sm">
                  {tx.propertyType}
                </span>
              </div>

              <h1 className="font-serif text-3xl sm:text-4xl text-warmgray-heading leading-tight">
                {tx.amountDisplay}
              </h1>
              <h2 className="font-serif text-xl text-warmgray-heading mt-2">
                {tx.title}
              </h2>
              <p className="text-warmgray/60 text-sm mt-1">
                {tx.city}, {tx.state}
              </p>

              <div className="mt-8">
                <p className="text-warmgray leading-relaxed">
                  {tx.description}
                </p>
              </div>
            </div>

            {/* Terms Sidebar */}
            <div className="lg:col-span-2">
              <div className="bg-cream rounded-sm p-8 sticky top-28">
                <h3 className="font-serif text-lg text-warmgray-heading mb-6">
                  Deal Terms
                </h3>
                <div className="space-y-4">
                  {Object.entries(tx.terms).map(([key, value]) => (
                    <div
                      key={key}
                      className="flex justify-between py-2 border-b border-warmgray/10"
                    >
                      <span className="text-warmgray text-sm">{key}</span>
                      <span className="text-warmgray-heading font-medium text-sm">
                        {value}
                      </span>
                    </div>
                  ))}
                </div>

                <Link
                  href="/contact"
                  className="mt-8 w-full inline-flex items-center justify-center gap-2 px-6 py-3 bg-navy-800 text-white font-sans text-sm uppercase tracking-[2px] font-medium hover:bg-navy-500 transition-all rounded-sm"
                >
                  Discuss a Similar Deal <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Transactions */}
      {related.length > 0 && (
        <section className="bg-cream py-20 px-6">
          <div className="mx-auto max-w-6xl">
            <h3 className="font-serif text-2xl text-warmgray-heading mb-8">
              Related Transactions
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {related.map((rtx) => (
                <TransactionCard key={rtx.id} tx={rtx} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
