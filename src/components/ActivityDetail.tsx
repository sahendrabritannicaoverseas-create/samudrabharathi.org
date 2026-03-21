import { Calendar, MapPin, ArrowLeft, Tag, Share2, Heart, MessageCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface ActivityDetailProps {
    activity: {
        id: number;
        title: string;
        activityName: string;
        description: string;
        activityDate: string;
        location: string;
        category_name?: string;
        image: string;
    };
    onBack: () => void;
    isEvent?: boolean;
}

export default function ActivityDetail({ activity, onBack, isEvent }: ActivityDetailProps) {
    const navigate = useNavigate();
    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    const handleWhatsAppContact = () => {
        const phoneNumber = "919003571217"; // Standardizing on the NGO contact number
        const eventLink = window.location.href;
        const message = `Namaste! I am interested in this event: ${activity.title}\n\nDate: ${formatDate(activity.activityDate)}\nLocation: ${activity.location}\nLink: ${eventLink}`;
        const encodedMessage = encodeURIComponent(message);
        window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, '_blank');
    };

    const handleShareEvent = async () => {
        const shareData = {
            title: activity.title,
            text: `Check out this event: ${activity.title} at ${activity.location}`,
            url: window.location.href,
        };

        try {
            if (navigator.share) {
                await navigator.share(shareData);
            } else {
                await navigator.clipboard.writeText(window.location.href);
                alert('Event link copied to clipboard!');
            }
        } catch (err) {
            console.error('Error sharing:', err);
        }
    };


    // Determine theme colors based on type
    const bgGradient = isEvent ? 'from-blue-50 via-white to-orange-50' : 'from-orange-50 via-white to-blue-50';
    const accentLight = isEvent ? 'blue-100' : 'orange-100';
    const accentText = isEvent ? 'text-blue-600' : 'text-orange-600';
    const accentBg = isEvent ? 'bg-blue-600' : 'bg-orange-600';

    return (
        <div className={`min-h-screen bg-gradient-to-br ${bgGradient} pt-20 lg:pt-24`}>
            {/* Back Button */}
            <div className="bg-white/50 backdrop-blur-sm shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <button
                        onClick={onBack}
                        className={`flex items-center gap-2 ${accentText} hover:opacity-80 font-bold transition-all hover:-translate-x-1`}
                    >
                        <ArrowLeft size={18} />
                        Back to Home
                    </button>
                </div>
            </div>

            {/* Hero Section */}
            <div className="relative h-96 overflow-hidden">
                <img
                    src={activity.image}
                    alt={activity.title}
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>

                <div className="absolute bottom-0 left-0 right-0 p-8">
                    <div className="max-w-7xl mx-auto">
                        {activity.category_name && (
                            <span className={`inline-block ${accentBg} text-white px-4 py-2 rounded-full text-sm font-bold mb-4 shadow-lg`}>
                                {activity.category_name}
                            </span>
                        )}
                        <h1 className="text-4xl sm:text-5xl font-bold text-white mb-2 shadow-sm">
                            {activity.title}
                        </h1>
                        {activity.activityName && activity.activityName !== activity.title && (
                            <p className={`text-xl ${isEvent ? 'text-blue-200' : 'text-orange-200'} font-medium`}>
                                {activity.activityName}
                            </p>
                        )}
                    </div>
                </div>
            </div>

            {/* Content Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Content */}
                    <div className="lg:col-span-2">
                        <div className="bg-white rounded-xl shadow-lg p-8">
                            <h2 className="text-2xl font-bold text-gray-800 mb-4">About This {isEvent ? 'Event' : 'Activity'}</h2>
                            <p className="text-gray-700 text-lg leading-relaxed whitespace-pre-line">
                                {activity.description}
                            </p>
                        </div>
                    </div>

                    {/* Sidebar - Event Details */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-xl shadow-lg p-6 sticky top-24">
                            <h3 className="text-xl font-bold text-gray-800 mb-6 font-display">Details</h3>

                            <div className="space-y-4">
                                {/* Date */}
                                <div className="flex items-start gap-4">
                                    <div className={`${accentLight} p-2.5 rounded-xl`}>
                                        <Calendar className={accentText} size={22} />
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-500 font-bold uppercase tracking-wider mb-0.5">Date</p>
                                        <p className="text-gray-900 font-bold">
                                            {formatDate(activity.activityDate)}
                                        </p>
                                    </div>
                                </div>

                                {/* Location */}
                                <div className="flex items-start gap-4">
                                    <div className={`${isEvent ? 'bg-orange-100' : 'bg-blue-100'} p-2.5 rounded-xl`}>
                                        <MapPin className={isEvent ? 'text-orange-600' : 'text-blue-600'} size={22} />
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-500 font-bold uppercase tracking-wider mb-0.5">Location</p>
                                        <p className="text-gray-900 font-bold leading-snug">
                                            {activity.location}
                                        </p>
                                    </div>
                                </div>

                                {/* Category */}
                                {activity.category_name && (
                                    <div className="flex items-start gap-4">
                                        <div className="bg-purple-100 p-2.5 rounded-xl">
                                            <Tag className="text-purple-600" size={22} />
                                        </div>
                                        <div>
                                            <p className="text-xs text-gray-500 font-bold uppercase tracking-wider mb-0.5">Category</p>
                                            <p className="text-gray-900 font-bold">
                                                {activity.category_name}
                                            </p>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Call to Action */}
                            <div className="mt-8 pt-6 border-t border-gray-100 gap-2.5 flex flex-col">
                                <button 
                                    onClick={handleWhatsAppContact}
                                    className="w-full bg-[#25D366] hover:bg-[#128C7E] text-white py-2.5 rounded-xl font-bold text-base flex items-center justify-center gap-2 shadow-md hover:shadow-lg active:scale-[0.98] transition-all"
                                >
                                    <MessageCircle size={18} />
                                    Contact on WhatsApp
                                </button>
                                <button 
                                    onClick={() => navigate('/donate')}
                                    className="w-full border-2 border-orange-100 text-orange-600 bg-orange-50/50 hover:bg-orange-50 py-2.5 rounded-xl font-bold text-base flex items-center justify-center gap-2 transition-all"
                                >
                                    <Heart size={18} className="fill-orange-600" />
                                    Donate Now
                                </button>
                                <button 
                                    onClick={handleShareEvent}
                                    className="w-full border-2 border-gray-100 text-gray-700 py-2.5 rounded-xl font-bold text-sm flex items-center justify-center gap-2 hover:bg-gray-50 hover:border-gray-200 transition-all"
                                >
                                    <Share2 size={18} />
                                    Share {isEvent ? 'Event' : 'Activity'}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
