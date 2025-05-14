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
    <section id="projects" className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 px-6 py-24">
      <h2 className="text-5xl font-bold text-center text-[#00ffff] mb-10">
        My Projects
      </h2>

      <div className="flex flex-wrap gap-8 justify-center">
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
    <div className="w-96 bg-white backdrop-filter backdrop-blur-lg bg-opacity-10 text-white rounded-2xl shadow-xl overflow-hidden flex flex-col hover:-translate-y-2 transition-transform duration-300">
      {/* Project Image */}
      <img
        src={image}
        alt={name}
        className="w-full h-56 object-cover"
      />

      {/* Info Section */}
      <div className="p-6 flex flex-col justify-between h-full">
        <h3 className="text-2xl font-bold text-white">{name}</h3>
        <p className="text-base text-white">{description}</p>
        <p className="text-sm text-white">
          <span className="font-bold text-white">Skills:</span>{' '}
          {skills.join(', ')}
        </p>
        <p className="text-sm text-white">
          <span className="font-bold text-white">Duration:</span>{' '}
          {new Date(startDate).toLocaleDateString()} – {new Date(endDate).toLocaleDateString()}
        </p>
        <div className="mt-4 flex gap-4">
          {githubLink && (
            <a
              href={githubLink}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold bg-[#00ffff] text-black px-4 py-2 rounded-lg hover:bg-gray-600 hover:text-white transition-transform transform hover:scale-105 duration-300"
            >
              GitHub
            </a>
          )}
          {linkedinLink && (
            <a
              href={linkedinLink}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold bg-[#00ffff] text-black px-4 py-2 rounded-lg hover:bg-gray-600 hover:text-white transition-transform transform hover:scale-105 duration-300"
            >
              LinkedIn
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
