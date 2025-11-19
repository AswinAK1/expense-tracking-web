import { useEffect, useState, useContext } from "react";
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
import { ThemeContext } from "../context/ThemeContext";

export function Dashboard() {
  const [summary, setSummary] = useState([]);
  const [month, setMonth] = useState(11);
  const [year, setYear] = useState(2025);

  const { theme } = useContext(ThemeContext);

  const loadSummary = async () => {
    const res = await api.get(`/api/summary?month=${month}&year=${year}`);
    setSummary(res.data);
  };

  useEffect(() => {
    loadSummary();
  }, []);

  const chartData = summary.map((item) => ({
    category: item.category,
    spent: item.spent,
    limit: item.limit,
  }));

  return (
    <div
      className={`animate-fadeIn p-6 ${
        theme === "dark" ? "text-white" : "text-gray-900"
      }`}
    >
      <h1 className="text-3xl font-bold mb-6 mt-7">Monthly Summary</h1>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 transition">
        {summary.map((item, i) => (
          <div
            key={i}
            className={`p-6 rounded-2xl shadow-lg border transition
              ${
                theme === "dark"
                  ? "bg-gray-900 border-gray-800 hover:border-blue-500 hover:shadow-blue-500/20"
                  : "bg-white border-gray-300 hover:border-blue-400 hover:shadow-blue-300/30"
              }
            `}
          >
            <h2 className="text-xl font-semibold">{item.category}</h2>

            <p
              className={`mt-3 ${
                theme === "dark" ? "text-gray-300" : "text-gray-600"
              }`}
            >
              Limit: ₹{item.limit}
            </p>
            <p className={`${theme === "dark" ? "text-gray-300" : "text-gray-600"}`}>
              Spent: ₹{item.spent}
            </p>
            <p className={`${theme === "dark" ? "text-gray-300" : "text-gray-600"}`}>
              Remaining: ₹{item.remaining}
            </p>

            <span
              className={`mt-4 inline-block px-4 py-1 rounded-md text-sm ${
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

      {/* Chart Section */}
      <div
        className={`mt-10 p-6 rounded-2xl shadow-lg border transition 
          ${
            theme === "dark"
              ? "bg-gray-900 border-gray-800"
              : "bg-white border-gray-300"
          }
        `}
      >
        <h2 className="text-2xl font-semibold mb-4">Spending Chart</h2>

        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} barSize={40}>
              
              <CartesianGrid
                strokeDasharray="3 3"
                stroke={theme === "dark" ? "#444" : "#ccc"}
              />

              <XAxis
                dataKey="category"
                stroke={theme === "dark" ? "#ddd" : "#333"}
              />

              <YAxis stroke={theme === "dark" ? "#ddd" : "#333"} />

              <Tooltip
                contentStyle={{
                  background: theme === "dark" ? "#111" : "#fff",
                  border: theme === "dark" ? "1px solid #333" : "1px solid #ccc",
                }}
                labelStyle={{
                  color: theme === "dark" ? "#fff" : "#000",
                }}
              />

              <Bar
                dataKey="spent"
                fill={theme === "dark" ? "#6366f1" : "#4f46e5"}
                radius={[6, 6, 0, 0]}
              />

              <Bar
                dataKey="limit"
                fill={theme === "dark" ? "#22c55e" : "#16a34a"}
                radius={[6, 6, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
