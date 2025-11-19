import { useEffect, useState } from "react";
import api from "../../api/axios";

export function Categories() {
  const [categories, setCategories] = useState([]);

  const load = async () => {
    const res = await api.get("/categories");
    setCategories(res.data);
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <div className="p-10 text-white animate-fadeIn">
      <h1 className="text-3xl font-bold mb-6">Your Categories</h1>

      <table className="w-full bg-gray-800 rounded-xl overflow-hidden shadow-lg">
        <thead className="bg-gray-700">
          <tr>
            <th className="p-3">Name</th>
            <th className="p-3">Limit</th>
          </tr>
        </thead>

        <tbody>
          {categories.map((c) => (
            <tr key={c._id} className="text-center border-b border-gray-700 hover:bg-gray-700/40 transition">
              <td className="p-3">{c.name}</td>
              <td className="p-3">₹{c.monthlyLimit}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}