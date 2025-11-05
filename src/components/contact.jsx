import { useState, useRef } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';
import { FaEnvelope, FaPhoneAlt, FaMapMarkerAlt, FaPaperPlane, FaUser } from 'react-icons/fa';
import { FiMessageCircle } from 'react-icons/fi';

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', phone: '', email: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const phoneRef = useRef(null);
  const emailRef = useRef(null);
  const messageRef = useRef(null);

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleKeyDown = (e, nextFieldRef) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      nextFieldRef?.current?.focus();
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);

    try {
      await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/contacts`, formData);
      setFormData({ name: '', phone: '', email: '', message: '' });
      setIsSubmitted(true);
      toast.success('Message sent successfully!');
      
      // Reset success state after 3 seconds
      setTimeout(() => setIsSubmitted(false), 3000);
    } catch (error) {
      toast.error('Failed to send message. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const contactInfo = [
    {
      icon: FaEnvelope,
      title: "Email",
      value: "kasunsagara689@gmail.com",
      link: "mailto:kasunsagara689@gmail.com",
      color: "from-cyan-500 to-blue-600"
    },
    {
      icon: FaPhoneAlt,
      title: "Phone",
      value: "+94 77 167 0585",
      link: "tel:+94771670585",
      color: "from-green-500 to-emerald-600"
    },
    {
      icon: FaMapMarkerAlt,
      title: "Location",
      value: "Rathnapura, Sri Lanka",
      link: "https://maps.google.com/?q=Rathnapura,Sri+Lanka",
      color: "from-purple-500 to-pink-600"
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
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const formVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.7,
        ease: "easeOut"
      }
    }
  };

  const infoVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.7,
        ease: "easeOut"
      }
    }
  };

  return (
    <section id="contact" className="min-h-screen py-20 bg-gradient-to-br from-gray-900 to-black text-white relative overflow-hidden">
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
            <span className="text-sm text-cyan-300 font-mono">Get In Touch</span>
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-5xl md:text-6xl font-bold mb-6"
          >
            Let's <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">Connect</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-gray-400 text-lg max-w-2xl mx-auto"
          >
            Ready to bring your ideas to life? Let's discuss your project and create something amazing together.
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Contact Form */}
          <motion.div
            variants={formVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="relative"
          >
            {/* Form Background Glow */}
            <div className="absolute -inset-4 bg-gradient-to-br from-cyan-500/20 via-blue-500/20 to-purple-500/20 rounded-3xl blur-xl"></div>
            
            <div className="relative bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-white mb-2">Send me a message</h3>
              <p className="text-gray-400 mb-8">I'll get back to you as soon as possible</p>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name Field */}
                <motion.div
                  whileFocus={{ scale: 1.02 }}
                  className="relative"
                >
                  <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                    <FaUser className="text-lg" />
                  </div>
                  <input
                    name="name"
                    type="text"
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={handleChange}
                    onKeyDown={e => handleKeyDown(e, phoneRef)}
                    required
                    className="w-full bg-gray-700/50 border border-gray-600 rounded-xl pl-12 pr-4 py-4 text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400 focus:bg-gray-700/70 transition-all duration-300"
                  />
                </motion.div>

                {/* Phone Field */}
                <motion.div
                  whileFocus={{ scale: 1.02 }}
                  className="relative"
                >
                  <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                    <FaPhoneAlt className="text-lg" />
                  </div>
                  <input
                    ref={phoneRef}
                    name="phone"
                    type="tel"
                    placeholder="Your Phone"
                    value={formData.phone}
                    onChange={handleChange}
                    onKeyDown={e => handleKeyDown(e, emailRef)}
                    required
                    className="w-full bg-gray-700/50 border border-gray-600 rounded-xl pl-12 pr-4 py-4 text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400 focus:bg-gray-700/70 transition-all duration-300"
                  />
                </motion.div>

                {/* Email Field */}
                <motion.div
                  whileFocus={{ scale: 1.02 }}
                  className="relative"
                >
                  <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                    <FaEnvelope className="text-lg" />
                  </div>
                  <input
                    ref={emailRef}
                    name="email"
                    type="email"
                    placeholder="Your Email"
                    value={formData.email}
                    onChange={handleChange}
                    onKeyDown={e => handleKeyDown(e, messageRef)}
                    required
                    className="w-full bg-gray-700/50 border border-gray-600 rounded-xl pl-12 pr-4 py-4 text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400 focus:bg-gray-700/70 transition-all duration-300"
                  />
                </motion.div>

                {/* Message Field */}
                <motion.div
                  whileFocus={{ scale: 1.02 }}
                  className="relative"
                >
                  <div className="absolute left-4 top-4 text-gray-400">
                    <FiMessageCircle className="text-lg" />
                  </div>
                  <textarea
                    ref={messageRef}
                    name="message"
                    rows="6"
                    placeholder="Your Message..."
                    value={formData.message}
                    onChange={handleChange}
                    required
                    className="w-full bg-gray-700/50 border border-gray-600 rounded-xl pl-12 pr-4 py-4 text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400 focus:bg-gray-700/70 transition-all duration-300 resize-none"
                  ></textarea>
                </motion.div>

                {/* Submit Button */}
                <motion.button
                  type="submit"
                  disabled={loading}
                  whileHover={{ scale: loading ? 1 : 1.05 }}
                  whileTap={{ scale: loading ? 1 : 0.95 }}
                  className={`w-full flex items-center justify-center space-x-3 py-4 px-8 rounded-xl transition-all duration-300 border ${
                    loading
                      ? "bg-gray-600 text-gray-400 border-gray-500 cursor-not-allowed"
                      : "bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white border-cyan-400/20 shadow-2xl shadow-cyan-500/25"
                  }`}
                >
                  <AnimatePresence mode="wait">
                    {loading ? (
                      <motion.div
                        key="loading"
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0 }}
                        className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"
                      />
                    ) : isSubmitted ? (
                      <motion.div
                        key="success"
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="text-green-400"
                      >
                        ✓
                      </motion.div>
                    ) : (
                      <motion.div
                        key="send"
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="flex items-center space-x-2"
                      >
                        <FaPaperPlane className="text-lg" />
                        <span className="font-semibold">Send Message</span>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.button>
              </form>
            </div>
          </motion.div>

          {/* Contact Information */}
          <motion.div
            variants={infoVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="space-y-6"
          >
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              className="space-y-6"
            >
              {contactInfo.map((info, index) => (
                <motion.a
                  key={index}
                  href={info.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  variants={itemVariants}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="block group"
                >
                  {/* Background Glow */}
                  <div className={`absolute -inset-4 bg-gradient-to-br ${info.color} rounded-3xl blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-500`}></div>
                  
                  <div className="relative bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-6 group-hover:border-cyan-400/50 transition-all duration-300">
                    <div className="flex items-center space-x-4">
                      <motion.div 
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        className={`p-4 bg-gradient-to-br ${info.color} rounded-2xl transition-transform duration-300`}
                      >
                        <info.icon className="text-2xl text-white" />
                      </motion.div>
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-white group-hover:text-cyan-400 transition-colors duration-300">
                          {info.title}
                        </h3>
                        <p className="text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
                          {info.value}
                        </p>
                      </div>
                      <motion.div 
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.2 + 0.5 }}
                        className="w-2 h-2 bg-cyan-400 rounded-full"
                      />
                    </div>
                  </div>
                </motion.a>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}