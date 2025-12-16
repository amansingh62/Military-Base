import { useEffect, useState } from "react";
import api from "../api/api";

export default function Transfers() {
  const [transfers, setTransfers] = useState([]);
  const [assetId, setAssetId] = useState("");
  const [fromBase, setFromBase] = useState("");
  const [toBase, setToBase] = useState("");
  const [quantity, setQuantity] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const fetchTransfers = async () => {
    try {
      setError("");
      const res = await api.get("/transfers");
      console.log("Fetched transfers:", res.data);
      setTransfers(Array.isArray(res.data) ? res.data : []);
    } catch (error) {
      console.error("Error fetching transfers:", error);
      setError(error.response?.data?.error || "Failed to fetch transfers");
      setTransfers([]);
    }
  };

  useEffect(() => {
    fetchTransfers();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");
    
    try {
      const res = await api.post("/transfers", {
        assetId,
        fromBase,
        toBase,
        quantity: Number(quantity)
      });
      console.log("Transfer created:", res.data);
      setSuccess("Transfer created successfully!");
      setAssetId("");
      setFromBase("");
      setToBase("");
      setQuantity("");
      
      await fetchTransfers();
      
      setTimeout(() => setSuccess(""), 3000);
    } catch (error) {
      console.error("Error creating transfer:", error);
      setError(error.response?.data?.error || "Failed to create transfer. Please check your inputs.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-amber-400 uppercase tracking-wider" style={{ fontFamily: "'Orbitron', sans-serif", textShadow: "0 0 10px rgba(251, 191, 36, 0.5)" }}>
          Transfers
        </h2>
        <button
          onClick={fetchTransfers}
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

      
      <form onSubmit={handleSubmit} className="flex gap-3 mb-6 p-4 bg-gray-900/50 border-2 border-amber-500/30 rounded-lg flex-wrap">
        <input
          className="flex-1 min-w-37.5 bg-gray-800/50 border-2 border-gray-700 text-white p-3 rounded focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500/50 transition-all placeholder-gray-500"
          placeholder="Asset ID"
          value={assetId}
          onChange={(e) => setAssetId(e.target.value)}
          required
        />
        <input
          className="flex-1 min-w-37.5 bg-gray-800/50 border-2 border-gray-700 text-white p-3 rounded focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500/50 transition-all placeholder-gray-500"
          placeholder="From Base ID"
          value={fromBase}
          onChange={(e) => setFromBase(e.target.value)}
          required
        />
        <input
          className="flex-1 min-w-37.5 bg-gray-800/50 border-2 border-gray-700 text-white p-3 rounded focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500/50 transition-all placeholder-gray-500"
          placeholder="To Base ID"
          value={toBase}
          onChange={(e) => setToBase(e.target.value)}
          required
        />
        <input
          className="flex-1 min-w-30 bg-gray-800/50 border-2 border-gray-700 text-white p-3 rounded focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500/50 transition-all placeholder-gray-500"
          type="number"
          placeholder="Qty"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          required
        />
        <button 
          className="bg-linear-to-r from-green-600 to-green-700 hover:from-green-500 hover:to-green-600 text-white px-6 py-3 rounded uppercase tracking-wider font-bold disabled:bg-gray-600 disabled:cursor-not-allowed transition-all transform hover:scale-105 border-2 border-green-500"
          style={{ fontFamily: "'Orbitron', sans-serif" }}
          disabled={loading}
        >
          {loading ? "Transferring..." : "Transfer"}
        </button>
      </form>

      
      <div className="bg-gray-900/50 border-2 border-amber-500/30 rounded-lg overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-800/80 border-b-2 border-amber-500/50">
            <tr>
              <th className="p-4 text-left text-amber-400 uppercase tracking-wider font-bold" style={{ fontFamily: "'Orbitron', sans-serif" }}>Asset</th>
              <th className="p-4 text-left text-amber-400 uppercase tracking-wider font-bold" style={{ fontFamily: "'Orbitron', sans-serif" }}>From</th>
              <th className="p-4 text-left text-amber-400 uppercase tracking-wider font-bold" style={{ fontFamily: "'Orbitron', sans-serif" }}>To</th>
              <th className="p-4 text-left text-amber-400 uppercase tracking-wider font-bold" style={{ fontFamily: "'Orbitron', sans-serif" }}>Qty</th>
              <th className="p-4 text-left text-amber-400 uppercase tracking-wider font-bold" style={{ fontFamily: "'Orbitron', sans-serif" }}>Date</th>
            </tr>
          </thead>
          <tbody>
            {transfers.length === 0 ? (
              <tr>
                <td colSpan="5" className="p-6 text-center text-gray-500 uppercase tracking-wider">
                  No transfers found
                </td>
              </tr>
            ) : (
              transfers.map((t, index) => (
                <tr key={t._id} className={`border-b border-gray-700/50 ${index % 2 === 0 ? 'bg-gray-800/30' : 'bg-gray-900/30'} hover:bg-amber-500/10 transition-colors`}>
                  <td className="p-4 text-white">
                    {t.assetId?.name || (typeof t.assetId === 'string' ? t.assetId : t.assetId?._id) || "-"}
                  </td>
                  <td className="p-4 text-white">
                    {t.fromBase?.name || (typeof t.fromBase === 'string' ? t.fromBase : t.fromBase?._id) || "-"}
                  </td>
                  <td className="p-4 text-white">
                    {t.toBase?.name || (typeof t.toBase === 'string' ? t.toBase : t.toBase?._id) || "-"}
                  </td>
                  <td className="p-4 text-amber-400 font-semibold">{t.quantity ?? "-"}</td>
                  <td className="p-4 text-gray-300">
                    {t.date ? new Date(t.date).toLocaleDateString() : "-"}
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
