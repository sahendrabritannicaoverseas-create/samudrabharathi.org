import { useEffect, useState } from 'react';
import { Play } from 'lucide-react';

interface ApiVideo {
  id: number;
  title: string;
  shortnote: string;
  video_id: string;
}

interface Video {
  id: number;
  title: string;
  description: string;
  embedUrl: string;
}

export default function Videos() {
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadVideos();
  }, []);

  const loadVideos = async () => {
    setLoading(true);
    try {
      const response = await fetch('https://www.adminsb.tutelagestudy.com/api/videos');
      const data = await response.json();

      if (data && data.data && Array.isArray(data.data)) {
        const formattedVideos = data.data.map((item: ApiVideo) => ({
          id: item.id,
          title: item.title,
          description: item.shortnote,
          embedUrl: `https://www.youtube.com/embed/${item.video_id}`
        }));
        setVideos(formattedVideos);
      }
    } catch (error) {
      console.error('Error loading videos:', error);
    }
    setLoading(false);
  };

  return (
    <section id="videos" className="py-16 bg-gradient-to-br from-blue-50 to-orange-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-blue-600 mb-4">
            Video Gallery
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Watch highlights from our events and programs
          </p>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600"></div>
          </div>
        ) : videos.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg shadow-md">
            <Play size={48} className="mx-auto text-gray-400 mb-4" />
            <p className="text-gray-600 text-lg">No videos available yet. Check back soon!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {videos.map((video) => (
              <div
                key={video.id}
                className="bg-white rounded-lg shadow-lg overflow-hidden transform hover:scale-105 transition hover:shadow-xl"
              >
                <div className="relative aspect-video">
                  <iframe
                    src={video.embedUrl}
                    title={video.title}
                    className="w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-bold text-gray-800 mb-2">{video.title}</h3>
                  {video.description && (
                    <p className="text-gray-600 text-sm">{video.description}</p>
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
