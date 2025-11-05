import { FaFacebookF, FaLinkedinIn, FaGithub, FaWhatsapp, FaArrowUp, FaCode, FaHeart } from "react-icons/fa";
import { motion } from "framer-motion";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const quickLinks = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Services", href: "#services" },
    { name: "Projects", href: "#projects" },
    { name: "Contact", href: "#contact" }
  ];

  const socialLinks = [
    {
      icon: FaGithub,
      href: "https://github.com/kasunsagara",
      label: "GitHub",
      color: "hover:bg-gray-700"
    },
    {
      icon: FaLinkedinIn,
      href: "https://www.linkedin.com/in/kasun-sagara-ba47b22a9/",
      label: "LinkedIn",
      color: "hover:bg-blue-600"
    },
    {
      icon: FaFacebookF,
      href: "https://www.facebook.com/kasun.sagara.672450?mibextid=ZbWKwL",
      label: "Facebook",
      color: "hover:bg-blue-500"
    },
    {
      icon: FaWhatsapp,
      href: "https://wa.me/94771670585",
      label: "WhatsApp",
      color: "hover:bg-green-500"
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

  return (
    <footer className="bg-gradient-to-br from-gray-900 to-black text-white relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,black,transparent)]"></div>
      
      {/* Floating Background Shapes */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Main Footer Content */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="py-16"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {/* Left - Brand & Description */}
            <motion.div
              variants={itemVariants}
              className="space-y-6"
            >
              <motion.div 
                whileHover={{ scale: 1.05 }}
                className="flex items-center space-x-3 group cursor-pointer"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center shadow-2xl shadow-cyan-400/20 group-hover:scale-110 transition-transform duration-300">
                  <FaCode className="text-white text-xl" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                    KS
                  </h1>
                </div>
              </motion.div>
              
              <p className="text-gray-400 leading-relaxed max-w-md">
                A passionate Computer Science undergraduate and Full Stack Developer 
                specializing in modern web technologies. I create digital experiences 
                that combine innovative design with robust functionality.
              </p>

              {/* Tech Stack */}
              <div className="flex flex-wrap gap-2">
                {["React", "Node.js", "MongoDB", "Tailwind"].map((tech, index) => (
                  <motion.span
                    key={tech}
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    className="px-3 py-1 bg-gray-800/50 text-gray-300 rounded-full text-xs border border-gray-700 backdrop-blur-sm"
                  >
                    {tech}
                  </motion.span>
                ))}
              </div>
            </motion.div>

            {/* Center - Quick Links */}
            <motion.div
              variants={itemVariants}
              className="space-y-6"
            >
              <h1 className="text-xl font-bold text-white flex items-center space-x-2">
                <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
                <span>Quick Links</span>
              </h1>
              
              <div className="space-y-3">
                {quickLinks.map((link, index) => (
                  <motion.a
                    key={link.name}
                    href={link.href}
                    variants={itemVariants}
                    whileHover={{ x: 5, color: "#22d3ee" }}
                    className="block text-gray-400 hover:text-cyan-400 transition-all duration-300 group"
                  >
                    <div className="flex items-center space-x-2">
                      <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      <span>{link.name}</span>
                    </div>
                  </motion.a>
                ))}
              </div>

              {/* Contact Info */}
              <div className="space-y-2 pt-4 border-t border-gray-800">
                <p className="text-sm text-gray-500">Get in touch</p>
                <p className="text-cyan-400 text-sm">kasunsagara689@gmail.com</p>
                <p className="text-gray-400 text-sm">+94 77 167 0585</p>
              </div>
            </motion.div>

            {/* Right - Social Links */}
            <motion.div
              variants={itemVariants}
              className="space-y-6"
            >
              <h1 className="text-xl font-bold text-white flex items-center space-x-2">
                <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
                <span>Connect With Me</span>
              </h1>
              
              <p className="text-gray-400 text-sm">
                Let's collaborate and build something amazing together. 
                Reach out through any of these platforms.
              </p>

              <div className="flex space-x-4">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    whileHover={{ scale: 1.2, rotate: 5 }}
                    whileTap={{ scale: 0.9 }}
                    transition={{ delay: index * 0.1 }}
                    className={`p-4 bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-700 text-gray-400 hover:text-white transition-all duration-300 ${social.color} hover:border-cyan-400/50 hover:shadow-2xl hover:shadow-cyan-500/20`}
                  >
                    <social.icon className="text-xl" />
                  </motion.a>
                ))}
              </div>

              {/* Back to Top Button */}
              <motion.button
                onClick={scrollToTop}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white rounded-2xl transition-all duration-300 border border-cyan-400/20 shadow-2xl shadow-cyan-500/25"
              >
                <FaArrowUp className="text-sm" />
                <span className="text-sm font-semibold">Back to Top</span>
              </motion.button>
            </motion.div>
          </div>
        </motion.div>

        {/* Divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          transition={{ duration: 0.8 }}
          className="h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent"
        />

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="py-8"
        >
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <div className="flex items-center space-x-2 text-gray-400">
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-2 h-2 bg-cyan-400 rounded-full"
              />
              <p className="text-sm">
                © {new Date().getFullYear()}{" "}
                <span className="text-cyan-400 font-semibold">Kasun Sagara</span>. All Rights Reserved.
              </p>
            </div>

            <div className="flex items-center space-x-4 text-gray-400 text-sm">
              <motion.div
                whileHover={{ scale: 1.1 }}
                className="flex items-center space-x-1"
              >
                <span>Made with</span>
                <motion.div
                  animate={{ scale: [1, 1.3, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <FaHeart className="text-red-400" />
                </motion.div>
                <span>and</span>
                <FaCode className="text-cyan-400 ml-1" />
              </motion.div>
              
              <div className="w-px h-4 bg-gray-700"></div>
              
              <motion.a
                href="#contact"
                whileHover={{ color: "#22d3ee" }}
                className="hover:text-cyan-400 transition-colors duration-300"
              >
                Get In Touch
              </motion.a>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Floating Elements */}
      <motion.div
        animate={{ 
          y: [0, -10, 0],
          rotate: [0, 5, 0]
        }}
        transition={{ 
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute bottom-20 left-10 w-6 h-6 bg-cyan-400/20 rounded-full blur-sm"
      />
      <motion.div
        animate={{ 
          y: [0, 10, 0],
          rotate: [0, -5, 0]
        }}
        transition={{ 
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1
        }}
        className="absolute bottom-32 right-20 w-4 h-4 bg-blue-400/20 rounded-full blur-sm"
      />
    </footer>
  );
};