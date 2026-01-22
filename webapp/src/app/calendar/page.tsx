import legislativeData from '@/data/legislative-data';
import { CalendarClient } from '@/components/calendar/CalendarClient';

export default function CalendarPage() {
  // Data fetching happens on the server
  const startOfYear = '2026-01-01';
  const endOfYear = '2026-12-31';
  const allEvents = legislativeData.getCalendarEvents(startOfYear, endOfYear);
  const upcomingHearings = legislativeData.getUpcomingHearings();

  return (
    <CalendarClient
      allEvents={allEvents}
      upcomingHearingsCount={upcomingHearings.length}
    />
  );
}
