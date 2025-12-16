import { useEffect, useState } from "react";
import api from "../api/api";
import StatCard from "../components/StatCard";

export default function Dashboard() {
  const [data, setData] = useState(null);

  useEffect(() => {
    api.get("/dashboard").then(res => setData(res.data));
  }, []);

  if (!data) return <p>Loading...</p>;

  return (
    <div className="p-6 grid grid-cols-2 gap-4">
      <StatCard title="Opening Balance" value={data.openingBalance} />
      <StatCard title="Net Movement" value={data.netMovement} />
      <StatCard title="Closing Balance" value={data.closingBalance} />
      <StatCard title="Assigned" value={data.assigned} />
      <StatCard title="Expended" value={data.expended} />
    </div>
  );
}
