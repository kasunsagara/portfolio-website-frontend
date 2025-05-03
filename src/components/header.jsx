const Header = () => (
  <header className="bg-primary text-white py-4 shadow-md">
    <nav className="container mx-auto px-24 flex justify-between items-center">
      {/* Left Side: Logo */}
      <div className="text-5xl font-bold text-secondary">KS</div>

      {/* Right Side: Navigation Links */}
      <ul className="text-[22px] font-medium flex space-x-24">
        <li>
          <a
            href="#welcome"
            className="relative text-secondary transition duration-300 after:content-[''] after:absolute after:left-0 after:-bottom-1 after:w-0 hover:after:w-full after:h-[2px] after:bg-red-500 after:transition-all after:duration-300"
          >
            Home
          </a>
        </li>
        <li>
          <a
            href="#about"
            className="relative text-secondary transition duration-300 after:content-[''] after:absolute after:left-0 after:-bottom-1 after:w-0 hover:after:w-full after:h-[2px] after:bg-red-500 after:transition-all after:duration-300"
          >
            About
          </a>
        </li>
        <li>
          <a
            href="#projects"
            className="relative text-secondary transition duration-300 after:content-[''] after:absolute after:left-0 after:-bottom-1 after:w-0 hover:after:w-full after:h-[2px] after:bg-red-500 after:transition-all after:duration-300"
          >
            Projects
          </a>
        </li>
        <li>
          <a
            href="#contact"
            className="relative text-secondary transition duration-300 after:content-[''] after:absolute after:left-0 after:-bottom-1 after:w-0 hover:after:w-full after:h-[2px] after:bg-red-500 after:transition-all after:duration-300"
          >
            Contact
          </a>
        </li>
      </ul>
    </nav>
  </header>
);

export default Header;
