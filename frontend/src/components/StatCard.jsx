export default function StatCard({ title, value }) {
  return (
    <div className="bg-gray-900/80 backdrop-blur-sm border-2 border-amber-500/30 rounded-lg p-6 shadow-lg hover:border-amber-500/60 transition-all transform hover:scale-105">
      <h3 className="text-amber-400 text-sm uppercase tracking-wider mb-2" style={{ fontFamily: "'Orbitron', sans-serif" }}>
        {title}
      </h3>
      <p className="text-3xl font-bold text-white" style={{ fontFamily: "'Orbitron', sans-serif", textShadow: "0 0 10px rgba(251, 191, 36, 0.3)" }}>
        {value}
      </p>
    </div>
  );
}
