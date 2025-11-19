import { useState } from "react";
import api from "../../api/axios";

export function AddCategory() {
  const [name, setName] = useState("");
  const [limit, setLimit] = useState("");
  const userId = localStorage.getItem("userId");

  const submit = async () => {
    await api.post("/categories", { userId, name, monthlyLimit: limit });
    alert("Category added!");
    setName("");
    setLimit("");
  };

  return (
    <div className="p-10 text-white max-w-lg mx-auto animate-fadeIn">
      <h1 className="text-3xl font-bold mb-6">Add Category</h1>

      <div className="space-y-4">
        <input
          type="text"
          placeholder="Category Name"
          className="w-full p-3 bg-gray-800 rounded-xl border border-gray-700 focus:ring-2 focus:ring-blue-500"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="number"
          placeholder="Monthly Limit"
          className="w-full p-3 bg-gray-800 rounded-xl border border-gray-700 focus:ring-2 focus:ring-blue-500"
          value={limit}
          onChange={(e) => setLimit(e.target.value)}
        />

        <button
          onClick={submit}
          className="w-full bg-gradient-to-r from-blue-600 to-blue-400 py-3 rounded-xl font-semibold hover:opacity-90 transition"
        >
          Add
        </button>
      </div>
    </div>
  );
}