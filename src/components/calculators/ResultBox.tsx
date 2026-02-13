export default function ResultBox({
  label,
  value,
  highlight,
}: {
  label: string;
  value: string;
  highlight?: boolean;
}) {
  return (
    <div
      className={`rounded-sm p-6 text-center ${
        highlight
          ? "bg-sage-400 ring-2 ring-sage-400/30"
          : "bg-navy-800"
      }`}
    >
      <p className="text-white/60 text-xs uppercase tracking-[2px] mb-1">
        {label}
      </p>
      <p className="font-serif text-3xl text-white">{value}</p>
    </div>
  );
}
