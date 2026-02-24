import { Menu, X, Heart } from 'lucide-react';
import { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const scrollToSection = (sectionId: string) => {
    if (location.pathname !== '/') {
      navigate('/#' + sectionId);
      setMobileMenuOpen(false);
      return;
    }

    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setMobileMenuOpen(false);
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm border-b border-gray-100">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Left section: Logo & Tagline */}
          <div className="flex items-center space-x-4">
            <Link to="/" className="flex items-center space-x-4 group">
              <img
                src="/main_logo.png"
                alt="Logo"
                className="h-14 w-auto object-contain transition-transform group-hover:scale-105"
              />
              <div className="hidden md:flex flex-col border-l border-gray-200 pl-4">
                <span className="text-orange-500 font-bold text-lg leading-tight">
                  Samudra Charitable Trust
                </span>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-6 xl:space-x-8">
            <button 
              onClick={() => scrollToSection('home')} 
              className="text-gray-800 hover:text-orange-500 font-bold text-[15px] transition-colors"
            >
              Home
            </button>
            <button 
              onClick={() => scrollToSection('about')} 
              className="text-gray-800 hover:text-orange-500 font-bold text-[15px] transition-colors"
            >
              About
            </button>
            <button 
              onClick={() => navigate('/activities')} 
              className="text-gray-800 hover:text-orange-500 font-bold text-[15px] transition-colors"
            >
              Activities
            </button>
            <button 
              onClick={() => navigate('/events')} 
              className="text-gray-800 hover:text-orange-500 font-bold text-[15px] transition-colors"
            >
              Events
            </button>
            <button 
              onClick={() => scrollToSection('gallery')} 
              className="text-gray-800 hover:text-orange-500 font-bold text-[15px] transition-colors"
            >
              Gallery
            </button>
            <button 
              onClick={() => scrollToSection('videos')} 
              className="text-gray-800 hover:text-orange-500 font-bold text-[15px] transition-colors"
            >
              Videos
            </button>
            <button 
              onClick={() => scrollToSection('contact')} 
              className="text-gray-800 hover:text-orange-500 font-bold text-[15px] transition-colors"
            >
              Contact
            </button>

            {/* Donate Now Button */}
            <button 
              onClick={() => navigate('/donate')}
              className={`${
                location.pathname.includes('/activity/') 
                  ? 'bg-orange-600 hover:bg-orange-700 text-white' 
                  : location.pathname.includes('/event/')
                  ? 'bg-blue-600 hover:bg-blue-700 text-white'
                  : 'bg-orange-500 hover:bg-orange-600 text-white'
              } px-6 py-3 rounded-full font-extrabold text-[15px] flex items-center transition-all shadow-sm hover:shadow-md active:scale-95 whitespace-nowrap`}
            >
              <Heart size={18} className="mr-2 fill-white" />
              Donate Now
            </button>
          </nav>

          {/* Mobile menu button */}
          <div className="flex items-center lg:hidden space-x-4">
            <button 
              className={`${
                location.pathname.includes('/activity/') 
                  ? 'bg-orange-600 text-white' 
                  : location.pathname.includes('/event/')
                  ? 'bg-blue-600 text-white'
                  : 'bg-orange-500 text-white'
              } p-2 rounded-full shadow-sm`}
              onClick={() => navigate('/donate')}
            >
              <Heart size={20} className="fill-white" />
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-gray-700 hover:text-orange-500 p-1"
            >
              {mobileMenuOpen ? <X size={30} /> : <Menu size={30} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white border-t border-gray-100 py-4 pb-8 space-y-1 animate-in fade-in slide-in-from-top-4 duration-200">
            {[
              { label: 'Home', action: () => scrollToSection('home') },
              { label: 'About', action: () => scrollToSection('about') },
              { label: 'Activities', action: () => { navigate('/activities'); setMobileMenuOpen(false); } },
              { label: 'Events', action: () => { navigate('/events'); setMobileMenuOpen(false); } },
              { label: 'Gallery', action: () => scrollToSection('gallery') },
              { label: 'Videos', action: () => scrollToSection('videos') },
              { label: 'Contact', action: () => scrollToSection('contact') },
            ].map((item) => (
              <button 
                key={item.label}
                onClick={item.action} 
                className="block w-full text-left px-4 py-3 text-gray-800 hover:bg-gray-50 font-bold text-base border-l-4 border-transparent hover:border-orange-500 transition-all"
              >
                {item.label}
              </button>
            ))}
            <div className="px-4 pt-4">
              <button 
                onClick={() => { navigate('/donate'); setMobileMenuOpen(false); }}
                className={`w-full ${
                  location.pathname.includes('/activity/') 
                    ? 'bg-orange-600 text-white' 
                    : location.pathname.includes('/event/')
                    ? 'bg-blue-600 text-white'
                    : 'bg-orange-500 text-white'
                } py-4 rounded-xl font-extrabold text-base flex items-center justify-center shadow-md active:scale-[0.98] transition-all`}
              >
                <Heart size={20} className="mr-2 fill-white" />
                Donate Now
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
