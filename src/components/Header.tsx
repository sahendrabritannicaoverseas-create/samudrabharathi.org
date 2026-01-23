import { Menu, X } from 'lucide-react';
import { useState } from 'react';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setMobileMenuOpen(false);
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-orange-50 via-white to-blue-50 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-3">
          <div className="flex items-center space-x-4">
            <img
              src="/bharatmelogo.png"
              alt="Bharat Mata Logo"
              className="h-16 w-16 sm:h-20 sm:w-20 object-contain"
            />
          </div>

          <div className="flex-1 text-center px-4">
            <h1 className="text-xl sm:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-600 via-red-600 to-blue-600">
              Samudra Bharathi
            </h1>
            <p className="text-xs sm:text-sm text-gray-700 font-semibold">Tamil Nadu Arakattalai</p>
          </div>

          <div className="flex items-center space-x-4">
            <img
              src="/vishnu_ji_logo.png"
              alt="Vishnu Ji Logo"
              className="h-16 w-16 sm:h-20 sm:w-20 object-contain"
            />
          </div>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="ml-4 lg:hidden text-gray-700 hover:text-orange-600"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        <nav className="hidden lg:flex items-center justify-center space-x-8 pb-3 border-t border-orange-100 pt-3">
          <button onClick={() => scrollToSection('home')} className="text-gray-700 hover:text-orange-600 font-medium transition">
            Home
          </button>
          <button onClick={() => scrollToSection('about')} className="text-gray-700 hover:text-orange-600 font-medium transition">
            About
          </button>
          <button onClick={() => scrollToSection('activities')} className="text-gray-700 hover:text-orange-600 font-medium transition">
            Activities
          </button>
          <button onClick={() => scrollToSection('gallery')} className="text-gray-700 hover:text-orange-600 font-medium transition">
            Gallery
          </button>
          <button onClick={() => scrollToSection('videos')} className="text-gray-700 hover:text-orange-600 font-medium transition">
            Videos
          </button>
          <button onClick={() => scrollToSection('contact')} className="text-gray-700 hover:text-orange-600 font-medium transition">
            Contact
          </button>
        </nav>

        {mobileMenuOpen && (
          <nav className="lg:hidden pb-4 border-t border-orange-100 mt-2 pt-4 space-y-3">
            <button onClick={() => scrollToSection('home')} className="block w-full text-left text-gray-700 hover:text-orange-600 font-medium transition py-2">
              Home
            </button>
            <button onClick={() => scrollToSection('about')} className="block w-full text-left text-gray-700 hover:text-orange-600 font-medium transition py-2">
              About
            </button>
            <button onClick={() => scrollToSection('activities')} className="block w-full text-left text-gray-700 hover:text-orange-600 font-medium transition py-2">
              Activities
            </button>
            <button onClick={() => scrollToSection('gallery')} className="block w-full text-left text-gray-700 hover:text-orange-600 font-medium transition py-2">
              Gallery
            </button>
            <button onClick={() => scrollToSection('videos')} className="block w-full text-left text-gray-700 hover:text-orange-600 font-medium transition py-2">
              Videos
            </button>
            <button onClick={() => scrollToSection('contact')} className="block w-full text-left text-gray-700 hover:text-orange-600 font-medium transition py-2">
              Contact
            </button>
          </nav>
        )}
      </div>
    </header>
  );
}
