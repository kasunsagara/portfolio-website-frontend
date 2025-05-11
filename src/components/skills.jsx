import { useState, useEffect } from "react";
import axios from "axios";
import { FaLaptopCode, FaServer, FaDatabase, FaTools } from "react-icons/fa";

import * as FaIcons from "react-icons/fa";
import * as SiIcons from "react-icons/si";
import * as DiIcons from "react-icons/di";
import * as AiIcons from "react-icons/ai";
import * as BsIcons from "react-icons/bs";

export default function Skill() {
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
    return Icon ? <Icon className="text-4xl text-accent mb-3" /> : null;
  };

  const renderSkillCards = (category) => {
    return skills
      .filter((skill) => skill.category === category)
      .map((skill, index) => (
        <div
          key={index}
          className="bg-secondary px-8 py-6 rounded-2xl shadow-lg w-72 transform transition duration-300 hover:scale-105 hover:shadow-xl"
        >
          <div className="flex flex-col items-start text-left">
            {getIconComponent(skill.icon)}
            <h4 className="text-xl font-bold">{skill.name}</h4>
            <p className="text-sm mt-2">{skill.desc}</p>
          </div>
        </div>
      ));
  };

  const getCategoryHeader = (category) => {
    switch (category) {
      case "frontend":
        return (
          <span className="flex items-center justify-center gap-3 text-accent text-2xl font-semibold mb-6">
            <FaLaptopCode className="text-accent" />
            Frontend Development
          </span>
        );
      case "backend":
        return (
          <span className="flex items-center justify-center gap-3 text-accent text-2xl font-semibold mb-6">
            <FaServer className="text-accent" />
            Backend Development
          </span>
        );
      case "database":
        return (
          <span className="flex items-center justify-center gap-3 text-accent text-2xl font-semibold mb-6">
            <FaDatabase className="text-accent" />
            Databases
          </span>
        );
      case "tools":
        return (
          <span className="flex items-center justify-center gap-3 text-accent text-2xl font-semibold mb-6">
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
      id="skills"
      className="flex flex-col items-center justify-center min-h-screen bg-primary text-white px-4 py-24"
    >
      <div className="container mx-auto">
        <h2 className="text-5xl font-bold text-accent mb-14 text-center">My Skills</h2>
        <div className="space-y-16">
          {["frontend", "backend", "database", "tools"].map((category) => (
            <div key={category}>
              {getCategoryHeader(category)}
              <div className="flex flex-wrap justify-center gap-8 mt-6">
                {renderSkillCards(category)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
