import { FaFacebookF, FaLinkedinIn, FaGithub, FaWhatsapp } from "react-icons/fa";

export default function Footer() {
  return (
  <footer className="bg-gradient-to-b from-gray-900 to-gray-800 text-white py-10">
    <div className="max-w-7xl mx-auto px-6">
      <div className="flex flex-col md:flex-row justify-between items-center text-center md:text-left space-y-6 md:space-y-0">
        
        {/* Left - Name and Description */}
        <div className="flex flex-col items-center md:items-start mb-4 md:mb-0">
          <h1 className="text-2xl font-semibold text-[#00ffff] mb-2">Kasun Sagara</h1>
          <p className="max-w-md">
            A Computer Science undergraduate, Full Stack Web Developer and UI/UX Designer 
            with a passion for building modern web applications with the MERN Stack.
          </p>
        </div>

        {/* Center - Quick Links */}
        <div className="flex flex-col items-center md:items-start space-y-2">
          <h1 className="text-2xl font-semibold text-[#00ffff] mb-2">Quick Links</h1>
          <a href="#home" className="hover:text-gray-500 transition-colors duration-300">
            Home
          </a>          
          <a href="#about" className="hover:text-gray-500 transition-colors duration-300">
            About
          </a>
          <a href="#services" className="hover:text-gray-500 transition-colors duration-300">
            Services
          </a>          
          <a href="#projects" className="hover:text-gray-500 transition-colors duration-300">
            Projects
          </a>
          <a href="#contact" className="hover:text-gray-500 transition-colors duration-300">
            Contact
          </a>
        </div>

        {/* Right - Social Icons */}
        <div className="flex flex-col items-center md:items-start">
          <h1 className="text-2xl font-semibold text-[#00ffff] mb-4">Connect With Me</h1>
          <div className="flex space-x-4 text-xl">
            <a
              href="https://github.com/kasunsagara"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gray-700 text-[#00ffff] rounded-full p-2 hover:bg-[#00ffff] hover:text-gray-700 transition-transform transform hover:scale-110"
            >
              <FaGithub />
            </a> 

            <a
              href="https://www.linkedin.com/in/kasun-sagara-ba47b22a9/"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gray-700 text-[#00ffff] rounded-full p-2 hover:bg-[#00ffff] hover:text-gray-700 transition-transform transform hover:scale-110"
            >
              <FaLinkedinIn />
            </a>

            <a
              href="https://www.facebook.com/kasun.sagara.672450?mibextid=ZbWKwL"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gray-700 text-[#00ffff] rounded-full p-2 hover:bg-[#00ffff] hover:text-gray-700 transition-transform transform hover:scale-110"
            >
              <FaFacebookF />
            </a>

            <a
              href="https://wa.me/94771670585"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gray-700 text-[#00ffff] rounded-full p-2 hover:bg-[#00ffff] hover:text-gray-700 transition-transform transform hover:scale-110"
            >
              <FaWhatsapp />
            </a>
          </div>
        </div>
      </div>

      <hr className="border-t border-white/30 my-6" />

      <div className="flex justify-center">
        <p className="text-center text-base font-medium tracking-wide">
          © {new Date().getFullYear()}{" "}
          <span className="font-semibold transition-colors duration-300">Kasun Sagara</span>. All Rights Reserved.
        </p>
      </div>
    </div>
  </footer>
  );
};


