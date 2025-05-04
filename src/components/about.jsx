import { useState, useEffect } from "react";
import axios from "axios";

const About = () => {
  const [activeTab, setActiveTab] = useState("education");
  const [skills, setSkills] = useState([]);

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const res = await axios.get(import.meta.env.VITE_BACKEND_URL + '/api/skills'); // Replace with your backend URL
        setSkills(res.data);
      } catch (err) {
        console.error("Failed to fetch skills:", err);
      }
    };
    fetchSkills();
  }, []);

  const renderSkillCards = (category) => {
    return skills
      .filter((skill) => skill.category === category)
      .map((skill, index) => (
        <div
          key={index}
          className="bg-trinity px-6 py-4 rounded-2xl shadow-md w-64 transform transition duration-300 hover:scale-105 hover:bg-gray-500 hover:shadow-xl cursor-pointer"
        >
          <h4 className="text-lg font-bold">{skill.name}</h4>
          <p className="text-sm mt-1">{skill.desc}</p>
        </div>
      ));
  };

  return (
    <section id="about" className="min-h-screen flex items-center justify-center bg-secondary text-white px-4">
      <div className="container mx-auto flex flex-col md:flex-row justify-center items-center gap-0 text-center">
        
        {/* Left: Image */}
        <div className="w-full md:w-1/2 flex justify-center">
          <img
            src="/picture2.jpg"
            alt="Kasun Sagara"
            className="rounded-2xl shadow-lg w-1/2 h-96 object-cover border-4 border-accent"
          />
        </div>

        {/* Right: Content */}
        <div className="w-full md:w-1/2 text-left">
        <h2 className="text-5xl font-bold text-left text-accent mb-10">
            About Me
          </h2>

          {/* Toggle Buttons */}
          <div className="flex justify-center md:justify-start gap-4 mb-6">
            <button
              onClick={() => setActiveTab("education")}
              className={`px-4 py-2 rounded-lg font-semibold transition ${
                activeTab === "education"
                  ? "bg-accent text-black"
                  : "bg-gray-700 text-white"
              }`}
            >
              Education
            </button>
            <button
              onClick={() => setActiveTab("skills")}
              className={`px-4 py-2 rounded-lg font-semibold transition ${
                activeTab === "skills"
                  ? "bg-accent text-black"
                  : "bg-gray-700 text-white"
              }`}
            >
              Skills
            </button>
          </div>

          {/* Education Tab */}
          {activeTab === "education" && (
            <div className="space-y-6 text-left">
              <div>
                <h3 className="text-xl font-semibold text-accent">
                  Trincomalee Campus, Eastern University of Sri Lanka
                </h3>
                <p className="text-lg font-medium">Bachelor of Computer Science [BCS]</p>
                <p className="text-sm mb-2">July 2023 - Present</p>
                <p className="text-base leading-relaxed">
                  This degree focuses on programming, software development, databases, and computer systems, with both theoretical and practical project experience. It also includes full-stack web development, covering both front-end and back-end technologies.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-accent">
                  R/Dharmaloka Maha Vidyalaya, Pelmadulla
                </h3>
                <p className="text-lg font-medium">GCE Advanced Level</p>
                <p className="text-sm mb-2">Completed 2021</p>
                <p className="text-base leading-relaxed mb-1">
                  Specialized in the maths stream with a Z-score of <span className="font-semibold">0.7018</span>.
                </p>
                <ul className="list-disc list-inside text-base ml-2">
                  <li>Combined Maths – C</li>
                  <li>Physics – C</li>
                  <li>Chemistry – C</li>
                </ul>
              </div>
            </div>
          )}

          {/* Skills Tab */}
          {activeTab === "skills" && (
            <div className="space-y-6">
              {["frontend", "backend", "database", "tools"].map((category) => (
                <div key={category} className="mb-6">
                  <h3 className="text-2xl font-semibold text-accent mb-4 capitalize">
                    {category} Development
                  </h3>
                  <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                    {renderSkillCards(category)}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default About;
