import { useEffect, useState } from "react";
import api from "../api/api";

export default function Transfers() {
  const [transfers, setTransfers] = useState([]);
  const [assetId, setAssetId] = useState("");
  const [fromBase, setFromBase] = useState("");
  const [toBase, setToBase] = useState("");
  const [quantity, setQuantity] = useState("");

  const fetchTransfers = async () => {
    const res = await api.get("/transfers");
    setTransfers(res.data);
  };

  useEffect(() => {
    fetchTransfers();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await api.post("/transfers", {
      assetId,
      fromBase,
      toBase,
      quantity: Number(quantity)
    });
    setAssetId("");
    setFromBase("");
    setToBase("");
    setQuantity("");
    fetchTransfers();
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Transfers</h2>

      {/* Transfer Form */}
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
          placeholder="From Base ID"
          value={fromBase}
          onChange={(e) => setFromBase(e.target.value)}
          required
        />
        <input
          className="border p-2"
          placeholder="To Base ID"
          value={toBase}
          onChange={(e) => setToBase(e.target.value)}
          required
        />
        <input
          className="border p-2"
          type="number"
          placeholder="Qty"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          required
        />
        <button className="bg-green-600 text-white px-4">Transfer</button>
      </form>

      {/* Transfer Table */}
      <table className="w-full border">
        <thead className="bg-gray-100">
          <tr>
            <th className="border p-2">Asset</th>
            <th className="border p-2">From</th>
            <th className="border p-2">To</th>
            <th className="border p-2">Qty</th>
            <th className="border p-2">Date</th>
          </tr>
        </thead>
        <tbody>
          {transfers.map((t) => (
            <tr key={t._id}>
              <td className="border p-2">
                {t.assetId?.name || t.assetId}
              </td>
              <td className="border p-2">
                {t.fromBase?.name || t.fromBase}
              </td>
              <td className="border p-2">
                {t.toBase?.name || t.toBase}
              </td>
              <td className="border p-2">{t.quantity}</td>
              <td className="border p-2">
                {new Date(t.date).toLocaleDateString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
