import legislativeData from '@/data/legislative-data';
import { CommitteesClient } from '@/components/committees/CommitteesClient';

export default function CommitteesPage() {
  // Data fetching happens on the server
  const allCommittees = legislativeData
    .getAllCommittees()
    .map((c) => legislativeData.getCommitteeWithBills(c));

  return <CommitteesClient initialCommittees={allCommittees} />;
}
