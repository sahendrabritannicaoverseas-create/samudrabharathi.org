export default function Hero() {
  return (
    <section id="home" className="relative pt-28 lg:pt-48 pb-16 bg-gradient-to-br from-orange-50 via-white to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-600 via-red-600 to-blue-600 mb-6">
            Welcome to Samudra Bharathi
          </h2>
          <p className="text-xl sm:text-2xl text-gray-700 font-semibold mb-4">
            Tamil Nadu Arakattalai (Trust)
          </p>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-8">
            Dedicated to preserving and promoting Tamil culture, organizing social initiatives,
            and fostering community development through various cultural programs and competitions.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button
              onClick={() => document.getElementById('activities')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-gradient-to-r from-orange-600 to-red-600 text-white px-8 py-3 rounded-full font-semibold hover:shadow-lg transform hover:scale-105 transition"
            >
              View Our Activities
            </button>
            <button
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-8 py-3 rounded-full font-semibold hover:shadow-lg transform hover:scale-105 transition"
            >
              Get Involved
            </button>
          </div>
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white rounded-lg shadow-lg p-6 text-center transform hover:scale-105 transition">
            <div className="text-4xl font-bold text-orange-600 mb-2">50+</div>
            <p className="text-gray-700 font-semibold">Events Organized</p>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-6 text-center transform hover:scale-105 transition">
            <div className="text-4xl font-bold text-red-600 mb-2">1000+</div>
            <p className="text-gray-700 font-semibold">Participants</p>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-6 text-center transform hover:scale-105 transition">
            <div className="text-4xl font-bold text-blue-600 mb-2">10+</div>
            <p className="text-gray-700 font-semibold">Social Initiatives</p>
          </div>
        </div>
      </div>
    </section>
  );
}
