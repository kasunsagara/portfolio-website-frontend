import { useState, useEffect } from "react";

const Welcome = () => {
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
      id="welcome"
      className="flex items-center justify-center min-h-screen bg-primary text-white px-4"
    >
      <div className="flex flex-col md:flex-row items-center justify-between max-w-6xl w-full gap-8 text-center md:text-left -mt-20">
        {/* Text content */}
        <div className="max-w-lg z-16">
          <h1 className="text-6xl font-bold text-secondary mb-4 whitespace-nowrap">
            Hi, I'm Kasun Sagara
          </h1>

          <p
            className={`text-[25px] font-medium text-secondary mb-4 transition-opacity duration-500 ${
              fade ? "opacity-100" : "opacity-0"
            }`}
          >
            {roles[currentRoleIndex]}
          </p>

          <p className="text-secondary mb-8">Welcome to my portfolio! Explore the other sections to learn more about my projects, skills, and professional journey.</p>

          <a
            href="#about"
            className="inline-block py-2 px-6 text-lg font-semibold bg-secondary text-primary rounded-lg shadow-lg hover:bg-gray-700 hover:text-white transition duration-300 z-10 relative"
          >
            Learn More About Me
          </a>
        </div>

        {/* Circular image with spinning border */}
        <div className="relative w-96 h-96">
  {/* Glowing ring */}
  <div className="absolute inset-0 rounded-full animate-pulse-glow z-0" />

  {/* Image inside glow */}
  <div className="relative w-full h-full rounded-full overflow-hidden z-10 border-4 border-secondary animate-pulse-glow">
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

export default Welcome;
