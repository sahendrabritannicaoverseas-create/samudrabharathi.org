import { Calendar, MapPin, Tag } from 'lucide-react';
import { useState } from 'react';

interface Event {
    id: number;
    title: string;
    description: string;
    eventDate: string;
    location: string;
    type: string;
    image: string;
}

const STATIC_EVENTS: Event[] = [
    {
        id: 1,
        title: "Annual Community Gala",
        description: "A grand evening celebrating our community's achievements and cultural diversity. Featuring keynote speakers, awards ceremony, and networking opportunities.",
        eventDate: "2024-05-10",
        location: "Grand Convention Hall",
        type: "Social",
        image: "/event_gathering.png"
    },
    {
        id: 2,
        title: "State-Level Sports Meet",
        description: "Participate in our annual sports competition featuring various athletics and team sports. Open for registration now!",
        eventDate: "2024-06-15",
        location: "Sports Complex Stadium",
        type: "Competition",
        image: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&q=80&w=800"
    },
    {
        id: 3,
        title: "Tech Innovation Summit",
        description: "An inspiring one-day conference bringing together technology experts and students to discuss future trends and career opportunities.",
        eventDate: "2024-07-22",
        location: "Tech Park Auditorium",
        type: "Educational",
        image: "https://images.unsplash.com/photo-1544531586-fde5298cdd40?auto=format&fit=crop&q=80&w=800"
    }
];

const TYPES = ['All', 'Social', 'Competition', 'Educational'];

export default function Events() {
    const [selectedType, setSelectedType] = useState('All');

    const filteredEvents = selectedType === 'All'
        ? STATIC_EVENTS
        : STATIC_EVENTS.filter(event => event.type === selectedType);

    return (
        <section id="events" className="py-16 bg-gradient-to-br from-blue-50 to-indigo-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h2 className="text-4xl sm:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-600 via-red-600 to-blue-600 mb-4">
                        Our Events
                    </h2>
                    <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                        Mark your calendars for these exciting upcoming events. Don't miss out on the opportunity to connect and celebrate.
                    </p>
                </div>

                <div className="flex flex-wrap justify-center gap-4 mb-12">
                    {TYPES.map((type) => (
                        <button
                            key={type}
                            onClick={() => setSelectedType(type)}
                            className={`px-6 py-2 rounded-full font-semibold transition transform hover:scale-105 ${selectedType === type
                                ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg'
                                : 'bg-white text-gray-700 hover:shadow-md'
                                }`}
                        >
                            {type}
                        </button>
                    ))}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredEvents.map((event) => (
                        <div
                            key={event.id}
                            className="bg-white rounded-xl shadow-lg overflow-hidden transform hover:scale-105 transition hover:shadow-xl flex flex-col h-full"
                        >
                            <div className="relative h-48 overflow-hidden">
                                <img
                                    src={event.image}
                                    alt={event.title}
                                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                                />
                                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-blue-600 shadow-sm">
                                    {event.type}
                                </div>
                            </div>

                            <div className="p-6 flex-1 flex flex-col">
                                <div className="flex items-center gap-2 mb-3">
                                    <Tag size={16} className="text-blue-500" />
                                    <span className="text-xs font-semibold text-gray-500 bg-blue-50 px-2 py-1 rounded">
                                        {event.type}
                                    </span>
                                </div>

                                <h3 className="text-xl font-bold text-gray-800 mb-3 line-clamp-2">{event.title}</h3>
                                <p className="text-gray-600 mb-4 line-clamp-3 text-sm flex-1">{event.description}</p>

                                <div className="mt-auto pt-4 border-t border-gray-100 space-y-2">
                                    <div className="flex items-center text-sm text-gray-500">
                                        <Calendar size={16} className="mr-2 text-blue-500" />
                                        {new Date(event.eventDate).toLocaleDateString('en-IN', {
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric'
                                        })}
                                    </div>
                                    <div className="flex items-center text-sm text-gray-500">
                                        <MapPin size={16} className="mr-2 text-blue-500" />
                                        {event.location}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
