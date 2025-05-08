import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AddService = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    icon: '',
    title: '',
    description: '',
  });

  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

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
    setMessage('');
    setError('');

    try {
      const res = await axios.post(import.meta.env.VITE_BACKEND_URL + "/api/services", formData);
      setMessage('Service added successfully!');
      navigate('/admin-panel/services');
      
      setFormData({
        icon: '',
        title: '',
        description: '',
      });
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to add service');
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-gray-700 shadow-2xl rounded-2xl">
      <h2 className="text-2xl text-center text-accent font-bold mb-6">Add Service</h2>

      {message && <p className="text-green-500 mb-4">{message}</p>}
      {error && <p className="text-red-500 mb-4">{error}</p>}

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

export default AddService;
