import legislativeData from '@/data/legislative-data';
import { MembersClient } from '@/components/members/MembersClient';

export default function MembersPage() {
  // Data fetching happens on the server
  const allMembers = legislativeData.getAllMembers();

  // Pre-compute stats on server
  const stats = {
    senateCount: allMembers.filter((m) => m.chamber === 'senate').length,
    houseCount: allMembers.filter((m) => m.chamber === 'house').length,
    republicanCount: allMembers.filter((m) => m.party === 'R').length,
    democratCount: allMembers.filter((m) => m.party === 'D').length,
  };

  return <MembersClient initialMembers={allMembers} stats={stats} />;
}
