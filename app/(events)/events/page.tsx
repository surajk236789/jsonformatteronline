import React from 'react';
import Link from 'next/link';
import { getEventsFromSheets } from '@/lib/google';
import { Calendar, MapPin, Tag } from 'lucide-react';

export const metadata = {
  title: 'Tech Events & Hackathons | AllFormatter',
  description: 'Discover the best upcoming tech events, AI meetups, hackathons, and web3 conferences.',
};

export const revalidate = 3600; // Revalidate every hour

export default async function EventsPage() {
  const events = await getEventsFromSheets();

  return (
    <div className="min-h-screen bg-[#0d1117] text-white py-20 px-4 sm:px-6 lg:px-8 font-sans selection:bg-indigo-500/30">
      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* Header Section */}
        <div className="text-center space-y-6 relative">
          <div className="absolute inset-0 flex items-center justify-center -z-10 opacity-20 pointer-events-none">
            <div className="w-[600px] h-[600px] bg-indigo-600 rounded-full blur-[120px] mix-blend-screen"></div>
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 drop-shadow-sm">
            Tech Events Hub
          </h1>
          <p className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
            Discover the most anticipated hackathons, AI meetups, and tech conferences. Level up your skills and network with top builders.
          </p>
        </div>

        {/* Filters & Categories (Static for now, could be dynamic client-side) */}
        <div className="flex flex-wrap justify-center gap-4">
          <Link href="/events" className="px-6 py-2.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/5 backdrop-blur-md transition-all font-medium">
            All Events
          </Link>
          <Link href="/events/hackathons" className="px-6 py-2.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/5 backdrop-blur-md transition-all font-medium text-gray-300 hover:text-white">
            Hackathons
          </Link>
          <Link href="/events/ai-meetups" className="px-6 py-2.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/5 backdrop-blur-md transition-all font-medium text-gray-300 hover:text-white">
            AI Meetups
          </Link>
        </div>

        {/* Events Grid */}
        {events.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {events.map((event) => (
              <Link key={event.slug} href={`/events/${event.slug}`} className="group relative block h-full">
                <div className="absolute inset-0 bg-gradient-to-b from-indigo-500/20 to-purple-500/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative h-full flex flex-col bg-white/[0.03] hover:bg-white/[0.06] border border-white/10 rounded-3xl p-8 backdrop-blur-xl transition-all duration-300 group-hover:-translate-y-1">
                  
                  <div className="flex gap-2 mb-6 flex-wrap">
                    {event.tags.slice(0, 3).map((tag, idx) => (
                      <span key={idx} className="px-3 py-1 text-xs font-semibold uppercase tracking-wider bg-indigo-500/20 text-indigo-300 rounded-full border border-indigo-500/30">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <h3 className="text-2xl font-bold mb-4 text-gray-100 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-indigo-400 group-hover:to-pink-400 transition-all">
                    {event.title}
                  </h3>
                  
                  <p className="text-gray-400 mb-8 line-clamp-3 leading-relaxed flex-grow">
                    {event.description}
                  </p>

                  <div className="space-y-3 mt-auto pt-6 border-t border-white/10">
                    <div className="flex items-center text-sm text-gray-300">
                      <Calendar className="w-4 h-4 mr-3 text-indigo-400" />
                      {new Date(event.date).toLocaleDateString('en-US', { weekday: 'short', month: 'long', day: 'numeric', year: 'numeric' })}
                    </div>
                    <div className="flex items-center text-sm text-gray-300">
                      <MapPin className="w-4 h-4 mr-3 text-pink-400" />
                      {event.location}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white/5 rounded-3xl border border-white/10 backdrop-blur-md">
            <h3 className="text-2xl font-semibold text-gray-300 mb-2">No events found</h3>
            <p className="text-gray-500">Check back later for new events.</p>
          </div>
        )}

      </div>
    </div>
  );
}
