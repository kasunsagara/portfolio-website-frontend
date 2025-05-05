import React from 'react';

const ProjectCard = ({ name, image, description, startDate, endDate, skills, githubLink, linkedinLink }) => {
  return (
    <div className="w-96 bg-trinity text-white rounded-2xl shadow-xl overflow-hidden flex flex-col hover:-translate-y-2 transition-transform duration-300">
      
      {/* Project Image */}
      <img
        src={image}
        alt={name}
        className="w-full h-56 object-cover" // Increased height for the image
      />

      {/* Info Section */}
      <div className="p-6 flex flex-col justify-between h-full"> {/* Increased padding */}
        {/* Title */}
        <h3 className="text-2xl font-bold text-white">{name}</h3> {/* Increased font size */}

        {/* Description */}
        <p className="text-base text-gray-200">{description}</p> {/* Increased font size */}

        {/* Skills as plain text like Duration */}
        <p className="text-sm text-gray-300">
          <span className="font-semibold text-white">Skills:</span>{' '}
          {skills.join(', ')}
        </p>

        {/* Start and End Dates */}
        <p className="text-sm text-gray-300">
          <span className="font-semibold text-white">Duration:</span>{' '}
          {new Date(startDate).toLocaleDateString()} – {new Date(endDate).toLocaleDateString()}
        </p>

        {/* GitHub and LinkedIn Buttons */}
        <div className="mt-4 flex gap-4">
          {githubLink && (
            <a
              href={githubLink}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold bg-accent text-black px-4 py-2 rounded-lg hover:bg-gray-700 hover:text-white transition-colors duration-300"
            >
              GitHub
            </a>
          )}
          {linkedinLink && (
            <a
              href={linkedinLink}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold bg-accent text-black px-4 py-2 rounded-lg hover:bg-gray-700 hover:text-white transition-colors duration-300"
            >
              LinkedIn
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
