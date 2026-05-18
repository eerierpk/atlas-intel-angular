export function computeRoi(params: {
  capex: number;
  annualMaintenance: number;
  procedureRevenue: number;
  proceduresPerDay: number;
  operatingDaysPerYear: number;
  staffingCostPerYear: number;
  otherOperatingExpenses: number;
}) {
  const annualRevenue = params.procedureRevenue * params.proceduresPerDay * params.operatingDaysPerYear;
  const annualOperatingExpenses = params.annualMaintenance + params.staffingCostPerYear + params.otherOperatingExpenses;
  const annualEBITDA = annualRevenue - annualOperatingExpenses;
  
  const paybackPeriod = params.capex / annualEBITDA;
  const fiveYearROI = ((annualEBITDA * 5 - params.capex) / params.capex) * 100;
  
  return {
    annualRevenue,
    annualEBITDA,
    paybackPeriod: Math.round(paybackPeriod * 10) / 10,
    fiveYearROI: Math.round(fiveYearROI)
  };
}
