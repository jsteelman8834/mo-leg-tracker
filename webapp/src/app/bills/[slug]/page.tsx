import { notFound } from 'next/navigation';
import legislativeData from '@/data/legislative-data';
import { getPassageProbability } from '@/lib/fiscal-utils';
import { BillDetailClient } from '@/components/bills/BillDetailClient';

interface BillPageProps {
  params: Promise<{ slug: string }>;
}

export default async function BillPage({ params }: BillPageProps) {
  const { slug } = await params;

  // Convert slug (e.g., "sb-834") to bill number (e.g., "SB 834")
  const billNumber = slug.toUpperCase().replace('-', ' ');

  const bill = legislativeData.getBillByNumber(billNumber);

  if (!bill) {
    notFound();
  }

  // Pre-compute all data on the server
  const sponsor = legislativeData.getSponsorForBill(bill.id);
  const coSponsors = legislativeData.getCoSponsorsForBill(bill.id);
  const actions = legislativeData.getActionsForBill(bill.id);
  const summary = legislativeData.getSummaryForBill(bill.id);
  const fiscalNote = legislativeData.getFiscalNoteForBill(bill.id);
  const billVersions = legislativeData.getBillVersionsForBill(bill.id);
  const passageProbability = getPassageProbability(bill.currentStatus);
  const committee = bill.currentCommittee
    ? legislativeData.getCommitteeById(bill.currentCommittee)
    : null;
  const hearings = legislativeData.getHearingsForBill(bill.id);

  return (
    <BillDetailClient
      bill={bill}
      sponsor={sponsor}
      coSponsors={coSponsors}
      actions={actions}
      summary={summary}
      fiscalNote={fiscalNote}
      billVersions={billVersions}
      passageProbability={passageProbability}
      committee={committee}
      hearings={hearings}
    />
  );
}
