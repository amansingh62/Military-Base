import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./auth/AuthContext";
import ProtectedRoute from "./auth/ProtectedRoute";
import Navbar from "./components/Navbar";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Purchases from "./pages/Purchases";
import Transfers from "./pages/Transfers";

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Public Route */}
          <Route path="/login" element={<Login />} />

          {/* Dashboard */}
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Navbar />
                <Dashboard />
              </ProtectedRoute>
            }
          />

          {/* Purchases */}
          <Route
            path="/purchases"
            element={
              <ProtectedRoute>
                <Navbar />
                <Purchases />
              </ProtectedRoute>
            }
          />

          {/* Transfers */}
          <Route
            path="/transfers"
            element={
              <ProtectedRoute>
                <Navbar />
                <Transfers />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
