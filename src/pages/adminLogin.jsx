import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    const adminEmail = import.meta.env.VITE_ADMIN_EMAIL;
    const adminPassword = import.meta.env.VITE_ADMIN_PASSWORD;

    if (email === adminEmail && password === adminPassword) {
      localStorage.setItem("isAdmin", "true");
      navigate("/admin-panel");
    } else {
      setError("Invalid credentials");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-primary px-4">
      <div className="max-w-md w-full bg-secondary shadow-xl rounded-2xl p-8">
        <h2 className="text-3xl font-bold text-center text-accent mb-6">Admin Login</h2>
        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-white mb-1">Admin Email</label>
            <input
              type="email"
              className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-accent"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-white mb-1">Admin Password</label>
            <input
              type="password"
              className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-accent mb-4"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button
            type="submit"
            className="w-full text-lg font-semibold bg-accent text-black py-2 rounded-lg hover:bg-gray-700 hover:text-white transition duration-200"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};


