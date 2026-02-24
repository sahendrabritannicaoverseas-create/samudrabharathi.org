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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
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
            <p className="text-gray-300 text-sm">23/1, Santhai Thoppu, Marakkanan, Viluppuram </p>
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

        <div className="border-t border-gray-700 pt-8 text-center">
          <p className="text-gray-400 text-sm">
            &copy; {new Date().getFullYear()} Samudra Bharathi Tamil Nadu Arakattalai. All rights reserved.
          </p>
          <p className="text-gray-500 text-xs mt-2">
            Dedicated to preserving Tamil culture and fostering community development
          </p>
        </div>
      </div>
    </section>
  );
}
