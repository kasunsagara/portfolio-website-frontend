import React from 'react';
import { useNavigate, Link, Outlet } from 'react-router-dom';
import { FaTools, FaHandshake, FaFolderOpen, FaEnvelope } from 'react-icons/fa'; // Icons
import { toast } from "react-hot-toast";

export default function AdminPanel() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("isAdmin");
    toast.success("Logout successfully");
    navigate('/');
  };

  return (
    <div className="w-full h-screen flex bg-gradient-to-b from-gray-900 to-gray-800">
      {/* Sidebar */}
      <div className="w-[20%] h-screen bg-white backdrop-filter backdrop-blur-lg bg-opacity-10 flex-col shadow-lg p-8">
        <h1 className="text-3xl font-bold text-[#00ffff]">Admin Panel</h1>

        <div className="mt-8">
          <ul className="space-y-4">
            <li>
              <Link
                to="skills"
                className="flex items-center gap-3 mb-6 text-base font-medium text-white rounded-lg hover:bg-gray-600 hover:text-white py-2 px-4 transition-all duration-300"
              >
                <FaTools />
                <span>Skills</span>
              </Link>
            </li>
            <li>
              <Link
                to="services"
                className="flex items-center gap-3 mb-6 text-base font-medium text-white rounded-lg hover:bg-gray-600 hover:text-white py-2 px-4 transition-all duration-300"
              >
                <FaHandshake />
                <span>Services</span>
              </Link>
            </li>
            <li>
              <Link
                to="projects"
                className="flex items-center gap-3 mb-6 text-base font-medium text-white rounded-lg hover:bg-gray-600 hover:text-white py-2 px-4 transition-all duration-300"
              >
                <FaFolderOpen />
                <span>Projects</span>
              </Link>
            </li>
            <li>
              <Link
                to="messages"
                className="flex items-center gap-3 mb-6 text-base font-medium text-white rounded-lg hover:bg-gray-600 hover:text-white py-2 px-4 transition-all duration-300"
              >
                <FaEnvelope />
                <span>Messages</span>
              </Link>
            </li>
          </ul>
        </div>

        <button
          onClick={handleLogout}
          className="mt-10 flex items-center gap-2 px-6 py-2 rounded-xl text-lg font-semibold bg-[#00ffff] text-[#192230] shadow-md hover:bg-[#192230] hover:text-[#00ffff] hover:border-2 border-[#00ffff] transition duration-200"
        >
          Logout
        </button>
      </div>

      {/* Render nested routes here */}
      <div className="w-[80%] h-screen overflow-auto bg-gradient-to-b from-gray-900 to-gray-800">
        <Outlet />
      </div>
    </div>
  );
}
