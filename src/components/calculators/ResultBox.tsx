export default function ResultBox({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="bg-navy-800 rounded-sm p-6 text-center">
      <p className="text-white/60 text-xs uppercase tracking-[2px] mb-1">
        {label}
      </p>
      <p className="font-serif text-3xl text-white">{value}</p>
    </div>
  );
}
