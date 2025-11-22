import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaCode } from "react-icons/fa";

// Import icon libraries
import * as FaIcons from "react-icons/fa";
import * as SiIcons from "react-icons/si";
import * as DiIcons from "react-icons/di";
import * as AiIcons from "react-icons/ai";
import * as BsIcons from "react-icons/bs";

export default function Services() {
  // Static data - no need for useState since we're not updating it
  const services = [
    {
      _id: "1",
      title: "Web Development",
      description: "I provide comprehensive web development services, including full stack development covering both front and back ends, and specialized MERN stack development using MongoDB, Express.js, React.js, and Node.js, for scalable and efficient applications. My expertise includes RESTful API development, secure authentication using JWT and OAuth, and robust integration with MongoDB.",
      icon: "FaCode",
      features: [
        "MERN Stack Applications",
        "RESTful API Development",
        "JWT & OAuth Authentication",
        "MongoDB Integration"
      ]
    },
    {
      _id: "2",
      title: "UI/UX Design",
      description: "My UI/UX design services focus on creating intuitive and visually appealing interfaces using Figma, ensuring a seamless experience across web and mobile platforms. I create wireframes and responsive prototypes that align with your brand, prioritizing user centered design principles. I am skilled at transforming complex ideas into clear and user-friendly designs.",
      icon: "BsBrush",
      features: [
        "Figma Prototyping",
        "Wireframing",
        "Responsive Design",
        "Web Interfaces"
      ]
    },
    {
      _id: "3",
      title: "Cisco Networking",
      description: "I provide professional Cisco networking services, including router and switch configuration, VLAN setup, subnetting, routing, and network security. I work with DHCP, DNS, NAT, ACLs, and VPNs to build secure, fast, and reliable networks. I design, optimize, and troubleshoot Cisco-based networks to ensure smooth and efficient performance.",
      icon: "FaNetworkWired",
      features: [
        "Router & Switch Configuration",
        "VLAN Setup & Subnetting",
        "DHCP, DNS & NAT",
        "Network Optimization"
      ]
    }
  ];
  
  const [isLoading, setIsLoading] = useState(false);
  const [hoveredCard, setHoveredCard] = useState(null);

  // Helper to get icon component
  const getIconComponent = (iconName) => {
    const iconLibraries = {
      ...FaIcons,
      ...SiIcons,
      ...DiIcons,
      ...AiIcons,
      ...BsIcons,
    };
    const Icon = iconLibraries[iconName];
    return Icon ? <Icon className="text-3xl" /> : <FaCode className="text-3xl" />;
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    },
    hover: {
      y: -10,
      scale: 1.02,
      transition: {
        duration: 0.3,
        ease: "easeInOut"
      }
    }
  };

  const iconVariants = {
    hover: {
      rotate: 360,
      scale: 1.1,
      transition: {
        duration: 0.6,
        ease: "easeInOut"
      }
    }
  };

  const featuresContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delay: 0.3
      }
    }
  };

  const featureItemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  return (
    <section id="services" className="min-h-screen py-20 bg-gradient-to-br from-gray-900 to-black text-white relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,black,transparent)]"></div>
      
      {/* Floating Background Shapes */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-500"></div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="inline-flex items-center space-x-2 bg-gray-800/50 backdrop-blur-sm border border-cyan-400/20 rounded-full px-4 py-2 mb-6"
          >
            <motion.div 
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-2 h-2 bg-cyan-400 rounded-full"
            />
            <span className="text-sm text-cyan-300 font-mono">Services</span>
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-5xl md:text-6xl font-bold mb-6"
          >
            My <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">Services</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-gray-400 text-lg max-w-2xl mx-auto"
          >
            Comprehensive solutions to bring your digital ideas to life with cutting-edge technology and innovative design
          </motion.p>
        </motion.div>

        {/* Services Grid */}
        <div className="relative">
          {isLoading ? (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex justify-center items-center py-20"
            >
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="rounded-full h-16 w-16 border-b-2 border-cyan-400"
              />
            </motion.div>
          ) : (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              <AnimatePresence>
                {services.map((service, index) => (
                  <motion.div
                    key={service._id}
                    variants={cardVariants}
                    whileHover="hover"
                    onHoverStart={() => setHoveredCard(service._id)}
                    onHoverEnd={() => setHoveredCard(null)}
                    className="relative group"
                  >
                    {/* Card Background Glow */}
                    <motion.div 
                      animate={{ 
                        opacity: hoveredCard === service._id ? 0.3 : 0.1,
                        scale: hoveredCard === service._id ? 1.05 : 1
                      }}
                      className="absolute -inset-4 bg-gradient-to-br from-cyan-500 via-blue-500 to-purple-600 rounded-3xl blur-xl transition-all duration-500"
                    />
                    
                    {/* Main Card */}
                    <div className="relative bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-8 h-full group-hover:border-cyan-400/50 transition-all duration-500 overflow-hidden">
                      {/* Animated Background Pattern */}
                      <div className="absolute inset-0 opacity-5">
                        <div className="absolute inset-0 bg-gradient-to-br from-cyan-400 to-blue-500 transform scale-0 group-hover:scale-100 transition-transform duration-700"></div>
                      </div>

                      {/* Icon Container */}
                      <motion.div
                        variants={iconVariants}
                        className="relative mb-6"
                      >
                        <div className="absolute -inset-4 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-2xl blur-lg opacity-0 group-hover:opacity-30 transition-opacity duration-500"></div>
                        <div className="relative p-4 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-2xl inline-flex items-center justify-center">
                          {getIconComponent(service.icon)}
                        </div>
                      </motion.div>

                      {/* Service Title */}
                      <motion.h3 
                        animate={{ 
                          color: hoveredCard === service._id ? '#22d3ee' : '#ffffff'
                        }}
                        className="text-2xl font-bold mb-4 transition-colors duration-300"
                      >
                        {service.title}
                      </motion.h3>

                      {/* Service Description */}
                      <motion.p 
                        animate={{ 
                          color: hoveredCard === service._id ? '#cbd5e1' : '#9ca3af'
                        }}
                        className="text-gray-400 mb-6 leading-relaxed transition-colors duration-300"
                      >
                        {service.description}
                      </motion.p>

                      {/* Features List - Always Visible */}
                      <div className="border-t border-gray-700 pt-4 mt-6">
                        <motion.h4 
                          initial={{ opacity: 0 }}
                          whileInView={{ opacity: 1 }}
                          transition={{ delay: 0.4 + index * 0.1 }}
                          className="text-sm font-semibold text-cyan-400 mb-3"
                        >
                          Key Features:
                        </motion.h4>
                        <motion.ul 
                          className="space-y-2"
                          variants={featuresContainerVariants}
                          initial="hidden"
                          whileInView="visible"
                        >
                          {service.features.map((feature, featureIndex) => (
                            <motion.li
                              key={featureIndex}
                              variants={featureItemVariants}
                              className="flex items-start space-x-2 text-sm text-gray-300"
                            >
                              <motion.div 
                                initial={{ scale: 0 }}
                                whileInView={{ scale: 1 }}
                                transition={{ delay: 0.5 + featureIndex * 0.1 }}
                                className="w-1.5 h-1.5 bg-cyan-400 rounded-full flex-shrink-0 mt-1.5"
                              />
                              <span>{feature}</span>
                            </motion.li>
                          ))}
                        </motion.ul>
                      </div>

                      {/* Corner Accent */}
                      <div className="absolute top-0 right-0 w-12 h-12 overflow-hidden">
                        <div className="absolute top-0 right-0 w-8 h-8 bg-gradient-to-br from-cyan-400 to-blue-500 transform rotate-45 translate-x-4 -translate-y-4 group-hover:scale-110 transition-transform duration-300"></div>
                      </div>
                    </div>

                    {/* Sequential Animation Delay */}
                    <motion.div
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      transition={{ delay: index * 0.1 + 0.5, duration: 0.5 }}
                      className="absolute -bottom-2 -right-2 w-4 h-4 bg-cyan-400 rounded-full"
                    />
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          )}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="text-center mt-16"
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="inline-flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6 bg-gray-800/50 backdrop-blur-sm border border-cyan-400/20 rounded-2xl p-8"
          >
            <div className="text-left">
              <h3 className="text-xl font-bold text-white mb-2">Ready to start your project?</h3>
              <p className="text-gray-400">Let's work together to bring your ideas to life</p>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                const contactSection = document.querySelector("#contact");
                if (contactSection) {
                  contactSection.scrollIntoView({ behavior: "smooth" });
                }
              }}
              className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-medium py-3 px-8 rounded-xl transition-all duration-300 border border-cyan-400/20 shadow-2xl shadow-cyan-500/25"
            >
              Get In Touch
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}