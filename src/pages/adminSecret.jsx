import React from "react";
import { FaGlobe, FaComments, FaImage, FaQuestionCircle, FaVideo, FaRobot, FaMagic } from "react-icons/fa";
import { SiOpenai, SiStellar } from "react-icons/si";

const tools = [
  {
    name: "ChatGPT",
    description: "AI chatbot by OpenAI",
    link: "https://chat.openai.com",
    icon: <SiOpenai className="text-2xl" />,
    bgColor: "bg-green-200",
  },
  {
    name: "Gemini",
    description: "AI assistant by Google",
    link: "https://gemini.google.com",
    icon: <FaComments className="text-2xl" />,
    bgColor: "bg-blue-200",
  },
  {
    name: "Copilot",
    description: "AI code assistant by GitHub",
    link: "https://copilot.com",
    icon: <FaRobot className="text-2xl" />,
    bgColor: "bg-gray-300",
  },
  {
    name: "Grok",
    description: "AI assistant and code helper by OpenAI",
    link: "https://grok.com",
    icon: <SiStellar className="text-2xl" />,
    bgColor: "bg-teal-200",
  },
  {
    name: "Deepseek",
    description: "AI-powered search and discovery platform",
    link: "https://deepseek.ai",
    icon: <FaGlobe className="text-2xl" />,
    bgColor: "bg-indigo-200",
  },
  {
    name: "Claude",
    description: "Conversational AI by Anthropic",
    link: "https://claude.ai",
    icon: <FaComments className="text-2xl" />,
    bgColor: "bg-yellow-200",
  },
  {
    name: "Midjourney",
    description: "AI image generation tool",
    link: "https://www.midjourney.com",
    icon: <FaImage className="text-2xl" />,
    bgColor: "bg-pink-200",
  },
  {
    name: "Perplexity",
    description: "AI-powered answer engine",
    link: "https://www.perplexity.ai",
    icon: <FaQuestionCircle className="text-2xl" />,
    bgColor: "bg-purple-200",
  },
  {
    name: "Runway ML",
    description: "AI video and creative tools",
    link: "https://runwayml.com",
    icon: <FaVideo className="text-2xl" />,
    bgColor: "bg-red-200",
  },
  {
    name: "Codeium",
    description: "Free AI code completion for developers",
    link: "https://codeium.com",
    icon: <FaRobot className="text-2xl" />,
    bgColor: "bg-sky-200",
  },
  {
    name: "Durable",
    description: "AI website builder for instant design and deployment",
    link: "https://durable.co",
    icon: <FaGlobe className="text-2xl" />,
    bgColor: "bg-amber-200",
  },
  {
    name: "Uizard",
    description: "AI-powered wireframing and UI design tool",
    link: "https://uizard.io",
    icon: <FaImage className="text-2xl" />,
    bgColor: "bg-lime-200",
  },
  {
    name: "Recraft",
    description: "AI design tool to generate vector illustrations, icons, and UI assets",
    link: "https://www.recraft.ai",
    icon: <FaImage className="text-2xl" />,
    bgColor: "bg-orange-200",
  },
  {
    name: "Penpot AI",
    description: "AI-powered open-source UI/UX design and prototyping tool",
    link: "https://penpot.app",
    icon: <FaMagic className="text-2xl" />,
    bgColor: "bg-cyan-200",
  },
  {
    name: "Tabnine",
    description: "AI code completion tool trained on your codebase",
    link: "https://www.tabnine.com",
    icon: <FaRobot className="text-2xl" />,
    bgColor: "bg-neutral-200",
  },
  {
    name: "Visily",
    description: "AI wireframing tool for non-designers and teams",
    link: "https://www.visily.ai",
    icon: <FaImage className="text-2xl" />,
    bgColor: "bg-fuchsia-200",
  },
  {
    name: "A11yWatch",
    description: "AI-powered accessibility testing for websites",
    link: "https://www.a11ywatch.com",
    icon: <FaQuestionCircle className="text-2xl" />,
    bgColor: "bg-slate-200",
  },
  {
    name: "Descript",
    description: "AI-powered video editor with text-based editing and voice cloning",
    link: "https://www.descript.com",
    icon: <FaVideo className="text-2xl" />,
    bgColor: "bg-emerald-200",
  },
];

export default function AdminSecret() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800">
        <section
          id="tools"
          className="py-12 px-6 max-w-7xl mx-auto rounded-xl"
        >
          <h3
            className="text-4xl font-bold text-center mb-12 text-[#00ffff]"
            style={{ fontFamily: "'Poppins', sans-serif" }}
          >
            Featured AI Tools
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
            {tools.map(({ name, description, link, icon, bgColor }, index) => (
              <a
                key={index}
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center p-8 rounded-2xl bg-white backdrop-filter backdrop-blur-lg bg-opacity-10 transform hover:scale-105 transition duration-300 cursor-pointer"
              >
                <div
                  className={`${bgColor} text-4xl rounded-full w-16 h-16 flex items-center justify-center mb-6 drop-shadow`}
                >
                  {icon}
                </div>
                <h4
                  className="text-2xl font-semibold text-[#00ffff] mb-3"
                  style={{ fontFamily: "'Poppins', sans-serif" }}
                >
                  {name}
                </h4>
                <p className="text-white text-center">{description}</p>
              </a>
            ))}
          </div>
        </section>
    </div>
  );
}
