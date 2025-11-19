import { useEffect, useState } from "react";
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

  return (
    <div className="animate-fadeIn">
      <h1 className="text-3xl font-bold mb-6 mt-7">Monthly Summary</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
        {summary.map((item, i) => (
          <div
            key={i}
            className="bg-gray-800 p-6 rounded-xl shadow-xl border border-gray-700 hover:border-blue-500 transition"
          >
            <h2 className="text-2xl font-semibold">{item.category}</h2>
            <p className="mt-2">Limit: ₹{item.limit}</p>
            <p>Spent: ₹{item.spent}</p>
            <p>Remaining: ₹{item.remaining}</p>

            <span
              className={`mt-3 inline-block px-3 py-1 rounded-md text-sm ${item.status === "over" ? "bg-red-500" : "bg-green-600"}`}
            >
              {item.status.toUpperCase()}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}