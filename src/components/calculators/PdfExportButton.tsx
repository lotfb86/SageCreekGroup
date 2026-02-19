"use client";

import { useState } from "react";
import { Download, Loader2 } from "lucide-react";
import type { PdfExportOptions } from "@/lib/pdf-export";
import { trackEvent } from "@/components/GoogleAnalytics";

interface PdfExportButtonProps {
  getOptions: () => PdfExportOptions;
}

/**
 * PDF download button. Lazy-loads jsPDF on click (zero initial bundle impact).
 * Fires a GA4 event on each download with calculator name and key inputs.
 */
export default function PdfExportButton({ getOptions }: PdfExportButtonProps) {
  const [loading, setLoading] = useState(false);

  const handleExport = async () => {
    setLoading(true);
    try {
      const options = getOptions();

      // Track the PDF download in Google Analytics
      trackEvent("pdf_download", {
        calculator: options.title,
        inputs: options.inputs.map((i) => `${i.label}: ${i.value}`).join(" | "),
      });

      const { generateCalculatorPdf } = await import("@/lib/pdf-export");
      await generateCalculatorPdf(options);
    } catch (err) {
      console.error("PDF export failed:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleExport}
      disabled={loading}
      className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs uppercase tracking-[1.5px] font-medium text-warmgray hover:text-warmgray-heading border border-warmgray/20 hover:border-warmgray/40 rounded-sm transition-colors disabled:opacity-50"
    >
      {loading ? (
        <Loader2 size={14} className="animate-spin" />
      ) : (
        <Download size={14} />
      )}
      PDF
    </button>
  );
}
