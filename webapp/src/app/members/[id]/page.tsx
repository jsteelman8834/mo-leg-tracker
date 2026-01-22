import { notFound } from 'next/navigation';
import legislativeData from '@/data/legislative-data';
import { MemberDetailClient } from '@/components/members/MemberDetailClient';

interface MemberPageProps {
  params: Promise<{ id: string }>;
}

export default async function MemberPage({ params }: MemberPageProps) {
  const { id } = await params;

  // Parse id format: "senate-28" or "house-001"
  const [chamber, district] = id.split('-');

  // Find member on server
  const members = legislativeData.getAllMembers();
  const member = members.find(
    (m) =>
      m.chamber === chamber &&
      (m.district === district || m.district === district.padStart(3, '0'))
  );

  if (!member) {
    notFound();
  }

  // Pre-compute all data on the server
  const sponsoredBills = legislativeData
    .getBillsForSponsor(member.id)
    .map((bill) => legislativeData.getBillCard(bill));

  const committees = legislativeData.getCommitteesForMember(member.id);

  return (
    <MemberDetailClient
      member={member}
      sponsoredBills={sponsoredBills}
      committees={committees}
    />
  );
}
