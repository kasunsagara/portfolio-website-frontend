import { motion } from 'framer-motion';

export default function AdminHome() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
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
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="flex items-center justify-center min-h-[400px]"
    >
      <div className="text-center max-w-2xl">
        <motion.div
          variants={itemVariants}
          className="inline-flex items-center space-x-2 bg-gray-800/50 backdrop-blur-sm border border-cyan-400/20 rounded-full px-4 py-2 mb-6"
        >
          <motion.div 
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-2 h-2 bg-cyan-400 rounded-full"
          />
          <span className="text-sm text-cyan-300 font-mono">Admin Panel</span>
        </motion.div>

        <motion.h1 
          variants={itemVariants}
          className="text-4xl font-bold text-white mb-6"
        >
          Welcome <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">Kasun</span>!
        </motion.h1>

        <motion.div
          variants={itemVariants}
          className="space-y-4 text-lg text-gray-300"
        >
          <p>This is your private admin panel.</p>
          <p>You can manage your services, skills, and projects from here.</p>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="mt-8 flex items-center justify-center space-x-2 text-gray-500"
        >
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
          <span className="text-sm">Admin privileges active</span>
        </motion.div>
      </div>
    </motion.div>
  );
}