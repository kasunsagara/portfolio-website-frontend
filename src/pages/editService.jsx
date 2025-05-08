import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const EditService = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // To get the service ID from URL params

  const [formData, setFormData] = useState({
    icon: '',
    title: '',
    description: '',
  });

  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  // Fetch the service data to populate the form when editing
  useEffect(() => {
    const fetchService = async () => {
      try {
        const res = await axios.get(import.meta.env.VITE_BACKEND_URL + `/api/services/${id}`);
        setFormData(res.data);
      } catch (err) {
        setError('Failed to fetch service data');
      }
    };

    fetchService();
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
      const res = await axios.put(import.meta.env.VITE_BACKEND_URL + `/api/services/${id}`, formData);
      setMessage('Service updated successfully!');
      navigate('/admin-panel/services');
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to update service');
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-gray-700 shadow-2xl rounded-2xl">
      <h2 className="text-2xl text-center text-accent font-bold mb-6">Edit Service</h2>

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
          <label className="block text-sm font-medium text-white mb-1">Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full border rounded p-2"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-white mb-1">Description</label>
          <textarea
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
          Update Service
        </button>
      </form>
    </div>
  );
};

export default EditService;
