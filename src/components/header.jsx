const Header = () => (
  <header className="fixed top-0 left-0 w-full bg-primary text-white py-4 z-50">
    <nav className="container mx-auto px-24 flex justify-between items-center">
      {/* Left Side: Logo */}
      <div className="text-5xl font-bold text-accent">KS</div>

      {/* Right Side: Navigation Links */}
      <ul className="text-[20px] font-medium flex space-x-24">
        {['Home', 'About', 'Projects', 'Contact'].map((label, index) => (
          <li key={index}>
            <a
              href={`#${label.toLowerCase()}`}
              className="relative text-accent transition duration-300 after:content-[''] after:absolute after:left-0 after:-bottom-1 after:w-0 hover:after:w-full after:h-[2px] after:bg-red-500 after:transition-all after:duration-300"
            >
              {label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  </header>
);

export default Header;
