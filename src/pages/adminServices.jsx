import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";

// Import icon libraries
import * as FaIcons from "react-icons/fa";
import * as SiIcons from "react-icons/si";
import * as DiIcons from "react-icons/di";
import * as AiIcons from "react-icons/ai";
import * as BsIcons from "react-icons/bs";

// Helper to get icon component
const getIconComponent = (iconName) => {
  const iconLibraries = {
    ...FaIcons,
    ...SiIcons,
    ...DiIcons,
    ...AiIcons,
    ...BsIcons,
  };
  const Icon = iconLibraries[iconName];
  return Icon ? <Icon className="text-2xl" /> : null;
};

export default function AdminServices() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/services`
      );
      setServices(res.data);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching services:", err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/services/${id}`);
      setServices(services.filter((service) => service._id !== id));
      toast.success("Service deleted successfully"); 
    } catch (err) {
      console.error("Error deleting service:", err);
    }
  };

  const handleEdit = (id) => {
    navigate(`/admin-panel/services/edit-service/${id}`);
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="p-4 relative">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold text-[#00ffff]">Manage Services</h2>
        <button
          onClick={() => navigate("/admin-panel/services/add-service")}
          className="font-semibold text-white bg-green-500 hover:bg-green-700 px-4 py-2 rounded text-sm"
        >
          Add Service
        </button>
      </div>

      <table className="w-full border table-auto text-left text-white">
        <thead>
          <tr className="bg-gray-500">
            <th className="p-2 border">Icon</th>
            <th className="p-2 border">Title</th>
            <th className="p-2 border">Description</th>
            <th className="p-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {services.map((service) => (
            <tr key={service._id} className="border-b bg-gray-700 hover:bg-gray-600">
              <td className="p-2 border">
                {getIconComponent(service.icon)}
              </td>
              <td className="p-2 border">{service.title}</td>
              <td className="p-2 border">{service.description}</td>
              <td className="p-2 border">
                <div className="flex items-center gap-2">
                  <button
                    className="bg-red-500 text-white hover:bg-red-700 px-2 py-1 text-sm rounded"
                    onClick={() => handleDelete(service._id)}
                  >
                    Delete
                  </button>
                  <button
                    className="bg-blue-500 text-white hover:bg-blue-700 px-2 py-1 text-sm rounded"
                    onClick={() => handleEdit(service._id)}
                  >
                    Edit
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
