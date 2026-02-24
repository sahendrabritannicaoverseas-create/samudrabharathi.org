import { useState, useEffect } from 'react';
import { supabase, Category } from '../lib/supabase';
import { Upload, Calendar, Image, Video, X } from 'lucide-react';

type TabType = 'events' | 'images' | 'videos';

export default function Admin() {
  const [activeTab, setActiveTab] = useState<TabType>('events');
  const [categories, setCategories] = useState<Category[]>([]);
  const [showAdmin, setShowAdmin] = useState(false);

  const [eventForm, setEventForm] = useState({
    title: '',
    description: '',
    category_id: '',
    event_date: '',
    location: '',
    featured: false
  });

  const [mediaForm, setMediaForm] = useState({
    title: '',
    description: '',
    type: 'image' as 'image' | 'video',
    url: '',
    featured: false,
    display_order: 0
  });

  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    const { data } = await supabase
      .from('categories')
      .select('*')
      .order('name');

    if (data) {
      setCategories(data);
      if (data.length > 0 && !eventForm.category_id) {
        setEventForm(prev => ({ ...prev, category_id: data[0].id }));
      }
    }
  };

  const handleEventSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setMessage('');

    const { error } = await supabase
      .from('events')
      .insert([eventForm]);

    if (error) {
      setMessage(`Error: ${error.message}`);
    } else {
      setMessage('Event added successfully!');
      setEventForm({
        title: '',
        description: '',
        category_id: categories[0]?.id || '',
        event_date: '',
        location: '',
        featured: false
      });
      setTimeout(() => setMessage(''), 3000);
    }

    setSubmitting(false);
  };

  const handleMediaSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setMessage('');

    const { error } = await supabase
      .from('media')
      .insert([mediaForm]);

    if (error) {
      setMessage(`Error: ${error.message}`);
    } else {
      setMessage(`${mediaForm.type === 'image' ? 'Image' : 'Video'} added successfully!`);
      setMediaForm({
        title: '',
        description: '',
        type: mediaForm.type,
        url: '',
        featured: false,
        display_order: 0
      });
      setTimeout(() => setMessage(''), 3000);
    }

    setSubmitting(false);
  };

  if (!showAdmin) {
    return (
      <div className="fixed bottom-4 right-4 z-40">
        <button
          onClick={() => setShowAdmin(true)}
          className="bg-gradient-to-r from-orange-600 to-red-600 text-white p-4 rounded-full shadow-lg hover:shadow-xl transform hover:scale-110 transition"
          title="Open Admin Panel"
        >
          <Upload size={24} />
        </button>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-lg shadow-2xl max-w-4xl w-full my-8">
        <div className="bg-gradient-to-r from-orange-600 to-red-600 text-white p-6 flex justify-between items-center rounded-t-lg">
          <h2 className="text-2xl font-bold">Content Management</h2>
          <button
            onClick={() => setShowAdmin(false)}
            className="hover:bg-white/20 p-2 rounded transition"
          >
            <X size={24} />
          </button>
        </div>

        <div className="border-b border-gray-200">
          <div className="flex">
            <button
              onClick={() => setActiveTab('events')}
              className={`flex-1 py-4 px-6 font-semibold transition flex items-center justify-center gap-2 ${activeTab === 'events'
                ? 'bg-orange-50 text-orange-600 border-b-2 border-orange-600'
                : 'text-gray-600 hover:bg-gray-50'
                }`}
            >
              <Calendar size={20} />
              Add Event
            </button>
            <button
              onClick={() => {
                setActiveTab('images');
                setMediaForm(prev => ({ ...prev, type: 'image' }));
              }}
              className={`flex-1 py-4 px-6 font-semibold transition flex items-center justify-center gap-2 ${activeTab === 'images'
                ? 'bg-orange-50 text-orange-600 border-b-2 border-orange-600'
                : 'text-gray-600 hover:bg-gray-50'
                }`}
            >
              <Image size={20} />
              Add Image
            </button>
            <button
              onClick={() => {
                setActiveTab('videos');
                setMediaForm(prev => ({ ...prev, type: 'video' }));
              }}
              className={`flex-1 py-4 px-6 font-semibold transition flex items-center justify-center gap-2 ${activeTab === 'videos'
                ? 'bg-orange-50 text-orange-600 border-b-2 border-orange-600'
                : 'text-gray-600 hover:bg-gray-50'
                }`}
            >
              <Video size={20} />
              Add Video
            </button>
          </div>
        </div>

        <div className="p-6 max-h-[60vh] overflow-y-auto">
          {message && (
            <div className={`mb-4 p-4 rounded-lg ${message.includes('Error') ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
              {message}
            </div>
          )}

          {activeTab === 'events' && (
            <form onSubmit={handleEventSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Event Title</label>
                <input
                  type="text"
                  value={eventForm.title}
                  onChange={(e) => setEventForm({ ...eventForm, title: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Description</label>
                <textarea
                  value={eventForm.description}
                  onChange={(e) => setEventForm({ ...eventForm, description: e.target.value })}
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Category</label>
                  <select
                    value={eventForm.category_id}
                    onChange={(e) => setEventForm({ ...eventForm, category_id: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    required
                  >
                    {categories.map((cat) => (
                      <option key={cat.id} value={cat.id}>{cat.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Event Date</label>
                  <input
                    type="date"
                    value={eventForm.event_date}
                    onChange={(e) => setEventForm({ ...eventForm, event_date: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Location</label>
                <input
                  type="text"
                  value={eventForm.location}
                  onChange={(e) => setEventForm({ ...eventForm, location: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={eventForm.featured}
                  onChange={(e) => setEventForm({ ...eventForm, featured: e.target.checked })}
                  className="mr-2"
                />
                <label className="text-sm text-gray-700">Feature on homepage</label>
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full bg-gradient-to-r from-orange-600 to-red-600 text-white py-3 rounded-lg font-semibold hover:shadow-lg transition disabled:opacity-50"
              >
                {submitting ? 'Adding...' : 'Add Event'}
              </button>
            </form>
          )}

          {(activeTab === 'images' || activeTab === 'videos') && (
            <form onSubmit={handleMediaSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  {mediaForm.type === 'image' ? 'Image Title' : 'Video Title'}
                </label>
                <input
                  type="text"
                  value={mediaForm.title}
                  onChange={(e) => setMediaForm({ ...mediaForm, title: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Description</label>
                <textarea
                  value={mediaForm.description}
                  onChange={(e) => setMediaForm({ ...mediaForm, description: e.target.value })}
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  {mediaForm.type === 'image' ? 'Image URL' : 'YouTube Video URL'}
                </label>
                <input
                  type="url"
                  value={mediaForm.url}
                  onChange={(e) => setMediaForm({ ...mediaForm, url: e.target.value })}
                  placeholder={mediaForm.type === 'image' ? 'https://example.com/image.jpg' : 'https://www.youtube.com/watch?v=...'}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  required
                />
                <p className="text-xs text-gray-500 mt-1">
                  {mediaForm.type === 'image'
                    ? 'Enter the full URL of the image (e.g., from Pexels, Unsplash, or your own hosting)'
                    : 'Enter the full YouTube video URL'}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Display Order</label>
                  <input
                    type="number"
                    value={mediaForm.display_order}
                    onChange={(e) => setMediaForm({ ...mediaForm, display_order: parseInt(e.target.value) })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    checked={mediaForm.featured}
                    onChange={(e) => setMediaForm({ ...mediaForm, featured: e.target.checked })}
                    className="mr-2"
                  />
                  <label className="text-sm text-gray-700">Feature in gallery</label>
                </div>
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full bg-gradient-to-r from-orange-600 to-red-600 text-white py-3 rounded-lg font-semibold hover:shadow-lg transition disabled:opacity-50"
              >
                {submitting ? 'Adding...' : `Add ${mediaForm.type === 'image' ? 'Image' : 'Video'}`}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
