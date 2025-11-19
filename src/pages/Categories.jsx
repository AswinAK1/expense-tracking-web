import { useEffect, useState } from "react";
import api from "../../api/axios";

export default function Categories() {
  const [categories, setCategories] = useState([]);

  const load = async () => {
    const res = await api.get("/categories");
    setCategories(res.data);
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <div className="p-10 text-white">
      <h1 className="text-3xl font-bold mb-6">Your Categories</h1>

      <table className="w-full bg-gray-800 text-white rounded-lg overflow-hidden">
        <thead className="bg-gray-700">
          <tr>
            <th className="p-3">Name</th>
            <th className="p-3">Limit</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((c) => (
            <tr key={c._id} className="text-center border-b border-gray-700">
              <td className="p-3">{c.name}</td>
              <td className="p-3">₹{c.monthlyLimit}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
