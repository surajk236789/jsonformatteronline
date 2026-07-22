import React from 'react';
import { notFound } from 'next/navigation';
import { getEventsFromSheets } from '@/lib/google';
import { Calendar, MapPin, ArrowLeft, Building2, Link as LinkIcon, ExternalLink } from 'lucide-react';
import Link from 'next/link';
import { Metadata } from 'next';

export const revalidate = 3600;

export async function generateStaticParams() {
  const events = await getEventsFromSheets();
  return events.map((event) => ({
    slug: event.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const events = await getEventsFromSheets();
  const event = events.find((e) => e.slug === slug);

  if (!event) {
    return {
      title: 'Event Not Found | AllFormatter',
    };
  }

  return {
    title: `${event.title} | Tech Events`,
    description: event.description.substring(0, 160),
    alternates: {
      canonical: `https://www.allformatter.com/events/${event.slug}`,
    }
  };
}

export default async function EventDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const events = await getEventsFromSheets();
  const event = events.find((e) => e.slug === slug);

  if (!event) {
    notFound();
  }

  // Schema.org structured data for SEO
  const jsonLd: any = {
    '@context': 'https://schema.org',
    '@type': 'Event',
    name: event.title,
    startDate: event.date,
    endDate: event.date,
    eventAttendanceMode: event.location.toLowerCase().includes('virtual') || event.location.toLowerCase().includes('online') 
      ? 'https://schema.org/OnlineEventAttendanceMode' 
      : 'https://schema.org/OfflineEventAttendanceMode',
    eventStatus: 'https://schema.org/EventScheduled',
    location: {
      '@type': 'Place',
      name: event.location,
      address: {
        '@type': 'PostalAddress',
        addressLocality: event.location,
      }
    },
    description: event.description,
  };

  if (event.organizer) {
    jsonLd.organizer = {
      '@type': 'Organization',
      name: event.organizer,
    };
  }

  if (event.registrationLink) {
    jsonLd.offers = {
      '@type': 'Offer',
      url: event.registrationLink,
      availability: 'https://schema.org/InStock',
    };
  }

  return (
    <div className="min-h-screen bg-[#0d1117] text-white py-16 px-4 sm:px-6 lg:px-8 font-sans selection:bg-indigo-500/30">
      {/* Inject JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="max-w-5xl mx-auto">
        <Link href="/events" className="inline-flex items-center text-indigo-400 hover:text-indigo-300 transition-colors mb-12 font-medium">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to all events
        </Link>

        <div className="relative bg-white/[0.02] border border-white/10 rounded-3xl p-8 md:p-12 backdrop-blur-2xl overflow-hidden shadow-2xl">
          {/* Decorative blur elements */}
          <div className="absolute top-0 right-0 -mr-20 -mt-20 w-72 h-72 bg-indigo-500/20 rounded-full blur-[100px]"></div>
          <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-72 h-72 bg-pink-500/20 rounded-full blur-[100px]"></div>

          <div className="relative z-10">
            <div className="flex gap-2 mb-6 flex-wrap">
              {event.tags.map((tag, idx) => (
                <span key={idx} className="px-3 py-1 text-sm font-semibold uppercase tracking-wider bg-indigo-500/10 text-indigo-300 rounded-full border border-indigo-500/20 shadow-sm">
                  {tag}
                </span>
              ))}
            </div>

            <h1 className="text-4xl md:text-6xl font-extrabold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-100 to-gray-400">
              {event.title}
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              <div className="flex items-center text-lg text-gray-200 bg-white/5 p-6 rounded-2xl border border-white/5 hover:bg-white/[0.07] transition-colors">
                <div className="w-12 h-12 rounded-xl bg-indigo-500/20 flex items-center justify-center mr-4 shrink-0">
                  <Calendar className="w-6 h-6 text-indigo-400" />
                </div>
                <div>
                  <div className="text-sm text-gray-400 mb-1">Date & Time</div>
                  <span className="font-medium">{new Date(event.date).toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric', year: 'numeric' })}</span>
                </div>
              </div>
              <div className="flex items-center text-lg text-gray-200 bg-white/5 p-6 rounded-2xl border border-white/5 hover:bg-white/[0.07] transition-colors">
                <div className="w-12 h-12 rounded-xl bg-pink-500/20 flex items-center justify-center mr-4 shrink-0">
                  <MapPin className="w-6 h-6 text-pink-400" />
                </div>
                <div>
                  <div className="text-sm text-gray-400 mb-1">Location</div>
                  <span className="font-medium">{event.location}</span>
                </div>
              </div>
              {event.organizer && (
                <div className="flex items-center text-lg text-gray-200 bg-white/5 p-6 rounded-2xl border border-white/5 hover:bg-white/[0.07] transition-colors">
                  <div className="w-12 h-12 rounded-xl bg-amber-500/20 flex items-center justify-center mr-4 shrink-0">
                    <Building2 className="w-6 h-6 text-amber-400" />
                  </div>
                  <div>
                    <div className="text-sm text-gray-400 mb-1">Organizer</div>
                    <span className="font-medium">{event.organizer}</span>
                  </div>
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              <div className="lg:col-span-2 space-y-12">
                <div className="prose prose-invert prose-lg max-w-none">
                  <h3 className="text-2xl font-bold text-gray-100 mb-4 border-b border-white/10 pb-4">About this event</h3>
                  <p className="text-gray-300 leading-relaxed whitespace-pre-wrap">
                    {event.description}
                  </p>
                </div>

                {event.agenda && event.agenda.toLowerCase() !== 'tbd' && (
                  <div className="prose prose-invert prose-lg max-w-none">
                    <h3 className="text-2xl font-bold text-gray-100 mb-4 border-b border-white/10 pb-4">Agenda / Topics</h3>
                    <p className="text-gray-300 leading-relaxed whitespace-pre-wrap">
                      {event.agenda}
                    </p>
                  </div>
                )}
              </div>

              <div className="lg:col-span-1 space-y-8">
                {event.registrationLink && (
                  <div className="bg-gradient-to-b from-indigo-500/10 to-purple-500/10 p-6 rounded-3xl border border-indigo-500/20">
                    <h3 className="text-xl font-bold mb-4 text-white">Ready to join?</h3>
                    <a 
                      href={event.registrationLink} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center justify-center w-full px-6 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white rounded-xl font-bold text-lg shadow-[0_0_30px_rgba(79,70,229,0.2)] hover:shadow-[0_0_40px_rgba(79,70,229,0.4)] transition-all transform hover:-translate-y-1"
                    >
                      Register Now
                      <ExternalLink className="w-5 h-5 ml-2" />
                    </a>
                  </div>
                )}

                {event.promoVideo && (
                  <div className="bg-white/5 p-6 rounded-3xl border border-white/10">
                    <h3 className="text-xl font-bold mb-4 text-white">Trailer / Promo</h3>
                    <div className="relative w-full aspect-video rounded-xl overflow-hidden shadow-lg border border-white/10">
                      <iframe 
                        src={event.promoVideo} 
                        className="absolute inset-0 w-full h-full"
                        allowFullScreen 
                        title="Event Promo Video"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      ></iframe>
                    </div>
                  </div>
                )}
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
