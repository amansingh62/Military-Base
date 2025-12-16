import { Link } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-slate-800 text-white p-4 flex justify-between">
      <div className="space-x-4">
        <Link to="/">Dashboard</Link>
        {(user.role === "ADMIN" || user.role === "LOGISTICS") && (
          <>
            <Link to="/purchases">Purchases</Link>
            <Link to="/transfers">Transfers</Link>
          </>
        )}
        {(user.role === "ADMIN" || user.role === "COMMANDER") && (
          <Link to="/assignments">Assignments</Link>
        )}
      </div>
      <button onClick={logout}>Logout</button>
    </nav>
  );
}
