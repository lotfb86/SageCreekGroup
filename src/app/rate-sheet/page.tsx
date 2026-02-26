import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Current Rate Sheet",
  robots: { index: false, follow: false },
};

/* ─── tiny helpers ─── */
const TH = ({ children }: { children: React.ReactNode }) => (
  <th className="px-3 py-2 text-left text-xs font-semibold text-white bg-navy-600 first:rounded-tl last:rounded-tr">
    {children}
  </th>
);
const TD = ({ children }: { children: React.ReactNode }) => (
  <td className="px-3 py-2 text-sm border-b border-navy-100">{children}</td>
);

function Table({
  headers,
  rows,
  note,
}: {
  headers: string[];
  rows: (string | number)[][];
  note?: string;
}) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse text-warmgray">
        <thead>
          <tr>
            {headers.map((h) => (
              <TH key={h}>{h}</TH>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-navy-50"}>
              {row.map((cell, j) => (
                <TD key={j}>{cell}</TD>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      {note && (
        <p className="mt-1 text-xs italic text-warmgray/70">{note}</p>
      )}
    </div>
  );
}

/* ─── section heading ─── */
function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="font-serif text-2xl font-semibold text-navy-700 mt-10 mb-4 border-b-2 border-sage-300 pb-1">
      {children}
    </h2>
  );
}

function SubHeading({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="font-serif text-lg font-semibold text-navy-600 mt-6 mb-2">
      {children}
    </h3>
  );
}

/* ─── page ─── */
export default function RateSheetPage() {
  return (
    <section className="bg-cream min-h-screen py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="font-serif text-4xl font-bold text-navy-800 mb-2">
            Sage Creek Group
          </h1>
          <p className="text-warmgray max-w-2xl mx-auto">
            <strong>The Sage Creek Group</strong> is a boutique commercial real
            estate finance intermediary with a proven track record of securing
            both traditional and non-bank financing for almost any commercial
            real estate asset and scenario.
          </p>
        </div>

        {/* Current Index Rates */}
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <h2 className="font-serif text-xl font-semibold text-navy-700 mb-3">
            Current Index Rates
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-8 gap-y-2 text-sm">
            {[
              ["5-Year Treasury", "3.60%"],
              ["7-Year Treasury", "3.80%"],
              ["10-Year Treasury", "4.04%"],
              ["30-day Avg SOFR", "3.67%"],
              ["1 Mo Term SOFR", "3.67%"],
              ["WSJ PRIME", "6.75%"],
            ].map(([label, val]) => (
              <div key={label} className="flex justify-between border-b border-navy-100 py-1">
                <span className="text-warmgray">{label}</span>
                <span className="font-semibold text-navy-700">{val}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ─── MULTIFAMILY ─── */}
        <SectionHeading>Multifamily</SectionHeading>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Left column */}
          <div>
            <SubHeading>Freddie Mac &mdash; Conventional</SubHeading>
            <Table
              headers={["Term", "LTV", "DSCR", "Spread", "Rate"]}
              rows={[
                ["10-Year", "55%", "1.55x", "95-100", "4.99%-5.04%"],
                ["10-Year", "65%", "1.35x", "105-120", "5.09%-5.24%"],
                ["10-Year", "80%", "1.25x", "115-135", "5.19%-5.39%"],
                ["7-Year", "55%", "1.55x", "100-110", "4.80%-4.90%"],
                ["7-Year", "65%", "1.35x", "115-135", "4.95%-5.15%"],
                ["7-Year", "80%", "1.25x", "135-155", "5.15%-5.35%"],
                ["5-Year", "55%", "1.55x", "105-115", "4.65%-4.75%"],
                ["5-Year", "65%", "1.35x", "115-135", "4.75%-4.95%"],
                ["5-Year", "80%", "1.25x", "140-160", "5.00%-5.20%"],
              ]}
            />

            <SubHeading>Fannie Mae &mdash; Conventional</SubHeading>
            <Table
              headers={["Term", "LTV", "DSCR", "Spread", "Rate"]}
              rows={[
                ["10-Year", "55%", "1.55x", "90-110", "4.94%-5.14%"],
                ["10-Year", "65%", "1.35x", "100-130", "5.04%-5.34%"],
                ["10-Year", "80%", "1.25x", "120-150", "5.24%-5.54%"],
                ["7-Year", "55%", "1.55x", "100-120", "4.80%-5.00%"],
                ["7-Year", "65%", "1.35x", "110-140", "4.90%-5.20%"],
                ["7-Year", "80%", "1.25x", "135-165", "5.15%-5.45%"],
                ["5-Year", "55%", "1.55x", "110-130", "4.70%-4.90%"],
                ["5-Year", "65%", "1.35x", "120-150", "5.00%-5.30%"],
                ["5-Year", "75%", "1.25x", "155-185", "5.35%-5.65%"],
              ]}
            />
          </div>

          {/* Right column */}
          <div>
            <SubHeading>FHA &mdash; 221(d)4 Construction / Permanent</SubHeading>
            <Table
              headers={["Term", "Amort", "LTV", "DSCR", "Rate"]}
              rows={[["40", "40", "87%", "1.15x", "5.50-5.95%"]]}
              note="Before MIP (Mortgage Insurance Premium)"
            />

            <SubHeading>FHA &mdash; 223(f) Refinancing</SubHeading>
            <Table
              headers={["Term", "Amort", "LTV", "DSCR", "Rate"]}
              rows={[["35", "35", "87%", "1.15x", "5.00-5.50%"]]}
              note="Before MIP (Mortgage Insurance Premium)"
            />

            <SubHeading>Bridge</SubHeading>
            <Table
              headers={["Term", "Amort", "LTV", "DSCR", "Rate"]}
              rows={[["1-5 Years", "IO", "75%", "1.00x", "From 6.50%"]]}
              note="In-house HUD/Agency Exit Available"
            />

            <SubHeading>CMBS &mdash; Full Term Interest Only Standard</SubHeading>
            <Table
              headers={["Term", "Amort", "LTV", "Spread (bps)", "Rate"]}
              rows={[
                ["5-Year", "30", "65-75%", "250-300", "6.10%-6.60%"],
                ["10-Year", "30", "65-75%", "225-275", "6.29%-6.79%"],
                ["5-Year", "30", "65-75%", "250-300", "6.10%-6.60%"],
                ["10-Year", "30", "65-75%", "225-275", "6.29%-6.79%"],
              ]}
              note="* Rate buy downs available on deal by deal basis."
            />
          </div>
        </div>

        {/* ─── COMMERCIAL ─── */}
        <SectionHeading>Commercial</SectionHeading>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Left column */}
          <div>
            <SubHeading>Construction &dagger;</SubHeading>
            <Table
              headers={["Term", "LTC", "Rate", "Guaranty"]}
              rows={[["3 Years", "75%", "UST + 275", "Recourse"]]}
              note="&dagger; Commercial bank pricing; contact us for current quotes."
            />

            <SubHeading>Non-Bank Multifamily &dagger;&dagger;</SubHeading>
            <Table
              headers={["Term", "LTV", "DSCR", "Spread (bps)", "Rate"]}
              rows={[
                ["5, 7, 10-Yr", "70%", "1.20x", "240-340", "6.00%-7.44% IO"],
              ]}
              note="&dagger;&dagger; Non-Recourse avail. <65% LTV &bull; Loans $3MM-$10MM &bull; Underwrites to Interest Only"
            />
          </div>

          {/* Right column */}
          <div>
            <SubHeading>Commercial</SubHeading>
            <Table
              headers={["Term", "Amort", "LTV", "Spread (bps)", "Rate"]}
              rows={[
                ["5-Year", "25-30", "50%-65%", "160-200", "5.20%-5.60%"],
                ["5-Year", "25-30", "60%-75%", "160-220", "5.20%-5.80%"],
                ["10-Year", "25-30", "50%-65%", "150-190", "5.54%-5.94%"],
                ["10-Year", "25-30", "60%-75%", "160-220", "5.64%-6.24%"],
              ]}
              note="* Rate buy downs available on deal by deal basis. All asset classes including MHPs, Hotels, &amp; Senior Housing. Non-Recourse Available."
            />
          </div>
        </div>

        {/* Footer */}
        <div className="mt-12 pt-6 border-t border-navy-200 text-center text-sm text-warmgray/70">
          <p>
            Rates are subject to change. Tim Van Valin @ 208.755.4809 or
            Tim@sagecreekgroup.com
          </p>
          <p className="mt-1 font-semibold text-navy-600">
            www.sagecreekgroup.com
          </p>
        </div>
      </div>
    </section>
  );
}
