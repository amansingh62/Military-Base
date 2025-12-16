import { useEffect, useState } from "react";
import api from "../api/api";
import StatCard from "../components/StatCard";

export default function Dashboard() {
  const [data, setData] = useState(null);

  useEffect(() => {
    api.get("/dashboard").then(res => setData(res.data));
  }, []);

  if (!data) return (
    <div className="h-screen flex items-center justify-center">
      <div className="text-amber-400 text-2xl font-bold uppercase tracking-wider" style={{ fontFamily: "'Orbitron', sans-serif" }}>
        Loading...
      </div>
    </div>
  );

  return (
    <div className="p-6 min-h-screen">
      <h1 className="text-5xl font-bold text-center mb-8 text-amber-400 tracking-wider uppercase border-b-4 border-amber-500/50 pb-4" style={{ fontFamily: "'Orbitron', sans-serif", textShadow: "0 0 20px rgba(251, 191, 36, 0.5)" }}>
        MILITARY BASE
      </h1>
      <div className="grid grid-cols-2 gap-6">
        <StatCard title="Opening Balance" value={data.openingBalance} />
        <StatCard title="Net Movement" value={data.netMovement} />
        <StatCard title="Closing Balance" value={data.closingBalance} />
        <StatCard title="Assigned" value={data.assigned} />
        <StatCard title="Expended" value={data.expended} />
      </div>
    </div>
  );
}
