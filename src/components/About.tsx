import { Heart, Users, Award, Target } from 'lucide-react';

export default function About() {
  return (
    <section id="about" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-blue-600 mb-4">
            About Our Trust
          </h2>
          <p className="text-base text-gray-600 max-w-3xl mx-auto">
            Samudra Bharathi Tamil Nadu Arakattalai is a dedicated organization committed to
            preserving Tamil culture, promoting social welfare, and organizing enriching programs
            that bring communities together.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-lg p-6 text-center transform hover:scale-105 transition shadow-md">
            <div className="flex justify-center mb-4">
              <div className="bg-orange-600 text-white rounded-full p-4">
                <Heart size={32} />
              </div>
            </div>
            <h3 className="text-lg font-bold text-gray-800 mb-2">Our Mission</h3>
            <p className="text-gray-700">
              To preserve and promote Tamil cultural heritage through meaningful programs and initiatives.
            </p>
          </div>

          <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-lg p-6 text-center transform hover:scale-105 transition shadow-md">
            <div className="flex justify-center mb-4">
              <div className="bg-red-600 text-white rounded-full p-4">
                <Users size={32} />
              </div>
            </div>
            <h3 className="text-lg font-bold text-gray-800 mb-2">Community Focus</h3>
            <p className="text-gray-700">
              Building strong communities through cultural programs and social welfare activities.
            </p>
          </div>

          <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-6 text-center transform hover:scale-105 transition shadow-md">
            <div className="flex justify-center mb-4">
              <div className="bg-blue-600 text-white rounded-full p-4">
                <Award size={32} />
              </div>
            </div>
            <h3 className="text-lg font-bold text-gray-800 mb-2">Competitions</h3>
            <p className="text-gray-700">
              Organizing diverse competitions to showcase talent and celebrate cultural excellence.
            </p>
          </div>

          <div className="bg-gradient-to-br from-cyan-50 to-cyan-100 rounded-lg p-6 text-center transform hover:scale-105 transition shadow-md">
            <div className="flex justify-center mb-4">
              <div className="bg-cyan-600 text-white rounded-full p-4">
                <Target size={32} />
              </div>
            </div>
            <h3 className="text-lg font-bold text-gray-800 mb-2">Our Vision</h3>
            <p className="text-gray-700">
              Creating a vibrant platform for cultural expression and social development.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
