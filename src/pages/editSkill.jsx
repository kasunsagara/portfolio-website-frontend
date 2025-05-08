import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const EditSkill = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // Get skill ID from URL

  const [formData, setFormData] = useState({
    icon: '',
    name: '',
    desc: '',
    category: 'frontend',
  });

  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchSkill = async () => {
      try {
        const res = await axios.get(import.meta.env.VITE_BACKEND_URL + `/api/skills/${id}`);
        setFormData(res.data);
      } catch (err) {
        setError('Failed to load skill data');
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
    setMessage('');
    setError('');

    try {
      const res = await axios.put(import.meta.env.VITE_BACKEND_URL + `/api/skills/${id}`, formData);
      setMessage('Skill updated successfully!');
      navigate('/admin-panel/skills');

    } catch (err) {
      setError(err.response?.data?.error || 'Failed to update skill');
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-gray-700 shadow-2xl rounded-2xl">
      <h2 className="text-2xl text-center text-accent font-bold mb-6">Edit Skill</h2>

      {message && <p className="text-green-500 mb-4">{message}</p>}
      {error && <p className="text-red-500 mb-4">{error}</p>}

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

export default EditSkill;
