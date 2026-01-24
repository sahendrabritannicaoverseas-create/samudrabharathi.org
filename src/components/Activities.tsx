import { Calendar, MapPin, Tag } from 'lucide-react';
import { useState } from 'react';

interface Activity {
  id: number;
  title: string;
  description: string;
  activityDate: string;
  location: string;
  category: string;
  image: string;
}

const STATIC_ACTIVITIES: Activity[] = [
  {
    id: 1,
    title: "Traditional Dance Workshop",
    description: "Learn the art of classical Indian dance forms in this interactive workshop. Open to all age groups, this session aims to preserve and promote our rich cultural heritage.",
    activityDate: "2024-03-15",
    location: "Community Center Hall",
    category: "Cultural",
    image: "/activity_demo.png"
  },
  {
    id: 2,
    title: "Environment Awareness Drive",
    description: "Join us for a tree plantation drive and awareness session about environmental conservation. Let's work together for a greener tomorrow.",
    activityDate: "2024-03-20",
    location: "City Park",
    category: "Social Service",
    image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 3,
    title: "Youth Leadership Camp",
    description: "A weekend camp designed to develop leadership skills among the youth through team-building activities and mentorship sessions.",
    activityDate: "2024-04-05",
    location: "Youth Center",
    category: "Education",
    image: "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&q=80&w=800"
  }
];

const CATEGORIES = ['All', 'Cultural', 'Social Service', 'Education'];

export default function Activities() {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredActivities = selectedCategory === 'All'
    ? STATIC_ACTIVITIES
    : STATIC_ACTIVITIES.filter(activity => activity.category === selectedCategory);

  return (
    <section id="activities" className="py-16 bg-gradient-to-br from-orange-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl sm:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-600 via-red-600 to-blue-600 mb-4">
            Our Activities
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Explore our diverse range of ongoing programs and initiatives designed to empower the community.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {CATEGORIES.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-2 rounded-full font-semibold transition transform hover:scale-105 ${selectedCategory === category
                ? 'bg-gradient-to-r from-orange-600 to-red-600 text-white shadow-lg'
                : 'bg-white text-gray-700 hover:shadow-md'
                }`}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredActivities.map((activity) => (
            <div
              key={activity.id}
              className="bg-white rounded-xl shadow-lg overflow-hidden transform hover:scale-105 transition hover:shadow-xl flex flex-col h-full"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={activity.image}
                  alt={activity.title}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-orange-600 shadow-sm">
                  {activity.category}
                </div>
              </div>

              <div className="p-6 flex-1 flex flex-col">
                <div className="flex items-center gap-2 mb-3">
                  <Tag size={16} className="text-orange-500" />
                  <span className="text-xs font-semibold text-gray-500 bg-orange-50 px-2 py-1 rounded">
                    {activity.category}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-gray-800 mb-3 line-clamp-2">{activity.title}</h3>
                <p className="text-gray-600 mb-4 line-clamp-3 text-sm flex-1">{activity.description}</p>

                <div className="mt-auto pt-4 border-t border-gray-100 space-y-2">
                  <div className="flex items-center text-sm text-gray-500">
                    <Calendar size={16} className="mr-2 text-orange-500" />
                    {new Date(activity.activityDate).toLocaleDateString('en-IN', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <MapPin size={16} className="mr-2 text-orange-500" />
                    {activity.location}
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
