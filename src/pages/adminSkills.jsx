import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // ✅ import
import axios from "axios";

const AdminSkills = () => {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate(); // ✅ initialize

  useEffect(() => {
    fetchSkills();
  }, []);

  const fetchSkills = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/skills`
      );
      setSkills(res.data);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching skills:", err);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this skill?");
    if (!confirmDelete) return;

    try {
      await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}/api/skills/${id}`
      );
      setSkills(skills.filter((skill) => skill._id !== id));
    } catch (err) {
      console.error("Error deleting skill:", err);
    }
  };

  const handleEdit = (id) => {
    navigate(`/admin/edit-skill/${id}`); // ✅ programmatic navigation
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="p-4 relative">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold text-accent">Manage Skills</h2>
        <button
          onClick={() => navigate("/add-skill")}
          className="font-semibold text-white bg-green-500 hover:bg-green-700 px-4 py-2 rounded text-sm"
        >
          Add Skill
        </button>
      </div>

      <table className="w-full border table-auto text-left text-white">
        <thead>
          <tr className="bg-gray-500">
            <th className="p-2 border">Icon</th>
            <th className="p-2 border">Name</th>
            <th className="p-2 border">Description</th>
            <th className="p-2 border">Category</th>
            <th className="p-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {skills.map((skill) => (
            <tr key={skill._id} className="border-b">
              <td className="p-2 border">{skill.icon}</td>
              <td className="p-2 border">{skill.name}</td>
              <td className="p-2 border">{skill.desc}</td>
              <td className="p-2 border capitalize">{skill.category}</td>
              <td className="p-2 border">
                <div className="flex items-center gap-2">
                  <button
                    className="bg-red-500 text-white hover:bg-red-700 px-2 py-1 text-sm rounded"
                    onClick={() => handleDelete(skill._id)}
                  >
                    Delete
                  </button>
                  <button
                    className="bg-blue-500 text-white hover:bg-blue-700 px-2 py-1 text-sm rounded"
                    onClick={() => handleEdit(skill._id)} // ✅ use handler
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

export default AdminSkills;
