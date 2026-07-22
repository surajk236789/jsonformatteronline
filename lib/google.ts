import { google } from 'googleapis';

export type TechEvent = {
  title: string;
  date: string; // ISO format or readable date
  location: string;
  organizer: string;
  description: string;
  agenda: string;
  registrationLink: string;
  promoVideo: string;
  tags: string[];
  slug: string;
};

// Authentication setup for Sheets
const getAuthClient = () => {
  if (!process.env.GOOGLE_CLIENT_EMAIL || !process.env.GOOGLE_PRIVATE_KEY) {
    console.warn('Google Sheets Credentials not found.');
    return null;
  }
  
  return new google.auth.JWT({
    email: process.env.GOOGLE_CLIENT_EMAIL,
    key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
    scopes: [
      'https://www.googleapis.com/auth/spreadsheets',
    ]
  });
};

// Authentication setup for Calendar
const getCalendarAuthClient = () => {
  if (!process.env.GOOGLE_CALENDAR_CLIENT_EMAIL || !process.env.GOOGLE_CALENDAR_PRIVATE_KEY) {
    console.warn('Google Calendar Credentials not found.');
    return null;
  }
  
  return new google.auth.JWT({
    email: process.env.GOOGLE_CALENDAR_CLIENT_EMAIL,
    key: process.env.GOOGLE_CALENDAR_PRIVATE_KEY.replace(/\\n/g, '\n'),
    scopes: [
      'https://www.googleapis.com/auth/calendar.readonly'
    ]
  });
};

// Fetch events from Google Calendar (used by cron)
export const fetchCalendarEvents = async (calendarId: string): Promise<TechEvent[]> => {
  const auth = getCalendarAuthClient();
  if (!auth) return [];

  const calendar = google.calendar({ version: 'v3', auth });
  
  try {
    const response = await calendar.events.list({
      calendarId: calendarId,
      timeMin: new Date().toISOString(),
      maxResults: 50,
      singleEvents: true,
      orderBy: 'startTime',
    });

    const events = response.data.items || [];
    return events.map((item) => {
      const title = item.summary || 'Untitled Event';
      const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
      
      const desc = item.description || '';
      // Smart extraction for Registration/Join links from the description
      const keywordMatch = desc.match(/(?:register|rsvp|join|link|tickets)[\s:-]+(https?:\/\/[^\s<]+)/i);
      const firstUrlMatch = desc.match(/(https?:\/\/[^\s<]+)/);
      const parsedLink = keywordMatch ? keywordMatch[1] : (firstUrlMatch ? firstUrlMatch[1] : '');

      return {
        title: title,
        date: item.start?.dateTime || item.start?.date || '',
        location: item.location || 'Online',
        organizer: item.organizer?.displayName || 'Community Host',
        description: desc,
        agenda: 'TBD', // Parsed from description normally, but hard to extract automatically
        registrationLink: parsedLink || item.hangoutLink || item.htmlLink || '',
        promoVideo: '', // No default promo video
        tags: ['Calendar'],
        slug: slug,
      };
    });
  } catch (error) {
    console.error('Error fetching calendar events:', error);
    return [];
  }
};

// Sync events to Google Sheets (used by cron)
export const syncEventsToSheets = async (events: TechEvent[]) => {
  const auth = getAuthClient();
  const spreadsheetId = process.env.GOOGLE_SPREADSHEET_ID;
  
  if (!auth || !spreadsheetId) return false;

  const sheets = google.sheets({ version: 'v4', auth });
  
  // Prepare data for sheets (10 columns)
  const values = events.map(event => [
    event.title,
    event.date,
    event.location,
    event.organizer,
    event.description,
    event.agenda,
    event.registrationLink,
    event.promoVideo,
    event.tags.join(', '),
    event.slug
  ]);
  
  // Prepend Header Row for human readability
  values.unshift([
    'Title', 
    'Date & Time', 
    'Location', 
    'Organizer', 
    'Description', 
    'Agenda', 
    'Registration Link', 
    'Trailer/Promo Video', 
    'Tags', 
    'Slug (Do Not Edit)'
  ]);
  
  try {
    await sheets.spreadsheets.values.clear({
      spreadsheetId,
      range: 'Sheet1!A1:J',
    });

    if (values.length > 0) {
      await sheets.spreadsheets.values.update({
        spreadsheetId,
        range: 'Sheet1!A1:J',
        valueInputOption: 'RAW',
        requestBody: { values },
      });
    }
    
    return true;
  } catch (error) {
    console.error('Error syncing to sheets:', error);
    return false;
  }
};



// Get events directly from Google Sheets (used by frontend)
export const getEventsFromSheets = async (): Promise<TechEvent[]> => {
  const auth = getAuthClient();
  const spreadsheetId = process.env.GOOGLE_SPREADSHEET_ID;
  const apiKey = process.env.GOOGLE_API_KEY;
  
  if (!spreadsheetId || (!auth && !apiKey)) return [];

  const sheets = google.sheets({ 
    version: 'v4', 
    auth: auth || apiKey 
  });
  
  try {
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range: 'Sheet1!A2:J',
    });

    const rows = response.data.values;
    if (!rows || rows.length <= 1) return []; // <= 1 to ignore header row

    // Skip the first row (headers) when parsing
    return rows.slice(1).map((row) => ({
      title: row[0] || '',
      date: row[1] || '',
      location: row[2] || '',
      organizer: row[3] || '',
      description: row[4] || '',
      agenda: row[5] || '',
      registrationLink: row[6] || '',
      promoVideo: row[7] || '',
      tags: row[8] ? row[8].split(',').map((t: string) => t.trim()) : [],
      slug: row[9] || '',
    }));
  } catch (error) {
    console.error('Error fetching sheets data:', error);
    return [];
  }
};
