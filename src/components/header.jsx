import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Header() {
  const navigate = useNavigate();
  const keysPressed = useRef({});

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
    <header className="fixed top-0 left-0 w-full bg-primary text-white py-4 z-50">
      <nav className="container mx-auto px-24 flex justify-between items-center">
        {/* Logo */}
        <div className="text-5xl font-bold text-accent">KS</div>

        {/* Navigation */}
        <ul className="text-[20px] font-medium flex space-x-12 items-center">
          {['Home', 'About', 'Services', 'Projects', 'Contact'].map((label, index) => (
            <li key={index}>
              <a
                href={`#${label.toLowerCase()}`}
                className="relative text-accent transition duration-300 after:content-[''] after:absolute after:left-0 after:-bottom-1 after:w-0 hover:after:w-full after:h-[2px] after:bg-white after:transition-all after:duration-300"
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
