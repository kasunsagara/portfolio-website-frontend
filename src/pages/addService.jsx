import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaPlus, 
  FaCode, 
  FaHeading, 
  FaFileAlt, 
  FaArrowLeft,
  FaHandshake,
  FaMagic
} from 'react-icons/fa';

// Import icon libraries for preview
import * as FaIcons from "react-icons/fa";
import * as SiIcons from "react-icons/si";
import * as DiIcons from "react-icons/di";
import * as AiIcons from "react-icons/ai";
import * as BsIcons from "react-icons/bs";

export default function AddService() { 
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    icon: '',
    title: '',
    description: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const inputRefs = {
    icon: useRef(null),
    title: useRef(null),
    description: useRef(null),
  };

  // Helper to get icon component for preview
  const getIconComponent = (iconName) => {
    const iconLibraries = {
      ...FaIcons,
      ...SiIcons,
      ...DiIcons,
      ...AiIcons,
      ...BsIcons,
    };
    const Icon = iconLibraries[iconName];
    return Icon ? <Icon className="text-2xl" /> : <FaHandshake className="text-2xl" />;
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleKeyDown = (e, nextInput) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      nextInput?.current?.focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const res = await axios.post(import.meta.env.VITE_BACKEND_URL + "/api/services", formData);
      
      toast.success('Service added successfully!');
      navigate('/admin-panel/services');
      
      setFormData({
        icon: '',
        title: '',
        description: '',
      });
    } catch (err) {
      toast.error(err.response?.data?.error || 'Failed to add service');
    } finally {
      setIsSubmitting(false);
    }
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

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6 p-6"
    >
      {/* Header */}
      <motion.div
        variants={itemVariants}
        className="flex items-center justify-between"
      >
        <div className="flex items-center space-x-4">
          <motion.button
            onClick={() => navigate('/admin-panel/services')}
            whileHover={{ scale: 1.05, x: -5 }}
            whileTap={{ scale: 0.95 }}
            className="p-3 bg-gray-700/50 hover:bg-gray-600/50 text-gray-400 hover:text-white rounded-xl border border-gray-600 transition-all duration-300"
          >
            <FaArrowLeft className="text-lg" />
          </motion.button>
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Add New Service</h1>
            <p className="text-gray-400">Create a new service for your portfolio</p>
          </div>
        </div>
      </motion.div>

      {/* Form Container */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Form Section */}
        <motion.div
          variants={itemVariants}
          className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-8"
        >
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Icon Input */}
            <motion.div
              variants={itemVariants}
              className="space-y-3"
            >
              <label className="text-sm font-medium text-gray-300 flex items-center space-x-2">
                <FaCode className="text-cyan-400 text-sm" />
                <span>Icon Name</span>
              </label>
              <motion.div whileFocus={{ scale: 1.02 }} className="relative">
                <input
                  ref={inputRefs.icon}
                  type="text"
                  name="icon"
                  value={formData.icon}
                  onChange={handleChange}
                  onKeyDown={(e) => handleKeyDown(e, inputRefs.title)}
                  placeholder="FaCode, SiReact, DiMongodb, etc."
                  className="w-full bg-gray-700/50 border border-gray-600 rounded-xl pl-12 pr-4 py-4 text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400 focus:bg-gray-700/70 transition-all duration-300"
                  required
                />
                <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                  <FaMagic className="text-lg" />
                </div>
              </motion.div>
              <p className="text-gray-500 text-xs">
                Use React Icons names (FaIconName, SiIconName, etc.)
              </p>
            </motion.div>

            {/* Title Input */}
            <motion.div
              variants={itemVariants}
              className="space-y-3"
            >
              <label className="text-sm font-medium text-gray-300 flex items-center space-x-2">
                <FaHeading className="text-cyan-400 text-sm" />
                <span>Service Title</span>
              </label>
              <motion.div whileFocus={{ scale: 1.02 }} className="relative">
                <input
                  ref={inputRefs.title}
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  onKeyDown={(e) => handleKeyDown(e, inputRefs.description)}
                  placeholder="e.g., Web Development, UI/UX Design"
                  className="w-full bg-gray-700/50 border border-gray-600 rounded-xl pl-12 pr-4 py-4 text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400 focus:bg-gray-700/70 transition-all duration-300"
                  required
                />
                <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                  <FaHeading className="text-lg" />
                </div>
              </motion.div>
            </motion.div>

            {/* Description Input */}
            <motion.div
              variants={itemVariants}
              className="space-y-3"
            >
              <label className="text-sm font-medium text-gray-300 flex items-center space-x-2">
                <FaFileAlt className="text-cyan-400 text-sm" />
                <span>Service Description</span>
              </label>
              <motion.div whileFocus={{ scale: 1.02 }} className="relative">
                <textarea
                  ref={inputRefs.description}
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Describe what this service offers to clients..."
                  rows="5"
                  className="w-full bg-gray-700/50 border border-gray-600 rounded-xl pl-4 pr-4 py-4 text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400 focus:bg-gray-700/70 transition-all duration-300 resize-none"
                  required
                />
              </motion.div>
            </motion.div>

            {/* Submit Button */}
            <motion.div
              variants={itemVariants}
              className="flex items-center justify-end space-x-4 pt-6 border-t border-gray-700"
            >
              <motion.button
                type="button"
                onClick={() => navigate('/admin-panel/services')}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 bg-gray-700/50 hover:bg-gray-600/50 text-gray-400 hover:text-white rounded-xl transition-all duration-300 border border-gray-600"
              >
                Cancel
              </motion.button>
              
              <motion.button
                type="submit"
                disabled={isSubmitting}
                whileHover={{ scale: isSubmitting ? 1 : 1.05 }}
                whileTap={{ scale: isSubmitting ? 1 : 0.95 }}
                className="flex items-center space-x-3 px-8 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-semibold rounded-xl transition-all duration-300 border border-cyan-400/20 shadow-2xl shadow-cyan-500/25 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <AnimatePresence mode="wait">
                  {isSubmitting ? (
                    <motion.div
                      key="loading"
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0 }}
                      className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"
                    />
                  ) : (
                    <motion.div
                      key="add"
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="flex items-center space-x-2"
                    >
                      <FaPlus className="text-lg" />
                      <span>Add Service</span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>
            </motion.div>
          </form>
        </motion.div>
      </div>
    </motion.div>
  );
};