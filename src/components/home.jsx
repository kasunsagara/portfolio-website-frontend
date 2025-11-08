import { useState, useEffect } from "react";
import { FaFacebookF, FaLinkedinIn, FaGithub, FaWhatsapp, FaDownload, FaCode } from "react-icons/fa";
import { SiCisco, SiJavascript, SiReact } from "react-icons/si";

export default function Home() {
  const roles = [
    "Computer Science Undergraduate",
    "Full Stack Web Developer",
    "UI/UX Designer",
    "Cisco Networking Enthusiast",
  ];

  const [text, setText] = useState("");
  const [roleIndex, setRoleIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentRole = roles[roleIndex];
    let typingSpeed = isDeleting ? 50 : 100;

    const timeout = setTimeout(() => {
      if (isDeleting) {
        setText(currentRole.substring(0, charIndex - 1));
        setCharIndex((prev) => prev - 1);
      } else {
        setText(currentRole.substring(0, charIndex + 1));
        setCharIndex((prev) => prev + 1);
      }

      if (!isDeleting && charIndex === currentRole.length) {
        setTimeout(() => setIsDeleting(true), 1500);
      } else if (isDeleting && charIndex === 0) {
        setIsDeleting(false);
        setRoleIndex((prev) => (prev + 1) % roles.length);
      }
    }, typingSpeed);

    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, roleIndex]);

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-gray-900 to-black text-white pt-20">
      {/* Animated Background Elements */}
      <div 
        className="absolute inset-0 opacity-30 transition-all duration-1000"
      ></div>
      
      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,black,transparent)]"></div>
      
      {/* Floating Tech Icons */}
      <div className="absolute top-3/5 left-1/2 animate-float">
        <SiJavascript className="text-yellow-400 text-4xl opacity-10" />
      </div>
      <div className="absolute top-1/4 right-3/5 animate-float" style={{ animationDelay: '2s' }}>
        <SiReact className="text-cyan-400 text-4xl opacity-10" />
      </div>
      <div className="absolute bottom-1/4 left-1/3 animate-float" style={{ animationDelay: '4s' }}>
        <SiCisco className="text-blue-500 text-4xl opacity-20" />
      </div>
      <div className="absolute bottom-1/4 right-1/2 animate-float" style={{ animationDelay: '6s' }}>
        <FaCode className="text-green-400 text-4xl opacity-15" />
      </div>

      <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-16 relative z-10">
        {/* Text content */}
        <div className="md:w-1/2 text-center md:text-left">
          {/* Welcome Badge */}
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            Hi, I'm <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent animate-gradient">Kasun Sagara</span>
          </h1>

          <div className="h-16 mb-8 flex items-center">
            <p className="text-2xl md:text-3xl text-gray-300 font-mono">
              &gt; <span className="text-cyan-400">{text}</span>
              <span className="text-cyan-400 animate-pulse">_</span>
            </p>
          </div>

          <p className="text-gray-400 mb-10 max-w-2xl text-lg leading-relaxed mx-auto md:mx-0">
            Passionate <span className="text-cyan-400">Computer Science student</span> and <span className="text-blue-400">Full Stack Developer</span> crafting digital experiences with modern technologies. Welcome to my portfolio!
          </p>

          {/* Social Links */}
          <div className="flex justify-center md:justify-start space-x-4 mb-10">
            {[
              { icon: FaGithub, href: "https://github.com/kasunsagara", color: "hover:bg-gray-700" },
              { icon: FaLinkedinIn, href: "https://www.linkedin.com/in/kasun-sagara-ba47b22a9/", color: "hover:bg-blue-600" },
              { icon: FaFacebookF, href: "https://www.facebook.com/kasun.sagara.672450?mibextid=ZbWKwL", color: "hover:bg-blue-500" },
              { icon: FaWhatsapp, href: "https://wa.me/94771670585", color: "hover:bg-green-500" }
            ].map((social, index) => (
              <a
                key={index}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`group bg-gray-800/50 backdrop-blur-sm p-4 rounded-2xl border border-gray-700 hover:border-cyan-400/50 transition-all duration-300 transform hover:scale-110 hover:shadow-2xl hover:shadow-cyan-500/20 ${social.color}`}
              >
                <social.icon className="text-xl text-gray-400 group-hover:text-white transition-colors" />
              </a>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row justify-center md:justify-start space-y-4 sm:space-y-0 sm:space-x-6">
            <a
              href="/KasunSagaraCV.pdf"
              download
              className="group bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-medium py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-2xl hover:shadow-cyan-500/30 border border-cyan-400/20 flex items-center justify-center space-x-3"
            >
              <FaDownload className="text-lg" />
              <span>Download CV</span>
            </a>
              <button
                onClick={() => {
                  const projectSection = document.querySelector("#projects");
                  if (projectSection) {
                    projectSection.scrollIntoView({ behavior: "smooth" });
                  }
                }}
                className="group bg-gray-800/50 backdrop-blur-sm hover:bg-gray-700/50 text-white font-medium py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 border border-gray-700 hover:border-cyan-400/50 flex items-center justify-center space-x-3"
              >
                <span>View Projects</span>
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </button>
          </div>
        </div>

        {/* Profile Image */}
        <div className="md:w-1/2 flex justify-center">
          <div className="relative group">
            {/* Outer Glow */}
            <div className="absolute -inset-4 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 rounded-3xl blur-2xl opacity-30 group-hover:opacity-50 transition-all duration-1000 group-hover:scale-110"></div>
            
            {/* Main Image Container */}
            <div className="relative bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-3 shadow-2xl border border-gray-700/50 group-hover:border-cyan-400/30 transition-all duration-500">
              <div className="relative overflow-hidden rounded-2xl">
                <img
                  src="/picture1.png"
                  alt="Kasun Sagara"
                  className="w-80 h-80 md:w-96 md:h-96 object-cover rounded-2xl transition-all duration-700 group-hover:scale-110"
                />
                {/* Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>
              
              {/* Floating Info Card */}
              <div className="absolute -bottom-6 -right-6 bg-gray-900/90 backdrop-blur-sm border border-cyan-400/20 rounded-2xl p-4 shadow-2xl transform group-hover:scale-105 transition-all duration-500">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-sm font-mono text-cyan-300">Online</span>
                </div>
                <p className="text-xs text-gray-400 mt-1">Ready to code</p>
              </div>
            </div>

            {/* Tech Badges */}
            <div className="absolute -top-4 -left-4 bg-gray-900 border border-cyan-400/20 rounded-full px-4 py-2 backdrop-blur-sm">
              <span className="text-sm font-mono text-cyan-300">CS Student</span>
            </div>
            <div className="absolute -bottom-4 -left-4 bg-gray-900 border border-blue-400/20 rounded-full px-4 py-2 backdrop-blur-sm">
              <span className="text-sm font-mono text-blue-300">Full Stack</span>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-cyan-400/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-cyan-400 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
}