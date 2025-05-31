import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast'; // Import react-hot-toast

export default function EditSkill() {
  const navigate = useNavigate();
  const { id } = useParams(); // Get skill ID from URL

  const [formData, setFormData] = useState({
    icon: '',
    name: '',
    desc: '',
    category: 'frontend',
  });

  const [error, setError] = useState('');

  useEffect(() => {
    const fetchSkill = async () => {
      try {
        const res = await axios.get(import.meta.env.VITE_BACKEND_URL + `/api/skills/${id}`);
        setFormData(res.data);
      } catch (err) {
        setError('Failed to load skill data');
        toast.error('Failed to load skill data'); // Show error toast
      }
    };
    fetchSkill();
  }, [id]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const res = await axios.put(import.meta.env.VITE_BACKEND_URL + `/api/skills/${id}`, formData);
      toast.success('Skill updated successfully!'); // Show success toast
      navigate('/admin-panel/skills');
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to update skill');
      toast.error(err.response?.data?.error || 'Failed to update skill'); // Show error toast
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-8 m-16 bg-white backdrop-filter backdrop-blur-lg bg-opacity-10 shadow-2xl rounded-2xl">
      <h2 className="text-2xl text-center text-accent font-bold mb-6">Edit Skill</h2>

      {error && <p className="text-red-500 mb-4">{error}</p>} {/* Display error message */}

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-sm font-medium text-white mb-1">Icon</label>
          <input
            type="text"
            name="icon"
            value={formData.icon}
            onChange={handleChange}
            className="w-full border rounded p-2"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-white mb-1">Name</label>
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
          <label className="block text-sm font-medium text-white mb-1">Description</label>
          <textarea
            name="desc"
            value={formData.desc}
            onChange={handleChange}
            className="w-full border rounded p-2"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-white mb-1">Category</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full border rounded p-2"
            required
          >
            <option value="frontend">Frontend</option>
            <option value="backend">Backend</option>
            <option value="database">Database</option>
            <option value="tools">Tools</option>
          </select>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 transition duration-200"
        >
          Update Skill
        </button>
      </form>
    </div>
  );
};

