import Link from "next/link";
import Image from "next/image";
import type { Transaction } from "@/lib/transactions";

export default function TransactionCard({ tx }: { tx: Transaction }) {
  // Show up to 3 key terms as pills
  const termEntries = Object.entries(tx.terms || {}).slice(0, 3);

  return (
    <Link
      href={`/transactions/${tx.slug}`}
      className="group block bg-cream rounded-sm overflow-hidden hover:shadow-lg transition-shadow"
    >
      {tx.image && (
        <div className="relative h-44 overflow-hidden">
          <Image
            src={tx.image}
            alt={tx.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        </div>
      )}
      <div className="p-5">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-[10px] uppercase tracking-[2px] font-medium text-sage-400 bg-sage-400/10 px-2 py-0.5 rounded-sm">
            {tx.dealType}
          </span>
          <span className="text-[10px] uppercase tracking-[2px] font-medium text-navy-500 bg-navy-500/10 px-2 py-0.5 rounded-sm">
            {tx.propertyType}
          </span>
        </div>
        <h3 className="font-serif text-lg text-warmgray-heading leading-snug">
          {tx.amountDisplay}
        </h3>
        <p className="text-warmgray text-sm mt-1">{tx.title}</p>
        {(tx.city || tx.state) && (
          <p className="text-warmgray/60 text-xs mt-1">
            {[tx.city, tx.state].filter(Boolean).join(", ")}
          </p>
        )}
        {termEntries.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-3 pt-3 border-t border-warmgray/10">
            {termEntries.map(([key, value]) => (
              <span
                key={key}
                className="text-[10px] text-warmgray bg-warmgray/5 px-2 py-0.5 rounded-sm"
              >
                {value}
              </span>
            ))}
          </div>
        )}
      </div>
    </Link>
  );
}
