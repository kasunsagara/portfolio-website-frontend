import { useState, useEffect } from "react";
import { FaFacebookF, FaLinkedinIn, FaGithub, FaWhatsapp } from "react-icons/fa";

const Home = () => {
  const roles = [
    "Computer Science Undergraduate",
    "Full Stack Web Developer",
    "UI/UX Designer",
  ];

  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false); // start fade-out
      setTimeout(() => {
        setCurrentRoleIndex((prev) => (prev + 1) % roles.length);
        setFade(true); // start fade-in
      }, 500); // match fade-out duration
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id="home"
      className="flex items-center justify-center min-h-screen bg-primary px-4 mt-16"
    >
      <div className="flex flex-col md:flex-row items-center justify-between max-w-6xl w-full gap-8 text-center md:text-left -mt-20">
        {/* Text content */}
        <div className="max-w-lg z-16">
          <h1 className="text-6xl font-bold text-accent mb-4 whitespace-nowrap">
            Hi, I'm Kasun Sagara
          </h1>

          <p
            className={`text-[25px] font-medium text-accent mb-4 transition-opacity duration-500 ${
              fade ? "opacity-100" : "opacity-0"
            }`}
          >
            {roles[currentRoleIndex]}
          </p>

          <p className="text-accent mb-8">
            Welcome to my portfolio! Explore the other sections to learn more about my projects, skills, and professional journey.
          </p>

          <div className="flex space-x-4 text-xl mb-6">
            <a
              href="https://github.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-trinity text-accent rounded-full p-2 hover:bg-gray-500 transition-transform transform hover:scale-110"
            >
              <FaGithub />
            </a>

            <a
              href="https://linkedin.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-trinity text-accent rounded-full p-2 hover:bg-gray-500 transition-transform transform hover:scale-110"
            >
              <FaLinkedinIn />
            </a>

            <a
              href="https://facebook.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-trinity text-accent rounded-full p-2 hover:bg-gray-500 transition-transform transform hover:scale-110"
            >
              <FaFacebookF />
            </a>

            <a
              href="https://wa.me/94771670585"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-trinity text-accent rounded-full p-2 hover:bg-gray-500 transition-transform transform hover:scale-110"
            >
              <FaWhatsapp />
            </a>
          </div>

          {/* Download CV Button */}
          <a
            href="/Kasun_Sagara_CV.pdf" // Place the PDF in your public folder
            download
            className="inline-block py-2 px-6 text-lg font-semibold bg-accent text-black rounded-lg shadow-lg hover:bg-gray-700 hover:text-white transition duration-300 z-10 relative"
          >
            Download CV
          </a>
        </div>

        {/* Circular image with spinning border */}
        <div className="relative w-96 h-96">
          {/* Glowing ring */}
          <div className="absolute inset-0 rounded-full animate-pulse-glow z-0" />

          {/* Image inside glow */}
          <div className="relative w-full h-full rounded-full overflow-hidden z-10 border-4 border-accent animate-pulse-glow">
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
};

export default Home;
