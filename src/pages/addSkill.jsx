import React, { useState } from 'react';
import axios from 'axios';

const AddSkill = () => {
  const [formData, setFormData] = useState({
    icon: '',
    name: '',
    desc: '',
    category: 'frontend',
  });

  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

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
      const res = await axios.post(import.meta.env.VITE_BACKEND_URL + "/api/skills", formData); // Update path if needed
      setMessage('Skill added successfully!');
      setFormData({
        icon: '',
        name: '',
        desc: '',
        category: 'frontend',
      });
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to add skill');
    }
  };

  return (
    <div className="max-w-md mx-auto p-4 bg-white shadow rounded">
      <h2 className="text-2xl font-semibold mb-4">Add New Skill</h2>

      {message && <p className="text-green-600 mb-2">{message}</p>}
      {error && <p className="text-red-600 mb-2">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="icon"
          placeholder="Skill Icon URL or Class"
          value={formData.icon}
          onChange={handleChange}
          className="w-full border rounded p-2"
          required
        />

        <input
          type="text"
          name="name"
          placeholder="Skill Name"
          value={formData.name}
          onChange={handleChange}
          className="w-full border rounded p-2"
          required
        />

        <textarea
          name="desc"
          placeholder="Skill Description"
          value={formData.desc}
          onChange={handleChange}
          className="w-full border rounded p-2"
          required
        />

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

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Add Skill
        </button>
      </form>
    </div>
  );
};

export default AddSkill;
