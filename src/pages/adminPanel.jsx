import React from 'react';
import { useNavigate, Link, Outlet } from 'react-router-dom';

export default function AdminPanel() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("isAdmin");
    navigate('/');
  };

  return (
    <div className="min-h-screen flex items-start bg-primary px-4 py-10 gap-10">
      {/* Sidebar */}
      <div className="w-full max-w-xs bg-secondary shadow-lg rounded-2xl p-8">
        <h1 className="text-3xl font-bold text-accent">Admin Panel</h1>
        <p className="mt-2 text-white">Welcome Kasun! This is your private admin panel.</p>

        <div className="mt-8">
          <h3 className="text-xl font-semibold text-white mb-4">Manage Content</h3>
          <ul className="space-y-4">
            <li>
              <Link
                to="skills"
                className="flex flex-row items-center mb-6 text-base font-medium text-white rounded-lg hover:bg-gray-700 hover:text-white py-2 px-4 transition-all duration-300"
              >
                <span>Skills</span>
              </Link>
            </li>
            <li>
              <Link
                to="services"
                className="flex flex-row items-center mb-6 text-base font-medium text-white rounded-lg hover:bg-gray-700 hover:text-white py-2 px-4 transition-all duration-300"
              >
                <span>Services</span>
              </Link>
            </li>
            <li>
              <Link
                to="projects"
                className="flex flex-row items-center mb-6 text-base font-medium text-white rounded-lg hover:bg-gray-700 hover:text-white py-2 px-4 transition-all duration-300"
              >
                <span>Projects</span>
              </Link>
            </li>
            <li>
              <Link
                to="messages"
                className="flex flex-row items-center mb-6 text-base font-medium text-white rounded-lg hover:bg-gray-700 hover:text-white py-2 px-4 transition-all duration-300"
              >
                <span>Messages</span>
              </Link>
            </li>
          </ul>
        </div>

        <button
          onClick={handleLogout}
          className="mt-10 flex items-center gap-2 px-6 py-2 rounded-xl text-lg font-semibold bg-accent text-black shadow-md hover:bg-gray-700 hover:text-white transition duration-200"
        >
          Logout
        </button>
      </div>

      {/* Render nested routes here */}
      <div className="flex-1 w-full max-w-6xl bg-secondary rounded-xl p-4 shadow-lg">
        <Outlet />
      </div>
    </div>
  );
}
