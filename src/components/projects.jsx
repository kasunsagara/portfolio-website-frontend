import { useEffect, useState } from 'react';
import axios from 'axios';

const Projects = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_BASE}/api/projects`)
      .then(res => setProjects(res.data))
      .catch(console.error);
  }, []);

  return (
    <section id="projects" className="py-16 bg-primary text-white px-4">
      <div className="container mx-auto text-center">
        <h2 className="text-4xl font-bold text-secondary mb-8">My Projects</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map(project => (
            <div key={project._id} className="project-card bg-white text-primary rounded-lg overflow-hidden shadow-lg transition transform hover:scale-105 hover:shadow-2xl">
              <img
                src={project.imageUrl}
                alt={project.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-2xl font-semibold text-secondary mb-4">{project.title}</h3>
                <p className="text-lg text-gray-700 mb-6">{project.description}</p>
                <a
                  href={project.link}
                  className="inline-block py-2 px-6 text-lg font-semibold bg-secondary text-primary rounded-lg hover:bg-primary hover:text-white transition duration-300"
                >
                  View Project
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
