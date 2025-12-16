import { useEffect, useState } from "react";
import api from "../api/api";

export default function Purchases() {
  const [purchases, setPurchases] = useState([]);
  const [assetId, setAssetId] = useState("");
  const [baseId, setBaseId] = useState("");
  const [quantity, setQuantity] = useState("");

  const fetchPurchases = async () => {
    const res = await api.get("/purchases");
    setPurchases(res.data);
  };

  useEffect(() => {
    fetchPurchases();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await api.post("/purchases", {
      assetId,
      baseId,
      quantity: Number(quantity)
    });
    setAssetId("");
    setBaseId("");
    setQuantity("");
    fetchPurchases();
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Purchases</h2>

      {/* Purchase Form */}
      <form onSubmit={handleSubmit} className="flex gap-2 mb-6">
        <input
          className="border p-2"
          placeholder="Asset ID"
          value={assetId}
          onChange={(e) => setAssetId(e.target.value)}
          required
        />
        <input
          className="border p-2"
          placeholder="Base ID"
          value={baseId}
          onChange={(e) => setBaseId(e.target.value)}
          required
        />
        <input
          className="border p-2"
          type="number"
          placeholder="Quantity"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          required
        />
        <button className="bg-blue-600 text-white px-4">Add</button>
      </form>

      {/* Purchase Table */}
      <table className="w-full border">
        <thead className="bg-gray-100">
          <tr>
            <th className="border p-2">Asset</th>
            <th className="border p-2">Base</th>
            <th className="border p-2">Quantity</th>
            <th className="border p-2">Date</th>
          </tr>
        </thead>
        <tbody>
          {purchases.map((p) => (
            <tr key={p._id}>
              <td className="border p-2">
                {p.assetId?.name || p.assetId}
              </td>
              <td className="border p-2">
                {p.baseId?.name || p.baseId}
              </td>
              <td className="border p-2">{p.quantity}</td>
              <td className="border p-2">
                {new Date(p.date).toLocaleDateString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
