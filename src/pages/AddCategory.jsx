import { useState } from "react";
import api from "../../api/axios";

export default function AddCategory() {
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
    <div className="p-10 text-white max-w-lg mx-auto">
      <h1 className="text-3xl font-bold mb-6">Add Category</h1>

      <input
        type="text"
        placeholder="Category Name"
        className="w-full p-3 bg-gray-700 rounded mb-4"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <input
        type="number"
        placeholder="Monthly Limit"
        className="w-full p-3 bg-gray-700 rounded mb-4"
        value={limit}
        onChange={(e) => setLimit(e.target.value)}
      />

      <button
        onClick={submit}
        className="w-full bg-green-500 py-3 rounded font-semibold"
      >
        Add
      </button>
    </div>
  );
}
