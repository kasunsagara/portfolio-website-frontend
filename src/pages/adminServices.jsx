import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";
import { FaPlus, FaEdit, FaTrash, FaHandshake, FaSort, FaSortUp, FaSortDown } from "react-icons/fa";

// Import icon libraries
import * as FaIcons from "react-icons/fa";
import * as SiIcons from "react-icons/si";
import * as DiIcons from "react-icons/di";
import * as AiIcons from "react-icons/ai";
import * as BsIcons from "react-icons/bs";

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
  return Icon ? <Icon className="text-xl" /> : <FaHandshake className="text-xl" />;
};

export default function AdminServices() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortField, setSortField] = useState("title");
  const [sortDirection, setSortDirection] = useState("asc");
  const navigate = useNavigate();

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/services`
      );
      setServices(res.data);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching services:", err);
      toast.error("Failed to load services");
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/services/${id}`);
      setServices(services.filter((service) => service._id !== id));
      toast.success("Service deleted successfully"); 
    } catch (err) {
      console.error("Error deleting service:", err);
      toast.error("Failed to delete service");
    }
  };

  const handleEdit = (id) => {
    navigate(`/admin-panel/services/edit-service/${id}`);
  };

  // Sort services
  const sortedServices = [...services].filter(service => 
    service.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    service.description.toLowerCase().includes(searchTerm.toLowerCase())
  ).sort((a, b) => {
    const aValue = a[sortField]?.toLowerCase() || '';
    const bValue = b[sortField]?.toLowerCase() || '';
    
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
          <h1 className="text-3xl font-bold text-white mb-2">Manage Services</h1>
          <p className="text-gray-400">Add, edit, or remove services from your portfolio</p>
        </div>
        
        <motion.button
          onClick={() => navigate("/admin-panel/services/add-service")}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center space-x-3 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 border border-cyan-400/20 shadow-2xl shadow-cyan-500/25"
        >
          <FaPlus className="text-lg" />
          <span>Add New Service</span>
        </motion.button>
      </motion.div>

      {/* Services Table */}
      <motion.div
        variants={itemVariants}
        className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl overflow-hidden"
      >
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">
                  Icon
                </th>
                <th 
                  className="px-6 py-4 text-left text-sm font-semibold text-gray-300 cursor-pointer hover:bg-gray-700/50 transition-colors duration-200"
                  onClick={() => handleSort("title")}
                >
                  <div className="flex items-center space-x-2">
                    <span>Title</span>
                    {getSortIcon("title")}
                  </div>
                </th>
                <th 
                  className="px-6 py-4 text-left text-sm font-semibold text-gray-300 cursor-pointer hover:bg-gray-700/50 transition-colors duration-200"
                  onClick={() => handleSort("description")}
                >
                  <div className="flex items-center space-x-2">
                    <span>Description</span>
                    {getSortIcon("description")}
                  </div>
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              <AnimatePresence>
                {sortedServices.map((service, index) => (
                  <motion.tr
                    key={service._id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ delay: index * 0.05 }}
                    className="hover:bg-gray-700/30 transition-colors duration-200 group"
                  >
                    <td className="px-6 py-4">
                      <motion.div 
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center text-white"
                      >
                        {getIconComponent(service.icon)}
                      </motion.div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <span className="font-semibold text-white group-hover:text-cyan-400 transition-colors duration-200">
                          {service.title}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-gray-400 max-w-md line-clamp-2">
                        {service.description}
                      </p>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-2">
                        <motion.button
                          onClick={() => handleEdit(service._id)}
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          className="p-2 bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-400 hover:text-cyan-300 rounded-xl border border-cyan-400/30 hover:border-cyan-400/50 transition-all duration-200"
                          title="Edit service"
                        >
                          <FaEdit className="text-sm" />
                        </motion.button>
                        
                        <motion.button
                          onClick={() => handleDelete(service._id)}
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          className="p-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 hover:text-red-300 rounded-xl border border-red-400/30 hover:border-red-400/50 transition-all duration-200"
                          title="Delete service"
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
        {sortedServices.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <div className="w-20 h-20 bg-gray-700/50 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <FaHandshake className="text-3xl text-gray-500" />
            </div>
            <h3 className="text-xl font-bold text-gray-400 mb-2">No services found</h3>
            <p className="text-gray-500 mb-6">
              {searchTerm 
                ? "Try adjusting your search criteria"
                : "Get started by adding your first service"
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
    </motion.div>
  );
}