import React, { useEffect, useState } from 'react';
import ProjectCard from './ProjectCard';
import axios from 'axios';

const Projects = () => {
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
    <section className="min-h-screen bg-primary py-12 px-6">
      <h2 className="text-5xl font-bold text-center text-accent mb-10">
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
            githubLink="https://github.com/yourusername/project"
            linkedinLink="https://www.linkedin.com/in/yourprofile"
          />
        ))}
      </div>
    </section>
  );
};

export default Projects;
