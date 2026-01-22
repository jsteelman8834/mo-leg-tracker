import { notFound } from 'next/navigation';
import legislativeData from '@/data/legislative-data';
import { CommitteeDetailClient } from '@/components/committees/CommitteeDetailClient';

interface CommitteePageProps {
  params: Promise<{ id: string }>;
}

export default async function CommitteePage({ params }: CommitteePageProps) {
  const { id } = await params;

  // Try to find the committee by looking for the ID that ends with the slug
  const committees = legislativeData.getAllCommittees();
  const committee = committees.find((c) => c.id.endsWith(`:${id}`) || c.id === id);

  if (!committee) {
    notFound();
  }

  // Pre-compute all data on the server
  const committeeData = legislativeData.getCommitteeWithBills(committee);
  const { bills, members, upcomingHearings } = committeeData;

  // Pre-compute hearing bills map on server
  const hearingBillsMap: Record<string, typeof bills[0]['bill'][]> = {};
  for (const hearing of upcomingHearings) {
    hearingBillsMap[hearing.id] = legislativeData.getBillsForHearing(hearing.id);
  }

  return (
    <CommitteeDetailClient
      committee={committee}
      bills={bills}
      members={members}
      upcomingHearings={upcomingHearings}
      hearingBillsMap={hearingBillsMap}
    />
  );
}
