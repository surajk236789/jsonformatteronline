import { google } from 'googleapis';

const auth = new google.auth.JWT({
  email: process.env.GOOGLE_CALENDAR_CLIENT_EMAIL,
  key: (process.env.GOOGLE_CALENDAR_PRIVATE_KEY || '').replace(/\\n/g, '\n'),
  scopes: ['https://www.googleapis.com/auth/calendar']
});

const calendar = google.calendar({ version: 'v3', auth });

async function seed() {
  const events = [
    {
      summary: 'Pune AI & ML Developers Conference',
      location: 'Pune, India',
      description: 'A deep dive into GenAI, LLMs, and modern ML infrastructure.\nAgenda:\nMorning: LLM tuning\nAfternoon: RAG architectures',
      start: { dateTime: new Date(Date.now() + 86400000 * 5).toISOString() },
      end: { dateTime: new Date(Date.now() + 86400000 * 5 + 3600000).toISOString() }
    },
    {
      summary: 'React India 2026',
      location: 'Goa, India',
      description: 'The premier React conference in India. Next.js, React Native, and ecosystem tools.',
      start: { dateTime: new Date(Date.now() + 86400000 * 15).toISOString() },
      end: { dateTime: new Date(Date.now() + 86400000 * 15 + 3600000).toISOString() }
    }
  ];

  for (const e of events) {
    await calendar.events.insert({
      calendarId: 'primary',
      resource: e
    });
    console.log('Created:', e.summary);
  }
}

seed().catch(err => console.error(err));
