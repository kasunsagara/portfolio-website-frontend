import React from "react";
import { FaRobot, FaStar, FaCode, FaBrain } from "react-icons/fa";
import { SiOpenai, SiStellar, SiGooglegemini, SiAnthropic } from "react-icons/si";
import { motion } from "framer-motion";

const tools = [
  {
    name: "ChatGPT",
    description: "Advanced AI chatbot by OpenAI with natural language processing",
    link: "https://chat.openai.com",
    icon: <SiOpenai className="text-2xl" />,
    bgGradient: "from-green-500 to-emerald-600",
  },
  {
    name: "Gemini",
    description: "Multimodal AI assistant by Google with advanced reasoning",
    link: "https://gemini.google.com",
    icon: <SiGooglegemini className="text-2xl" />,
    bgGradient: "from-blue-500 to-cyan-600",
  },
  {
    name: "Copilot",
    description: "AI-powered code completion and development assistant by GitHub",
    link: "https://copilot.github.com",
    icon: <FaRobot className="text-2xl" />,
    bgGradient: "from-rose-500 to-purple-600",
  },
  {
    name: "Grok",
    description: "Advanced AI assistant with real-time knowledge and coding capabilities",
    link: "https://grok.com",
    icon: <SiStellar className="text-2xl" />,
    bgGradient: "from-teal-500 to-cyan-600",
  },
  {
    name: "Deepseek",
    description: "AI-powered search and intelligent discovery platform with automation",
    link: "https://chat.deepseek.com",
    icon: <FaBrain className="text-2xl" />,
    bgGradient: "from-indigo-500 to-purple-600",
  },
  {
    name: "Claude",
    description: "Conversational AI assistant focused on safety and reasoning",
    link: "https://claude.ai/new",
    icon: <SiAnthropic className="text-2xl" />,
    bgGradient: "from-yellow-500 to-orange-600",
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  }
};

const cardVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut"
    }
  },
  hover: {
    scale: 1.05,
    y: -8,
    transition: {
      duration: 0.3,
      ease: "easeInOut"
    }
  }
};

export default function Secret() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black py-8">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        {/* Header Section */}
        <motion.div
          variants={itemVariants}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="w-20 h-20 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-2xl shadow-cyan-500/25"
          >
            <FaCode className="text-3xl text-white" />
          </motion.div>
          
          <h1 className="text-5xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent mb-4">
            Featured AI Tools
          </h1>
          
          <p className="text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Discover powerful artificial intelligence tools that enhance productivity, 
            creativity, and development workflows.
          </p>
        </motion.div>

        {/* Tools Grid */}
        <motion.div
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12"
        >
          {tools.map((tool, index) => (
            <motion.a
              key={index}
              href={tool.link}
              target="_blank"
              rel="noopener noreferrer"
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              whileHover="hover"
              className="group relative bg-gray-800/40 backdrop-blur-sm border border-gray-700 rounded-3xl p-6 transition-all duration-300 cursor-pointer hover:border-cyan-500/50 hover:shadow-2xl hover:shadow-cyan-500/10"
            >
              {/* Featured Badge */}
              {tool.featured && (
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ delay: index * 0.1 + 0.5 }}
                  className="absolute -top-2 -right-2 bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center space-x-1 z-10"
                >
                  <FaStar className="text-xs" />
                  <span>Featured</span>
                </motion.div>
              )}

              {/* Icon Container */}
              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                className={`w-16 h-16 bg-gradient-to-r ${tool.bgGradient} rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:shadow-xl transition-all duration-300`}
              >
                <div className="text-white">
                  {tool.icon}
                </div>
              </motion.div>

              {/* Content */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold text-white group-hover:text-cyan-400 transition-colors duration-300">
                    {tool.name}
                  </h3>
                  <motion.div
                    whileHover={{ x: 3 }}
                    className="text-cyan-400 opacity-0 group-hover:opacity-100 transition-all duration-300"
                  >
                  </motion.div>
                </div>

                <p className="text-gray-300 text-sm leading-relaxed">
                  {tool.description}
                </p>
              </div>

              {/* Hover Glow Effect */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-cyan-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
            </motion.a>
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
}