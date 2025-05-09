import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import uploadMediaToSupabase from '../utils/mediaUpload'; // Adjust the path
import { toast } from 'react-hot-toast'; // Import toast

export default function EditProject() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    startDate: '',
    endDate: '',
    skills: '',
    githubLink: '',
    linkedinLink: '',
  });

  const [imageFile, setImageFile] = useState(null);
  const [existingImage, setExistingImage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/projects/${id}`);
        const project = res.data;
        setFormData({
          name: project.name,
          description: project.description,
          startDate: project.startDate.slice(0, 10),
          endDate: project.endDate.slice(0, 10),
          skills: project.skills.join(', '),
          githubLink: project.githubLink,
          linkedinLink: project.linkedinLink,
        });
        setExistingImage(project.image);
      } catch (err) {
        toast.error('Failed to load project'); // Show error toast
      }
    };

    fetchProject();
  }, [id]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      let imageUrl = existingImage;

      if (imageFile) {
        imageUrl = await uploadMediaToSupabase(imageFile);
      }

      const data = {
        ...formData,
        image: imageUrl,
        skills: formData.skills.split(',').map((s) => s.trim()),
      };

      await axios.put(`${import.meta.env.VITE_BACKEND_URL}/api/projects/${id}`, data);

      toast.success('Project updated successfully!'); // Show success toast
      navigate('/admin-panel/projects'); // Adjust the route if needed
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to update project'); // Show error toast
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-gray-700 shadow-2xl rounded-2xl">
      <h2 className="text-2xl text-center text-accent font-bold mb-6">Edit Project</h2>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-sm text-white mb-1">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
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
            className="w-full border rounded p-2"
          />
          {existingImage && !imageFile && (
            <img src={existingImage} alt="Current" className="mt-2 h-32 object-cover rounded" />
          )}
        </div>

        <div>
          <label className="block text-sm text-white mb-1">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full border rounded p-2"
            required
          ></textarea>
        </div>

        <div className="flex gap-4">
          <div className="w-1/2">
            <label className="block text-sm text-white mb-1">Start Date</label>
            <input
              type="date"
              name="startDate"
              value={formData.startDate}
              onChange={handleChange}
              className="w-full border rounded p-2"
              required
            />
          </div>

          <div className="w-1/2">
            <label className="block text-sm text-white mb-1">End Date</label>
            <input
              type="date"
              name="endDate"
              value={formData.endDate}
              onChange={handleChange}
              className="w-full border rounded p-2"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm text-white mb-1">Skills</label>
          <input
            type="text"
            name="skills"
            value={formData.skills}
            onChange={handleChange}
            className="w-full border rounded p-2"
            required
          />
        </div>

        <div>
          <label className="block text-sm text-white mb-1">GitHub Link</label>
          <input
            type="url"
            name="githubLink"
            value={formData.githubLink}
            onChange={handleChange}
            className="w-full border rounded p-2"
            required
          />
        </div>

        <div>
          <label className="block text-sm text-white mb-1">LinkedIn Link</label>
          <input
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
          Update Project
        </button>
      </form>
    </div>
  );
};


