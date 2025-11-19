import { useEffect, useState, useContext } from "react";
import api from "../../api/axios";
import { ThemeContext } from "../context/ThemeContext";

export function AddExpense({ onSuccess }) {
  const [categories, setCategories] = useState([]);
  const [form, setForm] = useState({ categoryId: "", amount: "", description: "" });
  const { theme } = useContext(ThemeContext);

  const loadCategories = async () => {
    const token = localStorage.getItem("token");
    if (token) {
      const res = await api.get("/categories");
      setCategories(res.data);
    }
  };

  useEffect(() => {
    loadCategories();
  }, []);

  const submit = async () => {
    const userId = localStorage.getItem("userId");
    if (!userId) return alert("Please log in.");

    if (!form.categoryId || !form.amount || !form.description)
      return alert("Please fill all fields.");

    try {
      await api.post("/expenses", {
        ...form,
        amount: Number(form.amount),
        userId,
      });

      setForm({ categoryId: "", amount: "", description: "" });

      if (onSuccess) onSuccess();
    } catch (error) {
      console.error(error);
      alert("Failed to add expense.");
    }
  };

  return (
    <div
      className={`animate-fadeIn ${
        theme === "dark" ? "text-white bg-gray-900" : "text-black bg-white"
      }`}
    >
      <h1
        className={`text-2xl font-bold mb-4 ${
          theme === "dark" ? "text-white" : "text-black"
        }`}
      >
        Add Expense
      </h1>

      {/* Category Dropdown */}
      <select
        className={`w-full p-3 rounded-xl border mb-4 focus:ring-2 ${
          theme === "dark"
            ? "bg-gray-800 border-gray-700 text-white focus:ring-blue-500"
            : "bg-gray-200 border-gray-300 text-black focus:ring-blue-500"
        }`}
        value={form.categoryId}
        onChange={(e) => setForm({ ...form, categoryId: e.target.value })}
      >
        <option value="">Select Category</option>
        {categories.map((c) => (
          <option
            key={c._id}
            value={c._id}
            className={theme === "dark" ? "text-white bg-gray-800" : ""}
          >
            {c.name}
          </option>
        ))}
      </select>

      {/* Amount */}
      <input
        type="number"
        placeholder="Amount"
        className={`w-full p-3 rounded-xl border mb-4 focus:ring-2 ${
          theme === "dark"
            ? "bg-gray-800 border-gray-700 text-white focus:ring-blue-500"
            : "bg-gray-200 border-gray-300 text-black focus:ring-blue-500"
        }`}
        value={form.amount}
        onChange={(e) => setForm({ ...form, amount: e.target.value })}
      />

      {/* Description */}
      <input
        type="text"
        placeholder="Description"
        className={`w-full p-3 rounded-xl border mb-4 focus:ring-2 ${
          theme === "dark"
            ? "bg-gray-800 border-gray-700 text-white focus:ring-blue-500"
            : "bg-gray-200 border-gray-300 text-black focus:ring-blue-500"
        }`}
        value={form.description}
        onChange={(e) => setForm({ ...form, description: e.target.value })}
      />

      {/* Add Button */}
      <button
        onClick={submit}
        className={`w-full py-3 rounded-xl font-semibold hover:opacity-90 transition ${
          theme === "dark"
            ? "bg-blue-700 text-white"
            : "bg-gradient-to-r from-blue-600 to-blue-400 text-white"
        }`}
      >
        Add Expense
      </button>
    </div>
  );
}
