import { Suspense } from 'react';
import legislativeData from '@/data/legislative-data';
import { BillsClient } from '@/components/bills/BillsClient';
import { Loader2 } from 'lucide-react';

// This is a SERVER component - data stays on the server
// Only the processed results are sent to the client

function BillsLoading() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center justify-center py-20">
        <Loader2 className="w-8 h-8 animate-spin text-mo-blue" />
        <span className="ml-2 text-gray-600">Loading bills...</span>
      </div>
    </div>
  );
}

export default function BillsPage() {
  // Data fetching happens on the server
  const allBills = legislativeData.getAllBills().map((bill) => legislativeData.getBillCard(bill));
  const topicsWithCounts = legislativeData.getTopicsWithCounts();

  // Pre-compute fiscal summary on server
  const withFiscal = allBills.filter((b) => b.fiscalNote !== null);
  const fiscalSummary = {
    count: withFiscal.length,
    totalImpact: withFiscal.reduce((sum, b) => sum + (b.fiscalNote?.netImpact || 0), 0),
    weightedImpact: withFiscal.reduce((sum, b) => sum + b.weightedFiscalImpact, 0),
  };

  return (
    <Suspense fallback={<BillsLoading />}>
      <BillsClient
        initialBills={allBills}
        topicsWithCounts={topicsWithCounts}
        fiscalSummary={fiscalSummary}
      />
    </Suspense>
  );
}
