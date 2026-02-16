'use client';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { eventApi } from '@/api/event';
import { EventCard } from '@/components/events/EventCard';
import { Spinner } from '@/components/ui/Spinner';
import { Search, Calendar as CalendarIcon } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

import { Breadcrumbs } from '@/components/ui/Breadcrumbs';

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1
        }
    }
};

export default function EventsPage() {
    const [activeTab, setActiveTab] = useState('upcoming');
    const [searchQuery, setSearchQuery] = useState('');

    const { data: eventsRes, isLoading } = useQuery({
        queryKey: ['events'],
        queryFn: () => eventApi.getEvents(),
    });

    const events = eventsRes?.data || [];

    // Simple filtering logic
    const filteredEvents = events.filter(event => {
        const matchesSearch = event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            event.description.toLowerCase().includes(searchQuery.toLowerCase());

        const isUpcoming = new Date(event.date) >= new Date();
        const matchesTab = activeTab === 'upcoming' ? isUpcoming : !isUpcoming;

        return matchesSearch && matchesTab;
    });

    return (
        <div className="space-y-6">
            <Breadcrumbs items={[{ label: 'Events' }]} />
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900">Events</h1>
                    <p className="text-slate-500">Discover hackathons, workshops, and meetups.</p>
                </div>
            </div>

            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                <div className="flex items-center gap-2 flex-1 max-w-md">
                    <Search className="h-4 w-4 text-slate-400" />
                    <input
                        type="text"
                        placeholder="Search events..."
                        className="flex-1 bg-transparent text-sm outline-none"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>

                <div className="flex items-center gap-4">
                    <div className="flex bg-slate-100 p-1 rounded-lg">
                        <button
                            onClick={() => setActiveTab('upcoming')}
                            className={cn(
                                "px-4 py-1.5 text-sm font-medium rounded-md transition-all",
                                activeTab === 'upcoming' ? "bg-white text-indigo-600 shadow-sm" : "text-slate-500 hover:text-slate-700"
                            )}
                        >
                            Upcoming
                        </button>
                        <button
                            onClick={() => setActiveTab('past')}
                            className={cn(
                                "px-4 py-1.5 text-sm font-medium rounded-md transition-all",
                                activeTab === 'past' ? "bg-white text-indigo-600 shadow-sm" : "text-slate-500 hover:text-slate-700"
                            )}
                        >
                            Past
                        </button>
                    </div>
                </div>
            </div>

            {isLoading ? (
                <div className="flex h-64 items-center justify-center">
                    <Spinner size="lg" />
                </div>
            ) : filteredEvents.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-20 text-center rounded-xl border border-dashed border-slate-300 bg-white">
                    <CalendarIcon className="mb-4 h-12 w-12 text-slate-300" />
                    <h3 className="text-lg font-semibold text-slate-900">No events found</h3>
                    <p className="text-slate-500">Try adjusting your search or filters.</p>
                </div>
            ) : (
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
                >
                    {filteredEvents.map((event) => (
                        <EventCard key={event.id} event={event} />
                    ))}
                </motion.div>
            )}
        </div>
    );
}
