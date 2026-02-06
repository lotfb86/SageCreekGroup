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
