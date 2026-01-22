import legislativeData from '@/data/legislative-data';
import { DashboardClient } from '@/components/dashboard/DashboardClient';

export default function DashboardPage() {
  // Data fetching happens on the server
  const stats = legislativeData.getStatistics();

  const senateCommittees = legislativeData
    .getCommitteesByChamber('senate')
    .map((c) => legislativeData.getCommitteeWithBills(c));

  const houseCommittees = legislativeData
    .getCommitteesByChamber('house')
    .map((c) => legislativeData.getCommitteeWithBills(c));

  const recentBills = legislativeData
    .getAllBills()
    .sort((a, b) => new Date(b.lastActionDate).getTime() - new Date(a.lastActionDate).getTime())
    .slice(0, 5)
    .map((bill) => legislativeData.getBillCard(bill));

  const today = new Date();
  const thirtyDaysFromNow = new Date(today);
  thirtyDaysFromNow.setDate(thirtyDaysFromNow.getDate() + 30);
  const upcomingEvents = legislativeData.getCalendarEvents(
    today.toISOString().split('T')[0],
    thirtyDaysFromNow.toISOString().split('T')[0]
  );

  const billsToWatch = legislativeData.getWatchBills().map((bill) => legislativeData.getBillCard(bill));

  const recentlyActiveBills = legislativeData
    .getRecentlyActiveBills(7)
    .slice(0, 10)
    .map((bill) => legislativeData.getBillCard(bill));

  return (
    <DashboardClient
      stats={stats}
      senateCommittees={senateCommittees}
      houseCommittees={houseCommittees}
      recentBills={recentBills}
      upcomingEvents={upcomingEvents}
      billsToWatch={billsToWatch}
      recentlyActiveBills={recentlyActiveBills}
    />
  );
}
