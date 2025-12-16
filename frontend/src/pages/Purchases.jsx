import { useEffect, useState } from "react";
import api from "../api/api";

export default function Purchases() {
  const [purchases, setPurchases] = useState([]);
  const [assetId, setAssetId] = useState("");
  const [baseId, setBaseId] = useState("");
  const [quantity, setQuantity] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const fetchPurchases = async () => {
    try {
      setError("");
      const res = await api.get("/purchases");
      console.log("Fetched purchases:", res.data);
      setPurchases(Array.isArray(res.data) ? res.data : []);
    } catch (error) {
      console.error("Error fetching purchases:", error);
      setError(error.response?.data?.error || "Failed to fetch purchases");
      setPurchases([]);
    }
  };

  useEffect(() => {
    fetchPurchases();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");
    
    try {
      const res = await api.post("/purchases", {
        assetId,
        baseId,
        quantity: Number(quantity)
      });
      console.log("Purchase created:", res.data);
      setSuccess("Purchase added successfully!");
      setAssetId("");
      setBaseId("");
      setQuantity("");
      
      await fetchPurchases();
      
      setTimeout(() => setSuccess(""), 3000);
    } catch (error) {
      console.error("Error creating purchase:", error);
      setError(error.response?.data?.error || "Failed to create purchase. Please check your inputs.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-amber-400 uppercase tracking-wider" style={{ fontFamily: "'Orbitron', sans-serif", textShadow: "0 0 10px rgba(251, 191, 36, 0.5)" }}>
          Purchases
        </h2>
        <button
          onClick={fetchPurchases}
          className="bg-gray-800 hover:bg-gray-700 text-amber-400 px-6 py-2 rounded border-2 border-amber-500/50 uppercase tracking-wider font-bold transition-all transform hover:scale-105"
          style={{ fontFamily: "'Orbitron', sans-serif" }}
        >
          Refresh
        </button>
      </div>

      
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

      
      <form onSubmit={handleSubmit} className="flex gap-3 mb-6 p-4 bg-gray-900/50 border-2 border-amber-500/30 rounded-lg">
        <input
          className="flex-1 bg-gray-800/50 border-2 border-gray-700 text-white p-3 rounded focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500/50 transition-all placeholder-gray-500"
          placeholder="Asset ID"
          value={assetId}
          onChange={(e) => setAssetId(e.target.value)}
          required
        />
        <input
          className="flex-1 bg-gray-800/50 border-2 border-gray-700 text-white p-3 rounded focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500/50 transition-all placeholder-gray-500"
          placeholder="Base ID"
          value={baseId}
          onChange={(e) => setBaseId(e.target.value)}
          required
        />
        <input
          className="flex-1 bg-gray-800/50 border-2 border-gray-700 text-white p-3 rounded focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500/50 transition-all placeholder-gray-500"
          type="number"
          placeholder="Quantity"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          required
        />
        <button 
          className="bg-linear-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white px-6 py-3 rounded uppercase tracking-wider font-bold disabled:bg-gray-600 disabled:cursor-not-allowed transition-all transform hover:scale-105 border-2 border-blue-500"
          style={{ fontFamily: "'Orbitron', sans-serif" }}
          disabled={loading}
        >
          {loading ? "Adding..." : "Add"}
        </button>
      </form>

      
      <div className="bg-gray-900/50 border-2 border-amber-500/30 rounded-lg overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-800/80 border-b-2 border-amber-500/50">
            <tr>
              <th className="p-4 text-left text-amber-400 uppercase tracking-wider font-bold" style={{ fontFamily: "'Orbitron', sans-serif" }}>Asset</th>
              <th className="p-4 text-left text-amber-400 uppercase tracking-wider font-bold" style={{ fontFamily: "'Orbitron', sans-serif" }}>Base</th>
              <th className="p-4 text-left text-amber-400 uppercase tracking-wider font-bold" style={{ fontFamily: "'Orbitron', sans-serif" }}>Quantity</th>
              <th className="p-4 text-left text-amber-400 uppercase tracking-wider font-bold" style={{ fontFamily: "'Orbitron', sans-serif" }}>Date</th>
            </tr>
          </thead>
          <tbody>
            {purchases.length === 0 ? (
              <tr>
                <td colSpan="4" className="p-6 text-center text-gray-500 uppercase tracking-wider">
                  No purchases found
                </td>
              </tr>
            ) : (
              purchases.map((p, index) => (
                <tr key={p._id} className={`border-b border-gray-700/50 ${index % 2 === 0 ? 'bg-gray-800/30' : 'bg-gray-900/30'} hover:bg-amber-500/10 transition-colors`}>
                  <td className="p-4 text-white">
                    {p.assetId?.name || (typeof p.assetId === 'string' ? p.assetId : p.assetId?._id) || "-"}
                  </td>
                  <td className="p-4 text-white">
                    {p.baseId?.name || (typeof p.baseId === 'string' ? p.baseId : p.baseId?._id) || "-"}
                  </td>
                  <td className="p-4 text-amber-400 font-semibold">{p.quantity ?? "-"}</td>
                  <td className="p-4 text-gray-300">
                    {p.date ? new Date(p.date).toLocaleDateString() : "-"}
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
