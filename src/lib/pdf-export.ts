/**
 * PDF Export Utility for Sage Creek CRE Calculators.
 * Lazy-loaded via dynamic import — zero impact on initial bundle.
 */

export interface PdfRow {
  label: string;
  value: string;
}

export interface PdfExportOptions {
  title: string;
  inputs: PdfRow[];
  results: PdfRow[];
  details?: PdfRow[]; // Optional extra table (amortization, waterfall tiers, etc.)
  detailsTitle?: string;
}

/* eslint-disable @typescript-eslint/no-explicit-any */

export async function generateCalculatorPdf(options: PdfExportOptions) {
  const jsPDFModule = await import("jspdf");
  const jsPDF = jsPDFModule.default;
  const autoTableModule = await import("jspdf-autotable");
  const autoTable = autoTableModule.default;

  const doc = new jsPDF("p", "mm", "a4") as any;
  const pageWidth = doc.internal.pageSize.getWidth();
  let y = 15;

  // Helper to run autoTable and get the final Y position
  const runAutoTable = (opts: any): number => {
    if (typeof doc.autoTable === "function") {
      doc.autoTable(opts);
      return doc.lastAutoTable?.finalY ?? opts.startY + 20;
    } else {
      autoTable(doc, opts);
      return (doc as any).lastAutoTable?.finalY ?? opts.startY + 20;
    }
  };

  // ── Header (Navy-800 bar) ────────────────────────────────
  doc.setFillColor(61, 90, 128); // navy-800
  doc.rect(0, 0, pageWidth, 30, "F");

  doc.setTextColor(255, 255, 255);
  doc.setFontSize(18);
  doc.setFont("helvetica", "bold");
  doc.text("Sage Creek Group", 15, 13);

  doc.setFontSize(9);
  doc.setFont("helvetica", "normal");
  doc.text("Commercial Real Estate Finance", 15, 20);

  doc.setFontSize(8);
  doc.text(
    new Date().toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }),
    pageWidth - 15,
    20,
    { align: "right" }
  );

  y = 40;

  // ── Calculator Title ─────────────────────────────────────
  doc.setTextColor(51, 51, 51);
  doc.setFontSize(14);
  doc.setFont("helvetica", "bold");
  doc.text(options.title, 15, y);
  y += 10;

  // ── Inputs Table ─────────────────────────────────────────
  y = runAutoTable({
    startY: y,
    head: [["Input", "Value"]],
    body: options.inputs.map((r) => [r.label, r.value]),
    theme: "grid",
    headStyles: {
      fillColor: [74, 155, 142], // sage-400
      textColor: [255, 255, 255],
      fontSize: 9,
      fontStyle: "bold",
    },
    bodyStyles: { fontSize: 9, textColor: [51, 51, 51] },
    alternateRowStyles: { fillColor: [248, 247, 244] }, // cream
    margin: { left: 15, right: 15 },
    tableWidth: "auto",
  }) + 8;

  // ── Results Table ────────────────────────────────────────
  y = runAutoTable({
    startY: y,
    head: [["Result", "Value"]],
    body: options.results.map((r) => [r.label, r.value]),
    theme: "grid",
    headStyles: {
      fillColor: [20, 31, 51], // navy-800 dark
      textColor: [255, 255, 255],
      fontSize: 9,
      fontStyle: "bold",
    },
    bodyStyles: { fontSize: 9, textColor: [51, 51, 51] },
    alternateRowStyles: { fillColor: [248, 247, 244] },
    margin: { left: 15, right: 15 },
    tableWidth: "auto",
  }) + 8;

  // ── Optional Details Table ───────────────────────────────
  if (options.details && options.details.length > 0) {
    if (options.detailsTitle) {
      doc.setFontSize(10);
      doc.setFont("helvetica", "bold");
      doc.setTextColor(51, 51, 51);
      doc.text(options.detailsTitle, 15, y);
      y += 5;
    }

    y = runAutoTable({
      startY: y,
      head: [["", ""]],
      body: options.details.map((r) => [r.label, r.value]),
      theme: "grid",
      headStyles: { fillColor: [200, 200, 200], fontSize: 8 },
      showHead: false,
      bodyStyles: { fontSize: 8, textColor: [80, 80, 80] },
      alternateRowStyles: { fillColor: [248, 247, 244] },
      margin: { left: 15, right: 15 },
      tableWidth: "auto",
    }) + 8;
  }

  // ── Footer ───────────────────────────────────────────────
  const footerY = doc.internal.pageSize.getHeight() - 15;
  doc.setFontSize(7);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(150, 150, 150);
  doc.text(
    "These calculators provide estimates for educational purposes only. Actual terms vary based on property type, location, borrower experience, and market conditions.",
    15,
    footerY
  );
  doc.text(
    "Sage Creek Group LLC · sagecreekgroup.com · Tim@SageCreekGroup.com · (208) 755-4809",
    15,
    footerY + 4
  );

  // ── Download ─────────────────────────────────────────────
  const safeName = options.title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/-+/g, "-");
  doc.save(`sage-creek-${safeName}-${Date.now()}.pdf`);
}
