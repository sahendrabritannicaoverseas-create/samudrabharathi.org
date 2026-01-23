import { useEffect, useState } from 'react';
import { Calendar, MapPin, Tag, RefreshCw } from 'lucide-react';

interface ApiCategory {
  id: number;
  category_name: string;
}

interface ApiActivity {
  id: number;
  activity_name: string;
  shortnote: string;
  activity_date: string;
  location: string;
  category_id: number;
  category: ApiCategory;
}

interface Activity {
  id: number;
  title: string;
  description: string;
  activityDate: string;
  location: string;
  categoryId: number;
  category: ApiCategory;
}

export default function Activities() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<number | string>('all');
  const [categories, setCategories] = useState<ApiCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    loadCategories();
  }, []);

  useEffect(() => {
    loadActivities();
    // Auto-refresh every 10 seconds
    const interval = setInterval(loadActivities, 10000);
    return () => clearInterval(interval);
  }, [selectedCategory]);

  const loadCategories = async () => {
    try {
      const response = await fetch('https://www.adminsb.tutelagestudy.com/api/activity-categories');
      const data = await response.json();

      if (data && data.data && Array.isArray(data.data)) {
        setCategories(data.data);
      }
    } catch (error) {
      console.error('Error loading categories:', error);
    }
  };

  const loadActivities = async () => {
    setLoading(true);
    try {
      let url = 'https://www.adminsb.tutelagestudy.com/api/activities';

      if (selectedCategory !== 'all') {
        url = `https://www.adminsb.tutelagestudy.com/api/activities/${selectedCategory}`;
      }

      const response = await fetch(url);
      const data = await response.json();

      if (data && data.data && Array.isArray(data.data)) {
        const formattedActivities = data.data.map((item: ApiActivity) => ({
          id: item.id,
          title: item.activity_name,
          description: item.shortnote,
          activityDate: item.activity_date,
          location: item.location,
          categoryId: item.category_id,
          category: item.category
        }));
        setActivities(formattedActivities);
      }
    } catch (error) {
      console.error('Error loading activities:', error);
    }
    setLoading(false);
  };

  const handleManualRefresh = async () => {
    setRefreshing(true);
    await loadActivities();
    setRefreshing(false);
  };

  return (
    <section id="activities" className="py-16 bg-gradient-to-br from-orange-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-blue-600 mb-4">
            Our Activities & Events
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Explore our diverse range of cultural programs, competitions, and social initiatives
          </p>
          <button
            onClick={handleManualRefresh}
            disabled={refreshing}
            className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition disabled:opacity-50"
          >
            <RefreshCw size={16} className={refreshing ? 'animate-spin' : ''} />
            {refreshing ? 'Refreshing...' : 'Refresh Data'}
          </button>
        </div>

        <div className="flex flex-wrap justify-center gap-4 mb-8">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-6 py-2 rounded-full font-semibold transition transform hover:scale-105 ${selectedCategory === 'all'
              ? 'bg-gradient-to-r from-orange-600 to-red-600 text-white shadow-lg'
              : 'bg-white text-gray-700 hover:shadow-md'
              }`}
          >
            All Activities
          </button>
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-6 py-2 rounded-full font-semibold transition transform hover:scale-105 ${selectedCategory === category.id
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
          <div className="text-center py-12 bg-white rounded-lg shadow-md">
            <p className="text-gray-600 text-lg">No events available yet. Check back soon!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {activities.map((activity) => (
              <div
                key={activity.id}
                className="bg-white rounded-lg shadow-lg overflow-hidden transform hover:scale-105 transition hover:shadow-xl"
              >
                <div className="bg-gradient-to-r from-orange-500 to-red-500 h-2"></div>
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <Tag size={16} className="text-orange-600" />
                    <span className="text-sm font-semibold text-orange-600">
                      {activity.category?.category_name}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-3">{activity.title}</h3>
                  <p className="text-gray-600 mb-4">{activity.description}</p>
                  <div className="flex items-center text-sm text-gray-500 mb-2">
                    <Calendar size={16} className="mr-2" />
                    {new Date(activity.activityDate).toLocaleDateString('en-IN', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </div>
                  {activity.location && (
                    <div className="flex items-center text-sm text-gray-500">
                      <MapPin size={16} className="mr-2" />
                      {activity.location}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
