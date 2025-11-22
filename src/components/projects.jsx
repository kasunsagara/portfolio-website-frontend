import { useState, useEffect } from "react";
import PropTypes from 'prop-types';
import { motion, AnimatePresence } from "framer-motion";
import { FaGithub, FaLinkedin, FaCalendar, FaCode, FaTools } from "react-icons/fa";

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hoveredProject, setHoveredProject] = useState(null);

  useEffect(() => {
    const staticProjects = [
      {
        _id: "1",
        name: "My portfolio website",
        image: "/picture1.png",
        description: "A sleek, responsive MERN Stack portfolio with dynamic role sections, project showcases, and a modern Tailwind CSS design. Includes a secure admin panel for easy updates and a contact form for direct communication.",
        startDate: "2025-04-18",
        endDate: "2025-05-04",
        skills: ["React.js", "Tailwind CSS"],
        githubLink: "https://github.com/kasunsagara/portfolio-website-frontend.git",
        linkedinLink: "https://linkedin.com/in/yourprofile",
        category: "frontend"
      },
      {
        _id: "2",
        name: "Library management system",
        image: "/picture2.png",
        description: "Modern MERN Library System with JWT auth, role-based access, real-time tracking, smart fines, and Supabase images. Admins/librarians manage users browse, borrow, track. Built with React and Tailwind CSS.",
        startDate: "2025-03-08",
        endDate: "2025-04-12",
        skills: ["MERN Stack", "MongoDB", "Express.js", "React.js", "Node.js"],
        githubLink: "https://github.com/kasunsagara/library-management-system-frontend.git",
        linkedinLink: "https://www.linkedin.com/posts/kasun-sagara-ba47b22a9_mernstack-fullstackdeveloper-librarymanagementsystem-activity-7337295852517941248-ectf?utm_source=share&utm_medium=member_desktop&rcm=ACoAAEpVsywBVJnzZ9TkXqHfNeoMeFjXN5jMixo",
        category: "fullstack"
      },
      {
        _id: "3",
        name: "KSW Beauty care web application",
        image: "/picture3.png",
        description: "KSW Beauty Care is a MERN-stack beauty care web application with secure login, role-based access, and features for shopping, inventory management, and analytics, using Supabase for image storage.",
        startDate: "2024-11-26",
        endDate: "2025-02-12",
        skills: ["MERN Stack", "MongoDB", "Express.js", "React.js", "Node.js","UI UX design", "Tailwind CSS"],
        githubLink: "https://github.com/kasunsagara/ksw-beauty-care-web-application-frontend.git",
        linkedinLink: "https://www.linkedin.com/posts/kasun-sagara-ba47b22a9_mern-react-vite-activity-7303605963767316480-9pia?utm_source=share&utm_medium=member_desktop&rcm=ACoAAEpVsywBVJnzZ9TkXqHfNeoMeFjXN5jMixo",
        category: "fullstack"
      },
      {
        _id: "4",
        name: "User management system",
        image: "/picture4.png",
        description: "A full-stack MERN application for efficient user management, featuring a responsive CSS-styled UI and RESTful APIs (GET, POST, PUT, DELETE) to view, add, update, and delete user data seamlessly.",
        startDate: "2024-08-14",
        endDate: "2024-10-12",
        skills: ["MERN Stack", "MongoDB", "Express.js", "React.js", "Node.js", "CSS"],
        githubLink: "https://github.com/kasunsagara/user-management-system-frontend.git",
        linkedinLink: "https://www.linkedin.com/posts/kasun-sagara-ba47b22a9_mernstack-webdevelopment-fullstackdevelopment-activity-7270316158170365953-3iTT?utm_source=share&utm_medium=member_desktop&rcm=ACoAAEpVsywBVJnzZ9TkXqHfNeoMeFjXN5jMixo",
        category: "fullstack"
      },
      {
        _id: "5",
        name: "Spotlight Cinema movie search website",
        image: "/picture5.png",
        description: "Spotlight Cinema is a sleek, responsive movie search site built with HTML, CSS, and JavaScript, featuring real-time results via a movie API and a modern, fast interface.",
        startDate: "2024-06-18",
        endDate: "2024-07-06",
        skills: ["HTML", "CSS", "JavaScript", "APIs"],
        githubLink: "https://github.com/kasunsagara/spotlight-cinema-movie-search-website.git",
        linkedinLink: "https://www.linkedin.com/posts/kasun-sagara-ba47b22a9_webdevelopment-javascriptmagic-apiintegration-activity-7262136382440054786-c43B?utm_source=share&utm_medium=member_desktop&rcm=ACoAAEpVsywBVJnzZ9TkXqHfNeoMeFjXN5jMixo",
        category: "frontend"
      },
      {
        _id: "6",
        name: "CEYLON EXPLORER traveling website",
        image: "/picture6.png",
        description: "CEYLON EXPLORER is a travel website built using HTML, CSS, Node.js, and MySQL. It allows users to explore top Sri Lankan destinations and includes user registration features.",
        startDate: "2024-02-08",
        endDate: "2024-04-18",
        skills: ["HTML", "CSS", "JavaScript", "Node.js", "MySQL"],
        githubLink: "https://github.com/kasunsagara/ceylon-explorer-travelling-website.git",
        linkedinLink: "https://www.linkedin.com/posts/kasun-sagara-ba47b22a9_my-first-project-is-ceylon-explorer-traveling-activity-7208563271237337088-f6Gr?utm_source=share&utm_medium=member_desktop&rcm=ACoAAEpVsywBVJnzZ9TkXqHfNeoMeFjXN5jMixo",
        category: "fullstack"
      }
    ];

    setProjects(staticProjects);
    setIsLoading(false);
  }, []);

  const AllProjects = projects;

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

  return (
    <section id="projects" className="min-h-screen py-20 bg-gradient-to-br from-gray-900 to-black text-white relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,black,transparent)]"></div>
      
      {/* Floating Background Shapes */}
      <div className="absolute top-32 right-20 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-32 left-20 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>

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
            <span className="text-sm text-cyan-300 font-mono">Projects</span>
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-5xl md:text-6xl font-bold mb-6"
          >
            My <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">Projects</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-gray-400 text-lg max-w-2xl mx-auto"
          >
            A collection of my recent work showcasing my skills in web development, mobile apps, and full-stack solutions
          </motion.p>
        </motion.div>

        {/* Projects Grid */}
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
              animate="visible"
              className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8"
            >
              <AnimatePresence>
                {AllProjects.map((project, index) => (
                  <ProjectCard
                    key={project._id}
                    project={project}
                    index={index}
                    hoveredProject={hoveredProject}
                    setHoveredProject={setHoveredProject}
                    variants={cardVariants}
                  />
                ))}
              </AnimatePresence>
            </motion.div>
          )}

          {/* Empty State */}
          {!isLoading && AllProjects.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <FaTools className="text-6xl text-gray-600 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-gray-400 mb-2">No projects found</h3>
              <p className="text-gray-500">Try selecting a different category</p>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ project, index, hoveredProject, setHoveredProject, variants }) {
  const {
    name,
    image,
    description,
    startDate,
    endDate,
    skills,
    githubLink,
    linkedinLink,
    category
  } = project;

  const getCategoryColor = () => {
    return "from-cyan-500 to-blue-600";
  };

  return (
    <motion.div
      variants={variants}
      whileHover="hover"
      onHoverStart={() => setHoveredProject(project._id)}
      onHoverEnd={() => setHoveredProject(null)}
      className="relative group"
    >
      {/* Card Background Glow */}
      <motion.div 
        animate={{ 
          opacity: hoveredProject === project._id ? 0.3 : 0.1,
          scale: hoveredProject === project._id ? 1.05 : 1
        }}
        className={`absolute -inset-4 bg-gradient-to-br ${getCategoryColor()} rounded-3xl blur-xl transition-all duration-500`}
      />
      
      {/* Main Card */}
      <div className="relative bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl overflow-hidden group-hover:border-cyan-400/50 transition-all duration-500 h-full flex flex-col">
        {/* Project Image */}
        <div className="relative overflow-hidden">
          <img
            src={image}
            alt={name}
            className="w-full h-48 object-cover"
          />
          {/* Overlay Gradient - blur එක ඉවත් කරන්න */}
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent opacity-60"></div>

          {/* Category Badge */}
          <div className="absolute top-4 left-4">
            <span className="px-3 py-1 bg-gray-900/80 backdrop-blur-sm rounded-full text-xs font-semibold text-white border border-gray-600">
              {category}
            </span>
          </div>

          {/* Hover Actions - blur එක ඉවත් කරන්න */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ 
              opacity: hoveredProject === project._id ? 1 : 0,
              y: hoveredProject === project._id ? 0 : 20
            }}
            className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 flex items-center justify-center space-x-4"
          >
          </motion.div>
        </div>

        {/* Project Info */}
        <div className="p-6 flex-1 flex flex-col">
          <h3 className="text-xl font-bold text-white mb-3 group-hover:text-cyan-400 transition-colors duration-300">
            {name}
          </h3>
          
          <p className="text-gray-400 text-sm leading-relaxed mb-4 flex-1">
            {description}
          </p>

          {/* Duration */}
          <div className="flex items-center space-x-2 text-gray-500 text-sm mb-4">
            <FaCalendar className="text-cyan-400" />
            <span>
              {new Date(startDate).toLocaleDateString()} – {new Date(endDate).toLocaleDateString()}
            </span>
          </div>

          {/* Skills */}
          <div className="mb-4">
            <div className="flex items-center space-x-2 text-gray-500 text-sm mb-2">
              <FaCode className="text-cyan-400" />
              <span className="font-semibold">Technologies:</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {skills.slice().map((skill, skillIndex) => (
                <motion.span
                  key={skillIndex}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: skillIndex * 0.1 }}
                  className="px-3 py-1 bg-gray-700/50 text-gray-300 rounded-full text-xs border border-gray-600"
                >
                  {skill}
                </motion.span>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-3 mt-auto">
            {githubLink && (
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href={githubLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center space-x-2 bg-gray-700/50 hover:bg-gray-600/50 text-white py-2 px-4 rounded-xl transition-all duration-300 border border-gray-600 hover:border-cyan-400/50 text-sm"
              >
                <FaGithub />
                <span>GitHub</span>
              </motion.a>
            )}
            {linkedinLink && (
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href={linkedinLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center space-x-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white py-2 px-4 rounded-xl transition-all duration-300 border border-cyan-400/20 text-sm"
              >
                <FaLinkedin />
                <span>LinkedIn</span>
              </motion.a>
            )}
          </div>
        </div>

        {/* Sequential Animation Indicator */}
        <motion.div
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          transition={{ delay: index * 0.1 + 0.5, duration: 0.5 }}
          className="absolute -bottom-2 -right-2 w-4 h-4 bg-cyan-400 rounded-full"
        />
      </div>
    </motion.div>
  );
}

ProjectCard.propTypes = {
  project: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
  hoveredProject: PropTypes.string,
  setHoveredProject: PropTypes.func.isRequired,
  variants: PropTypes.object.isRequired
};