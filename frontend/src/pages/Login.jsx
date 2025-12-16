import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api";
import { useAuth } from "../auth/AuthContext";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    
    try {
      const res = await api.post("/auth/login", { email, password });

      login(
        res.data.token,
        JSON.parse(atob(res.data.token.split(".")[1]))
      );

      navigate("/");
    } catch (error) {
      setError(error.response?.data?.error || "Invalid credentials. Access denied.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-linear-to-br from-gray-900 via-gray-800 to-black relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: '60px 60px'
        }}></div>
      </div>
      <form onSubmit={handleSubmit} className="bg-gray-900/90 backdrop-blur-sm border-2 border-amber-500/50 p-8 rounded-lg w-96 shadow-2xl relative z-10">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-amber-400 mb-2 tracking-wider uppercase" style={{ fontFamily: "'Orbitron', sans-serif", textShadow: "0 0 10px rgba(251, 191, 36, 0.5)" }}>
            MILITARY BASE
          </h1>
          <h2 className="text-xl font-semibold text-gray-300 uppercase tracking-wider">Access Control</h2>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-900/80 border-2 border-red-500 text-red-300 rounded-lg font-semibold uppercase tracking-wider text-sm">
            {error}
          </div>
        )}

        <div className="space-y-4">
          <div>
            <label className="block text-amber-400 text-sm font-semibold mb-2 uppercase tracking-wider">Email</label>
            <input
              className="w-full bg-gray-800/50 border-2 border-gray-700 text-white p-3 rounded focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500/50 transition-all"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-amber-400 text-sm font-semibold mb-2 uppercase tracking-wider">Password</label>
            <input
              className="w-full bg-gray-800/50 border-2 border-gray-700 text-white p-3 rounded focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500/50 transition-all"
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
        </div>

        <button 
          className="w-full mt-6 bg-linear-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-white font-bold py-3 rounded uppercase tracking-wider transition-all transform hover:scale-105 shadow-lg shadow-amber-500/50 disabled:bg-gray-600 disabled:cursor-not-allowed disabled:transform-none"
          style={{ fontFamily: "'Orbitron', sans-serif" }}
          disabled={loading}
        >
          {loading ? "Authenticating..." : "Login"}
        </button>
      </form>
    </div>
  );
}
