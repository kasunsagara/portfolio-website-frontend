import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Menu, X, Code, Terminal } from 'lucide-react';

export default function Header() {
  const navigate = useNavigate();
  const keysPressed = useRef({});
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e) => {
      keysPressed.current[e.key.toLowerCase()] = true;

      if (keysPressed.current['k'] && keysPressed.current['s']) {
        navigate('/secret');
      }
    };

    const handleKeyUp = (e) => {
      keysPressed.current[e.key.toLowerCase()] = false;
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    
    // Add scroll effect
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [navigate]);

  return (
    <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
      scrolled 
        ? 'bg-gray-900/95 backdrop-blur-xl py-3 shadow-2xl shadow-cyan-500/10 border-b border-gray-800' 
        : 'bg-transparent py-6'
    }`}>
      <nav className="container mx-auto px-6 flex justify-between items-center">
        {/* Animated Logo */}
        <div 
          className="flex items-center space-x-3 group cursor-pointer"
          onClick={() => navigate('/')}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div className="relative">
            <div className={`w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center transition-all duration-500 ${
              isHovered ? 'rotate-12 scale-110 shadow-2xl shadow-cyan-400/30' : 'shadow-lg shadow-cyan-400/20'
            }`}>
              <Terminal className="text-white" size={24} />
            </div>
            <div className={`absolute -inset-2 bg-gradient-to-r from-cyan-400 to-blue-600 rounded-xl blur-lg opacity-30 transition-all duration-500 ${
              isHovered ? 'opacity-50 scale-110' : ''
            }`}></div>
          </div>
          <div className="flex flex-col">
            <span className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              KS
            </span>
          </div>
        </div>

        {/* Desktop Navigation */}
        <ul className="hidden md:flex items-center space-x-8">
          {['Home', 'About', 'Services', 'Projects', 'Contact'].map((label, index) => (
            <li key={index} className="relative group">
              <a 
                href={`#${label.toLowerCase()}`}
                className="text-gray-300 hover:text-white font-medium transition-all duration-300 flex items-center space-x-1 py-2"
              >
                <span>{label}</span>
              </a>
              <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-400 to-blue-500 transition-all duration-300 group-hover:w-full"></div>
            </li>
          ))}
          <li>
            <button
              onClick={() => {
                const contactSection = document.querySelector('#contact');
                if (contactSection) {
                  contactSection.scrollIntoView({ behavior: 'smooth' });
                }
                setIsMenuOpen(false); // for mobile menu close
              }}
              className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-medium py-2 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-cyan-500/25 border border-cyan-400/20"
            >
              Let's Talk
            </button>
          </li>
        </ul>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden">
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)} 
            aria-label="Toggle menu"
            className="relative p-3 rounded-xl bg-gray-800/50 hover:bg-gray-700/50 transition-all duration-300 border border-gray-700"
          >
            {isMenuOpen ? <X size={24} className="text-cyan-400" /> : <Menu size={24} className="text-cyan-400" />}
            <div className="absolute -inset-1 bg-cyan-400/10 rounded-xl blur-sm"></div>
          </button>
        </div>

        {/* Mobile Navigation */}
        <div className={`absolute top-full left-0 w-full md:hidden bg-gray-900/95 backdrop-blur-xl border-b border-gray-800 transition-all duration-500 ${
          isMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none'
        }`}>
          <ul className="container mx-auto px-6 py-6 space-y-4">
            {['Home', 'About', 'Services', 'Projects', 'Contact'].map((label, index) => (
              <li key={index}>
                <a 
                  href={`#${label.toLowerCase()}`}
                  className="flex items-center space-x-3 text-gray-300 hover:text-white py-3 px-4 rounded-xl hover:bg-gray-800/50 transition-all duration-300 border border-transparent hover:border-gray-700"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Code size={16} className="text-cyan-400" />
                  <span className="font-medium">{label}</span>
                </a>
              </li>
            ))}
            <li className="pt-4">
              <button className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-medium py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105">
                Let's Talk
              </button>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
}