import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-hot-toast';  // Import react-hot-toast

export default function AddService() { 
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    icon: '',
    title: '',
    description: '',
  });

  const inputRefs = {
    icon: useRef(null),
    title: useRef(null),
    description: useRef(null),
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
      const res = await axios.post(import.meta.env.VITE_BACKEND_URL + "/api/services", formData);
      
      // Show success toast
      toast.success('Service added successfully!');
      
      navigate('/admin-panel/services');
      
      setFormData({
        icon: '',
        title: '',
        description: '',
      });
    } catch (err) {
      // Show error toast
      toast.error(err.response?.data?.error || 'Failed to add service');
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-8 m-16 bg-white backdrop-filter backdrop-blur-lg bg-opacity-10 shadow-2xl rounded-2xl">
      <h2 className="text-2xl text-center text-[#00ffff] font-bold mb-6">Add Service</h2>

      {/* Removed custom message rendering since react-hot-toast is handling it */}
      
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-sm font-medium text-white mb-1">Icon</label>
          <input
            ref={inputRefs.icon}
            type="text"
            name="icon"
            value={formData.icon}
            onChange={handleChange}
            onKeyDown={(e) => handleKeyDown(e, inputRefs.title)}
            className="w-full border rounded p-2"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-white mb-1">Title</label>
          <input
            ref={inputRefs.title}
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            onKeyDown={(e) => handleKeyDown(e, inputRefs.description)}
            className="w-full border rounded p-2"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-white mb-1">Description</label>
          <textarea
            ref={inputRefs.description}
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full border rounded p-2"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 transition duration-200"
        >
          Add Service
        </button>
      </form>
    </div>
  );
};


