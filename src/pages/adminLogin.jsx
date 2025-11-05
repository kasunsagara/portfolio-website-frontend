import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";
import { FaLock, FaEnvelope, FaUserShield, FaEye, FaEyeSlash, FaSignInAlt } from "react-icons/fa";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const passwordRef = useRef(null);
  const buttonRef = useRef(null);

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/auths/admin-login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("isAdmin", "true");
        toast.success("Login successful! Welcome back.");
        navigate("/admin-panel");
      } else {
        toast.error(data.message || "Login failed. Please check your credentials.");
      }
    } catch (err) {
      toast.error("Network error. Please try again.");
    } finally {
      setIsLoading(false);
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
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.7,
        ease: "easeOut"
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,black,transparent)]"></div>
      
      {/* Floating Background Shapes */}
      <div className="absolute top-20 left-20 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-20 right-20 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-500"></div>

      {/* Security Pattern Overlay */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.15)_1px,transparent_0)] bg-[length:20px_20px]"></div>
      </div>

      <motion.div
        variants={cardVariants}
        initial="hidden"
        animate="visible"
        className="relative w-full max-w-md"
      >
        {/* Card Background Glow */}
        <div className="absolute -inset-4 bg-gradient-to-br from-cyan-500/20 via-blue-500/20 to-purple-500/20 rounded-3xl blur-2xl"></div>
        
        <div className="relative bg-gray-800/50 backdrop-blur-xl border border-gray-700 rounded-2xl p-8 shadow-2xl">
          {/* Header */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="text-center mb-8"
          >
            <motion.div
              variants={itemVariants}
              className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-2xl mb-4 shadow-2xl shadow-cyan-500/25"
            >
              <FaUserShield className="text-2xl text-white" />
            </motion.div>
            
            <motion.h2
              variants={itemVariants}
              className="text-3xl font-bold text-white mb-2"
            >
              Admin <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">Portal</span>
            </motion.h2>
            
            <motion.p
              variants={itemVariants}
              className="text-gray-400 text-sm"
            >
              Secure access to administration panel
            </motion.p>
          </motion.div>

          {/* Login Form */}
          <motion.form
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            onSubmit={handleLogin}
            className="space-y-6"
          >
            {/* Email Field */}
            <motion.div
              variants={itemVariants}
              className="space-y-2"
            >
              <label className="text-sm font-medium text-gray-300 flex items-center space-x-2">
                <FaEnvelope className="text-cyan-400 text-xs" />
                <span>Admin Email</span>
              </label>
              
              <motion.div
                whileFocus={{ scale: 1.02 }}
                className="relative"
              >
                <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                  <FaEnvelope className="text-lg" />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      passwordRef.current?.focus();
                    }
                  }}
                  required
                  className="w-full bg-gray-700/50 border border-gray-600 rounded-xl pl-12 pr-4 py-4 text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400 focus:bg-gray-700/70 transition-all duration-300"
                  placeholder="admin@example.com"
                />
              </motion.div>
            </motion.div>

            {/* Password Field */}
            <motion.div
              variants={itemVariants}
              className="space-y-2"
            >
              <label className="text-sm font-medium text-gray-300 flex items-center space-x-2">
                <FaLock className="text-cyan-400 text-xs" />
                <span>Admin Password</span>
              </label>
              
              <motion.div
                whileFocus={{ scale: 1.02 }}
                className="relative"
              >
                <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                  <FaLock className="text-lg" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  ref={passwordRef}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      buttonRef.current?.focus();
                      buttonRef.current?.click();
                    }
                  }}
                  required
                  className="w-full bg-gray-700/50 border border-gray-600 rounded-xl pl-12 pr-12 py-4 text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400 focus:bg-gray-700/70 transition-all duration-300"
                  placeholder="••••••••"
                />
                
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-cyan-400 transition-colors duration-300"
                >
                  <AnimatePresence mode="wait">
                    {showPassword ? (
                      <motion.div
                        key="eye-slash"
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0 }}
                      >
                        <FaEyeSlash className="text-lg" />
                      </motion.div>
                    ) : (
                      <motion.div
                        key="eye"
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0 }}
                      >
                        <FaEye className="text-lg" />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </button>
              </motion.div>
            </motion.div>

            {/* Submit Button */}
            <motion.button
              ref={buttonRef}
              type="submit"
              disabled={isLoading}
              variants={itemVariants}
              whileHover={{ scale: isLoading ? 1 : 1.02 }}
              whileTap={{ scale: isLoading ? 1 : 0.98 }}
              className="w-full flex items-center justify-center space-x-3 py-4 px-8 rounded-xl transition-all duration-300 border shadow-2xl"
              style={{
                background: isLoading 
                  ? "linear-gradient(135deg, #4B5563, #374151)"
                  : "linear-gradient(135deg, #06B6D4, #3B82F6)",
                borderColor: isLoading ? "#4B5563" : "rgba(6, 182, 212, 0.3)"
              }}
            >
              <AnimatePresence mode="wait">
                {isLoading ? (
                  <motion.div
                    key="loading"
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0 }}
                    className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"
                  />
                ) : (
                  <motion.div
                    key="login"
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex items-center space-x-2"
                  >
                    <FaSignInAlt className="text-lg" />
                    <span className="font-semibold">Login to Dashboard</span>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </motion.form>

          {/* Decorative Elements */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="absolute -top-2 -right-2 w-4 h-4 bg-cyan-400 rounded-full"
          />
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.7, duration: 0.5 }}
            className="absolute -bottom-2 -left-2 w-4 h-4 bg-blue-400 rounded-full"
          />
        </div>
      </motion.div>

      {/* Floating Particles */}
      <motion.div
        animate={{ 
          y: [0, -20, 0],
          opacity: [0.3, 0.7, 0.3]
        }}
        transition={{ 
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute top-1/4 left-1/4 w-2 h-2 bg-cyan-400/30 rounded-full"
      />
      <motion.div
        animate={{ 
          y: [0, 15, 0],
          opacity: [0.5, 0.8, 0.5]
        }}
        transition={{ 
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1
        }}
        className="absolute bottom-1/3 right-1/3 w-1 h-1 bg-blue-400/30 rounded-full"
      />
    </div>
  );
}