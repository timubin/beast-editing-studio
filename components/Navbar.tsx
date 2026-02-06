import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useSiteContent } from '../context/SiteContext';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { menu } = useSiteContent();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (location.state && location.state.scrollTo) {
      const element = document.getElementById(location.state.scrollTo);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
        // Clear state to avoid scrolling on subsequent renders if strictly necessary, 
        // but navigating typically clears it or we just consume it once.
        window.history.replaceState({}, document.title);
      }
    }
  }, [location]);

  const handleNavClick = (id: string) => {
    setIsMobileMenuOpen(false);
    if (location.pathname === '/') {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      navigate('/', { state: { scrollTo: id } });
    }
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-black/90 backdrop-blur-md py-4' : 'bg-transparent py-6'}`}>
      <div className="container mx-auto px-6 flex items-center justify-between">
        <div className="flex items-center gap-2 relative z-50">
          <img src="/logo/beast-logo.png" alt="Beast Studios" className="h-12 w-auto object-contain" />
          <span className="text-2xl font-black tracking-tighter text-white">
            BEAST<span className="text-red-600">.</span>
          </span>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-8">
          {menu.map((item) => (
            item.type === 'link' ? (
              <Link key={item.id} to={item.path} className="text-sm font-medium hover:text-red-600 transition-colors">
                {item.label}
              </Link>
            ) : (
              <button key={item.id} onClick={() => handleNavClick(item.path)} className="text-sm font-medium hover:text-red-600 transition-colors">
                {item.label}
              </button>
            )
          ))}
        </div>

        <div className="hidden md:block">
          <Link to="/ai-signup" className="bg-red-600 hover:bg-red-700 text-white px-6 py-2.5 rounded-md text-sm font-bold transition-all shadow-lg shadow-red-600/20 active:scale-95">
            Get Started
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden relative z-50 text-white"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>

        {/* Mobile Menu Overlay */}
        <div className={`fixed inset-0 bg-black/95 backdrop-blur-xl z-40 flex flex-col items-center justify-center space-y-8 transition-transform duration-300 md:hidden ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
          {menu.map((item) => (
            item.type === 'link' ? (
              <Link key={item.id} to={item.path} onClick={() => setIsMobileMenuOpen(false)} className="text-2xl font-bold hover:text-red-600 transition-colors">
                {item.label}
              </Link>
            ) : (
              <button key={item.id} onClick={() => handleNavClick(item.path)} className="text-2xl font-bold hover:text-red-600 transition-colors">
                {item.label}
              </button>
            )
          ))}
          <Link to="/ai-signup" onClick={() => setIsMobileMenuOpen(false)} className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-md text-lg font-bold transition-all shadow-lg shadow-red-600/20 active:scale-95">
            Get Started
          </Link>
        </div>
      </div>
    </nav >
  );
};

export default Navbar;
