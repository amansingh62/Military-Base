import { Link } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-gray-900/95 backdrop-blur-sm border-b-2 border-amber-500/50 text-white p-4 flex justify-between items-center shadow-lg">
      <div className="space-x-6">
        <Link 
          to="/" 
          className="text-amber-400 hover:text-amber-300 font-bold uppercase tracking-wider transition-all hover:scale-105"
          style={{ fontFamily: "'Orbitron', sans-serif" }}
        >
          Dashboard
        </Link>
        {(user.role === "ADMIN" || user.role === "LOGISTICS") && (
          <>
            <Link 
              to="/purchases" 
              className="text-gray-300 hover:text-amber-400 font-semibold uppercase tracking-wider transition-all hover:scale-105"
              style={{ fontFamily: "'Orbitron', sans-serif" }}
            >
              Purchases
            </Link>
            <Link 
              to="/transfers" 
              className="text-gray-300 hover:text-amber-400 font-semibold uppercase tracking-wider transition-all hover:scale-105"
              style={{ fontFamily: "'Orbitron', sans-serif" }}
            >
              Transfers
            </Link>
          </>
        )}
        {(user.role === "ADMIN" || user.role === "COMMANDER") && (
          <Link 
            to="/assignments" 
            className="text-gray-300 hover:text-amber-400 font-semibold uppercase tracking-wider transition-all hover:scale-105"
            style={{ fontFamily: "'Orbitron', sans-serif" }}
          >
            Assignments
          </Link>
        )}
      </div>
      <button 
        onClick={logout}
        className="bg-red-700 hover:bg-red-600 px-4 py-2 rounded uppercase tracking-wider font-bold transition-all transform hover:scale-105 border-2 border-red-600"
        style={{ fontFamily: "'Orbitron', sans-serif" }}
      >
        Logout
      </button>
    </nav>
  );
}
