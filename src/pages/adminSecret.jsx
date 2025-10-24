import React from "react";
import { FaGlobe, FaComments, FaRobot} from "react-icons/fa";
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
    link: "https://chat.deepseek.com",
    icon: <FaGlobe className="text-2xl" />,
    bgColor: "bg-indigo-200",
  },
  {
    name: "Claude",
    description: "Conversational AI by Anthropic",
    link: "https://claude.ai/new",
    icon: <FaComments className="text-2xl" />,
    bgColor: "bg-yellow-200",
  }
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
