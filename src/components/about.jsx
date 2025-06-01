import { useState, useEffect } from "react";
import axios from "axios";
import { FaUniversity, FaSchool, FaLaptopCode, FaServer, FaDatabase, FaTools, FaMedal, FaThLarge } from "react-icons/fa";

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
    return Icon ? <Icon className="text-3xl text-[#00ffff] mb-2" /> : null;
  };

  const renderSkillCards = (category) => {
    return skills
      .filter((skill) => skill.category === category)
      .map((skill, index) => (
        <div
          key={index}
          className="bg-white backdrop-filter backdrop-blur-lg bg-opacity-10 px-6 py-4 rounded-2xl shadow-md w-64 transform transition duration-300 hover:scale-105 hover:shadow-xl cursor-pointer"
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
          <span className="flex items-center gap-3 text-[#00ffff] text-2xl font-semibold mb-4">
            <FaLaptopCode className="text-[#00ffff]" />
            Frontend Development
          </span>
        );
      case "backend":
        return (
          <span className="flex items-center gap-3 text-[#00ffff] text-2xl font-semibold mb-4">
            <FaServer className="text-[#00ffff]" />
            Backend Development
          </span>
        );
      case "database":
        return (
          <span className="flex items-center gap-3 text-[#00ffff] text-2xl font-semibold mb-4">
            <FaDatabase className="text-[#00ffff]" />
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
      case "other":
        return (
          <span className="flex items-center gap-3 text-[#00ffff] text-2xl font-semibold mb-4">
            <FaThLarge className="text-[#00ffff]" />
            Other 
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <section
      id="about"
      className="flex items-center justify-center min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white px-4 py-24"
    >
      <div className="container mx-auto flex flex-col md:flex-row justify-center items-center gap-8 text-center md:text-left">
        {/* Left: Image */}
        <div className="w-full md:w-1/2 flex justify-center mb-10 md:mb-0">
          <img
            src="/picture2.jpg"
            alt="Kasun Sagara"
            className="rounded-2xl shadow-lg w-3/4 sm:w-1/2 h-72 sm:h-96 object-cover border-4 border-[#00ffff]"
          />
        </div>

        {/* Right: Content */}
        <div className="w-full md:w-1/2">
          <h2 className="text-5xl sm:text-5xl font-bold text-[#00ffff] mb-10">
            About Me
          </h2>

          {/* Toggle Buttons */}
          <div className="flex justify-center md:justify-start gap-3 flex-wrap mb-6">
            <button
              onClick={() => setActiveTab("education")}
              className={`px-4 py-2 rounded-lg font-semibold transition w-full sm:w-auto ${
                activeTab === "education"
                  ? "bg-[#192230] text-[#00ffff] border-2 border-[#00ffff]"
                  : "bg-[#00ffff] text-[#192230] hover:bg-[#192230] hover:text-[#00ffff] border-2 border-[#00ffff]"
              }`}
            >
              Education
            </button>
            <button
              onClick={() => setActiveTab("skills")}
              className={`px-4 py-2 rounded-lg font-semibold transition w-full sm:w-auto ${
                activeTab === "skills"
                  ? "bg-[#192230] text-[#00ffff] border-2 border-[#00ffff]"
                  : "bg-[#00ffff] text-[#192230] hover:bg-[#192230] hover:text-[#00ffff] border-2 border-[#00ffff]"
              }`}
            >
              Skills
            </button>
            <button
              onClick={() => setActiveTab("experience")}
              className={`px-4 py-2 rounded-lg font-semibold transition w-full sm:w-auto ${
                activeTab === "experience"
                  ? "bg-[#192230] text-[#00ffff] border-2 border-[#00ffff]"
                  : "bg-[#00ffff] text-[#192230] hover:bg-[#192230] hover:text-[#00ffff] border-2 border-[#00ffff]"
              }`}
            >
              Experience
            </button>
          </div>

          {/* Education Tab */}
          {activeTab === "education" && (
            <div className="space-y-10 text-left">
              <div>
                <h3 className="text-xl font-semibold text-[#00ffff] flex items-center gap-4 mb-4">
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
                  This degree focuses on programming, software development, databases, and computer <br />
                  systems, with both theoretical and practical project experience. It also includes full stack <br />
                  web development, covering both frontend and backend technologies. Students build <br />
                  applications and sharpen problem solving skills for the tech industry.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-[#00ffff] flex items-center gap-4 mb-4">
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
              {["frontend", "backend", "database", "tools", "other"].map((category) => (
                <div key={category} className="mb-6">
                  {getCategoryHeader(category)}
                  <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                    {renderSkillCards(category)}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Experience Tab */}
          {activeTab === "experience" && (
            <div className="space-y-10 text-left">
              <div>
                <h3 className="text-xl font-semibold text-[#00ffff] flex items-center gap-4 mb-4">
                  <FaMedal className="text-3xl" />
                  <span>Lance Corporal</span>
                </h3>
                <p className="text-lg font-medium mb-2">National Cadet Corps, Sri Lanka</p>
                <p className="text-sm mb-2">February 2019 – March 2019</p>
                <p className="text-base leading-relaxed">
                  Served as a <strong>Lance Corporal</strong> in the <strong>National Cadet Corps</strong> during seasonal training <br />
                  programs in <strong>Rantambe, Sri Lanka</strong>. This <strong>seasonal position</strong> involved participating in <br />
                  disciplined military-style training focused on leadership, responsibility, and resilience. <br />
                  I played a key role in coordinating group activities, mentoring junior cadets, and <br />
                  managing time-sensitive tasks in a high-pressure environment. This experience <br />
                  strengthened my abilities in <strong>time management</strong>, <strong>team management</strong>, <strong>team building</strong>, <br />
                  <strong>teamwork</strong>, and <strong>leadership</strong>.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
