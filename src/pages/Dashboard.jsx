import { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import api from "../../api/axios";

export function Dashboard() {
  const [summary, setSummary] = useState([]);
  const [month, setMonth] = useState(11);
  const [year, setYear] = useState(2025);

  const loadSummary = async () => {
    const res = await api.get(`/summary?month=${month}&year=${year}`);
    setSummary(res.data);
  };

  useEffect(() => {
    loadSummary();
  }, []);

  // Graph Data
  const chartData = summary.map((item) => ({
    category: item.category,
    spent: item.spent,
    limit: item.limit,
  }));

  return (
    <div className="animate-fadeIn p-6">
      {/* Page Title */}
      <h1 className="text-3xl font-bold mb-6 mt-7">Monthly Summary</h1>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 transition">
        {summary.map((item, i) => (
          <div
            key={i}
            className="bg-gray-900 p-6 rounded-2xl shadow-lg border border-gray-800 hover:border-blue-500 hover:shadow-blue-500/20 transition"
          >
            <h2 className="text-xl font-semibold">{item.category}</h2>

            <p className="mt-3 text-gray-300">Limit: ₹{item.limit}</p>
            <p className="text-gray-300">Spent: ₹{item.spent}</p>
            <p className="text-gray-300">Remaining: ₹{item.remaining}</p>

            <span
              className={`mt-4 inline-block px-4 py-1 rounded-md text-sm 
              ${
                item.status === "over"
                  ? "bg-red-600/80 text-white"
                  : "bg-green-600/80 text-white"
              }`}
            >
              {item.status.toUpperCase()}
            </span>
          </div>
        ))}
      </div>

      {/* Graph Section */}
      <div className="mt-10 bg-gray-900 p-6 rounded-2xl shadow-lg border border-gray-800">
        <h2 className="text-2xl font-semibold mb-4">Spending Chart</h2>

        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} barSize={40}>
              <CartesianGrid strokeDasharray="3 3" stroke="#444" />
              <XAxis dataKey="category" stroke="#aaa" />
              <YAxis stroke="#aaa" />
              <Tooltip
                contentStyle={{ background: "#111", border: "1px solid #333" }}
                labelStyle={{ color: "#fff" }}
              />

              <Bar dataKey="spent" fill="#6366f1" radius={[6, 6, 0, 0]} />
              <Bar dataKey="limit" fill="#22c55e" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
