import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast"; // ✅ import toast

export default function AdminProjects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/projects`
      );
      setProjects(res.data);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching projects:", err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}/api/projects/${id}`
      );
      setProjects(projects.filter((project) => project._id !== id));
      toast.success("Project deleted successfully"); // ✅ show toast
    } catch (err) {
      console.error("Error deleting project:", err);
    }
  };

  const handleEdit = (id) => {
    navigate(`/admin-panel/projects/edit-project/${id}`);
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="p-4 relative">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold text-accent">Manage Projects</h2>
        <button
          onClick={() => navigate("/admin-panel/projects/add-project")}
          className="font-semibold text-white bg-green-500 hover:bg-green-700 px-4 py-2 rounded text-sm"
        >
          Add Project
        </button>
      </div>

      <table className="w-full border table-auto text-left text-white">
        <thead>
          <tr className="bg-gray-500">
            <th className="p-2 border">Image</th>
            <th className="p-2 border">Name</th>
            <th className="p-2 border">Description</th>
            <th className="p-2 border">Start Date</th>
            <th className="p-2 border">End Date</th>
            <th className="p-2 border">Skills</th>
            <th className="p-2 border">GitHub</th>
            <th className="p-2 border">LinkedIn</th>
            <th className="p-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {projects.map((project) => (
            <tr key={project._id} className="border-b bg-secondary">
              <td className="p-2 border">
                <img
                  src={project.image}
                  alt={project.name}
                  className="h-12 w-12 object-cover rounded"
                />
              </td>
              <td className="p-2 border">{project.name}</td>
              <td className="p-2 border">{project.description}</td>
              <td className="p-2 border">{new Date(project.startDate).toLocaleDateString()}</td>
              <td className="p-2 border">{new Date(project.endDate).toLocaleDateString()}</td>
              <td className="p-2 border">{project.skills.join(", ")}</td>
              <td className="p-2 border">
                {project.githubLink && (
                  <a
                    href={project.githubLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold bg-accent text-black px-4 py-2 rounded-lg hover:bg-gray-700 hover:text-white transition-colors duration-300"
                  >
                    GitHub
                  </a>
                )}
              </td>
              <td className="p-2 border">
                {project.linkedinLink && (
                  <a
                    href={project.linkedinLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold bg-accent text-black px-4 py-2 rounded-lg hover:bg-gray-700 hover:text-white transition-colors duration-300"
                  >
                    LinkedIn
                  </a>
                )}
              </td>
              <td className="p-2 border">
                <div className="flex items-center gap-2">
                  <button
                    className="bg-red-500 text-white hover:bg-red-700 px-2 py-1 text-sm rounded"
                    onClick={() => handleDelete(project._id)}
                  >
                    Delete
                  </button>
                  <button
                    className="bg-blue-500 text-white hover:bg-blue-700 px-2 py-1 text-sm rounded"
                    onClick={() => handleEdit(project._id)}
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
};
