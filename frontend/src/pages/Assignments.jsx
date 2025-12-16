import { useEffect, useState } from "react";
import api from "../api/api";

export default function Assignments() {
  const [assignments, setAssignments] = useState([]);
  const [assetId, setAssetId] = useState("");
  const [baseId, setBaseId] = useState("");
  const [assignedTo, setAssignedTo] = useState("");
  const [quantity, setQuantity] = useState("");
  const [type, setType] = useState("ASSIGNED");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const fetchAssignments = async () => {
    try {
      setError("");
      const res = await api.get("/assignments");
      console.log("Fetched assignments:", res.data);
      setAssignments(Array.isArray(res.data) ? res.data : []);
    } catch (error) {
      console.error("Error fetching assignments:", error);
      setError(error.response?.data?.error || "Failed to fetch assignments");
      setAssignments([]);
    }
  };

  useEffect(() => {
    fetchAssignments();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");
    
    try {
      const res = await api.post("/assignments", {
        assetId,
        baseId,
        assignedTo,
        quantity: Number(quantity),
        type
      });
      console.log("Assignment created:", res.data);
      setSuccess("Assignment created successfully!");
      setAssetId("");
      setBaseId("");
      setAssignedTo("");
      setQuantity("");
      setType("ASSIGNED");
      // Refresh the list
      await fetchAssignments();
      // Clear success message after 3 seconds
      setTimeout(() => setSuccess(""), 3000);
    } catch (error) {
      console.error("Error creating assignment:", error);
      setError(error.response?.data?.error || "Failed to create assignment. Please check your inputs.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-amber-400 uppercase tracking-wider" style={{ fontFamily: "'Orbitron', sans-serif", textShadow: "0 0 10px rgba(251, 191, 36, 0.5)" }}>
          Assignments
        </h2>
        <button
          onClick={fetchAssignments}
          className="bg-gray-800 hover:bg-gray-700 text-amber-400 px-6 py-2 rounded border-2 border-amber-500/50 uppercase tracking-wider font-bold transition-all transform hover:scale-105"
          style={{ fontFamily: "'Orbitron', sans-serif" }}
        >
          Refresh
        </button>
      </div>

      {/* Success/Error Messages */}
      {success && (
        <div className="mb-4 p-4 bg-green-900/80 border-2 border-green-500 text-green-300 rounded-lg font-semibold uppercase tracking-wider">
          {success}
        </div>
      )}
      {error && (
        <div className="mb-4 p-4 bg-red-900/80 border-2 border-red-500 text-red-300 rounded-lg font-semibold uppercase tracking-wider">
          {error}
        </div>
      )}

      {/* Assignment Form */}
      <form onSubmit={handleSubmit} className="flex gap-3 mb-6 p-4 bg-gray-900/50 border-2 border-amber-500/30 rounded-lg flex-wrap">
        <input
          className="flex-1 min-w-[150px] bg-gray-800/50 border-2 border-gray-700 text-white p-3 rounded focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500/50 transition-all placeholder-gray-500"
          placeholder="Asset ID"
          value={assetId}
          onChange={(e) => setAssetId(e.target.value)}
          required
        />
        <input
          className="flex-1 min-w-[150px] bg-gray-800/50 border-2 border-gray-700 text-white p-3 rounded focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500/50 transition-all placeholder-gray-500"
          placeholder="Base ID"
          value={baseId}
          onChange={(e) => setBaseId(e.target.value)}
          required
        />
        <input
          className="flex-1 min-w-[150px] bg-gray-800/50 border-2 border-gray-700 text-white p-3 rounded focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500/50 transition-all placeholder-gray-500"
          placeholder="Assigned To"
          value={assignedTo}
          onChange={(e) => setAssignedTo(e.target.value)}
          required
        />
        <input
          className="flex-1 min-w-[120px] bg-gray-800/50 border-2 border-gray-700 text-white p-3 rounded focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500/50 transition-all placeholder-gray-500"
          type="number"
          placeholder="Quantity"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          required
        />
        <select
          className="flex-1 min-w-[150px] bg-gray-800/50 border-2 border-gray-700 text-white p-3 rounded focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500/50 transition-all"
          value={type}
          onChange={(e) => setType(e.target.value)}
          required
        >
          <option value="ASSIGNED" className="bg-gray-800">Assigned</option>
          <option value="EXPENDED" className="bg-gray-800">Expended</option>
        </select>
        <button 
          className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-500 hover:to-purple-600 text-white px-6 py-3 rounded uppercase tracking-wider font-bold disabled:bg-gray-600 disabled:cursor-not-allowed transition-all transform hover:scale-105 border-2 border-purple-500"
          style={{ fontFamily: "'Orbitron', sans-serif" }}
          disabled={loading}
        >
          {loading ? "Adding..." : "Add"}
        </button>
      </form>

      {/* Assignment Table */}
      <div className="bg-gray-900/50 border-2 border-amber-500/30 rounded-lg overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-800/80 border-b-2 border-amber-500/50">
            <tr>
              <th className="p-4 text-left text-amber-400 uppercase tracking-wider font-bold" style={{ fontFamily: "'Orbitron', sans-serif" }}>Asset</th>
              <th className="p-4 text-left text-amber-400 uppercase tracking-wider font-bold" style={{ fontFamily: "'Orbitron', sans-serif" }}>Base</th>
              <th className="p-4 text-left text-amber-400 uppercase tracking-wider font-bold" style={{ fontFamily: "'Orbitron', sans-serif" }}>Assigned To</th>
              <th className="p-4 text-left text-amber-400 uppercase tracking-wider font-bold" style={{ fontFamily: "'Orbitron', sans-serif" }}>Quantity</th>
              <th className="p-4 text-left text-amber-400 uppercase tracking-wider font-bold" style={{ fontFamily: "'Orbitron', sans-serif" }}>Type</th>
              <th className="p-4 text-left text-amber-400 uppercase tracking-wider font-bold" style={{ fontFamily: "'Orbitron', sans-serif" }}>Date</th>
            </tr>
          </thead>
          <tbody>
            {assignments.length === 0 ? (
              <tr>
                <td colSpan="6" className="p-6 text-center text-gray-500 uppercase tracking-wider">
                  No assignments found
                </td>
              </tr>
            ) : (
              assignments.map((a, index) => (
                <tr key={a._id} className={`border-b border-gray-700/50 ${index % 2 === 0 ? 'bg-gray-800/30' : 'bg-gray-900/30'} hover:bg-amber-500/10 transition-colors`}>
                  <td className="p-4 text-white">
                    {a.assetId?.name || (typeof a.assetId === 'string' ? a.assetId : a.assetId?._id) || "-"}
                  </td>
                  <td className="p-4 text-white">
                    {a.baseId?.name || (typeof a.baseId === 'string' ? a.baseId : a.baseId?._id) || "-"}
                  </td>
                  <td className="p-4 text-white">{a.assignedTo || "-"}</td>
                  <td className="p-4 text-amber-400 font-semibold">{a.quantity ?? "-"}</td>
                  <td className="p-4">
                    <span className={`px-3 py-1 rounded font-semibold ${
                      a.type === 'ASSIGNED' 
                        ? 'bg-blue-900/50 text-blue-300 border border-blue-500' 
                        : 'bg-red-900/50 text-red-300 border border-red-500'
                    }`}>
                      {a.type || "-"}
                    </span>
                  </td>
                  <td className="p-4 text-gray-300">
                    {a.date ? new Date(a.date).toLocaleDateString() : "-"}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

