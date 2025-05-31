import { useState, useEffect } from "react";
import { FaFacebookF, FaLinkedinIn, FaGithub, FaWhatsapp } from "react-icons/fa";

export default function Home() {
  const roles = [
    "Computer Science Undergraduate",
    "Full Stack Web Developer",
    "UI/UX Designer",
  ];

  const [text, setText] = useState("");
  const [roleIndex, setRoleIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentRole = roles[roleIndex];
    let typingSpeed = isDeleting ? 50 : 100;

    const timeout = setTimeout(() => {
      if (isDeleting) {
        setText(currentRole.substring(0, charIndex - 1));
        setCharIndex((prev) => prev - 1);
      } else {
        setText(currentRole.substring(0, charIndex + 1));
        setCharIndex((prev) => prev + 1);
      }

      if (!isDeleting && charIndex === currentRole.length) {
        setTimeout(() => setIsDeleting(true), 1500); // pause before deleting
      } else if (isDeleting && charIndex === 0) {
        setIsDeleting(false);
        setRoleIndex((prev) => (prev + 1) % roles.length);
      }
    }, typingSpeed);

    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, roleIndex]);

  return (
    <section
      id="home"
      className="flex items-center justify-center min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 px-4 mt-16"
    >
      <div className="flex flex-col md:flex-row items-center justify-between max-w-6xl w-full gap-8 text-center md:text-left -mt-20">
        {/* Text content */}
        <div className="max-w-lg z-16">
          <h1 className="text-6xl font-bold text-[#00ffff] mb-4 whitespace-nowrap">
            Hi, I'm Kasun Sagara
          </h1>

          <p className="text-[25px] font-medium text-[#00ffff] mb-4 min-h-[32px]">
            {text}
            <span className="animate-blink">|</span>
          </p>

          <p className="text-[#00ffff] mb-8">
            Welcome to my portfolio! Explore the other sections to learn more about my projects, skills, and professional journey.
          </p>

          <div className="flex space-x-4 text-xl mb-6">
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

          {/* Download CV Button */}
          <a
            href="/Kasun_Sagara_CV.pdf"
            download
            className="inline-block py-2 px-6 text-lg font-semibold bg-[#00ffff] text-[#192230] rounded-lg shadow-lg hover:bg-[#192230] hover:text-[#00ffff] hover:border-2 border-[#00ffff] transition-transform transform duration-300 z-10 relative"
          >
            Download CV
          </a>
        </div>

        {/* Circular image with spinning border */}
        <div className="relative w-96 h-96">
          <div className="absolute inset-0 rounded-full animate-pulse-glow z-0" />
          <div className="relative w-full h-full rounded-full overflow-hidden z-10 border-4 border-[#00ffff] animate-pulse-glow">
            <img
              src="/picture1.jpg"
              alt="Kasun Sagara"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
