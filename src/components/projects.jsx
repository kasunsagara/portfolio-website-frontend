import { useState, useEffect } from "react";
import axios from "axios";

export default function Projects() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/projects`);
        setProjects(res.data);
      } catch (err) {
        console.error('Error fetching projects:', err);
      }
    };

    fetchProjects();
  }, []);

  return (
    <section
      id="projects" 
      className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 px-6 py-24"
    >
      <h2 className="text-5xl sm:text-5xl font-bold text-center text-[#00ffff] mb-8 sm:mb-10">
        My Projects
      </h2>

      <div className="flex flex-col sm:flex-row flex-wrap gap-8 justify-center items-center sm:items-stretch">
        {projects.map((project) => (
          <ProjectCard
            key={project._id}
            name={project.name}
            image={project.image}
            description={project.description}
            startDate={project.startDate}
            endDate={project.endDate}
            skills={project.skills}
            githubLink={project.githubLink}
            linkedinLink={project.linkedinLink}
          />
        ))}
      </div>
    </section>
  );
}

function ProjectCard({ name, image, description, startDate, endDate, skills, githubLink, linkedinLink }) {
  return (
    <div className="w-full sm:w-96 bg-white backdrop-filter backdrop-blur-lg bg-opacity-10 text-white rounded-2xl shadow-xl overflow-hidden flex flex-col hover:-translate-y-2 transition-transform duration-300">
      {/* Project Image */}
      <img
        src={image}
        alt={name}
        className="w-full h-48 sm:h-56 object-cover"
      />

      {/* Info Section */}
      <div className="p-4 sm:p-6 flex flex-col justify-between h-full">
        <h3 className="text-xl sm:text-2xl font-bold text-white">{name}</h3>
        <p className="text-sm sm:text-base text-white mt-2">{description}</p>
        <p className="text-sm text-white mt-2">
          <span className="font-bold text-white">Skills:</span>{' '}
          {skills.join(', ')}
        </p>
        <p className="text-sm text-white">
          <span className="font-bold text-white">Duration:</span>{' '}
          {new Date(startDate).toLocaleDateString()} – {new Date(endDate).toLocaleDateString()}
        </p>
        <div className="mt-4 flex flex-col sm:flex-row gap-3 sm:gap-4">
          {githubLink && (
            <a
              href={githubLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-center font-semibold bg-[#00ffff] text-[#192230] px-4 py-2 rounded-lg hover:bg-[#192230] hover:text-[#00ffff] hover:border-2 border-[#00ffff] transition duration-300"
            >
              GitHub
            </a>
          )}
          {linkedinLink && (
            <a
              href={linkedinLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-center font-semibold bg-[#00ffff] text-[#192230] px-4 py-2 rounded-lg hover:bg-[#192230] hover:text-[#00ffff] hover:border-2 border-[#00ffff] transition duration-300"
            >
              LinkedIn
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
