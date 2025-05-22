import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import uploadMediaToSupabase from '../utils/mediaUpload'; // Adjust the path as needed
import { toast } from 'react-hot-toast'; // ✅ Import toast

export default function AddProject() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    skills: '',
    startDate: '',
    endDate: '',
    githubLink: '',
    linkedinLink: '',
  });

  const [imageFile, setImageFile] = useState(null);

  const inputRefs = {
    name: useRef(null),
    description: useRef(null),
    skills: useRef(null),
    startDate: useRef(null),
    endDate: useRef(null),
    githubLink: useRef(null),
    linkedinLink: useRef(null),
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleKeyDown = (e, nextInput) => {
    if (e.key === 'Enter') {
      nextInput?.current?.focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (!imageFile) {
        toast.error("Please select an image.");
        return;
      }

      const imageUrl = await uploadMediaToSupabase(imageFile);

      const data = {
        ...formData,
        image: imageUrl,
        skills: formData.skills.split(',').map((skill) => skill.trim()),
      };

      await axios.post(import.meta.env.VITE_BACKEND_URL + "/api/projects", data);
      toast.success('Project added successfully!');
      navigate('/admin-panel/projects');

      setFormData({
        name: '',
        description: '',
        skills: '',
        startDate: '',
        endDate: '',
        githubLink: '',
        linkedinLink: '',
      });
      setImageFile(null);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to add project');
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-8 m-16 bg-white backdrop-filter backdrop-blur-lg bg-opacity-10 shadow-2xl rounded-2xl">
      <h2 className="text-2xl text-center text-[#00ffff] font-bold mb-6">Add Project</h2>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-sm text-white mb-1">Name</label>
          <input
            ref={inputRefs.name}
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            onKeyDown={(e) => handleKeyDown(e, inputRefs.description)}
            className="w-full border rounded p-2"
            required
          />
        </div>

        <div>
          <label className="block text-sm text-white mb-1">Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            onKeyDown={(e) => handleKeyDown(e, inputRefs.description)}
            className="w-full border rounded p-2"
            required
          />
        </div>

        <div>
          <label className="block text-sm text-white mb-1">Description</label>
          <textarea
            ref={inputRefs.description}
            name="description"
            value={formData.description}
            onChange={handleChange}
            onKeyDown={(e) => handleKeyDown(e, inputRefs.skills)}
            className="w-full border rounded p-2"
            required
          ></textarea>
        </div>

        <div>
          <label className="block text-sm text-white mb-1">Skills</label>
          <input
            ref={inputRefs.skills}
            type="text"
            name="skills"
            value={formData.skills}
            onChange={handleChange}
            onKeyDown={(e) => handleKeyDown(e, inputRefs.startDate)}
            className="w-full border rounded p-2"
            required
          />
        </div>        

        <div className="flex gap-4">
          <div className="w-1/2">
            <label className="block text-sm text-white mb-1">Start Date</label>
            <input
              ref={inputRefs.startDate}
              type="date"
              name="startDate"
              value={formData.startDate}
              onChange={handleChange}
              onKeyDown={(e) => handleKeyDown(e, inputRefs.endDate)}
              className="w-full border rounded p-2"
              required
            />
          </div>

          <div className="w-1/2">
            <label className="block text-sm text-white mb-1">End Date</label>
            <input
              ref={inputRefs.endDate}
              type="date"
              name="endDate"
              value={formData.endDate}
              onChange={handleChange}
              onKeyDown={(e) => handleKeyDown(e, inputRefs.githubLink)}
              className="w-full border rounded p-2"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm text-white mb-1">GitHub Link</label>
          <input
            ref={inputRefs.githubLink}
            type="url"
            name="githubLink"
            value={formData.githubLink}
            onChange={handleChange}
            onKeyDown={(e) => handleKeyDown(e, inputRefs.linkedinLink)}
            className="w-full border rounded p-2"
            required
          />
        </div>

        <div>
          <label className="block text-sm text-white mb-1">LinkedIn Link</label>
          <input
            ref={inputRefs.linkedinLink}
            type="url"
            name="linkedinLink"
            value={formData.linkedinLink}
            onChange={handleChange}
            className="w-full border rounded p-2"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 transition duration-200"
        >
          Add Project
        </button>
      </form>
    </div>
  );
};


