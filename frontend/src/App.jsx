import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./auth/AuthContext";
import ProtectedRoute from "./auth/ProtectedRoute";
import Navbar from "./components/Navbar";

import Login from "./pages/Login";
import Dashboard from "./components/Dashboard";
import Purchases from "./pages/Purchases";
import Transfers from "./pages/Transfers";
import Assignments from "./pages/Assignments";

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          
          <Route path="/login" element={<Login />} />

          
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Navbar />
                <Dashboard />
              </ProtectedRoute>
            }
          />

          
          <Route
            path="/purchases"
            element={
              <ProtectedRoute>
                <Navbar />
                <Purchases />
              </ProtectedRoute>
            }
          />

          
          <Route
            path="/transfers"
            element={
              <ProtectedRoute>
                <Navbar />
                <Transfers />
              </ProtectedRoute>
            }
          />

          
          <Route
            path="/assignments"
            element={
              <ProtectedRoute>
                <Navbar />
                <Assignments />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
