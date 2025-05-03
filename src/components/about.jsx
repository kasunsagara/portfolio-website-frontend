import { useState } from "react";

const About = () => {
  const [activeTab, setActiveTab] = useState("education");

  return (
    <section id="about" className="py-16 bg-primary text-white px-4">
      <div className="container mx-auto flex flex-col md:flex-row items-center gap-10">
        
        {/* Left: Image */}
        <div className="w-full md:w-1/2 flex justify-center">
          <img
            src="/path-to-your-photo.jpg" // Replace with your actual image path
            alt="Kasun Sagara"
            className="rounded-2xl shadow-lg w-64 h-64 object-cover"
          />
        </div>

        {/* Right: Toggle Panel */}
        <div className="w-full md:w-1/2 text-center md:text-left">
          <h2 className="text-4xl font-bold text-secondary mb-6">About Me</h2>

          {/* Toggle Buttons */}
          <div className="flex justify-center md:justify-start gap-4 mb-6">
            <button
              onClick={() => setActiveTab("education")}
              className={`px-4 py-2 rounded-lg font-medium transition ${
                activeTab === "education"
                  ? "bg-secondary text-primary"
                  : "bg-gray-700 text-white"
              }`}
            >
              Education
            </button>
            <button
              onClick={() => setActiveTab("skills")}
              className={`px-4 py-2 rounded-lg font-medium transition ${
                activeTab === "skills"
                  ? "bg-secondary text-primary"
                  : "bg-gray-700 text-white"
              }`}
            >
              Skills
            </button>
          </div>

          {/* Toggle Content */}
          {activeTab === "education" && (
            <div>
              <p className="text-lg leading-relaxed">
                I’m currently an Undergraduate Computer Science student at the
                Trincomalee Campus of Eastern University Sri Lanka. My academic
                focus is on web technologies, software development, and user
                experience.
              </p>
            </div>
          )}

          {activeTab === "skills" && (
            <div className="flex flex-wrap gap-3 justify-center md:justify-start">
              {[
                "MERN Stack",
                "UI/UX Design",
                "Frontend Development",
                "Backend Development",
                "MongoDB",
                "Express.js",
                "React.js",
                "Node.js",
              ].map((skill, index) => (
                <span
                  key={index}
                  className="bg-accent text-primary px-4 py-2 rounded-full shadow-md"
                >
                  {skill}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default About;
