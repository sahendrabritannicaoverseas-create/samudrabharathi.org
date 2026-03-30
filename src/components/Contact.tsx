import { Mail, Phone, MapPin, Facebook, Youtube, Instagram } from 'lucide-react';

export default function Contact() {
  return (
    <section id="contact" className="py-16 bg-gradient-to-br from-gray-900 to-gray-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Get In Touch</h2>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto">
            Connect with us to learn more about our activities or to get involved
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          <div className="text-center">
            <div className="bg-orange-600 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
              <Mail size={32} />
            </div>
            <h3 className="font-bold mb-2">Email</h3>
            <p className="text-gray-300 text-sm">samudrabharathitn@gmail.com</p>
          </div>

          <div className="text-center">
            <div className="bg-red-600 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
              <Phone size={32} />
            </div>
            <h3 className="font-bold mb-2">Phone</h3>
            <p className="text-gray-300 text-sm">+91 9080325436</p>
          </div>

          <div className="text-center">
            <div className="bg-blue-600 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
              <MapPin size={32} />
            </div>
            <h3 className="font-bold mb-2">Location</h3>
            <p className="text-gray-300 text-sm text-balance">23/1, Santhai Thoppu, Marakkanan, Viluppuram </p>
          </div>

          <div className="text-center">
            <div className="bg-cyan-600 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
              <Facebook size={32} />
            </div>
            <h3 className="font-bold mb-2">Social Media</h3>
            <div className="flex justify-center gap-4 mt-3">
              <a href="#" className="hover:text-orange-400 transition">
                <Facebook size={24} />
              </a>
              <a href="#" className="hover:text-orange-400 transition">
                <Youtube size={24} />
              </a>
              <a href="#" className="hover:text-orange-400 transition">
                <Instagram size={24} />
              </a>
            </div>
          </div>
        </div>

        {/* Get Involved Section */}
        <div className="bg-white/5 rounded-3xl p-8 mb-16 border border-white/10">
          <h3 className="text-2xl font-bold mb-8 text-center">Get Involved</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: 'Volunteer with us', desc: 'Join our team of dedicated volunteers.' },
              { title: 'Participate in programs', desc: 'Join our cultural and social events.' },
              { title: 'Support our initiatives', desc: 'Contribute to our ongoing projects.' },
              { title: 'Partner with us', desc: 'Collaborate for social impact.' }
            ].map((item, index) => (
              <div key={index} className="bg-white/10 p-6 rounded-2xl hover:bg-white/20 transition cursor-pointer group border border-white/5">
                <p className="font-bold text-orange-400 group-hover:text-orange-300 mb-2">{item.title}</p>
                <p className="text-sm text-gray-400">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="border-t border-gray-700 pt-12">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-8">
            <div className="text-center md:text-left">
              <h3 className="text-xl font-bold text-white mb-2">Samudra Bharathi</h3>
              <p className="text-gray-400 text-sm">Dharma, Unity, and Service for a Better Tomorrow</p>
            </div>
            <nav className="flex flex-wrap justify-center gap-6 text-sm font-semibold">
              <button onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })} className="hover:text-orange-400 transition">About</button>
              <button onClick={() => document.getElementById('activities')?.scrollIntoView({ behavior: 'smooth' })} className="hover:text-orange-400 transition">Activities</button>
              <button onClick={() => document.getElementById('activities')?.scrollIntoView({ behavior: 'smooth' })} className="hover:text-orange-400 transition">Services</button>
              <button onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })} className="hover:text-orange-400 transition">Contact</button>
            </nav>
          </div>
          <div className="pt-8 border-t border-gray-800 text-center">
            <p className="text-gray-500 text-sm">
              &copy; {new Date().getFullYear()} Samudra Bharathi Tamil Nadu Arakattalai. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
