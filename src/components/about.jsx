import { useState, useEffect } from "react";
import axios from "axios";
import { 
  FaUniversity, 
  FaSchool, 
  FaLaptopCode, 
  FaServer, 
  FaDatabase, 
  FaTools, 
  FaMedal, 
  FaThLarge,
  FaGraduationCap,
  FaCode,
  FaBriefcase
} from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

import * as FaIcons from "react-icons/fa";
import * as SiIcons from "react-icons/si";
import * as DiIcons from "react-icons/di";
import * as AiIcons from "react-icons/ai";
import * as BsIcons from "react-icons/bs";

export default function About() {
  const [activeTab, setActiveTab] = useState("education");
  const [skills, setSkills] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const res = await axios.get(
          import.meta.env.VITE_BACKEND_URL + "/api/skills"
        );
        setSkills(res.data);
      } catch (err) {
        console.error("Failed to fetch skills:", err);
        // Fallback skills data
        setSkills([
          { name: "React", category: "frontend", icon: "SiReact", desc: "Modern UI development" },
          { name: "Node.js", category: "backend", icon: "SiNodedotjs", desc: "Server-side JavaScript" },
          { name: "MongoDB", category: "database", icon: "SiMongodb", desc: "NoSQL database" },
          { name: "Git", category: "tools", icon: "FaGit", desc: "Version control" }
        ]);
      } finally {
        setIsLoading(false);
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
    return Icon ? <Icon className="text-2xl" /> : <FaCode className="text-2xl" />;
  };

  const renderSkillCards = (category) => {
    const categorySkills = skills.filter((skill) => skill.category === category);
    
    if (categorySkills.length === 0) {
      return (
        <div className="text-center py-8 text-gray-500">
          <FaTools className="text-4xl mx-auto mb-4 opacity-50" />
          <p>Skills coming soon...</p>
        </div>
      );
    }

    return categorySkills.map((skill, index) => (
      <motion.div
        key={index}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.1 }}
        className="group bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6 hover:border-cyan-400/50 transition-all duration-300 hover:transform hover:scale-105 hover:shadow-2xl hover:shadow-cyan-500/10"
      >
        <div className="flex items-center space-x-4 mb-3">
          <div className="p-3 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-lg group-hover:scale-110 transition-transform duration-300">
            {getIconComponent(skill.icon)}
          </div>
          <h4 className="text-lg font-semibold text-white group-hover:text-cyan-400 transition-colors">
            {skill.name}
          </h4>
        </div>
        <p className="text-gray-400 text-sm leading-relaxed">{skill.desc}</p>
      </motion.div>
    ));
  };

  const getCategoryHeader = (category) => {
    const headers = {
      frontend: { icon: FaLaptopCode, title: "Frontend Development", color: "text-cyan-400" },
      backend: { icon: FaServer, title: "Backend Development", color: "text-blue-400" },
      database: { icon: FaDatabase, title: "Databases", color: "text-green-400" },
      tools: { icon: FaTools, title: "Tools & Technologies", color: "text-yellow-400" },
      other: { icon: FaThLarge, title: "Other Skills", color: "text-purple-400" }
    };

    const { icon: Icon, title, color } = headers[category] || headers.other;

    return (
      <div className="flex items-center space-x-3 mb-8">
        <div className={`p-3 bg-gray-800 rounded-xl ${color} bg-opacity-20`}>
          <Icon className="text-2xl" />
        </div>
        <div>
          <h3 className={`text-2xl font-bold ${color}`}>{title}</h3>
          <div className="w-12 h-1 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full mt-2"></div>
        </div>
      </div>
    );
  };

  const tabConfig = [
    { id: "education", label: "Education", icon: FaGraduationCap },
    { id: "skills", label: "Skills", icon: FaCode },
    { id: "experience", label: "Experience", icon: FaBriefcase }
  ];

  return (
    <section id="about" className="min-h-screen py-20 bg-gradient-to-br from-gray-900 to-black text-white relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,black,transparent)]"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center space-x-2 bg-gray-800/50 backdrop-blur-sm border border-cyan-400/20 rounded-full px-4 py-2 mb-6">
            <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
            <span className="text-sm text-cyan-300 font-mono">About Me</span>
          </div>
          <h2 className="text-5xl md:text-6xl font-bold mb-6">
            My <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">Journey</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            From classroom to code, exploring the endless possibilities of technology and innovation
          </p>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-12 items-start">
          {/* Left: Image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className="lg:w-2/5 flex justify-center"
          >
            <div className="relative group">
              <div className="absolute -inset-4 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 rounded-3xl blur-2xl opacity-30 group-hover:opacity-50 transition-all duration-1000"></div>
              <div className="relative bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-3 shadow-2xl border border-gray-700/50 group-hover:border-cyan-400/30 transition-all duration-500">
                <img 
                  src="/picture2.jpg" 
                  alt="Kasun Sagara" 
                  className="w-80 h-96 object-cover rounded-2xl grayscale group-hover:grayscale-0 transition-all duration-500 group-hover:scale-105"
                />
                <div className="absolute -bottom-4 -right-4 bg-gray-900/90 backdrop-blur-sm border border-cyan-400/20 rounded-2xl p-4 shadow-2xl">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    <span className="text-sm font-mono text-cyan-300">Computer Science</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right: Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className="lg:w-3/5"
          >
            {/* Toggle Buttons */}
            <div className="flex space-x-2 mb-8 bg-gray-800/50 backdrop-blur-sm rounded-2xl p-2 border border-gray-700">
              {tabConfig.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-3 flex-1 py-4 px-6 rounded-xl transition-all duration-300 ${
                    activeTab === tab.id
                      ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-2xl shadow-cyan-500/25"
                      : "text-gray-400 hover:text-white hover:bg-gray-700/50"
                  }`}
                >
                  <tab.icon className="text-lg" />
                  <span className="font-semibold">{tab.label}</span>
                </button>
              ))}
            </div>

            {/* Content Area */}
            <div className="min-h-[500px]">
              <AnimatePresence mode="wait">
                {/* Education Tab */}
                {activeTab === "education" && (
                  <motion.div
                    key="education"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-8"
                  >
                    {/* University Education */}
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 }}
                      className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-8 hover:border-cyan-400/30 transition-all duration-300 group"
                    >
                      <div className="flex items-start space-x-4 mb-6">
                        <div className="p-4 bg-cyan-500/20 rounded-2xl group-hover:scale-110 transition-transform duration-300">
                          <FaUniversity className="text-3xl text-cyan-400" />
                        </div>
                        <div>
                          <h3 className="text-2xl font-bold text-white mb-2">
                            Trincomalee Campus, Eastern University of Sri Lanka
                          </h3>
                          <div className="flex items-center space-x-4 text-gray-400">
                            <span className="bg-cyan-400/20 text-cyan-300 px-3 py-1 rounded-full text-sm font-mono">2023 - Present</span>
                            <span className="bg-blue-400/20 text-blue-300 px-3 py-1 rounded-full text-sm">Full Time</span>
                          </div>
                        </div>
                      </div>
                      <div className="space-y-4">
                        <h4 className="text-xl font-semibold text-cyan-400">Bachelor of Computer Science [BCS]</h4>
                        <p className="text-gray-300 leading-relaxed">
                          This degree focuses on programming, software development, databases, and computer systems, 
                          with both theoretical and practical project experience. It includes full stack web development, 
                          covering both frontend and backend technologies. Students build applications and sharpen 
                          problem-solving skills for the tech industry.
                        </p>
                        <div className="flex flex-wrap gap-2 mt-4">
                          {["Programming", "Software Development", "Databases", "Full Stack", "Problem Solving"].map((tag, index) => (
                            <span key={index} className="bg-gray-700/50 text-gray-300 px-3 py-1 rounded-full text-sm border border-gray-600">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </motion.div>

                    {/* School Education */}
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 }}
                      className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-8 hover:border-blue-400/30 transition-all duration-300 group"
                    >
                      <div className="flex items-start space-x-4 mb-6">
                        <div className="p-4 bg-blue-500/20 rounded-2xl group-hover:scale-110 transition-transform duration-300">
                          <FaSchool className="text-3xl text-blue-400" />
                        </div>
                        <div>
                          <h3 className="text-2xl font-bold text-white mb-2">
                            R/Dharmaloka Maha Vidyalaya, Pelmadulla
                          </h3>
                          <div className="flex items-center space-x-4 text-gray-400">
                            <span className="bg-blue-400/20 text-blue-300 px-3 py-1 rounded-full text-sm font-mono">Completed 2021</span>
                            <span className="bg-green-400/20 text-green-300 px-3 py-1 rounded-full text-sm">Maths Stream</span>
                          </div>
                        </div>
                      </div>
                      <div className="space-y-4">
                        <h4 className="text-xl font-semibold text-blue-400">GCE Advanced Level</h4>
                        <p className="text-gray-300 leading-relaxed">
                          Specialized in the maths stream with a Z-score of{" "}
                          <span className="text-green-400 font-bold">0.7018</span>.
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                          <div className="text-center p-4 bg-gray-700/30 rounded-xl border border-gray-600">
                            <span className="text-cyan-400 font-semibold">Combined Maths</span>
                            <div className="text-2xl font-bold text-white mt-2">C</div>
                          </div>
                          <div className="text-center p-4 bg-gray-700/30 rounded-xl border border-gray-600">
                            <span className="text-blue-400 font-semibold">Physics</span>
                            <div className="text-2xl font-bold text-white mt-2">C</div>
                          </div>
                          <div className="text-center p-4 bg-gray-700/30 rounded-xl border border-gray-600">
                            <span className="text-green-400 font-semibold">Chemistry</span>
                            <div className="text-2xl font-bold text-white mt-2">C</div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  </motion.div>
                )}

                {/* Skills Tab */}
                {activeTab === "skills" && (
                  <motion.div
                    key="skills"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-12"
                  >
                    {isLoading ? (
                      <div className="flex justify-center items-center py-20">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-400"></div>
                      </div>
                    ) : (
                      ["frontend", "backend", "database", "tools", "other"].map((category) => (
                        <motion.div
                          key={category}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.1 }}
                        >
                          {getCategoryHeader(category)}
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {renderSkillCards(category)}
                          </div>
                        </motion.div>
                      ))
                    )}
                  </motion.div>
                )}

                {/* Experience Tab */}
                {activeTab === "experience" && (
                  <motion.div
                    key="experience"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-8 hover:border-yellow-400/30 transition-all duration-300 group"
                    >
                      <div className="flex items-start space-x-4 mb-6">
                        <div className="p-4 bg-yellow-500/20 rounded-2xl group-hover:scale-110 transition-transform duration-300">
                          <FaMedal className="text-3xl text-yellow-400" />
                        </div>
                        <div>
                          <h3 className="text-2xl font-bold text-white mb-2">
                            Lance Corporal
                          </h3>
                          <div className="flex items-center space-x-4 text-gray-400">
                            <span className="bg-yellow-400/20 text-yellow-300 px-3 py-1 rounded-full text-sm font-mono">Feb 2019 - Mar 2019</span>
                            <span className="bg-red-400/20 text-red-300 px-3 py-1 rounded-full text-sm">Seasonal Training</span>
                          </div>
                        </div>
                      </div>
                      <div className="space-y-4">
                        <h4 className="text-xl font-semibold text-yellow-400">
                          National Cadet Corps, Sri Lanka
                        </h4>
                        <p className="text-gray-300 leading-relaxed">
                          Served as a <strong className="text-yellow-300">Lance Corporal</strong> in the{" "}
                          <strong className="text-yellow-300">National Cadet Corps</strong> during seasonal training 
                          programs in <strong className="text-yellow-300">Rantambe, Sri Lanka</strong>. This seasonal 
                          position involved participating in disciplined military-style training focused on leadership, 
                          responsibility, and resilience.
                        </p>
                        <div className="mt-6">
                          <h5 className="text-lg font-semibold text-white mb-4">Key Responsibilities & Skills Developed:</h5>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {[
                              "Leadership & Team Management",
                              "Time Management",
                              "Team Building & Coordination",
                              "Problem Solving in Pressure",
                              "Mentoring Junior Cadets",
                              "Discipline & Responsibility"
                            ].map((skill, index) => (
                              <div key={index} className="flex items-center space-x-3 bg-gray-700/30 p-3 rounded-lg border border-gray-600">
                                <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                                <span className="text-gray-300 text-sm">{skill}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}