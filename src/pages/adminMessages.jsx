import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";
import { FaEnvelope, FaTrash, FaUser, FaPhone, FaCalendar, FaSort, FaSortUp, FaSortDown, FaExclamationTriangle } from "react-icons/fa";

export default function AdminMessages() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortField, setSortField] = useState("submittedAt");
  const [sortDirection, setSortDirection] = useState("desc");
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/contacts`
      );
      console.log("API Response:", res.data);
      setMessages(res.data);
    } catch (err) {
      console.error("Error fetching messages:", err);
      setError("Failed to load messages. Please check your connection.");
      toast.error("Failed to load messages");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}/api/contacts/${id}`
      );
      setMessages(messages.filter((msg) => msg._id !== id));
      toast.success("Message deleted successfully");
    } catch (err) {
      console.error("Error deleting message:", err);
      toast.error("Failed to delete message");
    }
  };

  const formatDate = (dateString) => {
    try {
      return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch {
      return 'Invalid Date';
    }
  };

  const getTimeAgo = (dateString) => {
    try {
      const now = new Date();
      const messageDate = new Date(dateString);
      const diffInHours = Math.floor((now - messageDate) / (1000 * 60 * 60));
      
      if (diffInHours < 1) return "Just now";
      if (diffInHours < 24) return `${diffInHours}h ago`;
      if (diffInHours < 168) return `${Math.floor(diffInHours / 24)}d ago`;
      return formatDate(dateString);
    } catch {
      return 'Unknown';
    }
  };

  // Sort and filter messages
  const sortedMessages = [...messages].filter(message => {
    if (!message) return false;
    
    const searchLower = searchTerm.toLowerCase();
    return (
      (message.name && message.name.toLowerCase().includes(searchLower)) ||
      (message.email && message.email.toLowerCase().includes(searchLower)) ||
      (message.message && message.message.toLowerCase().includes(searchLower)) ||
      (message.phone && message.phone.includes(searchTerm))
    );
  }).sort((a, b) => {
    const aValue = a[sortField] || '';
    const bValue = b[sortField] || '';
    
    if (sortField === 'submittedAt') {
      try {
        const aDate = new Date(aValue);
        const bDate = new Date(bValue);
        return sortDirection === "asc" ? aDate - bDate : bDate - aDate;
      } catch {
        return 0;
      }
    }
    
    const aString = String(aValue).toLowerCase();
    const bString = String(bValue).toLowerCase();
    
    if (sortDirection === "asc") {
      return aString.localeCompare(bString);
    } else {
      return bString.localeCompare(aString);
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

  // Loading State
  if (loading) {
    return (
      <div className="min-h-[400px] flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center"
        >
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="rounded-full h-16 w-16 border-b-2 border-cyan-400 mx-auto mb-4"
          />
          <h3 className="text-xl font-semibold text-white mb-2">Loading Messages</h3>
          <p className="text-gray-400">Please wait while we fetch your messages...</p>
        </motion.div>
      </div>
    );
  }

  // Error State
  if (error) {
    return (
      <div className="min-h-[400px] flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center max-w-md"
        >
          <div className="w-20 h-20 bg-red-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <FaExclamationTriangle className="text-3xl text-red-400" />
          </div>
          <h3 className="text-xl font-semibold text-white mb-2">Connection Error</h3>
          <p className="text-gray-400 mb-6">{error}</p>
          <motion.button
            onClick={fetchMessages}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-3 bg-cyan-500 hover:bg-cyan-600 text-white rounded-xl transition-all duration-300"
          >
            Try Again
          </motion.button>
        </motion.div>
      </div>
    );
  }

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="space-y-6 p-6"
    >
      {/* Header Section */}
      <motion.div
        variants={itemVariants}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Manage Messages</h1>
          <p className="text-gray-400">View and manage contact messages from your portfolio</p>
        </div>
      </motion.div>

      {/* Messages Table */}
      <motion.div
        variants={itemVariants}
        className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl overflow-hidden"
      >
        <div className="overflow-x-auto">
          <table className="w-full min-w-full">
            <thead>
              <tr className="border-b border-gray-700">
                <th 
                  className="px-6 py-4 text-left text-sm font-semibold text-gray-300 cursor-pointer hover:bg-gray-700/50 transition-colors duration-200"
                  onClick={() => handleSort("name")}
                >
                  <div className="flex items-center space-x-2">
                    <FaUser className="text-cyan-400 text-sm" />
                    <span>Name</span>
                    {getSortIcon("name")}
                  </div>
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">
                  <div className="flex items-center space-x-2">
                    <FaPhone className="text-cyan-400 text-sm" />
                    <span>Phone</span>
                  </div>
                </th>
                <th 
                  className="px-6 py-4 text-left text-sm font-semibold text-gray-300 cursor-pointer hover:bg-gray-700/50 transition-colors duration-200"
                  onClick={() => handleSort("email")}
                >
                  <div className="flex items-center space-x-2">
                    <FaEnvelope className="text-cyan-400 text-sm" />
                    <span>Email</span>
                    {getSortIcon("email")}
                  </div>
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">
                  Message Preview
                </th>
                <th 
                  className="px-6 py-4 text-left text-sm font-semibold text-gray-300 cursor-pointer hover:bg-gray-700/50 transition-colors duration-200"
                  onClick={() => handleSort("submittedAt")}
                >
                  <div className="flex items-center space-x-2">
                    <FaCalendar className="text-cyan-400 text-sm" />
                    <span>Received</span>
                    {getSortIcon("submittedAt")}
                  </div>
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              <AnimatePresence>
                {sortedMessages.map((message, index) => (
                  <motion.tr
                    key={message._id || index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ delay: index * 0.05 }}
                    className="hover:bg-gray-700/30 transition-colors duration-200 group"
                  >
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <span className="font-semibold text-white group-hover:text-cyan-400 transition-colors duration-200">
                          {message.name || 'N/A'}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-2 text-gray-400">
                        <span className="font-mono text-sm">{message.phone || 'N/A'}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <a 
                        href={`mailto:${message.email}`}
                        className="text-cyan-400 hover:text-cyan-300 transition-colors duration-200 text-sm"
                      >
                        {message.email || 'N/A'}
                      </a>
                    </td>
                    <td className="px-6 py-4">
                      <div className="max-w-xs">
                        <p className="text-gray-400 line-clamp-2 text-sm">
                          {message.message || 'No message content'}
                        </p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <span className="text-gray-400 text-sm">
                          {getTimeAgo(message.submittedAt)}
                        </span>
                        <span className="text-gray-500 text-xs">
                          {formatDate(message.submittedAt)}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-2">
                        <motion.button
                          onClick={() => handleDelete(message._id)}
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          className="p-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 hover:text-red-300 rounded-xl border border-red-400/30 hover:border-red-400/50 transition-all duration-200"
                          title="Delete message"
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
        {sortedMessages.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <div className="w-20 h-20 bg-gray-700/50 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <FaEnvelope className="text-3xl text-gray-500" />
            </div>
            <h3 className="text-xl font-bold text-gray-400 mb-2">
              {searchTerm ? "No messages found" : "No messages yet"}
            </h3>
            <p className="text-gray-500 mb-6">
              {searchTerm 
                ? "Try adjusting your search criteria"
                : "No contact messages have been received yet"
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