// CRE Loan Payment Calculator
export function calculateMonthlyPayment(
  loanAmount: number,
  annualRate: number,
  amortizationYears: number
): number {
  const monthlyRate = annualRate / 100 / 12;
  const numPayments = amortizationYears * 12;
  if (monthlyRate === 0) return loanAmount / numPayments;
  return (
    (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, numPayments)) /
    (Math.pow(1 + monthlyRate, numPayments) - 1)
  );
}

// DSCR Calculator
export function calculateDSCR(
  noi: number,
  annualDebtService: number
): number {
  if (annualDebtService === 0) return 0;
  return noi / annualDebtService;
}

// Max Loan Amount Calculator
export function calculateMaxLoanAmount(
  noi: number,
  annualRate: number,
  amortizationYears: number,
  targetDSCR: number
): number {
  const maxAnnualDebtService = noi / targetDSCR;
  const monthlyPayment = maxAnnualDebtService / 12;
  const monthlyRate = annualRate / 100 / 12;
  const numPayments = amortizationYears * 12;
  if (monthlyRate === 0) return monthlyPayment * numPayments;
  return (
    (monthlyPayment * (Math.pow(1 + monthlyRate, numPayments) - 1)) /
    (monthlyRate * Math.pow(1 + monthlyRate, numPayments))
  );
}

// ===== Mortgage Calculator Suite Functions =====

// Cap Rate Calculator
export function calculateCapRate(
  noi: number,
  propertyValue: number
): number {
  if (propertyValue === 0) return 0;
  return noi / propertyValue;
}

// Property Valuation from Cap Rate
export function calculatePropertyValueFromCapRate(
  noi: number,
  capRate: number
): number {
  if (capRate === 0) return 0;
  return noi / capRate;
}

// Blended Mortgage Rate
export interface LoanTranche {
  amount: number;
  rate: number; // annual percentage, e.g. 5.5
  points?: number; // origination points, e.g. 1.0 = 1%
}

export function calculateBlendedRate(tranches: LoanTranche[]): number {
  const totalAmount = tranches.reduce((sum, t) => sum + t.amount, 0);
  if (totalAmount === 0) return 0;
  const weightedSum = tranches.reduce((sum, t) => sum + t.amount * t.rate, 0);
  return weightedSum / totalAmount;
}

/**
 * Calculate the effective rate for a single tranche including points.
 * Points are amortized over the loan term to get the true annualized cost.
 * Formula: effectiveRate = baseRate + (points / termInYears)
 */
export function calculateEffectiveRateWithPoints(
  rate: number,
  points: number,
  termMonths: number
): number {
  if (termMonths <= 0) return rate;
  const termYears = termMonths / 12;
  return rate + (points / termYears);
}

/**
 * Calculate blended effective rate across all tranches, including points.
 */
export function calculateBlendedEffectiveRate(
  tranches: LoanTranche[],
  termMonths: number
): number {
  const totalAmount = tranches.reduce((sum, t) => sum + t.amount, 0);
  if (totalAmount === 0 || termMonths <= 0) return 0;
  const weightedSum = tranches.reduce((sum, t) => {
    const effectiveRate = calculateEffectiveRateWithPoints(
      t.rate,
      t.points ?? 0,
      termMonths
    );
    return sum + t.amount * effectiveRate;
  }, 0);
  return weightedSum / totalAmount;
}

// Cash-on-Cash Return
export function calculateCashOnCash(
  annualPreTaxCashFlow: number,
  totalCashInvested: number
): number {
  if (totalCashInvested === 0) return 0;
  return annualPreTaxCashFlow / totalCashInvested;
}

// IRR & Equity Multiple
export interface IrrResult {
  irr: number; // decimal, e.g. 0.15 for 15%
  equityMultiple: number; // e.g. 2.1
}

export function calculateIrrAndEquityMultiple(
  initialInvestment: number,
  cashFlows: number[],
  exitProceeds: number
): IrrResult {
  if (initialInvestment === 0 || cashFlows.length === 0) {
    return { irr: 0, equityMultiple: 0 };
  }

  // Build full cash flow array: [-investment, cf1, cf2, ..., cfN + exit]
  const flows = [-initialInvestment, ...cashFlows];
  flows[flows.length - 1] += exitProceeds;

  // Equity Multiple
  const totalInflows = cashFlows.reduce((s, cf) => s + cf, 0) + exitProceeds;
  const equityMultiple = totalInflows / initialInvestment;

  // IRR via Newton-Raphson
  let guess = 0.1;
  for (let i = 0; i < 200; i++) {
    let npv = 0;
    let dnpv = 0;
    for (let t = 0; t < flows.length; t++) {
      const factor = Math.pow(1 + guess, t);
      if (factor === 0) break;
      npv += flows[t] / factor;
      dnpv -= (t * flows[t]) / Math.pow(1 + guess, t + 1);
    }
    if (Math.abs(dnpv) < 1e-12) break;
    const newGuess = guess - npv / dnpv;
    if (Math.abs(newGuess - guess) < 1e-7) {
      guess = newGuess;
      break;
    }
    guess = newGuess;
    // Clamp to prevent divergence
    if (guess < -0.99) guess = -0.99;
    if (guess > 10) guess = 10;
  }

  return {
    irr: isFinite(guess) ? guess : 0,
    equityMultiple,
  };
}

// Equity Waterfall Distribution
export interface WaterfallTier {
  label: string;
  hurdleRate: number; // decimal, e.g. 0.08 for 8%
  lpSplit: number; // decimal, e.g. 0.80
  gpSplit: number; // decimal, e.g. 0.20
}

export interface WaterfallTierResult {
  tierLabel: string;
  lpAmount: number;
  gpAmount: number;
}

export interface WaterfallResult {
  tiers: WaterfallTierResult[];
  totalToLP: number;
  totalToGP: number;
}

export function calculateEquityWaterfall(
  totalDistributable: number,
  lpEquity: number,
  gpEquity: number,
  tiers: WaterfallTier[]
): WaterfallResult {
  const totalEquity = lpEquity + gpEquity;
  const results: WaterfallTierResult[] = [];
  let remaining = totalDistributable;
  let totalToLP = 0;
  let totalToGP = 0;

  // Tier 0: Return of Capital (pro-rata)
  const capitalReturn = Math.min(remaining, totalEquity);
  const lpCapital = totalEquity > 0 ? capitalReturn * (lpEquity / totalEquity) : 0;
  const gpCapital = totalEquity > 0 ? capitalReturn * (gpEquity / totalEquity) : 0;
  results.push({ tierLabel: "Return of Capital", lpAmount: lpCapital, gpAmount: gpCapital });
  totalToLP += lpCapital;
  totalToGP += gpCapital;
  remaining -= capitalReturn;

  // Subsequent tiers
  for (const tier of tiers) {
    if (remaining <= 0) break;
    const tierTarget = totalEquity * tier.hurdleRate;
    const tierAmount = Math.min(remaining, tierTarget);
    const lpAmt = tierAmount * tier.lpSplit;
    const gpAmt = tierAmount * tier.gpSplit;
    results.push({ tierLabel: tier.label, lpAmount: lpAmt, gpAmount: gpAmt });
    totalToLP += lpAmt;
    totalToGP += gpAmt;
    remaining -= tierAmount;
  }

  // Residual (anything above all hurdles) split 50/50
  if (remaining > 0) {
    const lpAmt = remaining * 0.5;
    const gpAmt = remaining * 0.5;
    results.push({ tierLabel: "Residual (Above All Hurdles)", lpAmount: lpAmt, gpAmount: gpAmt });
    totalToLP += lpAmt;
    totalToGP += gpAmt;
  }

  return { tiers: results, totalToLP, totalToGP };
}

// Partner Equity Split
export interface Partner {
  name: string;
  contribution: number;
}

export interface PartnerSplitResult {
  partners: {
    name: string;
    contribution: number;
    ownershipPct: number;
    distribution: number;
  }[];
  totalContributed: number;
  totalDistributed: number;
}

export function calculatePartnerEquitySplit(
  partners: Partner[],
  totalDistribution: number
): PartnerSplitResult {
  const totalContributed = partners.reduce((sum, p) => sum + p.contribution, 0);

  const result = partners.map((p) => {
    const ownershipPct = totalContributed > 0 ? p.contribution / totalContributed : 0;
    return {
      name: p.name,
      contribution: p.contribution,
      ownershipPct,
      distribution: totalDistribution * ownershipPct,
    };
  });

  return {
    partners: result,
    totalContributed,
    totalDistributed: totalDistribution,
  };
}

// Loan Balance at Term End (for balloon payment calculation)
export function calculateBalloonBalance(
  loanAmount: number,
  annualRate: number,
  amortizationYears: number,
  loanTermYears: number
): number {
  const monthlyRate = annualRate / 100 / 12;
  const numAmortPayments = amortizationYears * 12;
  const numTermPayments = loanTermYears * 12;

  if (monthlyRate === 0) {
    return loanAmount * (1 - numTermPayments / numAmortPayments);
  }

  const monthlyPayment = calculateMonthlyPayment(loanAmount, annualRate, amortizationYears);
  // Remaining balance formula after n payments
  const balance =
    loanAmount * Math.pow(1 + monthlyRate, numTermPayments) -
    monthlyPayment *
      ((Math.pow(1 + monthlyRate, numTermPayments) - 1) / monthlyRate);

  return Math.max(0, balance);
}

// ===== Phase 4: New Calculators =====

// Debt Yield — NOI / Loan Amount
export function calculateDebtYield(noi: number, loanAmount: number): number {
  if (loanAmount === 0) return 0;
  return noi / loanAmount;
}

// Loan-to-Value
export function calculateLTV(loanAmount: number, propertyValue: number): number {
  if (propertyValue === 0) return 0;
  return loanAmount / propertyValue;
}

// Construction Loan Interest Reserve
export interface ConstructionDrawMonth {
  month: number;
  cumulativeDrawn: number;
  interestPayment: number;
}

export interface ConstructionInterestReserveResult {
  totalReserve: number;
  monthlyBreakdown: ConstructionDrawMonth[];
  avgOutstandingBalance: number;
}

export function calculateConstructionInterestReserve(
  totalBudget: number,
  drawPeriodMonths: number,
  leaseUpMonths: number,
  annualRate: number
): ConstructionInterestReserveResult {
  const monthlyRate = annualRate / 100 / 12;
  const totalMonths = drawPeriodMonths + leaseUpMonths;
  const monthlyDraw = drawPeriodMonths > 0 ? totalBudget / drawPeriodMonths : 0;
  const breakdown: ConstructionDrawMonth[] = [];
  let totalReserve = 0;
  let cumulativeDrawn = 0;
  let balanceSum = 0;

  for (let m = 1; m <= totalMonths; m++) {
    // During draw period, funds are disbursed monthly
    if (m <= drawPeriodMonths) {
      cumulativeDrawn += monthlyDraw;
    }
    // Interest accrues on the cumulative balance
    const interestPayment = cumulativeDrawn * monthlyRate;
    totalReserve += interestPayment;
    balanceSum += cumulativeDrawn;

    breakdown.push({
      month: m,
      cumulativeDrawn,
      interestPayment,
    });
  }

  return {
    totalReserve,
    monthlyBreakdown: breakdown,
    avgOutstandingBalance: totalMonths > 0 ? balanceSum / totalMonths : 0,
  };
}

// Refinance Savings
export interface RefinanceSavingsResult {
  currentMonthly: number;
  newMonthly: number;
  monthlySavings: number;
  annualSavings: number;
  lifetimeSavings: number;
  breakEvenMonths: number;
}

export function calculateRefinanceSavings(
  currentBalance: number,
  currentRate: number,
  currentRemainingYears: number,
  newAmount: number,
  newRate: number,
  newAmortYears: number,
  closingCosts: number
): RefinanceSavingsResult {
  const currentMonthly = calculateMonthlyPayment(
    currentBalance,
    currentRate,
    currentRemainingYears
  );
  const newMonthly = calculateMonthlyPayment(newAmount, newRate, newAmortYears);
  const monthlySavings = currentMonthly - newMonthly;
  const annualSavings = monthlySavings * 12;
  const lifetimeSavings =
    monthlySavings * newAmortYears * 12 - closingCosts;
  const breakEvenMonths =
    monthlySavings > 0 ? Math.ceil(closingCosts / monthlySavings) : 0;

  return {
    currentMonthly,
    newMonthly,
    monthlySavings,
    annualSavings,
    lifetimeSavings,
    breakEvenMonths,
  };
}
