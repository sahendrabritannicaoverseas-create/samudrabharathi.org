import { useEffect, useState } from 'react';
import { X } from 'lucide-react';
import { API_ENDPOINTS, STORAGE_URL } from '../config';

interface GalleryImage {
  id: string | number;
  url: string;
  title: string;
  description?: string;
}

interface ApiGalleryItem {
  id: number;
  alt_text: string;
  shortnote: string;
  image_path: string;
}

export default function Gallery() {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadImages();
  }, []);

  const loadImages = async () => {
    setLoading(true);
    try {
      const response = await fetch(API_ENDPOINTS.GALLERY);
      const data = await response.json();

      if (data && data.data && Array.isArray(data.data)) {
        // Map API response to expected format
        const formattedImages = data.data.map((item: ApiGalleryItem) => ({
          id: item.id,
          url: `${STORAGE_URL}/${item.image_path}`,
          title: item.alt_text || 'Gallery Image',
          description: item.shortnote || ''
        }));
        setImages(formattedImages);
      }
    } catch (error) {
      console.error('Error loading gallery images:', error);
    }
    setLoading(false);
  };

  return (
    <section id="gallery" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-blue-600 mb-4">
            Photo Gallery
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Capturing moments from our events and activities
          </p>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600"></div>
          </div>
        ) : images.length === 0 ? (
          <div className="text-center py-12 bg-gray-50 rounded-lg">
            <p className="text-gray-600 text-lg">No photos available yet. Check back soon!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {images.map((image) => (
              <div
                key={image.id}
                onClick={() => setSelectedImage(image)}
                className="relative aspect-square overflow-hidden rounded-lg shadow-md hover:shadow-xl transition cursor-pointer group"
              >
                <img
                  src={image.url}
                  alt={image.title}
                  className="w-full h-full object-cover transform group-hover:scale-110 transition duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition">
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <h3 className="text-white font-semibold text-sm">{image.title}</h3>
                    {image.description && (
                      <p className="text-white/80 text-xs mt-1">{image.description}</p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {selectedImage && (
          <div
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 text-white hover:text-orange-400 transition"
            >
              <X size={32} />
            </button>
            <div className="max-w-5xl max-h-[90vh] overflow-auto">
              <img
                src={selectedImage.url}
                alt={selectedImage.title}
                className="w-full h-auto rounded-lg"
              />
              <div className="bg-white rounded-b-lg p-4">
                <h3 className="text-xl font-bold text-gray-800 mb-2">{selectedImage.title}</h3>
                {selectedImage.description && (
                  <p className="text-gray-600">{selectedImage.description}</p>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
