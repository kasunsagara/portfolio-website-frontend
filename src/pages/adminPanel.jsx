import React, { useState } from 'react';
import { useNavigate, Link, Outlet, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaTools, 
  FaHandshake, 
  FaFolderOpen, 
  FaEnvelope, 
  FaSignOutAlt, 
  FaUserShield,
  FaBars
} from 'react-icons/fa';
import { toast } from "react-hot-toast";

export default function AdminPanel() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const handleLogout = () => {
    localStorage.removeItem("isAdmin");
    localStorage.removeItem("token");
    toast.success("Logged out successfully");
    navigate('/');
  };

  const menuItems = [
    {
      path: "skills",
      icon: FaTools,
      label: "Skills",
      description: "Manage technical skills"
    },
    {
      path: "services",
      icon: FaHandshake,
      label: "Services",
      description: "Manage services offered"
    },
    {
      path: "projects",
      icon: FaFolderOpen,
      label: "Projects",
      description: "Manage portfolio projects"
    },
    {
      path: "messages",
      icon: FaEnvelope,
      label: "Messages",
      description: "View contact messages"
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

  const sidebarVariants = {
    open: { 
      width: 280,
      transition: { duration: 0.3, ease: "easeInOut" }
    },
    closed: { 
      width: 80,
      transition: { duration: 0.3, ease: "easeInOut" }
    }
  };

  const contentVariants = {
    open: { 
      marginLeft: 280,
      transition: { duration: 0.3, ease: "easeInOut" }
    },
    closed: { 
      marginLeft: 80,
      transition: { duration: 0.3, ease: "easeInOut" }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white flex">
      {/* Sidebar */}
      <motion.div
        variants={sidebarVariants}
        initial="open"
        animate={isSidebarOpen ? "open" : "closed"}
        className="fixed left-0 top-0 h-full bg-gray-800/80 backdrop-blur-xl border-r border-gray-700 z-50 overflow-hidden"
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="p-6 border-b border-gray-700"
          >
            <div className="flex items-center justify-between">
              <motion.div
                variants={itemVariants}
                className="flex items-center space-x-3"
              >
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center shadow-2xl shadow-cyan-500/25">
                  <FaUserShield className="text-white text-lg" />
                </div>
                <AnimatePresence>
                  {isSidebarOpen && (
                    <motion.div
                      initial={{ opacity: 0, width: 0 }}
                      animate={{ opacity: 1, width: "auto" }}
                      exit={{ opacity: 0, width: 0 }}
                      className="overflow-hidden"
                    >
                      <div>
                        <h1 className="text-lg font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                          Admin Panel
                        </h1>
                        <p className="text-xs text-gray-400">Control Center</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>

              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="p-2 rounded-lg bg-gray-700/50 hover:bg-gray-600/50 border border-gray-600 text-gray-400 hover:text-white transition-all duration-300"
              >
                <FaBars className="text-sm" />
              </motion.button>
            </div>
          </motion.div>

          {/* Navigation Menu */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex-1 p-4 space-y-2 overflow-y-auto"
          >
            {menuItems.map((item, index) => {
              const isActive = location.pathname === `/admin-panel/${item.path}` || 
                              (location.pathname === '/admin-panel' && item.path === '');
              const Icon = item.icon;

              return (
                <motion.div
                  key={item.path}
                  variants={itemVariants}
                  transition={{ delay: index * 0.05 }}
                >
                  <Link
                    to={item.path}
                    className={`flex items-center space-x-3 p-3 rounded-xl transition-all duration-300 group ${
                      isActive
                        ? 'bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-400/30 text-cyan-400 shadow-lg shadow-cyan-500/10'
                        : 'bg-gray-700/30 hover:bg-gray-700/50 border border-transparent hover:border-gray-600 text-gray-400 hover:text-white'
                    }`}
                  >
                    <div className={`p-2 rounded-lg transition-all duration-300 ${
                      isActive 
                        ? 'bg-cyan-500 text-white' 
                        : 'bg-gray-600 group-hover:bg-cyan-500 group-hover:text-white'
                    }`}>
                      <Icon className="text-lg" />
                    </div>
                    
                    <AnimatePresence>
                      {isSidebarOpen && (
                        <motion.div
                          initial={{ opacity: 0, width: 0 }}
                          animate={{ opacity: 1, width: "auto" }}
                          exit={{ opacity: 0, width: 0 }}
                          className="flex-1 overflow-hidden"
                        >
                          <div className="flex flex-col">
                            <span className="font-medium text-sm whitespace-nowrap">
                              {item.label}
                            </span>
                            <span className="text-xs text-gray-500 group-hover:text-gray-400 whitespace-nowrap">
                              {item.description}
                            </span>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {isActive && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="w-2 h-2 bg-cyan-400 rounded-full"
                      />
                    )}
                  </Link>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Footer / Logout */}
          <motion.div
            variants={itemVariants}
            className="p-4 border-t border-gray-700"
          >
            <motion.button
              onClick={handleLogout}
              whileHover={{ scale: 1.02, x: 5 }}
              whileTap={{ scale: 0.98 }}
              className="w-full flex items-center space-x-3 p-3 rounded-xl bg-gradient-to-r from-red-500/20 to-pink-500/20 hover:from-red-500/30 hover:to-pink-500/30 border border-red-400/30 text-red-400 hover:text-red-300 transition-all duration-300 group"
            >
              <div className="p-2 rounded-lg bg-red-500 text-white group-hover:scale-110 transition-transform duration-300">
                <FaSignOutAlt className="text-lg" />
              </div>
              
              <AnimatePresence>
                {isSidebarOpen && (
                  <motion.div
                    initial={{ opacity: 0, width: 0 }}
                    animate={{ opacity: 1, width: "auto" }}
                    exit={{ opacity: 0, width: 0 }}
                    className="overflow-hidden"
                  >
                    <span className="font-medium text-sm whitespace-nowrap">Logout</span>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </motion.div>
        </div>

        {/* Decorative Elements */}
        <motion.div
          animate={{ 
            rotate: 360,
            scale: [1, 1.1, 1]
          }}
          transition={{ 
            duration: 8,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute -bottom-20 -right-20 w-40 h-40 bg-cyan-500/10 rounded-full blur-xl"
        />
      </motion.div>

      {/* Main Content */}
      <motion.div
        variants={contentVariants}
        initial="open"
        animate={isSidebarOpen ? "open" : "closed"}
        className="flex-1 min-h-screen bg-gradient-to-br from-gray-900 to-black"
      >
        {/* Background Elements */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,black,transparent)]"></div>
        
        {/* Floating Background Shapes */}
        <div className="absolute top-20 right-20 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>

        <div className="relative z-10 p-8">
          {/* Content Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-white mb-2">
                  Welcome to Admin Panel
                </h1>
                <p className="text-gray-400">
                  Manage your portfolio content and monitor activities
                </p>
              </div>
              
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="flex items-center space-x-3 bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl px-4 py-2"
              >
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-sm text-gray-300">Admin Online</span>
              </motion.div>
            </div>
          </motion.div>

          {/* Nested Routes Content */}
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-gray-800/30 backdrop-blur-sm border border-gray-700 rounded-2xl p-6 min-h-[600px]"
          >
            <Outlet />
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}