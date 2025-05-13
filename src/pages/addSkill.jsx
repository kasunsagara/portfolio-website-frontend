import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-hot-toast';

export default function AddSkill() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    icon: '',
    name: '',
    desc: '',
    category: 'frontend',
  });

  const inputRefs = {
    icon: useRef(null),
    name: useRef(null),
    desc: useRef(null),
    category: useRef(null),
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleKeyDown = (e, nextInput) => {
    if (e.key === 'Enter') {
      nextInput?.current?.focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(import.meta.env.VITE_BACKEND_URL + "/api/skills", formData);
      toast.success('Skill added successfully!');
      navigate('/admin-panel/skills');
      
      setFormData({
        icon: '',
        name: '',
        desc: '',
        category: 'frontend',
      });
    } catch (err) {
      toast.error(err.response?.data?.error || 'Failed to add skill');
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-8 m-16 bg-secondary shadow-2xl rounded-2xl">
      <h2 className="text-2xl text-center text-accent font-bold mb-6">Add Skill</h2>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-sm font-medium text-white mb-1">Icon</label>
          <input
            ref={inputRefs.icon}
            type="text"
            name="icon"
            value={formData.icon}
            onChange={handleChange}
            onKeyDown={(e) => handleKeyDown(e, inputRefs.name)}
            className="w-full border rounded p-2"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-white mb-1">Name</label>
          <input
            ref={inputRefs.name}
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            onKeyDown={(e) => handleKeyDown(e, inputRefs.desc)}
            className="w-full border rounded p-2"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-white mb-1">Description</label>
          <textarea
            ref={inputRefs.desc}
            name="desc"
            value={formData.desc}
            onChange={handleChange}
            onKeyDown={(e) => handleKeyDown(e, inputRefs.category)}
            className="w-full border rounded p-2"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-white mb-1">Category</label>
          <select
            ref={inputRefs.category}
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
            <option value="other">Other</option>
          </select>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 transition duration-200"
        >
          Add Skill
        </button>
      </form>
    </div>
  );
};


