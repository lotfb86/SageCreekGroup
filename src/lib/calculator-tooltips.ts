/**
 * Plain-English CRE term definitions shown on hover/focus.
 * Keep definitions under ~30 words — concise enough for a tooltip.
 */
export const CRE_TOOLTIPS: Record<string, string> = {
  noi: "Net Operating Income — Gross revenue minus operating expenses, before debt service and taxes. The single most important number in CRE underwriting.",
  dscr: "Debt Service Coverage Ratio — NOI divided by annual debt payments. Lenders typically require 1.20–1.25x minimum. Higher = safer for the lender.",
  capRate: "Capitalization Rate — NOI divided by property value. Lower cap rates signal lower risk (or higher prices). Varies by market, asset class, and condition.",
  irr: "Internal Rate of Return — The annualized return that makes the net present value of all cash flows equal zero. Accounts for timing of money in and out.",
  equityMultiple: "Total cash returned divided by total equity invested. A 2.0x multiple means you doubled your money over the hold period.",
  ltv: "Loan-to-Value — Loan amount divided by property value. Higher LTV = more leverage but more risk. Typical CRE: 65–80%.",
  debtYield: "NOI divided by loan amount. A lender-focused metric (independent of rate and amortization). CMBS lenders typically require 8–10%+.",
  amortization: "The schedule over which the loan principal is fully repaid. CRE loans often have 25–30 year amortization with a shorter balloon term.",
  loanTerm: "The period until the loan matures (balloon date). Typical CRE terms: 5, 7, or 10 years — shorter than the amortization period.",
  balloon: "The remaining principal balance due at loan maturity. When the term is shorter than the amortization, a large 'balloon' payment is owed.",
  preferredReturn: "The minimum annual return paid to investors before the GP earns a promote. Typical pref: 6–8%. Ensures LPs get paid first.",
  promote: "The GP's share of profits above the preferred return. Rewards the operator for outperformance. Also called 'carried interest' or 'carry'.",
  blendedRate: "The weighted-average interest rate across multiple loan tranches. Accounts for the size and rate of each piece of debt.",
  interestReserve: "Cash set aside at closing to cover interest payments during construction or lease-up before the property generates income.",
  cashOnCash: "Annual pre-tax cash flow divided by total equity invested. A simple yield metric showing what percentage of your cash comes back each year.",
  primeRate: "The rate banks charge their most creditworthy borrowers. Construction loans are often priced relative to prime (e.g., Prime + 0.50%).",
  sofr: "Secured Overnight Financing Rate — The benchmark that replaced LIBOR. Bridge loans are often priced as SOFR + a spread (e.g., SOFR + 350 bps).",
  treasury: "U.S. Treasury yields — The risk-free benchmark. CRE permanent loans are typically priced as a spread over the 5-yr, 7-yr, or 10-yr Treasury.",
};
