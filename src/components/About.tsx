import { Users, Award, Target } from 'lucide-react';

export default function About() {
  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-blue-600 mb-6">
            About Us
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            We are dedicated to nurturing Bharatiya culture, strengthening communities, and empowering individuals through meaningful programs, cultural initiatives, and social service.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Mission Card */}
          <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-2xl p-8 transform hover:scale-105 transition shadow-lg border border-orange-200">
            <div className="bg-orange-600 text-white rounded-2xl p-4 w-16 h-16 flex items-center justify-center mb-6 shadow-md">
              <Target size={32} />
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Our Mission</h3>
            <p className="text-gray-700 leading-relaxed">
              To preserve and promote Bharatiya cultural heritage through meaningful programs and initiatives that inspire unity, values, and service.
            </p>
          </div>

          {/* Vision Card */}
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-8 transform hover:scale-105 transition shadow-lg border border-blue-200">
            <div className="bg-blue-600 text-white rounded-2xl p-4 w-16 h-16 flex items-center justify-center mb-6 shadow-md">
              <Award size={32} />
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Our Vision</h3>
            <p className="text-gray-700 leading-relaxed">
              To build a society rooted in brotherhood, sisterhood, national pride, and social responsibility.
            </p>
          </div>

          {/* Values Card */}
          <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-2xl p-8 transform hover:scale-105 transition shadow-lg border border-red-200">
            <div className="bg-red-600 text-white rounded-2xl p-4 w-16 h-16 flex items-center justify-center mb-6 shadow-md">
              <Users size={32} />
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Our Values</h3>
            <ul className="space-y-3">
              {['Unity & Collaboration', 'Cultural Pride', 'Service to Society', 'Self-Reliance', 'Inclusivity'].map((value, index) => (
                <li key={index} className="flex items-center text-gray-700 font-medium text-sm lg:text-base">
                  <span className="w-2 h-2 bg-red-600 rounded-full mr-3 shrink-0"></span>
                  {value}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Community Focus Section */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="order-2 md:order-1">
            <h3 className="text-3xl font-bold text-gray-800 mb-6 flex items-center">
              <span className="bg-orange-600 w-10 h-1 text-white mr-4 rounded-full"></span>
              Community Focus
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <div className="mt-1 bg-orange-100 text-orange-600 rounded-full p-1 mr-4">
                  <Users size={18} />
                </div>
                <p className="text-gray-700">Building strong bonds through physical, cultural, and psychological group activities</p>
              </li>
              <li className="flex items-start">
                <div className="mt-1 bg-orange-100 text-orange-600 rounded-full p-1 mr-4">
                  <Users size={18} />
                </div>
                <p className="text-gray-700">Encouraging teamwork and social harmony</p>
              </li>
              <li className="flex items-start">
                <div className="mt-1 bg-orange-100 text-orange-600 rounded-full p-1 mr-4">
                  <Users size={18} />
                </div>
                <p className="text-gray-700">Creating platforms for shared growth and understanding</p>
              </li>
            </ul>
          </div>
          
          <div className="order-1 md:order-2 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl p-8 text-white shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 -mt-10 -mr-10 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
            <h3 className="text-3xl font-bold mb-6 flex items-center">
              Competitions
            </h3>
            <p className="mb-6 text-blue-50 leading-relaxed text-lg">
              We organize diverse competitions to discover hidden talents, encourage teamwork, and promote creativity and confidence.
            </p>
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
              <p className="text-sm uppercase tracking-wider font-semibold text-blue-200 mb-2">Our Spirit</p>
              <p className="text-2xl font-bold italic">“We All Win Together for Society”</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
