import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react'; // Optional: Replace with your own icons

export default function Header() {
  const navigate = useNavigate();
  const keysPressed = useRef({});
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Hidden shortcut for admin login
  useEffect(() => {
    const handleKeyDown = (e) => {
      keysPressed.current[e.key.toLowerCase()] = true;

      if (
        keysPressed.current['k'] &&
        keysPressed.current['s']
      ) {
        navigate('/admin-login');
      }
    };

    const handleKeyUp = (e) => {
      keysPressed.current[e.key.toLowerCase()] = false;
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [navigate]);

  return (
    <header className="fixed top-0 left-0 w-full bg-gradient-to-b from-gray-900 to-gray-800 text-white py-4 z-50">
      <nav className="container mx-auto px-6 md:px-24 flex justify-between items-center">
        {/* Logo */}
        <div className="text-4xl md:text-5xl font-bold text-[#00ffff]">KS</div>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Toggle menu">
            {isMenuOpen ? <X size={28} className="text-[#00ffff]" /> : <Menu size={28} className="text-[#00ffff]" />}
          </button>
        </div>

        {/* Navigation */}
        <ul
          className={`absolute md:static top-20 left-0 w-full md:w-auto bg-gradient-to-b from-gray-900 to-gray-800 md:bg-none flex-col md:flex-row text-[18px] md:text-[20px] font-medium flex md:flex space-y-4 md:space-y-0 md:space-x-12 items-start md:items-center px-6 md:px-0 transition-all duration-300 ${
            isMenuOpen ? 'flex' : 'hidden md:flex'
          }`}
        >
          {['Home', 'About', 'Services', 'Projects', 'Contact'].map((label, index) => (
            <li key={index}>
              <a
                href={`#${label.toLowerCase()}`}
                className="relative text-[#00ffff] transition duration-300 after:content-[''] after:absolute after:left-0 after:-bottom-1 after:w-0 hover:after:w-full after:h-[2px] after:bg-white after:transition-all after:duration-300"
              >
                {label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
s