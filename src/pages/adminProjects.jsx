import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";
import { FaPlus, FaEdit, FaTrash, FaSearch, FaFolderOpen, FaGithub, FaLinkedin, FaCalendar, FaCode, FaSort, FaSortUp, FaSortDown, FaExternalLinkAlt } from "react-icons/fa";

export default function AdminProjects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortField, setSortField] = useState("name");
  const [sortDirection, setSortDirection] = useState("asc");
  const navigate = useNavigate();

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/projects`
      );
      setProjects(res.data);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching projects:", err);
      toast.error("Failed to load projects");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this project?")) {
      return;
    }

    try {
      await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}/api/projects/${id}`
      );
      setProjects(projects.filter((project) => project._id !== id));
      toast.success("Project deleted successfully");
    } catch (err) {
      console.error("Error deleting project:", err);
      toast.error("Failed to delete project");
    }
  };

  const handleEdit = (id) => {
    navigate(`/admin-panel/projects/edit-project/${id}`);
  };

  // Sort and filter projects
  const sortedProjects = [...projects].filter(project => 
    project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    project.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()))
  ).sort((a, b) => {
    const aValue = a[sortField]?.toLowerCase() || '';
    const bValue = b[sortField]?.toLowerCase() || '';
    
    if (sortField === 'startDate' || sortField === 'endDate') {
      const aDate = new Date(a[sortField]);
      const bDate = new Date(b[sortField]);
      return sortDirection === "asc" ? aDate - bDate : bDate - aDate;
    }
    
    if (sortDirection === "asc") {
      return aValue.localeCompare(bValue);
    } else {
      return bValue.localeCompare(aValue);
    }
  });

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const getSortIcon = (field) => {
    if (sortField !== field) return <FaSort className="text-gray-400" />;
    return sortDirection === "asc" ? <FaSortUp className="text-cyan-400" /> : <FaSortDown className="text-cyan-400" />;
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
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

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="rounded-full h-12 w-12 border-b-2 border-cyan-400"
        />
      </div>
    );
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      {/* Header */}
      <motion.div
        variants={itemVariants}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Manage Projects</h1>
          <p className="text-gray-400">Add, edit, or remove projects from your portfolio</p>
        </div>
        
        <motion.button
          onClick={() => navigate("/admin-panel/projects/add-project")}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center space-x-3 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 border border-cyan-400/20 shadow-2xl shadow-cyan-500/25"
        >
          <FaPlus className="text-lg" />
          <span>Add New Project</span>
        </motion.button>
      </motion.div>

      {/* Search Bar */}
      <motion.div
        variants={itemVariants}
        className="p-6 bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl"
      >
        <div className="relative max-w-md">
          <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
            <FaSearch className="text-lg" />
          </div>
          <input
            type="text"
            placeholder="Search projects by name, description, or skills..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-gray-700/50 border border-gray-600 rounded-xl pl-12 pr-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400 focus:bg-gray-700/70 transition-all duration-300"
          />
        </div>
      </motion.div>

      {/* Projects Table */}
      <motion.div
        variants={itemVariants}
        className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl overflow-hidden"
      >
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">
                  Image
                </th>
                <th 
                  className="px-6 py-4 text-left text-sm font-semibold text-gray-300 cursor-pointer hover:bg-gray-700/50 transition-colors duration-200"
                  onClick={() => handleSort("name")}
                >
                  <div className="flex items-center space-x-2">
                    <span>Name</span>
                    {getSortIcon("name")}
                  </div>
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">
                  Description
                </th>
                <th 
                  className="px-6 py-4 text-left text-sm font-semibold text-gray-300 cursor-pointer hover:bg-gray-700/50 transition-colors duration-200"
                  onClick={() => handleSort("startDate")}
                >
                  <div className="flex items-center space-x-2">
                    <span>Start Date</span>
                    {getSortIcon("startDate")}
                  </div>
                </th>
                <th 
                  className="px-6 py-4 text-left text-sm font-semibold text-gray-300 cursor-pointer hover:bg-gray-700/50 transition-colors duration-200"
                  onClick={() => handleSort("endDate")}
                >
                  <div className="flex items-center space-x-2">
                    <span>End Date</span>
                    {getSortIcon("endDate")}
                  </div>
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">
                  Skills
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">
                  Links
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              <AnimatePresence>
                {sortedProjects.map((project, index) => (
                  <motion.tr
                    key={project._id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ delay: index * 0.05 }}
                    className="hover:bg-gray-700/30 transition-colors duration-200 group"
                  >
                    <td className="px-6 py-4">
                      <motion.div 
                        whileHover={{ scale: 1.05 }}
                        className="w-16 h-16 rounded-xl overflow-hidden border border-gray-600"
                      >
                        <img 
                          src={project.image} 
                          alt={project.name}
                          className="w-full h-full object-cover"
                        />
                      </motion.div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <span className="font-semibold text-white group-hover:text-cyan-400 transition-colors duration-200">
                          {project.name}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-gray-400 max-w-xs line-clamp-2 text-sm">
                        {project.description}
                      </p>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-2 text-gray-400">
                        <FaCalendar className="text-cyan-400 text-xs" />
                        <span className="text-sm">{formatDate(project.startDate)}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-2 text-gray-400">
                        <FaCalendar className="text-cyan-400 text-xs" />
                        <span className="text-sm">{formatDate(project.endDate)}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-wrap gap-1 max-w-xs">
                        {project.skills.slice(0, 3).map((skill, skillIndex) => (
                          <span
                            key={skillIndex}
                            className="px-2 py-1 bg-gray-700/50 text-gray-300 rounded text-xs border border-gray-600"
                          >
                            {skill}
                          </span>
                        ))}
                        {project.skills.length > 3 && (
                          <span className="px-2 py-1 bg-gray-700/50 text-gray-400 rounded text-xs border border-gray-600">
                            +{project.skills.length - 3}
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-2">
                        {project.githubLink && (
                          <motion.a
                            href={project.githubLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ scale: 1.1 }}
                            className="p-2 bg-gray-700/50 hover:bg-gray-600 text-gray-400 hover:text-white rounded-lg border border-gray-600 transition-all duration-200"
                            title="GitHub Repository"
                          >
                            <FaGithub className="text-sm" />
                          </motion.a>
                        )}
                        {project.linkedinLink && (
                          <motion.a
                            href={project.linkedinLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ scale: 1.1 }}
                            className="p-2 bg-gray-700/50 hover:bg-blue-600 text-gray-400 hover:text-white rounded-lg border border-gray-600 transition-all duration-200"
                            title="LinkedIn Post"
                          >
                            <FaLinkedin className="text-sm" />
                          </motion.a>
                        )}
                        {!project.githubLink && !project.linkedinLink && (
                          <span className="text-xs text-gray-500">No links</span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-2">
                        <motion.button
                          onClick={() => handleEdit(project._id)}
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          className="p-2 bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-400 hover:text-cyan-300 rounded-xl border border-cyan-400/30 hover:border-cyan-400/50 transition-all duration-200"
                          title="Edit project"
                        >
                          <FaEdit className="text-sm" />
                        </motion.button>
                        
                        <motion.button
                          onClick={() => handleDelete(project._id)}
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          className="p-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 hover:text-red-300 rounded-xl border border-red-400/30 hover:border-red-400/50 transition-all duration-200"
                          title="Delete project"
                        >
                          <FaTrash className="text-sm" />
                        </motion.button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </AnimatePresence>
            </tbody>
          </table>
        </div>

        {/* Empty State */}
        {sortedProjects.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <div className="w-20 h-20 bg-gray-700/50 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <FaFolderOpen className="text-3xl text-gray-500" />
            </div>
            <h3 className="text-xl font-bold text-gray-400 mb-2">No projects found</h3>
            <p className="text-gray-500 mb-6">
              {searchTerm 
                ? "Try adjusting your search criteria"
                : "Get started by adding your first project"
              }
            </p>
            {searchTerm && (
              <motion.button
                onClick={() => setSearchTerm("")}
                whileHover={{ scale: 1.05 }}
                className="px-6 py-2 bg-gray-700/50 hover:bg-gray-600/50 text-gray-400 hover:text-white rounded-xl transition-all duration-300 border border-gray-600"
              >
                Clear Search
              </motion.button>
            )}
          </motion.div>
        )}
      </motion.div>

      {/* Table Footer Stats */}
      <motion.div
        variants={itemVariants}
        className="flex items-center justify-between p-4 bg-gray-800/30 rounded-xl border border-gray-700"
      >
        <div className="text-sm text-gray-400">
          Showing <span className="text-cyan-400 font-semibold">{sortedProjects.length}</span> of{" "}
          <span className="text-white font-semibold">{projects.length}</span> projects
        </div>
        
        <div className="text-sm text-gray-400">
          Total Projects: <span className="text-white font-semibold">{projects.length}</span>
        </div>
      </motion.div>
    </motion.div>
  );
};