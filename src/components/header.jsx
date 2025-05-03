const Header = () => (
  <header className="bg-primary text-white py-4 shadow-md">
    <nav className="container mx-auto px-4">
      <ul className="flex justify-center space-x-8">
        <li>
          <a
            href="#welcome"
            className="text-secondary hover:text-primary transition duration-300"
          >
            Home
          </a>
        </li>
        <li>
          <a
            href="#about"
            className="text-secondary hover:text-primary transition duration-300"
          >
            About
          </a>
        </li>
        <li>
          <a
            href="#projects"
            className="text-secondary hover:text-primary transition duration-300"
          >
            Projects
          </a>
        </li>
        <li>
          <a
            href="#contact"
            className="text-secondary hover:text-primary transition duration-300"
          >
            Contact
          </a>
        </li>
      </ul>
    </nav>
  </header>
);

export default Header;
