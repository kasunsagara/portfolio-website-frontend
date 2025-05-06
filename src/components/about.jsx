import { useState, useEffect } from "react";
import axios from "axios";
import { FaUniversity, FaSchool, FaLaptopCode, FaServer, FaDatabase, FaTools } from "react-icons/fa";

import * as FaIcons from "react-icons/fa";
import * as SiIcons from "react-icons/si";
import * as DiIcons from "react-icons/di";
import * as AiIcons from "react-icons/ai";
import * as BsIcons from "react-icons/bs";

export default function About() {
  const [activeTab, setActiveTab] = useState("education");
  const [skills, setSkills] = useState([]);

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const res = await axios.get(
          import.meta.env.VITE_BACKEND_URL + "/api/skills"
        );
        setSkills(res.data);
      } catch (err) {
        console.error("Failed to fetch skills:", err);
      }
    };
    fetchSkills();
  }, []);

  const getIconComponent = (iconName) => {
    const iconLibraries = {
      ...FaIcons,
      ...SiIcons,
      ...DiIcons,
      ...AiIcons,
      ...BsIcons,
    };
    const Icon = iconLibraries[iconName];
    return Icon ? <Icon className="text-3xl text-accent mb-2" /> : null;
  };

  const renderSkillCards = (category) => {
    return skills
      .filter((skill) => skill.category === category)
      .map((skill, index) => (
        <div
          key={index}
          className="bg-trinity px-6 py-4 rounded-2xl shadow-md w-64 transform transition duration-300 hover:scale-105 hover:shadow-xl cursor-pointer"
        >
          {getIconComponent(skill.icon)}
          <h4 className="text-lg font-bold">{skill.name}</h4>
          <p className="text-sm mt-1">{skill.desc}</p>
        </div>
      ));
  };

  const getCategoryHeader = (category) => {
    switch (category) {
      case "frontend":
        return (
          <span className="flex items-center gap-3 text-accent text-2xl font-semibold mb-4">
            <FaLaptopCode className="text-accent" />
            Frontend Development
          </span>
        );
      case "backend":
        return (
          <span className="flex items-center gap-3 text-accent text-2xl font-semibold mb-4">
            <FaServer className="text-accent" />
            Backend Development
          </span>
        );
      case "database":
        return (
          <span className="flex items-center gap-3 text-accent text-2xl font-semibold mb-4">
            <FaDatabase className="text-accent" />
            Databases
          </span>
        );
      case "tools":
        return (
          <span className="flex items-center gap-3 text-accent text-2xl font-semibold mb-4">
            <FaTools className="text-accent" />
            Tools
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <section
      id="about"
      className="flex items-center justify-center min-h-screen bg-secondary text-white px-4 py-24"
    >
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
            <div className="space-y-10 text-left">
              <div>
                <h3 className="text-xl font-semibold text-accent flex items-center gap-4 mb-4">
                  <FaUniversity className="text-3xl" />
                  <span>
                    Trincomalee Campus, Eastern University of Sri Lanka
                  </span>
                </h3>
                <p className="text-lg font-medium mb-2">
                  Bachelor of Computer Science [BCS]
                </p>
                <p className="text-sm mb-2">July 2023 - Present</p>
                <p className="text-base leading-relaxed">
                  This degree focuses on programming, software development,
                  databases, and computer <br />
                  systems, with both theoretical and practical project
                  experience. It also includes full stack <br />
                  web development, covering both frontend and backend
                  technologies. Students build <br />
                  applications and sharpen problem solving skills for the tech
                  industry.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-accent flex items-center gap-4 mb-4">
                  <FaSchool className="text-3xl" />
                  <span>R/Dharmaloka Maha Vidyalaya, Pelmadulla</span>
                </h3>
                <p className="text-lg font-medium mb-2">GCE Advanced Level</p>
                <p className="text-sm mb-2">Completed 2021</p>
                <p className="text-base leading-relaxed mb-1">
                  Specialized in the maths stream with a Z-score of{" "}
                  <span className="font-semibold">0.7018</span>.
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
                  {getCategoryHeader(category)}
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


