import { NextResponse } from 'next/server';
import { fetchCalendarEvents, syncEventsToSheets, TechEvent } from '@/lib/google';

export async function GET(request: Request) {
  // Optional security: check for a cron secret token to prevent unauthorized access
  const authHeader = request.headers.get('authorization');
  if (
    process.env.CRON_SECRET &&
    authHeader !== `Bearer ${process.env.CRON_SECRET}`
  ) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    let events: TechEvent[] = [];

    // Fetch from Calendar if configured
    if (process.env.GOOGLE_CALENDAR_ID) {
      const calendarEvents = await fetchCalendarEvents(process.env.GOOGLE_CALENDAR_ID);
      events = [...events, ...calendarEvents];
    }



    // Sync to Sheets
    const success = await syncEventsToSheets(events);

    if (success) {
      return NextResponse.json({ message: 'Events synced successfully', count: events.length });
    } else {
      return NextResponse.json({ error: 'Failed to sync events to sheets. Write permissions require a Service Account Private Key.' }, { status: 500 });
    }
  } catch (error: any) {
    console.error('Cron job error:', error);
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}
