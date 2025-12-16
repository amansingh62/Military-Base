import { useState } from "react";
import api from "../api/api";
import { useAuth } from "../auth/AuthContext";

export default function Login() {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await api.post("/auth/login", { email, password });

    login(res.data.token, JSON.parse(atob(res.data.token.split(".")[1])));
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded w-80">
        <h2 className="text-xl font-bold mb-4">Login</h2>
        <input className="input" placeholder="Email"
          onChange={(e) => setEmail(e.target.value)} />
        <input className="input mt-2" type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)} />
        <button className="btn mt-4 w-full">Login</button>
      </form>
    </div>
  );
}
