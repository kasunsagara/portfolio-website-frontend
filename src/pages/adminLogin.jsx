import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const passwordRef = useRef(null);
  const buttonRef = useRef(null);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/auths/admin-login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("isAdmin", "true");
        toast.success("Login successfully");
        navigate("/admin-panel");
      } else {
        toast.error(data.message || "Login failed");
      }
    } catch (err) {
      toast.error("Something went wrong. Try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-900 to-gray-800 px-4">
      <div className="max-w-md w-full bg-white backdrop-filter backdrop-blur-lg bg-opacity-10 shadow-xl rounded-2xl p-8">
        <h2 className="text-3xl font-bold text-center text-[#00ffff] mb-6">Admin Login</h2>
        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-white mb-1">Admin Email</label>
            <input
              type="email"
              className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#00ffff]"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  passwordRef.current?.focus();
                }
              }}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-white mb-1">Admin Password</label>
            <input
              type="password"
              ref={passwordRef}
              className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#00ffff] mb-4"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  buttonRef.current?.focus();
                }
              }}
              required
            />
          </div>
          <button
            type="submit"
            ref={buttonRef}
            className="w-full text-lg font-semibold bg-[#00ffff] text-[#192230] py-2 rounded-lg hover:bg-[#192230] hover:text-[#00ffff] hover:border-2 border-[#00ffff] transition duration-200"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
