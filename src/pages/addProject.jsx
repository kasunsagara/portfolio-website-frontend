import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import uploadMediaToSupabase from '../utils/mediaUpload';
import { toast } from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';
import { FaPlus, FaImage, FaCode, FaCalendar, FaGithub, FaLinkedin, FaTag, FaArrowLeft, FaUpload, FaFileImage } from 'react-icons/fa';

export default function AddProject() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    skills: '',
    startDate: '',
    endDate: '',
    githubLink: '',
    linkedinLink: '',
  });

  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const inputRefs = {
    name: useRef(null),
    description: useRef(null),
    skills: useRef(null),
    startDate: useRef(null),
    endDate: useRef(null),
    githubLink: useRef(null),
    linkedinLink: useRef(null),
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      
      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
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
      if (!imageFile) {
        toast.error("Please select a project image.");
        return;
      }

      // Validate dates
      if (new Date(formData.startDate) > new Date(formData.endDate)) {
        toast.error("End date must be after start date.");
        return;
      }

      const imageUrl = await uploadMediaToSupabase(imageFile);

      const data = {
        ...formData,
        image: imageUrl,
        skills: formData.skills.split(',').map((skill) => skill.trim()),
      };

      await axios.post(import.meta.env.VITE_BACKEND_URL + "/api/projects", data);
      toast.success('Project added successfully!');
      navigate('/admin-panel/projects');

      // Reset form
      setFormData({
        name: '',
        description: '',
        skills: '',
        startDate: '',
        endDate: '',
        githubLink: '',
        linkedinLink: '',
      });
      setImageFile(null);
      setImagePreview(null);
    } catch (err) {
      console.error('Error adding project:', err);
      toast.error(err.response?.data?.message || 'Failed to add project');
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
            onClick={() => navigate('/admin-panel/projects')}
            whileHover={{ scale: 1.05, x: -5 }}
            whileTap={{ scale: 0.95 }}
            className="p-3 bg-gray-700/50 hover:bg-gray-600/50 text-gray-400 hover:text-white rounded-xl border border-gray-600 transition-all duration-300"
          >
            <FaArrowLeft className="text-lg" />
          </motion.button>
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Add New Project</h1>
            <p className="text-gray-400">Create a new project for your portfolio</p>
          </div>
        </div>
      </motion.div>

      {/* Form Container */}
      <motion.div
        variants={itemVariants}
        className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-8"
      >
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Project Name & Image Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Project Name */}
            <motion.div
              variants={itemVariants}
              className="space-y-3"
            >
              <label className="text-sm font-medium text-gray-300 flex items-center space-x-2">
                <FaCode className="text-cyan-400 text-sm" />
                <span>Project Name</span>
              </label>
              <motion.div whileFocus={{ scale: 1.02 }} className="relative">
                <input
                  ref={inputRefs.name}
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  onKeyDown={(e) => handleKeyDown(e, inputRefs.description)}
                  placeholder="Enter project name..."
                  className="w-full bg-gray-700/50 border border-gray-600 rounded-xl pl-12 pr-4 py-4 text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400 focus:bg-gray-700/70 transition-all duration-300"
                  required
                />
                <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                  <FaCode className="text-lg" />
                </div>
              </motion.div>
            </motion.div>

            {/* Image Upload */}
            <motion.div
              variants={itemVariants}
              className="space-y-3"
            >
              <label className="text-sm font-medium text-gray-300 flex items-center space-x-2">
                <FaImage className="text-cyan-400 text-sm" />
                <span>Project Image</span>
              </label>
              
              <div className="relative">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                  id="image-upload"
                  required
                />
                <label
                  htmlFor="image-upload"
                  className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-600 rounded-xl cursor-pointer hover:border-cyan-400 hover:bg-gray-700/30 transition-all duration-300 group"
                >
                  <AnimatePresence mode="wait">
                    {imagePreview ? (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="relative w-full h-full rounded-xl overflow-hidden"
                      >
                        <img 
                          src={imagePreview} 
                          alt="Preview" 
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <FaUpload className="text-white text-2xl" />
                        </div>
                      </motion.div>
                    ) : (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-center p-4"
                      >
                        <FaFileImage className="text-4xl text-gray-500 mb-2 mx-auto" />
                        <p className="text-gray-400 text-sm">Click to upload image</p>
                        <p className="text-gray-500 text-xs">PNG, JPG, JPEG up to 5MB</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </label>
              </div>
            </motion.div>
          </div>

          {/* Description */}
          <motion.div
            variants={itemVariants}
            className="space-y-3"
          >
            <label className="text-sm font-medium text-gray-300 flex items-center space-x-2">
              <span>📝</span>
              <span>Description</span>
            </label>
            <motion.div whileFocus={{ scale: 1.02 }} className="relative">
              <textarea
                ref={inputRefs.description}
                name="description"
                value={formData.description}
                onChange={handleChange}
                onKeyDown={(e) => handleKeyDown(e, inputRefs.skills)}
                placeholder="Describe your project in detail..."
                rows="4"
                className="w-full bg-gray-700/50 border border-gray-600 rounded-xl pl-4 pr-4 py-4 text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400 focus:bg-gray-700/70 transition-all duration-300 resize-none"
                required
              />
            </motion.div>
          </motion.div>

          {/* Skills */}
          <motion.div
            variants={itemVariants}
            className="space-y-3"
          >
            <label className="text-sm font-medium text-gray-300 flex items-center space-x-2">
              <FaTag className="text-cyan-400 text-sm" />
              <span>Skills & Technologies</span>
            </label>
            <motion.div whileFocus={{ scale: 1.02 }} className="relative">
              <input
                ref={inputRefs.skills}
                type="text"
                name="skills"
                value={formData.skills}
                onChange={handleChange}
                onKeyDown={(e) => handleKeyDown(e, inputRefs.startDate)}
                placeholder="React, Node.js, MongoDB (comma separated)"
                className="w-full bg-gray-700/50 border border-gray-600 rounded-xl pl-12 pr-4 py-4 text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400 focus:bg-gray-700/70 transition-all duration-300"
                required
              />
              <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                <FaTag className="text-lg" />
              </div>
            </motion.div>
            <p className="text-gray-500 text-xs">Separate multiple skills with commas</p>
          </motion.div>

          {/* Date Range */}
          <motion.div
            variants={itemVariants}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {/* Start Date */}
            <div className="space-y-3">
              <label className="text-sm font-medium text-gray-300 flex items-center space-x-2">
                <FaCalendar className="text-cyan-400 text-sm" />
                <span>Start Date</span>
              </label>
              <motion.div whileFocus={{ scale: 1.02 }} className="relative">
                <input
                  ref={inputRefs.startDate}
                  type="date"
                  name="startDate"
                  value={formData.startDate}
                  onChange={handleChange}
                  onKeyDown={(e) => handleKeyDown(e, inputRefs.endDate)}
                  className="w-full bg-gray-700/50 border border-gray-600 rounded-xl pl-12 pr-4 py-4 text-white focus:outline-none focus:border-cyan-400 focus:bg-gray-700/70 transition-all duration-300"
                  required
                />
                <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                  <FaCalendar className="text-lg" />
                </div>
              </motion.div>
            </div>

            {/* End Date */}
            <div className="space-y-3">
              <label className="text-sm font-medium text-gray-300 flex items-center space-x-2">
                <FaCalendar className="text-cyan-400 text-sm" />
                <span>End Date</span>
              </label>
              <motion.div whileFocus={{ scale: 1.02 }} className="relative">
                <input
                  ref={inputRefs.endDate}
                  type="date"
                  name="endDate"
                  value={formData.endDate}
                  onChange={handleChange}
                  onKeyDown={(e) => handleKeyDown(e, inputRefs.githubLink)}
                  className="w-full bg-gray-700/50 border border-gray-600 rounded-xl pl-12 pr-4 py-4 text-white focus:outline-none focus:border-cyan-400 focus:bg-gray-700/70 transition-all duration-300"
                  required
                />
                <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                  <FaCalendar className="text-lg" />
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Links */}
          <motion.div
            variants={itemVariants}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {/* GitHub Link */}
            <div className="space-y-3">
              <label className="text-sm font-medium text-gray-300 flex items-center space-x-2">
                <FaGithub className="text-cyan-400 text-sm" />
                <span>GitHub Repository</span>
              </label>
              <motion.div whileFocus={{ scale: 1.02 }} className="relative">
                <input
                  ref={inputRefs.githubLink}
                  type="url"
                  name="githubLink"
                  value={formData.githubLink}
                  onChange={handleChange}
                  onKeyDown={(e) => handleKeyDown(e, inputRefs.linkedinLink)}
                  placeholder="https://github.com/username/repo"
                  className="w-full bg-gray-700/50 border border-gray-600 rounded-xl pl-12 pr-4 py-4 text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400 focus:bg-gray-700/70 transition-all duration-300"
                  required
                />
                <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                  <FaGithub className="text-lg" />
                </div>
              </motion.div>
            </div>

            {/* LinkedIn Link */}
            <div className="space-y-3">
              <label className="text-sm font-medium text-gray-300 flex items-center space-x-2">
                <FaLinkedin className="text-cyan-400 text-sm" />
                <span>LinkedIn Post</span>
              </label>
              <motion.div whileFocus={{ scale: 1.02 }} className="relative">
                <input
                  ref={inputRefs.linkedinLink}
                  type="url"
                  name="linkedinLink"
                  value={formData.linkedinLink}
                  onChange={handleChange}
                  placeholder="https://linkedin.com/posts/..."
                  className="w-full bg-gray-700/50 border border-gray-600 rounded-xl pl-12 pr-4 py-4 text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400 focus:bg-gray-700/70 transition-all duration-300"
                  required
                />
                <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                  <FaLinkedin className="text-lg" />
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Submit Button */}
          <motion.div
            variants={itemVariants}
            className="flex items-center justify-end space-x-4 pt-6 border-t border-gray-700"
          >
            <motion.button
              type="button"
              onClick={() => navigate('/admin-panel/projects')}
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
                    <span>Add Project</span>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </motion.div>
        </form>
      </motion.div>
    </motion.div>
  );
}