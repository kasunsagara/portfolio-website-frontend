import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-hot-toast'; // Import react-hot-toast

export default function EditService() {
  const navigate = useNavigate();
  const { id } = useParams(); // To get the service ID from URL params

  const [formData, setFormData] = useState({
    icon: '',
    title: '',
    description: '',
  });

  // Fetch the service data to populate the form when editing
  useEffect(() => {
    const fetchService = async () => {
      try {
        const res = await axios.get(import.meta.env.VITE_BACKEND_URL + `/api/services/${id}`);
        setFormData(res.data);
      } catch (err) {
        toast.error('Failed to fetch service data'); // Show error toast
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

    try {
      const res = await axios.put(import.meta.env.VITE_BACKEND_URL + `/api/services/${id}`, formData);
      toast.success('Service updated successfully!'); // Show success toast
      navigate('/admin-panel/services');
    } catch (err) {
      toast.error(err.response?.data?.error || 'Failed to update service'); // Show error toast
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-8 m-16 bg-white backdrop-filter backdrop-blur-lg bg-opacity-10 shadow-2xl rounded-2xl">
      <h2 className="text-2xl text-center text-accent font-bold mb-6">Edit Service</h2>

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


