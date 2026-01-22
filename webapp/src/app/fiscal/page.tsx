import legislativeData from '@/data/legislative-data';
import { FiscalClient } from '@/components/fiscal/FiscalClient';

// Session trajectory data (simulated)
function generateTrajectoryData() {
  const data = [];
  const startDate = new Date('2026-01-08');
  const today = new Date('2026-01-16');

  let runningTotal = 0;
  let weightedTotal = 0;

  for (let d = new Date(startDate); d <= today; d.setDate(d.getDate() + 1)) {
    const dayProgress = (d.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24);

    // Simulate fiscal impact accumulating
    runningTotal = -50000000 - (dayProgress * 30000000);
    weightedTotal = runningTotal * 0.35;

    data.push({
      date: d.toISOString().split('T')[0],
      label: `${d.getMonth() + 1}/${d.getDate()}`,
      rawImpact: runningTotal / 1_000_000,
      weightedImpact: weightedTotal / 1_000_000,
    });
  }

  return data;
}

export default function FiscalDashboardPage() {
  // Data fetching happens on the server
  const fiscalSummary = legislativeData.getSessionFiscalSummary();
  const committeeSummaries = legislativeData.getCommitteeFiscalSummaries();
  const riskQuadrantBills = legislativeData.getRiskQuadrantBills();
  const highImpactBills = legislativeData.getHighImpactBills(10_000_000);
  const billsWithFiscal = legislativeData.getBillsWithFiscalNotes();
  const trajectoryData = generateTrajectoryData();

  return (
    <FiscalClient
      fiscalSummary={fiscalSummary}
      committeeSummaries={committeeSummaries}
      riskQuadrantBills={riskQuadrantBills}
      highImpactBills={highImpactBills}
      billsWithFiscal={billsWithFiscal}
      trajectoryData={trajectoryData}
    />
  );
}
