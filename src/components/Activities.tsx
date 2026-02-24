import { Calendar, MapPin, Tag } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { API_ENDPOINTS, STORAGE_URL } from '../config';

interface Activity {
  id: number;
  title: string;
  activityName: string;
  description: string;
  activityDate: string;
  location: string;
  category_name?: string;
  image: string;
}


interface Category {
  id: number | 'all';
  category_name: string;
}

const getFallbackImage = () => {
  return '/activity_demo.png'; // Use high-quality local fallback
};

export default function Activities() {
  const navigate = useNavigate();
  const [activities, setActivities] = useState<Activity[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | 'all'>('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    loadActivities();
  }, [selectedCategoryId]);

  const fetchCategories = async () => {
    try {
      const response = await fetch(API_ENDPOINTS.ACTIVITY_CATEGORIES);
      const data = await response.json();
      if (data && data.status && Array.isArray(data.data)) {
        setCategories([{ id: 'all', category_name: 'All' }, ...data.data]);
      }
    } catch (error) {
      console.error('Error loading categories:', error);
      setCategories([{ id: 'all', category_name: 'All' }]);
    }
  };

  const loadActivities = async () => {
    setLoading(true);
    try {
      const url = selectedCategoryId === 'all'
        ? API_ENDPOINTS.ACTIVITIES
        : API_ENDPOINTS.ACTIVITIES_BY_CATEGORY(selectedCategoryId);

      const response = await fetch(url);
      const data = await response.json();

      if (data && data.data && Array.isArray(data.data)) {
        const formattedActivities = data.data.map((item: any) => {
          const title = item.activity_name || item.title || item.name || '';

          let imageUrl = '';
          const path = item.thumbnail_path || item.image_path || item.image;

          if (path) {
            if (path.startsWith('http')) {
              imageUrl = path;
            } else {
              const cleanPath = path.startsWith('/') ? path.substring(1) : path;
              imageUrl = `${STORAGE_URL}/${cleanPath}`;
            }
          } else {
            imageUrl = getFallbackImage();
          }

          return {
            id: item.id,
            title: title,
            activityName: title,
            description: item.shortnote || item.description || '',
            activityDate: item.activity_date || item.event_date || item.date || '',
            location: item.location || item.venue || '',
            category_name: item.category?.category_name || item.category_name || 'Other',
            image: imageUrl,
            slug: item.activity_slug || item.slug
          };
        });

        setActivities(formattedActivities);
      } else {
        setActivities([]);
      }
    } catch (error) {
      console.error('Error loading activities:', error);
      setActivities([]);
    }
    setLoading(false);
  };

  const handleActivityClick = (activity: any) => {
    const slug = activity.slug || activity.activity_slug || (activity.activityName || '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    navigate(`/activity/${slug}`);
  };

  return (
    <section id="activities" className="py-16 bg-gradient-to-br from-orange-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl sm:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-600 via-red-600 to-blue-600 mb-4">
            Our Activities
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Explore our diverse range of cultural programs and social initiatives.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategoryId(category.id)}
              className={`px-6 py-2 rounded-full font-semibold transition transform hover:scale-105 ${selectedCategoryId === category.id
                ? 'bg-gradient-to-r from-orange-600 to-red-600 text-white shadow-lg'
                : 'bg-white text-gray-700 hover:shadow-md'
                }`}
            >
              {category.category_name}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600"></div>
          </div>
        ) : activities.length === 0 ? (
          <div className="text-center py-12 bg-white/50 rounded-xl backdrop-blur-sm">
            <p className="text-gray-600 text-lg">No activities found.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {activities.map((activity) => (
              <div
                key={activity.id}
                onClick={() => handleActivityClick(activity)}
                className="bg-white rounded-xl shadow-lg overflow-hidden transform hover:scale-105 transition hover:shadow-xl flex flex-col h-full cursor-pointer"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={activity.image}
                    alt={activity.title}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                  />
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-orange-600 shadow-sm">
                    {activity.category_name}
                  </div>
                </div>

                <div className="p-6 flex-1 flex flex-col">
                  <div className="flex items-center gap-2 mb-3">
                    <Tag size={16} className="text-orange-500" />
                    <span className="text-xs font-semibold text-gray-500 bg-orange-50 px-2 py-1 rounded">
                      {activity.category_name}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-gray-800 mb-1 line-clamp-2">{activity.title}</h3>
                  {activity.activityName && activity.activityName !== activity.title && (
                    <p className="text-sm font-medium text-orange-600 mb-3">{activity.activityName}</p>
                  )}
                  <p className="text-gray-600 mb-4 line-clamp-3 text-sm flex-1">{activity.description}</p>

                  <div className="mt-auto pt-4 border-t border-gray-100 space-y-2">
                    <div className="flex items-center text-sm text-gray-500">
                      <Calendar size={16} className="mr-2 text-orange-500" />
                      {activity.activityDate ? new Date(activity.activityDate).toLocaleDateString('en-IN', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      }) : 'Date TBD'}
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
        )}
      </div>
    </section>
  );
}
