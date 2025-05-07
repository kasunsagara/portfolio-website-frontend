// src/components/AdminPanel.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaTools, FaFolderOpen, FaEnvelope  } from 'react-icons/fa';

export default function AdminPanel() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("isAdmin");
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-primary flex flex-col items-center justify-start py-10 px-4">
      <div className="bg-secondary shadow-lg rounded-2xl w-full max-w-3xl p-8">
        <h1 className="text-3xl font-bold text-accent">Admin Panel</h1>
        <p className="mt-2 text-white">
          Welcome <span className="font-semibold">Kasun</span>! This is your private admin panel.
        </p>

        <div className="mt-8">
          <h3 className="text-xl font-semibold text-white mb-4">Manage Content</h3>
          <ul className="space-y-4">
            <li className="flex items-center gap-3 text-white hover:text-accent transition">
              <FaTools className="text-lg" />
              <span>Skills</span>
            </li>
            <li className="flex items-center gap-3 text-white hover:text-accent transition">
              <FaFolderOpen className="text-lg" />
              <span>Projects</span>
            </li>
            <li className="flex items-center gap-3 text-white hover:text-accent transition">
              <FaEnvelope className="text-lg" />
              <span>Messages</span>
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
    </div>
  );
};


